import React, { useState } from 'react';
import { AppView, UserRole } from '../types';
import { ShieldCheck, Building2, Plane, Bus, Car, User, Lock, Mail, ArrowRight, CheckCircle2, Sparkles, KeyRound } from 'lucide-react';

interface LoginPortalViewProps {
  onNavigate: (view: AppView) => void;
  onLoginSuccess: (user: { name: string; email: string; role: UserRole }) => void;
}

export const LoginPortalView: React.FC<LoginPortalViewProps> = ({ onNavigate, onLoginSuccess }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
  const [email, setEmail] = useState('aravind.sharma@skynora.com');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('Aravind Sharma');
  const [isRegistering, setIsRegistering] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const demoCredentials: Record<UserRole, { email: string; name: string; title: string }> = {
    customer: { email: 'aravind.sharma@gmail.com', name: 'Aravind Sharma', title: 'Skynora Platinum Traveler' },
    'hotel-partner': { email: 'taj.aguada@partner.com', name: 'General Manager, Taj Fort Aguada', title: 'Hotel Partner Portal' },
    'flight-partner': { email: 'indigo.ops@aviation.in', name: 'Captain R. Verma (IndiGo Ops)', title: 'Airlines & Flights Control' },
    'bus-operator': { email: 'neeta.travels@bus.in', name: 'Neeta Transport Desk', title: 'Bus Fleet Management' },
    'cab-vendor': { email: 'goa.cabs@fleet.in', name: 'Goa Premium Cabs Vendor', title: 'Cab & Chauffeur Fleet' },
    admin: { email: 'admin@skynoratravel.com', name: 'Master Administrator', title: 'Skynora Super Admin Console' }
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setEmail(demoCredentials[role].email);
    setName(demoCredentials[role].name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(`Successfully authenticated as ${demoCredentials[selectedRole].title}!`);
    setTimeout(() => {
      onLoginSuccess({ name, email, role: selectedRole });
      if (selectedRole === 'admin') {
        onNavigate('admin');
      } else if (selectedRole.includes('partner') || selectedRole.includes('operator') || selectedRole.includes('vendor')) {
        onNavigate('partner-portal');
      } else {
        onNavigate('explore');
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl w-full bg-slate-800/90 backdrop-blur-xl rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 relative z-10">
        
        {/* Left column: Role Selector & Quick Demo Logins */}
        <div className="md:col-span-5 bg-slate-900/80 p-8 border-r border-slate-700/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-black text-lg shadow-lg">
                S
              </div>
              <div>
                <span className="text-lg font-black text-white tracking-tight">SKYNORA</span>
                <span className="block text-[10px] text-indigo-400 font-semibold tracking-widest uppercase">Unified Portal</span>
              </div>
            </div>

            <h2 className="text-white font-bold text-base mb-3">Select Access Portal</h2>
            <p className="text-slate-400 text-xs mb-6 leading-relaxed">
              Log in to your respective dashboard for travelers, hotel partners, flight operations, bus/train desks, cab fleets, or system administration.
            </p>

            <div className="space-y-2">
              {[
                { role: 'customer' as UserRole, label: 'Traveler / Customer', icon: User, color: 'text-blue-400 bg-blue-500/10' },
                { role: 'hotel-partner' as UserRole, label: 'Hotel & Resort Partner', icon: Building2, color: 'text-amber-400 bg-amber-500/10' },
                { role: 'flight-partner' as UserRole, label: 'Airline & Flight Operations', icon: Plane, color: 'text-cyan-400 bg-cyan-500/10' },
                { role: 'bus-operator' as UserRole, label: 'Bus & Train Operator', icon: Bus, color: 'text-emerald-400 bg-emerald-500/10' },
                { role: 'cab-vendor' as UserRole, label: 'Cab & Chauffeur Fleet', icon: Car, color: 'text-rose-400 bg-rose-500/10' },
                { role: 'admin' as UserRole, label: 'Super Administrator', icon: ShieldCheck, color: 'text-purple-400 bg-purple-500/10' },
              ].map((item) => {
                const IconComponent = item.icon;
                const isActive = selectedRole === item.role;
                return (
                  <button
                    key={item.role}
                    type="button"
                    onClick={() => handleRoleSelect(item.role)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                      isActive 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold' 
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isActive ? 'bg-white/20 text-white' : item.color}`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 text-[11px] text-slate-500">
            <p className="flex items-center gap-1.5 text-indigo-400 font-medium mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Instant Demo Access
            </p>
            Clicking any role above instantly loads authorized demo credentials for seamless evaluation.
          </div>
        </div>

        {/* Right column: Login / Register Form */}
        <div className="md:col-span-7 p-8 flex flex-col justify-center">
          <div className="flex justify-between items-center mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                {demoCredentials[selectedRole].title}
              </span>
              <h3 className="text-xl font-black text-white mt-1">
                {isRegistering ? 'Create New Account' : 'Welcome Back'}
              </h3>
            </div>
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-4"
            >
              {isRegistering ? 'Existing user? Sign In' : 'New? Register Account'}
            </button>
          </div>

          {successMessage && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegistering && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name / Organization</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 pl-10 text-white text-xs focus:outline-none focus:border-indigo-500 font-medium"
                    placeholder="Enter full name"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 pl-10 text-white text-xs focus:outline-none focus:border-indigo-500 font-medium"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Secure Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 pl-10 text-white text-xs focus:outline-none focus:border-indigo-500 font-medium"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-0" />
                <span>Remember this device</span>
              </label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Demo password reset link sent to registered email.'); }} className="text-indigo-400 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <span>{isRegistering ? 'Create & Launch Portal' : `Authenticate & Access ${selectedRole.toUpperCase()}`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-700/80 flex items-center justify-between">
            <button
              onClick={() => onNavigate('explore')}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              ← Return to Explore Home
            </button>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
              <KeyRound className="w-3.5 h-3.5" /> 256-bit SSL Secure Vault
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
