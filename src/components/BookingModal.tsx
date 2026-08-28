import React, { useState } from 'react';
import { 
  X, Check, ShieldCheck, CreditCard, Wallet, Smartphone, Building, 
  Sparkles, Ticket, Download, Printer, Calendar, Clock, MapPin, 
  Luggage, User, Mail, Phone, Lock, ChevronRight, ArrowRight, Award,
  AlertCircle, Gift
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  FlightItem, FlightFareTier, HotelItem, HotelRoomType, BusItem, 
  PassengerInfo, PaymentMethodType, BookingRecord, LoyaltyProfile, Currency 
} from '../types/travel';
import { formatPrice, generatePNR, calculatePointsDiscount, calculatePointsEarned } from '../utils/formatters';
import { PROMO_CODES } from '../data/mockTravelData';

interface BookingModalProps {
  bookingType: 'flight' | 'hotel' | 'bus';
  selectedFlight?: { item: FlightItem; tier: FlightFareTier };
  selectedHotel?: { item: HotelItem; room: HotelRoomType };
  selectedBus?: { item: BusItem; seats: number[]; totalSeatsPrice: number };
  currency: Currency;
  loyaltyProfile: LoyaltyProfile;
  onClose: () => void;
  onBookingSuccess: (booking: BookingRecord, pointsEarned: number, pointsSpent: number) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  bookingType,
  selectedFlight,
  selectedHotel,
  selectedBus,
  currency,
  loyaltyProfile,
  onClose,
  onBookingSuccess,
}) => {
  // Wizard steps: 1 = Details, 2 = Add-ons & Points, 3 = Payment Gateway, 4 = Confirmed E-Ticket
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);

  // Passenger & Guest Info
  const [passenger, setPassenger] = useState<PassengerInfo>({
    title: 'Mr',
    firstName: 'Muhammad',
    lastName: 'Ali',
    cnicOrPassport: '42101-7894561-3',
    email: 'm.ali@example.com',
    phone: '+92 300 1234567',
    gender: 'male',
    dob: '1995-04-12',
    nationality: 'Pakistani',
    seatPreference: 'Window',
    mealPreference: 'Halal Standard'
  });

  // Add-ons
  const [addOns, setAddOns] = useState({
    insurance: true, // PKR 450
    extraLuggage: false, // PKR 1200
    fastTrackLounge: false, // PKR 2500
    smsAlerts: true // PKR 50
  });

  // Loyalty Points & Promo Codes
  const [redeemPoints, setRedeemPoints] = useState<number>(0);
  const [promoCodeInput, setPromoCodeInput] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPKR: number } | null>(null);
  const [promoError, setPromoError] = useState<string>('');

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardHolder, setCardHolder] = useState('MUHAMMAD ALI');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('888');
  const [mobileWalletNumber, setMobileWalletNumber] = useState('03001234567');
  const [selectedBank, setSelectedBank] = useState('Meezan Bank');

  // Generated Confirmed Booking Record
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);

  // Base price calculation
  let basePricePKR = 0;
  let titleName = '';
  let subDescription = '';

  if (bookingType === 'flight' && selectedFlight) {
    basePricePKR = selectedFlight.tier.pricePKR;
    titleName = `${selectedFlight.item.airline} (${selectedFlight.item.flightNumber})`;
    subDescription = `${selectedFlight.item.originCity} ➔ ${selectedFlight.item.destinationCity} • ${selectedFlight.tier.name}`;
  } else if (bookingType === 'hotel' && selectedHotel) {
    basePricePKR = selectedHotel.room.pricePKR;
    titleName = selectedHotel.item.name;
    subDescription = `${selectedHotel.room.name} • 1 Night Stay • ${selectedHotel.item.city}`;
  } else if (bookingType === 'bus' && selectedBus) {
    basePricePKR = selectedBus.totalSeatsPrice;
    titleName = `${selectedBus.item.operator} (${selectedBus.item.busType})`;
    subDescription = `${selectedBus.item.origin} ➔ ${selectedBus.item.destination} • Seats: ${selectedBus.seats.join(', ')}`;
  }

  // Calculate Add-on totals
  const addOnsTotalPKR =
    (addOns.insurance ? 450 : 0) +
    (addOns.extraLuggage ? 1200 : 0) +
    (addOns.fastTrackLounge ? 2500 : 0) +
    (addOns.smsAlerts ? 50 : 0);

  // Calculate Loyalty Discount
  const loyaltyDiscountPKR = calculatePointsDiscount(redeemPoints);
  const promoDiscountPKR = appliedPromo ? appliedPromo.discountPKR : 0;

  // Final Total
  const finalTotalPKR = Math.max(
    0,
    basePricePKR + addOnsTotalPKR - loyaltyDiscountPKR - promoDiscountPKR
  );

  const pointsEarned = calculatePointsEarned(finalTotalPKR);

  // Handle Promo apply
  const handleApplyPromo = () => {
    setPromoError('');
    const code = promoCodeInput.trim().toUpperCase();
    if (!code) return;

    if (PROMO_CODES[code]) {
      const deal = PROMO_CODES[code];
      if (basePricePKR >= deal.minSpendPKR) {
        setAppliedPromo({ code, discountPKR: deal.discountPKR });
      } else {
        setPromoError(`Minimum spend of PKR ${deal.minSpendPKR.toLocaleString()} required for this code.`);
      }
    } else {
      setPromoError('Invalid coupon code. Try SASTA1000 or SUPERFLY.');
    }
  };

  // Submit and Complete Payment
  const handleProcessPayment = () => {
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);
      const generatedPnr = generatePNR();

      const newBooking: BookingRecord = {
        id: `bk-${Date.now()}`,
        pnr: generatedPnr,
        bookingType,
        serviceTitle: titleName,
        serviceSubtitle: subDescription,
        serviceImage:
          bookingType === 'flight'
            ? selectedFlight?.item.airlineLogo || ''
            : bookingType === 'hotel'
            ? selectedHotel?.item.image || ''
            : selectedBus?.item.operatorLogo || '',
        bookingDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        travelDate: 'Tomorrow, Aug 29, 2026',
        passenger,
        flightDetails: selectedFlight?.item,
        hotelDetails: selectedHotel?.item,
        busDetails: selectedBus?.item,
        busSeats: selectedBus?.seats,
        tierName:
          bookingType === 'flight'
            ? selectedFlight?.tier.name
            : bookingType === 'hotel'
            ? selectedHotel?.room.name
            : selectedBus?.item.busType,
        paymentMethod,
        totalAmountPKR: finalTotalPKR,
        pointsUsed: redeemPoints,
        pointsEarned,
        status: 'CONFIRMED'
      };

      setConfirmedBooking(newBooking);
      setCurrentStep(4);
      onBookingSuccess(newBooking, pointsEarned, redeemPoints);

      // Trigger festive celebration confetti!
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden border border-slate-100 my-6">
        {/* Header Strip */}
        <div className="bg-[#003580] text-white p-5 sm:p-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-orange-500 text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase">
                Secure Checkout
              </span>
              <span className="text-xs text-blue-200">
                Step {currentStep} of 4 • 256-Bit SSL Encrypted
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              {currentStep === 4 ? '🎉 Booking Confirmed & E-Ticket' : `Book ${titleName}`}
            </h3>
          </div>

          <button
            onClick={onClose}
            id="close-booking-modal-btn"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-Step Indicator Bar */}
        {currentStep < 4 && (
          <div className="grid grid-cols-3 border-b border-slate-100 bg-slate-50 text-xs font-bold">
            <button
              onClick={() => setCurrentStep(1)}
              className={`py-3 text-center flex items-center justify-center gap-1.5 transition ${
                currentStep === 1
                  ? 'bg-white text-orange-600 border-b-2 border-orange-500'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-black">
                1
              </span>
              <span>Passenger Details</span>
            </button>

            <button
              onClick={() => setCurrentStep(2)}
              className={`py-3 text-center flex items-center justify-center gap-1.5 transition ${
                currentStep === 2
                  ? 'bg-white text-orange-600 border-b-2 border-orange-500'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-black">
                2
              </span>
              <span>Loyalty & Add-ons</span>
            </button>

            <button
              onClick={() => setCurrentStep(3)}
              className={`py-3 text-center flex items-center justify-center gap-1.5 transition ${
                currentStep === 3
                  ? 'bg-white text-orange-600 border-b-2 border-orange-500'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-black">
                3
              </span>
              <span>Payment Gateway</span>
            </button>
          </div>
        )}

        {/* MODAL BODY BY STEP */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* ================= STEP 1: PASSENGER / GUEST DETAILS ================= */}
          {currentStep === 1 && (
            <div className="space-y-6">
              {/* Itinerary Snapshot */}
              <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-sm text-blue-950">{titleName}</h4>
                  <p className="text-xs text-blue-800 font-medium">{subDescription}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Base Fare</span>
                  <span className="text-lg font-black text-blue-950">
                    {formatPrice(basePricePKR, currency)}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-orange-500" />
                  <span>Primary Traveler / Guest Details</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                  {/* Title */}
                  <div className="sm:col-span-3">
                    <label className="block text-xs font-bold text-slate-500 mb-1">Title</label>
                    <select
                      value={passenger.title}
                      onChange={(e) => setPassenger({ ...passenger, title: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 outline-none"
                    >
                      <option value="Mr">Mr.</option>
                      <option value="Mrs">Mrs.</option>
                      <option value="Ms">Ms.</option>
                      <option value="Dr">Dr.</option>
                    </select>
                  </div>

                  {/* First / Given Name */}
                  <div className="sm:col-span-4">
                    <label className="block text-xs font-bold text-slate-500 mb-1">First / Given Name *</label>
                    <input
                      type="text"
                      value={passenger.firstName}
                      onChange={(e) => setPassenger({ ...passenger, firstName: e.target.value })}
                      id="passenger-firstname-input"
                      placeholder="e.g. Muhammad"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 outline-none"
                    />
                  </div>

                  {/* Last / Surname */}
                  <div className="sm:col-span-5">
                    <label className="block text-xs font-bold text-slate-500 mb-1">Last / Surname *</label>
                    <input
                      type="text"
                      value={passenger.lastName}
                      onChange={(e) => setPassenger({ ...passenger, lastName: e.target.value })}
                      id="passenger-lastname-input"
                      placeholder="e.g. Ali"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 outline-none"
                    />
                  </div>

                  {/* CNIC or Passport */}
                  <div className="sm:col-span-6">
                    <label className="block text-xs font-bold text-slate-500 mb-1">
                      CNIC / Passport Number * (As on Official ID)
                    </label>
                    <input
                      type="text"
                      value={passenger.cnicOrPassport}
                      onChange={(e) => setPassenger({ ...passenger, cnicOrPassport: e.target.value })}
                      id="passenger-cnic-input"
                      placeholder="42101-XXXXXXX-X or Passport"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 outline-none font-mono"
                    />
                  </div>

                  {/* Date of Birth */}
                  <div className="sm:col-span-6">
                    <label className="block text-xs font-bold text-slate-500 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      value={passenger.dob}
                      onChange={(e) => setPassenger({ ...passenger, dob: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div className="sm:col-span-6">
                    <label className="block text-xs font-bold text-slate-500 mb-1 flex items-center gap-1">
                      <Mail className="w-3 h-3 text-slate-400" />
                      <span>Email for E-Ticket Delivery *</span>
                    </label>
                    <input
                      type="email"
                      value={passenger.email}
                      onChange={(e) => setPassenger({ ...passenger, email: e.target.value })}
                      id="passenger-email-input"
                      placeholder="user@domain.com"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 outline-none"
                    />
                  </div>

                  {/* Phone */}
                  <div className="sm:col-span-6">
                    <label className="block text-xs font-bold text-slate-500 mb-1 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slate-400" />
                      <span>WhatsApp / Mobile Number *</span>
                    </label>
                    <input
                      type="tel"
                      value={passenger.phone}
                      onChange={(e) => setPassenger({ ...passenger, phone: e.target.value })}
                      id="passenger-phone-input"
                      placeholder="+92 300 XXXXXXX"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Step 1 Next Button */}
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  id="step1-continue-btn"
                  className="py-3 px-8 rounded-2xl bg-[#003580] hover:bg-blue-900 text-white font-extrabold text-sm shadow-md flex items-center gap-2 hover:scale-105 transition"
                >
                  <span>Continue to Add-ons</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 2: ADD-ONS & LOYALTY POINTS ================= */}
          {currentStep === 2 && (
            <div className="space-y-6">
              {/* 1. LOYALTY POINTS REDEMPTION SLIDER */}
              <div className="bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/5 border border-amber-300 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-sm">
                      <Award className="w-4 h-4 fill-current" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">
                        Redeem Sasta Loyalty Points
                      </h4>
                      <p className="text-xs text-slate-500">
                        Available Balance: <strong className="text-amber-700">{loyaltyProfile.pointsBalance.toLocaleString()} Points</strong> (1,000 pts = PKR 500)
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] font-bold text-emerald-600 block">
                      - {formatPrice(loyaltyDiscountPKR, currency)} Discount
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <input
                    type="range"
                    min="0"
                    max={loyaltyProfile.pointsBalance}
                    step="100"
                    value={redeemPoints}
                    onChange={(e) => setRedeemPoints(Number(e.target.value))}
                    id="loyalty-points-slider"
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-xs font-bold text-slate-600">
                    <span>Using: {redeemPoints.toLocaleString()} Points</span>
                    <span>Max: {loyaltyProfile.pointsBalance.toLocaleString()} Pts</span>
                  </div>
                </div>
              </div>

              {/* 2. PROMO CODE BOX */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-orange-500" />
                  <span>Have a Promo Coupon?</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    placeholder="Enter code (e.g. SASTA1000)"
                    id="promo-code-input"
                    className="flex-1 bg-white border border-slate-300 focus:border-blue-600 rounded-xl px-3.5 py-2 text-xs font-bold uppercase tracking-wider outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    id="apply-promo-btn"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs px-5 py-2 rounded-xl transition"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Coupon '{appliedPromo.code}' applied! Saved {formatPrice(appliedPromo.discountPKR, currency)}.
                  </p>
                )}
                {promoError && (
                  <p className="text-xs text-red-600 font-bold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {promoError}
                  </p>
                )}
              </div>

              {/* 3. OPTIONAL VALUE ADD-ONS */}
              <div className="space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-slate-900">
                  Select Travel Add-ons
                </h4>

                <div className="space-y-2.5">
                  {/* Insurance */}
                  <label className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={addOns.insurance}
                        onChange={(e) => setAddOns({ ...addOns, insurance: e.target.checked })}
                        className="w-4 h-4 rounded text-blue-600 accent-blue-600 cursor-pointer"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">
                          Comprehensive Travel Protection & Baggage Loss Insurance
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Covers flight delays, medical emergency & lost luggage up to PKR 250,000
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-blue-950">+PKR 450</span>
                  </label>

                  {/* Extra Baggage */}
                  <label className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={addOns.extraLuggage}
                        onChange={(e) => setAddOns({ ...addOns, extraLuggage: e.target.checked })}
                        className="w-4 h-4 rounded text-blue-600 accent-blue-600 cursor-pointer"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">
                          +10kg Extra Baggage Allowance
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Pre-book luggage at 40% discounted airport counter rate
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-blue-950">+PKR 1,200</span>
                  </label>

                  {/* Airport VIP Lounge */}
                  <label className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={addOns.fastTrackLounge}
                        onChange={(e) => setAddOns({ ...addOns, fastTrackLounge: e.target.checked })}
                        className="w-4 h-4 rounded text-blue-600 accent-blue-600 cursor-pointer"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">
                          Airport CIP Executive Lounge Access
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Complimentary buffet dining, Wi-Fi, and priority security clearance
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-blue-950">+PKR 2,500</span>
                  </label>
                </div>
              </div>

              {/* Price Summary Bar */}
              <div className="bg-slate-100 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-500 block">Updated Total Payable</span>
                  <span className="text-2xl font-black text-blue-950">
                    {formatPrice(finalTotalPKR, currency)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="py-3 px-4 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-white"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    id="step2-continue-btn"
                    className="py-3 px-8 rounded-2xl bg-[#003580] hover:bg-blue-900 text-white font-extrabold text-sm shadow-md flex items-center gap-2 hover:scale-105 transition"
                  >
                    <span>Go to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 3: MULTI-CHANNEL PAYMENT GATEWAY ================= */}
          {currentStep === 3 && (
            <div className="space-y-6">
              {/* Payment Methods Grid */}
              <div className="space-y-3">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 block">
                  Select Payment Method
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {/* Credit / Debit Card */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    id="pay-method-card"
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                      paymentMethod === 'card'
                        ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-blue-700 mb-2" />
                    <span className="font-extrabold text-xs text-slate-900 block">Credit / Debit</span>
                    <span className="text-[10px] text-slate-500">Visa, Master, PayPak</span>
                  </button>

                  {/* Easypaisa */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('easypaisa')}
                    id="pay-method-easypaisa"
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                      paymentMethod === 'easypaisa'
                        ? 'border-emerald-600 bg-emerald-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-emerald-600 mb-2" />
                    <span className="font-extrabold text-xs text-slate-900 block">Easypaisa</span>
                    <span className="text-[10px] text-slate-500">Mobile Wallet OTP</span>
                  </button>

                  {/* JazzCash */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('jazzcash')}
                    id="pay-method-jazzcash"
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                      paymentMethod === 'jazzcash'
                        ? 'border-red-600 bg-red-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Wallet className="w-5 h-5 text-red-600 mb-2" />
                    <span className="font-extrabold text-xs text-slate-900 block">JazzCash</span>
                    <span className="text-[10px] text-slate-500">Instant MPIN Push</span>
                  </button>

                  {/* 1LINK Bank */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank_transfer')}
                    id="pay-method-bank"
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                      paymentMethod === 'bank_transfer'
                        ? 'border-amber-600 bg-amber-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Building className="w-5 h-5 text-amber-600 mb-2" />
                    <span className="font-extrabold text-xs text-slate-900 block">1LINK Net Banking</span>
                    <span className="text-[10px] text-slate-500">All Major Banks</span>
                  </button>
                </div>
              </div>

              {/* Payment Specific Form */}
              <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 space-y-4">
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    {/* Visual Card Mock */}
                    <div className="max-w-xs mx-auto bg-gradient-to-tr from-slate-900 via-blue-950 to-slate-800 text-white rounded-2xl p-4 shadow-xl border border-slate-700 font-mono">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs tracking-widest text-orange-400 font-bold">SASTATICKET SECURE</span>
                        <CreditCard className="w-6 h-6 text-slate-300" />
                      </div>
                      <div className="text-base tracking-widest font-black mb-3">
                        {cardNumber}
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-300">
                        <div>
                          <span className="block text-[8px] text-slate-400">CARD HOLDER</span>
                          <span className="font-bold">{cardHolder}</span>
                        </div>
                        <div>
                          <span className="block text-[8px] text-slate-400">EXPIRES</span>
                          <span className="font-bold">{cardExpiry}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="col-span-2">
                        <label className="block font-bold text-slate-600 mb-1">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="4242 4242 4242 4242"
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 font-mono font-bold"
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-2">
                        <label className="block font-bold text-slate-600 mb-1">Name on Card</label>
                        <input
                          type="text"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-600 mb-1">Expiry</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 font-mono font-bold text-center"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-600 mb-1">CVV / CVC</label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          maxLength={4}
                          placeholder="123"
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 font-mono font-bold text-center"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'easypaisa' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-600">
                      Enter your 11-digit Easypaisa registered mobile number. You will receive an instant approval push on your mobile phone.
                    </p>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Easypaisa Mobile Account</label>
                      <input
                        type="tel"
                        value={mobileWalletNumber}
                        onChange={(e) => setMobileWalletNumber(e.target.value)}
                        placeholder="03001234567"
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'jazzcash' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-600">
                      Enter your JazzCash wallet number. You will receive an MPIN prompt on your handset to approve the payment.
                    </p>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">JazzCash Wallet Number</label>
                      <input
                        type="tel"
                        value={mobileWalletNumber}
                        onChange={(e) => setMobileWalletNumber(e.target.value)}
                        placeholder="03001234567"
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'bank_transfer' && (
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-600 mb-1">Select Your Bank</label>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-bold text-slate-900"
                    >
                      <option value="Meezan Bank">Meezan Bank Ltd</option>
                      <option value="Habib Bank Ltd (HBL)">Habib Bank Ltd (HBL)</option>
                      <option value="Bank Alfalah">Bank Alfalah</option>
                      <option value="United Bank Ltd (UBL)">United Bank Ltd (UBL)</option>
                      <option value="Standard Chartered">Standard Chartered Pakistan</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Order Final Summary */}
              <div className="bg-slate-100 p-4 rounded-2xl space-y-2 text-xs">
                <div className="flex justify-between font-medium text-slate-600">
                  <span>Base Booking Amount:</span>
                  <span>{formatPrice(basePricePKR, currency)}</span>
                </div>
                {addOnsTotalPKR > 0 && (
                  <div className="flex justify-between font-medium text-slate-600">
                    <span>Add-on Services:</span>
                    <span>+{formatPrice(addOnsTotalPKR, currency)}</span>
                  </div>
                )}
                {loyaltyDiscountPKR > 0 && (
                  <div className="flex justify-between font-bold text-amber-700">
                    <span>Points Redeemed ({redeemPoints} pts):</span>
                    <span>-{formatPrice(loyaltyDiscountPKR, currency)}</span>
                  </div>
                )}
                {promoDiscountPKR > 0 && (
                  <div className="flex justify-between font-bold text-emerald-700">
                    <span>Coupon Promo Discount:</span>
                    <span>-{formatPrice(promoDiscountPKR, currency)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                  <div>
                    <span className="font-extrabold text-sm text-slate-900 block">Total Payable Now:</span>
                    <span className="text-[10px] text-emerald-600 font-bold">
                      ⭐ You will earn +{pointsEarned} Loyalty Points!
                    </span>
                  </div>
                  <span className="text-2xl font-black text-blue-950">
                    {formatPrice(finalTotalPKR, currency)}
                  </span>
                </div>
              </div>

              {/* Submit Payment CTA */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="py-3 px-4 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-white"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleProcessPayment}
                  id="pay-confirm-btn"
                  disabled={isProcessingPayment}
                  className="py-3.5 px-8 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm shadow-lg shadow-orange-500/30 flex items-center gap-2 hover:scale-105 transition active:scale-95"
                >
                  {isProcessingPayment ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Authorizing Payment...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      <span>Confirm & Pay {formatPrice(finalTotalPKR, currency)}</span>
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 4: CONFIRMATION CELEBRATION & E-TICKET ================= */}
          {currentStep === 4 && confirmedBooking && (
            <div className="space-y-6">
              {/* Green Success Banner */}
              <div className="bg-emerald-600 text-white p-6 rounded-3xl text-center space-y-2 shadow-lg">
                <div className="w-14 h-14 bg-white text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="text-2xl font-black">Booking Confirmed!</h3>
                <p className="text-xs text-emerald-100 max-w-md mx-auto">
                  Your electronic ticket has been officially issued by SastaTicket. E-Ticket & SMS receipt sent to <strong>{passenger.email}</strong>.
                </p>
                <div className="inline-block bg-emerald-700/80 border border-emerald-400/50 px-4 py-1.5 rounded-full text-xs font-mono font-bold mt-2">
                  PNR Reference: <span className="text-yellow-300 text-sm tracking-wider">{confirmedBooking.pnr}</span>
                </div>
              </div>

              {/* Printable Boarding Pass / E-Ticket Card */}
              <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-3xl p-6 relative">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black">
                      ST
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">SASTATICKET OFFICIAL E-TICKET</h4>
                      <p className="text-[11px] text-slate-400">Issued on {confirmedBooking.bookingDate}</p>
                    </div>
                  </div>
                  <div className="text-right font-mono text-xs">
                    <span className="text-slate-400 block text-[10px]">STATUS</span>
                    <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      ● CONFIRMED & TICKETED
                    </span>
                  </div>
                </div>

                {/* Details Section */}
                <div className="py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Passenger / Guest</span>
                    <span className="font-bold text-slate-900">{passenger.title} {passenger.firstName} {passenger.lastName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">CNIC / ID</span>
                    <span className="font-bold text-slate-900 font-mono">{passenger.cnicOrPassport}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Service / Operator</span>
                    <span className="font-bold text-slate-900">{confirmedBooking.serviceTitle}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Tier / Room / Seat</span>
                    <span className="font-bold text-slate-900">{confirmedBooking.tierName}</span>
                  </div>
                </div>

                {/* QR Code Simulation & Barcode */}
                <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-white border border-slate-300 p-1 rounded-lg flex items-center justify-center">
                      <div className="w-full h-full bg-slate-900 rounded grid grid-cols-3 gap-0.5 p-1">
                        <div className="bg-white" />
                        <div className="bg-slate-900" />
                        <div className="bg-white" />
                        <div className="bg-slate-900" />
                        <div className="bg-white" />
                        <div className="bg-slate-900" />
                        <div className="bg-white" />
                        <div className="bg-white" />
                        <div className="bg-white" />
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-mono block">Scan for airport / terminal gate check-in</span>
                      <span className="text-xs font-mono font-bold text-slate-700">{confirmedBooking.pnr}-VERIFIED</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Paid</span>
                    <span className="text-xl font-black text-blue-950">
                      {formatPrice(confirmedBooking.totalAmountPKR, currency)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Print, Download, Close */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Boarding Pass</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => alert(`E-Ticket ${confirmedBooking.pnr}.pdf has been downloaded to your device!`)}
                    className="py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  id="finish-booking-btn"
                  className="py-2.5 px-8 rounded-xl bg-[#003580] hover:bg-blue-900 text-white font-extrabold text-xs shadow-md transition"
                >
                  Done & Back to Home
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
