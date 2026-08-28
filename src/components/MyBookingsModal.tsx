import React from 'react';
import { X, Ticket, Plane, Building2, BusFront, Calendar, Download, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { BookingRecord, Currency } from '../types/travel';
import { formatPrice } from '../utils/formatters';

interface MyBookingsModalProps {
  bookings: BookingRecord[];
  currency: Currency;
  onClose: () => void;
  onCancelBooking: (bookingId: string) => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  bookings,
  currency,
  onClose,
  onCancelBooking,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden border border-slate-100 my-6">
        {/* Modal Header */}
        <div className="bg-[#003580] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-md">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white">My Trips & E-Tickets</h3>
              <p className="text-xs text-blue-200">
                Manage your confirmed bookings, download tickets, or modify reservations
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            id="close-my-bookings-btn"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Ticket className="w-8 h-8" />
              </div>
              <h4 className="font-extrabold text-base text-slate-800">No active bookings yet</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Search and book cheap flights, luxury hotels, or intercity buses to see your tickets here.
              </p>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-slate-50 hover:bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 transition-all shadow-sm space-y-4"
              >
                {/* Top Info */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#003580] text-white flex items-center justify-center">
                      {booking.bookingType === 'flight' && <Plane className="w-4 h-4" />}
                      {booking.bookingType === 'hotel' && <Building2 className="w-4 h-4" />}
                      {booking.bookingType === 'bus' && <BusFront className="w-4 h-4" />}
                    </span>
                    <div>
                      <span className="font-extrabold text-xs uppercase tracking-wider text-slate-500">
                        {booking.bookingType} • PNR: <span className="font-mono text-blue-900 font-black">{booking.pnr}</span>
                      </span>
                    </div>
                  </div>

                  <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                    booking.status === 'CONFIRMED'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{booking.status}</span>
                  </span>
                </div>

                {/* Service & Passenger Info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Service</span>
                    <span className="font-extrabold text-slate-900 text-sm block">{booking.serviceTitle}</span>
                    <span className="text-slate-500">{booking.tierName}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Passenger / Dates</span>
                    <span className="font-bold text-slate-900 block">{booking.passenger.firstName} {booking.passenger.lastName}</span>
                    <span className="text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-orange-500" /> {booking.travelDate}
                    </span>
                  </div>

                  <div className="sm:text-right">
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Total Fare Paid</span>
                    <span className="font-black text-slate-950 text-base block">
                      {formatPrice(booking.totalAmountPKR, currency)}
                    </span>
                    <span className="text-[10px] text-amber-700 font-bold">
                      +{booking.pointsEarned} Pts Earned
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
                  <button
                    onClick={() => alert(`Downloading official E-Ticket for PNR: ${booking.pnr}...`)}
                    className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download E-Ticket (PDF)</span>
                  </button>

                  {booking.status === 'CONFIRMED' && (
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to cancel booking ${booking.pnr}? Refund will be processed back to your original payment method.`)) {
                          onCancelBooking(booking.id);
                        }
                      }}
                      className="text-xs font-bold text-red-600 hover:text-red-700 transition"
                    >
                      Cancel Reservation
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
