import React from 'react';
import { AppView } from '../types';

interface HeaderProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  savedCount?: number;
  user?: any;
  onSignIn?: () => void;
  onSignOut?: () => void;
  onOpenConcierge?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  savedCount = 1,
  user,
  onSignIn,
  onSignOut,
  onOpenConcierge,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#ffffff]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(11,19,43,0.06)] border-b border-[#e2e7ff]/60">
      <div className="h-20 max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
        {/* Brand & Logo */}
        <div className="flex items-center gap-6 flex-shrink-0">
          <button
            onClick={() => onNavigate('explore')}
            className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
          >
            <div className="h-9 w-9 rounded-lg bg-[#131a33] flex items-center justify-center p-1.5 shadow-sm group-hover:scale-105 transition-transform">
              <svg className="w-full h-full text-[#acedff]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-['Plus_Jakarta_Sans'] text-xl tracking-tight text-[#131b2e] font-extrabold leading-none">
                SKYNORA
              </span>
              <span className="text-[11px] tracking-widest text-[#4b41e1] uppercase font-bold">
                TRAVELS
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1">
            <button
              onClick={() => onNavigate('explore')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all font-semibold cursor-pointer ${
                currentView === 'explore'
                  ? 'bg-[#e2e7ff] text-[#131b2e]'
                  : 'text-[#45464d] hover:text-[#131b2e] hover:bg-[#f2f3ff]'
              }`}
            >
              Explore
            </button>
            <button
              onClick={() => onNavigate('hotels')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all font-semibold cursor-pointer ${
                currentView === 'hotels' || currentView === 'hotel-detail'
                  ? 'bg-[#e2e7ff] text-[#131b2e]'
                  : 'text-[#45464d] hover:text-[#131b2e] hover:bg-[#f2f3ff]'
              }`}
            >
              Hotels
            </button>
            <button
              onClick={() => onNavigate('buses')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all font-semibold cursor-pointer ${
                currentView === 'buses'
                  ? 'bg-[#e2e7ff] text-[#131b2e]'
                  : 'text-[#45464d] hover:text-[#131b2e] hover:bg-[#f2f3ff]'
              }`}
            >
              Buses
            </button>
            <button
              onClick={() => onNavigate('flights')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all font-semibold cursor-pointer ${
                currentView === 'flights'
                  ? 'bg-[#e2e7ff] text-[#131b2e]'
                  : 'text-[#45464d] hover:text-[#131b2e] hover:bg-[#f2f3ff]'
              }`}
            >
              Flights
            </button>
            <button
              onClick={() => onNavigate('trains')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all font-semibold cursor-pointer ${
                currentView === 'trains'
                  ? 'bg-[#e2e7ff] text-[#131b2e]'
                  : 'text-[#45464d] hover:text-[#131b2e] hover:bg-[#f2f3ff]'
              }`}
            >
              Trains
            </button>
            <button
              onClick={() => onNavigate('experiences')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all font-semibold cursor-pointer ${
                currentView === 'experiences'
                  ? 'bg-[#e2e7ff] text-[#131b2e]'
                  : 'text-[#45464d] hover:text-[#131b2e] hover:bg-[#f2f3ff]'
              }`}
            >
              Experiences
            </button>
            <button
              onClick={() => onNavigate('help')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all font-semibold cursor-pointer ${
                currentView === 'help'
                  ? 'bg-[#e2e7ff] text-[#131b2e]'
                  : 'text-[#45464d] hover:text-[#131b2e] hover:bg-[#f2f3ff]'
              }`}
            >
              Help
            </button>
          </nav>
        </div>

        {/* Right Section: AI Concierge, Currency, B2B Portal switch, User Profile */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* AI Concierge Launcher */}
          {onOpenConcierge && (
            <button
              onClick={onOpenConcierge}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all bg-gradient-to-r from-[#4b41e1] to-[#7974fe] text-white hover:opacity-95 shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">smart_toy</span>
              <span className="hidden sm:inline">AI Concierge</span>
            </button>
          )}

          {/* B2B Partner Portal Quick Switch Badge */}
          <button
            onClick={() => onNavigate(currentView === 'partner-portal' ? 'explore' : 'partner-portal')}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all border ${
              currentView === 'partner-portal'
                ? 'bg-[#131a33] text-[#acedff] border-[#131a33] shadow-sm'
                : 'bg-[#eaedff] text-[#4b41e1] hover:bg-[#dae2fd] border-[#c6c6ce]/40'
            }`}
            title="Switch to B2B Partner Central"
          >
            <span className="material-symbols-outlined text-sm">
              {currentView === 'partner-portal' ? 'person' : 'storefront'}
            </span>
            <span>{currentView === 'partner-portal' ? 'Traveler Mode' : 'B2B Partner Central'}</span>
          </button>

          {/* Currency Pill */}
          <div className="hidden sm:flex items-center gap-1 bg-[#f2f3ff] px-2.5 py-1 rounded-full text-[#131b2e] text-xs font-bold border border-[#e2e7ff]">
            <span className="text-[#4b41e1]">₹</span>
            <span>INR</span>
          </div>

          {/* Quick Bookings shortcut */}
          <button
            onClick={() => onNavigate('profile')}
            className={`hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              currentView === 'profile'
                ? 'bg-[#4b41e1] text-white'
                : 'text-[#45464d] hover:bg-[#f2f3ff] hover:text-[#131b2e]'
            }`}
          >
            <span className="material-symbols-outlined text-sm">luggage</span>
            <span>My Bookings</span>
          </button>

          {/* Profile & Google Auth Avatar */}
          <div className="flex items-center gap-2 pl-1">
            {user ? (
              <button
                onClick={() => onNavigate('profile')}
                className="relative p-0.5 rounded-full ring-2 ring-[#4b41e1] hover:ring-offset-2 transition-all cursor-pointer"
                title={`${user.displayName || user.email} (Connected)`}
              >
                <img
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                  src={
                    user.photoURL ||
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuA870SKCuQB5h2mt-l5QN0MX7I1xMHQpxDaHJEA4dbiz-kvnZrvbT0xd9oE8zq1e6Uh6knVRfIyCzjkve6OYw3KDs_g-JFiYKVSYFVOOycxNd5fT13nz7Nhn0SDuU4_SDM7Oct1sU45XgPcJYc5iC5zi1NwPHWuHb4Kpe8EVC4Ld04nzM8MRxTOtZHp9G6oaL8PAVCc0n0mth9fae_aWn6G87CwVPDBXfM5Nx8kJOThtuD0F86pY7FaPQ'
                  }
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white"></span>
              </button>
            ) : (
              <button
                onClick={onSignIn}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#c6c6ce] text-xs font-bold text-[#131b2e] hover:bg-[#f2f3ff] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm text-[#4b41e1]">login</span>
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
