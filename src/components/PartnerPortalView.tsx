import React, { useState } from 'react';
import { AppView } from '../types';

interface PartnerPortalViewProps {
  onNavigate: (view: AppView) => void;
}

export const PartnerPortalView: React.FC<PartnerPortalViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'reservations' | 'rates' | 'fleet'>('overview');
  const [ratesUpdatedMsg, setRatesUpdatedMsg] = useState('');
  const [adrSlider, setAdrSlider] = useState(18500);
  const [inventoryCount, setInventoryCount] = useState(4);
  const [payoutRequested, setPayoutRequested] = useState(false);

  const [bookings, setBookings] = useState([
    {
      id: 'RES-88910',
      guest: 'Rohan Sharma',
      property: 'Taj Fort Aguada Resort & Spa',
      room: 'Superior King Room (Sea View)',
      dates: '18 Nov - 22 Nov 2025 (4 Nights)',
      pax: '2 Adults',
      amount: '₹84,650',
      status: 'Confirmed',
      channel: 'Skynora Direct (0% Commission Tier)',
      statusColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 'RES-88902',
      guest: 'Pooja & Sameer Kulkarni',
      property: 'Heritage Portuguese Villa Assagao',
      room: 'Entire 3-BHK Villa Estate',
      dates: '20 Nov - 24 Nov 2025 (4 Nights)',
      pax: '4 Adults',
      amount: '₹51,200',
      status: 'Awaiting Host Check-in Pre-auth',
      channel: 'Skynora Luxe Collection',
      statusColor: 'bg-amber-100 text-amber-800'
    },
    {
      id: 'RES-88891',
      guest: 'Vikramaditya Singhania',
      property: 'Taj Fort Aguada Resort & Spa',
      room: 'Portuguese Heritage Suite with Plunge Pool',
      dates: '25 Nov - 28 Nov 2025 (3 Nights)',
      pax: '2 Adults',
      amount: '₹94,500',
      status: 'Confirmed',
      channel: 'Skynora Platinum Concierge',
      statusColor: 'bg-emerald-100 text-emerald-800'
    }
  ]);

  const handleApprove = (id: string) => {
    setBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, status: 'Confirmed', statusColor: 'bg-emerald-100 text-emerald-800' } : b))
    );
  };

  const handleSaveRates = (e: React.FormEvent) => {
    e.preventDefault();
    setRatesUpdatedMsg(`Inventory & ADR rates synced across Skynora Global Distribution Systems!`);
    setTimeout(() => setRatesUpdatedMsg(''), 4500);
  };

  const handleRequestPayout = () => {
    setPayoutRequested(true);
    setTimeout(() => setPayoutRequested(false), 5000);
  };

  return (
    <div className="pt-24 pb-20 bg-[#f4f6fb] min-h-screen text-[#131b2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-3xl border border-[#e2e7ff] shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-[#131a33] text-[#acedff]">
                B2B Partner Central
              </span>
              <span className="text-xs text-[#5a5c65] font-semibold">
                IHCL & Taj Group Hospitality Partner #IN-GOA-701
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-['Plus_Jakarta_Sans'] font-extrabold text-[#131b2e]">
              Taj Fort Aguada & North Goa Fleet Operations
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('explore')}
              className="px-4 py-2 rounded-xl border border-[#c6c6ce] text-xs font-bold text-[#45464d] hover:bg-[#faf8ff] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">visibility</span>
              <span>Traveler View</span>
            </button>

            <button
              onClick={handleRequestPayout}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">bolt</span>
              <span>{payoutRequested ? 'Payout Initiated (NPCI)' : 'Instant UPI Payout'}</span>
            </button>
          </div>
        </div>

        {ratesUpdatedMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2 font-semibold text-xs animate-fade-in">
            <span className="material-symbols-outlined text-emerald-600">check_circle</span>
            {ratesUpdatedMsg}
          </div>
        )}

        {payoutRequested && (
          <div className="mb-6 p-4 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 flex items-center gap-2 font-semibold text-xs animate-fade-in">
            <span className="material-symbols-outlined text-[#4b41e1]">payments</span>
            Instant settlement of ₹4,82,500 transferred to HDFC Escrow Account via direct UPI IMPS.
          </div>
        )}

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-[#e2e7ff] shadow-sm">
            <div className="text-xs font-bold text-[#757780] uppercase tracking-wider mb-1">
              Gross Monthly Revenue
            </div>
            <div className="text-2xl font-black font-['Plus_Jakarta_Sans'] text-[#131b2e]">
              ₹14,82,900
            </div>
            <div className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              +18.4% vs last month
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#e2e7ff] shadow-sm">
            <div className="text-xs font-bold text-[#757780] uppercase tracking-wider mb-1">
              Occupancy Rate
            </div>
            <div className="text-2xl font-black font-['Plus_Jakarta_Sans'] text-[#131b2e]">
              88.4%
            </div>
            <div className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">hotel</span>
              142 room-nights booked
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#e2e7ff] shadow-sm">
            <div className="text-xs font-bold text-[#757780] uppercase tracking-wider mb-1">
              Average Daily Rate (ADR)
            </div>
            <div className="text-2xl font-black font-['Plus_Jakarta_Sans'] text-[#131b2e]">
              ₹18,500
            </div>
            <div className="text-[11px] text-[#4b41e1] font-bold mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">tune</span>
              Dynamic parity active
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#e2e7ff] shadow-sm">
            <div className="text-xs font-bold text-[#757780] uppercase tracking-wider mb-1">
              Chauffeur Dispatch
            </div>
            <div className="text-2xl font-black font-['Plus_Jakarta_Sans'] text-[#131b2e]">
              18 Trips Live
            </div>
            <div className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              100% on-time airport pickup
            </div>
          </div>
        </div>

        {/* Portal Tabs */}
        <div className="flex items-center gap-2 border-b border-[#e2e7ff] pb-1 mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#131b2e] text-white shadow-sm'
                : 'text-[#45464d] hover:bg-[#e2e7ff]/40'
            }`}
          >
            Live Bookings Feed ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('rates')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === 'rates'
                ? 'bg-[#131b2e] text-white shadow-sm'
                : 'text-[#45464d] hover:bg-[#e2e7ff]/40'
            }`}
          >
            Inventory & Rate Parity
          </button>
          <button
            onClick={() => setActiveTab('fleet')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === 'fleet'
                ? 'bg-[#131b2e] text-white shadow-sm'
                : 'text-[#45464d] hover:bg-[#e2e7ff]/40'
            }`}
          >
            Airport Chauffeur Fleet
          </button>
        </div>

        {/* Live Bookings Feed */}
        {activeTab === 'overview' && (
          <div className="bg-white rounded-3xl p-6 border border-[#e2e7ff] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#131b2e]">Real-Time Guest Check-ins & Bookings</h3>
              <span className="text-xs text-[#757780]">Syncs with Opera PMS & Amadeus</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#e2e7ff] text-[#757780] font-bold uppercase tracking-wider">
                    <th className="pb-3">Res ID</th>
                    <th className="pb-3">Guest Name</th>
                    <th className="pb-3">Room / Category</th>
                    <th className="pb-3">Dates</th>
                    <th className="pb-3">Payout</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f2f3ff]">
                  {bookings.map(res => (
                    <tr key={res.id} className="hover:bg-[#faf8ff] transition-colors">
                      <td className="py-4 font-mono font-bold text-[#4b41e1]">{res.id}</td>
                      <td className="py-4">
                        <div className="font-bold text-[#131b2e]">{res.guest}</div>
                        <div className="text-[11px] text-[#757780]">{res.pax}</div>
                      </td>
                      <td className="py-4">
                        <div className="font-semibold text-[#131b2e]">{res.property}</div>
                        <div className="text-[11px] text-[#5a5c65]">{res.room}</div>
                      </td>
                      <td className="py-4 font-medium text-[#45464d]">{res.dates}</td>
                      <td className="py-4 font-black font-['Plus_Jakarta_Sans'] text-[#131b2e]">{res.amount}</td>
                      <td className="py-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${res.statusColor}`}>
                          {res.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        {res.status !== 'Confirmed' ? (
                          <button
                            onClick={() => handleApprove(res.id)}
                            className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors cursor-pointer"
                          >
                            Approve
                          </button>
                        ) : (
                          <button
                            onClick={() => onNavigate('booking-voucher')}
                            className="px-3 py-1 rounded-lg bg-[#f2f3ff] text-[#4b41e1] font-bold text-xs hover:bg-[#e2e7ff] transition-colors cursor-pointer"
                          >
                            Inspect Voucher
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Rate Parity & Inventory */}
        {activeTab === 'rates' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e2e7ff] shadow-sm max-w-3xl">
            <h3 className="text-lg font-bold text-[#131b2e] mb-1">
              Dynamic Pricing & Nightly Allotment
            </h3>
            <p className="text-xs text-[#5a5c65] mb-6">
              Adjust rack rates and live inventory allocated to Skynora Travelers for peak season.
            </p>

            <form onSubmit={handleSaveRates} className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-[#131b2e]">
                    Superior King Room Base Nightly Rate:
                  </label>
                  <span className="text-base font-black font-['Plus_Jakarta_Sans'] text-[#4b41e1]">
                    ₹{adrSlider.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="12000"
                  max="35000"
                  step="500"
                  value={adrSlider}
                  onChange={e => setAdrSlider(parseInt(e.target.value, 10))}
                  className="w-full accent-[#4b41e1] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#757780] mt-1">
                  <span>Min: ₹12,000</span>
                  <span>Standard: ₹18,500</span>
                  <span>Peak Surcharge: ₹35,000</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-[#131b2e]">
                    Instant Guaranteed Rooms Allocated:
                  </label>
                  <span className="text-base font-black font-['Plus_Jakarta_Sans'] text-emerald-600">
                    {inventoryCount} Rooms / Night
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={inventoryCount}
                  onChange={e => setInventoryCount(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div className="p-4 rounded-2xl bg-[#faf8ff] border border-[#e2e7ff] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#131b2e]">
                    Auto Rate Parity Protection
                  </div>
                  <div className="text-[11px] text-[#5a5c65]">
                    Automatically match cheapest official rate from OTA channels
                  </div>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#4b41e1]" />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#4b41e1] text-white font-bold text-xs hover:bg-[#3b30d0] transition-colors shadow-sm cursor-pointer"
              >
                Push Inventory & Rates to Skynora Network
              </button>
            </form>
          </div>
        )}

        {/* Fleet Dispatch */}
        {activeTab === 'fleet' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e2e7ff] shadow-sm">
            <h3 className="text-lg font-bold text-[#131b2e] mb-4">
              North Goa Chauffeur Fleet & Airport Transfers
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#faf8ff] border border-[#e2e7ff] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Dispatched & En Route
                  </span>
                  <span className="text-xs font-mono font-bold text-[#131b2e]">GA-03-Z-4412</span>
                </div>
                <h4 className="font-bold text-sm text-[#131b2e]">Toyota Innova Crysta</h4>
                <p className="text-xs text-[#5a5c65]">
                  Driver: Suresh Naik • Assigned to Rohan Sharma (#SKN-2025-984210)
                </p>
                <div className="text-xs text-[#4b41e1] font-semibold pt-1">
                  Pickup: Dabolim Terminal 1 • Drop: Taj Fort Aguada (36 km)
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#faf8ff] border border-[#e2e7ff] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800">
                    Standby at Goa Mopa Airport (GOX)
                  </span>
                  <span className="text-xs font-mono font-bold text-[#131b2e]">GA-01-A-9901</span>
                </div>
                <h4 className="font-bold text-sm text-[#131b2e]">Mercedes-Benz E-Class</h4>
                <p className="text-xs text-[#5a5c65]">
                  Driver: Ramesh Fernandes • VIP Concierge Reserve
                </p>
                <div className="text-xs text-[#4b41e1] font-semibold pt-1">
                  Flight 6E-512 Arrival ETA: 03:45 PM
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
