import React, { useState } from 'react';
import { AppView } from '../types';

interface CabsViewProps {
  onNavigate: (view: AppView) => void;
  onBookCab: (cabDetails: any) => void;
}

export const CabsView: React.FC<CabsViewProps> = ({ onNavigate, onBookCab }) => {
  const [cabTab, setCabTab] = useState<'airport' | 'outstation' | 'hourly'>('airport');
  const [pickup, setPickup] = useState('Goa Dabolim Airport (GOI) Terminal 1');
  const [dropoff, setDropoff] = useState('Candolim & Sinquerim Beach, North Goa');
  const [date, setDate] = useState('18 Nov 2025');
  const [time, setTime] = useState('14:30');
  const [flightNumber, setFlightNumber] = useState('6E-512');
  const [selectedCabId, setSelectedCabId] = useState<string>('crysta-suv');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['flight-track']);

  const cabFleet = [
    {
      id: 'sedan-prime',
      name: 'Prime Sedan',
      models: 'Maruti Suzuki Dzire • Toyota Etios',
      categoryBadge: 'Best for 1-4 Pax',
      badgeColor: 'bg-[#e2e7ff] text-[#4b41e1]',
      capacity: '4 Guests • 2 Large Bags',
      price: 1200,
      originalPrice: 1650,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4EBEdRhlH_BdOaPnOpgcuAuFsa7-78nmZgK7QYVNSJLWWgPtYcTDEDQNyQWKqMIFirLBiDbAjNfbd2g62N2HNp753SgothG7a1CWlshmc9aQAKF2M6n8JbrxpsnXCi7nblPTchNQM9dM6HOdzA_lWOiguc7AIdhwliznvhoUwgiGiuV3Mf2Qkk9mHlAI8ggjyEHJM7IGkzFMHUjK0mfKBNC5873XlXGfdRxUEuM3RebJIRftNd_S1Dg',
      rating: 4.85,
      tripsDone: '18,400+ airport transfers',
      features: ['Chilled Air Conditioning', 'Airport Parking & Tolls Included', 'Verified Commercial Driver', 'Zero Cancellation Guarantee'],
    },
    {
      id: 'crysta-suv',
      name: 'Toyota Innova Crysta (Luxury SUV)',
      models: 'Innova Crysta 2.4 VX • Ergonomic Captain Chairs',
      categoryBadge: 'Most Popular for Families',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      capacity: '6 Guests • 4 Large Bags',
      price: 2400,
      originalPrice: 3100,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDD2ZBDjccq5A9qlnda6KEIgUecFryFoEUD86k6YTJmaYcYxMIVTniqR6zsF3Sh_IhsW8SqqidcyGJxVBh51u85vih4tX52SYFsuCaDLkmuTNlULN8OFqi9P-OXa1c2G4xxc-iiqLqapOl35FsYQpYxXFtVm5e-SzElTgb9DQmeWZTe_87mEFM4b8tPkIAWubBIqhG4nCm5rSipY4S43-7DfP4YEjseVUtxrwtYibXAIKA69pA2Dh0lJg',
      rating: 4.94,
      tripsDone: '24,900+ trips',
      features: ['Plush Leather Reclining Seats', 'Luggage Carrier', 'Complementary Cold Water & Tissues', 'Rear AC Vents'],
    },
    {
      id: 'mercedes-vip',
      name: 'Executive Mercedes-Benz E-Class',
      models: 'Mercedes E220d • Suited Uniformed Chauffeur',
      categoryBadge: 'VIP Signature Service',
      badgeColor: 'bg-[#131a33] text-[#acedff]',
      capacity: '3-4 Guests • 3 Bags',
      price: 6500,
      originalPrice: 8500,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9HBW5nAockwDszAAv_eMduh-HNHRm57hc3zLNxAjkIZxK5eeT-dErpOkZbQiDd4TP1twyEKnB75JU_TgtStYWh1m9XSjFlzDQsLmRi0vqNWVLkLl6SZ_JmAA-oghvP4zLa0wm0qTNkOEiLYqGPpL9uBeBHymRz_u0H5JbTuVxO2lMrjMNrXHIwcCYFckk2LBgcKex8lJZzAFy-Pv3Y1RJvHh4cnJzWKiE0iRetWULCZHr6UA4UaAtaA',
      rating: 4.99,
      tripsDone: '1,200+ VIP escorts',
      features: ['Name Placard at Arrivals Gate', 'High-Speed Wi-Fi Onboard', 'Sanitized Luxury Interior', 'Express Airport Gate Access'],
    },
    {
      id: 'urbania-van',
      name: 'Force Urbania Luxury Van',
      models: 'Force Urbania 12-Seater Executive Coach',
      categoryBadge: 'Group & Wedding Transit',
      badgeColor: 'bg-purple-100 text-purple-800',
      capacity: '12-14 Guests • 10 Bags',
      price: 5800,
      originalPrice: 7200,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfDQRbvmeaGng9YgN0DvPZ_UqQtCGZPi0oiBqA1R8-5kxMWgxChaC54sP0DWlXB5tUoExXRODnRp6DS4wx6P8hjnCpTua3USxux6GvtPrsTPDmUBS0I-FDZYS9h1X3hCd-QTOdyYHM7IOeg-rNwvhWnNwbQNcTrrz4uyacVvL27SS8IQngtm048JQPaW3crqSeTh0VG-ADjY2TjdGstP4VxIeROdgyeXEIF-lNpCTgVDU9pg7ygI3_bg',
      rating: 4.88,
      tripsDone: '3,800+ group rides',
      features: ['Individual High-Back Recliners', 'Dedicated Panoramic AC', 'Massive Boot Space', 'Microphone System'],
    }
  ];

  const toggleAddon = (addon: string) => {
    setSelectedAddons(prev =>
      prev.includes(addon) ? prev.filter(a => a !== addon) : [...prev, addon]
    );
  };

  const handleBookSelected = (cab: typeof cabFleet[0]) => {
    onBookCab({
      title: `${cab.name} (${cab.models.split('•')[0].trim()})`,
      category: 'Cab',
      from: pickup,
      to: dropoff,
      date: `${date} at ${time}`,
      price: cab.price,
      flightNumber: flightNumber || 'Unspecified',
    });
  };

  return (
    <div className="pt-24 pb-20 bg-[#faf8ff] min-h-screen text-[#131b2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb & Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#45464d] mb-1">
              <button onClick={() => onNavigate('explore')} className="hover:text-[#4b41e1] cursor-pointer">
                Home
              </button>
              <span>/</span>
              <span className="font-semibold text-[#131b2e]">Chauffeured Cabs & Airport Transfers</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-['Plus_Jakarta_Sans']">
              Sanitized Airport Cabs & Private Rentals
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#e2e7ff] text-[#4b41e1] flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">verified</span>
              Zero Surge & Free Flight Delay Waiting
            </span>
          </div>
        </div>

        {/* Interactive Search Console */}
        <div className="bg-white p-6 rounded-3xl border border-[#e2e7ff] shadow-sm mb-8 space-y-4">
          {/* Tab Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setCabTab('airport')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                cabTab === 'airport'
                  ? 'bg-[#4b41e1] text-white shadow-xs'
                  : 'bg-[#f2f3ff] text-[#131b2e] hover:bg-[#e2e7ff]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">flight_land</span>
              <span>Airport Pickup & Drop</span>
            </button>
            <button
              onClick={() => setCabTab('outstation')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                cabTab === 'outstation'
                  ? 'bg-[#4b41e1] text-white shadow-xs'
                  : 'bg-[#f2f3ff] text-[#131b2e] hover:bg-[#e2e7ff]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">directions_car</span>
              <span>Intercity / Outstation</span>
            </button>
            <button
              onClick={() => setCabTab('hourly')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                cabTab === 'hourly'
                  ? 'bg-[#4b41e1] text-white shadow-xs'
                  : 'bg-[#f2f3ff] text-[#131b2e] hover:bg-[#e2e7ff]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">schedule</span>
              <span>Hourly Rental (4h/8h/12h)</span>
            </button>
          </div>

          {/* Form Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-[#f2f3ff] p-3 rounded-2xl border border-[#eaedff]">
              <label className="block text-[11px] font-bold text-[#45464d] uppercase mb-1">
                Pickup Location
              </label>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4b41e1] text-base">my_location</span>
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="bg-transparent text-xs font-bold text-[#131b2e] focus:outline-none w-full"
                  placeholder="Enter airport or hotel name"
                />
              </div>
            </div>

            <div className="bg-[#f2f3ff] p-3 rounded-2xl border border-[#eaedff]">
              <label className="block text-[11px] font-bold text-[#45464d] uppercase mb-1">
                Drop Destination
              </label>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4b41e1] text-base">location_on</span>
                <input
                  type="text"
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  className="bg-transparent text-xs font-bold text-[#131b2e] focus:outline-none w-full"
                  placeholder="Enter drop location"
                />
              </div>
            </div>

            <div className="bg-[#f2f3ff] p-3 rounded-2xl border border-[#eaedff]">
              <label className="block text-[11px] font-bold text-[#45464d] uppercase mb-1">
                Date & Pickup Time
              </label>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4b41e1] text-base">calendar_today</span>
                <input
                  type="text"
                  value={`${date} • ${time}`}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-transparent text-xs font-bold text-[#131b2e] focus:outline-none w-full"
                />
              </div>
            </div>

            <div className="bg-[#f2f3ff] p-3 rounded-2xl border border-[#eaedff]">
              <label className="block text-[11px] font-bold text-[#45464d] uppercase mb-1">
                Flight No. (Delay Track)
              </label>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4b41e1] text-base">flight</span>
                <input
                  type="text"
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value)}
                  className="bg-transparent text-xs font-bold text-[#131b2e] focus:outline-none w-full uppercase"
                  placeholder="e.g. 6E-512"
                />
              </div>
            </div>
          </div>

          {/* Quick Route Shortcuts */}
          <div className="flex items-center gap-2 flex-wrap text-xs pt-1">
            <span className="text-[#76767e] font-semibold">Quick Airport Routes:</span>
            <button
              onClick={() => {
                setPickup('Goa Dabolim (GOI) Airport');
                setDropoff('Candolim / Sinquerim Beach');
              }}
              className="px-2.5 py-1 rounded-full bg-[#f2f3ff] hover:bg-[#e2e7ff] text-[#131b2e] font-medium transition-colors cursor-pointer"
            >
              GOI ➔ Candolim (38 km)
            </button>
            <button
              onClick={() => {
                setPickup('Manohar International (MOPA/GOX) Airport');
                setDropoff('Anjuna & Vagator');
              }}
              className="px-2.5 py-1 rounded-full bg-[#f2f3ff] hover:bg-[#e2e7ff] text-[#131b2e] font-medium transition-colors cursor-pointer"
            >
              MOPA ➔ Anjuna (32 km)
            </button>
            <button
              onClick={() => {
                setPickup('Goa Dabolim (GOI) Airport');
                setDropoff('Cavelossim (South Goa)');
              }}
              className="px-2.5 py-1 rounded-full bg-[#f2f3ff] hover:bg-[#e2e7ff] text-[#131b2e] font-medium transition-colors cursor-pointer"
            >
              GOI ➔ South Goa (42 km)
            </button>
          </div>
        </div>

        {/* Fleet Listings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#131b2e] font-['Plus_Jakarta_Sans']">
              Available Fleet for {pickup.split('(')[0].trim()}
            </h2>
            <span className="text-xs text-[#76767e]">All prices inclusive of toll, GST, and parking</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cabFleet.map((cab) => {
              const isSelected = selectedCabId === cab.id;
              return (
                <div
                  key={cab.id}
                  onClick={() => setSelectedCabId(cab.id)}
                  className={`bg-white rounded-3xl p-5 border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#4b41e1] ring-2 ring-[#4b41e1]/20 shadow-md'
                      : 'border-[#eaedff] hover:border-[#c3c0ff] shadow-xs'
                  }`}
                >
                  <div>
                    {/* Top Header */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${cab.badgeColor}`}>
                            {cab.categoryBadge}
                          </span>
                          <span className="text-xs font-semibold text-[#76767e]">★ {cab.rating}</span>
                        </div>
                        <h3 className="font-['Plus_Jakarta_Sans'] text-base font-extrabold text-[#131b2e]">
                          {cab.name}
                        </h3>
                        <p className="text-xs text-[#5a5c65] mt-0.5">{cab.models}</p>
                      </div>

                      <div className="text-right">
                        <div className="text-xs text-[#76767e] line-through">
                          ₹{cab.originalPrice.toLocaleString('en-IN')}
                        </div>
                        <div className="text-xl font-black text-[#131b2e] font-['Plus_Jakarta_Sans']">
                          ₹{cab.price.toLocaleString('en-IN')}
                        </div>
                        <span className="text-[10px] text-emerald-600 font-bold block">Tolls Included</span>
                      </div>
                    </div>

                    {/* Capacity & Highlights */}
                    <div className="bg-[#f8f9ff] p-3 rounded-2xl mb-4 border border-[#eaedff]">
                      <div className="flex items-center gap-3 text-xs font-semibold text-[#131b2e] mb-2">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm text-[#4b41e1]">group</span>
                          {cab.capacity}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-[11px] text-[#45464d]">
                        {cab.features.map((feat) => (
                          <div key={feat} className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs text-emerald-600">check_circle</span>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Booking Action */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#f2f3ff]">
                    <span className="text-xs text-[#76767e]">{cab.tripsDone}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookSelected(cab);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-[#4b41e1] hover:bg-[#645efb] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Reserve Ride</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skynora Airport Guarantee Strip */}
        <div className="mt-8 bg-[#131a33] text-white p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#acedff]/10 text-[#acedff] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">security</span>
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">100% On-Time Chauffeur Arrival Guarantee</h4>
              <p className="text-xs text-[#7b83a0] mt-0.5">
                If driver is late by &gt; 10 minutes at the arrivals gate, we refund ₹500 immediately to your UPI.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-white/10 text-xs font-bold text-[#acedff]">
              Driver Phone & Live Tracking dispatched 2 hrs before pickup
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
