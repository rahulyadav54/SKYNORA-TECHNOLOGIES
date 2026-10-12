import React from 'react';
import { AppView } from '../types';

interface FooterProps {
  onNavigate?: (view: AppView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#131a33] text-[#7b83a0] pt-16 pb-8 border-t border-[#3e4660]/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-[#3e4660]/30">
          {/* Brand info */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-white flex items-center justify-center p-1 shadow-sm">
                <svg className="w-full h-full text-[#131a33]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-['Plus_Jakarta_Sans'] text-lg tracking-tight text-white font-bold leading-none">
                  SKYNORA
                </span>
                <span className="text-[10px] tracking-wider text-[#acedff] uppercase font-bold">
                  TRAVELS
                </span>
              </div>
            </div>
            <p className="text-xs text-[#7b83a0] leading-relaxed">
              India's premier unified travel and lifestyle booking ecosystem.
            </p>
            <div className="flex items-center gap-1.5 pt-1">
              <span className="material-symbols-outlined text-[#4cd7f6] text-sm">verified</span>
              <span className="text-xs text-white font-semibold">100% Verified IRCTC & IATA Partner</span>
            </div>
          </div>

          {/* Travel & Transport */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-white">Travel & Transport</h3>
            <ul className="flex flex-col gap-1.5 text-xs">
              <li className="hover:text-white transition-colors">
                <button onClick={() => onNavigate?.('hotels')} className="cursor-pointer text-left">
                  Hotels & Rooms
                </button>
              </li>
              <li className="hover:text-white transition-colors">
                <button onClick={() => onNavigate?.('hotels')} className="cursor-pointer text-left">
                  Bus Tickets
                </button>
              </li>
              <li className="hover:text-white transition-colors">
                <button onClick={() => onNavigate?.('hotels')} className="cursor-pointer text-left">
                  Flight Bookings
                </button>
              </li>
              <li className="hover:text-white transition-colors">
                <button onClick={() => onNavigate?.('hotels')} className="cursor-pointer text-left">
                  IRCTC Train Bookings
                </button>
              </li>
              <li className="hover:text-white transition-colors">
                <button onClick={() => onNavigate?.('hotels')} className="cursor-pointer text-left">
                  Cab & Outstation
                </button>
              </li>
              <li className="hover:text-white transition-colors">
                <button onClick={() => onNavigate?.('hotels')} className="cursor-pointer text-left">
                  Self-Drive Rentals
                </button>
              </li>
            </ul>
          </div>

          {/* Lifestyle & Events */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-white">Lifestyle & Events</h3>
            <ul className="flex flex-col gap-1.5 text-xs">
              <li className="hover:text-white transition-colors">
                <button onClick={() => onNavigate?.('hotels')} className="cursor-pointer text-left">
                  Fine Dining
                </button>
              </li>
              <li className="hover:text-white transition-colors">
                <button onClick={() => onNavigate?.('hotels')} className="cursor-pointer text-left">
                  Salon & Spa Appointments
                </button>
              </li>
              <li className="hover:text-white transition-colors">
                <button onClick={() => onNavigate?.('hotels')} className="cursor-pointer text-left">
                  Live Events
                </button>
              </li>
              <li className="hover:text-white transition-colors">
                <button onClick={() => onNavigate?.('hotels')} className="cursor-pointer text-left">
                  Wedding Venues
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-white">Company</h3>
            <ul className="flex flex-col gap-1.5 text-xs">
              <li className="hover:text-white transition-colors">
                <button onClick={() => onNavigate?.('explore')} className="cursor-pointer text-left">
                  About Skynora
                </button>
              </li>
              <li className="hover:text-white transition-colors">
                <button onClick={() => onNavigate?.('explore')} className="cursor-pointer text-left">
                  Careers
                </button>
              </li>
              <li className="hover:text-white transition-colors">
                <button onClick={() => onNavigate?.('explore')} className="cursor-pointer text-left">
                  Press
                </button>
              </li>
              <li className="hover:text-white transition-colors">
                <button onClick={() => onNavigate?.('partner-portal')} className="cursor-pointer text-left text-[#acedff]">
                  Partner Portal (B2B)
                </button>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-white">Support & Legal</h3>
            <ul className="flex flex-col gap-1.5 text-xs">
              <li className="hover:text-white transition-colors">
                <button onClick={() => onNavigate?.('profile')} className="cursor-pointer text-left">
                  Customer Care
                </button>
              </li>
              <li className="hover:text-white transition-colors">
                <button onClick={() => onNavigate?.('profile')} className="cursor-pointer text-left">
                  Cancellation Policy
                </button>
              </li>
              <li className="hover:text-white transition-colors">
                <button onClick={() => onNavigate?.('profile')} className="cursor-pointer text-left">
                  Terms & Privacy
                </button>
              </li>
              <li className="hover:text-white transition-colors">
                <button onClick={() => onNavigate?.('profile')} className="cursor-pointer text-left">
                  Security & Trust
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Partners & Security */}
        <div className="pt-8 pb-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#7b83a0]">
              Payment Partners:
            </span>
            <div className="flex items-center gap-1.5">
              <span className="px-2.5 py-1 bg-white text-[#131b2e] text-xs font-bold rounded shadow-xs">
                UPI
              </span>
              <span className="px-2.5 py-1 bg-white text-[#131b2e] text-xs font-bold rounded shadow-xs">
                RuPay
              </span>
              <span className="px-2.5 py-1 bg-white text-[#131b2e] text-xs font-bold rounded shadow-xs">
                VISA
              </span>
              <span className="px-2.5 py-1 bg-white text-[#131b2e] text-xs font-bold rounded shadow-xs">
                Mastercard
              </span>
              <span className="px-2.5 py-1 bg-white text-[#131b2e] text-xs font-bold rounded shadow-xs">
                NetBanking
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#acedff]">
            <span className="material-symbols-outlined text-sm">lock</span>
            <span>Instant 256-bit Encrypted Settlement</span>
          </div>
        </div>

        <div className="pt-4 text-center text-xs text-[#7b83a0]">
          © 2025 SKYNORA TRAVELS Technologies Pvt. Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
