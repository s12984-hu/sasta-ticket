import React from 'react';
import { Plane, Building2, BusFront, Crown, Star, Ticket, PhoneCall, Globe, ShieldCheck } from 'lucide-react';
import { ServiceType, Currency, LoyaltyProfile } from '../types/travel';

interface NavbarProps {
  activeTab: ServiceType;
  onTabChange: (tab: ServiceType) => void;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  loyaltyProfile: LoyaltyProfile;
  onOpenLoyalty: () => void;
  onOpenBookings: () => void;
  bookingsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  currency,
  onCurrencyChange,
  loyaltyProfile,
  onOpenLoyalty,
  onOpenBookings,
  bookingsCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#003580] text-white shadow-md">
      {/* Top Banner Notice */}
      <div className="bg-[#00224f] px-4 py-1.5 text-xs text-blue-100 flex items-center justify-between border-b border-blue-900/50">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-orange-500 text-white font-bold px-2 py-0.5 rounded text-[10px] tracking-wide uppercase">
              Exclusive
            </span>
            <span className="hidden sm:inline text-blue-200">
              Use code <strong className="text-yellow-300">SASTA1000</strong> for instant PKR 1,000 discount on your booking!
            </span>
            <span className="sm:hidden text-blue-200">
              Promo: <strong className="text-yellow-300">SASTA1000</strong>
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="hidden md:flex items-center gap-1.5 text-blue-200">
              <PhoneCall className="w-3.5 h-3.5 text-orange-400" />
              <span>24/7 Helpline: <strong>+92 21 111-1-SASTA (72782)</strong></span>
            </div>
            <div className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">100% IATA & SECP Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Brand Logo & Service Switcher */}
        <div className="flex items-center gap-8">
          <div 
            onClick={() => onTabChange('flight')}
            className="flex items-center gap-2 cursor-pointer group"
            id="brand-logo-btn"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform">
              <Plane className="w-6 h-6 text-white transform -rotate-45" />
            </div>
            <div>
              <div className="flex items-baseline">
                <span className="text-2xl font-black tracking-tight text-white font-sans">SASTA</span>
                <span className="text-2xl font-black tracking-tight text-orange-400 font-sans">TICKET</span>
              </div>
              <span className="text-[10px] tracking-widest text-blue-200 uppercase font-semibold block -mt-1">
                Flights • Hotels • Buses
              </span>
            </div>
          </div>

          {/* Quick Service Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/10 p-1 rounded-xl border border-white/10 backdrop-blur-sm">
            <button
              onClick={() => onTabChange('flight')}
              id="nav-tab-flights"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'flight'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-blue-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Plane className="w-4 h-4" />
              <span>Flights</span>
            </button>
            <button
              onClick={() => onTabChange('hotel')}
              id="nav-tab-hotels"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'hotel'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-blue-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Hotels</span>
            </button>
            <button
              onClick={() => onTabChange('bus')}
              id="nav-tab-buses"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'bus'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-blue-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              <BusFront className="w-4 h-4" />
              <span>Buses</span>
            </button>
          </nav>
        </div>

        {/* Right Actions: Currency, Loyalty, My Bookings */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Currency Selector */}
          <div className="relative flex items-center bg-white/10 hover:bg-white/15 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-white transition-colors">
            <Globe className="w-3.5 h-3.5 mr-1.5 text-blue-300" />
            <select
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value as Currency)}
              id="currency-selector"
              className="bg-transparent text-white font-bold outline-none cursor-pointer pr-1"
            >
              <option value="PKR" className="text-gray-900 font-semibold">PKR (Rs)</option>
              <option value="USD" className="text-gray-900 font-semibold">USD ($)</option>
              <option value="AED" className="text-gray-900 font-semibold">AED (Dirham)</option>
              <option value="SAR" className="text-gray-900 font-semibold">SAR (Riyal)</option>
              <option value="GBP" className="text-gray-900 font-semibold">GBP (£)</option>
            </select>
          </div>

          {/* Loyalty Points Button */}
          <button
            onClick={onOpenLoyalty}
            id="loyalty-badge-btn"
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 hover:from-amber-500/30 hover:to-yellow-500/30 border border-amber-400/40 rounded-xl px-3 py-1.5 text-xs font-bold text-amber-300 transition-all shadow-sm"
          >
            <div className="w-6 h-6 rounded-full bg-amber-400 text-gray-900 flex items-center justify-center">
              <Crown className="w-3.5 h-3.5 fill-current" />
            </div>
            <div className="text-left leading-tight hidden sm:block">
              <span className="text-[10px] text-amber-200/80 block uppercase tracking-wider font-semibold">
                {loyaltyProfile.tier} Member
              </span>
              <span className="text-yellow-300 font-extrabold">
                {loyaltyProfile.pointsBalance.toLocaleString()} Pts
              </span>
            </div>
            <span className="sm:hidden font-extrabold text-yellow-300">
              {loyaltyProfile.pointsBalance}
            </span>
          </button>

          {/* My Bookings Button */}
          <button
            onClick={onOpenBookings}
            id="my-bookings-btn"
            className="relative flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-2 rounded-xl text-xs font-bold text-white transition-colors"
          >
            <Ticket className="w-4 h-4 text-orange-400" />
            <span className="hidden sm:inline">My Bookings</span>
            {bookingsCount > 0 && (
              <span className="bg-orange-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center -mr-1 shadow-sm animate-pulse">
                {bookingsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
