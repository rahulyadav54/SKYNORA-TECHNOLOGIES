import React, { useState } from 'react';
import { AppView, BookingState } from '../types';

interface BusesViewProps {
  onNavigate: (view: AppView) => void;
  onBookBus: (busDetails: any) => void;
}

export const BusesView: React.FC<BusesViewProps> = ({ onNavigate, onBookBus }) => {
  const [fromCity, setFromCity] = useState('Mumbai (Borivali / Sion / Vashi)');
  const [toCity, setToCity] = useState('Goa (Mapusa / Panjim / Madgaon)');
  const [date, setDate] = useState('18 Nov 2025');
  const [filterAc, setFilterAc] = useState(true);
  const [filterSleeper, setFilterSleeper] = useState(true);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [activeBusId, setActiveBusId] = useState<string | null>('smartbus-1');

  const buses = [
    {
      id: 'smartbus-1',
      operator: 'IntrCity SmartBus Lounge',
      type: 'Volvo 9600 Multi-Axle AC Sleeper (2+1)',
      departureTime: '18:30',
      departurePoint: 'Borivali West, Mumbai',
      arrivalTime: '07:45 (+1 Day)',
      arrivalPoint: 'Panjim KTC Bus Stand, Goa',
      duration: '13h 15m',
      rating: 4.8,
      reviews: 842,
      price: 1850,
      originalPrice: 2400,
      badge: 'Skynora Certified',
      amenities: ['Private Cabin Curtain', 'Live GPS Tracking', 'Washroom Onboard', 'Snack Box & Water', 'Charging Port'],
      seatsAvailable: 9,
    },
    {
      id: 'zingbus-2',
      operator: 'Zingbus Electric Luxe',
      type: 'BharatBenz AC Sleeper with Air Suspension',
      departureTime: '20:00',
      departurePoint: 'Sion Circle, Mumbai',
      arrivalTime: '08:30 (+1 Day)',
      arrivalPoint: 'Mapusa Bus Stand, Goa',
      duration: '12h 30m',
      rating: 4.7,
      reviews: 620,
      price: 1650,
      originalPrice: 2100,
      badge: 'Zero Emission',
      amenities: ['Free Wi-Fi', 'Warm Blanket', 'Emergency SOS', 'Lady-Safe Seating', 'Live Speed Tracker'],
      seatsAvailable: 14,
    },
    {
      id: 'orange-3',
      operator: 'Orange Tours & Travels',
      type: 'Scania Metrolink HD Multiaxle AC Sleeper',
      departureTime: '21:15',
      departurePoint: 'Vashi Plaza, Navi Mumbai',
      arrivalTime: '09:45 (+1 Day)',
      arrivalPoint: 'Madgaon Railway Station Link, Goa',
      duration: '12h 30m',
      rating: 4.6,
      reviews: 490,
      price: 1499,
      originalPrice: 1950,
      badge: 'Express Corridor',
      amenities: ['Individual 10-inch LCD', 'USB Ports', 'Reading Lamps', 'Complimentary Goan Bottled Water'],
      seatsAvailable: 6,
    }
  ];

  const handleSeatClick = (seat: string) => {
    setSelectedSeat(seat === selectedSeat ? null : seat);
  };

  const handleProceedBooking = (bus: any) => {
    onBookBus({
      title: `${bus.operator} - ${bus.type}`,
      category: 'Bus',
      from: fromCity,
      to: toCity,
      date,
      seat: selectedSeat || 'U-4 (Single Window Sleeper)',
      price: bus.price,
    });
  };

  return (
    <div className="pt-24 pb-20 bg-[#faf8ff] min-h-screen text-[#131b2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb & Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#45464d] mb-1">
              <button onClick={() => onNavigate('explore')} className="hover:text-[#4b41e1] cursor-pointer">Home</button>
              <span>/</span>
              <span className="font-semibold text-[#131b2e]">Intercity Luxury Sleeper Buses</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-['Plus_Jakarta_Sans']">
              Luxury Sleeper Coaches & SmartBuses
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">verified</span>
              100% On-Time Guarantee or ₹500 Cashback
            </span>
          </div>
        </div>

        {/* Search & Route Filter Bar */}
        <div className="bg-white p-5 rounded-3xl border border-[#e2e7ff] shadow-sm mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div>
            <label className="text-[11px] font-bold text-[#757780] uppercase tracking-wider block mb-1">From</label>
            <div className="flex items-center gap-2 bg-[#f2f3ff] px-3.5 py-2.5 rounded-2xl">
              <span className="material-symbols-outlined text-[#4b41e1] text-lg">departure_board</span>
              <input
                type="text"
                value={fromCity}
                onChange={e => setFromCity(e.target.value)}
                className="bg-transparent text-xs font-bold text-[#131b2e] w-full focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-[#757780] uppercase tracking-wider block mb-1">To Destination</label>
            <div className="flex items-center gap-2 bg-[#f2f3ff] px-3.5 py-2.5 rounded-2xl">
              <span className="material-symbols-outlined text-[#4b41e1] text-lg">location_on</span>
              <input
                type="text"
                value={toCity}
                onChange={e => setToCity(e.target.value)}
                className="bg-transparent text-xs font-bold text-[#131b2e] w-full focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-[#757780] uppercase tracking-wider block mb-1">Date of Journey</label>
            <div className="flex items-center gap-2 bg-[#f2f3ff] px-3.5 py-2.5 rounded-2xl">
              <span className="material-symbols-outlined text-[#4b41e1] text-lg">calendar_today</span>
              <input
                type="text"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="bg-transparent text-xs font-bold text-[#131b2e] w-full focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {}}
              className="w-full py-3 rounded-2xl bg-[#4b41e1] text-white font-bold text-xs hover:bg-[#3b30d0] transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">search</span>
              <span>Search Coaches</span>
            </button>
          </div>
        </div>

        {/* Bus Listings */}
        <div className="space-y-6">
          {buses.map(bus => (
            <div key={bus.id} className="bg-white rounded-3xl p-6 border border-[#e2e7ff] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#f2f3ff]">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">{bus.operator}</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase bg-[#e2e7ff] text-[#4b41e1]">
                      {bus.badge}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md">
                      ★ {bus.rating} ({bus.reviews} reviews)
                    </span>
                  </div>
                  <p className="text-xs text-[#5a5c65] font-medium">{bus.type}</p>

                  <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                    <div>
                      <span className="text-base font-black text-[#131b2e]">{bus.departureTime}</span>
                      <div className="text-[11px] text-[#757780]">{bus.departurePoint}</div>
                    </div>
                    <div className="flex flex-col items-center px-4">
                      <span className="text-[10px] text-[#757780] font-semibold">{bus.duration}</span>
                      <div className="w-20 h-0.5 bg-[#c6c6ce]/60 my-1 relative">
                        <span className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-[#4b41e1]"></span>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-bold">Direct Express</span>
                    </div>
                    <div>
                      <span className="text-base font-black text-[#131b2e]">{bus.arrivalTime}</span>
                      <div className="text-[11px] text-[#757780]">{bus.arrivalPoint}</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3">
                  <div className="text-left lg:text-right">
                    <span className="text-xs text-[#757780] line-through mr-1.5">₹{bus.originalPrice}</span>
                    <span className="text-2xl font-black font-['Plus_Jakarta_Sans'] text-[#131b2e]">
                      ₹{bus.price}
                    </span>
                    <div className="text-[11px] text-emerald-600 font-bold">
                      {bus.seatsAvailable} berths remaining
                    </div>
                  </div>

                  <div className="flex gap-2 w-full lg:w-auto">
                    <button
                      onClick={() => setActiveBusId(activeBusId === bus.id ? null : bus.id)}
                      className="px-4 py-2.5 rounded-xl border border-[#c6c6ce] text-xs font-bold text-[#45464d] hover:bg-[#faf8ff] transition-colors cursor-pointer"
                    >
                      {activeBusId === bus.id ? 'Hide Berths' : 'Select Seat / Berth'}
                    </button>
                    <button
                      onClick={() => handleProceedBooking(bus)}
                      className="px-5 py-2.5 rounded-xl bg-[#4b41e1] text-white text-xs font-bold hover:bg-[#3b30d0] transition-colors shadow-sm cursor-pointer"
                    >
                      Instant Book
                    </button>
                  </div>
                </div>
              </div>

              {/* Amenities list */}
              <div className="pt-4 flex flex-wrap items-center gap-2">
                {bus.amenities.map((am, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-[#f8f9ff] text-[#45464d] text-[11px] font-medium border border-[#e2e7ff]">
                    ✓ {am}
                  </span>
                ))}
              </div>

              {/* Interactive Seat Berth Selector */}
              {activeBusId === bus.id && (
                <div className="mt-6 pt-5 border-t border-[#f2f3ff] bg-[#faf8ff] p-5 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xs font-bold text-[#131b2e]">
                      Upper & Lower Sleeper Deck Layout (Air-Conditioned Volvo 9600)
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#5a5c65]">
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-white border border-[#c6c6ce]"></span> Available</span>
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#4b41e1]"></span> Selected</span>
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#d2d9f4]"></span> Booked</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {['U-1 (Single)', 'U-2 (Single)', 'U-3 (Single)', 'U-4 (Window)', 'L-1 (Lower)', 'L-2 (Lower)', 'L-3 (Window)', 'L-4 (Lower)'].map(seat => {
                      const isSelected = selectedSeat === seat;
                      return (
                        <button
                          key={seat}
                          onClick={() => handleSeatClick(seat)}
                          className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#4b41e1] text-white border-[#4b41e1] shadow-md'
                              : 'bg-white text-[#131b2e] border-[#e2e7ff] hover:border-[#4b41e1]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-base">airline_seat_flat</span>
                          <span>{seat}</span>
                          <span className={`text-[10px] ${isSelected ? 'text-[#acedff]' : 'text-[#757780]'}`}>₹{bus.price}</span>
                        </button>
                      );
                    })}
                  </div>

                  {selectedSeat && (
                    <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between text-xs font-semibold">
                      <span>Selected Berth: <strong>{selectedSeat}</strong> • Boarding at {bus.departurePoint}</span>
                      <button
                        onClick={() => handleProceedBooking(bus)}
                        className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 cursor-pointer"
                      >
                        Confirm & Checkout (₹{bus.price})
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
