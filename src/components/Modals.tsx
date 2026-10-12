import React, { useState } from 'react';
import { SearchParams, SearchTab } from '../types';

interface ModifySearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchParams: SearchParams;
  onSave: (params: SearchParams) => void;
}

export const ModifySearchModal: React.FC<ModifySearchModalProps> = ({
  isOpen,
  onClose,
  searchParams,
  onSave
}) => {
  const [destination, setDestination] = useState(searchParams.destination);
  const [checkIn, setCheckIn] = useState(searchParams.checkIn);
  const [checkOut, setCheckOut] = useState(searchParams.checkOut);
  const [guests, setGuests] = useState(searchParams.guests);
  const [category, setCategory] = useState<SearchTab>(searchParams.category);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-[#eaedff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4b41e1]">tune</span>
            <h3 className="text-lg font-bold text-[#131b2e]">Modify Your Search</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] flex items-center justify-center text-[#45464d]"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-4 py-4">
          <div>
            <label className="text-xs font-semibold text-[#45464d] block mb-1">Travel Vertical</label>
            <div className="grid grid-cols-3 gap-2">
              {(['hotels', 'buses', 'flights', 'trains', 'cabs', 'events'] as SearchTab[]).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setCategory(tab)}
                  className={`py-2 px-3 rounded-lg text-xs font-bold capitalize transition-colors flex items-center justify-center gap-1.5 ${
                    category === tab
                      ? 'bg-[#4b41e1] text-white shadow-xs'
                      : 'bg-[#f2f3ff] text-[#45464d] hover:bg-[#eaedff]'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">
                    {tab === 'hotels' ? 'hotel' : tab === 'buses' ? 'directions_bus' : tab === 'flights' ? 'flight' : tab === 'trains' ? 'train' : tab === 'cabs' ? 'local_taxi' : 'confirmation_number'}
                  </span>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#45464d] block mb-1">Destination / City</label>
            <div className="flex items-center gap-2 bg-[#f2f3ff] px-3 py-2.5 rounded-xl border border-[#eaedff]">
              <span className="material-symbols-outlined text-[#4b41e1] text-lg">pin_drop</span>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-transparent font-semibold text-sm text-[#131b2e] focus:outline-none"
                placeholder="e.g. Goa, India or Udaipur, Rajasthan"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#45464d] block mb-1">Check-in Date</label>
              <input
                type="text"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-[#f2f3ff] px-3 py-2 rounded-xl text-sm font-semibold border border-[#eaedff] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#45464d] block mb-1">Check-out Date</label>
              <input
                type="text"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-[#f2f3ff] px-3 py-2 rounded-xl text-sm font-semibold border border-[#eaedff] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#45464d] block mb-1">Guests & Rooms</label>
            <input
              type="text"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full bg-[#f2f3ff] px-3 py-2 rounded-xl text-sm font-semibold border border-[#eaedff] focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#eaedff]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-[#45464d] hover:bg-[#f2f3ff]"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave({
                destination,
                checkIn,
                checkOut,
                nights: 4,
                guests,
                category
              });
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-[#4b41e1] text-white font-bold text-sm hover:bg-[#645efb] transition-colors shadow-md"
          >
            Update Search
          </button>
        </div>
      </div>
    </div>
  );
};

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: { title: string; subtitle: string; url: string }[];
}

export const GalleryModal: React.FC<GalleryModalProps> = ({ isOpen, onClose, photos }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="bg-[#131a33] text-white rounded-2xl max-w-4xl w-full p-6 shadow-2xl relative flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">{photos[activeIdx]?.title || 'Resort Photo Gallery'}</h3>
            <p className="text-xs text-[#acedff]">{photos[activeIdx]?.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Featured Image */}
        <div className="relative h-96 w-full rounded-xl overflow-hidden bg-black flex items-center justify-center">
          <img
            src={photos[activeIdx]?.url}
            alt={photos[activeIdx]?.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => setActiveIdx((prev) => (prev > 0 ? prev - 1 : photos.length - 1))}
            className="absolute left-3 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button
            onClick={() => setActiveIdx((prev) => (prev < photos.length - 1 ? prev + 1 : 0))}
            className="absolute right-3 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>

        {/* Thumbnails */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {photos.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`relative h-16 w-24 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                activeIdx === idx ? 'border-[#4cd7f6] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

interface DriverTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  driver: {
    name: string;
    phone: string;
    carModel: string;
    licensePlate: string;
    pickupLocation: string;
    dropLocation: string;
    estimatedDrive: string;
  };
}

export const DriverTrackingModal: React.FC<DriverTrackingModalProps> = ({
  isOpen,
  onClose,
  driver
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4b41e1]">near_me</span>
            <div>
              <h3 className="font-bold text-[#131b2e] leading-tight">Live Airport Chauffeur Tracking</h3>
              <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> GPS Signal Active (Updated 3s ago)
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] flex items-center justify-center text-[#45464d]"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {/* Visual Map Route Mock */}
        <div className="relative h-48 bg-[#eaedff] rounded-xl overflow-hidden my-4 border border-[#c6c6ce]/40 flex flex-col justify-between p-3">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#4b41e1_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <div className="bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-lg shadow-sm text-xs font-semibold z-10 w-fit flex items-center gap-1.5 text-[#131b2e]">
            <span className="material-symbols-outlined text-[#4b41e1] text-sm">flight</span>
            <span>Dabolim Airport Terminal 1</span>
          </div>

          <div className="flex items-center justify-center z-10">
            <div className="bg-[#4b41e1] text-white px-3 py-1 rounded-full shadow-lg flex items-center gap-2 text-xs font-bold animate-pulse">
              <span className="material-symbols-outlined text-sm">local_taxi</span>
              <span>En Route · 12 min to Airport</span>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-lg shadow-sm text-xs font-semibold z-10 w-fit ml-auto flex items-center gap-1.5 text-[#131b2e]">
            <span className="material-symbols-outlined text-[#4b41e1] text-sm">hotel</span>
            <span>Taj Fort Aguada, Candolim</span>
          </div>
        </div>

        {/* Driver Details card */}
        <div className="bg-[#f2f3ff] p-4 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#4b41e1] text-white flex items-center justify-center font-bold text-base">
              SN
            </div>
            <div>
              <h4 className="font-bold text-[#131b2e]">{driver.name}</h4>
              <p className="text-xs text-[#45464d]">{driver.carModel} • <span className="font-mono font-bold">{driver.licensePlate}</span></p>
              <div className="flex items-center gap-1 text-[11px] text-amber-600 font-bold mt-0.5">
                ★ 4.96 (1,120 airport trips completed)
              </div>
            </div>
          </div>
          <a
            href={`tel:${driver.phone}`}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">call</span> Call
          </a>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#131a33] text-white rounded-xl text-xs font-bold hover:bg-[#283044]"
          >
            Close Tracker
          </button>
        </div>
      </div>
    </div>
  );
};
