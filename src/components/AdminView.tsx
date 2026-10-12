import React, { useState } from 'react';
import { AppView } from '../types';
import { LayoutDashboard, Users, Building2, Ticket, TrendingUp, ShieldAlert, CheckCircle, XCircle, Search, Filter, Plus, Settings, DollarSign, ArrowUpRight, ArrowDownRight, RefreshCw, Layers } from 'lucide-react';

interface AdminViewProps {
  onNavigate: (view: AppView) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'partners' | 'promos' | 'logs'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [bookings, setBookings] = useState([
    { id: 'SKYN-94821', user: 'Aravind Sharma', item: 'Taj Fort Aguada (3 Nights)', amount: '₹48,450', status: 'Confirmed', date: 'Oct 12, 2026', type: 'Hotel' },
    { id: 'SKYN-88310', user: 'Priya Nair', item: 'IndiGo 6E-2415 Mumbai to Goa', amount: '₹7,420', status: 'Confirmed', date: 'Oct 12, 2026', type: 'Flight' },
    { id: 'SKYN-77192', user: 'Rahul Dravid', item: 'Vande Bharat AC Chair Car', amount: '₹2,450', status: 'Completed', date: 'Oct 11, 2026', type: 'Train' },
    { id: 'SKYN-66281', user: 'Sneha Gupta', item: 'Goa Airport Sedan Transfer', amount: '₹1,650', status: 'Pending Driver', date: 'Oct 12, 2026', type: 'Cab' },
    { id: 'SKYN-55104', user: 'Vikram Batra', item: 'W Goa Luxury Pool Villa', amount: '₹92,800', status: 'Confirmed', date: 'Oct 10, 2026', type: 'Hotel' },
  ]);

  const [partners, setPartners] = useState([
    { id: 'P-101', name: 'Taj Fort Aguada Resort & Spa', type: 'Hotel', status: 'Active', revenue: '₹18.4L', rating: 4.8 },
    { id: 'P-102', name: 'W Goa, Vagator', type: 'Hotel', status: 'Active', revenue: '₹32.1L', rating: 4.9 },
    { id: 'P-103', name: 'Goa Elite Cabs Syndicate', type: 'Cab Vendor', status: 'Pending Review', revenue: '₹4.2L', rating: 4.5 },
    { id: 'P-104', name: 'Neeta Sleeper Coaches', type: 'Bus Operator', status: 'Active', revenue: '₹9.8L', rating: 4.6 },
  ]);

  const [promos, setPromos] = useState([
    { code: 'SKYNORA100', discount: '₹1,000 Flat Off', usageCount: 1420, status: 'Active' },
    { code: 'SKYNORABUS', discount: '15% Off Buses', usageCount: 840, status: 'Active' },
    { code: 'LUXURYGOA25', discount: '25% Off Luxury Villas', usageCount: 310, status: 'Active' },
  ]);

  const handleApprovePartner = (id: string) => {
    setPartners(partners.map(p => p.id === id ? { ...p, status: 'Active' } : p));
  };

  const handleCancelBooking = (id: string) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-purple-600/30">
            S
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-black tracking-tight">SKYNORA ADMIN CONSOLE</h1>
              <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded-full text-[10px] font-bold uppercase tracking-wider border border-purple-500/30">
                Superuser
              </span>
            </div>
            <p className="text-xs text-slate-400">Enterprise Travel Infrastructure & Booking Engine</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('explore')}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-2"
          >
            ← Back to Skynora App
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-bold text-xs text-white">
            SA
          </div>
        </div>
      </header>

      {/* Subnav Tabs */}
      <div className="bg-slate-900/60 border-b border-slate-800 px-6 flex gap-2 overflow-x-auto">
        {[
          { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
          { id: 'bookings', label: 'All Bookings & PNRs', icon: Ticket },
          { id: 'partners', label: 'Partner & Vendor Approvals', icon: Building2 },
          { id: 'promos', label: 'Promos & Discounts', icon: DollarSign },
          { id: 'logs', label: 'System Health & Logs', icon: ShieldAlert },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
                isActive 
                  ? 'border-purple-500 text-purple-400 bg-purple-500/5' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <>
            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Total Gross Revenue', value: '₹1.48 Cr', change: '+18.4% this month', positive: true, icon: TrendingUp },
                { title: 'Active Bookings', value: '3,842', change: '+320 today', positive: true, icon: Ticket },
                { title: 'Partner Hotels & Cabs', value: '148 Active', change: '3 Pending Review', positive: true, icon: Building2 },
                { title: 'AI Concierge Queries', value: '24,910', change: '99.4% satisfaction', positive: true, icon: Layers },
              ].map((metric, idx) => {
                const Icon = metric.icon;
                return (
                  <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center justify-between text-slate-400 mb-2">
                      <span className="text-xs font-semibold">{metric.title}</span>
                      <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-2xl font-black text-white mb-1">{metric.value}</div>
                    <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                      <ArrowUpRight className="w-3 h-3" /> {metric.change}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recent Bookings & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white">Live System Bookings</h3>
                  <button onClick={() => setActiveTab('bookings')} className="text-xs text-purple-400 hover:underline font-semibold">
                    View All →
                  </button>
                </div>
                <div className="space-y-3">
                  {bookings.slice(0, 4).map((b) => (
                    <div key={b.id} className="flex items-center justify-between p-3.5 bg-slate-800/60 rounded-xl border border-slate-700/50">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{b.item}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-slate-700 text-slate-300 font-medium">{b.type}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">User: {b.user} • {b.id}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-black text-white">{b.amount}</span>
                        <span className={`block text-[10px] font-semibold ${b.status === 'Confirmed' ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {b.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Actions & Quick Config */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white mb-4">Super Admin Operations</h3>
                  <div className="space-y-3">
                    <button 
                      onClick={() => alert('Cache cleared & server re-indexed successfully.')}
                      className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-semibold text-left flex items-center justify-between transition-colors"
                    >
                      <span>Flush Redis Cache</span>
                      <RefreshCw className="w-3.5 h-3.5 text-purple-400" />
                    </button>
                    <button 
                      onClick={() => alert('All database backups archived to Google Cloud Storage bucket.')}
                      className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-semibold text-left flex items-center justify-between transition-colors"
                    >
                      <span>Trigger DB Backup</span>
                      <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
                    </button>
                    <button 
                      onClick={() => alert('All API gateways operational. Latency: 42ms.')}
                      className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-semibold text-left flex items-center justify-between transition-colors"
                    >
                      <span>Gateway Health Check</span>
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl mt-6">
                  <span className="text-[11px] font-bold text-purple-300 block mb-1">Vercel Deployment Ready</span>
                  <p className="text-[10px] text-slate-300 leading-relaxed">
                    Build configured with Vite & Node serverless middleware. Ready for instant Vercel CLI push.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* TAB 2: BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
              <h3 className="text-sm font-bold text-white">All Bookings & Transactions ({bookings.length})</h3>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search bookings by PNR or User..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 pl-9 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3">Reference / PNR</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Booking Item</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-800/40">
                      <td className="p-3 font-bold text-purple-400">{b.id}</td>
                      <td className="p-3 font-semibold text-white">{b.user}</td>
                      <td className="p-3 text-slate-300">{b.item}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-medium">{b.type}</span>
                      </td>
                      <td className="p-3 font-bold text-white">{b.amount}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          b.status === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-300' : 
                          b.status === 'Cancelled' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        {b.status !== 'Cancelled' && (
                          <button
                            onClick={() => handleCancelBooking(b.id)}
                            className="px-2.5 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded text-[11px] font-semibold transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PARTNERS */}
        {activeTab === 'partners' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold text-white">Partner & Vendor Management</h3>
              <button onClick={() => alert('New partner onboarding modal opened.')} className="px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5" /> Onboard Partner
              </button>
            </div>

            <div className="space-y-3">
              {partners.map((p) => (
                <div key={p.id} className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white">{p.name}</h4>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-700 text-slate-300 font-medium">{p.type}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">ID: {p.id} • Revenue: {p.revenue} • Rating: ⭐ {p.rating}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                      p.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {p.status}
                    </span>
                    {p.status === 'Pending Review' && (
                      <button
                        onClick={() => handleApprovePartner(p.id)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors"
                      >
                        Approve Partner
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PROMOS */}
        {activeTab === 'promos' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold text-white">Discount Coupons & Promo Codes</h3>
              <button onClick={() => alert('New promo code generator opened.')} className="px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5" /> Create Promo
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {promos.map((pr, idx) => (
                <div key={idx} className="p-4 bg-slate-800/70 border border-slate-700 rounded-xl flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="px-2.5 py-1 bg-purple-500/20 text-purple-300 font-black rounded-lg text-xs tracking-wider">
                        {pr.code}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase">{pr.status}</span>
                    </div>
                    <div className="text-sm font-bold text-white mb-1">{pr.discount}</div>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-4 pt-3 border-t border-slate-700/60 flex justify-between">
                    <span>Used by travelers</span>
                    <span className="font-bold text-white">{pr.usageCount} bookings</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: LOGS */}
        {activeTab === 'logs' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white">System Logs & Gateway Health</h3>
            <div className="bg-slate-950 p-4 rounded-xl font-mono text-[11px] text-slate-300 space-y-2 border border-slate-800">
              <p className="text-emerald-400">[2026-10-12 10:04:22] INFO: Gemini API connected via @google/genai SDK (User-Agent: aistudio-build)</p>
              <p className="text-cyan-400">[2026-10-12 10:03:10] INFO: UPI Payment Gateway (NPCI switch) verified 1,420 transactions successfully</p>
              <p className="text-slate-400">[2026-10-12 10:00:05] INFO: Vercel SPA build completed successfully with zero bundle errors</p>
              <p className="text-purple-400">[2026-10-12 09:55:00] INFO: Hotel inventory sync completed for Taj Fort Aguada & W Goa</p>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
