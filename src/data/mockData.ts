import { Property, RoomOption, BookingState } from '../types';

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'taj-fort-aguada',
    title: 'Taj Fort Aguada Resort & Spa, Candolim',
    category: '5-Star Heritage Luxury',
    categoryBadge: 'Skynora Luxury',
    badgeStyle: 'luxury',
    neighborhood: 'Candolim & Sinquerim',
    address: 'Sinquerim, Candolim, North Goa · 40m from Candolim Beach',
    distanceFromBeach: '40m from Candolim Beach',
    stars: 5,
    rating: 4.9,
    reviewCount: 1420,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaO10GhaeLoNfh0bR1eH5-F91FqvfuzCDSXi-GcQ91iDLBvBjndKnvgxif0CCRKVQIvWxg2HLwm-qPm49KFjL8u1b1arN3ArR5M3gteivScUXf24flD5ux_24jDsvMpvlgPP6fND_VP3Ms6aqdzgFvWVVFe2NWspei0GQwsxbfQt6YrgImivgI6TFjjYStAew3Vq81BxQ7VIB2tYXi1KLVRgoKmaAxVnrOudmkFZQMtBO0XTu_HJDpAQ',
    photoCount: 28,
    amenities: ['Direct Beach Access', 'Private Balcony', 'Free Airport Transfer', 'Sea View Superior'],
    cancellationText: 'Free cancellation before 16 Nov 2025',
    breakfastText: 'Complimentary Goan & Continental Breakfast Buffet included',
    originalPrice: 24000,
    discountPercent: 23,
    discountBadge: '23% OFF',
    pricePerNight: 18500,
    taxFee: 2220,
    trustTag: 'Instant UPI confirmation',
    isSaved: true
  },
  {
    id: 'heritage-portuguese-villa',
    title: 'Heritage Portuguese Villa by Skynora Luxe, Assagao',
    category: 'Entire 3-BHK Private Estate',
    categoryBadge: 'Boutique Villa',
    badgeStyle: 'villa',
    neighborhood: 'Assagao & Anjuna',
    address: 'Badem Road, Assagao, North Goa · 10 min drive to Vagator Beach',
    distanceFromBeach: '10 min drive to Vagator Beach',
    stars: 5,
    rating: 4.8,
    reviewCount: 680,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD41cPVuv-DsTdGKBlStFjpSu9NP1IV01TlLbDWhzg1HijaDM0sxBkgMgwvXdyAkDDPRUJn8NRnRhFkjq1boHfEWiwQ4bYuty6XqOMLbQJx2EVpOTbpV2BV6zPBgzeUpl1wOoGx014vxExHHAbYzFGHgVvJlK-MbfHJKu5OkfoK0y9UVabwXaAz_1ntwOSqBOKuIY0T2xOaEos74eyRhfYU23erOTJpNrFvV_a1R5AVXden_ETJTeaXqA',
    photoCount: 19,
    amenities: ['Private Lap Pool', 'Personal Chef on Call', 'Original 1920 Architecture', 'High Speed 300 Mbps WiFi'],
    cancellationText: 'Free cancellation up to 48 hours prior',
    breakfastText: 'Complimentary evening sundowner cocktails & curated Goan snacks',
    originalPrice: 16500,
    discountPercent: 22,
    discountBadge: 'Special Rate',
    pricePerNight: 12800,
    taxFee: 1536,
    trustTag: 'Only 1 Villa available',
    isSaved: false
  },
  {
    id: 'radisson-blu-resort',
    title: 'Radisson Blu Resort Goa, Cavelossim Beach',
    category: '5-Star Integrated Beach Resort',
    categoryBadge: 'Family Favorite',
    badgeStyle: 'family',
    neighborhood: 'Cavelossim & Benaulim (South)',
    address: 'Cavelossim, Salcete, South Goa · Direct shoreline access',
    distanceFromBeach: 'Direct shoreline access',
    stars: 5,
    rating: 4.7,
    reviewCount: 2100,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiSe5srmtZeJOCtyz4O39Idbg2mHx9PDpGJG5cJt6fa7lHbTrO51CWdq6abzRBML3JyTlWz8aUR2tpd3PmlktDgTGigHtPTxW1IvbxdIMQQOVbwiYjExPqJm7rQvIp0I2-kWBB3IAWSOkoqR_H0vhp3KTmR1kPIZXXV7m5TEIjwK6d5lTCiVzXnSr2234CkAcOb44jmwXG1HlVZVZxUKBS6DDwZcdMsoyGJ884nzMFxVn1dR_o2wpnWA',
    photoCount: 34,
    amenities: ['2 Outdoor Pools', 'Ayurvedic Spa & Wellness', 'Kids Club & Play Zone', 'Free Valet Parking'],
    cancellationText: 'Free cancellation up to 24 hours before check-in',
    breakfastText: 'Includes ₹1,000 Spa Credit Voucher per adult',
    originalPrice: 12500,
    discountPercent: 26,
    discountBadge: '26% OFF',
    pricePerNight: 9200,
    taxFee: 1104,
    trustTag: 'Zero Booking Deposit',
    isSaved: false
  },
  {
    id: 'alor-holiday-resort',
    title: 'Alor Holiday Resort & Coastal Cottages, Calangute',
    category: '3-Star Boutique Cottage Resort',
    categoryBadge: 'Best Value',
    badgeStyle: 'value',
    neighborhood: 'Calangute & Baga',
    address: 'Naika Vaddo, Calangute, North Goa · 450m from beach market',
    distanceFromBeach: '450m from beach market',
    stars: 3,
    rating: 4.3,
    reviewCount: 890,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCM40-ttH_g-6mcCuUNeWeXGAnYE4aedA4eqcKGijg3Zs-NF683J9Zgf4zcKhGxbipGwjHISCq8nXgfLLOjnCnwmIssIxr-wEkYzDkWB9DgVUqDnElVw-8MAHmhM5Sl2HPRAyymCJkaDc0z3d8dA1lOjpuKXLse9JjCjEB13bglgZfz_sWK2S0t816NTczKX8Fo8vS2bLCJI9jwhmQgdlS3lCj0iZ7cXkOUTUHtNkaTEvdqSNB2A32Xiw',
    photoCount: 14,
    amenities: ['Swimming Pool', "Near Tito's Lane", 'Free High-Speed Wi-Fi', 'AC Deluxe Room'],
    cancellationText: 'Free cancellation before 17 Nov',
    breakfastText: 'Scooter & self-drive Thar rental desk on premises',
    originalPrice: 4800,
    discountPercent: 27,
    discountBadge: '27% OFF',
    pricePerNight: 3499,
    taxFee: 420,
    trustTag: 'Great choice for couples',
    isSaved: false
  }
];

export const ROOM_OPTIONS: RoomOption[] = [
  {
    id: 'superior-king',
    title: 'Superior King Room - Sea View',
    wing: 'Arabian Sea Vista • Portuguese Wing • Upper Floor',
    size: '42 sq.m / 452 sq.ft',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAekeV4-lwJI7ArqvJIupJp1g2RHeWjoHz3EpTDGxb6sD7jC80ajPF3Iaa9K8gHWBcC2nus3DzmJQEUJzvAhlBkiBdwvhE6dMgceNXL4PPJMAeVSngvpDg_gGv4xuy1defAgx81G04G0FmP7ipZZSUH4tJ3xeMSYqamcxMxrDCsEe1MYygJMRsmI6KJ-fuG-kFeFLKaNaO-lm1pjH9vRbDyTrnoRjTtaRPWNUw-eSSmlu8HqHG-HiAeNg',
    tag: 'Free Wi-Fi High Speed',
    features: ['1 Plush King Bed', 'Private Balcony', 'Marble Rain Shower', 'Nespresso Machine'],
    plans: [
      {
        id: 'room-only',
        name: 'Choice A: Room Only',
        description: 'Access to all resort amenities • Non-refundable',
        pricePerNight: 16500
      },
      {
        id: 'breakfast-hightea',
        name: 'Choice B: Lavish Buffet Breakfast & Goan High Tea',
        description: 'Daily grand champagne breakfast spread + Sunset High tea',
        pricePerNight: 18500,
        badge: 'Included'
      },
      {
        id: 'all-inclusive',
        name: 'Choice C: All-Inclusive Gourmet Dining',
        description: 'Breakfast, 4-Course Coastal Lunch & Seafood Dinner at Morisco',
        pricePerNight: 22000
      }
    ]
  },
  {
    id: 'portuguese-suite',
    title: 'Portuguese Heritage Suite with Plunge Pool',
    wing: 'Private Courtyard • Dedicated Butler Service • Complete Ocean Panorama',
    size: '85 sq.m / 915 sq.ft',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAF88HNzpSYytO6cCabChewESoLvbcUsLBIea3SZv6jpJ-cMTtD9hffr0GZFkakjZIC5J_xzyAzAM4ukqFu1KKUFMkBGQHB7we8ooIjV-nGPc-TJ4xA6oEAiEF2PeizlmDOhOAHRCBp5vC_muU8PpWy-Dq7lY2UqRkTE4ivkH_xDx0YiJEA-EROZlO_RvjPnd_ctf1DuRC48QHYKBDYJdFnQDMF9EfJrifaG5jyqhkiJAw2ecUgbq2FGw',
    tag: 'Ultra Luxury',
    features: ['Private Plunge Pool', '24x7 Butler', 'Jacuzzi Tub', 'Luxury Mercedes Airport Pick-up'],
    plans: [
      {
        id: 'suite-butler',
        name: 'Heritage Suite Plunge Pool with Butler Service',
        description: 'Includes Butler Breakfast, Afternoon Tea & Sunset Cocktails',
        pricePerNight: 29500,
        badge: 'Top Tier'
      }
    ]
  },
  {
    id: 'garden-deluxe',
    title: 'Garden View Deluxe Twin',
    wing: 'Lush Botanical Garden Vista • Ground Level Patio',
    size: '38 sq.m / 410 sq.ft',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCD86U7HrTceD55ZwtiMRM7txiVhE8hZPWQP2yiF9U1myTPd5E7SGbGTs3E1aKDcLqVrHFsaUPTJt_sFxaJPuqKJtCDhmxK-r1jcyzgnpwixTtaYLc75NqI5iMlK0pxgvWSxze5JWDqu7dgkl5tjAA7jvOU5VQ-1FUSslplcypIiM3BHaAkWTs0tCTVwPKOPKLCniW6htPBDfRmAO2LXVPD9l_XHyyieNo9Yu3U31E7B7GshnV3ZnqBUw',
    features: ['2 Twin Beds', 'Garden Deck', 'Walk-in Shower'],
    plans: [
      {
        id: 'deluxe-twin',
        name: 'Deluxe Twin Garden View',
        description: 'Continental Breakfast Option Available • Free cancellation within 24h',
        pricePerNight: 14200
      }
    ]
  }
];

export const GALLERY_PHOTOS = [
  {
    title: 'Iconic Bastion Pool Deck',
    subtitle: 'Cliffside Panorama over Sinquerim Bay',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQl8zArycC7cZntla_gfva2VpBYO01dk67Z7g0gk4Y_yKgeCK6A0xn5BoJKJ9A0Xe8MzRhPOflRd-ZojbKbwqsa0h9kJiohcTYq-u_6mIjSsIzALrFNS-QmHmCzfPb83S3ASoqnyflqYQwO0vW8te4THoAv5uasaSLjZvoiq-kUU3vYsIZr1IaBPRPeqc2oE4Af-XRHraP7z0dwP8ZiU85TBQuoLjGVbTSKJqgXe-cnZetqXNMX92cBA'
  },
  {
    title: 'Luxury King Suite',
    subtitle: 'Portuguese Azulejo Accents & Sea Vista',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_I4lZnpln41DIAOE7knbr0TOCiJxP4BXWanzHLNoilg6iTM9JrpbBJe73euMJtMG9YN_xVGVX4mW68_MRgrKSz1slZjYI5XnIxBhZiKeccd3CNgbeVSLrtyuV4rc5I8vycFYyIG0hTSMaFqmaxQ2Ynz-tbLoNyx1MmgOWUKvA_i_cpilKhxsCROh7yAuT1o_0pkpjjL31cjAZfo6OiFYo9DdFSQRRK9Rba_x6SvDCohuO8ez7jzxTWw'
  },
  {
    title: 'Private Ocean Balcony',
    subtitle: 'Historic Fort Ramparts at Golden Hour',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsj9V_ELv5WdB0H3ogHrKJ5WQE5mZBm0mITBZyUP-aUuBC1uvHrpHM-7zwzHDd3Q-9zIfI99HcAB-3_QDPPYcGxkkmFKZDvUDejFuI6Zx6j6wFJLLiwd4WETdPpUAWhiV2vEpRnmkP5O1R13MXOUY5F6pFwRPURr8wRSJOxC5-vk_BeyOT61_2f8Vxmi7G9-S0nrLsp7zjvjSVCx98YEkz2BLJwI_m2mi5oFpPhnF_L4nb-y1qd6DUcw'
  },
  {
    title: 'Award-Winning Jiva Spa',
    subtitle: 'Ayurvedic Sanctuary & Lotus Reflection Pond',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBT-2HeB5WcbZXd-FD0a6ljzweQMvk4gavlCn4MmPK481fEU4IoZ78_-zxqlf3s7p2SI5_thKyFZo2GWNnaE-Yv82yp4EGLZzWP4E4NiCMm3JGgbif9RVqDvi1BGOyafYXzX0JtbsMQkLzcgcBR-HTjtPe2x91Orgq6-tqkYxxeRxhEKmixRNlYenif-0qNCs9FF-rXbSi614sfvScvnf4kbJbwQmocVMmKxPdflYjaLv8_uXgtHvRI7w'
  },
  {
    title: 'Romantic Sunset Deck',
    subtitle: 'Morisco Coastal Dining Experience',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaVIOHsfHCVdYyQJKbDdGFu4EUfZhWXM8oo6cGlTyiQxs31jk6q9LoR_fhuk1a09Ixcgn20S4sHB7D6M09nFuyNc-9tjfDtLxip0gxIQUpszdO2Mgu-E8-5fRERWFVpzWs_eKRYiQe8Og35ppRBvDvXJPSFYB1D0tAOUbKU4GSnYHp8Fv36Fqtvf85jiXVdDAeRvNay7pJ3XsN7n78loNYH4IydZALlxMUpSSyNlf4VttCB3IeuhWDeA'
  }
];

export const CANDOLIM_EXPERIENCES = [
  {
    id: 'catamaran-cruise',
    title: 'Catamaran Sunset Cruise',
    tag: '5 Mins from Hotel',
    tagIcon: 'sailing',
    rating: 4.9,
    description: '2-hour private coastal catamaran with champagne toast, dolphin spotting & live acoustic musician.',
    price: 3499,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyVH82EguONT-5R8QPQZ-GqJ6KcX-he1n8uyyCMxlLM7SisXf9JC8NvoPXNyAa67rqKb4CEeBI_WqDDu3vdRto9qb5p4OGNN8hP0fxWyv0ytvJ0N4mJelRLCjfCgtuIpizVzlgOSnDgZ97wDq0DlsnLSiWrdntnhJPfJMdmnBPBPBlVaZ-3HksH2hNb-Ksb8HzwZ_U9wxIvXtKLcGtnOgZ-WPyulDY1l-Mli0wmyVFjQSnLGmB68aWaQ'
  },
  {
    id: 'aguada-walk',
    title: 'Aguada Fort Historical Walk',
    tag: 'Next Door Access',
    tagIcon: 'fort',
    rating: 4.8,
    description: 'Guided heritage architectural walk led by a local historian through the 1612 Portuguese citadel & lighthouse.',
    price: 999,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAn5hxITIlxMEbwwZAvZbgbsze43_CdjAyvOWJ5KRkkKMmq5H6xO13ZbBBSNZloX74gANYBHFzRNpfMNX3EZtdoD7XAwutO3Udm2CH_N8Ow8EgKtn3KCdNV7Nb2uvS0sqkjfv803xKnDVhrEuw4VwA99Qnul2wgKf3B21ovwRcKS9NC7ZfS8YRdSlfoipRyZpEMyjodp8ZVwD1yImyMHA9wxFJo5Te6eUV4Rhp7sQDDDpmrb0uoztdEWg'
  },
  {
    id: 'scuba-diving',
    title: 'Scuba Diving at Grand Island',
    tag: 'Certified PADI',
    tagIcon: 'scuba_diving',
    rating: 4.95,
    description: 'Full-day expedition with speedboat transport, equipment briefing, underwater HD video footage, and BBQ lunch.',
    price: 4250,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQRfIS7Fzntq_7ARaOT4zD8Aq6AWBrGUxQfWv6pPkmujVdf62iWRgyPV37dTPy36y9lRgGck7A-J4i_xHY09rFajQd1zKNoqkeDzwasgm1CwpsxUlUIQ7w_kLvgGZ_mmATfZqYDkw2UY08j8Wrq0g3brJfh0ldmbF5Mk-VuMvuhPzy2GwNGSZn1PvxedtUOtCJvWN0UL3BbhVDDVA7q_rjjCLyuvhqNVj5jPyBhnD9eSQQ76FldtZvUQ'
  }
];

export const INITIAL_BOOKING: BookingState = {
  property: INITIAL_PROPERTIES[0],
  roomTitle: 'Superior King Room - Sea View',
  mealPlanTitle: 'With Lavish Buffet Breakfast & High Tea',
  pricePerNight: 18500,
  nights: 4,
  checkIn: '18 Nov 2025',
  checkOut: '22 Nov 2025',
  guests: '2 Adults • 1 Room',
  primaryGuest: {
    name: 'Rohan Sharma',
    email: 'rohan.sharma@email.com',
    phone: '+91 98765 43210'
  },
  hasGst: false,
  addOns: {
    airportCab: true,
    comprehensiveCover: true
  },
  creditsRedeemed: false,
  creditsAmount: 2450,
  appliedPromo: 'SKYNORA100',
  promoDiscount: 1500,
  memberDiscount: 4000,
  taxPercent: 0.18,
  referenceId: '#SKN-2025-984210',
  hotelPnr: 'TAJ-GOA-7731',
  paymentMode: 'upi',
  upiVpa: 'rohan@okaxis',
  assignedDriver: {
    name: 'Suresh Naik',
    phone: '+91 98221 00412',
    carModel: 'Toyota Innova Crysta',
    licensePlate: 'GA-03-Z-4412',
    pickupTime: '18 Nov 2025 at 12:30 PM IST',
    pickupLocation: 'Goa Dabolim Airport (GOI) Terminal 1',
    dropLocation: 'Taj Fort Aguada, Candolim',
    estimatedDrive: '58 mins (36 km)'
  }
};
