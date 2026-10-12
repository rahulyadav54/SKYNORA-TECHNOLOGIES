import React, { useState } from 'react';
import { AppView } from '../types';

interface FlightsViewProps {
  onNavigate: (view: AppView) => void;
  onBookFlight: (flightDetails: any) => void;
}

export const FlightsView: React.FC<FlightsViewProps> = ({ onNavigate, onBookFlight }) => {
  const [origin, setOrigin] = useState('BOM - Mumbai Chhatrapati Shivaji');
  const [dest, setDest] = useState('GOI - Goa Dabolim International');
  const [travelDate, setTravelDate] = useState('18 Nov 2025');
  const [tripType, setTripType] = useState<'oneway' | 'round'>('oneway');
  const [cabinClass, setCabinClass] = useState<'economy' | 'business'>('economy');

  const flights = [
    {
      id: 'indigo-6e512',
      airline: 'IndiGo Airlines',
      flightNumber: '6E-512',
      logo: '✈️',
      departureTime: '06:15',
      departureAirport: 'BOM Terminal 2',
      arrivalTime: '07:35',
      arrivalAirport: 'GOI Terminal 1',
      duration: '1h 20m',
      stops: 'Non-stop Direct',
      baggage: '15 kg Check-in + 7 kg Cabin',
      meal: 'Snack box option available',
      price: 3850,
      originalPrice: 4600,
      badge: 'Fastest Direct',
      punctuality: '94% On-time index',
    },
    {
      id: 'airindia-ai681',
      airline: 'Air India (Tata SIA)',
      flightNumber: 'AI-681',
      logo: '🇮🇳',
      departureTime: '10:45',
      departureAirport: 'BOM Terminal 2',
      arrivalTime: '12:05',
      arrivalAirport: 'GOX Manohar International (Mopa)',
      duration: '1h 20m',
      stops: 'Non-stop Direct',
      baggage: '20 kg Check-in + 7 kg Cabin',
      meal: 'Complimentary Hot Meal & Beverage Included',
      price: 4420,
      originalPrice: 5200,
      badge: 'Complimentary Hot Meal',
      punctuality: '91% On-time index',
    },
    {
      id: 'akasa-qp1341',
      airline: 'Akasa Air',
      flightNumber: 'QP-1341',
      logo: '🧡',
      departureTime: '15:20',
      departureAirport: 'BOM Terminal 1',
      arrivalTime: '16:45',
      arrivalAirport: 'GOI Terminal 1',
      duration: '1h 25m',
      stops: 'Non-stop Direct',
      baggage: '15 kg Check-in + 7 kg Cabin',
      meal: 'Café Akasa gourmet menu',
      price: 3299,
      originalPrice: 4100,
      badge: 'Best Value',
      punctuality: '96% On-time index',
    }
  ];

  const handleBook = (flight: any) => {
    onBookFlight({
      title: `${flight.airline} (${flight.flightNumber})`,
      category: 'Flight',
      from: origin,
      to: dest,
      date: travelDate,
      price: flight.price,
    });
  };

  return (
    <div className="pt-24 pb-20 bg-[#faf8ff] min-h-screen text-[#131b2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#45464d] mb-1">
              <button onClick={() => onNavigate('explore')} className="hover:text-[#4b41e1] cursor-pointer">Home</button>
              <span>/</span>
              <span className="font-semibold text-[#131b2e]">Domestic Flight Tickets</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-['Plus_Jakarta_Sans']">
              Interconnected Flights & Air Transfers
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#e2e7ff] text-[#4b41e1] flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">shield</span>
              Free Instant Rescheduling on Skynora Platinum
            </span>
          </div>
        </div>

        {/* Flight Search Controls */}
        <div className="bg-white p-6 rounded-3xl border border-[#e2e7ff] shadow-sm mb-8 space-y-4">
          <div className="flex items-center gap-4 text-xs font-bold text-[#45464d] pb-2 border-b border-[#f2f3ff]">
            <button
              onClick={() => setTripType('oneway')}
              className={`flex items-center gap-1.5 cursor-pointer ${tripType === 'oneway' ? 'text-[#4b41e1]' : ''}`}
            >
              <input type="radio" checked={tripType === 'oneway'} readOnly className="accent-[#4b41e1]" />
              One Way
            </button>
            <button
              onClick={() => setTripType('round')}
              className={`flex items-center gap-1.5 cursor-pointer ${tripType === 'round' ? 'text-[#4b41e1]' : ''}`}
            >
              <input type="radio" checked={tripType === 'round'} readOnly className="accent-[#4b41e1]" />
              Round Trip
            </button>
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={() => setCabinClass('economy')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${cabinClass === 'economy' ? 'bg-[#131b2e] text-white' : 'bg-[#f2f3ff]'}`}
              >
                Economy
              </button>
              <button
                onClick={() => setCabinClass('business')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${cabinClass === 'business' ? 'bg-[#131b2e] text-white' : 'bg-[#f2f3ff]'}`}
              >
                Business Club
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div>
              <label className="text-[11px] font-bold text-[#757780] uppercase tracking-wider block mb-1">From Airport</label>
              <div className="flex items-center gap-2 bg-[#f2f3ff] px-3.5 py-2.5 rounded-2xl">
                <span className="material-symbols-outlined text-[#4b41e1] text-lg">flight_takeoff</span>
                <input
                  type="text"
                  value={origin}
                  onChange={e => setOrigin(e.target.value)}
                  className="bg-transparent text-xs font-bold text-[#131b2e] w-full focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#757780] uppercase tracking-wider block mb-1">To Airport</label>
              <div className="flex items-center gap-2 bg-[#f2f3ff] px-3.5 py-2.5 rounded-2xl">
                <span className="material-symbols-outlined text-[#4b41e1] text-lg">flight_land</span>
                <input
                  type="text"
                  value={dest}
                  onChange={e => setDest(e.target.value)}
                  className="bg-transparent text-xs font-bold text-[#131b2e] w-full focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#757780] uppercase tracking-wider block mb-1">Departure Date</label>
              <div className="flex items-center gap-2 bg-[#f2f3ff] px-3.5 py-2.5 rounded-2xl">
                <span className="material-symbols-outlined text-[#4b41e1] text-lg">event</span>
                <input
                  type="text"
                  value={travelDate}
                  onChange={e => setTravelDate(e.target.value)}
                  className="bg-transparent text-xs font-bold text-[#131b2e] w-full focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-end">
              <button className="w-full py-3 rounded-2xl bg-[#4b41e1] text-white font-bold text-xs hover:bg-[#3b30d0] transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">search</span>
                <span>Find Flights</span>
              </button>
            </div>
          </div>
        </div>

        {/* Flight Cards */}
        <div className="space-y-4">
          {flights.map(flight => (
            <div key={flight.id} className="bg-white rounded-3xl p-6 border border-[#e2e7ff] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#f2f3ff] flex items-center justify-center text-2xl shrink-0">
                    {flight.logo}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-[#131b2e]">{flight.airline}</h3>
                      <span className="text-xs font-mono font-bold text-[#757780] bg-[#f2f3ff] px-2 py-0.5 rounded">
                        {flight.flightNumber}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#e2e7ff] text-[#4b41e1]">
                        {flight.badge}
                      </span>
                    </div>
                    <p className="text-xs text-emerald-600 font-semibold mt-0.5">✓ {flight.punctuality}</p>

                    <div className="flex flex-wrap items-center gap-6 text-xs mt-3">
                      <div>
                        <div className="text-xl font-black text-[#131b2e]">{flight.departureTime}</div>
                        <div className="text-[11px] text-[#757780]">{flight.departureAirport}</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[11px] text-[#757780] font-semibold">{flight.duration}</span>
                        <div className="w-24 h-0.5 bg-[#4b41e1] my-1 relative">
                          <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[10px]">✈️</span>
                        </div>
                        <span className="text-[10px] text-emerald-600 font-bold">{flight.stops}</span>
                      </div>
                      <div>
                        <div className="text-xl font-black text-[#131b2e]">{flight.arrivalTime}</div>
                        <div className="text-[11px] text-[#757780]">{flight.arrivalAirport}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#f2f3ff]">
                  <div className="text-left lg:text-right">
                    <span className="text-xs text-[#757780] line-through mr-1.5">₹{flight.originalPrice}</span>
                    <span className="text-2xl font-black font-['Plus_Jakarta_Sans'] text-[#131b2e]">
                      ₹{flight.price}
                    </span>
                    <div className="text-[11px] text-[#757780]">Per adult including taxes & fees</div>
                  </div>

                  <button
                    onClick={() => handleBook(flight)}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#4b41e1] text-white text-xs font-bold hover:bg-[#3b30d0] transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Instant Reserve</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#f8f9ff] flex flex-wrap items-center gap-4 text-xs text-[#5a5c65]">
                <span>🧳 {flight.baggage}</span>
                <span>•</span>
                <span>🍽️ {flight.meal}</span>
                <span>•</span>
                <span className="text-emerald-700 font-semibold">Zero cancellation fee with Skynora Flex</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
