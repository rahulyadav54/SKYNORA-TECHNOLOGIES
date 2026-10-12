import React, { useState } from 'react';
import { AppView } from '../types';

interface TrainsViewProps {
  onNavigate: (view: AppView) => void;
  onBookTrain: (trainDetails: any) => void;
}

export const TrainsView: React.FC<TrainsViewProps> = ({ onNavigate, onBookTrain }) => {
  const [fromStation, setFromStation] = useState('CSMT - Mumbai Chhatrapati Shivaji Maharaj');
  const [toStation, setToStation] = useState('MAO - Madgaon Junction Goa');
  const [travelDate, setTravelDate] = useState('18 Nov 2025');
  const [selectedClass, setSelectedClass] = useState<'CC' | 'EC' | '2A' | '1A'>('CC');
  const [pnrInput, setPnrInput] = useState('8412904123');
  const [pnrStatusResult, setPnrStatusResult] = useState<any>(null);

  const trains = [
    {
      id: 'vande-bharat-22229',
      trainNumber: '22229',
      name: 'Mumbai CSMT - Madgaon Vande Bharat Express',
      speed: 'Semi High Speed (160 km/h rated)',
      departure: '05:25 AM',
      departureStation: 'CSMT Mumbai',
      arrival: '01:10 PM',
      arrivalStation: 'Madgaon (MAO) Goa',
      duration: '7h 45m',
      runsOn: 'Mon, Tue, Wed, Fri, Sat, Sun',
      classes: [
        { code: 'CC', name: 'AC Chair Car', price: 1815, status: 'AVAILABLE - 42', probability: '100% CNF' },
        { code: 'EC', name: 'Executive Chair Car (180° Rotatable)', price: 3355, status: 'AVAILABLE - 08', probability: '100% CNF' }
      ],
      highlights: ['Scenic Western Ghats Viaduct Vista', 'Catering by Taj SATS', 'Free Onboard Infotainment', 'Automatic Sliding Doors'],
      badge: 'Fastest Rail Transit',
    },
    {
      id: 'tejas-22119',
      trainNumber: '22119',
      name: 'Mumbai CSMT - Karmali Tejas Express',
      speed: 'Superfast Premium',
      departure: '05:50 AM',
      departureStation: 'CSMT Mumbai',
      arrival: '02:00 PM',
      arrivalStation: 'Karmali (KRMI) North Goa',
      duration: '8h 10m',
      runsOn: 'Tue, Thu, Sat',
      classes: [
        { code: 'CC', name: 'AC Chair Car', price: 1540, status: 'RAC 04', probability: '94% Confirmation Chance' },
        { code: 'EC', name: 'Executive Chair Car', price: 2980, status: 'AVAILABLE - 12', probability: '100% CNF' }
      ],
      highlights: ['Smart Bio-Vacuum Toilets', 'Touch Activated Call Buttons', 'LED Personal Screens', 'Direct Konkan Shoreline Route'],
      badge: 'Konkan Scenic Route',
    },
    {
      id: 'mandovi-10103',
      trainNumber: '10103',
      name: 'Mandovi Express (Daytime Coastal Explorer)',
      speed: 'Express',
      departure: '07:10 AM',
      departureStation: 'CSMT Mumbai',
      arrival: '07:00 PM',
      arrivalStation: 'Madgaon (MAO) Goa',
      duration: '11h 50m',
      runsOn: 'All 7 Days',
      classes: [
        { code: '2A', name: '2 Tier AC Sleeper', price: 1720, status: 'WL 08', probability: '82% Confirmation Chance' },
        { code: '1A', name: 'First Class AC Coupé', price: 2890, status: 'AVAILABLE - 02', probability: '100% CNF' }
      ],
      highlights: ['Legendary Konkan Railway Pantry Food (Fish Fry & Upma)', 'Waterfall Passings', 'Panoramic Windows'],
      badge: 'Heritage Classic',
    }
  ];

  const handleTrackPnr = (e: React.FormEvent) => {
    e.preventDefault();
    setPnrStatusResult({
      pnr: pnrInput,
      train: '22229 Vande Bharat Express',
      class: 'CC',
      chartStatus: 'CHART PREPARED',
      bookingStatus: 'B4, Seat 24 (Window)',
      currentStatus: 'CONFIRMED (CNF)',
      date: '18 Nov 2025',
    });
  };

  const handleBook = (train: any, cls: any) => {
    onBookTrain({
      title: `${train.name} (${train.trainNumber})`,
      category: 'Train',
      from: fromStation,
      to: toStation,
      date: travelDate,
      seat: `${cls.name} (${cls.status})`,
      price: cls.price,
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
              <span className="font-semibold text-[#131b2e]">IRCTC Indian Railways</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-['Plus_Jakarta_Sans']">
              Vande Bharat & Coastal Train Express
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">verified</span>
              Official IRCTC Authorized Rail Distribution Partner
            </span>
          </div>
        </div>

        {/* PNR Tracker Drawer / Bar */}
        <div className="bg-[#131a33] text-white p-6 rounded-3xl shadow-lg mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-[#acedff]">train</span>
                <h3 className="font-bold text-base">Instant IRCTC PNR Status & Confirmation Predictor</h3>
              </div>
              <p className="text-xs text-slate-300">
                Check current coach berth, charting status, and AI probability for waitlisted tickets.
              </p>
            </div>

            <form onSubmit={handleTrackPnr} className="flex items-center gap-2 w-full md:w-auto">
              <input
                type="text"
                value={pnrInput}
                onChange={e => setPnrInput(e.target.value)}
                placeholder="Enter 10-digit PNR"
                className="bg-white/10 text-white font-mono font-bold text-xs px-4 py-2.5 rounded-xl border border-white/20 focus:outline-[#acedff] w-full md:w-48 placeholder:text-slate-400"
                maxLength={10}
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#acedff] text-[#131b2e] font-bold text-xs hover:bg-white transition-colors cursor-pointer shrink-0"
              >
                Track PNR
              </button>
            </form>
          </div>

          {pnrStatusResult && (
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs bg-white/5 p-4 rounded-2xl animate-fade-in">
              <div>
                <span className="text-slate-400">PNR: </span>
                <strong className="font-mono text-white mr-3">{pnrStatusResult.pnr}</strong>
                <span className="text-slate-400">Train: </span>
                <strong className="text-white mr-3">{pnrStatusResult.train}</strong>
                <span className="text-slate-400">Berth: </span>
                <strong className="text-emerald-300">{pnrStatusResult.bookingStatus}</strong>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase bg-emerald-500 text-white">
                  {pnrStatusResult.currentStatus}
                </span>
                <span className="text-slate-400">Chart: {pnrStatusResult.chartStatus}</span>
              </div>
            </div>
          )}
        </div>

        {/* Train Schedule Cards */}
        <div className="space-y-6">
          {trains.map(train => (
            <div key={train.id} className="bg-white rounded-3xl p-6 border border-[#e2e7ff] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#f2f3ff]">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-black bg-[#131b2e] text-[#acedff] px-2.5 py-0.5 rounded-lg">
                      #{train.trainNumber}
                    </span>
                    <h3 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">
                      {train.name}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#e2e7ff] text-[#4b41e1]">
                      {train.badge}
                    </span>
                  </div>
                  <p className="text-xs text-[#5a5c65]">{train.speed} • Runs on: {train.runsOn}</p>

                  <div className="flex flex-wrap items-center gap-6 text-xs pt-2">
                    <div>
                      <div className="text-xl font-black text-[#131b2e]">{train.departure}</div>
                      <div className="text-[11px] text-[#757780]">{train.departureStation}</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[11px] text-[#757780] font-semibold">{train.duration}</span>
                      <div className="w-24 h-0.5 bg-[#4b41e1] my-1 relative">
                        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-xs">🚆</span>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-bold">Fastest Corridor</span>
                    </div>
                    <div>
                      <div className="text-xl font-black text-[#131b2e]">{train.arrival}</div>
                      <div className="text-[11px] text-[#757780]">{train.arrivalStation}</div>
                    </div>
                  </div>
                </div>

                <div className="text-left lg:text-right">
                  <span className="text-xs text-[#757780]">Starts from</span>
                  <div className="text-2xl font-black font-['Plus_Jakarta_Sans'] text-[#131b2e]">
                    ₹{train.classes[0].price}
                  </div>
                  <div className="text-[11px] text-emerald-600 font-bold">Zero Tatkal Agent Markups</div>
                </div>
              </div>

              {/* Class Cards Strip */}
              <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {train.classes.map((cls, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#faf8ff] border border-[#e2e7ff] flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-[#131b2e]">{cls.code}</span>
                        <span className="text-xs text-[#5a5c65]">• {cls.name}</span>
                      </div>
                      <div className="text-sm font-black font-['Plus_Jakarta_Sans'] text-[#4b41e1] mt-0.5">
                        ₹{cls.price}
                      </div>
                      <div className="text-[11px] font-bold text-emerald-600 mt-0.5">
                        {cls.status}
                      </div>
                    </div>
                    <button
                      onClick={() => handleBook(train, cls)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#4b41e1] text-white text-xs font-bold hover:bg-[#3b30d0] transition-colors cursor-pointer"
                    >
                      Book Class
                    </button>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <div className="mt-4 pt-3 border-t border-[#f8f9ff] flex flex-wrap items-center gap-2">
                {train.highlights.map((hl, i) => (
                  <span key={i} className="text-[11px] text-[#45464d] bg-[#f2f3ff] px-2.5 py-1 rounded-lg">
                    ✓ {hl}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
