import { FlightItem, HotelItem, BusItem, BusSeat } from '../types/travel';

export const POPULAR_ORIGINS_FLIGHT = [
  'Karachi (KHI)',
  'Lahore (LHE)',
  'Islamabad (ISB)',
  'Peshawar (PEW)',
  'Multan (MUX)',
  'Sialkot (SKT)',
  'Dubai (DXB)',
  'Jeddah (JED)',
  'Doha (DOH)',
  'London (LHR)'
];

export const POPULAR_DESTINATIONS_FLIGHT = [
  'Lahore (LHE)',
  'Karachi (KHI)',
  'Islamabad (ISB)',
  'Dubai (DXB)',
  'Jeddah (JED)',
  'Riyadh (RUH)',
  'Doha (DOH)',
  'Istanbul (IST)',
  'London (LHR)',
  'Baku (GYD)'
];

export const POPULAR_HOTEL_CITIES = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'Murree & Bhurban',
  'Hunza & Gilgit',
  'Skardu',
  'Dubai, UAE',
  'Makkah, Saudi Arabia',
  'Medina, Saudi Arabia',
  'Baku, Azerbaijan'
];

export const POPULAR_BUS_CITIES = [
  'Lahore',
  'Islamabad / Rawalpindi',
  'Karachi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Murree',
  'Sialkot',
  'Bahawalpur',
  'Swat'
];

export const MOCK_FLIGHTS: FlightItem[] = [
  // 1. PIA Domestic Cheap
  {
    id: 'fl-pia-302',
    airline: 'PIA (Pakistan Int. Airlines)',
    airlineCode: 'PK',
    airlineLogo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=100&auto=format&fit=crop&q=80',
    flightNumber: 'PK-302',
    aircraft: 'Airbus A320-200',
    origin: 'KHI',
    originCity: 'Karachi',
    originAirport: 'Jinnah International Airport',
    destination: 'LHE',
    destinationCity: 'Lahore',
    destinationAirport: 'Allama Iqbal International Airport',
    departureTime: '07:00 AM',
    arrivalTime: '08:45 AM',
    duration: '1h 45m',
    stops: 0,
    pricePKR: 16500,
    tier: 'cheap',
    pointsEarned: 165,
    seatsLeft: 9,
    refundable: true,
    mealsIncluded: true,
    wifiIncluded: false,
    features: ['20kg Checked Baggage', 'Complimentary Hot Meal', 'Standard Seating', 'Free Web Check-in'],
    fareTiers: [
      {
        id: 'pk302-sasta',
        name: 'Economy Sasta Saver',
        cabin: 'Economy Sasta',
        pricePKR: 16500,
        baggage: '20 kg Checked Baggage',
        handBaggage: '7 kg Hand Baggage',
        refundable: true,
        seatSelection: false,
        meal: 'Complimentary Snack Box',
        changesAllowed: 'Fee applies (PKR 2,500)'
      },
      {
        id: 'pk302-flex',
        name: 'Economy Flexi Plus',
        cabin: 'Economy Flex',
        pricePKR: 21500,
        baggage: '30 kg Checked Baggage',
        handBaggage: '10 kg Hand Baggage',
        refundable: true,
        seatSelection: true,
        meal: 'Hot Meal + Choice of Beverage',
        changesAllowed: '1 Free Change permitted'
      },
      {
        id: 'pk302-exec',
        name: 'Executive Economy Club',
        cabin: 'Business Club',
        pricePKR: 34000,
        baggage: '40 kg Baggage + Priority Tag',
        handBaggage: '12 kg Hand Baggage',
        refundable: true,
        seatSelection: true,
        meal: 'Premium Multi-course Dining',
        changesAllowed: 'Free Unlimited Changes + Lounge Access'
      }
    ]
  },
  // 2. AirSial Domestic Cheap
  {
    id: 'fl-sial-104',
    airline: 'AirSial',
    airlineCode: 'PF',
    airlineLogo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&auto=format&fit=crop&q=80',
    flightNumber: 'PF-122',
    aircraft: 'Airbus A320ceo',
    origin: 'KHI',
    originCity: 'Karachi',
    originAirport: 'Jinnah International Airport',
    destination: 'LHE',
    destinationCity: 'Lahore',
    destinationAirport: 'Allama Iqbal International Airport',
    departureTime: '11:15 AM',
    arrivalTime: '01:05 PM',
    duration: '1h 50m',
    stops: 0,
    pricePKR: 15800,
    tier: 'cheap',
    pointsEarned: 158,
    seatsLeft: 4,
    refundable: false,
    mealsIncluded: true,
    wifiIncluded: false,
    features: ['Lowest Price Guarantee', '20kg Luggage Included', 'Fresh Warm Meal', 'Fast On-time Boarding'],
    fareTiers: [
      {
        id: 'pf122-saver',
        name: 'Sial Super Saver',
        cabin: 'Economy Sasta',
        pricePKR: 15800,
        baggage: '20 kg Checked Baggage',
        handBaggage: '7 kg Cabin Bag',
        refundable: false,
        seatSelection: false,
        meal: 'Warm Sandwich & Tea/Juice',
        changesAllowed: 'Change Fee: PKR 3,000'
      },
      {
        id: 'pf122-value',
        name: 'Sial Value Plus',
        cabin: 'Economy Flex',
        pricePKR: 19800,
        baggage: '30 kg Checked Baggage',
        handBaggage: '8 kg Cabin Bag',
        refundable: true,
        seatSelection: true,
        meal: 'Special Hot Meal & Drinks',
        changesAllowed: 'Free Reschedule before 24h'
      }
    ]
  },
  // 3. Fly Jinnah Domestic Ultra Cheap
  {
    id: 'fl-fj-201',
    airline: 'Fly Jinnah',
    airlineCode: '9P',
    airlineLogo: 'https://images.unsplash.com/photo-1520437358207-323b43b50729?w=100&auto=format&fit=crop&q=80',
    flightNumber: '9P-671',
    aircraft: 'Airbus A320 modern',
    origin: 'KHI',
    originCity: 'Karachi',
    originAirport: 'Jinnah International Airport',
    destination: 'ISB',
    destinationCity: 'Islamabad',
    destinationAirport: 'Islamabad International Airport',
    departureTime: '06:30 AM',
    arrivalTime: '08:25 AM',
    duration: '1h 55m',
    stops: 0,
    pricePKR: 14900,
    tier: 'cheap',
    pointsEarned: 149,
    seatsLeft: 12,
    refundable: false,
    mealsIncluded: false,
    wifiIncluded: false,
    features: ['Best Value Domestic', '10kg Hand Baggage Free', 'Buy-on-board Cafe SkyCafe', 'Extra Legroom Available'],
    fareTiers: [
      {
        id: 'fj-basic',
        name: 'Fly Jinnah Light (Hand Bag only)',
        cabin: 'Economy Sasta',
        pricePKR: 14900,
        baggage: '10 kg Cabin Bag Only',
        handBaggage: '10 kg Cabin Bag',
        refundable: false,
        seatSelection: false,
        meal: 'Buy on-board Cafe',
        changesAllowed: 'Fee applies'
      },
      {
        id: 'fj-extra',
        name: 'Fly Jinnah Value (+20kg Bag)',
        cabin: 'Economy Flex',
        pricePKR: 18200,
        baggage: '20 kg Checked Baggage',
        handBaggage: '10 kg Cabin Bag',
        refundable: true,
        seatSelection: true,
        meal: 'Free SkyCafe Combo Meal',
        changesAllowed: '1 Free Date Change'
      }
    ]
  },
  // 4. SereneAir Mid/Flex
  {
    id: 'fl-serene-501',
    airline: 'Serene Air',
    airlineCode: 'ER',
    airlineLogo: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=100&auto=format&fit=crop&q=80',
    flightNumber: 'ER-502',
    aircraft: 'Boeing 737-800 NG',
    origin: 'KHI',
    originCity: 'Karachi',
    originAirport: 'Jinnah International Airport',
    destination: 'LHE',
    destinationCity: 'Lahore',
    destinationAirport: 'Allama Iqbal International Airport',
    departureTime: '03:45 PM',
    arrivalTime: '05:35 PM',
    duration: '1h 50m',
    stops: 0,
    pricePKR: 17200,
    tier: 'cheap',
    pointsEarned: 172,
    seatsLeft: 6,
    refundable: true,
    mealsIncluded: true,
    wifiIncluded: false,
    features: ['Generous 32-inch Seat Pitch', '25kg Checked Luggage', 'Freshly Prepared Hot Biryani / Karahi Meal', 'Comfortable Fleet'],
    fareTiers: [
      {
        id: 'er-reg',
        name: 'Serene Regular Saver',
        cabin: 'Economy Sasta',
        pricePKR: 17200,
        baggage: '25 kg Checked Baggage',
        handBaggage: '7 kg Hand Baggage',
        refundable: true,
        seatSelection: false,
        meal: 'Special Hot Meal & Drink',
        changesAllowed: 'Standard Change Rules'
      },
      {
        id: 'er-prem',
        name: 'Serene Serenity Club',
        cabin: 'Business Club',
        pricePKR: 32500,
        baggage: '40 kg Baggage Allowance',
        handBaggage: '12 kg Cabin Bags (2 pcs)',
        refundable: true,
        seatSelection: true,
        meal: 'Gourmet 3-Course VIP Meal',
        changesAllowed: 'Zero Cancellation / Rescheduling Fees'
      }
    ]
  },
  // 5. Emirates International Luxury
  {
    id: 'fl-ek-601',
    airline: 'Emirates',
    airlineCode: 'EK',
    airlineLogo: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?w=100&auto=format&fit=crop&q=80',
    flightNumber: 'EK-601',
    aircraft: 'Boeing 777-300ER (World Class)',
    origin: 'KHI',
    originCity: 'Karachi',
    originAirport: 'Jinnah International Airport',
    destination: 'DXB',
    destinationCity: 'Dubai',
    destinationAirport: 'Dubai International Airport (Terminal 3)',
    departureTime: '10:30 AM',
    arrivalTime: '11:55 AM',
    duration: '2h 25m',
    stops: 0,
    pricePKR: 104500,
    tier: 'luxury',
    pointsEarned: 1045,
    seatsLeft: 8,
    refundable: true,
    mealsIncluded: true,
    wifiIncluded: true,
    features: ['ice Inflight Entertainment (6,500 channels)', 'World-Renowned 5-Star Service', 'Gourmet Multi-Course Dining', 'Complimentary High-speed Onboard Wi-Fi'],
    fareTiers: [
      {
        id: 'ek-econ',
        name: 'Emirates Economy Saver',
        cabin: 'Economy Sasta',
        pricePKR: 104500,
        baggage: '30 kg Checked Baggage',
        handBaggage: '7 kg Cabin Bag',
        refundable: true,
        seatSelection: true,
        meal: 'Multi-course Chef Meal & Beverages',
        changesAllowed: 'Refundable with standard fee'
      },
      {
        id: 'ek-flex',
        name: 'Emirates Economy Flex Plus',
        cabin: 'Economy Flex',
        pricePKR: 135000,
        baggage: '35 kg Checked Baggage',
        handBaggage: '10 kg Cabin Bag',
        refundable: true,
        seatSelection: true,
        meal: 'Gourmet Dining + Unlimited Refreshments',
        changesAllowed: 'Free Changes, Skywards 100% Miles'
      },
      {
        id: 'ek-biz',
        name: 'Emirates Business Class Lie-Flat',
        cabin: 'Business Club',
        pricePKR: 310000,
        baggage: '40 kg Baggage + Chauffeur Drive',
        handBaggage: '14 kg (2 pieces)',
        refundable: true,
        seatSelection: true,
        meal: 'Royal Multi-course Fine Dining & Champagne',
        changesAllowed: 'Complimentary Lounge + Priority Everything'
      }
    ]
  },
  // 6. Qatar Airways Luxury
  {
    id: 'fl-qr-611',
    airline: 'Qatar Airways',
    airlineCode: 'QR',
    airlineLogo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=100&auto=format&fit=crop&q=80',
    flightNumber: 'QR-611',
    aircraft: 'Airbus A350-900 Ultra Quiet',
    origin: 'LHE',
    originCity: 'Lahore',
    originAirport: 'Allama Iqbal International Airport',
    destination: 'DOH',
    destinationCity: 'Doha',
    destinationAirport: 'Hamad International Airport',
    departureTime: '04:10 AM',
    arrivalTime: '06:05 AM',
    duration: '3h 55m',
    stops: 0,
    pricePKR: 118000,
    tier: 'luxury',
    pointsEarned: 1180,
    seatsLeft: 5,
    refundable: true,
    mealsIncluded: true,
    wifiIncluded: true,
    features: ['Skytrax World Best Airline 2025', 'Oryx One Award-Winning Entertainment', 'Spacious Cabin & Mood Lighting', 'Super Wi-Fi Enabled'],
    fareTiers: [
      {
        id: 'qr-classic',
        name: 'Qatar Economy Classic',
        cabin: 'Economy Sasta',
        pricePKR: 118000,
        baggage: '30 kg Checked Baggage',
        handBaggage: '7 kg Hand Baggage',
        refundable: true,
        seatSelection: true,
        meal: 'International Halal Dining',
        changesAllowed: 'Standard change fee'
      },
      {
        id: 'qr-qsuite',
        name: 'Qatar Qsuite Business Class',
        cabin: 'Business Club',
        pricePKR: 345000,
        baggage: '40 kg Baggage + Al Mourjan Lounge',
        handBaggage: '15 kg Cabin Allowance',
        refundable: true,
        seatSelection: true,
        meal: 'Caviar & On-Demand Fine Dining',
        changesAllowed: 'Private Qsuite with Closing Door & Double Bed'
      }
    ]
  },
  // 7. Saudia International
  {
    id: 'fl-sv-705',
    airline: 'Saudia Airlines',
    airlineCode: 'SV',
    airlineLogo: 'https://images.unsplash.com/photo-1517479180483-a4c330c6a512?w=100&auto=format&fit=crop&q=80',
    flightNumber: 'SV-705',
    aircraft: 'Boeing 787-9 Dreamliner',
    origin: 'KHI',
    originCity: 'Karachi',
    originAirport: 'Jinnah International Airport',
    destination: 'JED',
    destinationCity: 'Jeddah',
    destinationAirport: 'King Abdulaziz International Airport (Umrah Terminal)',
    departureTime: '01:30 PM',
    arrivalTime: '04:15 PM',
    duration: '4h 45m',
    stops: 0,
    pricePKR: 98000,
    tier: 'luxury',
    pointsEarned: 980,
    seatsLeft: 11,
    refundable: true,
    mealsIncluded: true,
    wifiIncluded: true,
    features: ['Direct Umrah & Hajj Route', '2x23kg (46kg) Baggage Included', 'Complimentary Zamzam 5L transport', 'Traditional Arabic Hospitality & Dates'],
    fareTiers: [
      {
        id: 'sv-guest',
        name: 'Saudia Guest Economy (2 Bags x 23kg)',
        cabin: 'Economy Sasta',
        pricePKR: 98000,
        baggage: '2 Pieces (46 kg Total)',
        handBaggage: '7 kg Hand Baggage + Zamzam',
        refundable: true,
        seatSelection: true,
        meal: 'Traditional Hot Kabsa & Juice',
        changesAllowed: 'Flexible date change available'
      },
      {
        id: 'sv-first',
        name: 'Saudia Alfursan First/Business',
        cabin: 'Business Club',
        pricePKR: 265000,
        baggage: '3 Pieces (69 kg Total)',
        handBaggage: '14 kg Hand Baggage',
        refundable: true,
        seatSelection: true,
        meal: 'Chef-on-Board Arabic Coffee & Fine Cuisine',
        changesAllowed: 'Alfursan Lounge & Priority Immigration'
      }
    ]
  },
  // 8. Turkish Airlines 1-Stop Europe
  {
    id: 'fl-tk-709',
    airline: 'Turkish Airlines',
    airlineCode: 'TK',
    airlineLogo: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=100&auto=format&fit=crop&q=80',
    flightNumber: 'TK-709',
    aircraft: 'Airbus A330-300',
    origin: 'ISB',
    originCity: 'Islamabad',
    originAirport: 'Islamabad International Airport',
    destination: 'LHR',
    destinationCity: 'London',
    destinationAirport: 'Heathrow Airport',
    departureTime: '06:15 AM',
    arrivalTime: '03:40 PM',
    duration: '11h 25m',
    stops: 1,
    stopDetails: '1h 50m Layover in Istanbul (IST)',
    pricePKR: 185000,
    tier: 'luxury',
    pointsEarned: 1850,
    seatsLeft: 7,
    refundable: true,
    mealsIncluded: true,
    wifiIncluded: true,
    features: ['World Best Airline Catering by Do&Co', 'Free Touristanbul or Hotel Layover', 'Flying Chef in Business Class', 'Top European Connections'],
    fareTiers: [
      {
        id: 'tk-eco',
        name: 'Turkish Eco Semi-Flexible',
        cabin: 'Economy Sasta',
        pricePKR: 185000,
        baggage: '30 kg Checked Baggage',
        handBaggage: '8 kg Cabin Bag',
        refundable: true,
        seatSelection: true,
        meal: 'Turkish Mediterranean Cuisine & Warm Bread',
        changesAllowed: 'Rebooking with small change difference'
      },
      {
        id: 'tk-biz',
        name: 'Turkish Business Class Lie-Flat',
        cabin: 'Business Club',
        pricePKR: 440000,
        baggage: '40 kg Baggage + CIP Istanbul Lounge',
        handBaggage: '16 kg (2 pieces)',
        refundable: true,
        seatSelection: true,
        meal: 'Candlelight Inflight Dining & Gourmet Mezze',
        changesAllowed: 'Fully Flexible, Instant Free Cancellation'
      }
    ]
  }
];

export const MOCK_HOTELS: HotelItem[] = [
  // 1. Pearl Continental Hotel Lahore (Luxury)
  {
    id: 'ht-pc-lhe',
    name: 'Pearl Continental Hotel Lahore',
    location: 'Shahrah-e-Quaid-e-Azam, Mall Road',
    city: 'Lahore',
    area: 'Mall Road / Gulberg',
    starRating: 5,
    reviewRating: 4.8,
    reviewCount: 1420,
    reviewText: 'Exceptional 5-star heritage luxury with renowned Bukhara and Marco Polo restaurants.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&auto=format&fit=crop&q=80'
    ],
    amenities: ['Outdoor Swimming Pool', 'Bukhara Live BBQ Grill', 'High-Speed Wi-Fi', 'Luxury Spa & Sauna', 'Airport Shuttle Pickup', 'Fitness Gymnasium', 'Executive Lounge'],
    distanceToCenter: '0.8 km from City Center',
    tier: 'luxury',
    pointsEarned: 350,
    featuredBadge: 'TOP LUXURY 5-STAR',
    roomTypes: [
      {
        id: 'pc-deluxe',
        name: 'Deluxe King Heritage Room',
        pricePKR: 35000,
        capacity: '2 Adults, 1 Child',
        bedType: '1 Extra Large King Bed',
        roomSize: '38 sq m',
        includesBreakfast: true,
        freeCancellation: true,
        amenities: ['City Garden View', 'Marble Bath with Tub', 'Complimentary Buffet Breakfast', 'Coffee Machine'],
        remainingRooms: 4
      },
      {
        id: 'pc-exec',
        name: 'Executive Club Room (Lounge Access)',
        pricePKR: 48000,
        capacity: '2 Adults, 2 Children',
        bedType: '1 Royal King Bed',
        roomSize: '46 sq m',
        includesBreakfast: true,
        freeCancellation: true,
        amenities: ['Executive Lounge High Tea & Canapes', 'Late 4 PM Check-out', 'Free Airport Transfer', 'Jacuzzi'],
        remainingRooms: 2
      },
      {
        id: 'pc-presidential',
        name: 'Royal Presidential Suite',
        pricePKR: 110000,
        capacity: '4 Adults',
        bedType: '2 King Master Suites',
        roomSize: '120 sq m',
        includesBreakfast: true,
        freeCancellation: true,
        amenities: ['Private Butler Service', 'Dining Room & Kitchenette', 'Panoramic Mall Road View', 'Private Sauna'],
        remainingRooms: 1
      }
    ]
  },
  // 2. Serena Hotel Islamabad (Luxury)
  {
    id: 'ht-serena-isb',
    name: 'Islamabad Serena Hotel',
    location: 'Khayaban-e-Suhrawardy, Opp. Convention Centre',
    city: 'Islamabad',
    area: 'Sector G-5 / Margalla Foothills',
    starRating: 5,
    reviewRating: 4.9,
    reviewCount: 2150,
    reviewText: 'Premier diplomatic oasis set amidst 14 acres of lush gardens with breathtaking Margalla views.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&auto=format&fit=crop&q=80'
    ],
    amenities: ['Maisha Luxury Health Spa', 'Heated Outdoor Pool', '8 Fine Dining Restaurants', 'Diplomatic Security', 'Tennis Courts', 'Helipad Access'],
    distanceToCenter: '1.2 km from Blue Area',
    tier: 'luxury',
    pointsEarned: 480,
    featuredBadge: 'PREMIUM DIPLOMATIC 5★',
    roomTypes: [
      {
        id: 'serena-deluxe',
        name: 'Deluxe Margalla View Room',
        pricePKR: 48000,
        capacity: '2 Guests',
        bedType: '1 King Bed or 2 Twin Beds',
        roomSize: '42 sq m',
        includesBreakfast: true,
        freeCancellation: true,
        amenities: ['Margalla Mountain Balcony', 'Handmade Pakistani Silk Carpets', 'Espresso Bar', 'Free Valet'],
        remainingRooms: 5
      },
      {
        id: 'serena-junior',
        name: 'Junior Executive Suite',
        pricePKR: 72000,
        capacity: '3 Guests',
        bedType: '1 Super King Bed + Sofa Bed',
        roomSize: '65 sq m',
        includesBreakfast: true,
        freeCancellation: true,
        amenities: ['Living Room & Work Desk', 'Spa Discount 20%', 'Welcome Exotic Fruit & Sweet Platter'],
        remainingRooms: 2
      }
    ]
  },
  // 3. Hotel One Gulberg Lahore (Budget / Sasta)
  {
    id: 'ht-hotel-one-lhe',
    name: 'Hotel One Gulberg Lahore',
    location: 'MM Alam Road, Block C-2, Gulberg III',
    city: 'Lahore',
    area: 'Gulberg III',
    starRating: 3,
    reviewRating: 4.3,
    reviewCount: 890,
    reviewText: 'Clean, reliable, comfortable budget accommodation in the absolute heart of MM Alam shopping district.',
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&auto=format&fit=crop&q=80'
    ],
    amenities: ['Free Buffet Breakfast', 'High-Speed Wi-Fi', '24/7 Room Service', 'Power Generator Backup', 'Air Conditioning', 'Free Parking'],
    distanceToCenter: 'Walking distance to MM Alam Food Street',
    tier: 'cheap',
    pointsEarned: 95,
    featuredBadge: 'SASTA VALUE PICK',
    roomTypes: [
      {
        id: 'h1-standard',
        name: 'Standard Smart Room',
        pricePKR: 9500,
        capacity: '2 Guests',
        bedType: '1 Queen Bed',
        roomSize: '24 sq m',
        includesBreakfast: true,
        freeCancellation: true,
        amenities: ['Free WiFi', 'Flat screen Cable TV', 'Hot shower & Toiletries', 'Tea/Coffee Maker'],
        remainingRooms: 8
      },
      {
        id: 'h1-deluxe',
        name: 'Executive Deluxe Room',
        pricePKR: 12500,
        capacity: '2 Adults, 1 Child',
        bedType: '1 King Bed',
        roomSize: '30 sq m',
        includesBreakfast: true,
        freeCancellation: true,
        amenities: ['City View', 'Mini Fridge', 'Work Desk', 'Ironing facilities'],
        remainingRooms: 4
      }
    ]
  },
  // 4. Avari Towers Karachi (Luxury)
  {
    id: 'ht-avari-khi',
    name: 'Avari Towers Karachi',
    location: '242-244 Fatima Jinnah Road, Saddar',
    city: 'Karachi',
    area: 'Saddar / Cantt',
    starRating: 5,
    reviewRating: 4.7,
    reviewCount: 1680,
    reviewText: 'Iconic skyscraper hotel with panoramic Arabian sea breeze views and famed Dynasty Chinese restaurant.',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&auto=format&fit=crop&q=80'
    ],
    amenities: ['Olympic-size Pool', 'Dynasty & Fujiyama Restaurants', 'Olympia Health Club', 'Airport Shuttle', 'High-Speed Wi-Fi', 'Tennis Court'],
    distanceToCenter: '0.5 km from Saddar / Zainab Market',
    tier: 'luxury',
    pointsEarned: 320,
    featuredBadge: 'BEST IN KARACHI',
    roomTypes: [
      {
        id: 'avari-deluxe',
        name: 'Deluxe Tower King Room',
        pricePKR: 32000,
        capacity: '2 Guests',
        bedType: '1 King Bed',
        roomSize: '36 sq m',
        includesBreakfast: true,
        freeCancellation: true,
        amenities: ['Skyline View', 'Deep Soaking Tub', 'Complimentary Breakfast at Asia Live', 'Safe'],
        remainingRooms: 6
      },
      {
        id: 'avari-lady',
        name: 'Lady Avari Secure Floor Room',
        pricePKR: 36000,
        capacity: '2 Guests',
        bedType: '1 Luxury King Bed',
        roomSize: '38 sq m',
        includesBreakfast: true,
        freeCancellation: true,
        amenities: ['Dedicated Female Staff Floor', 'Enhanced Security', 'Complimentary Foot Massage Voucher'],
        remainingRooms: 3
      }
    ]
  },
  // 5. Nishat Hotel Johar Town Lahore (Modern Luxury)
  {
    id: 'ht-nishat-lhe',
    name: 'The Nishat Hotel Johar Town',
    location: 'Abdul Haque Road, Next to Emporium Mall',
    city: 'Lahore',
    area: 'Johar Town / Emporium',
    starRating: 5,
    reviewRating: 4.8,
    reviewCount: 1890,
    reviewText: 'Modern ultra-luxurious property integrated directly with Emporium Mall, boasting Parisian-inspired design.',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=600&auto=format&fit=crop&q=80'
    ],
    amenities: ['Direct Emporium Mall Access', 'Indoor Temperature-Controlled Pool', 'Bistro Restaurant', 'Luxury Spa', 'Cinema Discount', 'Underground Secure Parking'],
    distanceToCenter: 'Direct link to Emporium Mall',
    tier: 'luxury',
    pointsEarned: 380,
    featuredBadge: 'SHOPPERS PARADISE',
    roomTypes: [
      {
        id: 'nishat-exec',
        name: 'Executive Deluxe Parisian King',
        pricePKR: 38000,
        capacity: '2 Adults, 1 Child',
        bedType: '1 Plush Hypnos King Bed',
        roomSize: '44 sq m',
        includesBreakfast: true,
        freeCancellation: true,
        amenities: ['Emporium Mall VIP Discount Card', 'Smart TV with Netflix', 'Marble Rain Shower', 'Complimentary Minibar'],
        remainingRooms: 4
      }
    ]
  },
  // 6. Shangrila Resort Skardu (Exotic Nature)
  {
    id: 'ht-shangrila-skd',
    name: 'Shangrila Resort Kachura Lake',
    location: 'Lower Kachura Lake, Skardu, Gilgit-Baltistan',
    city: 'Skardu',
    area: 'Kachura Valley',
    starRating: 4,
    reviewRating: 4.9,
    reviewCount: 1100,
    reviewText: 'Known as "Heaven on Earth", featuring authentic Swiss-style chalets on the heart-shaped turquoise lake.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=600&auto=format&fit=crop&q=80'
    ],
    amenities: ['Heart Lake Boating', 'Aircraft Fuselage VIP Cafe', 'Trout Fish BBQ', 'Mountain Trekking Guides', 'Bonfire & Live Folk Music', 'Free Wi-Fi'],
    distanceToCenter: '20 mins drive from Skardu Airport',
    tier: 'luxury',
    pointsEarned: 420,
    featuredBadge: 'HEAVEN ON EARTH',
    roomTypes: [
      {
        id: 'shangrila-cottage',
        name: 'Lakeside VIP Swiss Chalet',
        pricePKR: 42000,
        capacity: '3 Guests',
        bedType: '1 King Bed + Lakefront Porch',
        roomSize: '48 sq m',
        includesBreakfast: true,
        freeCancellation: true,
        amenities: ['Direct Lake Frontage', 'Wood Burning Fireplace', 'Complimentary Trout Breakfast & Tea', 'Boating pass'],
        remainingRooms: 3
      }
    ]
  },
  // 7. Budget Inn Islamabad (Cheap)
  {
    id: 'ht-budget-isb',
    name: 'Capri & Crown Budget Residency',
    location: 'Sector F-7/2, Jinnah Super Market Vicinity',
    city: 'Islamabad',
    area: 'Sector F-7',
    starRating: 2,
    reviewRating: 4.1,
    reviewCount: 450,
    reviewText: 'Economical, safe, and prime location guest rooms just 2 minutes from Jinnah Super restaurants.',
    image: 'https://images.unsplash.com/photo-1586611292717-f828b167408c?w=600&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600&auto=format&fit=crop&q=80'
    ],
    amenities: ['Air Conditioned', 'Free WiFi', '24/7 Security Guards', 'Hot Water 24 Hours', 'Desi Breakfast Included'],
    distanceToCenter: 'Walking distance to Jinnah Super F-7',
    tier: 'cheap',
    pointsEarned: 75,
    featuredBadge: 'BUDGET FRIENDLY',
    roomTypes: [
      {
        id: 'capri-double',
        name: 'Economy Double Room',
        pricePKR: 7500,
        capacity: '2 Guests',
        bedType: '1 Double Bed',
        roomSize: '20 sq m',
        includesBreakfast: true,
        freeCancellation: false,
        amenities: ['Free WiFi', 'Ensuite Bathroom', 'Pakistani Breakfast (Halwa Puri/Paratha)', 'TV'],
        remainingRooms: 7
      }
    ]
  }
];

// Helper to generate realistic bus seats
function generateBusSeats(total: number, occupiedIndices: number[], vipIndices: number[]): BusSeat[] {
  const seats: BusSeat[] = [];
  for (let i = 1; i <= total; i++) {
    const row = Math.ceil(i / 4);
    const col = ((i - 1) % 4) + 1;
    const isOccupied = occupiedIndices.includes(i);
    const isVip = vipIndices.includes(i);
    const isWindow = col === 1 || col === 4;
    const isFemaleOnly = [1, 2, 5, 6].includes(i);

    seats.push({
      seatNumber: i,
      row,
      col,
      isOccupied,
      isFemaleOnly,
      isWindow,
      tier: isVip ? 'vip' : 'standard',
      priceOffsetPKR: isVip ? 300 : 0
    });
  }
  return seats;
}

export const MOCK_BUSES: BusItem[] = [
  // 1. Faisal Movers Business Class (Luxury)
  {
    id: 'bus-fm-biz-01',
    operator: 'Faisal Movers',
    operatorLogo: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=100&auto=format&fit=crop&q=80',
    busType: 'Business Class 2x1 Luxury Yutong',
    origin: 'Lahore',
    destination: 'Islamabad',
    departureTerminal: 'Faisal Movers Terminal, Band Road, Lahore',
    arrivalTerminal: 'Faisal Movers Faizabad Terminal, Islamabad',
    departureTime: '08:00 AM',
    arrivalTime: '12:15 PM',
    duration: '4h 15m (M2 Motorway)',
    pricePKR: 2450,
    tier: 'luxury',
    seatsAvailable: 14,
    totalSeats: 30,
    pointsEarned: 25,
    rating: 4.8,
    amenities: ['Individual Android Touch Tablet on Every Seat', 'Massaging Leather Recliner Seats (140°)', 'Refreshment Box & Hot Chai / Juice', 'Free High-Speed Wi-Fi', 'USB Charging Ports & Reading Light'],
    features: ['2x1 Wide Luxury Seating', 'Zero Mid-Stops (Direct M2)', 'Hostess Onboard Service', 'Live GPS Tracking'],
    seatLayout: generateBusSeats(30, [3, 4, 8, 9, 12, 17, 22], [1, 2, 3, 4])
  },
  // 2. Faisal Movers Standard Sasta (Cheap)
  {
    id: 'bus-fm-std-02',
    operator: 'Faisal Movers',
    operatorLogo: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=100&auto=format&fit=crop&q=80',
    busType: 'Standard Executive 2x2 AC',
    origin: 'Lahore',
    destination: 'Islamabad',
    departureTerminal: 'Faisal Movers Kalma Chowk / Band Road',
    arrivalTerminal: 'Faizabad Intercity Terminal, Islamabad',
    departureTime: '09:30 AM',
    arrivalTime: '02:00 PM',
    duration: '4h 30m',
    pricePKR: 1650,
    tier: 'cheap',
    seatsAvailable: 22,
    totalSeats: 44,
    pointsEarned: 17,
    rating: 4.5,
    amenities: ['Air Conditioning & Heating', 'Comfortable Pushback Seats', 'Audio/Video Entertainment', 'USB Phone Charging', '15-min Sukheki Service Area Rest'],
    features: ['Best Value Fare', 'Frequent 30-min Departures', '20kg Luggage Included'],
    seatLayout: generateBusSeats(44, [5, 6, 11, 12, 19, 20, 27, 28, 35], [1, 2])
  },
  // 3. Daewoo Express Sleeper Gold (Luxury)
  {
    id: 'bus-daewoo-sleeper',
    operator: 'Daewoo Express',
    operatorLogo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=100&auto=format&fit=crop&q=80',
    busType: 'Sleeper Gold Class Luxury Lounge',
    origin: 'Lahore',
    destination: 'Karachi',
    departureTerminal: 'Daewoo Main Terminal, Thokar Niaz Baig, Lahore',
    arrivalTerminal: 'Daewoo Main Terminal, Sohrab Goth, Karachi',
    departureTime: '04:00 PM',
    arrivalTime: '08:30 AM (Next Day)',
    duration: '16h 30m (M5 Motorway)',
    pricePKR: 8900,
    tier: 'luxury',
    seatsAvailable: 8,
    totalSeats: 24,
    pointsEarned: 89,
    rating: 4.9,
    amenities: ['Fully Flat Sleeping Bed Bunkers', 'Fresh Duvet, Pillows & Sleeping Kit', 'Dinner & Morning Breakfast Included', 'Private Curtain Compartment', 'Personal 15-inch Entertainment Screen'],
    features: ['Hotel-on-Wheels Experience', 'M5 Motorway Express Corridor', 'Dedicated Male & Female Cabins'],
    seatLayout: generateBusSeats(24, [1, 2, 7, 8, 13, 14, 19], [1, 2, 3, 4])
  },
  // 4. Daewoo Express Premium (Mid/Popular)
  {
    id: 'bus-daewoo-prem',
    operator: 'Daewoo Express',
    operatorLogo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=100&auto=format&fit=crop&q=80',
    busType: 'Super Premium Luxury Bus',
    origin: 'Lahore',
    destination: 'Islamabad',
    departureTerminal: 'Daewoo Terminal Thokar / Kalma Chowk',
    arrivalTerminal: 'Daewoo Faizabad Rawalpindi Terminal',
    departureTime: '11:00 AM',
    arrivalTime: '03:15 PM',
    duration: '4h 15m',
    pricePKR: 2200,
    tier: 'cheap',
    seatsAvailable: 19,
    totalSeats: 40,
    pointsEarned: 22,
    rating: 4.7,
    amenities: ['Daewoo Snack Box & Soft Drink', 'Ergonomic Reclining Seats', 'Cabin Crew Attendant', 'Clean Onboard Environment', 'Express Luggage Handling'],
    features: ['30 Years of Safety & Punctuality', 'M2 Motorway Direct', 'Pre-allocated Seat Numbers'],
    seatLayout: generateBusSeats(40, [3, 4, 9, 10, 15, 16, 25, 26], [1, 2])
  },
  // 5. Bilal Travels Royal (Luxury)
  {
    id: 'bus-bilal-royal',
    operator: 'Bilal Travels',
    operatorLogo: 'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?w=100&auto=format&fit=crop&q=80',
    busType: 'Royal Class Volvo 2x1 Recliner',
    origin: 'Lahore',
    destination: 'Faisalabad',
    departureTerminal: 'Bilal Travels Terminal, Rahbar Chowk, Lahore',
    arrivalTerminal: 'Bilal Travels Kohinoor City Terminal, Faisalabad',
    departureTime: '01:30 PM',
    arrivalTime: '03:45 PM',
    duration: '2h 15m (M3 Motorway)',
    pricePKR: 1450,
    tier: 'luxury',
    seatsAvailable: 11,
    totalSeats: 28,
    pointsEarned: 15,
    rating: 4.6,
    amenities: ['Leather Sofa Seats with Footrest', 'Complimentary Hi-Tea Box', 'Free WiFi & USB fast charging', 'Spacious Legroom (38 inches)'],
    features: ['Volvo Air Suspension Ride', 'Fast M3 Motorway Route', 'Complimentary Tea on Board'],
    seatLayout: generateBusSeats(28, [2, 6, 10, 14, 18], [1, 2])
  },
  // 6. Sania Express / Niazi Express Super Economy (Ultra Cheap)
  {
    id: 'bus-niazi-sasta',
    operator: 'Niazi Express',
    operatorLogo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=100&auto=format&fit=crop&q=80',
    busType: 'Executive Sasta Saver AC',
    origin: 'Lahore',
    destination: 'Multan',
    departureTerminal: 'Niazi Express Terminal, Bund Road, Lahore',
    arrivalTerminal: 'Niazi Bus Stand, Kalma Chowk, Multan',
    departureTime: '02:00 PM',
    arrivalTime: '06:30 PM',
    duration: '4h 30m',
    pricePKR: 1350,
    tier: 'cheap',
    seatsAvailable: 25,
    totalSeats: 45,
    pointsEarned: 14,
    rating: 4.2,
    amenities: ['Air Conditioning', 'Pushback Seats', 'Water Bottle Included', 'Overhead Luggage Rack'],
    features: ['Cheapest Intercity Bus Fare', 'Punctual Departure', 'Luggage Tagged Safety'],
    seatLayout: generateBusSeats(45, [1, 2, 7, 8, 15, 16, 23, 24, 31, 32], [1, 2])
  }
];

export const INITIAL_LOYALTY_PROFILE = {
  pointsBalance: 2450,
  tier: 'Gold' as const,
  lifetimeEarned: 5800,
  memberSince: 'March 2024',
  history: [
    {
      id: 'tx-1',
      date: 'Aug 14, 2026',
      type: 'EARNED' as const,
      points: 480,
      description: 'Flight Booking: Karachi ⇄ Dubai (EK-601)',
      bookingRef: 'ST-984210'
    },
    {
      id: 'tx-2',
      date: 'Jul 28, 2026',
      type: 'EARNED' as const,
      points: 350,
      description: 'Hotel Stay: Pearl Continental Lahore',
      bookingRef: 'ST-871239'
    },
    {
      id: 'tx-3',
      date: 'Jul 01, 2026',
      type: 'REDEEMED' as const,
      points: -1000,
      description: 'Discount applied on Bus Booking (Faisal Movers)',
      bookingRef: 'ST-743120'
    },
    {
      id: 'tx-4',
      date: 'Jun 12, 2026',
      type: 'EARNED' as const,
      points: 2500,
      description: 'Gold Member Welcome Bonus',
      bookingRef: 'BONUS-GOLD'
    }
  ]
};

export const PROMO_CODES: Record<string, { discountPKR: number; minSpendPKR: number; description: string }> = {
  SASTA1000: { discountPKR: 1000, minSpendPKR: 10000, description: 'PKR 1,000 off on bookings above PKR 10,000' },
  SUPERFLY: { discountPKR: 2500, minSpendPKR: 25000, description: 'PKR 2,500 off on international & luxury flights' },
  HOTELDEAL: { discountPKR: 1500, minSpendPKR: 15000, description: 'PKR 1,500 instant discount on 4★ & 5★ hotels' },
  FIRSTTRIP: { discountPKR: 500, minSpendPKR: 2000, description: 'PKR 500 discount for new members' }
};

export const CURRENCY_RATES: Record<string, number> = {
  PKR: 1,
  USD: 0.0036,
  AED: 0.0132,
  SAR: 0.0135,
  GBP: 0.0028
};
