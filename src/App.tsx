/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppView, SearchParams, Property, BookingState } from './types';
import { INITIAL_PROPERTIES, INITIAL_BOOKING } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ExploreView } from './components/ExploreView';
import { HotelsView } from './components/HotelsView';
import { BusesView } from './components/BusesView';
import { FlightsView } from './components/FlightsView';
import { TrainsView } from './components/TrainsView';
import { CabsView } from './components/CabsView';
import { ExperiencesView } from './components/ExperiencesView';
import { HelpView } from './components/HelpView';
import { HotelDetailView } from './components/HotelDetailView';
import { CheckoutView } from './components/CheckoutView';
import { VoucherConfirmView } from './components/VoucherConfirmView';
import { ProfileView } from './components/ProfileView';
import { PartnerPortalView } from './components/PartnerPortalView';
import { AdminView } from './components/AdminView';
import { LoginPortalView } from './components/LoginPortalView';
import { ModifySearchModal } from './components/Modals';
import { GeminiConciergeModal } from './components/GeminiConciergeModal';
import {
  auth,
  db,
  googleProvider,
  signInWithPopup,
  signOut,
  testConnection,
  handleFirestoreError,
  OperationType,
} from './lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('explore');
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [selectedProperty, setSelectedProperty] = useState<Property>(INITIAL_PROPERTIES[0]);
  const [bookingState, setBookingState] = useState<BookingState>(INITIAL_BOOKING);
  const [isModifySearchOpen, setIsModifySearchOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [searchParams, setSearchParams] = useState<SearchParams>({
    destination: 'Goa, India',
    checkIn: '18 Nov 2025',
    checkOut: '22 Nov 2025',
    nights: 4,
    guests: '2 Guests, 1 Room',
    category: 'hotels'
  });

  // Test connection to Firestore & Listen to Auth State
  useEffect(() => {
    testConnection();

    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      if (user) {
        // Update primary guest name and email with authenticated details
        setBookingState(prev => ({
          ...prev,
          primaryGuest: {
            ...prev.primaryGuest,
            name: user.displayName || prev.primaryGuest.name,
            email: user.email || prev.primaryGuest.email,
          },
        }));

        // Persist/Sync user profile document in Firestore
        const userDocRef = doc(db, 'users', user.uid);
        setDoc(
          userDocRef,
          {
            uid: user.uid,
            displayName: user.displayName || 'Skynora Traveler',
            email: user.email || '',
            photoURL: user.photoURL || '',
            phoneNumber: user.phoneNumber || '+91 98765 43210',
            tier: 'Platinum Elite',
            walletBalance: 2450,
            rewardPoints: 14850,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        ).catch(err => {
          handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}`);
        });
      }
    });

    return () => unsubscribe();
  }, []);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleNavigate = (view: AppView) => {
    setCurrentView(view);
  };

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleSearch = (newParams: SearchParams) => {
    setSearchParams(newParams);
    if (newParams.category === 'buses') {
      setCurrentView('buses');
    } else if (newParams.category === 'flights') {
      setCurrentView('flights');
    } else if (newParams.category === 'trains') {
      setCurrentView('trains');
    } else if (newParams.category === 'cabs') {
      setCurrentView('cabs');
    } else if (newParams.category === 'events') {
      setCurrentView('experiences');
    } else {
      setCurrentView('hotels');
    }
  };

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
    setBookingState(prev => ({
      ...prev,
      property: property,
      pricePerNight: property.pricePerNight
    }));
    setCurrentView('hotel-detail');
  };

  const handleProceedToCheckout = () => {
    setCurrentView('checkout');
  };

  const handlePaymentSuccess = async () => {
    setCurrentView('booking-voucher');

    // Persist booking to Firestore if user is authenticated
    if (currentUser) {
      const bookingId = bookingState.referenceId.replace(/[^a-zA-Z0-9_-]/g, '') || `BK-${Date.now()}`;
      try {
        await setDoc(doc(db, 'users', currentUser.uid, 'bookings', bookingId), {
          id: bookingId,
          userId: currentUser.uid,
          category: 'Hotel',
          title: bookingState.property.title,
          pnr: bookingState.hotelPnr,
          referenceId: bookingState.referenceId,
          dates: `${bookingState.checkIn} - ${bookingState.checkOut}`,
          amount: bookingState.pricePerNight * bookingState.nights,
          status: 'Confirmed',
          paymentMode: bookingState.paymentMode,
          createdAt: new Date().toISOString(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `users/${currentUser.uid}/bookings/${bookingId}`);
      }
    }
  };

  const handleToggleWishlist = async (propertyId: string) => {
    const isNowSaved = !properties.find(p => p.id === propertyId)?.isSaved;

    setProperties(prev =>
      prev.map(p => (p.id === propertyId ? { ...p, isSaved: isNowSaved } : p))
    );
    if (selectedProperty.id === propertyId) {
      setSelectedProperty(prev => ({ ...prev, isSaved: isNowSaved }));
    }

    // Persist to Firestore if user is signed in
    if (currentUser) {
      const wishlistRef = doc(db, 'users', currentUser.uid, 'wishlist', propertyId);
      try {
        if (isNowSaved) {
          await setDoc(wishlistRef, {
            userId: currentUser.uid,
            propertyId,
            savedAt: new Date().toISOString(),
          });
        } else {
          await deleteDoc(wishlistRef);
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `users/${currentUser.uid}/wishlist/${propertyId}`);
      }
    }
  };

  const handleApplyPromoCode = (code: string) => {
    setBookingState(prev => ({
      ...prev,
      appliedPromo: code.toUpperCase(),
      promoDiscount: 2000
    }));
  };

  const handlePlanTripPackage = (budget: number, vibe: string) => {
    setCurrentView('hotels');
  };

  // Generic Bookings for Buses, Flights, Trains, Experiences
  const handleBookTransit = (details: any) => {
    setBookingState(prev => ({
      ...prev,
      roomTitle: details.title,
      pricePerNight: details.price,
      nights: 1,
      referenceId: `#SKN-${Date.now().toString().slice(-6)}`,
      hotelPnr: `SKN-${details.category.toUpperCase().slice(0, 3)}-${Math.floor(1000 + Math.random() * 9000)}`,
    }));
    setCurrentView('checkout');
  };

  const savedCount = properties.filter(p => p.isSaved).length;

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-['Inter'] antialiased selection:bg-[#4b41e1] selection:text-white">
      {/* Global Navigation Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        savedCount={savedCount}
        user={currentUser}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
        onOpenConcierge={() => setIsConciergeOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1 w-full">
        {currentView === 'explore' && (
          <ExploreView
            onNavigate={handleNavigate}
            onSearch={handleSearch}
            onApplyPromoCode={handleApplyPromoCode}
            onPlanTripPackage={handlePlanTripPackage}
          />
        )}

        {currentView === 'hotels' && (
          <HotelsView
            properties={properties}
            searchParams={searchParams}
            onSelectProperty={handleSelectProperty}
            onModifySearch={() => setIsModifySearchOpen(true)}
            onNavigate={handleNavigate}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {currentView === 'buses' && (
          <BusesView
            onNavigate={handleNavigate}
            onBookBus={handleBookTransit}
          />
        )}

        {currentView === 'flights' && (
          <FlightsView
            onNavigate={handleNavigate}
            onBookFlight={handleBookTransit}
          />
        )}

        {currentView === 'trains' && (
          <TrainsView
            onNavigate={handleNavigate}
            onBookTrain={handleBookTransit}
          />
        )}

        {currentView === 'cabs' && (
          <CabsView
            onNavigate={handleNavigate}
            onBookCab={handleBookTransit}
          />
        )}

        {currentView === 'experiences' && (
          <ExperiencesView
            onNavigate={handleNavigate}
            onBookExperience={handleBookTransit}
          />
        )}

        {currentView === 'help' && (
          <HelpView
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'hotel-detail' && (
          <HotelDetailView
            property={selectedProperty}
            bookingState={bookingState}
            onUpdateBooking={setBookingState}
            onProceedToCheckout={handleProceedToCheckout}
            onNavigate={handleNavigate}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutView
            bookingState={bookingState}
            onUpdateBooking={setBookingState}
            onPaymentSuccess={handlePaymentSuccess}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'booking-voucher' && (
          <VoucherConfirmView
            bookingState={bookingState}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'profile' && (
          <ProfileView
            bookingState={bookingState}
            onNavigate={handleNavigate}
            onSelectProperty={handleSelectProperty}
            user={currentUser}
            onSignIn={handleSignIn}
            onSignOut={handleSignOut}
          />
        )}

        {currentView === 'partner-portal' && (
          <PartnerPortalView
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'admin' && (
          <AdminView
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'login-portal' && (
          <LoginPortalView
            onNavigate={handleNavigate}
            onLoginSuccess={(userObj) => {
              // Convert userObj to Firebase-like User or update state
              setCurrentUser({
                displayName: userObj.name,
                email: userObj.email,
                photoURL: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA870SKCuQB5h2mt-l5QN0MX7I1xMHQpxDaHJEA4dbiz-kvnZrvbT0xd9oE8zq1e6Uh6knVRfIyCzjkve6OYw3KDs_g-JFiYKVSYFVOOycxNd5fT13nz7Nhn0SDuU4_SDM7Oct1sU45XgPcJYc5iC5zi1NwPHWuHb4Kpe8EVC4Ld04nzM8MRxTOtZHp9G6oaL8PAVCc0n0mth9fae_aWn6G87CwVPDBXfM5Nx8kJOThtuD0F86pY7FaPQ'
              } as User);
            }}
          />
        )}
      </main>

      {/* Floating Gemini AI Concierge Trigger Bubble */}
      <button
        onClick={() => setIsConciergeOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-[#131a33] via-[#4b41e1] to-[#6056ea] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl flex items-center gap-2.5 hover:scale-105 active:scale-95 transition-all cursor-pointer ring-4 ring-white/60"
        title="Open Skynora AI Travel Concierge (Gemini)"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#acedff] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#acedff]"></span>
        </span>
        <span className="material-symbols-outlined text-xl">smart_toy</span>
        <span className="font-['Plus_Jakarta_Sans'] font-extrabold text-xs hidden sm:inline tracking-wide">
          Ask Gemini Concierge
        </span>
      </button>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Modify Search Modal */}
      <ModifySearchModal
        isOpen={isModifySearchOpen}
        onClose={() => setIsModifySearchOpen(false)}
        searchParams={searchParams}
        onSave={params => {
          setSearchParams(params);
          setIsModifySearchOpen(false);
        }}
      />

      {/* Gemini AI Concierge Multi-Turn Chat Modal */}
      <GeminiConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
      />
    </div>
  );
}
