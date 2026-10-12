import React, { useState } from 'react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; view: AppView; icon: string }[] = [
    { label: 'Explore', view: 'explore', icon: 'explore' },
    { label: 'Hotels', view: 'hotels', icon: 'hotel' },
    { label: 'Buses', view: 'buses', icon: 'directions_bus' },
    { label: 'Flights', view: 'flights', icon: 'flight' },
    { label: 'Trains', view: 'trains', icon: 'train' },
    { label: 'Cabs', view: 'cabs', icon: 'local_taxi' },
    { label: 'Experiences', view: 'experiences', icon: 'confirmation_number' },
    { label: 'Help', view: 'help', icon: 'support_agent' },
  ];

  const handleNavClick = (view: AppView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#ffffff]/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(11,19,43,0.06)] border-b border-[#e2e7ff]/60">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">
        {/* Brand & Logo */}
        <div className="flex items-center gap-4 lg:gap-6 flex-shrink-0">
          <button
            onClick={() => handleNavClick('explore')}
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
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`px-2.5 py-1.5 rounded-lg text-sm transition-all font-semibold cursor-pointer ${
                  currentView === item.view || (item.view === 'hotels' && currentView === 'hotel-detail')
                    ? 'bg-[#e2e7ff] text-[#131b2e]'
                    : 'text-[#45464d] hover:text-[#131b2e] hover:bg-[#f2f3ff]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Section: AI Concierge, Currency, B2B Portal switch, User Profile */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
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

          {/* Admin Panel Button */}
          <button
            onClick={() => handleNavClick('admin')}
            className={`hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all border ${
              currentView === 'admin'
                ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                : 'bg-purple-500/10 text-purple-600 hover:bg-purple-500/20 border-purple-500/30'
            }`}
            title="Skynora Super Admin Console"
          >
            <span className="material-symbols-outlined text-sm">shield_person</span>
            <span>Admin</span>
          </button>

          {/* B2B Partner Portal Quick Switch Badge */}
          <button
            onClick={() => handleNavClick(currentView === 'partner-portal' ? 'explore' : 'partner-portal')}
            className={`hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all border ${
              currentView === 'partner-portal'
                ? 'bg-[#131a33] text-[#acedff] border-[#131a33] shadow-sm'
                : 'bg-[#eaedff] text-[#4b41e1] hover:bg-[#dae2fd] border-[#c6c6ce]/40'
            }`}
            title="Switch to B2B Partner Central"
          >
            <span className="material-symbols-outlined text-sm">
              {currentView === 'partner-portal' ? 'person' : 'storefront'}
            </span>
            <span>{currentView === 'partner-portal' ? 'Traveler Mode' : 'B2B Partner'}</span>
          </button>

          {/* Login Portal Button */}
          <button
            onClick={() => handleNavClick('login-portal')}
            className={`hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
              currentView === 'login-portal'
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'border-[#c6c6ce] text-[#131b2e] hover:bg-[#f2f3ff]'
            }`}
            title="Unified Login Portal (Hotel, Flight, Admin, etc.)"
          >
            <span className="material-symbols-outlined text-sm text-[#4b41e1]">key</span>
            <span>Logins</span>
          </button>

          {/* Currency Pill */}
          <div className="hidden md:flex items-center gap-1 bg-[#f2f3ff] px-2.5 py-1 rounded-full text-[#131b2e] text-xs font-bold border border-[#e2e7ff]">
            <span className="text-[#4b41e1]">₹</span>
            <span>INR</span>
          </div>

          {/* Quick Bookings shortcut */}
          <button
            onClick={() => handleNavClick('profile')}
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
                onClick={() => handleNavClick('profile')}
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

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-[#131b2e] hover:bg-[#f2f3ff] transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-[#e2e7ff] px-6 py-4 space-y-3 shadow-xl animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                  currentView === item.view || (item.view === 'hotels' && currentView === 'hotel-detail')
                    ? 'bg-[#4b41e1] text-white shadow-xs'
                    : 'bg-[#f2f3ff] text-[#131b2e] hover:bg-[#e2e7ff]'
                }`}
              >
                <span className="material-symbols-outlined text-base">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-[#f2f3ff] flex items-center justify-between gap-2">
            <button
              onClick={() => handleNavClick('profile')}
              className="flex-1 py-2 px-3 rounded-xl bg-[#e2e7ff] text-[#131b2e] text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">luggage</span>
              <span>My Trips & Wallet</span>
            </button>
            <button
              onClick={() => handleNavClick('partner-portal')}
              className="flex-1 py-2 px-3 rounded-xl bg-[#131a33] text-[#acedff] text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">storefront</span>
              <span>B2B Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
