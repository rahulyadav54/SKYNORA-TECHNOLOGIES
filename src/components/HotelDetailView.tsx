import React, { useState } from 'react';
import { Property, BookingState, AppView } from '../types';
import { ROOM_OPTIONS, GALLERY_PHOTOS } from '../data/mockData';
import { GalleryModal } from './Modals';

interface HotelDetailViewProps {
  property: Property;
  bookingState: BookingState;
  onUpdateBooking: (updater: (prev: BookingState) => BookingState) => void;
  onProceedToCheckout: () => void;
  onNavigate: (view: AppView) => void;
  onToggleWishlist: (propertyId: string) => void;
}

export const HotelDetailView: React.FC<HotelDetailViewProps> = ({
  property,
  bookingState,
  onUpdateBooking,
  onProceedToCheckout,
  onNavigate,
  onToggleWishlist
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState('breakfast-hightea');
  const [selectedRoomId, setSelectedRoomId] = useState('superior-king');
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [shareToast, setShareToast] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  // Active room & meal plan pricing
  const currentRoom = ROOM_OPTIONS.find((r) => r.id === selectedRoomId) || ROOM_OPTIONS[0];
  const currentPlan =
    currentRoom.plans.find((p) => p.id === selectedPlanId) || currentRoom.plans[0];

  const pricePerNight = currentPlan.pricePerNight;
  const nights = bookingState.nights || 4;
  const baseTotal = pricePerNight * nights;
  const memberDiscount = 4000;
  const discountedBase = Math.max(0, baseTotal - memberDiscount);
  const gstTax = Math.round(discountedBase * 0.18);
  const totalPayable = discountedBase + gstTax;

  const handlePlanChange = (roomId: string, planId: string) => {
    setSelectedRoomId(roomId);
    setSelectedPlanId(planId);
    const room = ROOM_OPTIONS.find((r) => r.id === roomId) || ROOM_OPTIONS[0];
    const plan = room.plans.find((p) => p.id === planId) || room.plans[0];

    onUpdateBooking((prev) => ({
      ...prev,
      roomTitle: room.title,
      mealPlanTitle: plan.name,
      pricePerNight: plan.pricePerNight
    }));
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2500);
  };

  return (
    <div className="flex flex-col w-full bg-[#faf8ff] pb-16">
      {/* Gallery Modal */}
      <GalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        photos={GALLERY_PHOTOS}
      />

      {/* Share Toast */}
      {shareToast && (
        <div className="fixed top-24 right-6 z-50 bg-[#131a33] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-2xl flex items-center gap-2 border border-[#4cd7f6] animate-in fade-in">
          <span className="material-symbols-outlined text-[#4cd7f6] text-sm">check_circle</span>
          <span>Property link copied to clipboard!</span>
        </div>
      )}

      {/* Top Utility Context & Breadcrumbs */}
      <section className="w-full bg-[#f2f3ff] py-2.5 border-b border-[#eaedff]">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-[#45464d]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs flex-wrap font-medium">
            <button onClick={() => onNavigate('explore')} className="hover:text-[#4b41e1] transition-colors cursor-pointer">
              Home
            </button>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <button onClick={() => onNavigate('hotels')} className="hover:text-[#4b41e1] transition-colors cursor-pointer">
              Hotels & Stays
            </button>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <button onClick={() => onNavigate('hotels')} className="hover:text-[#4b41e1] transition-colors cursor-pointer">
              Goa
            </button>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-[#131b2e] font-bold truncate max-w-[200px] md:max-w-none">
              {property.title}
            </span>
          </nav>
          <div className="hidden md:flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-[#4b41e1] font-bold">
              <span className="material-symbols-outlined text-sm">verified_user</span> Skynora Signature Verified
            </span>
            <span className="inline-block w-1 h-1 rounded-full bg-[#c6c6ce]"></span>
            <span>Property ID: SKY-GOA-0842</span>
          </div>
        </div>
      </section>

      {/* Property Hero Header Section */}
      <section className="w-full bg-white pt-6 pb-4 border-b border-[#eaedff]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#131b2e] text-white text-xs uppercase tracking-wider font-bold">
                <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>
                  hotel_class
                </span>
                5-Star Luxury Heritage Resort
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#acedff] text-[#001f26] text-xs font-bold">
                Historic Portuguese Bastion
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#e2e7ff] text-[#4b41e1] text-xs font-bold">
                IHCL SeleQtions
              </span>
            </div>
            <h1 className="font-['Plus_Jakarta_Sans'] text-2xl sm:text-3xl lg:text-4xl text-[#131b2e] font-extrabold tracking-tight mt-1">
              {property.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#45464d]">
              <span className="flex items-center gap-1 text-[#131b2e] font-semibold">
                <span className="material-symbols-outlined text-[#4b41e1] text-sm">location_on</span>
                Sinquerim Beach, Candolim, North Goa (Near Historic Aguada Fort, 403515)
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#c6c6ce]"></span>
              <a href="#location-section" className="text-[#4b41e1] font-bold hover:underline">
                View on Map & Distances
              </a>
            </div>
          </div>

          {/* Header CTAs & Rating Badge */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <div className="flex items-center gap-2 bg-[#f2f3ff] px-4 py-2 rounded-2xl shadow-xs border border-[#eaedff]">
              <div className="w-10 h-10 rounded-xl bg-[#4b41e1] text-white flex items-center justify-center font-['Plus_Jakarta_Sans'] text-base font-extrabold">
                4.9
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-bold text-[#131b2e]">Exceptional</span>
                <span className="text-xs text-[#76767e]">1,420 Verified Reviews</span>
              </div>
            </div>

            <button
              onClick={() => onToggleWishlist(property.id)}
              className="w-11 h-11 flex items-center justify-center rounded-2xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] transition-all shadow-xs cursor-pointer border border-[#eaedff]"
              title="Save to Shortlist"
            >
              <span
                className={`material-symbols-outlined text-xl ${
                  property.isSaved ? 'text-rose-600' : 'text-[#131b2e]'
                }`}
                style={{ fontVariationSettings: property.isSaved ? "'FILL' 1" : "'FILL' 0" }}
              >
                favorite
              </span>
            </button>

            <button
              onClick={handleShare}
              className="w-11 h-11 flex items-center justify-center rounded-2xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] transition-all shadow-xs cursor-pointer border border-[#eaedff]"
              title="Share Experience"
            >
              <span className="material-symbols-outlined text-xl">share</span>
            </button>
          </div>
        </div>
      </section>

      {/* Editorial Photo Mosaic */}
      <section className="w-full bg-white pb-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 rounded-2xl overflow-hidden shadow-sm border border-[#eaedff]">
            {/* Main Hero Photo */}
            <div
              onClick={() => setIsGalleryOpen(true)}
              className="lg:col-span-7 relative h-80 sm:h-96 lg:h-[480px] overflow-hidden group cursor-pointer"
            >
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Taj Fort Aguada cliffside infinity pool"
                src={GALLERY_PHOTOS[0].url}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131a33]/80 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white pointer-events-none">
                <div className="bg-[#131a33]/70 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                  <p className="text-xs text-[#acedff] font-bold uppercase tracking-wider">Iconic Bastion Pool Deck</p>
                  <p className="font-['Plus_Jakarta_Sans'] text-base sm:text-lg font-bold text-white">
                    Cliffside Panorama over Sinquerim Bay
                  </p>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1 bg-white/95 backdrop-blur-xs text-[#131b2e] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  <span className="material-symbols-outlined text-[#4b41e1] text-sm">photo_camera</span>
                  Primary View
                </span>
              </div>
            </div>

            {/* 4 Secondary Mosaic Tiles */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-2 h-80 sm:h-96 lg:h-[480px]">
              {/* Tile 1 */}
              <div
                onClick={() => setIsGalleryOpen(true)}
                className="relative overflow-hidden group h-full cursor-pointer"
              >
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt="Luxury King Suite"
                  src={GALLERY_PHOTOS[1].url}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131a33]/60 to-transparent"></div>
                <span className="absolute bottom-2 left-2 text-white text-xs font-medium px-2 py-0.5 rounded bg-[#131a33]/60 backdrop-blur-xs">
                  Luxury King Suite
                </span>
              </div>

              {/* Tile 2 */}
              <div
                onClick={() => setIsGalleryOpen(true)}
                className="relative overflow-hidden group h-full cursor-pointer"
              >
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt="Private Ocean Balcony"
                  src={GALLERY_PHOTOS[2].url}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131a33]/60 to-transparent"></div>
                <span className="absolute bottom-2 left-2 text-white text-xs font-medium px-2 py-0.5 rounded bg-[#131a33]/60 backdrop-blur-xs">
                  Private Ocean Balcony
                </span>
              </div>

              {/* Tile 3 */}
              <div
                onClick={() => setIsGalleryOpen(true)}
                className="relative overflow-hidden group h-full cursor-pointer"
              >
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt="Award-Winning Jiva Spa"
                  src={GALLERY_PHOTOS[3].url}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131a33]/60 to-transparent"></div>
                <span className="absolute bottom-2 left-2 text-white text-xs font-medium px-2 py-0.5 rounded bg-[#131a33]/60 backdrop-blur-xs">
                  Award-Winning Jiva Spa
                </span>
              </div>

              {/* Tile 4 with Gallery Overlay Button */}
              <div className="relative overflow-hidden group h-full">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt="Sunset Dining"
                  src={GALLERY_PHOTOS[4].url}
                />
                <div className="absolute inset-0 bg-[#131a33]/50"></div>
                <button
                  onClick={() => setIsGalleryOpen(true)}
                  className="absolute inset-0 flex flex-col items-center justify-center text-white hover:bg-[#131a33]/70 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-3xl">collections</span>
                  <span className="font-['Plus_Jakarta_Sans'] text-lg font-bold mt-1">+18 Photos</span>
                  <span className="text-xs text-[#acedff] font-semibold">Virtual 360° Tour</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky In-Page Navigation Bar */}
      <section className="sticky top-20 z-40 bg-white shadow-xs border-y border-[#eaedff]">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto scrollbar-none">
          <nav className="flex items-center gap-2 py-2 min-w-max text-xs font-bold">
            <a href="#overview-section" className="px-4 py-1.5 rounded-full bg-[#4b41e1] text-white shadow-xs">
              Overview
            </a>
            <a
              href="#rooms-section"
              className="px-4 py-1.5 rounded-full text-[#45464d] hover:bg-[#f2f3ff] hover:text-[#131b2e] transition-colors"
            >
              Room Options & Rates
            </a>
            <a
              href="#amenities-section"
              className="px-4 py-1.5 rounded-full text-[#45464d] hover:bg-[#f2f3ff] hover:text-[#131b2e] transition-colors"
            >
              Amenities
            </a>
            <a
              href="#location-section"
              className="px-4 py-1.5 rounded-full text-[#45464d] hover:bg-[#f2f3ff] hover:text-[#131b2e] transition-colors"
            >
              Location & Surroundings
            </a>
            <a
              href="#reviews-section"
              className="px-4 py-1.5 rounded-full text-[#45464d] hover:bg-[#f2f3ff] hover:text-[#131b2e] transition-colors"
            >
              Guest Reviews (4.9★)
            </a>
            <a
              href="#policies-section"
              className="px-4 py-1.5 rounded-full text-[#45464d] hover:bg-[#f2f3ff] hover:text-[#131b2e] transition-colors"
            >
              Hotel Policies
            </a>
          </nav>
        </div>
      </section>

      {/* Main Content Layout (Left Column 8 + Right Sidebar 4) */}
      <div className="w-full py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Details, Rooms, Experiences (8 Cols) */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              {/* Key Highlights Badges Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white p-3.5 rounded-2xl shadow-xs flex items-center gap-3 border border-[#eaedff]">
                  <span className="material-symbols-outlined text-[#4b41e1] text-2xl">beach_access</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#131b2e]">Beachfront</span>
                    <span className="text-[11px] text-[#45464d]">Direct Private Access</span>
                  </div>
                </div>
                <div className="bg-white p-3.5 rounded-2xl shadow-xs flex items-center gap-3 border border-[#eaedff]">
                  <span className="material-symbols-outlined text-[#4b41e1] text-2xl">free_breakfast</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#131b2e]">Breakfast</span>
                    <span className="text-[11px] text-[#45464d]">Included in Plan</span>
                  </div>
                </div>
                <div className="bg-white p-3.5 rounded-2xl shadow-xs flex items-center gap-3 border border-[#eaedff]">
                  <span className="material-symbols-outlined text-[#4b41e1] text-2xl">event_available</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#131b2e]">Cancellation</span>
                    <span className="text-[11px] text-[#45464d]">Free up to 48 hrs</span>
                  </div>
                </div>
                <div className="bg-white p-3.5 rounded-2xl shadow-xs flex items-center gap-3 border border-[#eaedff]">
                  <span className="material-symbols-outlined text-[#4b41e1] text-2xl">workspace_premium</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#131b2e]">Partner Perks</span>
                    <span className="text-[11px] text-[#45464d]">IRCTC/IATA Elite</span>
                  </div>
                </div>
              </div>

              {/* Section: Overview */}
              <section
                id="overview-section"
                className="bg-white p-6 rounded-2xl shadow-xs flex flex-col gap-4 border border-[#eaedff]"
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#131b2e]">
                    About This Heritage Sanctuary
                  </h2>
                  <span className="text-xs font-bold text-[#4b41e1] uppercase tracking-wider">
                    Est. 1974 • Renovated 2023
                  </span>
                </div>
                <p className="text-sm text-[#45464d] leading-relaxed">
                  Perched dramatically on the historic ramparts of a 16th-century Portuguese fortress, Taj Fort Aguada Resort
                  & Spa stands as Goa’s first luxury beach sanctuary. Spread gracefully across 73 acres of cascading cliffside
                  gardens facing Sinquerim Bay, the property weaves storied Goan-Portuguese architectural grandeur with bespoke
                  modern hospitality.
                </p>
                <p className="text-xs sm:text-sm text-[#45464d] leading-relaxed">
                  Indulge in authentic Mediterranean and Goan coastal culinary mastery at <em>Morisco</em>, unwind with
                  therapeutic Ayurvedic ceremonies at the acclaimed <em>Jiva Spa</em>, or saunter directly down to golden sandy
                  shores with personalized beach concierge service.
                </p>

                {/* Quick Facts Bento */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                  <div className="bg-[#f2f3ff] p-3 rounded-xl border border-[#eaedff]">
                    <span className="text-[11px] text-[#45464d] uppercase font-semibold">Check-In</span>
                    <p className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e]">2:00 PM</p>
                    <span className="text-[11px] text-[#4b41e1] font-semibold">Priority Early Arrival</span>
                  </div>
                  <div className="bg-[#f2f3ff] p-3 rounded-xl border border-[#eaedff]">
                    <span className="text-[11px] text-[#45464d] uppercase font-semibold">Check-Out</span>
                    <p className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e]">12:00 PM</p>
                    <span className="text-[11px] text-[#45464d]">Express Key Drop</span>
                  </div>
                  <div className="bg-[#f2f3ff] p-3 rounded-xl border border-[#eaedff]">
                    <span className="text-[11px] text-[#45464d] uppercase font-semibold">Property Size</span>
                    <p className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e]">73 Acres</p>
                    <span className="text-[11px] text-[#45464d]">143 Sea-Facing Rooms</span>
                  </div>
                  <div className="bg-[#f2f3ff] p-3 rounded-xl border border-[#eaedff]">
                    <span className="text-[11px] text-[#45464d] uppercase font-semibold">Airport Distance</span>
                    <p className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e]">38.4 km</p>
                    <span className="text-[11px] text-[#45464d]">Dabolim (GOI) / Mopa</span>
                  </div>
                </div>
              </section>

              {/* Section: Select Your Room & Availability */}
              <section id="rooms-section" className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#131b2e]">
                      Select Your Room & Availability
                    </h2>
                    <p className="text-xs text-[#45464d]">
                      Showing live real-time rates for{' '}
                      <span className="font-bold text-[#131b2e]">18 Nov - 22 Nov (4 Nights, 2 Adults)</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-[#45464d] font-semibold">Currency:</span>
                    <span className="px-3 py-1 bg-white rounded-lg text-xs font-bold text-[#4b41e1] shadow-xs border border-[#eaedff]">
                      ₹ INR
                    </span>
                  </div>
                </div>

                {/* CARD 1: SUPERIOR KING ROOM (Primary / Active Room) */}
                <div
                  className={`bg-white rounded-2xl shadow-xs overflow-hidden transition-all border-2 ${
                    selectedRoomId === 'superior-king' ? 'border-[#4b41e1] shadow-md' : 'border-[#eaedff]'
                  }`}
                >
                  <div className="bg-[#4b41e1] px-4 py-1.5 flex items-center justify-between text-white text-xs font-bold">
                    <span className="flex items-center gap-1 uppercase tracking-wider">
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                      {selectedRoomId === 'superior-king' ? 'Selected Choice' : 'Available'}
                    </span>
                    <span>Most Popular for Couples</span>
                  </div>

                  <div className="p-6 flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      {/* Room Image */}
                      <div className="md:col-span-4 flex flex-col gap-2">
                        <div className="relative rounded-xl overflow-hidden h-48 md:h-full">
                          <img
                            className="w-full h-full object-cover"
                            alt="Superior King Room"
                            src={ROOM_OPTIONS[0].image}
                          />
                          <span className="absolute top-2 left-2 bg-[#131a33]/80 backdrop-blur-xs text-[#acedff] text-[10px] font-bold px-2 py-0.5 rounded">
                            {ROOM_OPTIONS[0].size}
                          </span>
                        </div>
                      </div>

                      {/* Room Specs & Rate Options */}
                      <div className="md:col-span-8 flex flex-col justify-between gap-3">
                        <div>
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e]">
                                {ROOM_OPTIONS[0].title}
                              </h3>
                              <p className="text-xs text-[#45464d] mt-0.5">{ROOM_OPTIONS[0].wing}</p>
                            </div>
                            <span className="px-2 py-1 rounded-md bg-[#e2e7ff] text-[#4b41e1] text-[11px] font-bold">
                              {ROOM_OPTIONS[0].tag}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-[#45464d]">
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-xs text-[#4b41e1]">king_bed</span> 1 Plush King Bed
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-xs text-[#4b41e1]">balcony</span> Private Balcony
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-xs text-[#4b41e1]">shower</span> Marble Rain Shower
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-xs text-[#4b41e1]">coffee</span> Nespresso Machine
                            </span>
                          </div>
                        </div>

                        {/* Meal & Rate Options */}
                        <div className="flex flex-col gap-2 pt-2 border-t border-[#f2f3ff]">
                          <span className="text-[11px] font-bold text-[#131b2e] uppercase tracking-wider">
                            Choose Meal Plan & Policy:
                          </span>

                          {ROOM_OPTIONS[0].plans.map((plan) => (
                            <label
                              key={plan.id}
                              onClick={() => handlePlanChange('superior-king', plan.id)}
                              className={`flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer border ${
                                selectedRoomId === 'superior-king' && selectedPlanId === plan.id
                                  ? 'bg-[#dae2fd]/60 border-[#4b41e1] shadow-2xs'
                                  : 'bg-[#f2f3ff] hover:bg-[#eaedff] border-transparent'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <input
                                  type="radio"
                                  name="superior_plan"
                                  checked={selectedRoomId === 'superior-king' && selectedPlanId === plan.id}
                                  onChange={() => handlePlanChange('superior-king', plan.id)}
                                  className="w-4 h-4 text-[#4b41e1] accent-[#4b41e1]"
                                />
                                <div className="flex flex-col">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-[#131b2e]">{plan.name}</span>
                                    {plan.badge && (
                                      <span className="px-2 py-0.5 rounded-full bg-[#e2dfff] text-[#0f0069] text-[10px] font-bold uppercase">
                                        {plan.badge}
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[11px] text-[#45464d]">{plan.description}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e]">
                                  ₹{plan.pricePerNight.toLocaleString('en-IN')}
                                </span>
                                <span className="text-[10px] text-[#76767e] block">/ night</span>
                              </div>
                            </label>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <span className="flex items-center gap-1 text-xs text-[#45464d]">
                            <span className="material-symbols-outlined text-sm text-[#4b41e1]">bolt</span> Instant Confirmation Voucher • Only 3 rooms left
                          </span>
                          <span className="text-xs text-[#4b41e1] font-bold">Active in Booking Summary ↓</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CARD 2: PORTUGUESE HERITAGE SUITE */}
                <div
                  className={`bg-white rounded-2xl shadow-xs p-6 flex flex-col gap-4 border transition-all ${
                    selectedRoomId === 'portuguese-suite' ? 'border-[#4b41e1] shadow-md' : 'border-[#eaedff]'
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-4 flex flex-col gap-2">
                      <div className="relative rounded-xl overflow-hidden h-48 md:h-full">
                        <img
                          className="w-full h-full object-cover"
                          alt="Portuguese Heritage Suite"
                          src={ROOM_OPTIONS[1].image}
                        />
                        <span className="absolute top-2 left-2 bg-[#001f26]/85 backdrop-blur-xs text-[#acedff] text-[10px] font-bold px-2 py-0.5 rounded">
                          {ROOM_OPTIONS[1].size}
                        </span>
                      </div>
                    </div>

                    <div className="md:col-span-8 flex flex-col justify-between gap-3">
                      <div>
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e]">
                                {ROOM_OPTIONS[1].title}
                              </h3>
                              <span className="px-2 py-0.5 rounded-full bg-[#acedff] text-[#001f26] text-[10px] font-bold uppercase">
                                Ultra Luxury
                              </span>
                            </div>
                            <p className="text-xs text-[#45464d] mt-0.5">{ROOM_OPTIONS[1].wing}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-[#45464d]">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs text-[#4b41e1]">pool</span> Private Plunge Pool
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs text-[#4b41e1]">person_check</span> 24x7 Butler
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs text-[#4b41e1]">bathtub</span> Jacuzzi Tub
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs text-[#4b41e1]">airport_shuttle</span> Luxury Mercedes Airport Pick-up
                          </span>
                        </div>

                        <div className="mt-3 p-3 bg-[#f2f3ff] rounded-xl flex items-center justify-between border border-[#eaedff]">
                          <div>
                            <span className="text-xs font-bold text-[#131b2e]">Includes Butler Breakfast & Sunset Cocktails</span>
                            <p className="text-[11px] text-[#45464d]">Cancellation refundable up to 7 days prior</p>
                          </div>
                          <div className="text-right">
                            <span className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#131b2e]">₹29,500</span>
                            <span className="text-[10px] text-[#76767e] block">/ night</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-rose-600 font-semibold">Only 1 suite available</span>
                        <button
                          onClick={() => handlePlanChange('portuguese-suite', 'suite-butler')}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                            selectedRoomId === 'portuguese-suite'
                              ? 'bg-[#4b41e1] text-white'
                              : 'bg-[#e2e7ff] text-[#4b41e1] hover:bg-[#4b41e1] hover:text-white'
                          }`}
                        >
                          {selectedRoomId === 'portuguese-suite' ? 'Selected' : 'Select Suite'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CARD 3: GARDEN VIEW DELUXE TWIN */}
                <div
                  className={`bg-white rounded-2xl shadow-xs p-6 flex flex-col gap-4 border transition-all ${
                    selectedRoomId === 'garden-deluxe' ? 'border-[#4b41e1] shadow-md' : 'border-[#eaedff]'
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-4 flex flex-col gap-2">
                      <div className="relative rounded-xl overflow-hidden h-48 md:h-full">
                        <img
                          className="w-full h-full object-cover"
                          alt="Garden View Deluxe Twin"
                          src={ROOM_OPTIONS[2].image}
                        />
                        <span className="absolute top-2 left-2 bg-[#131a33]/80 backdrop-blur-xs text-[#acedff] text-[10px] font-bold px-2 py-0.5 rounded">
                          {ROOM_OPTIONS[2].size}
                        </span>
                      </div>
                    </div>

                    <div className="md:col-span-8 flex flex-col justify-between gap-3">
                      <div>
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e]">
                              {ROOM_OPTIONS[2].title}
                            </h3>
                            <p className="text-xs text-[#45464d] mt-0.5">{ROOM_OPTIONS[2].wing}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-[#45464d]">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs text-[#4b41e1]">bed</span> 2 Twin Beds
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs text-[#4b41e1]">deck</span> Garden Deck
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs text-[#4b41e1]">shower</span> Walk-in Shower
                          </span>
                        </div>

                        <div className="mt-3 p-3 bg-[#f2f3ff] rounded-xl flex items-center justify-between border border-[#eaedff]">
                          <div>
                            <span className="text-xs font-bold text-[#131b2e]">Continental Breakfast Option Available</span>
                            <p className="text-[11px] text-[#45464d]">Free cancellation within 24h</p>
                          </div>
                          <div className="text-right">
                            <span className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#131b2e]">₹14,200</span>
                            <span className="text-[10px] text-[#76767e] block">/ night</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-[#76767e]">5 twin rooms available</span>
                        <button
                          onClick={() => handlePlanChange('garden-deluxe', 'deluxe-twin')}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                            selectedRoomId === 'garden-deluxe'
                              ? 'bg-[#4b41e1] text-white'
                              : 'bg-[#e2e7ff] text-[#4b41e1] hover:bg-[#4b41e1] hover:text-white'
                          }`}
                        >
                          {selectedRoomId === 'garden-deluxe' ? 'Selected' : 'Select Room'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section: Amenities Grid */}
              <section
                id="amenities-section"
                className="bg-white p-6 rounded-2xl shadow-xs flex flex-col gap-4 border border-[#eaedff]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#131b2e]">
                      Featured Amenities & Resort Perks
                    </h2>
                    <p className="text-xs text-[#45464d]">Curated luxury services designed for seamless leisure and heritage wellness.</p>
                  </div>
                  <button
                    onClick={() => setShowAllAmenities(!showAllAmenities)}
                    className="text-xs font-bold text-[#4b41e1] hover:underline cursor-pointer"
                  >
                    {showAllAmenities ? 'Show Fewer Amenities' : 'View All 48 Amenities'}
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
                  {[
                    { icon: 'wifi', title: 'High-Speed Wi-Fi', desc: 'Complimentary everywhere' },
                    { icon: 'pool', title: 'Infinity Ocean Pool', desc: 'Cliffside with deck bar' },
                    { icon: 'spa', title: 'Jiva Ayurvedic Spa', desc: 'Authentic wellness rituals' },
                    { icon: 'fitness_center', title: 'Fitness Studio', desc: '24/7 Technogym' },
                    { icon: 'room_service', title: '24h In-Room Dining', desc: 'Full gourmet menu' },
                    { icon: 'local_bar', title: 'SFX Martini Bar', desc: 'Sunset mixology loungers' },
                    { icon: 'directions_car', title: 'Valet Parking', desc: 'Complimentary covered' },
                    { icon: 'ev_station', title: 'EV Fast Charging', desc: 'Type-2 & CCS2 stations' },
                    { icon: 'local_taxi', title: 'Airport Concierge', desc: 'Chauffeured sedan service' },
                    { icon: 'sports_tennis', title: 'Tennis & Squash', desc: 'Floodlit all-weather court' },
                    { icon: 'child_friendly', title: 'Kids Activity Club', desc: 'Supervised play lounge' },
                    { icon: 'restaurant', title: '5 Specialty Dining', desc: 'Seafood, Goan & Global' },
                    ...(showAllAmenities ? [
                      { icon: 'sailing', title: 'Yacht Charter Dock', desc: 'Direct boat boarding' },
                      { icon: 'deck', title: 'Private Sun Deck', desc: 'Ocean lounger cushions' },
                      { icon: 'lock', title: 'In-Room Electronic Safe', desc: 'Laptop size security' },
                      { icon: 'medical_services', title: 'On-Call Doctor', desc: '24x7 medical assistance' },
                      { icon: 'currency_exchange', title: 'Foreign Exchange', desc: 'Multi-currency desk' },
                      { icon: 'dry_cleaning', title: 'Express Laundry', desc: 'Same-day turnaround' },
                      { icon: 'luggage', title: 'Luggage Storage', desc: 'Pre-checkin concierge' },
                      { icon: 'accessibility_new', title: 'Barrier-Free Access', desc: 'Wheelchair ramps & lifts' }
                    ] : [])
                  ].map((amenity) => (
                    <div key={amenity.title} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#f2f3ff] border border-[#eaedff]">
                      <span className="material-symbols-outlined text-[#4b41e1] text-xl">{amenity.icon}</span>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#131b2e] leading-tight">{amenity.title}</span>
                        <span className="text-[10px] text-[#45464d]">{amenity.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section: Location & Surroundings */}
              <section
                id="location-section"
                className="bg-white p-6 rounded-2xl shadow-xs flex flex-col gap-4 border border-[#eaedff]"
              >
                <div>
                  <h2 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#131b2e]">
                    Location & Nearby Landmarks
                  </h2>
                  <p className="text-xs text-[#45464d]">
                    Sinquerim Beach, Candolim, North Goa • Centered right beside the 17th-century lighthouse bastion.
                  </p>
                </div>

                {/* Map Preview */}
                <div
                  className="w-full h-72 rounded-2xl relative overflow-hidden bg-cover bg-center shadow-inner border border-[#eaedff]"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDYhk2jhFoQQOv81CW2NuWtwoJHK8jBKI1AvNjWeIdBEpR_UtdPpnj_G_wdtNCtx-jQJFj6_lfbYHnk_dLfsVbQ7kRSLZmYgB4M8psE9CBZ7X-X-jojY0g14i8ssHP9QzlohM6-bYqm3bV4fCd8Nq2E0IqO9Xc2u27h3B2KVSddt5Ioo_kxdhwTrPru280U2AU6SRT2eeM8tQETDESuKFhVqqPrGXMvfAE6qg6QgWTGFjjM_c2VqTL6Tg')`
                  }}
                >
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-md flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#4b41e1]">explore</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#131b2e]">Direct Beach Frontage</span>
                      <span className="text-[11px] text-[#45464d]">Sinquerim Fort Ramparts (400 m)</span>
                    </div>
                  </div>
                </div>

                {/* Landmarks Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
                  {[
                    { place: 'Historic Aguada Fort', dist: '0.6 km • 3 min' },
                    { place: 'Candolim High Street', dist: '2.8 km • 8 min' },
                    { place: 'Calangute Beach', dist: '5.2 km • 14 min' },
                    { place: 'Panaji Heritage Quarter', dist: '15.0 km • 30 min' },
                    { place: 'Manohar Mopa Intl Airport', dist: '32.0 km • 50 min' },
                    { place: 'Dabolim Airport (GOI)', dist: '38.4 km • 55 min' }
                  ].map((l) => (
                    <div key={l.place} className="p-3 rounded-xl bg-[#f2f3ff] flex items-center justify-between border border-[#eaedff]">
                      <span className="text-xs text-[#131b2e] font-medium">{l.place}</span>
                      <span className="text-xs font-bold text-[#4b41e1]">{l.dist}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section: Guest Reviews */}
              <section
                id="reviews-section"
                className="bg-white p-6 rounded-2xl shadow-xs flex flex-col gap-4 border border-[#eaedff]"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#131b2e]">
                      Guest Ratings & Experiences
                    </h2>
                    <p className="text-xs text-[#45464d]">Aggregated from 1,420 verified reservations through Skynora Travels.</p>
                  </div>
                  <div className="px-4 py-1.5 rounded-xl bg-[#e2e7ff] flex items-center gap-1 font-['Plus_Jakarta_Sans'] text-base font-bold text-[#4b41e1]">
                    <span className="material-symbols-outlined text-[#4b41e1]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span>4.9 / 5</span>
                  </div>
                </div>

                {/* Category Progress Bars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-[#f2f3ff] rounded-xl border border-[#eaedff]">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-[#131b2e]">Location & Ocean Views</span>
                      <span className="font-bold text-[#4b41e1]">5.0 / 5.0</span>
                    </div>
                    <div className="w-full bg-[#eaedff] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#4b41e1] h-full rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-[#131b2e]">Hygiene & Cleanliness</span>
                      <span className="font-bold text-[#4b41e1]">4.9 / 5.0</span>
                    </div>
                    <div className="w-full bg-[#eaedff] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#4b41e1] h-full rounded-full" style={{ width: '98%' }}></div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-[#131b2e]">Taj Hospitality & Service</span>
                      <span className="font-bold text-[#4b41e1]">4.8 / 5.0</span>
                    </div>
                    <div className="w-full bg-[#eaedff] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#4b41e1] h-full rounded-full" style={{ width: '96%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Review Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="p-4 rounded-xl bg-[#f2f3ff] flex flex-col justify-between gap-3 border border-[#eaedff]">
                    <p className="text-xs text-[#45464d] italic leading-relaxed">
                      “Waking up to the Arabian sea right outside the balcony and having the authentic breakfast spread at
                      Caravela is unmatchable. The cliffside pool view at sunset is breathtaking.”
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#e2dfff] flex items-center justify-center font-bold text-[#4b41e1] text-xs">
                          AK
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#131b2e]">Aditya Kulkarni</p>
                          <p className="text-[11px] text-[#76767e]">Superior King Room • Oct 2024</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">
                        Verified Stay
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#f2f3ff] flex flex-col justify-between gap-3 border border-[#eaedff]">
                    <p className="text-xs text-[#45464d] italic leading-relaxed">
                      “Brought my parents for their 30th anniversary. The butler service at the heritage villa and the private
                      beach access made this the most memorable trip to North Goa.”
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#e2dfff] flex items-center justify-center font-bold text-[#4b41e1] text-xs">
                          RM
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#131b2e]">Rhea Mukherjee</p>
                          <p className="text-[11px] text-[#76767e]">Heritage Suite • Sep 2024</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">
                        Verified Stay
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section: Hotel Policies */}
              <section
                id="policies-section"
                className="bg-white p-6 rounded-2xl shadow-xs flex flex-col gap-3 border border-[#eaedff]"
              >
                <h2 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#131b2e]">Important Hotel Policies</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 text-xs text-[#45464d]">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#4b41e1] text-lg">schedule</span>
                    <div>
                      <strong className="text-[#131b2e] block font-semibold">Check-In / Out Windows</strong>
                      Standard check-in starts at 2:00 PM. Check-out is strictly until 12:00 noon. Early check-in is subject to
                      availability upon arrival.
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#4b41e1] text-lg">badge</span>
                    <div>
                      <strong className="text-[#131b2e] block font-semibold">Government Identification</strong>
                      All Indian nationals must present Aadhaar, Passport, or Voter ID. PAN card is not accepted as valid identity proof.
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#4b41e1] text-lg">child_care</span>
                    <div>
                      <strong className="text-[#131b2e] block font-semibold">Child Occupancy Policy</strong>
                      Up to two children below 5 years stay complimentary in existing bedding with parents including buffet breakfast.
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#4b41e1] text-lg">pets</span>
                    <div>
                      <strong className="text-[#131b2e] block font-semibold">Pet Regulations</strong>
                      Selected private villas are pet-friendly upon advance intimation with dedicated pet dining menus and bedding.
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column: Sticky Booking Sidebar Summary Widget (4 Cols) */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col gap-4">
              <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-4 border border-[#eaedff]">
                {/* Header & Deal Pill */}
                <div className="flex items-center justify-between pb-1">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#4b41e1] text-white text-xs font-bold tracking-wide">
                    <span className="material-symbols-outlined text-sm">local_fire_department</span> Member Exclusive Deal
                  </span>
                  <span className="text-xs text-[#45464d] font-semibold">{nights} Nights Trip</span>
                </div>

                {/* Date & Guest Quick Editor */}
                <div className="bg-[#f2f3ff] p-3 rounded-xl flex flex-col gap-2 border border-[#eaedff]">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white p-2 rounded-lg flex items-center gap-2 border border-[#eaedff]">
                      <span className="material-symbols-outlined text-[#4b41e1] text-base">calendar_month</span>
                      <div className="flex flex-col leading-tight">
                        <span className="text-[10px] text-[#76767e]">Dates</span>
                        <span className="text-xs font-bold text-[#131b2e]">18 - 22 Nov</span>
                      </div>
                    </div>
                    <div className="bg-white p-2 rounded-lg flex items-center gap-2 border border-[#eaedff]">
                      <span className="material-symbols-outlined text-[#4b41e1] text-base">group</span>
                      <div className="flex flex-col leading-tight">
                        <span className="text-[10px] text-[#76767e]">Guests</span>
                        <span className="text-xs font-bold text-[#131b2e]">{bookingState.guests}</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-1 pt-1 flex items-center justify-between text-xs text-[#45464d]">
                    <span className="font-semibold text-[#131b2e] truncate max-w-[200px]">
                      {currentRoom.title} ({currentPlan.name.split(':')[0]})
                    </span>
                    <a href="#rooms-section" className="text-[#4b41e1] font-bold hover:underline shrink-0">
                      Change
                    </a>
                  </div>
                </div>

                {/* Price Breakdown Calculation Table */}
                <div className="flex flex-col gap-2 pt-1 text-xs">
                  <div className="flex justify-between items-center text-[#131b2e]">
                    <span>
                      Base Rate: ₹{pricePerNight.toLocaleString('en-IN')} × {nights} Nights
                    </span>
                    <span className="font-bold">₹{baseTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-[#4b41e1]">
                    <span className="flex items-center gap-1 font-semibold">
                      <span className="material-symbols-outlined text-sm">loyalty</span> Skynora Member Discount
                    </span>
                    <span className="font-bold">-₹{memberDiscount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-[#45464d]">
                    <span>Resort GST & Luxury Surcharge (18%)</span>
                    <span className="font-semibold">₹{gstTax.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-[#45464d]">
                    <span className="flex items-center gap-1">
                      <span>Skynora Convenience Fee</span>
                      <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-[10px] text-emerald-700 font-bold">
                        WAIVED
                      </span>
                    </span>
                    <span className="line-through text-[#76767e]">₹1,200</span>
                  </div>
                </div>

                {/* Total Payable Display Box */}
                <div className="p-4 rounded-xl bg-[#e2e7ff] flex flex-col gap-1 border border-[#c3c0ff]">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[11px] text-[#45464d] uppercase font-bold tracking-wider">Total Payable:</span>
                      <p className="text-[11px] text-[#45464d]">All taxes and resort fees included</p>
                    </div>
                    <div className="text-right">
                      <span className="font-['Plus_Jakarta_Sans'] text-2xl font-extrabold text-[#4b41e1]">
                        ₹{totalPayable.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-[#c3c0ff]/60 flex items-center justify-between text-xs text-[#131b2e]">
                    <span className="flex items-center gap-1 font-semibold">
                      <span className="material-symbols-outlined text-sm text-[#4b41e1]">account_balance_wallet</span> Instant UPI Cashback:
                    </span>
                    <span className="font-bold text-[#4b41e1]">₹1,500 via GPay/PhonePe</span>
                  </div>
                </div>

                {/* Primary Action Button */}
                <button
                  onClick={onProceedToCheckout}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#4b41e1] hover:bg-[#645efb] text-white text-base font-bold shadow-lg shadow-[#4b41e1]/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </button>

                {/* Trust Assurances */}
                <div className="flex flex-col gap-1.5 text-xs text-[#45464d]">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-[#4b41e1]">check_circle</span>
                    <span>
                      Zero cancellation fee till <strong className="text-[#131b2e]">16 Nov, 11:59 PM</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-[#4b41e1]">verified</span>
                    <span>Guaranteed Best Price or 100% price match refund</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-[#4b41e1]">lock</span>
                    <span>Instant confirmation voucher sent to WhatsApp & Email</span>
                  </div>
                </div>

                {/* Emergency Concierge Helpline */}
                <div className="p-3 rounded-xl bg-[#f2f3ff] flex items-center justify-between border border-[#eaedff]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#4b41e1]">support_agent</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#131b2e]">Need assistance?</span>
                      <span className="text-[11px] text-[#45464d]">24/7 Goa Concierge</span>
                    </div>
                  </div>
                  <a
                    href="tel:+9118002008899"
                    className="px-3 py-1 bg-white rounded-lg text-xs font-bold text-[#4b41e1] shadow-xs border border-[#eaedff]"
                  >
                    Call Concierge
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};
