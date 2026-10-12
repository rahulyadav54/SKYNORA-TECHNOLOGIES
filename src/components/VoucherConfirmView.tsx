import React, { useState } from 'react';
import { BookingState, AppView } from '../types';
import { CANDOLIM_EXPERIENCES } from '../data/mockData';
import { DriverTrackingModal } from './Modals';

interface VoucherConfirmViewProps {
  bookingState: BookingState;
  onNavigate: (view: AppView) => void;
}

export const VoucherConfirmView: React.FC<VoucherConfirmViewProps> = ({
  bookingState,
  onNavigate
}) => {
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [whatsAppSent, setWhatsAppSent] = useState(false);
  const [walletAdded, setWalletAdded] = useState(false);
  const [addedExperiences, setAddedExperiences] = useState<string[]>([]);

  const [downloadNotice, setDownloadNotice] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadNotice(true);
      setTimeout(() => setDownloadNotice(false), 4000);
    }, 1200);
  };

  const handleWhatsApp = () => {
    setWhatsAppSent(true);
    setTimeout(() => setWhatsAppSent(false), 3000);
  };

  const handleWallet = () => {
    setWalletAdded(true);
    setTimeout(() => setWalletAdded(false), 3000);
  };

  const toggleExperience = (id: string) => {
    setAddedExperiences((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col w-full bg-[#faf8ff] pb-16">
      {/* Driver Tracking Modal */}
      <DriverTrackingModal
        isOpen={isDriverModalOpen}
        onClose={() => setIsDriverModalOpen(false)}
        driver={bookingState.assignedDriver}
      />

      {/* Decorative ambient background glows */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-24 right-1/4 w-96 h-96 bg-[#e2dfff] opacity-60 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-96 left-10 w-80 h-80 bg-[#acedff] opacity-40 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="max-w-6xl mx-auto px-6 pt-6">
          {/* Breadcrumb and Live Status Indicator */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-1.5 text-xs text-[#45464d]">
              <button onClick={() => onNavigate('profile')} className="hover:text-[#4b41e1] transition-colors cursor-pointer">
                Bookings
              </button>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-[#131b2e] font-semibold">Resort & Transfer Voucher</span>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-[#4b41e1] font-mono font-bold">{bookingState.referenceId}</span>
            </div>

            <div className="inline-flex items-center gap-2 bg-[#e2e7ff] px-3.5 py-1 rounded-full border border-[#c3c0ff]">
              <span className="w-2 h-2 rounded-full bg-[#4b41e1] animate-pulse"></span>
              <span className="text-xs text-[#131b2e] font-bold tracking-wide">LIVE PNR STATUS: ISSUED</span>
            </div>
          </div>

          {/* Section 1: Success Celebration Banner */}
          <section className="bg-white rounded-2xl p-6 shadow-xs mb-6 border border-[#eaedff]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#e2e7ff] flex items-center justify-center text-[#4b41e1] shrink-0 shadow-xs">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h1 className="font-['Plus_Jakarta_Sans'] text-xl sm:text-2xl text-[#131b2e] font-extrabold tracking-tight">
                      Booking Confirmed & Guaranteed!
                    </h1>
                    <span className="inline-flex items-center gap-1 bg-[#f2f3ff] text-[#4b41e1] text-xs px-2.5 py-0.5 rounded-full font-bold">
                      <span className="material-symbols-outlined text-xs">verified</span> Instant Settlement
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#45464d]">
                    Confirmation SMS dispatched to{' '}
                    <span className="font-bold text-[#131b2e]">{bookingState.primaryGuest.phone}</span> & e-voucher
                    delivered to <span className="font-bold text-[#131b2e]">{bookingState.primaryGuest.email}</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-center bg-[#f2f3ff] md:bg-transparent p-3 md:p-0 rounded-xl gap-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[#45464d]">Reference ID:</span>
                  <span className="font-mono font-bold text-[#131b2e]">{bookingState.referenceId}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[#45464d]">Hotel PNR:</span>
                  <span className="font-mono font-bold text-[#4b41e1] bg-[#e2e7ff] px-2 py-0.5 rounded">
                    {bookingState.hotelPnr}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Toolbar */}
            <div className="mt-5 pt-4 bg-[#f2f3ff] rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 border border-[#eaedff]">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="inline-flex items-center gap-2 bg-[#131b2e] text-white hover:bg-[#283044] transition-all px-4 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">
                    {downloading ? 'autorenew' : 'download'}
                  </span>
                  <span>{downloading ? 'Generating PDF...' : 'Download PDF Ticket / Tax Invoice'}</span>
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="inline-flex items-center gap-1.5 bg-white text-[#131b2e] hover:bg-[#faf8ff] transition-colors px-4 py-2 rounded-xl text-xs font-bold shadow-2xs border border-[#eaedff] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base text-[#4b41e1]">
                    {whatsAppSent ? 'mark_chat_read' : 'chat'}
                  </span>
                  <span>{whatsAppSent ? 'Sent to WhatsApp!' : 'Send to WhatsApp'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleWallet}
                  className="inline-flex items-center gap-1.5 bg-white text-[#131b2e] hover:bg-[#faf8ff] transition-colors px-3 py-2 rounded-xl text-xs font-bold shadow-2xs border border-[#eaedff] cursor-pointer"
                  title="Add to Apple / Google Wallet"
                >
                  <span className="material-symbols-outlined text-base">account_balance_wallet</span>
                  <span className="hidden sm:inline">{walletAdded ? 'Added to Wallet!' : 'Add to Wallet'}</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 bg-white text-[#131b2e] hover:bg-[#faf8ff] transition-colors px-3 py-2 rounded-xl text-xs font-bold shadow-2xs border border-[#eaedff] cursor-pointer"
                  title="Print Pass"
                >
                  <span className="material-symbols-outlined text-base">print</span>
                  <span className="hidden sm:inline">Print Pass</span>
                </button>
              </div>
            </div>

            {downloadNotice && (
              <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fade-in">
                <span className="material-symbols-outlined text-emerald-600 text-base">check_circle</span>
                <span>Voucher PDF & Official Tax Invoice #INV-SKN-2025-9842 downloaded to your device.</span>
              </div>
            )}
          </section>

          {/* Section 2: Main Digital Boarding Pass / Ticket Voucher (Perforated Aesthetic) */}
          <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden mb-8 border border-[#eaedff]">
            {/* Ticket Header Banner */}
            <div className="bg-[#131a33] text-white px-6 sm:px-8 py-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#acedff] text-2xl">verified_user</span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#acedff] font-bold">SKYNORA TRAVELS VIP PASS</p>
                  <h2 className="font-['Plus_Jakarta_Sans'] text-lg sm:text-xl text-white font-extrabold">
                    {bookingState.property.title}
                  </h2>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-[#7b83a0]">Total Paid (Inclusive of GST)</p>
                  <p className="font-['Plus_Jakarta_Sans'] text-2xl font-extrabold text-white leading-tight">
                    ₹82,662
                  </p>
                </div>
                <div className="bg-[#e2e7ff] text-[#131b2e] px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                  PAID IN FULL
                </div>
              </div>
            </div>

            {/* Ticket Body Container */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Main Reservation Column */}
              <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-dashed border-[#c6c6ce]">
                <div>
                  {/* Stay Schedule Grid */}
                  <div className="bg-[#f2f3ff] rounded-2xl p-4 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center border border-[#eaedff]">
                    <div>
                      <span className="text-[10px] text-[#76767e] uppercase tracking-wider block font-semibold">
                        Check-in
                      </span>
                      <p className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e]">Tue, 18 Nov 2025</p>
                      <p className="text-xs text-[#4b41e1] font-semibold">14:00 IST onwards</p>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center">
                      <span className="text-xs bg-[#e2e7ff] text-[#131b2e] px-3 py-1 rounded-full font-bold">
                        4 Nights Stay
                      </span>
                      <div className="w-full flex items-center justify-center my-1 text-[#76767e] opacity-60">
                        <span className="text-xs">────────</span>
                        <span className="material-symbols-outlined text-sm mx-1 text-[#4b41e1]">hotel</span>
                        <span className="text-xs">────────</span>
                      </div>
                      <span className="text-xs text-[#76767e]">Sinquerim, Candolim</span>
                    </div>
                    <div className="sm:text-right">
                      <span className="text-[10px] text-[#76767e] uppercase tracking-wider block font-semibold">
                        Check-out
                      </span>
                      <p className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e]">Sat, 22 Nov 2025</p>
                      <p className="text-xs text-[#76767e]">Until 11:00 IST</p>
                    </div>
                  </div>

                  {/* Reservation Deep Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-3">
                      <div>
                        <span className="text-[10px] uppercase font-semibold text-[#76767e] block">Room Category</span>
                        <p className="text-sm font-bold text-[#131b2e] flex items-center gap-1.5 mt-0.5">
                          <span className="material-symbols-outlined text-[#4b41e1] text-base">meeting_room</span>
                          Superior King Room - Sea View
                        </p>
                        <p className="text-xs text-[#45464d] pl-6">Private Balcony overlooking Arabian Sea, 480 sq.ft</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-semibold text-[#76767e] block">Guests Registered</span>
                        <p className="text-xs font-semibold text-[#131b2e] flex items-center gap-1.5 mt-0.5">
                          <span className="material-symbols-outlined text-[#4b41e1] text-base">group</span>
                          2 Adults (Rohan Sharma, Priya Sharma)
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-[10px] uppercase font-semibold text-[#76767e] block">Meal Inclusions</span>
                        <p className="text-xs font-bold text-[#131b2e] flex items-center gap-1.5 mt-0.5">
                          <span className="material-symbols-outlined text-[#4b41e1] text-base">restaurant</span>
                          Lavish Buffet Breakfast & High Tea Included
                        </p>
                        <p className="text-xs text-[#45464d] pl-6">Served daily at Kokum Kitchen (07:30 - 10:30)</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-semibold text-[#76767e] block">Special Privileges</span>
                        <p className="text-xs text-[#131b2e] flex items-center gap-1.5 mt-0.5">
                          <span className="material-symbols-outlined text-[#4b41e1] text-base">spa</span>
                          15% Off on Jiva Spa Therapies & Complimentary Wi-Fi
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Settlement & Trust Footer */}
                <div className="pt-2 bg-[#f2f3ff] rounded-xl p-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[#45464d] border border-[#eaedff]">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#131b2e]">Payment:</span>
                    <span>UPI via Razorpay</span>
                    <span className="font-mono bg-[#e2e7ff] px-2 py-0.5 rounded text-[#131b2e] font-semibold">
                      UTR: 531984209123
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#4b41e1] font-semibold">
                    <span className="material-symbols-outlined text-sm">verified</span>
                    <span>IATA & IHCL Guaranteed Pass</span>
                  </div>
                </div>
              </div>

              {/* Perforated Tear-off Coupon Line (Right Stub) */}
              <div className="lg:col-span-4 bg-[#f2f3ff] relative p-6 sm:p-8 flex flex-col items-center justify-between text-center">
                <div className="w-full flex flex-col items-center">
                  <div className="mb-2">
                    <span className="text-xs text-[#4b41e1] font-bold uppercase tracking-wider">
                      Express Desk Boarding
                    </span>
                    <p className="font-['Plus_Jakarta_Sans'] text-xl font-extrabold text-[#131b2e] font-mono tracking-tight">
                      TAJ-GOA-7731
                    </p>
                  </div>

                  {/* QR Code Graphic with Logo Icon */}
                  <div className="bg-white p-3 rounded-2xl shadow-sm my-3 inline-block border border-[#eaedff]">
                    <svg className="w-40 h-40 text-[#131b2e]" fill="currentColor" viewBox="0 0 160 160">
                      <rect fill="currentColor" height="40" rx="4" width="40" x="10" y="10"></rect>
                      <rect fill="white" height="24" rx="2" width="24" x="18" y="18"></rect>
                      <rect fill="currentColor" height="12" width="12" x="24" y="24"></rect>
                      <rect fill="currentColor" height="40" rx="4" width="40" x="110" y="10"></rect>
                      <rect fill="white" height="24" rx="2" width="24" x="118" y="18"></rect>
                      <rect fill="currentColor" height="12" width="12" x="124" y="24"></rect>
                      <rect fill="currentColor" height="40" rx="4" width="40" x="10" y="110"></rect>
                      <rect fill="white" height="24" rx="2" width="24" x="18" y="118"></rect>
                      <rect fill="currentColor" height="12" width="12" x="24" y="124"></rect>
                      <rect fill="currentColor" height="10" width="10" x="58" y="14"></rect>
                      <rect fill="currentColor" height="8" width="8" x="76" y="14"></rect>
                      <rect fill="currentColor" height="8" width="8" x="92" y="14"></rect>
                      <rect fill="currentColor" height="8" width="8" x="14" y="58"></rect>
                      <rect fill="currentColor" height="10" width="12" x="28" y="66"></rect>
                      <rect fill="currentColor" height="8" width="8" x="44" y="58"></rect>
                      <rect fill="#4b41e1" height="40" rx="6" width="40" x="60" y="60"></rect>
                      <circle cx="80" cy="80" fill="white" r="10"></circle>
                      <circle cx="80" cy="80" fill="#4b41e1" r="5"></circle>
                      <rect fill="currentColor" height="14" width="8" x="114" y="58"></rect>
                      <rect fill="currentColor" height="8" width="14" x="130" y="64"></rect>
                      <rect fill="currentColor" height="12" width="12" x="58" y="110"></rect>
                      <rect fill="currentColor" height="8" width="8" x="78" y="118"></rect>
                      <rect fill="currentColor" height="14" width="10" x="92" y="110"></rect>
                      <rect fill="currentColor" height="8" width="14" x="110" y="114"></rect>
                      <rect fill="currentColor" height="18" width="12" x="132" y="118"></rect>
                      <rect fill="currentColor" height="14" width="10" x="110" y="132"></rect>
                    </svg>
                  </div>

                  <p className="text-xs text-[#45464d] font-semibold max-w-[200px] leading-tight">
                    Scan at Front Desk for Express Contactless Check-In
                  </p>
                </div>

                {/* Stylized Barcode Element */}
                <div className="w-full pt-4">
                  <div className="h-7 flex items-stretch justify-center gap-0.5 opacity-80 px-4 overflow-hidden">
                    <span className="w-1 bg-[#131b2e]"></span>
                    <span className="w-0.5 bg-[#131b2e]"></span>
                    <span className="w-2 bg-[#131b2e]"></span>
                    <span className="w-0.5 bg-transparent"></span>
                    <span className="w-1.5 bg-[#131b2e]"></span>
                    <span className="w-0.5 bg-[#131b2e]"></span>
                    <span className="w-1 bg-[#131b2e]"></span>
                    <span className="w-2 bg-[#131b2e]"></span>
                    <span className="w-0.5 bg-transparent"></span>
                    <span className="w-1 bg-[#131b2e]"></span>
                    <span className="w-2.5 bg-[#131b2e]"></span>
                    <span className="w-0.5 bg-[#131b2e]"></span>
                    <span className="w-1 bg-[#131b2e]"></span>
                    <span className="w-1.5 bg-[#131b2e]"></span>
                    <span className="w-0.5 bg-transparent"></span>
                    <span className="w-2 bg-[#131b2e]"></span>
                    <span className="w-1 bg-[#131b2e]"></span>
                    <span className="w-0.5 bg-[#131b2e]"></span>
                    <span className="w-1.5 bg-[#131b2e]"></span>
                    <span className="w-2 bg-[#131b2e]"></span>
                    <span className="w-0.5 bg-transparent"></span>
                    <span className="w-1 bg-[#131b2e]"></span>
                    <span className="w-0.5 bg-[#131b2e]"></span>
                    <span className="w-2 bg-[#131b2e]"></span>
                  </div>
                  <p className="font-mono text-[10px] text-[#76767e] mt-1 font-semibold">SNK-GOA-2025-AUTH-OK</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Split Row - Integrated Logistics & Check-in Policies */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            {/* Integrated Transport Status Card */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 shadow-xs flex flex-col justify-between border border-[#eaedff]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#4b41e1] text-xl">directions_car</span>
                    <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e]">
                      Airport Chauffeur Transfer
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 bg-[#e2e7ff] text-[#131b2e] text-xs px-3 py-1 rounded-full font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#4b41e1]"></span> Confirmed & Assigned
                  </span>
                </div>

                {/* Cab Booking Details */}
                <div className="bg-[#f2f3ff] rounded-xl p-4 mb-3 border border-[#eaedff]">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3">
                    <div>
                      <span className="text-[10px] text-[#76767e] block uppercase font-semibold">
                        Pickup Point & Schedule
                      </span>
                      <p className="text-sm font-bold text-[#131b2e]">{bookingState.assignedDriver.pickupLocation}</p>
                      <p className="text-xs text-[#4b41e1] font-semibold">{bookingState.assignedDriver.pickupTime}</p>
                    </div>
                    <div className="sm:text-right">
                      <span className="text-[10px] text-[#76767e] block uppercase font-semibold">Drop Location</span>
                      <p className="text-xs font-medium text-[#131b2e]">{bookingState.assignedDriver.dropLocation}</p>
                      <p className="text-xs text-[#76767e]">Est. Drive: {bookingState.assignedDriver.estimatedDrive}</p>
                    </div>
                  </div>

                  {/* Driver Details */}
                  <div className="bg-white rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 border border-[#eaedff]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#e2e7ff] flex items-center justify-center text-[#131b2e] font-bold text-xs">
                        SN
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#131b2e]">{bookingState.assignedDriver.name}</p>
                        <p className="text-[11px] text-[#45464d]">
                          {bookingState.assignedDriver.carModel} ·{' '}
                          <span className="font-mono font-bold text-[#131b2e]">
                            {bookingState.assignedDriver.licensePlate}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${bookingState.assignedDriver.phone}`}
                        className="inline-flex items-center gap-1 bg-[#e2e7ff] hover:bg-[#dae2fd] text-[#131b2e] px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">call</span> Call Driver
                      </a>
                      <button
                        onClick={() => setIsDriverModalOpen(true)}
                        className="inline-flex items-center gap-1 bg-[#4b41e1] hover:bg-[#645efb] text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">navigation</span> Live Track
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-[#45464d] pt-1">
                <span className="material-symbols-outlined text-sm text-[#4b41e1]">info</span>
                <span>
                  Driver will hold a name board '{bookingState.primaryGuest.name}' near Exit Gate 3. Zero waiting charges up to 45 mins.
                </span>
              </div>
            </div>

            {/* Check-in Policies Card */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 shadow-xs flex flex-col justify-between border border-[#eaedff]">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-[#4b41e1] text-xl">policy</span>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e]">Check-in Policies</h3>
                </div>
                <ul className="space-y-3 text-xs text-[#131b2e] mb-4">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#4b41e1] text-base shrink-0">badge</span>
                    <span>
                      <strong>Government Photo ID Mandatory:</strong> Original Aadhaar, Passport, or Voter ID required for all adult guests (PAN card not accepted).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#4b41e1] text-base shrink-0">schedule</span>
                    <span>
                      <strong>Standard Timings:</strong> Early check-in subject to room availability upon arrival. Complimentary luggage hold at bell desk.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#4b41e1] text-base shrink-0">payments</span>
                    <span>
                      <strong>Incidental Deposit:</strong> Credit card or cash hold of ₹5,000 per night for optional incidentals (fully refundable at checkout).
                    </span>
                  </li>
                </ul>
              </div>

              {/* Dedicated Support Lockup */}
              <div className="bg-[#f2f3ff] rounded-xl p-4 border border-[#eaedff]">
                <p className="text-[10px] text-[#76767e] uppercase tracking-wider mb-1 font-bold">
                  Skynora 24x7 Dedicated Concierge
                </p>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <a
                      className="font-['Plus_Jakarta_Sans'] text-base text-[#4b41e1] font-bold hover:underline block leading-none"
                      href="tel:18007596672"
                    >
                      1800-SKYNORA
                    </a>
                    <span className="text-[11px] text-[#76767e]">Priority desk for Taj Fort Aguada guests</span>
                  </div>
                  <a
                    className="inline-flex items-center gap-1 bg-[#e2e7ff] hover:bg-[#dae2fd] text-[#131b2e] text-xs px-3 py-1.5 rounded-lg font-bold transition-colors"
                    href="https://wa.me/9118002008899"
                  >
                    <span className="material-symbols-outlined text-sm">forum</span> WhatsApp Helpdesk
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Destination Exploration & Next Steps Grid */}
          <section className="mb-8">
            <div className="flex flex-wrap items-end justify-between gap-2 mb-4">
              <div>
                <span className="text-xs text-[#4b41e1] uppercase font-bold tracking-wider">
                  Curated for Your Itinerary
                </span>
                <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#131b2e]">
                  Popular Experiences Around Candolim
                </h3>
              </div>
              <button
                onClick={() => onNavigate('hotels')}
                className="text-xs text-[#4b41e1] hover:text-[#645efb] font-bold inline-flex items-center gap-1 transition-colors cursor-pointer"
              >
                Explore All 24 Goa Activities <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CANDOLIM_EXPERIENCES.map((exp) => {
                const isAdded = addedExperiences.includes(exp.id);
                return (
                  <div
                    key={exp.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow group flex flex-col border border-[#eaedff]"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt={exp.title}
                        src={exp.image}
                      />
                      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded text-[11px] font-bold text-[#131b2e] flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs text-[#4b41e1]">{exp.tagIcon}</span>{' '}
                        {exp.tag}
                      </div>
                      <div className="absolute top-2 right-2 bg-[#131b2e] text-white px-2 py-0.5 rounded text-[11px] font-bold">
                        ★ {exp.rating}
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#131b2e] mb-1">
                          {exp.title}
                        </h4>
                        <p className="text-xs text-[#45464d] line-clamp-2 leading-relaxed">{exp.description}</p>
                      </div>
                      <div className="pt-3 mt-3 flex items-center justify-between border-t border-[#f2f3ff]">
                        <div>
                          <span className="text-[10px] text-[#76767e] block">From</span>
                          <span className="font-['Plus_Jakarta_Sans'] text-sm text-[#131b2e] font-bold">
                            ₹{exp.price.toLocaleString('en-IN')}
                          </span>{' '}
                          <span className="text-[10px] text-[#76767e]">/person</span>
                        </div>
                        <button
                          onClick={() => toggleExperience(exp.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            isAdded
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[#e2e7ff] hover:bg-[#4b41e1] hover:text-white text-[#131b2e]'
                          }`}
                        >
                          {isAdded ? 'Added ✓' : 'Add to Stay'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 5: Bottom Navigation CTA Footer */}
          <section className="bg-white rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#eaedff]">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-full bg-[#e2e7ff] flex items-center justify-center text-[#4b41e1] shrink-0">
                <span className="material-symbols-outlined text-xl">luggage</span>
              </div>
              <div>
                <h4 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e]">
                  Manage Your Trip Anytime
                </h4>
                <p className="text-xs text-[#45464d]">Modify guests, request early check-in, or add meal upgrades.</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-center">
              <button
                onClick={() => onNavigate('profile')}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-[#e2e7ff] hover:bg-[#dae2fd] text-[#131b2e] px-5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">format_list_bulleted</span>
                <span>View in My Bookings</span>
              </button>
              <button
                onClick={() => onNavigate('explore')}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-[#4b41e1] hover:bg-[#645efb] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">travel_explore</span>
                <span>Plan Another Trip</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
