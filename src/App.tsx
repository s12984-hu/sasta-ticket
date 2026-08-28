import React, { useState, useMemo } from 'react';
import { 
  Plane, Building2, BusFront, ArrowUpDown, Filter, Sparkles, 
  Info, Check, ShieldCheck, Tag, Zap, Gift, AlertCircle 
} from 'lucide-react';
import { 
  ServiceType, SearchParams, PriceTierFilter, Currency, 
  FlightItem, FlightFareTier, HotelItem, HotelRoomType, BusItem, 
  BookingRecord, LoyaltyProfile, SortOption 
} from './types/travel';
import { 
  MOCK_FLIGHTS, MOCK_HOTELS, MOCK_BUSES, 
  INITIAL_LOYALTY_PROFILE 
} from './data/mockTravelData';
import { Navbar } from './components/Navbar';
import { HeroSearch } from './components/HeroSearch';
import { FiltersSidebar } from './components/FiltersSidebar';
import { FlightCard } from './components/FlightCard';
import { HotelCard } from './components/HotelCard';
import { BusCard } from './components/BusCard';
import { BusSeatPickerModal } from './components/BusSeatPickerModal';
import { BookingModal } from './components/BookingModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { LoyaltyHubModal } from './components/LoyaltyHubModal';
import { Footer } from './components/Footer';

export default function App() {
  // Navigation & Service State
  const [activeTab, setActiveTab] = useState<ServiceType>('flight');
  const [currency, setCurrency] = useState<Currency>('PKR');

  // Search State
  const [searchParams, setSearchParams] = useState<SearchParams>({
    serviceType: 'flight',
    from: 'Karachi (KHI)',
    to: 'Lahore (LHE)',
    departureDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    tripType: 'one-way',
    flightClass: 'economy',
    passengers: { adults: 1, children: 0, infants: 0 },
    hotelGuests: 2,
    hotelRooms: 1
  });

  // Filter States
  const [priceTierFilter, setPriceTierFilter] = useState<PriceTierFilter>('all');
  const [maxPrice, setMaxPrice] = useState<number>(500000);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [selectedBusOperators, setSelectedBusOperators] = useState<string[]>([]);
  const [selectedStarRatings, setSelectedStarRatings] = useState<number[]>([]);
  const [selectedStops, setSelectedStops] = useState<number[]>([]);
  const [refundableOnly, setRefundableOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>('cheapest');

  // User Profile & Bookings State
  const [loyaltyProfile, setLoyaltyProfile] = useState<LoyaltyProfile>(INITIAL_LOYALTY_PROFILE);
  const [myBookings, setMyBookings] = useState<BookingRecord[]>([]);

  // Modals Visibility
  const [isLoyaltyOpen, setIsLoyaltyOpen] = useState(false);
  const [isBookingsOpen, setIsBookingsOpen] = useState(false);
  const [activeBusForSeatPicker, setActiveBusForSeatPicker] = useState<BusItem | null>(null);

  // Active Booking Checkout State
  const [activeCheckout, setActiveCheckout] = useState<{
    type: 'flight' | 'hotel' | 'bus';
    flight?: { item: FlightItem; tier: FlightFareTier };
    hotel?: { item: HotelItem; room: HotelRoomType };
    bus?: { item: BusItem; seats: number[]; totalSeatsPrice: number };
  } | null>(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Synchronize active service type with search params
  const handleTabChange = (service: ServiceType) => {
    setActiveTab(service);
    setSearchParams((prev) => {
      let defaultFrom = prev.from;
      let defaultTo = prev.to;

      if (service === 'flight') {
        defaultFrom = 'Karachi (KHI)';
        defaultTo = 'Lahore (LHE)';
      } else if (service === 'hotel') {
        defaultFrom = 'Lahore';
        defaultTo = 'Lahore';
      } else if (service === 'bus') {
        defaultFrom = 'Lahore';
        defaultTo = 'Islamabad';
      }

      return {
        ...prev,
        serviceType: service,
        from: defaultFrom,
        to: defaultTo
      };
    });
    // Reset specific category filters
    setPriceTierFilter('all');
  };

  // Update search params
  const handleUpdateSearchParams = (params: Partial<SearchParams>) => {
    setSearchParams((prev) => {
      const updated = { ...prev, ...params };
      if (params.serviceType && params.serviceType !== prev.serviceType) {
        setActiveTab(params.serviceType);
      }
      return updated;
    });
  };

  // Reset Filters
  const handleResetFilters = () => {
    setPriceTierFilter('all');
    setMaxPrice(500000);
    setSelectedAirlines([]);
    setSelectedBusOperators([]);
    setSelectedStarRatings([]);
    setSelectedStops([]);
    setRefundableOnly(false);
    setSortBy('cheapest');
  };

  // Available Airlines for Filters
  const availableAirlines = useMemo(() => {
    const map = new Map<string, { minPrice: number; count: number }>();
    MOCK_FLIGHTS.forEach((f) => {
      const existing = map.get(f.airline);
      if (existing) {
        existing.minPrice = Math.min(existing.minPrice, f.pricePKR);
        existing.count += 1;
      } else {
        map.set(f.airline, { minPrice: f.pricePKR, count: 1 });
      }
    });
    return Array.from(map.entries()).map(([name, data]) => ({
      name,
      minPrice: data.minPrice,
      count: data.count
    }));
  }, []);

  // Available Bus Operators for Filters
  const availableOperators = useMemo(() => {
    const map = new Map<string, { minPrice: number; count: number }>();
    MOCK_BUSES.forEach((b) => {
      const existing = map.get(b.operator);
      if (existing) {
        existing.minPrice = Math.min(existing.minPrice, b.pricePKR);
        existing.count += 1;
      } else {
        map.set(b.operator, { minPrice: b.pricePKR, count: 1 });
      }
    });
    return Array.from(map.entries()).map(([name, data]) => ({
      name,
      minPrice: data.minPrice,
      count: data.count
    }));
  }, []);

  // Price range limits for the current service
  const priceRangeLimits = useMemo(() => {
    if (activeTab === 'bus') {
      return { min: 1000, max: 15000 };
    } else if (activeTab === 'hotel') {
      return { min: 5000, max: 150000 };
    }
    return { min: 12000, max: 450000 };
  }, [activeTab]);

  // Toggle Filters
  const toggleAirline = (airline: string) => {
    setSelectedAirlines((prev) =>
      prev.includes(airline) ? prev.filter((a) => a !== airline) : [...prev, airline]
    );
  };

  const toggleBusOperator = (operator: string) => {
    setSelectedBusOperators((prev) =>
      prev.includes(operator) ? prev.filter((o) => o !== operator) : [...prev, operator]
    );
  };

  const toggleStarRating = (star: number) => {
    setSelectedStarRatings((prev) =>
      prev.includes(star) ? prev.filter((s) => s !== star) : [...prev, star]
    );
  };

  const toggleStop = (stop: number) => {
    setSelectedStops((prev) =>
      prev.includes(stop) ? prev.filter((s) => s !== stop) : [...prev, stop]
    );
  };

  // Filtered & Sorted Flights
  const filteredFlights = useMemo(() => {
    return MOCK_FLIGHTS.filter((flight) => {
      if (priceTierFilter !== 'all' && flight.tier !== priceTierFilter) return false;
      if (flight.pricePKR > maxPrice) return false;
      if (selectedAirlines.length > 0 && !selectedAirlines.includes(flight.airline)) return false;
      if (selectedStops.length > 0 && !selectedStops.includes(flight.stops)) return false;
      if (refundableOnly && !flight.refundable) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'cheapest') return a.pricePKR - b.pricePKR;
      if (sortBy === 'expensive') return b.pricePKR - a.pricePKR;
      if (sortBy === 'fastest') return parseInt(a.duration) - parseInt(b.duration);
      return 0;
    });
  }, [priceTierFilter, maxPrice, selectedAirlines, selectedStops, refundableOnly, sortBy]);

  // Filtered & Sorted Hotels
  const filteredHotels = useMemo(() => {
    return MOCK_HOTELS.filter((hotel) => {
      if (priceTierFilter !== 'all' && hotel.tier !== priceTierFilter) return false;
      const minRoomPrice = Math.min(...hotel.roomTypes.map((r) => r.pricePKR));
      if (minRoomPrice > maxPrice) return false;
      if (selectedStarRatings.length > 0 && !selectedStarRatings.includes(hotel.starRating)) return false;
      if (refundableOnly && !hotel.roomTypes.some((r) => r.freeCancellation)) return false;
      return true;
    }).sort((a, b) => {
      const priceA = a.roomTypes[0]?.pricePKR || 0;
      const priceB = b.roomTypes[0]?.pricePKR || 0;
      if (sortBy === 'cheapest') return priceA - priceB;
      if (sortBy === 'expensive') return priceB - priceA;
      if (sortBy === 'rating') return b.reviewRating - a.reviewRating;
      return 0;
    });
  }, [priceTierFilter, maxPrice, selectedStarRatings, refundableOnly, sortBy]);

  // Filtered & Sorted Buses
  const filteredBuses = useMemo(() => {
    return MOCK_BUSES.filter((bus) => {
      if (priceTierFilter !== 'all' && bus.tier !== priceTierFilter) return false;
      if (bus.pricePKR > maxPrice) return false;
      if (selectedBusOperators.length > 0 && !selectedBusOperators.includes(bus.operator)) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'cheapest') return a.pricePKR - b.pricePKR;
      if (sortBy === 'expensive') return b.pricePKR - a.pricePKR;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [priceTierFilter, maxPrice, selectedBusOperators, sortBy]);

  // Booking Checkout Trigger Handlers
  const handleSelectFlight = (flight: FlightItem, selectedTier: FlightFareTier) => {
    setActiveCheckout({
      type: 'flight',
      flight: { item: flight, tier: selectedTier }
    });
  };

  const handleSelectHotel = (hotel: HotelItem, selectedRoom: HotelRoomType) => {
    setActiveCheckout({
      type: 'hotel',
      hotel: { item: hotel, room: selectedRoom }
    });
  };

  const handleConfirmBusSeats = (bus: BusItem, selectedSeatNumbers: number[], totalPricePKR: number) => {
    setActiveBusForSeatPicker(null);
    setActiveCheckout({
      type: 'bus',
      bus: { item: bus, seats: selectedSeatNumbers, totalSeatsPrice: totalPricePKR }
    });
  };

  // Booking Completion and Loyalty Update Handler
  const handleBookingSuccess = (newBooking: BookingRecord, pointsEarned: number, pointsSpent: number) => {
    setMyBookings((prev) => [newBooking, ...prev]);

    setLoyaltyProfile((prev) => {
      const updatedBalance = prev.pointsBalance - pointsSpent + pointsEarned;
      return {
        ...prev,
        pointsBalance: updatedBalance,
        lifetimeEarned: prev.lifetimeEarned + pointsEarned,
        history: [
          {
            id: `tx-${Date.now()}`,
            date: 'Today',
            type: 'EARNED',
            points: pointsEarned,
            description: `Earned on ${newBooking.serviceTitle}`,
            bookingRef: newBooking.pnr
          },
          ...(pointsSpent > 0
            ? [
                {
                  id: `tx-spent-${Date.now()}`,
                  date: 'Today',
                  type: 'REDEEMED' as const,
                  points: -pointsSpent,
                  description: `Redeemed discount on ${newBooking.serviceTitle}`,
                  bookingRef: newBooking.pnr
                }
              ]
            : []),
          ...prev.history
        ]
      };
    });

    showToast(`🎉 Booking confirmed! PNR: ${newBooking.pnr} • Earned +${pointsEarned} Loyalty Points!`);
  };

  // Cancel Booking Handler
  const handleCancelBooking = (bookingId: string) => {
    setMyBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'CANCELLED' } : b))
    );
    showToast('Booking cancelled. Instant refund initiated to your original payment method.');
  };

  // Redeem Reward Voucher Handler
  const handleRedeemReward = (rewardTitle: string, pointsCost: number) => {
    if (loyaltyProfile.pointsBalance < pointsCost) {
      alert('Insufficient points for this reward.');
      return;
    }

    setLoyaltyProfile((prev) => ({
      ...prev,
      pointsBalance: prev.pointsBalance - pointsCost,
      history: [
        {
          id: `tx-reward-${Date.now()}`,
          date: 'Today',
          type: 'REDEEMED',
          points: -pointsCost,
          description: `Redeemed: ${rewardTitle}`,
          bookingRef: 'VOUCHER'
        },
        ...prev.history
      ]
    }));

    showToast(`🎁 Voucher Redeemed! "${rewardTitle}" voucher code sent to your email.`);
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] flex flex-col font-sans antialiased text-slate-800 selection:bg-orange-500 selection:text-white">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          <span className="text-xs font-bold">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white ml-2">
            ✕
          </button>
        </div>
      )}

      {/* 1. TOP NAVIGATION */}
      <Navbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        currency={currency}
        onCurrencyChange={setCurrency}
        loyaltyProfile={loyaltyProfile}
        onOpenLoyalty={() => setIsLoyaltyOpen(true)}
        onOpenBookings={() => setIsBookingsOpen(true)}
        bookingsCount={myBookings.filter((b) => b.status === 'CONFIRMED').length}
      />

      {/* 2. HERO SEARCH MODULE */}
      <HeroSearch
        searchParams={searchParams}
        onUpdateSearchParams={handleUpdateSearchParams}
        onExecuteSearch={() => {
          showToast(`Searching latest real-time fares for ${searchParams.from} ➔ ${searchParams.to}...`);
        }}
      />

      {/* 3. MAIN CONTENT: FILTERS & RESULTS */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 -mt-8 relative z-20 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Filters Sidebar */}
          <div className="lg:col-span-4">
            <FiltersSidebar
              serviceType={activeTab}
              currency={currency}
              priceTier={priceTierFilter}
              onPriceTierChange={setPriceTierFilter}
              maxPrice={maxPrice}
              onMaxPriceChange={setMaxPrice}
              selectedAirlines={selectedAirlines}
              onToggleAirline={toggleAirline}
              selectedBusOperators={selectedBusOperators}
              onToggleBusOperator={toggleBusOperator}
              selectedStarRatings={selectedStarRatings}
              onToggleStarRating={toggleStarRating}
              selectedStops={selectedStops}
              onToggleStop={toggleStop}
              refundableOnly={refundableOnly}
              onToggleRefundable={() => setRefundableOnly(!refundableOnly)}
              onResetFilters={handleResetFilters}
              availableAirlines={availableAirlines}
              availableOperators={availableOperators}
              priceRangeLimits={priceRangeLimits}
            />
          </div>

          {/* Right Column: Results & Sorting */}
          <div className="lg:col-span-8 space-y-5">
            {/* Top Results Bar with Sort Selector */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Available {activeTab === 'flight' ? 'Flights' : activeTab === 'hotel' ? 'Hotels' : 'Buses'}
                </span>
                <h2 className="text-lg font-black text-slate-900">
                  {activeTab === 'flight' && `${filteredFlights.length} Flights Available`}
                  {activeTab === 'hotel' && `${filteredHotels.length} Luxury & Budget Hotels`}
                  {activeTab === 'bus' && `${filteredBuses.length} Express Buses Found`}
                </h2>
              </div>

              {/* Sorting Switcher */}
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-slate-400 flex items-center gap-1">
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  <span>Sort by:</span>
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  id="sort-by-select"
                  className="bg-slate-100 font-bold text-slate-800 py-1.5 px-3 rounded-xl border-0 outline-none cursor-pointer hover:bg-slate-200 transition"
                >
                  <option value="cheapest">Cheapest First (Sasta)</option>
                  <option value="expensive">Expensive / Luxury First</option>
                  {activeTab === 'flight' && <option value="fastest">Fastest Travel Time</option>}
                  {activeTab !== 'flight' && <option value="rating">Highest User Rating</option>}
                </select>
              </div>
            </div>

            {/* Quick Sasta / Luxury Notice Banner */}
            <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-transparent border border-orange-200 rounded-2xl p-3.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-orange-950 font-medium">
                <Zap className="w-4 h-4 text-orange-500 fill-current" />
                <span>
                  Showing verified fares with <strong>instant loyalty point earnings</strong> and live airline/operator seat availability.
                </span>
              </div>
              <span className="hidden sm:inline font-bold text-orange-700 bg-orange-100 px-2.5 py-1 rounded-lg">
                Best Rate Guaranteed
              </span>
            </div>

            {/* Results List */}
            <div className="space-y-4">
              {/* FLIGHTS LIST */}
              {activeTab === 'flight' && (
                filteredFlights.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
                    <Plane className="w-12 h-12 text-slate-300 mx-auto" />
                    <h3 className="text-base font-extrabold text-slate-800">No flights matched your filter criteria</h3>
                    <p className="text-xs text-slate-500">Try loosening your price range or clearing airline filters.</p>
                    <button
                      onClick={handleResetFilters}
                      className="text-xs font-bold text-orange-600 hover:underline"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  filteredFlights.map((flight) => (
                    <FlightCard
                      key={flight.id}
                      flight={flight}
                      currency={currency}
                      onSelectFlight={handleSelectFlight}
                    />
                  ))
                )
              )}

              {/* HOTELS LIST */}
              {activeTab === 'hotel' && (
                filteredHotels.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
                    <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
                    <h3 className="text-base font-extrabold text-slate-800">No hotels found matching criteria</h3>
                    <p className="text-xs text-slate-500">Try adjusting your budget or star rating filters.</p>
                    <button
                      onClick={handleResetFilters}
                      className="text-xs font-bold text-orange-600 hover:underline"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  filteredHotels.map((hotel) => (
                    <HotelCard
                      key={hotel.id}
                      hotel={hotel}
                      currency={currency}
                      onSelectHotel={handleSelectHotel}
                    />
                  ))
                )
              )}

              {/* BUSES LIST */}
              {activeTab === 'bus' && (
                filteredBuses.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
                    <BusFront className="w-12 h-12 text-slate-300 mx-auto" />
                    <h3 className="text-base font-extrabold text-slate-800">No buses found for this route</h3>
                    <p className="text-xs text-slate-500">Try switching operators or removing price limits.</p>
                    <button
                      onClick={handleResetFilters}
                      className="text-xs font-bold text-orange-600 hover:underline"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  filteredBuses.map((bus) => (
                    <BusCard
                      key={bus.id}
                      bus={bus}
                      currency={currency}
                      onOpenSeatPicker={(b) => setActiveBusForSeatPicker(b)}
                    />
                  ))
                )
              )}
            </div>
          </div>
        </div>
      </main>

      {/* 4. MODALS */}

      {/* Bus Seat Selection Modal */}
      {activeBusForSeatPicker && (
        <BusSeatPickerModal
          bus={activeBusForSeatPicker}
          currency={currency}
          onClose={() => setActiveBusForSeatPicker(null)}
          onConfirmSeats={handleConfirmBusSeats}
        />
      )}

      {/* Booking & Payment Wizard Modal */}
      {activeCheckout && (
        <BookingModal
          bookingType={activeCheckout.type}
          selectedFlight={activeCheckout.flight}
          selectedHotel={activeCheckout.hotel}
          selectedBus={activeCheckout.bus}
          currency={currency}
          loyaltyProfile={loyaltyProfile}
          onClose={() => setActiveCheckout(null)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {/* My Bookings Modal */}
      {isBookingsOpen && (
        <MyBookingsModal
          bookings={myBookings}
          currency={currency}
          onClose={() => setIsBookingsOpen(false)}
          onCancelBooking={handleCancelBooking}
        />
      )}

      {/* Loyalty Points Hub Modal */}
      {isLoyaltyOpen && (
        <LoyaltyHubModal
          loyaltyProfile={loyaltyProfile}
          currency={currency}
          onClose={() => setIsLoyaltyOpen(false)}
          onRedeemReward={handleRedeemReward}
        />
      )}

      {/* 5. FOOTER */}
      <Footer />
    </div>
  );
}
