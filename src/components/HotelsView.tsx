import React, { useState, useMemo } from 'react';
import { Property, SearchParams, AppView } from '../types';

interface HotelsViewProps {
  properties: Property[];
  searchParams: SearchParams;
  onSelectProperty: (property: Property) => void;
  onModifySearch: () => void;
  onNavigate: (view: AppView) => void;
  onToggleWishlist: (propertyId: string) => void;
}

export const HotelsView: React.FC<HotelsViewProps> = ({
  properties,
  searchParams,
  onSelectProperty,
  onModifySearch,
  onNavigate,
  onToggleWishlist
}) => {
  // Filter states
  const [minPrice, setMinPrice] = useState(1500);
  const [maxPrice, setMaxPrice] = useState(35000);
  const [selectedRating, setSelectedRating] = useState<number | null>(4.5);
  const [freeCancellationOnly, setFreeCancellationOnly] = useState(true);
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>([
    'Candolim & Sinquerim',
    'Assagao & Anjuna'
  ]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([
    'Luxury Heritage Haveli',
    'Beachfront Resort'
  ]);
  const [sortBy, setSortBy] = useState('Recommended');
  const [showMapView, setShowMapView] = useState(false);
  const [couponCodeCopied, setCouponCodeCopied] = useState(false);

  // Active filter removals
  const removeFilterTag = (tag: string) => {
    if (tag === 'price') {
      setMinPrice(1500);
      setMaxPrice(35000);
    } else if (tag === 'rating') {
      setSelectedRating(null);
    } else if (tag === 'cancellation') {
      setFreeCancellationOnly(false);
    } else if (tag === 'neighborhood') {
      setSelectedNeighborhoods([]);
    }
  };

  const clearAllFilters = () => {
    setMinPrice(1500);
    setMaxPrice(35000);
    setSelectedRating(null);
    setFreeCancellationOnly(false);
    setSelectedNeighborhoods([]);
    setSelectedPropertyTypes([]);
  };

  // Filtered & sorted properties
  const filteredProperties = useMemo(() => {
    let result = [...properties];

    if (minPrice > 1500 || maxPrice < 35000) {
      result = result.filter(
        (p) => p.pricePerNight >= minPrice && p.pricePerNight <= maxPrice
      );
    }

    if (selectedRating !== null) {
      result = result.filter((p) => p.rating >= selectedRating);
    }

    if (freeCancellationOnly) {
      result = result.filter((p) => p.cancellationText.toLowerCase().includes('free'));
    }

    if (selectedNeighborhoods.length > 0) {
      result = result.filter((p) =>
        selectedNeighborhoods.some((n) => p.neighborhood.includes(n.split(' ')[0]))
      );
    }

    if (sortBy === 'Price: Low to High') {
      result.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (sortBy === 'Guest Rating: High to Low') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [properties, minPrice, maxPrice, selectedRating, freeCancellationOnly, selectedNeighborhoods, sortBy]);

  const toggleNeighborhood = (name: string) => {
    setSelectedNeighborhoods((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const togglePropertyType = (name: string) => {
    setSelectedPropertyTypes((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const copyCoupon = () => {
    navigator.clipboard?.writeText('SKYNORA100');
    setCouponCodeCopied(true);
    setTimeout(() => setCouponCodeCopied(false), 2000);
  };

  return (
    <div className="flex flex-col w-full bg-[#faf8ff] pb-16">
      {/* Sticky Query Overview & Mode Switcher Strip */}
      <section className="sticky top-20 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-[#eaedff]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col gap-2.5">
          {/* Search Overview Summary Pill Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div
                onClick={onModifySearch}
                className="flex items-center gap-2 bg-[#f2f3ff] hover:bg-[#eaedff] px-3.5 py-1.5 rounded-xl cursor-pointer transition-colors border border-[#eaedff]"
              >
                <span className="material-symbols-outlined text-[#4b41e1] text-base">location_on</span>
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#76767e] uppercase leading-tight tracking-wider font-semibold">
                    Destination
                  </span>
                  <span className="text-xs text-[#131b2e] font-bold leading-tight">
                    {searchParams.destination}
                  </span>
                </div>
              </div>

              <div
                onClick={onModifySearch}
                className="hidden sm:flex items-center gap-2 bg-[#f2f3ff] hover:bg-[#eaedff] px-3.5 py-1.5 rounded-xl cursor-pointer transition-colors border border-[#eaedff]"
              >
                <span className="material-symbols-outlined text-[#4b41e1] text-base">calendar_month</span>
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#76767e] uppercase leading-tight tracking-wider font-semibold">
                    Dates
                  </span>
                  <span className="text-xs text-[#131b2e] font-semibold leading-tight">
                    {searchParams.checkIn} - {searchParams.checkOut} ({searchParams.nights} Nights)
                  </span>
                </div>
              </div>

              <div
                onClick={onModifySearch}
                className="hidden md:flex items-center gap-2 bg-[#f2f3ff] hover:bg-[#eaedff] px-3.5 py-1.5 rounded-xl cursor-pointer transition-colors border border-[#eaedff]"
              >
                <span className="material-symbols-outlined text-[#4b41e1] text-base">group</span>
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#76767e] uppercase leading-tight tracking-wider font-semibold">
                    Occupancy
                  </span>
                  <span className="text-xs text-[#131b2e] font-semibold leading-tight">
                    {searchParams.guests}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onModifySearch}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-[#e2e7ff] hover:bg-[#dae2fd] text-[#131b2e] rounded-xl text-xs font-bold transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-base">tune</span>
                <span>Modify Search</span>
              </button>
            </div>
          </div>

          {/* Quick Mode Switcher Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#4b41e1] text-white rounded-full text-xs font-semibold shadow-xs flex-shrink-0 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                hotel
              </span>
              <span>Hotels & Stays</span>
            </button>
            <button
              onClick={() => alert('Viewing available flights for this route')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#f2f3ff] hover:bg-[#e2e7ff] text-[#45464d] hover:text-[#131b2e] rounded-full text-xs font-medium transition-colors flex-shrink-0 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-sm">flight</span>
              <span>Flights</span>
            </button>
            <button
              onClick={() => alert('Viewing IRCTC trains for this route')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#f2f3ff] hover:bg-[#e2e7ff] text-[#45464d] hover:text-[#131b2e] rounded-full text-xs font-medium transition-colors flex-shrink-0 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-sm">train</span>
              <span>Trains (IRCTC)</span>
            </button>
            <button
              onClick={() => alert('Viewing intercity buses for this route')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#f2f3ff] hover:bg-[#e2e7ff] text-[#45464d] hover:text-[#131b2e] rounded-full text-xs font-medium transition-colors flex-shrink-0 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-sm">directions_bus</span>
              <span>Buses</span>
            </button>
            <button
              onClick={() => alert('Viewing verified airport cabs for this route')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#f2f3ff] hover:bg-[#e2e7ff] text-[#45464d] hover:text-[#131b2e] rounded-full text-xs font-medium transition-colors flex-shrink-0 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-sm">local_taxi</span>
              <span>Airport Cabs</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Layout Area */}
      <div className="max-w-7xl mx-auto px-6 py-6 w-full">
        {/* Promotional Urgency Strip */}
        <div className="mb-6 w-full bg-[#e2e7ff] rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 relative overflow-hidden border border-[#c6c6ce]/30">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#4b41e1]/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex items-center gap-3 z-10">
            <div className="w-10 h-10 rounded-xl bg-[#4b41e1] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-xl">sell</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded bg-[#acedff] text-[#001f26] text-xs font-bold uppercase tracking-wider">
                  Winter Escape
                </span>
                <span className="text-base font-bold text-[#131b2e]">Flat ₹1,200 Instant Discount</span>
              </div>
              <p className="text-xs text-[#45464d] mt-0.5">
                Use coupon code{' '}
                <button
                  onClick={copyCoupon}
                  className="font-bold text-[#4b41e1] font-mono bg-white px-1.5 py-0.5 rounded shadow-2xs hover:underline cursor-pointer"
                  title="Click to copy"
                >
                  SKYNORA100
                </button>{' '}
                {couponCodeCopied && <span className="text-emerald-600 font-bold ml-1">Copied!</span>} at instant UPI checkout. Limited season inventory.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0 z-10">
            <span className="text-xs text-[#76767e] font-medium">Offer expires in:</span>
            <span className="text-xs font-mono font-bold bg-[#131b2e] text-white px-2.5 py-1 rounded-md shadow-xs">
              03h : 42m
            </span>
          </div>
        </div>

        {/* 2-Column Search Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Filter Sidebar (Col: 3-4 on desktop) */}
          <aside className="lg:col-span-4 xl:col-span-3 flex flex-col gap-4">
            {/* Live Filter Box */}
            <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col gap-4 border border-[#eaedff]">
              <div className="flex items-center justify-between pb-2 border-b border-[#f2f3ff]">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#4b41e1] text-lg">filter_alt</span>
                  <h2 className="text-base font-bold text-[#131b2e]">Filter By</h2>
                </div>
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-[#4b41e1] hover:text-[#645efb] font-semibold transition-colors cursor-pointer"
                  type="button"
                >
                  Clear All
                </button>
              </div>

              {/* Price Range Slider + Histogram */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#131b2e]">Nightly Budget</span>
                  <span className="text-xs text-[#76767e]">Avg: ₹8,400</span>
                </div>

                {/* Inline SVG Histogram Chart */}
                <div className="w-full h-12 pt-2 flex items-end gap-1 px-1">
                  <div className="w-full bg-[#e2e7ff] rounded-t-xs h-[20%]"></div>
                  <div className="w-full bg-[#e2e7ff] rounded-t-xs h-[35%]"></div>
                  <div className="w-full bg-[#c3c0ff] rounded-t-xs h-[55%]"></div>
                  <div className="w-full bg-[#4b41e1] rounded-t-xs h-[90%]"></div>
                  <div className="w-full bg-[#4b41e1] rounded-t-xs h-[100%]"></div>
                  <div className="w-full bg-[#4b41e1] rounded-t-xs h-[75%]"></div>
                  <div className="w-full bg-[#c3c0ff] rounded-t-xs h-[45%]"></div>
                  <div className="w-full bg-[#e2e7ff] rounded-t-xs h-[30%]"></div>
                  <div className="w-full bg-[#e2e7ff] rounded-t-xs h-[15%]"></div>
                  <div className="w-full bg-[#e2e7ff] rounded-t-xs h-[25%]"></div>
                </div>

                {/* Price input labels */}
                <div className="grid grid-cols-2 gap-2 items-center">
                  <div className="bg-[#f2f3ff] rounded-xl p-2 flex flex-col border border-[#eaedff]">
                    <span className="text-[10px] text-[#76767e] leading-none font-semibold">Min</span>
                    <span className="text-xs text-[#131b2e] font-bold mt-0.5">₹{minPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="bg-[#f2f3ff] rounded-xl p-2 flex flex-col border border-[#eaedff]">
                    <span className="text-[10px] text-[#76767e] leading-none font-semibold">Max</span>
                    <span className="text-xs text-[#131b2e] font-bold mt-0.5">₹{maxPrice.toLocaleString('en-IN')}+</span>
                  </div>
                </div>

                {/* Dual Slider Control */}
                <input
                  type="range"
                  min="1500"
                  max="35000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
                  className="w-full accent-[#4b41e1] h-1.5 bg-[#eaedff] rounded-lg cursor-pointer"
                />
              </div>

              {/* Flexibility & Trust */}
              <div className="flex flex-col gap-1 pt-1 border-t border-[#f2f3ff]">
                <span className="text-xs font-bold text-[#131b2e] mb-1">Flexibility & Trust</span>
                <label className="flex items-center gap-2 cursor-pointer group py-0.5 select-none">
                  <input
                    checked={freeCancellationOnly}
                    onChange={(e) => setFreeCancellationOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-[#4b41e1] accent-[#4b41e1] cursor-pointer"
                    type="checkbox"
                  />
                  <span className="text-xs text-[#131b2e] group-hover:text-[#4b41e1] transition-colors">
                    Free Cancellation
                  </span>
                  <span className="ml-auto text-xs text-[#76767e]">94</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group py-0.5 select-none">
                  <input
                    className="w-4 h-4 rounded text-[#4b41e1] accent-[#4b41e1] cursor-pointer"
                    type="checkbox"
                  />
                  <span className="text-xs text-[#131b2e] group-hover:text-[#4b41e1] transition-colors">
                    Zero Advance / Pay at Hotel
                  </span>
                  <span className="ml-auto text-xs text-[#76767e]">48</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group py-0.5 select-none">
                  <input
                    defaultChecked
                    className="w-4 h-4 rounded text-[#4b41e1] accent-[#4b41e1] cursor-pointer"
                    type="checkbox"
                  />
                  <span className="text-xs text-[#131b2e] group-hover:text-[#4b41e1] transition-colors">
                    Instant UPI Confirmation
                  </span>
                  <span className="ml-auto text-xs text-[#76767e]">128</span>
                </label>
              </div>

              {/* Property Types */}
              <div className="flex flex-col gap-1 pt-1 border-t border-[#f2f3ff]">
                <span className="text-xs font-bold text-[#131b2e] mb-1">Property Type</span>
                {[
                  { name: 'Luxury Heritage Haveli', count: 16 },
                  { name: 'Beachfront Resort', count: 42 },
                  { name: 'Boutique Villa & Estate', count: 28 },
                  { name: 'Heritage Homestay', count: 35 },
                  { name: 'Business & Transit Hotel', count: 27 }
                ].map((item) => (
                  <label key={item.name} className="flex items-center gap-2 cursor-pointer group py-0.5 select-none">
                    <input
                      checked={selectedPropertyTypes.includes(item.name)}
                      onChange={() => togglePropertyType(item.name)}
                      className="w-4 h-4 rounded text-[#4b41e1] accent-[#4b41e1] cursor-pointer"
                      type="checkbox"
                    />
                    <span className="text-xs text-[#131b2e] group-hover:text-[#4b41e1] transition-colors">
                      {item.name}
                    </span>
                    <span className="ml-auto text-xs text-[#76767e]">{item.count}</span>
                  </label>
                ))}
              </div>

              {/* Guest Rating Filter */}
              <div className="flex flex-col gap-1 pt-1 border-t border-[#f2f3ff]">
                <span className="text-xs font-bold text-[#131b2e] mb-1">Skynora Verified Rating</span>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => setSelectedRating(4.5)}
                    className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedRating === 4.5
                        ? 'bg-[#4b41e1] text-white shadow-xs'
                        : 'bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff]'
                    }`}
                    type="button"
                  >
                    <span>4.5+</span>
                    <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="text-[10px] font-normal">Superb</span>
                  </button>
                  <button
                    onClick={() => setSelectedRating(4.0)}
                    className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selectedRating === 4.0
                        ? 'bg-[#4b41e1] text-white shadow-xs'
                        : 'bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff]'
                    }`}
                    type="button"
                  >
                    <span>4.0+</span>
                    <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="text-[10px] font-normal">Great</span>
                  </button>
                  <button
                    onClick={() => setSelectedRating(3.5)}
                    className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selectedRating === 3.5
                        ? 'bg-[#4b41e1] text-white shadow-xs'
                        : 'bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff]'
                    }`}
                    type="button"
                  >
                    <span>3.5+</span>
                    <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="text-[10px] font-normal">Good</span>
                  </button>
                  <button
                    onClick={() => setSelectedRating(null)}
                    className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selectedRating === null
                        ? 'bg-[#4b41e1] text-white shadow-xs'
                        : 'bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff]'
                    }`}
                    type="button"
                  >
                    <span>All Ratings</span>
                  </button>
                </div>
              </div>

              {/* Popular Neighborhoods in Goa */}
              <div className="flex flex-col gap-1 pt-1 border-t border-[#f2f3ff]">
                <span className="text-xs font-bold text-[#131b2e] mb-1">Neighborhood & Beach</span>
                {[
                  { name: 'Candolim & Sinquerim', count: 39 },
                  { name: 'Assagao & Anjuna', count: 44 },
                  { name: 'Calangute & Baga', count: 31 },
                  { name: 'Panaji / Latin Quarter', count: 18 },
                  { name: 'Cavelossim & Benaulim (South)', count: 16 }
                ].map((item) => (
                  <label key={item.name} className="flex items-center gap-2 cursor-pointer group py-0.5 select-none">
                    <input
                      checked={selectedNeighborhoods.includes(item.name)}
                      onChange={() => toggleNeighborhood(item.name)}
                      className="w-4 h-4 rounded text-[#4b41e1] accent-[#4b41e1] cursor-pointer"
                      type="checkbox"
                    />
                    <span className="text-xs text-[#131b2e] group-hover:text-[#4b41e1] transition-colors">
                      {item.name}
                    </span>
                    <span className="ml-auto text-xs text-[#76767e]">{item.count}</span>
                  </label>
                ))}
              </div>

              {/* Amenities */}
              <div className="flex flex-col gap-1 pt-1 border-t border-[#f2f3ff]">
                <span className="text-xs font-bold text-[#131b2e] mb-1">Amenities</span>
                {[
                  { name: 'Complimentary Breakfast', count: 87 },
                  { name: 'Infinity Pool', count: 54 },
                  { name: 'Direct Beach Access', count: 32 },
                  { name: 'Free Airport Pick-up', count: 21 },
                  { name: 'Pet Friendly', count: 19 }
                ].map((item) => (
                  <label key={item.name} className="flex items-center gap-2 cursor-pointer group py-0.5 select-none">
                    <input defaultChecked className="w-4 h-4 rounded text-[#4b41e1] accent-[#4b41e1] cursor-pointer" type="checkbox" />
                    <span className="text-xs text-[#131b2e] group-hover:text-[#4b41e1] transition-colors">{item.name}</span>
                    <span className="ml-auto text-xs text-[#76767e]">{item.count}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Skynora Assurance Mini Card */}
            <div className="bg-[#131a33] text-white rounded-2xl p-4 shadow-sm flex flex-col gap-2 border border-white/10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#acedff] text-lg">verified_user</span>
                <span className="text-xs font-bold text-white">Skynora Assurance</span>
              </div>
              <p className="text-xs text-[#7b83a0] leading-relaxed">
                Every property undergoes our 42-point hygiene, safety, and check-in audit before onboarding.
              </p>
              <div className="flex items-center gap-1.5 pt-1 text-[#acedff] text-xs font-semibold">
                <span className="material-symbols-outlined text-sm">support_agent</span>
                <span>24x7 Goa Airport Concierge Desk</span>
              </div>
            </div>
          </aside>

          {/* Main Listing Feed (Col: 8-9 on desktop) */}
          <main className="lg:col-span-8 xl:col-span-9 flex flex-col gap-4">
            {/* Results Header Bar */}
            <div className="bg-white rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-[#eaedff]">
              <div className="flex items-baseline gap-2">
                <span className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#131b2e]">
                  {filteredProperties.length > 0 ? '148 Properties' : '0 Properties'}
                </span>
                <span className="text-xs text-[#76767e]">
                  found in {searchParams.destination.split(',')[0]} for 18-22 Nov
                </span>
              </div>
              <div className="flex items-center gap-2">
                {/* Sort dropdown */}
                <div className="flex items-center gap-1 bg-[#f2f3ff] px-3 py-1.5 rounded-xl border border-[#eaedff]">
                  <span className="material-symbols-outlined text-[#76767e] text-base">sort</span>
                  <span className="text-xs text-[#76767e] font-medium">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent text-xs text-[#131b2e] font-bold focus:outline-none cursor-pointer"
                  >
                    <option>Recommended</option>
                    <option>Price: Low to High</option>
                    <option>Guest Rating: High to Low</option>
                    <option>Proximity to Beach</option>
                  </select>
                </div>

                {/* Map View Toggle Button */}
                <button
                  onClick={() => setShowMapView(!showMapView)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    showMapView
                      ? 'bg-[#4b41e1] text-white shadow-xs'
                      : 'bg-[#e2e7ff] hover:bg-[#dae2fd] text-[#4b41e1]'
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-base">map</span>
                  <span>{showMapView ? 'List View' : 'Map View'}</span>
                </button>
              </div>
            </div>

            {/* Map Drawer View if opened */}
            {showMapView && (
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff] flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#131b2e] flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-[#4b41e1]">explore</span> Goa Stays Interactive Map
                  </span>
                  <button onClick={() => setShowMapView(false)} className="text-xs text-[#4b41e1] font-semibold">
                    Close Map
                  </button>
                </div>
                <div
                  className="w-full h-64 rounded-xl bg-cover bg-center relative overflow-hidden flex items-end p-3 shadow-inner"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDYhk2jhFoQQOv81CW2NuWtwoJHK8jBKI1AvNjWeIdBEpR_UtdPpnj_G_wdtNCtx-jQJFj6_lfbYHnk_dLfsVbQ7kRSLZmYgB4M8psE9CBZ7X-X-jojY0g14i8ssHP9QzlohM6-bYqm3bV4fCd8Nq2E0IqO9Xc2u27h3B2KVSddt5Ioo_kxdhwTrPru280U2AU6SRT2eeM8tQETDESuKFhVqqPrGXMvfAE6qg6QgWTGFjjM_c2VqTL6Tg')`
                  }}
                >
                  <div className="bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg shadow-md text-xs font-bold text-[#131b2e] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4b41e1] animate-ping"></span>
                    <span>Taj Fort Aguada · ₹18,500/nt</span>
                  </div>
                </div>
              </div>
            )}

            {/* Active Filter Indicator Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs text-[#76767e] font-medium">Active filters:</span>
              <span className="inline-flex items-center gap-1 bg-[#e2e7ff] text-[#131b2e] px-3 py-0.5 rounded-full text-xs font-semibold">
                ₹{minPrice.toLocaleString('en-IN')} - ₹{maxPrice.toLocaleString('en-IN')}
                <span
                  onClick={() => removeFilterTag('price')}
                  className="material-symbols-outlined text-xs cursor-pointer hover:text-rose-600"
                >
                  close
                </span>
              </span>
              {selectedRating && (
                <span className="inline-flex items-center gap-1 bg-[#e2e7ff] text-[#131b2e] px-3 py-0.5 rounded-full text-xs font-semibold">
                  {selectedRating}+ Rating
                  <span
                    onClick={() => removeFilterTag('rating')}
                    className="material-symbols-outlined text-xs cursor-pointer hover:text-rose-600"
                  >
                    close
                  </span>
                </span>
              )}
              {freeCancellationOnly && (
                <span className="inline-flex items-center gap-1 bg-[#e2e7ff] text-[#131b2e] px-3 py-0.5 rounded-full text-xs font-semibold">
                  Free Cancellation
                  <span
                    onClick={() => removeFilterTag('cancellation')}
                    className="material-symbols-outlined text-xs cursor-pointer hover:text-rose-600"
                  >
                    close
                  </span>
                </span>
              )}
              {selectedNeighborhoods.length > 0 && (
                <span className="inline-flex items-center gap-1 bg-[#e2e7ff] text-[#131b2e] px-3 py-0.5 rounded-full text-xs font-semibold">
                  {selectedNeighborhoods.map((n) => n.split(' ')[0]).join(' & ')}
                  <span
                    onClick={() => removeFilterTag('neighborhood')}
                    className="material-symbols-outlined text-xs cursor-pointer hover:text-rose-600"
                  >
                    close
                  </span>
                </span>
              )}
            </div>

            {/* Property Cards Feed */}
            <div className="flex flex-col gap-4">
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-2xl shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col md:flex-row group border border-[#eaedff]"
                >
                  {/* Image Section */}
                  <div
                    onClick={() => onSelectProperty(property)}
                    className="md:w-5/12 h-64 md:h-auto relative overflow-hidden flex-shrink-0 cursor-pointer"
                  >
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={property.title}
                      src={property.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent md:hidden"></div>

                    {/* Badge Chips */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider shadow-xs ${
                          property.badgeStyle === 'luxury'
                            ? 'bg-[#4b41e1] text-white'
                            : property.badgeStyle === 'villa'
                            ? 'bg-[#acedff] text-[#001f26]'
                            : property.badgeStyle === 'family'
                            ? 'bg-[#e2dfff] text-[#0f0069]'
                            : 'bg-[#dae2fd] text-[#131b2e]'
                        }`}
                      >
                        {property.categoryBadge}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/90 backdrop-blur-xs text-[#131b2e] text-[11px] font-bold shadow-xs">
                        {property.neighborhood.split('&')[0]}
                      </span>
                    </div>

                    {/* Wishlist Heart Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(property.id);
                      }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs hover:bg-white flex items-center justify-center text-[#131b2e] transition-colors shadow-sm cursor-pointer"
                      type="button"
                    >
                      <span
                        className={`material-symbols-outlined text-lg ${
                          property.isSaved ? 'text-rose-600' : 'text-[#131b2e]'
                        }`}
                        style={{ fontVariationSettings: property.isSaved ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        favorite
                      </span>
                    </button>

                    <div className="absolute bottom-3 left-3 hidden md:flex items-center gap-1 px-2 py-0.5 rounded bg-white/85 backdrop-blur-xs text-[#131b2e] text-xs font-semibold">
                      <span className="material-symbols-outlined text-sm">photo_library</span>
                      <span>{property.photoCount} Photos</span>
                    </div>
                  </div>

                  {/* Card Content Details */}
                  <div className="md:w-7/12 p-5 flex flex-col justify-between gap-3">
                    <div className="flex flex-col gap-1.5">
                      {/* Ratings & Stars Header */}
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: property.stars }).map((_, i) => (
                            <span
                              key={i}
                              className="material-symbols-outlined text-amber-500 text-sm"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              star
                            </span>
                          ))}
                          <span className="text-xs text-[#76767e] font-medium ml-1">{property.category}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-[#e2e7ff] px-2 py-0.5 rounded-lg">
                          <span
                            className="material-symbols-outlined text-[#4b41e1] text-xs"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            star
                          </span>
                          <span className="text-xs font-bold text-[#131b2e]">{property.rating}</span>
                          <span className="text-[11px] text-[#76767e]">({property.reviewCount})</span>
                        </div>
                      </div>

                      {/* Property Title & Location */}
                      <h3
                        onClick={() => onSelectProperty(property)}
                        className="font-['Plus_Jakarta_Sans'] text-base sm:text-lg text-[#131b2e] font-bold hover:text-[#4b41e1] cursor-pointer transition-colors leading-snug"
                      >
                        {property.title}
                      </h3>
                      <p className="text-xs text-[#76767e] flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm text-[#4b41e1]">location_on</span>
                        {property.address}
                      </p>

                      {/* Amenity Highlights Chips */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {property.amenities.map((amenity) => (
                          <span
                            key={amenity}
                            className="px-2 py-0.5 rounded-md bg-[#f2f3ff] text-[#45464d] text-xs font-medium border border-[#eaedff]"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>

                      {/* Policy Badges */}
                      <div className="flex flex-col gap-0.5 pt-1 text-xs">
                        <div className="flex items-center gap-1 font-semibold text-[#4b41e1]">
                          <span className="material-symbols-outlined text-sm">check_circle</span>
                          <span>{property.cancellationText}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[#45464d]">
                          <span className="material-symbols-outlined text-[#76767e] text-sm">restaurant</span>
                          <span>{property.breakfastText}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price & Action Trigger Bar */}
                    <div className="pt-3 bg-[#f2f3ff]/60 -mx-5 -mb-5 p-4 rounded-b-2xl flex items-end justify-between gap-3 border-t border-[#eaedff]">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-[#76767e] line-through">
                            ₹{property.originalPrice.toLocaleString('en-IN')}
                          </span>
                          <span className="px-1.5 py-0.2 rounded bg-rose-100 text-rose-700 text-[10px] font-bold">
                            {property.discountBadge}
                          </span>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="font-['Plus_Jakarta_Sans'] text-2xl font-extrabold text-[#131b2e]">
                            ₹{property.pricePerNight.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-[#76767e]">/ night</span>
                        </div>
                        <span className="text-[11px] text-[#76767e]">
                          + ₹{property.taxFee.toLocaleString('en-IN')} taxes & fees
                        </span>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <button
                          onClick={() => onSelectProperty(property)}
                          className="px-5 py-2.5 bg-[#4b41e1] hover:bg-[#645efb] text-white rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-1 cursor-pointer"
                          type="button"
                        >
                          <span>Reserve Room</span>
                          <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                        <span className="text-[11px] text-[#76767e]">{property.trustTag}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination & Load More */}
            <div className="bg-white rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 mt-2 border border-[#eaedff]">
              <div className="flex items-center gap-1 text-[#76767e] text-xs">
                <span>
                  Showing <strong className="text-[#131b2e]">1 - {filteredProperties.length}</strong> of 148 properties
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  disabled
                  className="w-8 h-8 rounded-lg bg-[#e2e7ff] text-[#131b2e] flex items-center justify-center opacity-50"
                  type="button"
                >
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <button className="w-8 h-8 rounded-lg bg-[#4b41e1] text-white text-xs font-bold flex items-center justify-center">
                  1
                </button>
                <button className="w-8 h-8 rounded-lg bg-[#f2f3ff] hover:bg-[#e2e7ff] text-[#131b2e] text-xs font-semibold flex items-center justify-center transition-colors">
                  2
                </button>
                <button className="w-8 h-8 rounded-lg bg-[#f2f3ff] hover:bg-[#e2e7ff] text-[#131b2e] text-xs font-semibold flex items-center justify-center transition-colors">
                  3
                </button>
                <span className="px-1 text-[#76767e] text-xs font-bold">...</span>
                <button className="w-8 h-8 rounded-lg bg-[#f2f3ff] hover:bg-[#e2e7ff] text-[#131b2e] text-xs font-semibold flex items-center justify-center transition-colors">
                  37
                </button>
                <button className="w-8 h-8 rounded-lg bg-[#e2e7ff] hover:bg-[#dae2fd] text-[#131b2e] flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
              <button
                onClick={() => alert('Loaded 20 more luxury stays in North and South Goa.')}
                className="px-4 py-2 bg-[#e2e7ff] hover:bg-[#dae2fd] text-[#131b2e] rounded-xl text-xs font-bold transition-colors cursor-pointer"
                type="button"
              >
                Load 20 More Stays
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
