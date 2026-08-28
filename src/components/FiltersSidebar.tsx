import React from 'react';
import { SlidersHorizontal, RotateCcw, ShieldCheck, Sparkles, DollarSign } from 'lucide-react';
import { ServiceType, PriceTierFilter, Currency } from '../types/travel';
import { formatPrice } from '../utils/formatters';

interface FiltersSidebarProps {
  serviceType: ServiceType;
  currency: Currency;
  priceTier: PriceTierFilter;
  onPriceTierChange: (tier: PriceTierFilter) => void;
  maxPrice: number;
  onMaxPriceChange: (price: number) => void;
  selectedAirlines: string[];
  onToggleAirline: (airline: string) => void;
  selectedBusOperators: string[];
  onToggleBusOperator: (operator: string) => void;
  selectedStarRatings: number[];
  onToggleStarRating: (star: number) => void;
  selectedStops: number[];
  onToggleStop: (stop: number) => void;
  refundableOnly: boolean;
  onToggleRefundable: () => void;
  onResetFilters: () => void;
  availableAirlines: { name: string; minPrice: number; count: number }[];
  availableOperators: { name: string; minPrice: number; count: number }[];
  priceRangeLimits: { min: number; max: number };
}

export const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
  serviceType,
  currency,
  priceTier,
  onPriceTierChange,
  maxPrice,
  onMaxPriceChange,
  selectedAirlines,
  onToggleAirline,
  selectedBusOperators,
  onToggleBusOperator,
  selectedStarRatings,
  onToggleStarRating,
  selectedStops,
  onToggleStop,
  refundableOnly,
  onToggleRefundable,
  onResetFilters,
  availableAirlines,
  availableOperators,
  priceRangeLimits,
}) => {
  return (
    <aside className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200/80 space-y-6">
      {/* Filters Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-blue-900" />
          <h3 className="font-extrabold text-base text-slate-900">Filters</h3>
        </div>
        <button
          onClick={onResetFilters}
          id="filter-reset-btn"
          className="flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700 transition"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset All</span>
        </button>
      </div>

      {/* 1. PRICE PREFERENCE TOGGLE: CHEAP (SASTA) vs EXPENSIVE (LUXURY) */}
      <div className="space-y-2.5">
        <label className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          <span>Fare & Category Type</span>
        </label>
        
        <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-2xl">
          <button
            type="button"
            onClick={() => onPriceTierChange('all')}
            id="filter-tier-all"
            className={`py-2 px-1 text-xs font-bold rounded-xl transition-all ${
              priceTier === 'all'
                ? 'bg-white text-blue-950 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            All Deals
          </button>
          <button
            type="button"
            onClick={() => onPriceTierChange('cheap')}
            id="filter-tier-cheap"
            className={`py-2 px-1 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 ${
              priceTier === 'cheap'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-emerald-700'
            }`}
          >
            <span>Sasta 💸</span>
          </button>
          <button
            type="button"
            onClick={() => onPriceTierChange('luxury')}
            id="filter-tier-luxury"
            className={`py-2 px-1 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 ${
              priceTier === 'luxury'
                ? 'bg-[#003580] text-white shadow-sm'
                : 'text-slate-500 hover:text-blue-900'
            }`}
          >
            <span>Luxury 👑</span>
          </button>
        </div>
        <p className="text-[11px] text-slate-400 px-1">
          {priceTier === 'cheap' && 'Showing budget-friendly and cheapest economy options.'}
          {priceTier === 'luxury' && 'Showing 5-star hotels, business class flights & VIP sleeper buses.'}
          {priceTier === 'all' && 'Showing all available economy, standard, and executive options.'}
        </p>
      </div>

      {/* 2. MAX BUDGET RANGE SLIDER */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-slate-500 uppercase tracking-wider text-[11px]">Max Budget</span>
          <span className="text-blue-950 font-extrabold text-sm">
            {formatPrice(maxPrice, currency)}
          </span>
        </div>
        <input
          type="range"
          min={priceRangeLimits.min}
          max={priceRangeLimits.max}
          step={serviceType === 'bus' ? 100 : 1000}
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
          id="filter-budget-range"
          className="w-full accent-orange-500 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] font-semibold text-slate-400">
          <span>Min: {formatPrice(priceRangeLimits.min, currency)}</span>
          <span>Max: {formatPrice(priceRangeLimits.max, currency)}</span>
        </div>
      </div>

      {/* 3. FLIGHT AIRLINES FILTER */}
      {serviceType === 'flight' && (
        <div className="space-y-3 pt-3 border-t border-slate-100">
          <label className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block">
            Select Airlines ({availableAirlines.length})
          </label>
          <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
            {availableAirlines.map((item) => {
              const isChecked = selectedAirlines.includes(item.name);
              return (
                <label
                  key={item.name}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition border border-transparent hover:border-slate-100"
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggleAirline(item.name)}
                      className="w-4 h-4 rounded text-blue-600 accent-blue-600 cursor-pointer"
                    />
                    <span className="text-xs font-bold text-slate-800">{item.name}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400">
                    from {formatPrice(item.minPrice, currency)}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. BUS OPERATOR FILTER */}
      {serviceType === 'bus' && (
        <div className="space-y-3 pt-3 border-t border-slate-100">
          <label className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block">
            Select Bus Operators
          </label>
          <div className="space-y-2.5">
            {availableOperators.map((item) => {
              const isChecked = selectedBusOperators.includes(item.name);
              return (
                <label
                  key={item.name}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition border border-transparent hover:border-slate-100"
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggleBusOperator(item.name)}
                      className="w-4 h-4 rounded text-blue-600 accent-blue-600 cursor-pointer"
                    />
                    <span className="text-xs font-bold text-slate-800">{item.name}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400">
                    from {formatPrice(item.minPrice, currency)}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. HOTEL STAR RATING FILTER */}
      {serviceType === 'hotel' && (
        <div className="space-y-3 pt-3 border-t border-slate-100">
          <label className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block">
            Hotel Star Rating
          </label>
          <div className="space-y-2">
            {[5, 4, 3, 2].map((stars) => {
              const isChecked = selectedStarRatings.includes(stars);
              return (
                <label
                  key={stars}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition border border-transparent hover:border-slate-100"
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggleStarRating(stars)}
                      className="w-4 h-4 rounded text-blue-600 accent-blue-600 cursor-pointer"
                    />
                    <span className="text-xs font-bold text-slate-800">
                      {'★'.repeat(stars)} ({stars} Star {stars === 5 ? 'Luxury' : stars >= 4 ? 'Premium' : 'Budget'})
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. FLIGHT STOPS FILTER */}
      {serviceType === 'flight' && (
        <div className="space-y-3 pt-3 border-t border-slate-100">
          <label className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block">
            Flight Stops
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { label: 'Direct', stop: 0 },
              { label: '1 Stop', stop: 1 },
              { label: '2+ Stops', stop: 2 },
            ].map(({ label, stop }) => {
              const isChecked = selectedStops.includes(stop);
              return (
                <button
                  key={stop}
                  type="button"
                  onClick={() => onToggleStop(stop)}
                  className={`py-2 px-1 text-xs font-bold rounded-xl border transition-all ${
                    isChecked
                      ? 'bg-blue-50 border-blue-600 text-blue-900 font-extrabold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 7. REFUNDABLE TOGGLE */}
      <div className="pt-3 border-t border-slate-100">
        <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer transition">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <div>
              <span className="text-xs font-bold text-slate-800 block">Refundable Only</span>
              <span className="text-[10px] text-slate-400">Deals with free or easy cancellation</span>
            </div>
          </div>
          <input
            type="checkbox"
            checked={refundableOnly}
            onChange={onToggleRefundable}
            id="filter-refundable-toggle"
            className="w-4 h-4 rounded text-blue-600 accent-blue-600 cursor-pointer"
          />
        </label>
      </div>
    </aside>
  );
};
