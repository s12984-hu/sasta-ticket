export type ServiceType = 'flight' | 'hotel' | 'bus';
export type PriceTierFilter = 'all' | 'cheap' | 'luxury';
export type FlightClass = 'economy' | 'flexi' | 'business';
export type Currency = 'PKR' | 'USD' | 'AED' | 'SAR' | 'GBP';
export type SortOption = 'cheapest' | 'expensive' | 'fastest' | 'rating';

export type PaymentMethodType = 'card' | 'easypaisa' | 'jazzcash' | 'bank_transfer' | 'unionpay' | 'paylater';

export interface FlightFareTier {
  id: string;
  name: string;
  cabin: 'Economy Sasta' | 'Economy Flex' | 'Business Club';
  pricePKR: number;
  baggage: string;
  handBaggage: string;
  refundable: boolean;
  seatSelection: boolean;
  meal: string;
  changesAllowed: string;
}

export interface FlightItem {
  id: string;
  airline: string;
  airlineCode: string;
  airlineLogo: string;
  flightNumber: string;
  aircraft: string;
  origin: string;
  originCity: string;
  originAirport: string;
  destination: string;
  destinationCity: string;
  destinationAirport: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  stopDetails?: string;
  pricePKR: number;
  tier: 'cheap' | 'luxury';
  pointsEarned: number;
  seatsLeft: number;
  refundable: boolean;
  mealsIncluded: boolean;
  wifiIncluded: boolean;
  features: string[];
  fareTiers: FlightFareTier[];
}

export interface HotelRoomType {
  id: string;
  name: string;
  pricePKR: number;
  capacity: string;
  bedType: string;
  roomSize: string;
  includesBreakfast: boolean;
  freeCancellation: boolean;
  amenities: string[];
  remainingRooms: number;
}

export interface HotelItem {
  id: string;
  name: string;
  location: string;
  city: string;
  area: string;
  starRating: number;
  reviewRating: number;
  reviewCount: number;
  reviewText: string;
  image: string;
  gallery: string[];
  amenities: string[];
  distanceToCenter: string;
  tier: 'cheap' | 'luxury';
  pointsEarned: number;
  featuredBadge?: string;
  roomTypes: HotelRoomType[];
}

export interface BusSeat {
  seatNumber: number;
  row: number;
  col: number;
  isOccupied: boolean;
  isFemaleOnly?: boolean;
  isWindow?: boolean;
  tier: 'standard' | 'sleeper' | 'vip';
  priceOffsetPKR?: number;
}

export interface BusItem {
  id: string;
  operator: string;
  operatorLogo: string;
  busType: string;
  origin: string;
  destination: string;
  departureTerminal: string;
  arrivalTerminal: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  pricePKR: number;
  tier: 'cheap' | 'luxury';
  seatsAvailable: number;
  totalSeats: number;
  pointsEarned: number;
  amenities: string[];
  features: string[];
  rating: number;
  seatLayout: BusSeat[];
}

export interface PassengerInfo {
  title: string;
  firstName: string;
  lastName: string;
  cnicOrPassport: string;
  email: string;
  phone: string;
  gender?: string;
  dob?: string;
  nationality?: string;
  seatPreference?: string;
  mealPreference?: string;
}

export interface BookingRecord {
  id: string;
  pnr: string;
  bookingType: 'flight' | 'hotel' | 'bus';
  serviceTitle: string;
  serviceSubtitle: string;
  serviceImage: string;
  bookingDate: string;
  travelDate: string;
  passenger: PassengerInfo;
  flightDetails?: FlightItem;
  hotelDetails?: HotelItem;
  busDetails?: BusItem;
  busSeats?: number[];
  tierName?: string;
  paymentMethod: PaymentMethodType;
  totalAmountPKR: number;
  pointsUsed: number;
  pointsEarned: number;
  status: 'CONFIRMED' | 'CANCELLED';
}

export interface LoyaltyProfile {
  pointsBalance: number;
  tier: 'Silver' | 'Gold' | 'Platinum';
  lifetimeEarned: number;
  memberSince: string;
  history: {
    id: string;
    date: string;
    type: 'EARNED' | 'REDEEMED';
    points: number;
    description: string;
    bookingRef?: string;
  }[];
}

export interface SearchParams {
  serviceType: ServiceType;
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  tripType: 'one-way' | 'round-trip';
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  flightClass: FlightClass;
  hotelRooms: number;
  hotelGuests: number;
}
