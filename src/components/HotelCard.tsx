import React, { useState } from 'react';
import { Star, MapPin, Coffee, Check, ShieldCheck, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { HotelItem, HotelRoomType, Currency } from '../types/travel';
import { formatPrice } from '../utils/formatters';

interface HotelCardProps {
  hotel: HotelItem;
  currency: Currency;
  onSelectHotel: (hotel: HotelItem, selectedRoom: HotelRoomType) => void;
}

export const HotelCard: React.FC<HotelCardProps> = ({
  hotel,
  currency,
  onSelectHotel,
}) => {
  const [showRooms, setShowRooms] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string>(hotel.roomTypes[0]?.id || '');

  const activeRoom = hotel.roomTypes.find((r) => r.id === selectedRoomId) || hotel.roomTypes[0];

  const handleBook = () => {
    onSelectHotel(hotel, activeRoom);
  };

  return (
    <div className={`bg-white rounded-3xl p-5 sm:p-6 border transition-all shadow-sm hover:shadow-md ${
      hotel.tier === 'luxury'
        ? 'border-blue-200 hover:border-blue-400'
        : 'border-slate-200 hover:border-orange-300'
    }`}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Hotel Image Gallery Preview */}
        <div className="md:col-span-4 relative rounded-2xl overflow-hidden group">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-52 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          {hotel.featuredBadge && (
            <span className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold text-[10px] px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
              {hotel.featuredBadge}
            </span>
          )}
          <span className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-yellow-300 font-bold text-xs px-2.5 py-1 rounded-xl">
            +{hotel.pointsEarned} Points
          </span>
        </div>

        {/* Hotel Info & Content */}
        <div className="md:col-span-8 flex flex-col justify-between">
          <div>
            {/* Header: Stars & Reviews */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: hotel.starRating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-xs font-bold text-slate-500 ml-1">
                  {hotel.starRating}-Star {hotel.tier === 'luxury' ? 'Luxury' : 'Hotel'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">{hotel.reviewRating >= 4.5 ? 'Superb' : 'Very Good'}</span>
                <span className="bg-[#003580] text-white text-xs font-black px-2.5 py-1 rounded-lg">
                  {hotel.reviewRating} / 5
                </span>
                <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                  ({hotel.reviewCount.toLocaleString()} reviews)
                </span>
              </div>
            </div>

            {/* Hotel Name & Location */}
            <h4 className="text-xl font-extrabold text-slate-900 leading-snug mb-1.5">
              {hotel.name}
            </h4>
            <p className="text-xs font-medium text-slate-500 flex items-center gap-1 mb-3">
              <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <span>{hotel.location}, {hotel.city}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-400">{hotel.distanceToCenter}</span>
            </p>

            <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
              {hotel.reviewText}
            </p>

            {/* Amenities Strip */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {hotel.amenities.slice(0, 4).map((amenity, i) => (
                <span
                  key={i}
                  className="bg-slate-100 text-slate-700 text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1"
                >
                  <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                  <span>{amenity}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Bar: Selected Room & Pricing */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Selected Room
              </span>
              <span className="text-sm font-extrabold text-blue-900 block">
                {activeRoom.name}
              </span>
              <div className="flex items-center gap-2 text-[11px] text-emerald-600 font-bold">
                {activeRoom.includesBreakfast && (
                  <span className="flex items-center gap-1">
                    <Coffee className="w-3 h-3" /> Free Breakfast
                  </span>
                )}
                {activeRoom.freeCancellation && (
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Free Cancellation
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <div className="text-right">
                <span className="text-[11px] text-slate-400 font-medium block">Price per night</span>
                <span className="text-2xl font-black text-slate-950 block">
                  {formatPrice(activeRoom.pricePKR, currency)}
                </span>
              </div>

              <button
                onClick={() => setShowRooms(!showRooms)}
                className="py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1"
              >
                <span>Change Room</span>
                {showRooms ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={handleBook}
                id={`book-hotel-${hotel.id}`}
                className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm shadow-md shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Reserve Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Room Choices */}
      {showRooms && (
        <div className="mt-5 pt-5 border-t border-slate-100 bg-slate-50/70 p-4 rounded-2xl space-y-3">
          <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
            Available Room Types:
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {hotel.roomTypes.map((room) => {
              const isSelected = room.id === selectedRoomId;
              return (
                <div
                  key={room.id}
                  onClick={() => setSelectedRoomId(room.id)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-orange-500 bg-white shadow-md'
                      : 'border-slate-200 bg-white/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-extrabold text-xs text-slate-900">{room.name}</span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-orange-500 text-white flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <div className="text-lg font-black text-blue-950 mb-2">
                    {formatPrice(room.pricePKR, currency)} <span className="text-xs font-normal text-slate-400">/ night</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-1">🛏️ {room.bedType} • {room.roomSize}</p>
                  <p className="text-[11px] text-slate-500 mb-2">👥 Capacity: {room.capacity}</p>
                  <div className="text-[11px] font-bold text-emerald-600">
                    {room.includesBreakfast ? '✓ Free Buffet Breakfast' : 'Room Only'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
