import React, { useState } from 'react';
import { X, User, Check, Sparkles, Info } from 'lucide-react';
import { BusItem, BusSeat, Currency } from '../types/travel';
import { formatPrice } from '../utils/formatters';

interface BusSeatPickerModalProps {
  bus: BusItem | null;
  currency: Currency;
  onClose: () => void;
  onConfirmSeats: (bus: BusItem, selectedSeatNumbers: number[], totalPricePKR: number) => void;
}

export const BusSeatPickerModal: React.FC<BusSeatPickerModalProps> = ({
  bus,
  currency,
  onClose,
  onConfirmSeats,
}) => {
  if (!bus) return null;

  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const toggleSeat = (seat: BusSeat) => {
    if (seat.isOccupied) return;

    if (selectedSeats.includes(seat.seatNumber)) {
      setSelectedSeats(selectedSeats.filter((num) => num !== seat.seatNumber));
    } else {
      if (selectedSeats.length >= 6) {
        alert('You can select a maximum of 6 seats per booking.');
        return;
      }
      setSelectedSeats([...selectedSeats, seat.seatNumber]);
    }
  };

  const calculateTotalSeatsPrice = () => {
    let total = 0;
    selectedSeats.forEach((seatNum) => {
      const seatObj = bus.seatLayout.find((s) => s.seatNumber === seatNum);
      const extra = seatObj?.priceOffsetPKR || 0;
      total += bus.pricePKR + extra;
    });
    return total;
  };

  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least 1 seat to proceed.');
      return;
    }
    onConfirmSeats(bus, selectedSeats, calculateTotalSeatsPrice());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-100 my-8">
        {/* Modal Header */}
        <div className="bg-[#003580] text-white p-5 sm:p-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-orange-500 text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase">
                {bus.operator}
              </span>
              <span className="text-xs text-blue-200">{bus.busType}</span>
            </div>
            <h3 className="text-xl font-extrabold text-white mt-1">
              Select Your Seats: {bus.origin} ➔ {bus.destination}
            </h3>
          </div>
          <button
            onClick={onClose}
            id="close-seat-picker-btn"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Seat Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 bg-slate-50 p-3 rounded-2xl text-xs font-bold border border-slate-100">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-lg border-2 border-slate-300 bg-white" />
              <span className="text-slate-600">Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-lg bg-orange-500 border-2 border-orange-600 text-white flex items-center justify-center text-[10px]">
                ✓
              </div>
              <span className="text-orange-700">Selected</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-lg bg-slate-300 border-2 border-slate-400" />
              <span className="text-slate-400">Occupied</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-lg border-2 border-pink-400 bg-pink-50" />
              <span className="text-pink-600">Female Priority</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-lg border-2 border-amber-400 bg-amber-50" />
              <span className="text-amber-700">VIP Front Row</span>
            </div>
          </div>

          {/* Interactive Bus Visual Interior */}
          <div className="max-w-md mx-auto bg-slate-100 border-2 border-slate-300 rounded-3xl p-6 relative shadow-inner">
            {/* Front of Bus (Steering wheel & door) */}
            <div className="flex items-center justify-between pb-6 mb-4 border-b-2 border-dashed border-slate-300 text-xs font-extrabold text-slate-400">
              <div className="flex items-center gap-1.5 bg-slate-200 px-3 py-1.5 rounded-xl text-slate-600">
                <span>🚪 Entrance Door</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-200 px-3 py-1.5 rounded-xl text-slate-600">
                <span>🎛️ Driver Cabin</span>
              </div>
            </div>

            {/* Seats Grid */}
            <div className="space-y-3">
              {Array.from({ length: Math.ceil(bus.seatLayout.length / 4) }).map((_, rowIndex) => {
                const rowSeats = bus.seatLayout.slice(rowIndex * 4, rowIndex * 4 + 4);
                return (
                  <div key={rowIndex} className="flex items-center justify-between gap-4">
                    {/* Left 2 seats */}
                    <div className="flex items-center gap-2">
                      {rowSeats.slice(0, 2).map((seat) => {
                        const isSelected = selectedSeats.includes(seat.seatNumber);
                        return (
                          <button
                            key={seat.seatNumber}
                            type="button"
                            disabled={seat.isOccupied}
                            onClick={() => toggleSeat(seat)}
                            className={`w-11 h-11 rounded-xl font-black text-xs transition-all flex flex-col items-center justify-center shadow-sm relative ${
                              seat.isOccupied
                                ? 'bg-slate-300 border-slate-400 text-slate-400 cursor-not-allowed opacity-60'
                                : isSelected
                                ? 'bg-orange-500 border-2 border-orange-600 text-white scale-105 shadow-md shadow-orange-500/30'
                                : seat.tier === 'vip'
                                ? 'bg-amber-50 border-2 border-amber-400 text-amber-900 hover:bg-amber-100'
                                : seat.isFemaleOnly
                                ? 'bg-pink-50 border-2 border-pink-400 text-pink-900 hover:bg-pink-100'
                                : 'bg-white border-2 border-slate-200 text-slate-800 hover:border-blue-500'
                            }`}
                          >
                            <span>{seat.seatNumber}</span>
                            {seat.tier === 'vip' && (
                              <span className="text-[8px] -mt-1 text-amber-600 font-bold">VIP</span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Central Aisle */}
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                      AISLE
                    </span>

                    {/* Right 2 seats */}
                    <div className="flex items-center gap-2">
                      {rowSeats.slice(2, 4).map((seat) => {
                        const isSelected = selectedSeats.includes(seat.seatNumber);
                        return (
                          <button
                            key={seat.seatNumber}
                            type="button"
                            disabled={seat.isOccupied}
                            onClick={() => toggleSeat(seat)}
                            className={`w-11 h-11 rounded-xl font-black text-xs transition-all flex flex-col items-center justify-center shadow-sm relative ${
                              seat.isOccupied
                                ? 'bg-slate-300 border-slate-400 text-slate-400 cursor-not-allowed opacity-60'
                                : isSelected
                                ? 'bg-orange-500 border-2 border-orange-600 text-white scale-105 shadow-md shadow-orange-500/30'
                                : seat.tier === 'vip'
                                ? 'bg-amber-50 border-2 border-amber-400 text-amber-900 hover:bg-amber-100'
                                : seat.isFemaleOnly
                                ? 'bg-pink-50 border-2 border-pink-400 text-pink-900 hover:bg-pink-100'
                                : 'bg-white border-2 border-slate-200 text-slate-800 hover:border-blue-500'
                            }`}
                          >
                            <span>{seat.seatNumber}</span>
                            {seat.tier === 'vip' && (
                              <span className="text-[8px] -mt-1 text-amber-600 font-bold">VIP</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Seats Summary & Checkout Action */}
          <div className="bg-slate-50 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 border border-slate-200">
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
                Selected Seat(s):
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                {selectedSeats.length === 0 ? (
                  <span className="text-sm font-semibold text-slate-400">None selected</span>
                ) : (
                  selectedSeats.map((s) => (
                    <span
                      key={s}
                      className="bg-orange-500 text-white font-extrabold text-xs px-2.5 py-1 rounded-lg"
                    >
                      Seat #{s}
                    </span>
                  ))
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 ml-auto">
              <div className="text-right">
                <span className="text-xs text-slate-400 font-bold uppercase block">Total Fare</span>
                <span className="text-2xl font-black text-blue-950 block">
                  {formatPrice(calculateTotalSeatsPrice(), currency)}
                </span>
              </div>

              <button
                type="button"
                onClick={handleProceed}
                id="confirm-bus-seats-btn"
                disabled={selectedSeats.length === 0}
                className="py-3 px-8 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-50 text-white font-extrabold text-sm shadow-lg shadow-orange-500/30 transition-all hover:scale-105"
              >
                Proceed to Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
