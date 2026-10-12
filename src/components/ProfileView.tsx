import React, { useState } from 'react';
import { BookingState, AppView, Property } from '../types';
import { INITIAL_PROPERTIES } from '../data/mockData';

interface ProfileViewProps {
  bookingState: BookingState;
  onNavigate: (view: AppView) => void;
  onSelectProperty?: (property: Property) => void;
  user?: any;
  onSignIn?: () => void;
  onSignOut?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  bookingState,
  onNavigate,
  onSelectProperty,
  user,
  onSignIn,
  onSignOut,
}) => {
  const [activeTab, setActiveTab] = useState<'trips' | 'wallet' | 'refunds' | 'co-travelers' | 'preferences'>('trips');
  const [walletBalance, setWalletBalance] = useState(bookingState.creditsAmount);
  const [rewardPoints, setRewardPoints] = useState(14850);
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [addAmount, setAddAmount] = useState('2000');
  const [walletSuccessMsg, setWalletSuccessMsg] = useState('');
  const [tripFilter, setTripFilter] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');

  const handleAddFunds = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(addAmount, 10);
    if (!isNaN(num) && num > 0) {
      setWalletBalance(prev => prev + num);
      setShowAddMoneyModal(false);
      setWalletSuccessMsg(`Successfully credited ₹${num.toLocaleString('en-IN')} to Skynora Wallet via UPI AutoPay!`);
      setTimeout(() => setWalletSuccessMsg(''), 5000);
    }
  };

  const handleRedeemPoints = () => {
    if (rewardPoints >= 1000) {
      const addedCash = 500;
      setRewardPoints(prev => prev - 1000);
      setWalletBalance(prev => prev + addedCash);
      setWalletSuccessMsg(`Redeemed 1,000 Skynora points for ₹${addedCash} wallet balance!`);
      setTimeout(() => setWalletSuccessMsg(''), 5000);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-[#faf8ff] min-h-screen text-[#131b2e]">
      {/* Top Banner & Profile Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {walletSuccessMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between shadow-sm animate-fade-in">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-emerald-600">check_circle</span>
              <span className="font-semibold text-sm">{walletSuccessMsg}</span>
            </div>
            <button
              onClick={() => setWalletSuccessMsg('')}
              className="text-emerald-700 hover:text-emerald-900 cursor-pointer text-sm font-bold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* User Identity Card */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#131b2e] via-[#1f2942] to-[#253252] text-white p-6 sm:p-8 shadow-xl overflow-hidden mb-8">
          {/* Subtle background ornamentation */}
          <div className="absolute right-0 top-0 bottom-0 w-96 bg-[radial-gradient(circle_at_top_right,rgba(75,65,225,0.35),transparent_70%)] pointer-events-none" />
          <div className="absolute -right-12 -bottom-12 w-64 h-64 border border-white/10 rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-5">
              <div className="relative">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA870SKCuQB5h2mt-l5QN0MX7I1xMHQpxDaHJEA4dbiz-kvnZrvbT0xd9oE8zq1e6Uh6knVRfIyCzjkve6OYw3KDs_g-JFiYKVSYFVOOycxNd5fT13nz7Nhn0SDuU4_SDM7Oct1sU45XgPcJYc5iC5zi1NwPHWuHb4Kpe8EVC4Ld04nzM8MRxTOtZHp9G6oaL8PAVCc0n0mth9fae_aWn6G87CwVPDBXfM5Nx8kJOThtuD0F86pY7FaPQ"
                  alt="Rohan Sharma"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-[#acedff]/30 shadow-lg"
                />
                <span className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-400 to-amber-600 text-[#131b2e] text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md">
                  VIP 4
                </span>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-2xl sm:text-3xl font-['Plus_Jakarta_Sans'] font-extrabold tracking-tight">
                    {bookingState.primaryGuest.name}
                  </h1>
                  <span className="inline-flex items-center gap-1 bg-[#4b41e1]/80 backdrop-blur-md px-2.5 py-0.5 rounded-full text-xs font-bold text-white border border-white/20">
                    <span className="material-symbols-outlined text-xs text-amber-300">workspace_premium</span>
                    Platinum Elite
                  </span>
                  <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full text-xs font-semibold">
                    <span className="material-symbols-outlined text-xs">verified</span>
                    KYC Verified
                  </span>
                </div>

                <p className="text-sm text-slate-300 flex flex-wrap items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-slate-400">mail</span>
                    {bookingState.primaryGuest.email}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-slate-400">phone_iphone</span>
                    {bookingState.primaryGuest.phone}
                  </span>
                  <span>•</span>
                  <span className="text-xs text-slate-400">Member since Oct 2021</span>
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-300">
                  <span className="bg-white/10 px-2.5 py-1 rounded-lg">
                    Annual Savings: <strong className="text-[#acedff]">₹38,420</strong>
                  </span>
                  <span className="bg-white/10 px-2.5 py-1 rounded-lg">
                    Trip Index: <strong className="text-emerald-400">14 Journeys</strong>
                  </span>

                  {user ? (
                    <button
                      onClick={onSignOut}
                      className="ml-auto bg-white/20 hover:bg-white/30 text-white font-bold px-3 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-xs">logout</span>
                      <span>Sign Out ({user.displayName || user.email})</span>
                    </button>
                  ) : (
                    <button
                      onClick={onSignIn}
                      className="ml-auto bg-white text-[#131b2e] hover:bg-slate-100 font-bold px-3 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-xs text-[#4b41e1]">login</span>
                      <span>Link Google Account</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Wallet Stats Strip */}
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
              <div className="border-r border-white/15 pr-4">
                <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                  Skynora Wallet
                </div>
                <div className="text-2xl font-black font-['Plus_Jakarta_Sans'] text-white">
                  ₹{walletBalance.toLocaleString('en-IN')}
                </div>
                <button
                  onClick={() => setShowAddMoneyModal(true)}
                  className="mt-1 text-xs font-bold text-[#acedff] hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xs">add_circle</span> Add Funds
                </button>
              </div>

              <div>
                <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                  Reward Points
                </div>
                <div className="text-2xl font-black font-['Plus_Jakarta_Sans'] text-amber-300">
                  {rewardPoints.toLocaleString('en-IN')}
                </div>
                <button
                  onClick={handleRedeemPoints}
                  className="mt-1 text-xs font-bold text-amber-200 hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xs">redeem</span> Redeem (₹500)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#e2e7ff] pb-1 mb-8 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('trips')}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'trips'
                ? 'bg-[#131b2e] text-white shadow-md'
                : 'text-[#45464d] hover:bg-[#e2e7ff]/40 hover:text-[#131b2e]'
            }`}
          >
            <span className="material-symbols-outlined text-base">flight_takeoff</span>
            <span>Trips & Bookings</span>
            <span className="ml-1 px-2 py-0.5 rounded-full text-xs bg-indigo-500/20 text-indigo-700">1 Active</span>
          </button>

          <button
            onClick={() => setActiveTab('wallet')}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'wallet'
                ? 'bg-[#131b2e] text-white shadow-md'
                : 'text-[#45464d] hover:bg-[#e2e7ff]/40 hover:text-[#131b2e]'
            }`}
          >
            <span className="material-symbols-outlined text-base">account_balance_wallet</span>
            <span>Skynora Cash & Points</span>
          </button>

          <button
            onClick={() => setActiveTab('refunds')}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'refunds'
                ? 'bg-[#131b2e] text-white shadow-md'
                : 'text-[#45464d] hover:bg-[#e2e7ff]/40 hover:text-[#131b2e]'
            }`}
          >
            <span className="material-symbols-outlined text-base">currency_rupee_circle</span>
            <span>Instant UPI Refunds</span>
            <span className="px-1.5 py-0.5 text-[10px] font-black uppercase rounded bg-emerald-100 text-emerald-800">
              Live
            </span>
          </button>

          <button
            onClick={() => setActiveTab('co-travelers')}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'co-travelers'
                ? 'bg-[#131b2e] text-white shadow-md'
                : 'text-[#45464d] hover:bg-[#e2e7ff]/40 hover:text-[#131b2e]'
            }`}
          >
            <span className="material-symbols-outlined text-base">group</span>
            <span>Co-Travelers</span>
          </button>

          <button
            onClick={() => setActiveTab('preferences')}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'preferences'
                ? 'bg-[#131b2e] text-white shadow-md'
                : 'text-[#45464d] hover:bg-[#e2e7ff]/40 hover:text-[#131b2e]'
            }`}
          >
            <span className="material-symbols-outlined text-base">settings</span>
            <span>Preferences & GST</span>
          </button>
        </div>

        {/* Tab 1: Trips & Bookings */}
        {activeTab === 'trips' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 bg-[#f2f3ff] p-1 rounded-xl">
                <button
                  onClick={() => setTripFilter('upcoming')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    tripFilter === 'upcoming'
                      ? 'bg-white text-[#131b2e] shadow-sm'
                      : 'text-[#5a5c65] hover:text-[#131b2e]'
                  }`}
                >
                  Upcoming (1)
                </button>
                <button
                  onClick={() => setTripFilter('completed')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    tripFilter === 'completed'
                      ? 'bg-white text-[#131b2e] shadow-sm'
                      : 'text-[#5a5c65] hover:text-[#131b2e]'
                  }`}
                >
                  Past Stays (4)
                </button>
                <button
                  onClick={() => setTripFilter('cancelled')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    tripFilter === 'cancelled'
                      ? 'bg-white text-[#131b2e] shadow-sm'
                      : 'text-[#5a5c65] hover:text-[#131b2e]'
                  }`}
                >
                  Cancelled / Refunded (1)
                </button>
              </div>

              <button
                onClick={() => onNavigate('hotels')}
                className="text-xs font-bold text-[#4b41e1] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Plan Another Trip</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </button>
            </div>

            {tripFilter === 'upcoming' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e2e7ff] shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                  <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                    <img
                      src={bookingState.property.image}
                      alt={bookingState.property.title}
                      className="w-full sm:w-36 h-28 rounded-2xl object-cover shadow-inner"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800">
                          Confirmed & Issued
                        </span>
                        <span className="text-xs text-[#757780] font-mono">
                          PNR: {bookingState.hotelPnr}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-[#131b2e] mb-1">
                        {bookingState.property.title}
                      </h3>
                      <p className="text-sm text-[#45464d] flex items-center gap-1 mb-2">
                        <span className="material-symbols-outlined text-base text-[#4b41e1]">location_on</span>
                        {bookingState.property.neighborhood}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#5a5c65]">
                        <span className="font-semibold text-[#131b2e] bg-[#f2f3ff] px-2.5 py-1 rounded-md">
                          📅 {bookingState.checkIn} — {bookingState.checkOut} ({bookingState.nights} Nights)
                        </span>
                        <span className="bg-[#f2f3ff] px-2.5 py-1 rounded-md">
                          🛏️ {bookingState.roomTitle}
                        </span>
                        <span className="bg-[#f2f3ff] px-2.5 py-1 rounded-md">
                          👥 {bookingState.guests}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full lg:w-auto">
                    <button
                      onClick={() => onNavigate('booking-voucher')}
                      className="px-5 py-2.5 rounded-xl bg-[#4b41e1] text-white text-xs font-bold hover:bg-[#3b30d0] transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">confirmation_number</span>
                      <span>View Voucher & Boarding Pass</span>
                    </button>

                    <button
                      onClick={() => onNavigate('hotel-detail')}
                      className="px-5 py-2.5 rounded-xl bg-[#f2f3ff] text-[#131b2e] hover:bg-[#e2e7ff] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">info</span>
                      <span>Property Details</span>
                    </button>

                    <div className="text-[11px] text-center text-emerald-700 font-semibold bg-emerald-50 py-1 px-2 rounded-lg">
                      Free cancellation until {bookingState.property.cancellationText.replace('Free cancellation before ', '')}
                    </div>
                  </div>
                </div>

                {/* Chauffeur snippet */}
                {bookingState.addOns.airportCab && (
                  <div className="mt-6 pt-5 border-t border-[#f2f3ff] flex flex-wrap items-center justify-between gap-4 bg-[#f8f9ff] -mx-6 -mb-6 p-6 rounded-b-3xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#131a33] text-[#acedff] flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">directions_car</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#131b2e]">
                          Complimentary Airport Transfer Scheduled
                        </div>
                        <div className="text-xs text-[#5a5c65]">
                          {bookingState.assignedDriver.carModel} ({bookingState.assignedDriver.licensePlate}) • Driver: {bookingState.assignedDriver.name}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => onNavigate('booking-voucher')}
                      className="text-xs font-bold text-[#4b41e1] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Live Driver Tracking</span>
                      <span className="material-symbols-outlined text-sm">near_me</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {tripFilter === 'completed' && (
              <div className="space-y-4">
                {[
                  {
                    title: 'The Oberoi Amarvilas, Agra',
                    dates: '14 Jan - 17 Jan 2025 (3 Nights)',
                    room: 'Premier Room with Taj View',
                    amount: '₹72,400',
                    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD41cPVuv-DsTdGKBlStFjpSu9NP1IV01TlLbDWhzg1HijaDM0sxBkgMgwvXdyAkDDPRUJn8NRnRhFkjq1boHfEWiwQ4bYuty6XqOMLbQJx2EVpOTbpV2BV6zPBgzeUpl1wOoGx014vxExHHAbYzFGHgVvJlK-MbfHJKu5OkfoK0y9UVabwXaAz_1ntwOSqBOKuIY0T2xOaEos74eyRhfYU23erOTJpNrFvV_a1R5AVXden_ETJTeaXqA',
                  },
                  {
                    title: 'Evolve Back, Kabini',
                    dates: '02 Oct - 05 Oct 2024 (3 Nights)',
                    room: 'Safari Pool Hut with Private Deck',
                    amount: '₹84,500',
                    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiSe5srmtZeJOCtyz4O39Idbg2mHx9PDpGJG5cJt6fa7lHbTrO51CWdq6abzRBML3JyTlWz8aUR2tpd3PmlktDgTGigHtPTxW1IvbxdIMQQOVbwiYjExPqJm7rQvIp0I2-kWBB3IAWSOkoqR_H0vhp3KTmR1kPIZXXV7m5TEIjwK6d5lTCiVzXnSr2234CkAcOb44jmwXG1HlVZVZxUKBS6DDwZcdMsoyGJ884nzMFxVn1dR_o2wpnWA',
                  },
                  {
                    title: 'The Tamara Coorg Plantation Resort',
                    dates: '18 Aug - 21 Aug 2024 (3 Nights)',
                    room: 'Luxury Suite on Forest Canopy',
                    amount: '₹41,200',
                    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCM40-ttH_g-6mcCuUNeWeXGAnYE4aedA4eqcKGijg3Zs-NF683J9Zgf4zcKhGxbipGwjHISCq8nXgfLLOjnCnwmIssIxr-wEkYzDkWB9DgVUqDnElVw-8MAHmhM5Sl2HPRAyymCJkaDc0z3d8dA1lOjpuKXLse9JjCjEB13bglgZfz_sWK2S0t816NTczKX8Fo8vS2bLCJI9jwhmQgdlS3lCj0iZ7cXkOUTUHtNkaTEvdqSNB2A32Xiw',
                  }
                ].map((stay, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-5 border border-[#e2e7ff] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img src={stay.img} alt={stay.title} className="w-16 h-16 rounded-xl object-cover" />
                      <div>
                        <h4 className="font-bold text-[#131b2e] text-base">{stay.title}</h4>
                        <p className="text-xs text-[#5a5c65]">{stay.dates} • {stay.room}</p>
                        <p className="text-xs font-bold text-[#4b41e1] mt-0.5">Paid {stay.amount} via UPI Instant</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => onNavigate('hotels')}
                        className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#f2f3ff] hover:bg-[#e2e7ff] text-xs font-bold text-[#131b2e] transition-colors cursor-pointer"
                      >
                        Book Again
                      </button>
                      <button className="flex-1 sm:flex-initial px-4 py-2 rounded-xl border border-[#c6c6ce]/60 text-xs font-bold text-[#45464d] hover:bg-[#faf8ff] transition-colors cursor-pointer">
                        Tax Invoice
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tripFilter === 'cancelled' && (
              <div className="bg-white rounded-2xl p-6 border border-[#e2e7ff]">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                      Refund Processed & Completed
                    </span>
                    <h4 className="font-bold text-[#131b2e] text-base mt-2">
                      Vivanta Goa, Miramar
                    </h4>
                    <p className="text-xs text-[#5a5c65] mt-1">
                      Check-in was 10 Sep 2024 • Refund Amount: ₹18,400 credited to UPI ID rohan@okaxis
                    </p>
                    <p className="text-xs text-emerald-700 font-mono mt-1">
                      UTR: 425109841233 (Instant reversal in 3.8s)
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('refunds')}
                    className="text-xs font-bold text-[#4b41e1] hover:underline cursor-pointer"
                  >
                    View UPI Log
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Skynora Cash & Points */}
        {activeTab === 'wallet' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-[#e2e7ff] shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#131b2e]">Skynora Wallet Ledger</h3>
                    <p className="text-xs text-[#5a5c65]">100% RBI Escrow Protected • Instant UPI 1-click checkout</p>
                  </div>
                  <button
                    onClick={() => setShowAddMoneyModal(true)}
                    className="px-4 py-2 rounded-xl bg-[#4b41e1] text-white text-xs font-bold hover:bg-[#3b30d0] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                    <span>Add Balance</span>
                  </button>
                </div>

                <div className="divide-y divide-[#f2f3ff]">
                  {[
                    {
                      desc: 'Skynora Platinum Cashback Bonus (Taj Fort Aguada)',
                      date: 'Today, 02:14 PM',
                      amount: '+₹1,200',
                      type: 'credit',
                      utr: 'SKN-CB-8831'
                    },
                    {
                      desc: 'Redeemed Reward Points to Wallet',
                      date: '10 Oct 2025, 11:30 AM',
                      amount: '+₹500',
                      type: 'credit',
                      utr: 'SKN-RWD-1029'
                    },
                    {
                      desc: 'Auto-Debit: Taj Fort Aguada Booking (Part Payment)',
                      date: '08 Oct 2025, 04:12 PM',
                      amount: '-₹2,450',
                      type: 'debit',
                      utr: 'UPI-TXN-593123'
                    },
                    {
                      desc: 'Direct UPI Top-up via GPay',
                      date: '01 Oct 2025, 09:20 AM',
                      amount: '+₹5,000',
                      type: 'credit',
                      utr: 'UPI-IN-994102'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="py-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center ${
                            item.type === 'credit'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-rose-100 text-rose-700'
                          }`}
                        >
                          <span className="material-symbols-outlined text-base">
                            {item.type === 'credit' ? 'arrow_downward' : 'arrow_upward'}
                          </span>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#131b2e]">{item.desc}</div>
                          <div className="text-[11px] text-[#757780]">
                            {item.date} • Ref: {item.utr}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`text-sm font-black font-['Plus_Jakarta_Sans'] ${
                          item.type === 'credit' ? 'text-emerald-600' : 'text-[#131b2e]'
                        }`}
                      >
                        {item.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Loyalty & Concierge Card */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#131a33] to-[#253252] text-white p-6 rounded-3xl shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs uppercase tracking-widest font-bold text-amber-400">
                    Tier Privilege
                  </span>
                  <span className="material-symbols-outlined text-amber-400">diamond</span>
                </div>
                <h4 className="text-xl font-bold font-['Plus_Jakarta_Sans'] mb-2">
                  Platinum Concierge Desk
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Direct access to your dedicated travel curator for bespoke reservations, complimentary room upgrades, and priority airport chauffeurs.
                </p>
                <div className="p-3 bg-white/10 rounded-xl mb-4 text-xs space-y-1">
                  <div className="text-slate-300">Dedicated Manager:</div>
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-emerald-400">support_agent</span>
                    Varun Mehra (+91 98112 40019)
                  </div>
                </div>
                <a
                  href="https://wa.me/919811240019"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">chat</span>
                  <span>Connect on WhatsApp VIP Desk</span>
                </a>
              </div>

              <div className="bg-[#e2e7ff]/40 rounded-3xl p-6 border border-[#c6c6ce]/40">
                <h4 className="font-bold text-[#131b2e] text-sm mb-2">Did you know?</h4>
                <p className="text-xs text-[#45464d] leading-relaxed">
                  Skynora Travel Credits never expire and can be combined with any bank card offer or promotional voucher code at checkout.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Instant UPI Refunds Tracker */}
        {activeTab === 'refunds' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e2e7ff] shadow-sm">
            <div className="max-w-3xl mb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-emerald-600 text-xl">bolt</span>
                <h3 className="text-lg font-bold text-[#131b2e]">Skynora Instant UPI Refund Engine</h3>
              </div>
              <p className="text-xs text-[#5a5c65]">
                Unlike conventional portals that hold your money for 5-7 business days, Skynora integrates directly with NPCI UPI switch to reverse funds directly to your originating VPA in under 5 seconds.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  id: 'REF-2025-0981',
                  hotel: 'Taj Fort Aguada (Room upgrade price difference)',
                  amount: '₹2,100',
                  vpa: 'rohan@okaxis',
                  status: 'Settled in 3.4 seconds',
                  time: '12 Oct 2025, 01:15 AM',
                  utr: '528509124801',
                  rrn: '419082341902',
                  speed: 'Ultra Fast'
                },
                {
                  id: 'REF-2024-8842',
                  hotel: 'Vivanta Goa Miramar (Trip rescheduled)',
                  amount: '₹18,400',
                  vpa: 'rohan@okaxis',
                  status: 'Settled in 4.1 seconds',
                  time: '10 Sep 2024, 05:40 PM',
                  utr: '425109841233',
                  rrn: '320194812304',
                  speed: 'Ultra Fast'
                }
              ].map(ref => (
                <div key={ref.id} className="p-5 rounded-2xl bg-[#f8f9ff] border border-[#e2e7ff] flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#4b41e1]">{ref.id}</span>
                      <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                        {ref.status}
                      </span>
                    </div>
                    <div className="font-bold text-sm text-[#131b2e]">{ref.hotel}</div>
                    <div className="text-xs text-[#5a5c65] flex flex-wrap gap-3">
                      <span>VPA: <strong className="text-[#131b2e]">{ref.vpa}</strong></span>
                      <span>•</span>
                      <span>NPCI UTR: <strong className="font-mono text-[#131b2e]">{ref.utr}</strong></span>
                      <span>•</span>
                      <span>Bank RRN: <strong className="font-mono text-[#131b2e]">{ref.rrn}</strong></span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-black font-['Plus_Jakarta_Sans'] text-emerald-600">
                      +{ref.amount}
                    </div>
                    <div className="text-[11px] text-[#757780]">{ref.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Co-Travelers */}
        {activeTab === 'co-travelers' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e2e7ff] shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-[#131b2e]">Saved Co-Travelers</h3>
                <p className="text-xs text-[#5a5c65]">
                  Prefill traveler passports, Aadhaar IDs, and contact numbers for seamless 1-click checkouts
                </p>
              </div>
              <button className="px-4 py-2 rounded-xl bg-[#4b41e1] text-white text-xs font-bold hover:bg-[#3b30d0] transition-colors flex items-center gap-1 cursor-pointer">
                <span className="material-symbols-outlined text-sm">person_add</span>
                <span>Add Co-Traveler</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: 'Rohan Sharma',
                  relation: 'Primary Traveler (Self)',
                  govId: 'Aadhaar •••• 9812',
                  phone: '+91 98765 43210',
                  meal: 'Asian Vegetarian',
                  badge: 'Self'
                },
                {
                  name: 'Ananya Sharma',
                  relation: 'Spouse',
                  govId: 'Passport •••• 4120',
                  phone: '+91 98765 43211',
                  meal: 'Vegetarian',
                  badge: 'Verified'
                },
                {
                  name: 'Aarav Sharma',
                  relation: 'Child (8 yrs)',
                  govId: 'Birth Certificate on file',
                  phone: 'Guardian linked',
                  meal: 'Child Meal',
                  badge: 'Minor'
                }
              ].map((trav, idx) => (
                <div key={idx} className="p-5 rounded-2xl border border-[#e2e7ff] bg-[#faf8ff] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#4b41e1] bg-[#e2e7ff] px-2 py-0.5 rounded-md">
                      {trav.badge}
                    </span>
                    <button className="text-[#757780] hover:text-[#131b2e] cursor-pointer">
                      <span className="material-symbols-outlined text-base">edit</span>
                    </button>
                  </div>
                  <h4 className="font-bold text-sm text-[#131b2e]">{trav.name}</h4>
                  <p className="text-xs text-[#5a5c65]">{trav.relation}</p>
                  <div className="pt-2 border-t border-[#e2e7ff] text-xs space-y-1 text-[#45464d]">
                    <div>🪪 {trav.govId}</div>
                    <div>📞 {trav.phone}</div>
                    <div>🍽️ {trav.meal}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Preferences & GST */}
        {activeTab === 'preferences' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e2e7ff] shadow-sm max-w-4xl space-y-6">
            <h3 className="text-lg font-bold text-[#131b2e]">Travel Preferences & Corporate GST</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#faf8ff] border border-[#e2e7ff]">
                <label className="text-xs font-bold text-[#131b2e] block mb-1">
                  Registered Corporate GSTIN
                </label>
                <input
                  type="text"
                  defaultValue="27AABCU9603R1ZM"
                  className="w-full text-xs font-mono font-bold bg-white px-3 py-2 rounded-xl border border-[#c6c6ce] focus:outline-[#4b41e1]"
                />
                <span className="text-[11px] text-[#757780] mt-1 block">
                  Eligible for 18% Input Tax Credit on all Skynora business invoices.
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#faf8ff] border border-[#e2e7ff]">
                <label className="text-xs font-bold text-[#131b2e] block mb-1">
                  Default UPI ID for 1-Click Payments
                </label>
                <input
                  type="text"
                  defaultValue="rohan@okaxis"
                  className="w-full text-xs font-mono font-bold bg-white px-3 py-2 rounded-xl border border-[#c6c6ce] focus:outline-[#4b41e1]"
                />
                <span className="text-[11px] text-[#757780] mt-1 block">
                  Protected with NPCI 2-factor MPIN authorization.
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#f2f3ff] flex justify-end">
              <button
                onClick={() => {
                  setWalletSuccessMsg('Saved profile preferences & GST profile successfully!');
                  setTimeout(() => setWalletSuccessMsg(''), 4000);
                }}
                className="px-6 py-2.5 rounded-xl bg-[#4b41e1] text-white text-xs font-bold hover:bg-[#3b30d0] transition-colors cursor-pointer"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Money Modal */}
      {showAddMoneyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#e2e7ff] animate-scale-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#131b2e] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4b41e1]">add_card</span>
                <span>Add Money to Skynora Wallet</span>
              </h3>
              <button
                onClick={() => setShowAddMoneyModal(false)}
                className="text-[#757780] hover:text-[#131b2e] cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <p className="text-xs text-[#5a5c65] mb-5">
              Enjoy zero payment gateway charges and instant booking speed with pre-loaded balance.
            </p>

            <form onSubmit={handleAddFunds} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#45464d] mb-1.5">Enter Amount (₹)</label>
                <input
                  type="number"
                  value={addAmount}
                  onChange={e => setAddAmount(e.target.value)}
                  className="w-full text-xl font-black font-['Plus_Jakarta_Sans'] text-[#131b2e] px-4 py-3 rounded-2xl border border-[#c6c6ce] focus:outline-[#4b41e1]"
                  min="500"
                  max="100000"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                {['1000', '2000', '5000', '10000'].map(preset => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAddAmount(preset)}
                    className="flex-1 py-1.5 rounded-xl bg-[#f2f3ff] text-xs font-bold text-[#131b2e] hover:bg-[#e2e7ff] transition-colors cursor-pointer"
                  >
                    +₹{parseInt(preset).toLocaleString('en-IN')}
                  </button>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                💡 <strong>Instant Top-up:</strong> Uses your linked UPI ID <code>rohan@okaxis</code> with zero bank charges.
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddMoneyModal(false)}
                  className="flex-1 py-3 rounded-xl border border-[#c6c6ce] text-xs font-bold text-[#45464d] hover:bg-[#faf8ff] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[#4b41e1] text-white text-xs font-bold hover:bg-[#3b30d0] transition-colors shadow-sm cursor-pointer"
                >
                  Confirm & Pay ₹{parseInt(addAmount || '0').toLocaleString('en-IN')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
