import React, { useState, useEffect } from 'react';
import { BookingState, AppView } from '../types';

interface CheckoutViewProps {
  bookingState: BookingState;
  onUpdateBooking: (updater: (prev: BookingState) => BookingState) => void;
  onPaymentSuccess: () => void;
  onNavigate: (view: AppView) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  bookingState,
  onUpdateBooking,
  onPaymentSuccess,
  onNavigate
}) => {
  const [activePaymentTab, setActivePaymentTab] = useState<'upi' | 'cards' | 'netbanking' | 'emi'>('upi');
  const [useGst, setUseGst] = useState(bookingState.hasGst);
  const [gstNumber, setGstNumber] = useState('27AABCT8491M1Z6');
  const [creditsRedeemed, setCreditsRedeemed] = useState(bookingState.creditsRedeemed);
  const [vpaInput, setVpaInput] = useState(bookingState.upiVpa);
  const [isVpaVerified, setIsVpaVerified] = useState(true);
  const [promoApplied, setPromoApplied] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(298); // 4m 58s

  // QR Code Timer Countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Pricing calculations
  const baseRoomFare = 74000;
  const memberDiscount = 4000;
  const promoDiscount = promoApplied ? 1500 : 0;
  const airportCab = bookingState.addOns.airportCab ? 1200 : 0;
  const tripProtection = bookingState.addOns.comprehensiveCover ? 499 : 0;
  const creditsDiscount = creditsRedeemed ? 2450 : 0;
  const gstTax = 12463;

  const totalAmountToPay =
    baseRoomFare - memberDiscount - promoDiscount + airportCab + tripProtection + gstTax - creditsDiscount;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
    }, 1600);
  };

  const setVpaSuffix = (suffix: string) => {
    const base = vpaInput.split('@')[0] || 'rohan';
    setVpaInput(base + suffix);
    setIsVpaVerified(true);
  };

  return (
    <div className="flex flex-col w-full bg-[#faf8ff] pb-16">
      {/* Top Trust & Security Strip */}
      <section className="w-full bg-[#131a33] text-[#7b83a0] py-2 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-center md:text-left text-xs">
          <div className="flex items-center gap-3 mx-auto md:mx-0">
            <span className="inline-flex items-center gap-1 text-[#acedff] font-semibold">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified_user
              </span>
              256-bit Bank-Grade SSL Encryption
            </span>
            <span className="hidden sm:inline text-[#3e4660]">•</span>
            <span className="hidden sm:inline text-white font-medium">Official IRCTC & IATA Certified Aggregator</span>
          </div>
          <div className="flex items-center gap-2 mx-auto md:mx-0 text-[#4cd7f6] font-semibold">
            <span className="material-symbols-outlined text-sm">bolt</span>
            <span>100% Instant Refund Guarantee on UPI (TAT &lt; 60s)</span>
          </div>
        </div>
      </section>

      {/* Checkout Stepper Bar */}
      <section className="w-full bg-white py-4 shadow-xs border-b border-[#eaedff]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wider text-[#4b41e1] font-bold">
                Booking ID: SK-GOA-88492
              </span>
              <h1 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#131b2e] tracking-tight">
                Express Checkout & Secure Payment
              </h1>
            </div>

            {/* Visual Stepper */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 text-[#131b2e]">
                <span className="w-6 h-6 rounded-full bg-[#4b41e1] text-white flex items-center justify-center text-xs font-bold">
                  <span className="material-symbols-outlined text-xs">check</span>
                </span>
                <span className="text-xs font-semibold text-[#131b2e]">1. Guest Details</span>
              </div>
              <div className="w-6 h-0.5 bg-[#4b41e1]"></div>

              <div className="flex items-center gap-1.5 text-[#131b2e]">
                <span className="w-6 h-6 rounded-full bg-[#4b41e1] text-white flex items-center justify-center text-xs font-bold">
                  <span className="material-symbols-outlined text-xs">check</span>
                </span>
                <span className="text-xs font-semibold text-[#131b2e]">2. Add-ons</span>
              </div>
              <div className="w-6 h-0.5 bg-[#4b41e1]"></div>

              <div className="flex items-center gap-1.5">
                <span className="w-6 h-6 rounded-full bg-[#4b41e1] text-white flex items-center justify-center text-xs font-bold animate-pulse">
                  3
                </span>
                <span className="text-xs font-bold text-[#4b41e1]">3. Payment & Confirmation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Multi-Column Checkout Space */}
      <div className="w-full py-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Payment Console & Traveler Verification (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Traveler Summary Card */}
            <div className="bg-white rounded-2xl p-6 shadow-xs flex flex-col gap-4 border border-[#eaedff]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#4b41e1]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    badge
                  </span>
                  <h2 className="text-base font-bold text-[#131b2e]">Primary Traveler Verified</h2>
                </div>
                <button
                  onClick={() => onNavigate('profile')}
                  className="text-xs font-bold text-[#4b41e1] hover:underline cursor-pointer"
                >
                  Edit Info
                </button>
              </div>

              <div className="bg-[#f2f3ff] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-[#eaedff]">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#131b2e]">{bookingState.primaryGuest.name}</span>
                  <span className="text-xs text-[#45464d]">
                    {bookingState.primaryGuest.email} • {bookingState.primaryGuest.phone}
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-[#e2e7ff] px-3 py-1 rounded-full text-xs font-semibold text-[#131b2e]">
                  <span className="material-symbols-outlined text-[#4b41e1] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  <span>WhatsApp Alerts On</span>
                </div>
              </div>

              {/* GST Invoice Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    checked={useGst}
                    onChange={(e) => setUseGst(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-[#4b41e1] accent-[#4b41e1] cursor-pointer"
                    type="checkbox"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#131b2e]">Use GST Invoice for this booking</span>
                    <span className="text-[11px] text-[#45464d]">Claim tax input credit up to 18% with your company GSTIN</span>
                  </div>
                </label>
                {useGst && (
                  <div className="mt-3 pl-6 flex items-center gap-2">
                    <input
                      type="text"
                      value={gstNumber}
                      onChange={(e) => setGstNumber(e.target.value)}
                      placeholder="Enter 15-digit GSTIN (e.g. 27AABCT8491M1Z6)"
                      className="bg-[#f2f3ff] border border-[#eaedff] px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-[#131b2e] focus:outline-none w-72"
                    />
                    <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">verified</span> Verified GSTIN
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Add-ons Included Summary Strip */}
            <div className="bg-white rounded-2xl p-4 shadow-xs flex flex-col gap-2 border border-[#eaedff]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#45464d]">
                  Selected Trip Add-ons
                </span>
                <span className="text-xs text-[#4b41e1] font-semibold">2 Add-ons Protected</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="flex items-center gap-3 bg-[#f2f3ff] p-3 rounded-xl border border-[#eaedff]">
                  <div className="w-10 h-10 rounded-full bg-[#e2dfff] flex items-center justify-center text-[#0f0069] shrink-0">
                    <span className="material-symbols-outlined text-lg">local_taxi</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-[#131b2e] truncate">Goa Airport Sedan Pickup</span>
                    <span className="text-[11px] text-[#4b41e1] font-semibold">₹1,200 (Confirmed)</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-[#f2f3ff] p-3 rounded-xl border border-[#eaedff]">
                  <div className="w-10 h-10 rounded-full bg-[#dae2fd] flex items-center justify-center text-[#131b2e] shrink-0">
                    <span className="material-symbols-outlined text-lg">health_and_safety</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-[#131b2e] truncate">Skynora Comprehensive Cover</span>
                    <span className="text-[11px] text-[#4b41e1] font-semibold">₹499 (Active for 2)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Skynora Wallet Deduction Block */}
            <div className="bg-[#e2e7ff] rounded-2xl p-4 flex items-center justify-between gap-4 border border-[#c3c0ff]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#131a33] text-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg text-[#acedff]">account_balance_wallet</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#131b2e]">Skynora Credits Available</span>
                    <span className="bg-[#e2dfff] px-2 py-0.5 rounded text-[#0f0069] text-xs font-bold">
                      ₹2,450
                    </span>
                  </div>
                  <span className="text-[11px] text-[#45464d]">
                    Redeem credits immediately towards final payment
                  </span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={creditsRedeemed}
                  onChange={(e) => setCreditsRedeemed(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#d2d9f4] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#d2d9f4] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4b41e1]"></div>
              </label>
            </div>

            {/* Indian Multivariant Payment Selector */}
            <div className="bg-white rounded-2xl p-6 shadow-xs flex flex-col gap-6 border border-[#eaedff]">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h2 className="text-base font-bold text-[#131b2e]">Select Payment Mode</h2>
                  <span className="text-xs text-[#45464d]">Recommended for India: Instant zero-fee UPI</span>
                </div>
                <span className="inline-flex items-center gap-1.5 bg-[#e2e7ff] text-[#131b2e] text-xs font-semibold px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-[#4b41e1]"></span> Zero Transaction Fee
                </span>
              </div>

              {/* Payment Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-[#f2f3ff] p-1.5 rounded-xl border border-[#eaedff]">
                <button
                  type="button"
                  onClick={() => setActivePaymentTab('upi')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activePaymentTab === 'upi'
                      ? 'bg-[#4b41e1] text-white shadow-xs'
                      : 'text-[#45464d] hover:bg-[#eaedff]'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">qr_code_2</span> UPI
                </button>
                <button
                  type="button"
                  onClick={() => setActivePaymentTab('cards')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activePaymentTab === 'cards'
                      ? 'bg-[#4b41e1] text-white shadow-xs'
                      : 'text-[#45464d] hover:bg-[#eaedff]'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">credit_card</span> Cards
                </button>
                <button
                  type="button"
                  onClick={() => setActivePaymentTab('netbanking')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activePaymentTab === 'netbanking'
                      ? 'bg-[#4b41e1] text-white shadow-xs'
                      : 'text-[#45464d] hover:bg-[#eaedff]'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">account_balance</span> NetBanking
                </button>
                <button
                  type="button"
                  onClick={() => setActivePaymentTab('emi')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activePaymentTab === 'emi'
                      ? 'bg-[#4b41e1] text-white shadow-xs'
                      : 'text-[#45464d] hover:bg-[#eaedff]'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">event_repeat</span> EMI
                </button>
              </div>

              {/* TAB CONTENT: UPI */}
              {activePaymentTab === 'upi' && (
                <div className="flex flex-col gap-6">
                  {/* Supported UPI Apps Showcase Bar */}
                  <div className="flex items-center justify-between flex-wrap gap-2 bg-[#f2f3ff] p-3 rounded-xl border border-[#eaedff]">
                    <span className="text-[11px] text-[#45464d] font-bold uppercase tracking-wider">
                      Supported UPI Apps:
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-white rounded text-xs font-bold text-[#131b2e] shadow-2xs">
                        GPay
                      </span>
                      <span className="px-2 py-0.5 bg-white rounded text-xs font-bold text-[#4b41e1] shadow-2xs">
                        PhonePe
                      </span>
                      <span className="px-2 py-0.5 bg-white rounded text-xs font-bold text-[#131a33] shadow-2xs">
                        Paytm
                      </span>
                      <span className="px-2 py-0.5 bg-white rounded text-xs font-bold text-[#131b2e] shadow-2xs">
                        CRED
                      </span>
                      <span className="px-2 py-0.5 bg-white rounded text-xs font-bold text-[#4b41e1] shadow-2xs">
                        BHIM
                      </span>
                    </div>
                  </div>

                  {/* Two Sub-options: VPA or QR */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Option A: Enter UPI ID */}
                    <div className="bg-white border-2 border-[#4b41e1]/20 rounded-2xl p-4 flex flex-col justify-between gap-3 hover:border-[#4b41e1] transition-all">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#131b2e]">1. Enter UPI ID / VPA</span>
                          <span className="material-symbols-outlined text-[#4b41e1] text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                            radio_button_checked
                          </span>
                        </div>
                        <p className="text-[11px] text-[#45464d]">
                          A payment notification will be pushed straight to your mobile UPI app.
                        </p>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <div className="relative flex items-center">
                          <input
                            type="text"
                            value={vpaInput}
                            onChange={(e) => setVpaInput(e.target.value)}
                            className="w-full h-11 pl-3 pr-20 rounded-xl bg-[#f2f3ff] text-[#131b2e] text-xs font-bold border border-[#eaedff] focus:outline-none focus:ring-2 focus:ring-[#4b41e1]"
                            placeholder="yourname@bank"
                          />
                          <button
                            type="button"
                            onClick={() => setIsVpaVerified(true)}
                            className="absolute right-1.5 px-3 py-1 bg-[#4b41e1] text-white rounded-lg text-xs font-bold hover:bg-[#645efb] transition-colors cursor-pointer"
                          >
                            Verify
                          </button>
                        </div>
                        {isVpaVerified && (
                          <div className="flex items-center gap-1 text-[#131b2e]">
                            <span className="material-symbols-outlined text-sm text-[#4b41e1]" style={{ fontVariationSettings: "'FILL' 1" }}>
                              verified
                            </span>
                            <span className="text-xs font-semibold">Verified: Rohan S. (Axis Bank UPI)</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {['@okaxis', '@okhdfcbank', '@ybl', '@paytm'].map((suf) => (
                          <button
                            key={suf}
                            type="button"
                            onClick={() => setVpaSuffix(suf)}
                            className="text-[11px] px-2 py-0.5 bg-[#e2e7ff] rounded-md text-[#45464d] hover:text-[#131b2e] hover:bg-[#dae2fd] cursor-pointer"
                          >
                            {suf}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Option B: Scan Dynamic UPI QR Code */}
                    <div className="bg-[#f2f3ff] rounded-2xl p-4 flex flex-col items-center text-center gap-2 border border-[#eaedff]">
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-bold text-[#131b2e]">2. Instant Scan & Pay</span>
                        <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">timer</span> {formatTimer(timeLeft)}
                        </span>
                      </div>

                      {/* Responsive QR Code */}
                      <div className="bg-white p-2.5 rounded-xl shadow-xs flex flex-col items-center justify-center relative my-1">
                        <svg className="w-32 h-32 text-[#131b2e]" fill="currentColor" viewBox="0 0 100 100">
                          <rect fill="none" height="28" rx="2" stroke="currentColor" strokeWidth="4" width="28" x="5" y="5"></rect>
                          <rect height="16" rx="1" width="16" x="11" y="11"></rect>
                          <rect fill="none" height="28" rx="2" stroke="currentColor" strokeWidth="4" width="28" x="67" y="5"></rect>
                          <rect height="16" rx="1" width="16" x="73" y="11"></rect>
                          <rect fill="none" height="28" rx="2" stroke="currentColor" strokeWidth="4" width="28" x="5" y="67"></rect>
                          <rect height="16" rx="1" width="16" x="11" y="73"></rect>
                          <rect height="8" width="8" x="40" y="8"></rect>
                          <rect height="6" width="6" x="52" y="8"></rect>
                          <rect height="14" width="6" x="40" y="22"></rect>
                          <rect height="8" width="8" x="52" y="24"></rect>
                          <rect height="6" width="8" x="10" y="42"></rect>
                          <rect height="10" width="8" x="24" y="40"></rect>
                          <rect fill="#4b41e1" height="16" width="16" x="42" y="42"></rect>
                          <rect height="8" width="6" x="68" y="42"></rect>
                          <rect height="12" width="12" x="80" y="40"></rect>
                          <rect height="8" width="10" x="40" y="66"></rect>
                          <rect height="14" width="6" x="56" y="64"></rect>
                          <rect height="6" width="12" x="70" y="68"></rect>
                          <rect height="10" width="8" x="42" y="82"></rect>
                          <rect height="10" width="14" x="68" y="82"></rect>
                          <rect height="16" width="6" x="88" y="76"></rect>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <span className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center font-bold text-[#4b41e1] text-xs">
                            ₹
                          </span>
                        </div>
                      </div>

                      <span className="text-[11px] text-[#45464d]">
                        Scan with Google Pay, PhonePe, Paytm, or BHIM app
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB CONTENT: CARDS */}
              {activePaymentTab === 'cards' && (
                <div className="flex flex-col gap-3">
                  <div className="bg-[#f2f3ff] p-4 rounded-xl flex flex-col gap-3 border border-[#eaedff]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#131b2e]">Card Details</span>
                      <span className="text-xs font-semibold text-[#45464d]">VISA • Mastercard • RuPay</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Card Number (16 Digits)"
                      defaultValue="4532 •••• •••• 9842"
                      className="w-full h-11 px-3 rounded-xl bg-white text-xs font-bold text-[#131b2e] border border-[#eaedff] focus:outline-none"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Valid Thru (MM/YY)"
                        defaultValue="08/29"
                        className="h-11 px-3 rounded-xl bg-white text-xs font-bold text-[#131b2e] border border-[#eaedff] focus:outline-none"
                      />
                      <input
                        type="password"
                        placeholder="CVV"
                        defaultValue="842"
                        className="h-11 px-3 rounded-xl bg-white text-xs font-bold text-[#131b2e] border border-[#eaedff] focus:outline-none"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Name on Card"
                      defaultValue="Rohan Sharma"
                      className="h-11 px-3 rounded-xl bg-white text-xs font-bold text-[#131b2e] border border-[#eaedff] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB CONTENT: NETBANKING */}
              {activePaymentTab === 'netbanking' && (
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-bold text-[#131b2e]">Popular Indian Banks</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank'].map((b) => (
                      <button
                        key={b}
                        className="p-2.5 bg-[#f2f3ff] hover:bg-[#e2e7ff] rounded-xl text-xs font-bold text-[#131b2e] transition-colors border border-[#eaedff]"
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                  <select className="w-full h-11 px-3 rounded-xl bg-[#f2f3ff] text-xs font-semibold text-[#131b2e] border border-[#eaedff] focus:outline-none cursor-pointer">
                    <option>Select from other 50+ Indian banks...</option>
                    <option>Kotak Mahindra Bank</option>
                    <option>Punjab National Bank</option>
                    <option>Bank of Baroda</option>
                    <option>IndusInd Bank</option>
                  </select>
                </div>
              )}

              {/* TAB CONTENT: EMI */}
              {activePaymentTab === 'emi' && (
                <div className="bg-[#f2f3ff] p-4 rounded-xl flex flex-col gap-1 border border-[#eaedff]">
                  <span className="text-xs font-bold text-[#131b2e]">No-Cost EMI Options Available</span>
                  <p className="text-xs text-[#45464d]">
                    Eligible for HDFC, ICICI, SBI, and Axis Bank credit cards. Starting at ₹13,777/month for 6 months.
                  </p>
                </div>
              )}
            </div>

            {/* Promo Code Applied Block */}
            <div className="bg-white rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 border border-[#eaedff]">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="w-10 h-10 rounded-full bg-[#dae2fd] flex items-center justify-center text-[#4b41e1] shrink-0">
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                    sell
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#131b2e]">SKYNORA100</span>
                    <span className="material-symbols-outlined text-xs text-[#4b41e1]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                  </div>
                  <span className="text-[11px] text-[#45464d]">
                    {promoApplied ? 'Instant flat ₹1,500 festive discount applied!' : 'Promo code removed'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPromoApplied(!promoApplied)}
                className="text-xs font-bold text-rose-600 hover:underline cursor-pointer shrink-0"
              >
                {promoApplied ? 'Remove Code' : 'Apply SKYNORA100'}
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Order Summary & Direct CTA (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl overflow-hidden shadow-md flex flex-col border border-[#eaedff]">
              {/* Image Header with Scrim */}
              <div className="relative w-full h-44 bg-[#d2d9f4]">
                <div
                  className="bg-cover bg-center w-full h-full"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC3D0wuQsf0MXQaaaePj0qX0fAt1SRNbdxKhmQYKCS_0VZPIFECEMGi1sXF0izkEXu8FjQxYUXOcfSM8pmbbwjrE8ONN2g3dCouHkFklmk-GpbdpkPHzYT8TeC_S4S_OV3ZML0UcBRJ_jUh9frxs4V1YK7uN3fuxWMBK-50D_J2UWlVnpwJ_pp-yRHZ9KyODyZZ1Sl9fCf7P_Mmr2lrSz4l6FIQtkuqL0hRPGoGn1wMa7kA-uP6C_DtPw')`
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#131a33]/90 via-[#131a33]/30 to-transparent"></div>
                <div className="absolute top-3 left-3">
                  <span className="bg-[#4b41e1] text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                    5-Star Heritage Luxury
                  </span>
                </div>
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-0.5 rounded-lg text-xs font-bold text-[#131b2e] flex items-center gap-1 shadow-sm">
                  <span className="material-symbols-outlined text-xs text-[#4b41e1]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>{' '}
                  4.9 (1.8k reviews)
                </div>
                <div className="absolute bottom-3 left-4 right-4 flex flex-col text-white">
                  <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold leading-tight">
                    {bookingState.property.title}
                  </h3>
                  <span className="text-[11px] text-[#acedff] flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-xs">location_on</span>
                    Candolim, Sinquerim Beach, North Goa
                  </span>
                </div>
              </div>

              {/* Stay Specific Details Strip */}
              <div className="p-4 bg-[#f2f3ff] flex flex-col gap-1.5 border-b border-[#eaedff]">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#45464d] font-semibold">Check-in:</span>
                  <span className="font-bold text-[#131b2e]">Tue, 18 Nov 2025 (14:00)</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#45464d] font-semibold">Check-out:</span>
                  <span className="font-bold text-[#131b2e]">Sat, 22 Nov 2025 (11:00)</span>
                </div>
                <div className="flex items-center justify-between text-xs pt-1 border-t border-[#eaedff]">
                  <span className="text-[#45464d] font-semibold">Stay Duration:</span>
                  <span className="font-bold text-[#4b41e1]">4 Nights • 2 Adults (1 Room)</span>
                </div>
                <div className="pt-1 flex items-center gap-1 text-[#131b2e] text-xs font-semibold">
                  <span className="material-symbols-outlined text-[#4b41e1] text-sm">bed</span>
                  <span className="truncate">{bookingState.roomTitle}</span>
                </div>
              </div>

              {/* Price Itemization */}
              <div className="p-6 flex flex-col gap-2.5 bg-white">
                <span className="text-xs uppercase tracking-wider text-[#45464d] font-bold">Fare Breakdown</span>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#45464d]">Base Room Fare (4 Nights)</span>
                  <span className="font-bold text-[#131b2e]">₹{baseRoomFare.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#4b41e1]">
                  <span className="font-semibold">Skynora Exclusive Member Discount</span>
                  <span className="font-bold">-₹{memberDiscount.toLocaleString('en-IN')}</span>
                </div>
                {promoApplied && (
                  <div className="flex items-center justify-between text-xs text-[#4b41e1]">
                    <span className="font-semibold">Promo (SKYNORA100)</span>
                    <span className="font-bold">-₹{promoDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {bookingState.addOns.airportCab && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#45464d]">Airport Luxury Sedan Pickup</span>
                    <span className="font-bold text-[#131b2e]">+₹{airportCab.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {bookingState.addOns.comprehensiveCover && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#45464d]">Comprehensive Trip Protection (2 Guests)</span>
                    <span className="font-bold text-[#131b2e]">+₹{tripProtection.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {creditsRedeemed && (
                  <div className="flex items-center justify-between text-xs text-emerald-600 font-bold">
                    <span>Skynora Wallet Credits Applied</span>
                    <span>-₹{creditsDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-[#45464d]">
                    <span>GST & Hospitality Taxes (18%)</span>
                    <span className="material-symbols-outlined text-[10px] text-[#76767e]">info</span>
                  </div>
                  <span className="font-bold text-[#131b2e]">+₹{gstTax.toLocaleString('en-IN')}</span>
                </div>

                {/* Total Bar */}
                <div className="mt-3 pt-4 flex items-end justify-between bg-[#f2f3ff] -mx-6 -mb-6 p-6 rounded-b-2xl border-t border-[#eaedff]">
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-wider text-[#45464d] font-bold">
                      Total Amount to Pay
                    </span>
                    <span className="text-[11px] text-[#4b41e1] font-semibold">Inclusive of all local taxes</span>
                  </div>
                  <div className="flex items-baseline text-[#131b2e]">
                    <span className="font-['Plus_Jakarta_Sans'] text-2xl font-extrabold tracking-tight">
                      ₹{totalAmountToPay.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Payment Action Box */}
              <div className="p-6 bg-white flex flex-col gap-4 border-t border-[#eaedff]">
                <button
                  onClick={handlePay}
                  disabled={isProcessing}
                  className="w-full py-3.5 px-6 bg-[#4b41e1] hover:bg-[#645efb] text-white rounded-xl text-base font-bold shadow-md hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">
                    {isProcessing ? 'autorenew' : 'lock'}
                  </span>
                  <span>
                    {isProcessing
                      ? 'Connecting to NPCI UPI Gateway...'
                      : `Pay ₹${totalAmountToPay.toLocaleString('en-IN')} Securely via UPI`}
                  </span>
                </button>

                <div className="flex items-center justify-center gap-1 text-center text-xs font-semibold text-[#131b2e]">
                  <span className="material-symbols-outlined text-sm text-[#4b41e1]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    speed
                  </span>
                  <span>Instant PNR & Taj Confirmation Voucher dispatched to WhatsApp</span>
                </div>

                <div className="bg-[#f2f3ff] p-3 rounded-xl flex items-start gap-2 border border-[#eaedff]">
                  <span className="material-symbols-outlined text-[#4b41e1] text-base shrink-0 mt-0.5">verified</span>
                  <p className="text-[11px] text-[#45464d] leading-relaxed">
                    <strong className="text-[#131b2e]">Free Cancellation</strong> until{' '}
                    <strong className="text-[#131b2e]">16 Nov 2025, 23:59 IST</strong>. If canceled, full ₹
                    {totalAmountToPay.toLocaleString('en-IN')} refunded within 60 seconds directly to your originating UPI account.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 text-xs text-[#45464d]">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-[#4b41e1]">support_agent</span>
                    <span>24x7 Goa Concierge</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-[#4b41e1]">shield</span>
                    <span>Fraud Shield Protection</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Safe Partner Footnote */}
            <div className="flex items-center justify-center gap-3 text-[#76767e] text-xs font-semibold">
              <span>Powered by NPCI Unified Payments</span>
              <span>•</span>
              <span>Razorpay Verified Gateway</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
