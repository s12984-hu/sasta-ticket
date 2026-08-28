import React, { useState } from 'react';
import { Plane, Luggage, Utensils, Wifi, Clock, ShieldCheck, ChevronDown, ChevronUp, Sparkles, Check } from 'lucide-react';
import { FlightItem, FlightFareTier, Currency } from '../types/travel';
import { formatPrice } from '../utils/formatters';

interface FlightCardProps {
  flight: FlightItem;
  currency: Currency;
  onSelectFlight: (flight: FlightItem, selectedTier: FlightFareTier) => void;
}

export const FlightCard: React.FC<FlightCardProps> = ({
  flight,
  currency,
  onSelectFlight,
}) => {
  const [showFareTiers, setShowFareTiers] = useState(false);
  const [selectedTierId, setSelectedTierId] = useState<string>(flight.fareTiers[0]?.id || '');

  const activeTier = flight.fareTiers.find((t) => t.id === selectedTierId) || flight.fareTiers[0];

  const handleBook = () => {
    onSelectFlight(flight, activeTier);
  };

  return (
    <div className={`bg-white rounded-3xl p-5 sm:p-6 border transition-all shadow-sm hover:shadow-md ${
      flight.tier === 'luxury'
        ? 'border-blue-200 hover:border-blue-400 bg-gradient-to-r from-white via-blue-50/20 to-white'
        : 'border-slate-200 hover:border-orange-300'
    }`}>
      {/* Top Banner with Airline & Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-1.5 shadow-sm">
            <img
              src={flight.airlineLogo}
              alt={flight.airline}
              className="w-full h-full object-cover rounded-xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-extrabold text-base text-slate-900">{flight.airline}</h4>
              <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                {flight.flightNumber}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">{flight.aircraft}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {flight.tier === 'cheap' ? (
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-extrabold px-3 py-1 rounded-full">
              <Sparkles className="w-3 h-3 text-emerald-500" />
              <span>CHEAPEST FARE</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-blue-900 text-yellow-300 border border-blue-800 text-xs font-extrabold px-3 py-1 rounded-full shadow-sm">
              <span>👑 VIP LUXURY</span>
            </span>
          )}

          <span className="bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold px-2.5 py-1 rounded-full">
            +{flight.pointsEarned} Points
          </span>
        </div>
      </div>

      {/* Flight Timeline Grid */}
      <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Departure & Arrival Visual Route */}
        <div className="md:col-span-8 grid grid-cols-3 gap-2 items-center">
          {/* Departure */}
          <div>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight block">
              {flight.departureTime}
            </span>
            <span className="text-sm font-extrabold text-blue-900 block">{flight.origin}</span>
            <span className="text-xs text-slate-400 font-medium block truncate max-w-[130px]" title={flight.originCity}>
              {flight.originCity}
            </span>
          </div>

          {/* Duration & Stops Indicator */}
          <div className="flex flex-col items-center justify-center text-center px-1">
            <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 mb-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{flight.duration}</span>
            </span>

            <div className="w-full relative flex items-center justify-center my-1">
              <div className="w-full h-0.5 bg-slate-200" />
              <div className="absolute w-6 h-6 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shadow-sm">
                <Plane className="w-3 h-3 transform rotate-45" />
              </div>
            </div>

            <span className={`text-[11px] font-extrabold mt-1 ${
              flight.stops === 0 ? 'text-emerald-600' : 'text-orange-600'
            }`}>
              {flight.stops === 0 ? 'Non-Stop Direct' : `${flight.stops} Stop (${flight.stopDetails?.split(' ')[3] || 'Transit'})`}
            </span>
          </div>

          {/* Arrival */}
          <div className="text-right">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight block">
              {flight.arrivalTime}
            </span>
            <span className="text-sm font-extrabold text-blue-900 block">{flight.destination}</span>
            <span className="text-xs text-slate-400 font-medium block truncate max-w-[130px] ml-auto" title={flight.destinationCity}>
              {flight.destinationCity}
            </span>
          </div>
        </div>

        {/* Price and Book CTA */}
        <div className="md:col-span-4 flex flex-col md:items-end justify-center pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-slate-100 md:pl-6">
          <span className="text-xs text-slate-400 font-semibold">Starting from</span>
          <div className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            {formatPrice(activeTier ? activeTier.pricePKR : flight.pricePKR, currency)}
          </div>
          <span className="text-[11px] text-emerald-600 font-bold mb-3">
            {flight.seatsLeft <= 5 ? `🔥 Only ${flight.seatsLeft} seats left!` : 'Instant Confirmation'}
          </span>

          <div className="flex items-center gap-2 w-full">
            <button
              onClick={() => setShowFareTiers(!showFareTiers)}
              className="flex-1 md:flex-initial py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center justify-center gap-1 transition"
            >
              <span>{activeTier.cabin}</span>
              {showFareTiers ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={handleBook}
              id={`book-flight-${flight.id}`}
              className="flex-1 py-2.5 px-5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm shadow-md shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Features Pill Strip */}
      <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
        <div className="flex items-center gap-1.5 font-medium">
          <Luggage className="w-3.5 h-3.5 text-blue-700" />
          <span>{activeTier.baggage}</span>
        </div>
        {flight.mealsIncluded && (
          <div className="flex items-center gap-1.5 font-medium">
            <Utensils className="w-3.5 h-3.5 text-orange-600" />
            <span>Meals Included</span>
          </div>
        )}
        {flight.wifiIncluded && (
          <div className="flex items-center gap-1.5 font-medium">
            <Wifi className="w-3.5 h-3.5 text-emerald-600" />
            <span>Onboard Wi-Fi</span>
          </div>
        )}
        {flight.refundable && (
          <div className="flex items-center gap-1.5 font-medium text-emerald-700">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Refundable</span>
          </div>
        )}
      </div>

      {/* Collapsible Fare Tier Comparison Drawer */}
      {showFareTiers && (
        <div className="mt-4 pt-4 border-t border-slate-100 bg-slate-50/70 p-4 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
              Select Cabin & Fare Class:
            </h5>
            <span className="text-xs text-blue-900 font-bold">Pick your travel flexibility</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {flight.fareTiers.map((tier) => {
              const isSelected = tier.id === selectedTierId;
              return (
                <div
                  key={tier.id}
                  onClick={() => setSelectedTierId(tier.id)}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-orange-500 bg-white shadow-md'
                      : 'border-slate-200 bg-white/70 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-extrabold text-xs text-slate-900">{tier.name}</span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-orange-500 text-white flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <div className="text-base font-black text-blue-950 mb-2">
                    {formatPrice(tier.pricePKR, currency)}
                  </div>
                  <ul className="text-[11px] text-slate-500 space-y-1">
                    <li className="flex items-center gap-1">
                      <span className="text-emerald-600">✓</span> {tier.baggage}
                    </li>
                    <li className="flex items-center gap-1">
                      <span className="text-emerald-600">✓</span> {tier.meal}
                    </li>
                    <li className="flex items-center gap-1">
                      <span className="text-slate-400">•</span> {tier.changesAllowed}
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
