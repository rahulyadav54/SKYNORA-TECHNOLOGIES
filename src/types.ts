export type AppView = 
  | 'explore'
  | 'hotels'
  | 'buses'
  | 'flights'
  | 'trains'
  | 'cabs'
  | 'experiences'
  | 'help'
  | 'hotel-detail'
  | 'checkout'
  | 'booking-voucher'
  | 'profile'
  | 'partner-portal'
  | 'admin'
  | 'login-portal';

export type UserRole = 'customer' | 'hotel-partner' | 'flight-partner' | 'bus-operator' | 'cab-vendor' | 'admin';

export type SearchTab = 'hotels' | 'buses' | 'flights' | 'trains' | 'cabs' | 'events';

export interface SearchParams {
  destination: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: string;
  category: SearchTab;
}

export interface Property {
  id: string;
  title: string;
  category: string;
  categoryBadge: string;
  badgeStyle: 'luxury' | 'villa' | 'family' | 'value';
  neighborhood: string;
  address: string;
  distanceFromBeach: string;
  stars: number;
  rating: number;
  reviewCount: number;
  image: string;
  photoCount: number;
  amenities: string[];
  cancellationText: string;
  breakfastText: string;
  originalPrice: number;
  discountPercent: number;
  discountBadge: string;
  pricePerNight: number;
  taxFee: number;
  trustTag: string;
  isSaved?: boolean;
}

export interface RoomOption {
  id: string;
  title: string;
  wing: string;
  size: string;
  image: string;
  tag?: string;
  features: string[];
  plans: {
    id: string;
    name: string;
    description: string;
    pricePerNight: number;
    badge?: string;
  }[];
}

export interface BookingState {
  property: Property;
  roomTitle: string;
  mealPlanTitle: string;
  pricePerNight: number;
  nights: number;
  checkIn: string;
  checkOut: string;
  guests: string;
  primaryGuest: {
    name: string;
    email: string;
    phone: string;
  };
  hasGst: boolean;
  gstin?: string;
  addOns: {
    airportCab: boolean;
    comprehensiveCover: boolean;
  };
  creditsRedeemed: boolean;
  creditsAmount: number;
  appliedPromo: string;
  promoDiscount: number;
  memberDiscount: number;
  taxPercent: number;
  referenceId: string;
  hotelPnr: string;
  paymentMode: 'upi' | 'cards' | 'netbanking' | 'emi';
  upiVpa: string;
  assignedDriver: {
    name: string;
    phone: string;
    carModel: string;
    licensePlate: string;
    pickupTime: string;
    pickupLocation: string;
    dropLocation: string;
    estimatedDrive: string;
  };
}
