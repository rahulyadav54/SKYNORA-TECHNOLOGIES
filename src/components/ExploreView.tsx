import React, { useState } from 'react';
import { SearchParams, SearchTab, AppView } from '../types';

interface ExploreViewProps {
  onNavigate: (view: AppView) => void;
  onSearch: (params: SearchParams) => void;
  onApplyPromoCode: (code: string) => void;
  onPlanTripPackage: (budget: number, vibe: string) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  onNavigate,
  onSearch,
  onApplyPromoCode,
  onPlanTripPackage
}) => {
  const [activeTab, setActiveTab] = useState<SearchTab>('hotels');
  const [destination, setDestination] = useState('Goa, India (All Areas)');
  const [dates, setDates] = useState('18 Nov - 22 Nov');
  const [guests, setGuests] = useState('2 Adults, 1 Room');

  // AI Trip Planner states
  const [budget, setBudget] = useState(45000);
  const [departureCity, setDepartureCity] = useState('BOM');
  const [selectedVibe, setSelectedVibe] = useState('Beach & Wellness');
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [claimedCode, setClaimedCode] = useState<string | null>(null);
  const [appDownloadNotice, setAppDownloadNotice] = useState(false);

  const handleTabChange = (tab: SearchTab) => {
    setActiveTab(tab);
    if (tab === 'buses') {
      setDestination('Mumbai to Goa (Panjim / Mapusa)');
      setDates('18 Nov 2025');
      setGuests('1 Berth • AC Sleeper');
    } else if (tab === 'flights') {
      setDestination('BOM (Mumbai) ➔ GOI (Goa Dabolim)');
      setDates('18 Nov 2025');
      setGuests('1 Adult • Economy');
    } else if (tab === 'trains') {
      setDestination('CSMT (Mumbai) ➔ MAO (Madgaon)');
      setDates('18 Nov 2025');
      setGuests('AC Chair Car (Vande Bharat)');
    } else if (tab === 'cabs') {
      setDestination('Goa Airport (GOI) ➔ Candolim');
      setDates('18 Nov 2025');
      setGuests('Toyota Innova Crysta');
    } else if (tab === 'events') {
      setDestination('North Goa Coastal Sunset & Water Sports');
      setDates('19 Nov 2025');
      setGuests('2 Guest Passes');
    } else {
      setDestination('Goa, India (Candolim & Sinquerim)');
      setDates('18 Nov - 22 Nov');
      setGuests('2 Adults, 1 Room');
    }
  };

  const handleSearchSubmit = () => {
    onSearch({
      destination,
      checkIn: '18 Nov',
      checkOut: '22 Nov',
      nights: 4,
      guests,
      category: activeTab
    });
    if (activeTab === 'buses') {
      onNavigate('buses');
    } else if (activeTab === 'flights') {
      onNavigate('flights');
    } else if (activeTab === 'trains') {
      onNavigate('trains');
    } else if (activeTab === 'cabs') {
      onNavigate('cabs');
    } else if (activeTab === 'events') {
      onNavigate('experiences');
    } else {
      onNavigate('hotels');
    }
  };

  const handleClaimPromo = (code: string) => {
    onApplyPromoCode(code);
    setClaimedCode(code);
    setTimeout(() => setClaimedCode(null), 3000);
  };

  const handleRegeneratePlan = () => {
    setIsGeneratingPlan(true);
    setTimeout(() => {
      setIsGeneratingPlan(false);
    }, 600);
  };

  // Dynamic budget allocation calculations
  const transportCost = Math.round(budget * 0.37);
  const accommodationCost = Math.round(budget * 0.41);
  const experiencesCost = Math.round(budget * 0.18);
  const bufferCost = budget - transportCost - accommodationCost - experiencesCost;

  return (
    <div className="flex flex-col w-full bg-[#faf8ff]">
      {/* Toast alert if promo claimed */}
      {claimedCode && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#131a33] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-[#4cd7f6] animate-bounce">
          <span className="material-symbols-outlined text-[#4cd7f6]">check_circle</span>
          <span className="text-sm font-bold">Coupon code {claimedCode} applied for your checkout!</span>
        </div>
      )}

      {/* HERO SECTION WITH UNIFIED SEARCH */}
      <section className="relative w-full pt-16 pb-20 bg-[#131a33] text-white overflow-hidden">
        {/* Ambient Glows & Constellation Vectors */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#645efb]/20 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 -right-20 w-[30rem] h-[30rem] rounded-full bg-[#4cd7f6]/15 blur-3xl pointer-events-none"></div>
        <svg
          className="absolute inset-0 w-full h-full opacity-10 pointer-events-none stroke-[#dae2fd]/30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern height="64" id="celestial-grid" patternUnits="userSpaceOnUse" width="64">
              <circle cx="32" cy="32" fill="currentColor" r="1"></circle>
              <path d="M0 32h64M32 0v64" stroke="currentColor" strokeDasharray="2 6" strokeWidth="0.5"></path>
            </pattern>
          </defs>
          <rect fill="url(#celestial-grid)" height="100%" width="100%"></rect>
        </svg>

        <div className="relative max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
          {/* Micro-Trust Badges Pill Strip */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 shadow-sm border border-white/10">
            <div className="flex items-center gap-1 text-[#4cd7f6]">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              <span className="text-xs font-semibold text-white">4.9/5 from 2.4M+ Indian Travelers</span>
            </div>
            <span className="text-[#7b83a0] text-xs">•</span>
            <span className="text-xs text-[#dae2fd] font-medium">
              Zero Convenience Fee with code{' '}
              <button
                onClick={() => handleClaimPromo('SKYNORA100')}
                className="text-[#acedff] font-bold tracking-wider hover:underline cursor-pointer"
              >
                SKYNORA100
              </button>
            </span>
            <span className="text-[#7b83a0] text-xs">•</span>
            <div className="flex items-center gap-1 text-white text-xs font-semibold">
              <span className="material-symbols-outlined text-xs text-[#acedff]">bolt</span>
              <span>Instant UPI Refunds</span>
            </div>
          </div>

          {/* Hero Headline & Subhead */}
          <h1 className="font-['Plus_Jakarta_Sans'] text-4xl sm:text-5xl lg:text-6xl text-white max-w-4xl tracking-tight mb-4 font-extrabold leading-tight">
            Your Journey.{' '}
            <span className="bg-gradient-to-r from-[#acedff] via-[#c3c0ff] to-white bg-clip-text text-transparent">
              One Platform.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-[#7b83a0] max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover, compare, plan, and book your next experience across India with SKYNORA TRAVELS. Unified flights,
            heritage stays, trains, luxury coaches, and hand-picked events.
          </p>

          {/* UNIFIED SEARCH CONSOLE CONTAINER */}
          <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl p-3 sm:p-4 text-left text-[#131b2e] border border-[#eaedff]">
            {/* Category Tab Selectors */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none" id="search-tabs">
              <button
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-xs cursor-pointer ${
                  activeTab === 'hotels'
                    ? 'bg-[#4b41e1] text-white shadow-sm'
                    : 'bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff]'
                }`}
                onClick={() => handleTabChange('hotels')}
                type="button"
              >
                <span className="material-symbols-outlined text-lg">hotel</span>
                <span>Hotels & Rooms</span>
              </button>
              <button
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                  activeTab === 'buses'
                    ? 'bg-[#4b41e1] text-white shadow-sm'
                    : 'bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff]'
                }`}
                onClick={() => handleTabChange('buses')}
                type="button"
              >
                <span className="material-symbols-outlined text-lg">directions_bus</span>
                <span>Bus & Travel</span>
              </button>
              <button
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                  activeTab === 'flights'
                    ? 'bg-[#4b41e1] text-white shadow-sm'
                    : 'bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff]'
                }`}
                onClick={() => handleTabChange('flights')}
                type="button"
              >
                <span className="material-symbols-outlined text-lg">flight_takeoff</span>
                <span>Flights</span>
              </button>
              <button
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                  activeTab === 'trains'
                    ? 'bg-[#4b41e1] text-white shadow-sm'
                    : 'bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff]'
                }`}
                onClick={() => handleTabChange('trains')}
                type="button"
              >
                <span className="material-symbols-outlined text-lg">train</span>
                <span>Trains (IRCTC)</span>
              </button>
              <button
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                  activeTab === 'cabs'
                    ? 'bg-[#4b41e1] text-white shadow-sm'
                    : 'bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff]'
                }`}
                onClick={() => handleTabChange('cabs')}
                type="button"
              >
                <span className="material-symbols-outlined text-lg">local_taxi</span>
                <span>Taxis & Rentals</span>
              </button>
              <button
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                  activeTab === 'events'
                    ? 'bg-[#4b41e1] text-white shadow-sm'
                    : 'bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff]'
                }`}
                onClick={() => handleTabChange('events')}
                type="button"
              >
                <span className="material-symbols-outlined text-lg">confirmation_number</span>
                <span>Events & Venues</span>
              </button>
            </div>

            {/* Search Input Matrix */}
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-2 items-center bg-[#f2f3ff] p-2 rounded-xl">
              {/* Segment 1: From / Destination */}
              <div className="lg:col-span-4 bg-white p-3 rounded-lg shadow-xs hover:bg-[#faf8ff] transition-colors cursor-pointer group border border-[#eaedff]">
                <label className="block text-xs text-[#45464d] font-semibold">From / Destination</label>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="material-symbols-outlined text-[#4b41e1] text-lg">pin_drop</span>
                  <input
                    className="w-full bg-transparent font-bold text-base text-[#131b2e] focus:outline-none"
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
                <span className="block text-xs text-[#76767e] truncate mt-0.5">
                  North & South Goa, Beach Resorts, Candolim
                </span>
              </div>

              {/* Segment 2: Dates */}
              <div className="lg:col-span-3 bg-white p-3 rounded-lg shadow-xs hover:bg-[#faf8ff] transition-colors cursor-pointer group border border-[#eaedff]">
                <label className="block text-xs text-[#45464d] font-semibold">Dates</label>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="material-symbols-outlined text-[#4b41e1] text-lg">calendar_today</span>
                  <input
                    className="w-full bg-transparent font-bold text-base text-[#131b2e] focus:outline-none"
                    type="text"
                    value={dates}
                    onChange={(e) => setDates(e.target.value)}
                  />
                </div>
                <span className="block text-xs text-[#76767e] truncate mt-0.5">
                  4 Nights • Tuesday to Saturday
                </span>
              </div>

              {/* Segment 3: Guests & Class */}
              <div className="lg:col-span-3 bg-white p-3 rounded-lg shadow-xs hover:bg-[#faf8ff] transition-colors cursor-pointer group border border-[#eaedff]">
                <label className="block text-xs text-[#45464d] font-semibold">Guests & Class</label>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="material-symbols-outlined text-[#4b41e1] text-lg">group</span>
                  <input
                    className="w-full bg-transparent font-bold text-base text-[#131b2e] focus:outline-none"
                    type="text"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                  />
                </div>
                <span className="block text-xs text-[#76767e] truncate mt-0.5">
                  Deluxe / AC Class • Regular Fare
                </span>
              </div>

              {/* Action Button: Search Trigger */}
              <div className="lg:col-span-2 flex items-center h-full">
                <button
                  onClick={handleSearchSubmit}
                  className="w-full h-full min-h-[58px] bg-[#4b41e1] hover:bg-[#645efb] text-white font-bold text-lg flex items-center justify-center gap-2 rounded-lg shadow-lg shadow-[#4b41e1]/25 transition-all active:scale-[0.98] cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-xl">search</span>
                  <span>Search</span>
                </button>
              </div>
            </div>

            {/* Quick Suggestions Pill Strip */}
            <div className="mt-3 pt-1 flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-[#45464d] font-semibold flex items-center gap-1 mr-1">
                <span className="material-symbols-outlined text-sm text-[#4b41e1]">trending_up</span> Popular Right Now:
              </span>
              <button
                onClick={() => {
                  setDestination('Ooty, Tamil Nadu');
                  setActiveTab('cabs');
                }}
                className="px-2.5 py-1 rounded-full bg-[#e2e7ff] hover:bg-[#dae2fd] text-[#131b2e] text-xs font-medium transition-colors cursor-pointer"
                type="button"
              >
                Bengaluru to Ooty Cab
              </button>
              <button
                onClick={() => {
                  setDestination('Manali, Himachal Pradesh');
                  setActiveTab('buses');
                }}
                className="px-2.5 py-1 rounded-full bg-[#e2e7ff] hover:bg-[#dae2fd] text-[#131b2e] text-xs font-medium transition-colors cursor-pointer"
                type="button"
              >
                Delhi to Manali Luxury Bus
              </button>
              <button
                onClick={() => {
                  setDestination('Goa (GOI/GOX)');
                  setActiveTab('flights');
                }}
                className="px-2.5 py-1 rounded-full bg-[#e2e7ff] hover:bg-[#dae2fd] text-[#131b2e] text-xs font-medium transition-colors cursor-pointer"
                type="button"
              >
                Mumbai to Goa Direct Flight
              </button>
              <button
                onClick={() => {
                  setDestination('Jaipur, Rajasthan');
                  setActiveTab('hotels');
                }}
                className="px-2.5 py-1 rounded-full bg-[#e2e7ff] hover:bg-[#dae2fd] text-[#131b2e] text-xs font-medium transition-colors cursor-pointer"
                type="button"
              >
                Jaipur Heritage Stays
              </button>
              <button
                onClick={() => {
                  setDestination('Varanasi, Uttar Pradesh');
                  setActiveTab('events');
                }}
                className="px-2.5 py-1 rounded-full bg-[#e2e7ff] hover:bg-[#dae2fd] text-[#131b2e] text-xs font-medium transition-colors cursor-pointer"
                type="button"
              >
                Varanasi Aarti Ghat Pass
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SPECIAL OFFERS TICKER & PROMOS */}
      <section className="w-full py-10 bg-[#f2f3ff]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-2 mb-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#4b41e1] font-bold">
                Exclusive Privileges
              </span>
              <h2 className="font-['Plus_Jakarta_Sans'] text-2xl sm:text-3xl font-bold text-[#131b2e] mt-1">
                Smart Savings for Every Journey
              </h2>
            </div>
            <p className="text-sm text-[#45464d]">
              Instant discounts applied directly at checkout via UPI or NetBanking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Promo 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm relative overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all border border-[#eaedff]">
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#e2dfff]/40 rounded-full blur-xl group-hover:scale-125 transition-transform pointer-events-none"></div>
              <div>
                <div className="inline-flex items-center gap-1 bg-[#e2dfff] px-3 py-1 rounded-full text-[#0f0069] text-xs font-bold mb-3">
                  <span className="material-symbols-outlined text-xs">flight</span> Code: FIRSTFLY
                </div>
                <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#131b2e] mb-1">
                  Flat ₹1,200 Off on First Flight
                </h3>
                <p className="text-xs text-[#45464d] leading-relaxed">
                  Applicable on IndiGo, Air India, Akasa & SpiceJet domestic routes across India with zero lock-in.
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-[#eaedff]">
                <span className="text-xs text-[#4b41e1] font-bold">Valid till 30 Nov 2025</span>
                <button
                  onClick={() => handleClaimPromo('FIRSTFLY')}
                  className="text-xs text-[#4b41e1] hover:text-[#3323cc] flex items-center gap-1 font-bold cursor-pointer"
                >
                  Claim <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Promo 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm relative overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all border border-[#eaedff]">
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#acedff]/40 rounded-full blur-xl group-hover:scale-125 transition-transform pointer-events-none"></div>
              <div>
                <div className="inline-flex items-center gap-1 bg-[#e2e7ff] px-3 py-1 rounded-full text-[#131b2e] text-xs font-bold mb-3">
                  <span className="material-symbols-outlined text-xs text-[#4b41e1]">castle</span> Code: ROYALSTAY
                </div>
                <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#131b2e] mb-1">
                  Up to 40% Off on Heritage Havelis
                </h3>
                <p className="text-xs text-[#45464d] leading-relaxed">
                  Curated historic retreats across Udaipur, Jodhpur, Jaipur & Shimla. Includes complimentary royal breakfast.
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-[#eaedff]">
                <span className="text-xs text-[#4b41e1] font-bold">Limited Heritage Suites</span>
                <button
                  onClick={() => {
                    handleClaimPromo('ROYALSTAY');
                    onNavigate('hotels');
                  }}
                  className="text-xs text-[#4b41e1] hover:text-[#3323cc] flex items-center gap-1 font-bold cursor-pointer"
                >
                  Explore <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Promo 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm relative overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all border border-[#eaedff]">
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#dae2fd]/50 rounded-full blur-xl group-hover:scale-125 transition-transform pointer-events-none"></div>
              <div>
                <div className="inline-flex items-center gap-1 bg-[#e2dfff] px-3 py-1 rounded-full text-[#0f0069] text-xs font-bold mb-3">
                  <span className="material-symbols-outlined text-xs">directions_bus</span> Code: SKYNORABUS
                </div>
                <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#131b2e] mb-1">
                  15% Cashback on Sleeper Buses
                </h3>
                <p className="text-xs text-[#45464d] leading-relaxed">
                  Verified multi-axle Volvos with IntrCity, Zingbus & State RTCs. Free mineral water and live GPS sharing.
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-[#eaedff]">
                <span className="text-xs text-[#4b41e1] font-bold">No Minimum Fare</span>
                <button
                  onClick={() => {
                    handleClaimPromo('SKYNORABUS');
                    onNavigate('buses');
                  }}
                  className="text-xs text-[#4b41e1] hover:text-[#3323cc] flex items-center gap-1 font-bold cursor-pointer"
                >
                  Book <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 MAIN CATEGORY CARDS (VISUAL CORE GRID) */}
      <section className="w-full py-16 bg-[#faf8ff]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-wider text-[#4b41e1] font-bold">
              Unified Travel Ecosystem
            </span>
            <h2 className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-4xl font-extrabold text-[#131b2e] mt-1 tracking-tight">
              Six Travel Verticals. Endless Destinations.
            </h2>
            <p className="text-sm text-[#45464d] mt-2">
              Book interconnected transport, luxurious stays, verified transit, and verified cultural entertainment on a single synchronized receipt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Hotels & Rooms */}
            <div
              onClick={() => onNavigate('hotels')}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col border border-[#eaedff] cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Hotels and Heritage Haveli"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9HBW5nAockwDszAAv_eMduh-HNHRm57hc3zLNxAjkIZxK5eeT-dErpOkZbQiDd4TP1twyEKnB75JU_TgtStYWh1m9XSjFlzDQsLmRi0vqNWVLkLl6SZ_JmAA-oghvP4zLa0wm0qTNkOEiLYqGPpL9uBeBHymRz_u0H5JbTuVxO2lMrjMNrXHIwcCYFckk2LBgcKex8lJZzAFy-Pv3Y1RJvHh4cnJzWKiE0iRetWULCZHr6UA4UaAtaA"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131a33]/85 via-transparent to-black/20"></div>
                <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-[#131b2e] shadow-sm">
                  Over 85,000+ Properties
                </span>
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white">
                  <span className="text-xs font-medium text-[#dae2fd]">Villas • Resorts • Homestays</span>
                  <span className="font-['Plus_Jakarta_Sans'] text-base font-bold text-white">
                    From ₹1,499<span className="text-xs font-normal opacity-80">/night*</span>
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-1.5 text-[#4b41e1] mb-1">
                    <span className="material-symbols-outlined text-lg">hotel</span>
                    <span className="text-xs font-bold">Hospitality</span>
                  </div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-lg text-[#131b2e] font-bold">
                    Hotels & Heritage Haveli
                  </h3>
                  <p className="text-xs text-[#45464d] mt-1 leading-relaxed">
                    From boutique royal forts in Rajasthan to beachfront villas in Goa and mist-covered homestays in Coorg.
                  </p>
                </div>
                <div className="pt-4 mt-4 flex items-center justify-between border-t border-[#f2f3ff]">
                  <span className="text-xs text-[#76767e]">Verified Amenities & Cleanliness</span>
                  <div className="w-8 h-8 rounded-full bg-[#e2e7ff] group-hover:bg-[#4b41e1] group-hover:text-white flex items-center justify-center transition-colors">
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Bus & Travel */}
            <div
              onClick={() => onNavigate('buses')}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col border border-[#eaedff] cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Bus and Intercity Travel"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDD2ZBDjccq5A9qlnda6KEIgUecFryFoEUD86k6YTJmaYcYxMIVTniqR6zsF3Sh_IhsW8SqqidcyGJxVBh51u85vih4tX52SYFsuCaDLkmuTNlULN8OFqi9P-OXa1c2G4xxc-iiqLqapOl35FsYQpYxXFtVm5e-SzElTgb9DQmeWZTe_87mEFM4b8tPkIAWubBIqhG4nCm5rSipY4S43-7DfP4YEjseVUtxrwtYibXAIKA69pA2Dh0lJg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131a33]/85 via-transparent to-black/20"></div>
                <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-[#131b2e] shadow-sm">
                  Live Tracking & Free Water
                </span>
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white">
                  <span className="text-xs font-medium text-[#dae2fd]">AC Sleeper • Electric Multi-Axle</span>
                  <span className="font-['Plus_Jakarta_Sans'] text-base font-bold text-white">
                    From ₹499<span className="text-xs font-normal opacity-80">/seat*</span>
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-1.5 text-[#4b41e1] mb-1">
                    <span className="material-symbols-outlined text-lg">directions_bus</span>
                    <span className="text-xs font-bold">Intercity Transit</span>
                  </div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-lg text-[#131b2e] font-bold">
                    Bus & Intercity Travel
                  </h3>
                  <p className="text-xs text-[#45464d] mt-1 leading-relaxed">
                    Multi-axle AC sleepers, punctual pickups, clean linen, lady-passenger safe seat locking, and live GPS bus tracking.
                  </p>
                </div>
                <div className="pt-4 mt-4 flex items-center justify-between border-t border-[#f2f3ff]">
                  <span className="text-xs text-[#76767e]">IntrCity, KSRTC, Zingbus Partner</span>
                  <div className="w-8 h-8 rounded-full bg-[#e2e7ff] group-hover:bg-[#4b41e1] group-hover:text-white flex items-center justify-center transition-colors">
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Flights & Trains */}
            <div
              onClick={() => onNavigate('flights')}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col border border-[#eaedff] cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Flights and Trains"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtwJ74zqawFHf33i4SJfRePvtD6ME36jew5skl9qO722wGdLKaorGOoF7ujk-7-wEqjK3MM4Y8jVrnGJTb74e5EZcrof-kXYq4NCOjVx0kt7It4uaq__0f4QNlR_U9ZIL1A7uK5qwPwQIo9i11B8sSg8b_Hq90BjqfTBbv26rmtWjigVbeoecpZVgXxhFLn0oHG-KZvTIRT9hnx3Nu4H5Jn7ptV79bOPIhcbhc0QcPYTD0areZtLNesw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131a33]/85 via-transparent to-black/20"></div>
                <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-[#131b2e] shadow-sm">
                  Tatkal Support & Instant PNR
                </span>
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white">
                  <span className="text-xs font-medium text-[#dae2fd]">IATA & IRCTC Authorized</span>
                  <span className="font-['Plus_Jakarta_Sans'] text-base font-bold text-white">
                    From ₹1,850<span className="text-xs font-normal opacity-80">/flight*</span>
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-1.5 text-[#4b41e1] mb-1">
                    <span className="material-symbols-outlined text-lg">flight</span>
                    <span className="text-xs font-bold">Aviation & Rail</span>
                  </div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-lg text-[#131b2e] font-bold">
                    Flights & Trains
                  </h3>
                  <p className="text-xs text-[#45464d] mt-1 leading-relaxed">
                    Direct air ticket comparisons plus authorized IRCTC train bookings with Tatkal confirmation prediction and waitlist radar.
                  </p>
                </div>
                <div className="pt-4 mt-4 flex items-center justify-between border-t border-[#f2f3ff]">
                  <span className="text-xs text-[#76767e]">Direct PNR Status Updates</span>
                  <div className="w-8 h-8 rounded-full bg-[#e2e7ff] group-hover:bg-[#4b41e1] group-hover:text-white flex items-center justify-center transition-colors">
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Taxis & Rentals */}
            <div
              onClick={() => onNavigate('cabs')}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col border border-[#eaedff] cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Taxis and Car Rentals"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4EBEdRhlH_BdOaPnOpgcuAuFsa7-78nmZgK7QYVNSJLWWgPtYcTDEDQNyQWKqMIFirLBiDbAjNfbd2g62N2HNp753SgothG7a1CWlshmc9aQAKF2M6n8JbrxpsnXCi7nblPTchNQM9dM6HOdzA_lWOiguc7AIdhwliznvhoUwgiGiuV3Mf2Qkk9mHlAI8ggjyEHJM7IGkzFMHUjK0mfKBNC5873XlXGfdRxUEuM3RebJIRftNd_S1Dg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131a33]/85 via-transparent to-black/20"></div>
                <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-[#131b2e] shadow-sm">
                  No Surge Guarantee
                </span>
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white">
                  <span className="text-xs font-medium text-[#dae2fd]">Airport • Outstation • Self-Drive</span>
                  <span className="font-['Plus_Jakarta_Sans'] text-base font-bold text-white">
                    From ₹11<span className="text-xs font-normal opacity-80">/km*</span>
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-1.5 text-[#4b41e1] mb-1">
                    <span className="material-symbols-outlined text-lg">local_taxi</span>
                    <span className="text-xs font-bold">Private Commute</span>
                  </div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-lg text-[#131b2e] font-bold">
                    Taxis & Car Rentals
                  </h3>
                  <p className="text-xs text-[#45464d] mt-1 leading-relaxed">
                    Clean chauffeured outstation cabs with zero driver cancellation risk, airport transfers, and unlimited-km self-drives.
                  </p>
                </div>
                <div className="pt-4 mt-4 flex items-center justify-between border-t border-[#f2f3ff]">
                  <span className="text-xs text-[#76767e]">Toll & State Tax Inclusive Options</span>
                  <div className="w-8 h-8 rounded-full bg-[#e2e7ff] group-hover:bg-[#4b41e1] group-hover:text-white flex items-center justify-center transition-colors">
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 5: Restaurants & Appointments */}
            <div
              onClick={() => onNavigate('experiences')}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col border border-[#eaedff] cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Fine Dining and Spas"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfDQRbvmeaGng9YgN0DvPZ_UqQtCGZPi0oiBqA1R8-5kxMWgxChaC54sP0DWlXB5tUoExXRODnRp6DS4wx6P8hjnCpTua3USxux6GvtPrsTPDmUBS0I-FDZYS9h1X3hCd-QTOdyYHM7IOeg-rNwvhWnNwbQNcTrrz4uyacVvL27SS8IQngtm048JQPaW3crqSeTh0VG-ADjY2TjdGstP4VxIeROdgyeXEIF-lNpCTgVDU9pg7ygI3_bg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131a33]/85 via-transparent to-black/20"></div>
                <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-[#131b2e] shadow-sm">
                  Exclusive 25% Off
                </span>
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white">
                  <span className="text-xs font-medium text-[#dae2fd]">Fine Dining & Ayurvedic Spas</span>
                  <span className="font-['Plus_Jakarta_Sans'] text-base font-bold text-white">Instant Reserve</span>
                </div>
              </div>
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-1.5 text-[#4b41e1] mb-1">
                    <span className="material-symbols-outlined text-lg">restaurant</span>
                    <span className="text-xs font-bold">Dining & Wellness</span>
                  </div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-lg text-[#131b2e] font-bold">
                    Restaurants & Appointments
                  </h3>
                  <p className="text-xs text-[#45464d] mt-1 leading-relaxed">
                    Guaranteed table reservations at award-winning culinary venues and pre-booked holistic Ayurvedic wellness spa treatments.
                  </p>
                </div>
                <div className="pt-4 mt-4 flex items-center justify-between border-t border-[#f2f3ff]">
                  <span className="text-xs text-[#76767e]">Direct Table Confirmation</span>
                  <div className="w-8 h-8 rounded-full bg-[#e2e7ff] group-hover:bg-[#4b41e1] group-hover:text-white flex items-center justify-center transition-colors">
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 6: Events & Venues */}
            <div
              onClick={() => onNavigate('experiences')}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col border border-[#eaedff] cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Events and Banquet Venues"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDezGtphlZtS1KzVSq1IbvM6fr6h2yDMeNWjrIyJsGkpa-BSN3cnxBJL7qJfHyCoWlqz-xyRRjs-KHvTaRZ1CGPtKTY6n1uXc7ahVARqruUr4AEWbc4Z13dTcGd-1IJofPGSe9u8VmVvvOAuawaTDKtldzzvTZbYW9_SIZCVwucIzoGLkWF8uWwUKH6Qsf6vih599Q9jf7H0kX8aP-_C18ShQxnWgnXu3YsoikA3fOKNtq5B5KfPQiAjA"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131a33]/85 via-transparent to-black/20"></div>
                <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-[#131b2e] shadow-sm">
                  E-Pass VIP Fast-Track
                </span>
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white">
                  <span className="text-xs font-medium text-[#dae2fd]">Concerts • Banquets • Festivals</span>
                  <span className="font-['Plus_Jakarta_Sans'] text-base font-bold text-white">
                    From ₹799<span className="text-xs font-normal opacity-80">/ticket*</span>
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-1.5 text-[#4b41e1] mb-1">
                    <span className="material-symbols-outlined text-lg">theater_comedy</span>
                    <span className="text-xs font-bold">Live Experiences</span>
                  </div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-lg text-[#131b2e] font-bold">
                    Events & Banquet Venues
                  </h3>
                  <p className="text-xs text-[#45464d] mt-1 leading-relaxed">
                    Concert tickets, stand-up comedy circuits, heritage music festivals, and grand palace wedding banquet venue inquiries.
                  </p>
                </div>
                <div className="pt-4 mt-4 flex items-center justify-between border-t border-[#f2f3ff]">
                  <span className="text-xs text-[#76767e]">QR Ticket on WhatsApp & SMS</span>
                  <div className="w-8 h-8 rounded-full bg-[#e2e7ff] group-hover:bg-[#4b41e1] group-hover:text-white flex items-center justify-center transition-colors">
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE AI-POWERED TRIP PLANNER WIDGET */}
      <section className="w-full py-16 bg-[#e2e7ff]/60 border-y border-[#eaedff]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-[#4b41e1]/10 text-[#4b41e1] px-3 py-1 rounded-full text-xs font-bold mb-2">
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                <span>Skynora AI Engine v3.2</span>
              </div>
              <h2 className="font-['Plus_Jakarta_Sans'] text-2xl sm:text-3xl font-extrabold text-[#131b2e] tracking-tight">
                Tell us your budget. We'll help plan your trip.
              </h2>
              <p className="text-sm text-[#45464d]">
                Intelligent itinerary generation powered by Skynora AI for Indian explorers.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs text-[#76767e] font-semibold">
              <span className="material-symbols-outlined text-sm text-[#4b41e1]">alt_route</span>
              <span>Real-Time Indian Route Optimization</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Interactive Planner Controls (Left Panel) */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm flex flex-col gap-5 border border-[#eaedff]">
              {/* Total Budget Slider */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-bold text-[#131b2e]">Total Holiday Budget</span>
                  <span className="font-['Plus_Jakarta_Sans'] text-2xl font-extrabold text-[#4b41e1]">
                    ₹{budget.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  className="w-full accent-[#4b41e1] h-2.5 bg-[#eaedff] rounded-lg cursor-pointer"
                  max="200000"
                  min="10000"
                  step="5000"
                  type="range"
                  value={budget}
                  onChange={(e) => setBudget(parseInt(e.target.value, 10))}
                />
                <div className="flex justify-between text-[#76767e] text-xs mt-1.5 font-medium">
                  <span>₹10,000 (Budget)</span>
                  <span>₹1,00,000</span>
                  <span>₹2,00,000 (Luxury)</span>
                </div>
              </div>

              {/* Departure City */}
              <div>
                <label className="block text-xs text-[#45464d] font-semibold mb-1">Departure City</label>
                <div className="flex items-center gap-2 bg-[#f2f3ff] px-3.5 py-2.5 rounded-xl border border-[#eaedff]">
                  <span className="material-symbols-outlined text-[#4b41e1] text-lg">flight_takeoff</span>
                  <select
                    value={departureCity}
                    onChange={(e) => setDepartureCity(e.target.value)}
                    className="w-full bg-transparent font-semibold text-sm text-[#131b2e] focus:outline-none cursor-pointer"
                  >
                    <option value="BOM">Mumbai (BOM) • Chhatrapati Shivaji Int.</option>
                    <option value="DEL">New Delhi (DEL) • IGI Airport</option>
                    <option value="BLR">Bengaluru (BLR) • Kempegowda Int.</option>
                    <option value="HYD">Hyderabad (HYD) • Rajiv Gandhi Int.</option>
                    <option value="MAA">Chennai (MAA) • Chennai Int.</option>
                    <option value="CCU">Kolkata (CCU) • Netaji Subhash Int.</option>
                  </select>
                </div>
              </div>

              {/* Trip Duration & Travelers */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#45464d] font-semibold mb-1">Duration</label>
                  <div className="bg-[#f2f3ff] px-3 py-2 rounded-xl flex items-center gap-1.5 border border-[#eaedff]">
                    <span className="material-symbols-outlined text-[#4b41e1] text-base">schedule</span>
                    <span className="text-sm font-bold text-[#131b2e]">4D / 3N</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-[#45464d] font-semibold mb-1">Travelers</label>
                  <div className="bg-[#f2f3ff] px-3 py-2 rounded-xl flex items-center gap-1.5 border border-[#eaedff]">
                    <span className="material-symbols-outlined text-[#4b41e1] text-base">person</span>
                    <span className="text-sm font-bold text-[#131b2e]">2 Adults</span>
                  </div>
                </div>
              </div>

              {/* Vibe / Theme Selection */}
              <div>
                <label className="block text-xs text-[#45464d] font-semibold mb-2">Holiday Vibe</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Beach & Wellness', icon: 'beach_access' },
                    { label: 'Heritage & Royal', icon: 'castle' },
                    { label: 'Hill Station', icon: 'terrain' },
                    { label: 'Spiritual Aarti', icon: 'self_improvement' }
                  ].map((vibe) => (
                    <button
                      key={vibe.label}
                      onClick={() => setSelectedVibe(vibe.label)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 justify-center transition-all cursor-pointer ${
                        selectedVibe === vibe.label
                          ? 'bg-[#4b41e1] text-white shadow-sm'
                          : 'bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e]'
                      }`}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-sm">{vibe.icon}</span>
                      <span>{vibe.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleRegeneratePlan}
                disabled={isGeneratingPlan}
                className="w-full py-3 rounded-xl bg-[#131b2e] text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#283044] transition-all shadow-sm cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[#4cd7f6] text-lg">
                  {isGeneratingPlan ? 'autorenew' : 'psychology'}
                </span>
                <span>{isGeneratingPlan ? 'Optimizing Route with AI...' : 'Regenerate Itinerary Plan'}</span>
              </button>
            </div>

            {/* AI Sample Trip Recommendation Card (Right Panel) */}
            <div className="lg:col-span-7 bg-white p-6 rounded-2xl shadow-lg border-2 border-[#c3c0ff]/60 flex flex-col justify-between">
              <div>
                {/* Match Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="inline-flex items-center gap-1.5 bg-[#dae2fd] px-3 py-1 rounded-full text-[#4b41e1] text-xs font-bold">
                    <span className="material-symbols-outlined text-sm text-[#4b41e1]">verified</span>
                    <span>
                      98% Match for <span>₹{budget.toLocaleString('en-IN')}</span> Budget
                    </span>
                  </div>
                  <span className="text-xs text-[#76767e] font-semibold">
                    Tailored for {departureCity} Departure • {selectedVibe}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-['Plus_Jakarta_Sans'] text-xl sm:text-2xl font-bold text-[#131b2e] mt-1">
                  Curated 4D/3N Goa & Coastal Konkan Escape
                </h3>
                <p className="text-xs sm:text-sm text-[#45464d] mt-1 leading-relaxed">
                  Direct return flights, private airport chauffeur, 4-star boutique beachfront resort in Candolim, and sunset
                  catamaran dolphin cruise.
                </p>

                {/* Illustrated Segmented Progress Bar */}
                <div className="mt-6">
                  <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                    <span className="text-[#131b2e]">Budget Distribution</span>
                    <span className="text-[#76767e]">100% Balanced</span>
                  </div>
                  <div className="w-full h-3 rounded-full overflow-hidden flex bg-[#eaedff]">
                    <div className="bg-[#4b41e1] h-full" style={{ width: '37%' }} title="Transport (37%)"></div>
                    <div className="bg-[#645efb] h-full" style={{ width: '41%' }} title="Stay (41%)"></div>
                    <div className="bg-[#4cd7f6] h-full" style={{ width: '18%' }} title="Experiences (18%)"></div>
                    <div className="bg-[#c6c6ce] h-full" style={{ width: '4%' }} title="Buffer (4%)"></div>
                  </div>
                </div>

                {/* Estimated Cost Breakdown Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  <div className="p-3 rounded-xl bg-[#f2f3ff] flex items-start gap-2.5 border border-[#eaedff]">
                    <div className="w-9 h-9 rounded-full bg-[#4b41e1]/15 flex items-center justify-center text-[#4b41e1] shrink-0">
                      <span className="material-symbols-outlined text-base">flight</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-[#131b2e]">Transport</span>
                        <span className="text-[#76767e] text-[11px]">(37%)</span>
                      </div>
                      <span className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e]">
                        ₹{transportCost.toLocaleString('en-IN')}
                      </span>
                      <p className="text-[11px] text-[#45464d]">Return Flights + Airport Cab</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#f2f3ff] flex items-start gap-2.5 border border-[#eaedff]">
                    <div className="w-9 h-9 rounded-full bg-[#645efb]/15 flex items-center justify-center text-[#645efb] shrink-0">
                      <span className="material-symbols-outlined text-base">hotel</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-[#131b2e]">Accommodation</span>
                        <span className="text-[#76767e] text-[11px]">(41%)</span>
                      </div>
                      <span className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e]">
                        ₹{accommodationCost.toLocaleString('en-IN')}
                      </span>
                      <p className="text-[11px] text-[#45464d]">4-Star Beachfront Resort, Candolim</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#f2f3ff] flex items-start gap-2.5 border border-[#eaedff]">
                    <div className="w-9 h-9 rounded-full bg-[#acedff] flex items-center justify-center text-[#004e5c] shrink-0">
                      <span className="material-symbols-outlined text-base">sailing</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-[#131b2e]">Experiences</span>
                        <span className="text-[#76767e] text-[11px]">(18%)</span>
                      </div>
                      <span className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e]">
                        ₹{experiencesCost.toLocaleString('en-IN')}
                      </span>
                      <p className="text-[11px] text-[#45464d]">Catamaran Cruise, Scuba & Spice Tour</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#f2f3ff] flex items-start gap-2.5 border border-[#eaedff]">
                    <div className="w-9 h-9 rounded-full bg-[#c6c6ce]/30 flex items-center justify-center text-[#76767e] shrink-0">
                      <span className="material-symbols-outlined text-base">shield</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-[#131b2e]">Buffer Fund</span>
                        <span className="text-[#76767e] text-[11px]">(4%)</span>
                      </div>
                      <span className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e]">
                        ₹{bufferCost.toLocaleString('en-IN')}
                      </span>
                      <p className="text-[11px] text-[#45464d]">Emergency Transit & Fuel Buffer</p>
                    </div>
                  </div>
                </div>

                {/* Total Bar & Legal Disclaimer */}
                <div className="mt-4 p-3 bg-[#eaedff] rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <span className="text-xs text-[#45464d] font-semibold">Estimated AI Package Cost:</span>
                    <span className="font-['Plus_Jakarta_Sans'] text-xl font-extrabold text-[#4b41e1] ml-2">
                      ₹{budget.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#76767e]">
                    <span className="material-symbols-outlined text-xs">info</span> Non-binding seasonal estimate
                  </span>
                </div>
                <p className="text-[11px] text-[#76767e] mt-2 italic">
                  *Sample prices shown are illustrative estimates based on seasonal averages, not live checkout offers.
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 flex flex-wrap items-center gap-3 border-t border-[#eaedff]">
                <button
                  onClick={() => {
                    onPlanTripPackage(budget, selectedVibe);
                    onNavigate('checkout');
                  }}
                  className="flex-1 min-w-[200px] py-3 px-4 rounded-xl bg-[#4b41e1] text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#645efb] transition-all shadow-md cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-lg">book_online</span>
                  <span>Book Complete Package</span>
                </button>
                <button
                  onClick={() => onNavigate('hotels')}
                  className="py-3 px-4 rounded-xl bg-[#e2e7ff] text-[#131b2e] hover:bg-[#dae2fd] text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-lg">tune</span>
                  <span>Customize Itinerary</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DESTINATION INSPIRATION FOR INDIA */}
      <section className="w-full py-16 bg-[#faf8ff]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-8">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#4b41e1] font-bold">
                Iconic Bharat Journeys
              </span>
              <h2 className="font-['Plus_Jakarta_Sans'] text-3xl font-extrabold text-[#131b2e] mt-1">
                Trending Indian Getaways This Season
              </h2>
            </div>
            <button
              onClick={() => onNavigate('hotels')}
              className="text-sm text-[#4b41e1] font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              Explore All 120+ Indian Destinations <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>

          {/* Bento Destination Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Destination 1: Udaipur */}
            <div
              onClick={() => {
                setDestination('Udaipur, Rajasthan');
                onNavigate('hotels');
              }}
              className="relative h-96 rounded-2xl overflow-hidden shadow-sm group cursor-pointer border border-[#eaedff]"
            >
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="City Palace Udaipur"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9szOZBOsWZ73YXkRnQM497zjGPqfF5hMJFE2CqMinMjDm3zTanL7DLoZco6kQaxS_NuNVYAK0tgH-v7eCjg1pzcoxLxct2pf5CQ1wnokWaeaULa5mAWAPvxOVtzXnJX40FbqXBpMwVap6Fvc30_bmKIpmX_sJTUAQeEl0rkhYuO1eujbkKKEKW8WPlMVC3ClvV6fj3JCkEGD6cE7CgwjHhbTQ7ylX3JckYRwnPeXr2lste2vF-8L49w"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131a33]/95 via-[#131a33]/30 to-black/20"></div>
              <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-[#131b2e]">
                  Winter Royal Pick
                </span>
                <div className="flex items-center gap-1 bg-[#131a33]/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[#4cd7f6] text-xs font-bold">
                  <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>{' '}
                  4.95
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[#acedff] text-xs uppercase font-bold tracking-wider">Rajasthan</span>
                <h3 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-white mt-0.5">Udaipur</h3>
                <p className="text-xs text-[#dae2fd] line-clamp-1 mt-1">
                  The City of Lakes • Royal Palaces & Pichola Sunsets
                </p>
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/20">
                  <span className="text-xs text-[#dae2fd]">Best: Oct - March</span>
                  <span className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#acedff]">
                    Packages from ₹14,499*
                  </span>
                </div>
              </div>
            </div>

            {/* Destination 2: Munnar & Alleppey */}
            <div
              onClick={() => {
                setDestination('Munnar, Kerala');
                onNavigate('hotels');
              }}
              className="relative h-96 rounded-2xl overflow-hidden shadow-sm group cursor-pointer border border-[#eaedff]"
            >
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Munnar and Alleppey Kerala"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuACHbZngr8eTIDAjvrQLW-kaPoEw3ZKIBmZv9OVanEgT6Fi1d0N1vfkEIFtPy873kqQn9jYPokuvfFML4RhU8xZzn3V-jQ_xLLC65Q2dLDPFI3biNqZSBbqnzFVbDQyF-mRqqyVvN1FHcGN10RKUiQNkKm1gI44D-zzYInu0nl2RjDC3KZ1zc6f0DBFcLVyQIklEbORZ9Q66uceimWycQpXN7a2KIbHxVZCE9mtqi3lMajlZPho-s9QEw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131a33]/95 via-[#131a33]/30 to-black/20"></div>
              <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-[#131b2e]">
                  Backwater Retreat
                </span>
                <div className="flex items-center gap-1 bg-[#131a33]/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[#4cd7f6] text-xs font-bold">
                  <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>{' '}
                  4.92
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[#acedff] text-xs uppercase font-bold tracking-wider">Kerala</span>
                <h3 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-white mt-0.5">Munnar & Alleppey</h3>
                <p className="text-xs text-[#dae2fd] line-clamp-1 mt-1">
                  God's Own Country • Tea Estates & Luxury Houseboats
                </p>
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/20">
                  <span className="text-xs text-[#dae2fd]">Best: Sep - April</span>
                  <span className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#acedff]">
                    Packages from ₹12,999*
                  </span>
                </div>
              </div>
            </div>

            {/* Destination 3: Leh & Ladakh */}
            <div
              onClick={() => {
                setDestination('Leh Ladakh');
                onNavigate('hotels');
              }}
              className="relative h-96 rounded-2xl overflow-hidden shadow-sm group cursor-pointer border border-[#eaedff]"
            >
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Leh and Ladakh"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsHsMDqXgCJCCPBVk6DyIZjvkhU7BG66pH3jXb4ja_hS0WTgCDiVysIlAC7Xue3VK3VLFZH5SNfBsENr2LjnDRB7CHiQB7oOyFeL5fUYPYUq9-Oq0heSK1oai7ptGhEg_g0uD9VrZESNupcNADoscaQ_HKk1GHm_zzZ_HoxYkrznhWKmlHCbCqiKhu3dadfe72bWd8dsxDfGBd0di-siyk59xSXdiReWeHW6b72ZzQjgenwakNrbcYZQ"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131a33]/95 via-[#131a33]/30 to-black/20"></div>
              <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-[#131b2e]">
                  Adventure & Passes
                </span>
                <div className="flex items-center gap-1 bg-[#131a33]/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[#4cd7f6] text-xs font-bold">
                  <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>{' '}
                  4.98
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[#acedff] text-xs uppercase font-bold tracking-wider">Ladakh</span>
                <h3 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-white mt-0.5">Leh & Nubra Valley</h3>
                <p className="text-xs text-[#dae2fd] line-clamp-1 mt-1">
                  The High Mountain Passes • Ancient Monasteries & Stargazing
                </p>
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/20">
                  <span className="text-xs text-[#dae2fd]">Best: May - Sep</span>
                  <span className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#acedff]">
                    Packages from ₹19,800*
                  </span>
                </div>
              </div>
            </div>

            {/* Destination 4: Varanasi */}
            <div
              onClick={() => {
                setDestination('Varanasi, Uttar Pradesh');
                onNavigate('hotels');
              }}
              className="relative h-96 rounded-2xl overflow-hidden shadow-sm group cursor-pointer border border-[#eaedff]"
            >
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Varanasi Dashashwamedh Ghat"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDH7L-JS3x6pGKPfpdAK4Em0dUmP9R5Q7YA-SQzPjznctXBx-vaOgCY74HL5hiUz4E8Y-FJeFQO1vHaKKwhulRPQRnWYhg7O6d1e3UXN59Y4wO2LcLF-AD-ueBLtPcAPwMmpVCRgzPpsqHxotNJJ_UD0LK-4b60anQBh2blSGpNwcoWzaQMgtwJt_8vSVpKbwvEwQBioz7qqkZr6P0dtoFoMaIW2_zAxR8AK08ooFcPfY4ZFNvE4Bk77A"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131a33]/95 via-[#131a33]/30 to-black/20"></div>
              <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-[#131b2e]">
                  Spiritual Core
                </span>
                <div className="flex items-center gap-1 bg-[#131a33]/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[#4cd7f6] text-xs font-bold">
                  <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>{' '}
                  4.94
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[#acedff] text-xs uppercase font-bold tracking-wider">Uttar Pradesh</span>
                <h3 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-white mt-0.5">Varanasi (Kashi)</h3>
                <p className="text-xs text-[#dae2fd] line-clamp-1 mt-1">
                  Spiritual Awakening • Ghats, Aarti & Silk Weavers
                </p>
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/20">
                  <span className="text-xs text-[#dae2fd]">Best: All Year Round</span>
                  <span className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#acedff]">
                    Packages from ₹7,999*
                  </span>
                </div>
              </div>
            </div>

            {/* Destination 5: Andaman Islands */}
            <div
              onClick={() => {
                setDestination('Andaman Islands');
                onNavigate('hotels');
              }}
              className="relative h-96 rounded-2xl overflow-hidden shadow-sm group cursor-pointer border border-[#eaedff]"
            >
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Andaman Islands Radhanagar Beach"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpXQhyPPPyo-ThIZwZiU3e0rGnohcQwGEbFLKXkDGTeFoJY-3v6OENQBHIFLQSVACK3NvKzlicvkJDMkCRsyPQX6YXFI2Msc9-bSoKbArQv6L6tyBKj0UT9KMax4rDcs0PsewE1Kt_KD9EIgk_jDOtQG4SLathB8uY5R5YOPqyYhLWgACQZaw8B0gzB41lBXCUKhHqKSgZbE44fgvsbPRL98FidcGVE7RVhYa3XGHqm_Iui-7WGOdIZA"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131a33]/95 via-[#131a33]/30 to-black/20"></div>
              <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-[#131b2e]">
                  Island Paradise
                </span>
                <div className="flex items-center gap-1 bg-[#131a33]/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[#4cd7f6] text-xs font-bold">
                  <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>{' '}
                  4.97
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[#acedff] text-xs uppercase font-bold tracking-wider">Bay of Bengal</span>
                <h3 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-white mt-0.5">Andaman Islands</h3>
                <p className="text-xs text-[#dae2fd] line-clamp-1 mt-1">
                  Azure Waters • Radhanagar Beach & Coral Snorkeling
                </p>
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/20">
                  <span className="text-xs text-[#dae2fd]">Best: Oct - May</span>
                  <span className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#acedff]">
                    Packages from ₹22,500*
                  </span>
                </div>
              </div>
            </div>

            {/* Destination 6: Bespoke Concierge */}
            <div className="bg-[#131a33] rounded-2xl p-6 flex flex-col justify-between text-white relative overflow-hidden shadow-sm border border-white/10">
              <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-[#4b41e1]/30 blur-2xl pointer-events-none"></div>
              <div>
                <span className="px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-bold text-[#acedff]">
                  Bespoke Concierge
                </span>
                <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-white mt-4 leading-snug">
                  Looking for something entirely customized?
                </h3>
                <p className="text-xs text-[#7b83a0] mt-2 leading-relaxed">
                  Connect with our dedicated destination desk for multi-city family reunions, pilgrimage circuits (Char
                  Dham, Kashi-Rameshwaram), or corporate offsites.
                </p>
              </div>
              <div className="mt-6 pt-4">
                <button
                  onClick={() => onNavigate('profile')}
                  className="w-full py-2.5 px-4 rounded-xl bg-white text-[#131b2e] text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#faf8ff] transition-colors shadow-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[#4b41e1]">support_agent</span>
                  <span>Talk to Travel Specialist</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY INDIA TRUSTS SKYNORA */}
      <section className="w-full py-16 bg-[#f2f3ff] border-t border-[#eaedff]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-wider text-[#4b41e1] font-bold">
              Why India Trusts Skynora
            </span>
            <h2 className="font-['Plus_Jakarta_Sans'] text-3xl font-extrabold text-[#131b2e] mt-1">
              Built for Seamless Confidence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-xs flex flex-col items-start border border-[#eaedff]">
              <div className="w-12 h-12 rounded-xl bg-[#4b41e1]/10 flex items-center justify-center text-[#4b41e1] mb-4">
                <span className="material-symbols-outlined text-2xl">verified_user</span>
              </div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-base text-[#131b2e] font-bold">100% Verified Partners</h3>
              <p className="text-xs text-[#45464d] mt-1.5 leading-relaxed">
                Strictly audited hotel properties, licensed fleet drivers, and authentic experience curators with routine
                physical hygiene inspections.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xs flex flex-col items-start border border-[#eaedff]">
              <div className="w-12 h-12 rounded-xl bg-[#4b41e1]/10 flex items-center justify-center text-[#4b41e1] mb-4">
                <span className="material-symbols-outlined text-2xl">train</span>
              </div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-base text-[#131b2e] font-bold">IRCTC & IATA Accredited</h3>
              <p className="text-xs text-[#45464d] mt-1.5 leading-relaxed">
                Direct airline integrations and official railway partner ticketing ensuring zero cancellation friction, direct
                PNR confirmations & Tatkal compliance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xs flex flex-col items-start border border-[#eaedff]">
              <div className="w-12 h-12 rounded-xl bg-[#4b41e1]/10 flex items-center justify-center text-[#4b41e1] mb-4">
                <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
              </div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-base text-[#131b2e] font-bold">Instant UPI Refunds</h3>
              <p className="text-xs text-[#45464d] mt-1.5 leading-relaxed">
                No 7-10 day waiting periods. Approved cancellations trigger automated direct-to-bank UPI reimbursements
                within 60 seconds.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xs flex flex-col items-start border border-[#eaedff]">
              <div className="w-12 h-12 rounded-xl bg-[#4b41e1]/10 flex items-center justify-center text-[#4b41e1] mb-4">
                <span className="material-symbols-outlined text-2xl">headset_mic</span>
              </div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-base text-[#131b2e] font-bold">24x7 Vernacular Support</h3>
              <p className="text-xs text-[#45464d] mt-1.5 leading-relaxed">
                Round-the-clock emergency assistance available in Hindi, English, Tamil, Telugu, Marathi, and Bengali via voice or
                WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SKYNORA SUPER-APP DOWNLOAD BANNER */}
      <section className="w-full py-16 bg-[#faf8ff]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#131a33] text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 border border-white/10">
            <div className="absolute -left-20 -top-20 w-80 h-80 bg-[#645efb]/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative max-w-2xl">
              <span className="inline-flex items-center gap-1 bg-[#e2dfff] text-[#0f0069] px-3 py-1 rounded-full text-xs font-bold mb-3">
                <span className="material-symbols-outlined text-xs">stars</span> Skynora Pass Club
              </span>
              <h2 className="font-['Plus_Jakarta_Sans'] text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
                Carry India in your pocket with the SKYNORA Super-App
              </h2>
              <p className="text-sm text-[#7b83a0] mt-2 leading-relaxed">
                Unlock secret hotel prices, real-time platform gate alerts, boarding pass widgets, and zero cancellation fee
                subscriptions. Available on Android & iOS.
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-6">
                <button
                  onClick={() => {
                    setAppDownloadNotice(true);
                    setTimeout(() => setAppDownloadNotice(false), 4000);
                  }}
                  className="bg-white text-[#131b2e] px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-[#dae2fd] transition-colors shadow-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined">android</span> Google Play
                </button>
                <button
                  onClick={() => {
                    setAppDownloadNotice(true);
                    setTimeout(() => setAppDownloadNotice(false), 4000);
                  }}
                  className="bg-white text-[#131b2e] px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-[#dae2fd] transition-colors shadow-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined">phone_iphone</span> App Store
                </button>
                <span className="text-[#7b83a0] text-xs ml-2">4.8 ★ rating across 180K+ app reviews</span>
              </div>
              {appDownloadNotice && (
                <div className="mt-4 p-3 bg-white/20 text-[#acedff] rounded-xl text-xs font-bold flex items-center gap-2 animate-fade-in">
                  <span className="material-symbols-outlined text-sm">sms</span>
                  <span>SMS link with Skynora Super-App APK dispatched to your registered phone!</span>
                </div>
              )}
            </div>

            <div className="relative shrink-0 flex items-center justify-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-center">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-white rounded-xl p-2.5 flex items-center justify-center shadow-md mb-3">
                  {/* Inline QR Code */}
                  <svg className="w-full h-full text-[#131a33]" fill="currentColor" viewBox="0 0 100 100">
                    <rect fill="white" height="100" width="100"></rect>
                    <path
                      d="M10 10h30v30h-30zM15 15h20v20h-20zM20 20h10v10h-10zM60 10h30v30h-30zM65 15h20v20h-20zM70 20h10v10h-10zM10 60h30v30h-30zM15 65h20v20h-20zM20 70h10v10h-10zM45 10h10v10h-10zM45 30h10v10h-10zM10 45h10v10h-10zM30 45h10v10h-10zM50 45h10v10h-10zM70 45h20v10h-20zM45 60h10v20h-10zM60 60h10v10h-10zM75 60h15v10h-15zM60 75h10v15h-10zM80 80h10v10h-10z"
                      fill="#131a33"
                    ></path>
                  </svg>
                </div>
                <span className="text-xs font-bold text-white">Scan to Download</span>
                <span className="text-[11px] text-[#7b83a0]">Instant ₹500 Welcome Wallet Credit</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
