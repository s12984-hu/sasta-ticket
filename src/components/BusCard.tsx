import React from 'react';
import { BusFront, Clock, ShieldCheck, Wifi, Sparkles, Coffee, Monitor } from 'lucide-react';
import { BusItem, Currency } from '../types/travel';
import { formatPrice } from '../utils/formatters';

interface BusCardProps {
  bus: BusItem;
  currency: Currency;
  onOpenSeatPicker: (bus: BusItem) => void;
}

export const BusCard: React.FC<BusCardProps> = ({
  bus,
  currency,
  onOpenSeatPicker,
}) => {
  return (
    <div className={`bg-white rounded-3xl p-5 sm:p-6 border transition-all shadow-sm hover:shadow-md ${
      bus.tier === 'luxury'
        ? 'border-blue-200 hover:border-blue-400 bg-gradient-to-r from-white via-amber-50/15 to-white'
        : 'border-slate-200 hover:border-orange-300'
    }`}>
      {/* Top Bar: Operator Name & Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-1.5 shadow-sm">
            <img
              src={bus.operatorLogo}
              alt={bus.operator}
              className="w-full h-full object-cover rounded-xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-extrabold text-base text-slate-900">{bus.operator}</h4>
              <span className="bg-blue-50 text-blue-900 border border-blue-100 text-xs font-bold px-2.5 py-0.5 rounded-md">
                {bus.busType}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Rating: ★ {bus.rating} / 5.0</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {bus.tier === 'cheap' ? (
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-extrabold px-3 py-1 rounded-full">
              <Sparkles className="w-3 h-3 text-emerald-500" />
              <span>SASTA BUS FARE</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-gradient-to-r from-[#003580] to-blue-900 text-amber-300 border border-blue-800 text-xs font-extrabold px-3 py-1 rounded-full shadow-sm">
              <span>👑 LUXURY SLEEPER/RECLINER</span>
            </span>
          )}

          <span className="bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold px-2.5 py-1 rounded-full">
            +{bus.pointsEarned} Points
          </span>
        </div>
      </div>

      {/* Bus Route Timeline */}
      <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-8 grid grid-cols-3 gap-2 items-center">
          {/* Departure */}
          <div>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight block">
              {bus.departureTime}
            </span>
            <span className="text-sm font-extrabold text-blue-900 block">{bus.origin}</span>
            <span className="text-xs text-slate-400 font-medium block truncate max-w-[150px]" title={bus.departureTerminal}>
              {bus.departureTerminal}
            </span>
          </div>

          {/* Duration Indicator */}
          <div className="flex flex-col items-center justify-center text-center px-1">
            <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 mb-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{bus.duration}</span>
            </span>

            <div className="w-full relative flex items-center justify-center my-1">
              <div className="w-full h-0.5 bg-slate-200" />
              <div className="absolute w-6 h-6 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 shadow-sm">
                <BusFront className="w-3.5 h-3.5" />
              </div>
            </div>

            <span className="text-[11px] font-bold text-emerald-600 mt-1">
              Motorway Express
            </span>
          </div>

          {/* Arrival */}
          <div className="text-right">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight block">
              {bus.arrivalTime}
            </span>
            <span className="text-sm font-extrabold text-blue-900 block">{bus.destination}</span>
            <span className="text-xs text-slate-400 font-medium block truncate max-w-[150px] ml-auto" title={bus.arrivalTerminal}>
              {bus.arrivalTerminal}
            </span>
          </div>
        </div>

        {/* Price & Seat Picker Trigger */}
        <div className="md:col-span-4 flex flex-col md:items-end justify-center pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-slate-100 md:pl-6">
          <span className="text-xs text-slate-400 font-semibold">Per Seat Fare</span>
          <div className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            {formatPrice(bus.pricePKR, currency)}
          </div>
          <span className="text-[11px] text-emerald-600 font-bold mb-3">
            💺 {bus.seatsAvailable} seats available
          </span>

          <button
            onClick={() => onOpenSeatPicker(bus)}
            id={`select-bus-seat-${bus.id}`}
            className="w-full md:w-auto py-2.5 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm shadow-md shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>Select Seats</span>
          </button>
        </div>
      </div>

      {/* Amenities Strip */}
      <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
        {bus.amenities.slice(0, 3).map((a, i) => (
          <span key={i} className="flex items-center gap-1 font-medium">
            <span className="text-orange-500">✓</span> {a}
          </span>
        ))}
      </div>
    </div>
  );
};
