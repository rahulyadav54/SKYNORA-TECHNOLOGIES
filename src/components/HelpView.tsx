import React, { useState } from 'react';
import { AppView } from '../types';

interface HelpViewProps {
  onNavigate: (view: AppView) => void;
}

export const HelpView: React.FC<HelpViewProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMsg, setTicketMsg] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const faqs = [
    {
      q: 'How does Skynora Instant UPI Refund work?',
      a: 'Unlike traditional portals that take 5 to 7 business days, Skynora integrates directly with the NPCI UPI 2.0 switch. When you cancel a refundable booking, the money is reversed to your original UPI VPA within 3 to 5 seconds with a verified bank UTR number.'
    },
    {
      q: 'Can I combine Skynora Wallet credits with credit card promotional codes?',
      a: 'Yes, absolutely. Skynora credits act as direct currency in your account. You can apply bank card discount promo codes (like SKYNORA100 or HDFC2000) and simultaneously redeem your Skynora wallet balance towards the remainder.'
    },
    {
      q: 'How does the complimentary airport transfer work at Taj Fort Aguada?',
      a: 'For 5-star Signature stays with airport transfers included, our concierge pre-assigns a sanitized Toyota Innova Crysta or Mercedes sedan. Your driver tracks your flight in real time and waits at the arrivals gate with a name placard.'
    },
    {
      q: 'What is Skynora Free Cancellation Policy?',
      a: 'Properties marked with "Free Cancellation" allow full 100% refund up to the specified cut-off date (usually 24 to 48 hours prior to check-in). No processing deductions or hidden fees are withheld.'
    }
  ];

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (ticketSubject && ticketMsg) {
      setTicketSubmitted(true);
      setTicketSubject('');
      setTicketMsg('');
      setTimeout(() => setTicketSubmitted(false), 5000);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-[#faf8ff] min-h-screen text-[#131b2e]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#e2e7ff] text-[#4b41e1] uppercase tracking-wider inline-block mb-2">
            24x7 Customer Care & Concierge
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-['Plus_Jakarta_Sans'] mb-3">
            How can our Travel Curators assist you today?
          </h1>
          <p className="text-sm text-[#5a5c65]">
            Instant resolution for hotel check-ins, flight rescheduling, train PNR status, and instant UPI refund inquiries.
          </p>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white p-6 rounded-3xl border border-[#e2e7ff] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl">chat</span>
              </div>
              <h3 className="font-bold text-base text-[#131b2e] mb-1">WhatsApp Platinum Desk</h3>
              <p className="text-xs text-[#5a5c65] mb-4">Chat directly with a human travel curator within 45 seconds.</p>
            </div>
            <button
              onClick={() => window.open('https://wa.me/919811240019', '_blank')}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Start WhatsApp Chat
            </button>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#e2e7ff] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#e2e7ff] text-[#4b41e1] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl">call</span>
              </div>
              <h3 className="font-bold text-base text-[#131b2e] mb-1">Toll-Free Priority Line</h3>
              <p className="text-xs text-[#5a5c65] mb-4">24x7 priority support for active check-ins and emergency transit.</p>
            </div>
            <a
              href="tel:18001237596"
              className="w-full py-2.5 rounded-xl bg-[#131b2e] hover:bg-[#283044] text-white font-bold text-xs transition-colors text-center block"
            >
              Call 1800-123-SKYNORA
            </a>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#e2e7ff] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl">currency_rupee_circle</span>
              </div>
              <h3 className="font-bold text-base text-[#131b2e] mb-1">UPI Instant Refund Tracker</h3>
              <p className="text-xs text-[#5a5c65] mb-4">Track automated settlement to your bank account with NPCI UTR.</p>
            </div>
            <button
              onClick={() => onNavigate('profile')}
              className="w-full py-2.5 rounded-xl bg-[#4b41e1] hover:bg-[#3b30d0] text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Track in Profile
            </button>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e2e7ff] shadow-sm mb-10">
          <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans'] mb-6">Frequently Asked Questions</h2>
          <div className="divide-y divide-[#f2f3ff]">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-4">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left font-bold text-sm text-[#131b2e] cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className="material-symbols-outlined text-base text-[#4b41e1]">
                    {openFaq === idx ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {openFaq === idx && (
                  <p className="mt-2 text-xs text-[#5a5c65] leading-relaxed animate-fade-in">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Support Ticket Submission */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e2e7ff] shadow-sm">
          <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans'] mb-2">Raise a Priority Support Ticket</h2>
          <p className="text-xs text-[#5a5c65] mb-6">Our senior relationship desk will respond within 15 minutes.</p>

          {ticketSubmitted && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600">check_circle</span>
              <span>Ticket #TCK-2025-4190 logged successfully! Our team will call or email you shortly.</span>
            </div>
          )}

          <form onSubmit={handleSubmitTicket} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#45464d] mb-1">Subject / Issue Category</label>
              <input
                type="text"
                value={ticketSubject}
                onChange={e => setTicketSubject(e.target.value)}
                placeholder="e.g. Early check-in request at Taj Fort Aguada"
                className="w-full text-xs bg-[#faf8ff] px-4 py-3 rounded-xl border border-[#c6c6ce] focus:outline-[#4b41e1]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#45464d] mb-1">Message Details</label>
              <textarea
                value={ticketMsg}
                onChange={e => setTicketMsg(e.target.value)}
                placeholder="Provide details about your reservation or question..."
                rows={4}
                className="w-full text-xs bg-[#faf8ff] px-4 py-3 rounded-xl border border-[#c6c6ce] focus:outline-[#4b41e1]"
                required
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#4b41e1] text-white font-bold text-xs hover:bg-[#3b30d0] transition-colors shadow-sm cursor-pointer"
            >
              Submit Ticket
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
