import React, { useState } from 'react';
import { Plane, Building2, BusFront, ArrowLeftRight, Calendar, Users, ChevronDown, Search, Sparkles } from 'lucide-react';
import { ServiceType, SearchParams, FlightClass } from '../types/travel';
import {
  POPULAR_ORIGINS_FLIGHT,
  POPULAR_DESTINATIONS_FLIGHT,
  POPULAR_HOTEL_CITIES,
  POPULAR_BUS_CITIES
} from '../data/mockTravelData';

interface HeroSearchProps {
  searchParams: SearchParams;
  onUpdateSearchParams: (params: Partial<SearchParams>) => void;
  onExecuteSearch: () => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  searchParams,
  onUpdateSearchParams,
  onExecuteSearch,
}) => {
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);

  const swapOriginDestination = () => {
    onUpdateSearchParams({
      from: searchParams.to,
      to: searchParams.from
    });
  };

  const handleQuickRoute = (from: string, to: string, service: ServiceType) => {
    onUpdateSearchParams({
      serviceType: service,
      from,
      to
    });
    onExecuteSearch();
  };

  const totalPassengers =
    searchParams.passengers.adults +
    searchParams.passengers.children +
    searchParams.passengers.infants;

  return (
    <section className="bg-gradient-to-b from-[#003580] via-[#0047a8] to-[#0a58ca] pt-8 pb-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Subtle Geometry Glow */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title Tagline */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-yellow-300 mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span>Pakistan’s #1 Sasta Travel & Ticketing Platform</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Book Sasta <span className="text-orange-400">Flights</span>, <span className="text-yellow-300">Hotels</span> & <span className="text-emerald-400">Buses</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-blue-100 font-medium">
            Compare cheap budget fares vs luxury first-class travel. Earn instant loyalty points on every booking.
          </p>
        </div>

        {/* Master Booking Card Container */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-blue-950/30 overflow-hidden border border-slate-100">
          {/* Main Service Tabs Header */}
          <div className="flex border-b border-slate-100 bg-slate-50/80 p-2 gap-2">
            <button
              onClick={() => onUpdateSearchParams({ serviceType: 'flight' })}
              id="hero-tab-flight"
              className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl font-bold text-sm transition-all ${
                searchParams.serviceType === 'flight'
                  ? 'bg-[#003580] text-white shadow-lg shadow-blue-900/20'
                  : 'text-slate-600 hover:bg-white hover:text-blue-900'
              }`}
            >
              <Plane className="w-4 h-4 text-orange-400" />
              <span>Flights</span>
            </button>

            <button
              onClick={() => onUpdateSearchParams({ serviceType: 'hotel' })}
              id="hero-tab-hotel"
              className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl font-bold text-sm transition-all ${
                searchParams.serviceType === 'hotel'
                  ? 'bg-[#003580] text-white shadow-lg shadow-blue-900/20'
                  : 'text-slate-600 hover:bg-white hover:text-blue-900'
              }`}
            >
              <Building2 className="w-4 h-4 text-orange-400" />
              <span>Hotels</span>
            </button>

            <button
              onClick={() => onUpdateSearchParams({ serviceType: 'bus' })}
              id="hero-tab-bus"
              className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl font-bold text-sm transition-all ${
                searchParams.serviceType === 'bus'
                  ? 'bg-[#003580] text-white shadow-lg shadow-blue-900/20'
                  : 'text-slate-600 hover:bg-white hover:text-blue-900'
              }`}
            >
              <BusFront className="w-4 h-4 text-orange-400" />
              <span>Buses</span>
            </button>
          </div>

          {/* Form Body */}
          <div className="p-5 sm:p-7">
            {/* Secondary flight options (Trip type & Class) */}
            {searchParams.serviceType === 'flight' && (
              <div className="flex flex-wrap items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-100 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="tripType"
                      checked={searchParams.tripType === 'one-way'}
                      onChange={() => onUpdateSearchParams({ tripType: 'one-way' })}
                      className="w-4 h-4 text-blue-600 accent-blue-600 cursor-pointer"
                    />
                    <span>One Way</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="tripType"
                      checked={searchParams.tripType === 'round-trip'}
                      onChange={() => onUpdateSearchParams({ tripType: 'round-trip' })}
                      className="w-4 h-4 text-blue-600 accent-blue-600 cursor-pointer"
                    />
                    <span>Round Trip</span>
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-medium">Cabin Class:</span>
                  <select
                    value={searchParams.flightClass}
                    onChange={(e) => onUpdateSearchParams({ flightClass: e.target.value as FlightClass })}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-1.5 rounded-lg border-0 outline-none cursor-pointer text-xs"
                  >
                    <option value="economy">Economy Sasta</option>
                    <option value="flexi">Economy Flexi</option>
                    <option value="business">Business / VIP Club</option>
                  </select>
                </div>
              </div>
            )}

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
              {/* FROM Input */}
              <div className="md:col-span-3 relative">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 ml-1">
                  {searchParams.serviceType === 'hotel' ? 'Destination City / Area' : 'Leaving From'}
                </label>
                <div className="relative">
                  <select
                    value={searchParams.from}
                    onChange={(e) => onUpdateSearchParams({ from: e.target.value })}
                    id="search-from-select"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-2xl px-4 py-3.5 text-sm font-bold text-slate-900 outline-none transition cursor-pointer appearance-none"
                  >
                    {searchParams.serviceType === 'hotel' ? (
                      POPULAR_HOTEL_CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))
                    ) : searchParams.serviceType === 'bus' ? (
                      POPULAR_BUS_CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))
                    ) : (
                      POPULAR_ORIGINS_FLIGHT.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))
                    )}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-4 pointer-events-none" />
                </div>
              </div>

              {/* Swap button (for Flights/Buses) */}
              {searchParams.serviceType !== 'hotel' && (
                <div className="hidden md:flex md:col-span-1 items-end justify-center pb-2">
                  <button
                    type="button"
                    onClick={swapOriginDestination}
                    title="Swap Origin and Destination"
                    id="swap-route-btn"
                    className="w-10 h-10 rounded-full bg-slate-100 hover:bg-orange-100 hover:text-orange-600 border border-slate-200 flex items-center justify-center text-slate-600 transition shadow-sm"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* TO Input (or Hotel Check-out) */}
              {searchParams.serviceType !== 'hotel' ? (
                <div className="md:col-span-3 relative">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 ml-1">
                    Going To
                  </label>
                  <div className="relative">
                    <select
                      value={searchParams.to}
                      onChange={(e) => onUpdateSearchParams({ to: e.target.value })}
                      id="search-to-select"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-2xl px-4 py-3.5 text-sm font-bold text-slate-900 outline-none transition cursor-pointer appearance-none"
                    >
                      {searchParams.serviceType === 'bus' ? (
                        POPULAR_BUS_CITIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))
                      ) : (
                        POPULAR_DESTINATIONS_FLIGHT.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))
                      )}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-4 pointer-events-none" />
                  </div>
                </div>
              ) : (
                <div className="md:col-span-3 relative">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 ml-1">
                    Check-in Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={searchParams.departureDate}
                      onChange={(e) => onUpdateSearchParams({ departureDate: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-2xl px-4 py-3.5 text-sm font-bold text-slate-900 outline-none transition"
                    />
                  </div>
                </div>
              )}

              {/* DATES / GUESTS */}
              <div className={`${searchParams.serviceType === 'hotel' ? 'md:col-span-3' : 'md:col-span-3'} relative`}>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 ml-1">
                  {searchParams.serviceType === 'hotel'
                    ? 'Rooms & Guests'
                    : searchParams.tripType === 'round-trip'
                    ? 'Departure & Return'
                    : 'Travel Date'}
                </label>
                
                {searchParams.serviceType === 'hotel' ? (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-2xl px-4 py-3.5 text-sm font-bold text-slate-900 text-left flex items-center justify-between"
                    >
                      <span>{searchParams.hotelRooms} Room, {searchParams.hotelGuests} Guests</span>
                      <Users className="w-4 h-4 text-slate-400" />
                    </button>
                    {showPassengerDropdown && (
                      <div className="absolute top-full mt-2 left-0 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-bold text-slate-800">Rooms</p>
                            <p className="text-xs text-slate-400">Total rooms needed</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => onUpdateSearchParams({ hotelRooms: Math.max(1, searchParams.hotelRooms - 1) })}
                              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold"
                            >-</button>
                            <span className="w-6 text-center font-bold">{searchParams.hotelRooms}</span>
                            <button
                              type="button"
                              onClick={() => onUpdateSearchParams({ hotelRooms: searchParams.hotelRooms + 1 })}
                              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold"
                            >+</button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-bold text-slate-800">Guests</p>
                            <p className="text-xs text-slate-400">Adults & Children</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => onUpdateSearchParams({ hotelGuests: Math.max(1, searchParams.hotelGuests - 1) })}
                              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold"
                            >-</button>
                            <span className="w-6 text-center font-bold">{searchParams.hotelGuests}</span>
                            <button
                              type="button"
                              onClick={() => onUpdateSearchParams({ hotelGuests: searchParams.hotelGuests + 1 })}
                              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold"
                            >+</button>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowPassengerDropdown(false)}
                          className="w-full bg-[#003580] text-white text-xs font-bold py-2 rounded-xl"
                        >Done</button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative">
                    <input
                      type="date"
                      value={searchParams.departureDate}
                      onChange={(e) => onUpdateSearchParams({ departureDate: e.target.value })}
                      id="search-date-input"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-2xl px-4 py-3.5 text-sm font-bold text-slate-900 outline-none transition"
                    />
                  </div>
                )}
              </div>

              {/* SEARCH BUTTON */}
              <div className={`${searchParams.serviceType === 'hotel' ? 'md:col-span-3' : 'md:col-span-2'} flex items-end`}>
                <button
                  type="button"
                  onClick={onExecuteSearch}
                  id="search-submit-btn"
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold py-3.5 px-6 rounded-2xl text-base shadow-lg shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Search className="w-5 h-5 stroke-[2.5]" />
                  <span>SEARCH</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Fast Routes Pills */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-white">
          <span className="text-blue-200 font-semibold mr-1">🔥 Top Routes:</span>
          <button
            onClick={() => handleQuickRoute('Karachi (KHI)', 'Lahore (LHE)', 'flight')}
            className="bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-1 rounded-full font-medium transition"
          >
            ✈️ Karachi ⇄ Lahore (from PKR 15.8k)
          </button>
          <button
            onClick={() => handleQuickRoute('Lahore (LHE)', 'Dubai (DXB)', 'flight')}
            className="bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-1 rounded-full font-medium transition"
          >
            ✈️ Lahore ⇄ Dubai (Emirates & Fly Jinnah)
          </button>
          <button
            onClick={() => handleQuickRoute('Lahore', 'Islamabad', 'bus')}
            className="bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-1 rounded-full font-medium transition"
          >
            🚌 Lahore ⇄ Islamabad Bus (from PKR 1,650)
          </button>
          <button
            onClick={() => handleQuickRoute('Lahore', 'Lahore', 'hotel')}
            className="bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-1 rounded-full font-medium transition"
          >
            🏨 Luxury Hotels in Lahore (Pearl Continental)
          </button>
        </div>
      </div>
    </section>
  );
};
