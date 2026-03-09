export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'electric' | 'acoustic' | 'bass' | 'accessory';
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  images: string[];
  stock: number;
  rating: number;
  reviews: number;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Les Paul Standard',
    brand: 'Gibson',
    category: 'electric',
    price: 2499,
    originalPrice: 2799,
    description: 'The Gibson Les Paul Standard delivers the iconic, creamy tone that has defined rock music for decades. Featuring a AAA flame maple top, 60s slim taper neck profile, and Burstbucker pickups.',
    features: [
      'AAA Flame Maple Top',
      'Mahogany Body',
      '60s Slim Taper Neck',
      'Burstbucker Pickups',
      'Rosewood Fingerboard',
    ],
    images: [
      'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800',
      'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=800',
    ],
    stock: 5,
    rating: 4.9,
    reviews: 127,
    featured: true,
  },
  {
    id: '2',
    name: 'Stratocaster American Pro',
    brand: 'Fender',
    category: 'electric',
    price: 1799,
    description: 'The American Professional Stratocaster is a serious tool for serious players. V-Mod single-coil pickups deliver authentic vintage tone with enhanced clarity.',
    features: [
      'Alder Body',
      'V-Mod Single Coils',
      'Modern Deep C Neck',
      'Two-Point Tremolo',
      '22 Narrow Tall Frets',
    ],
    images: [
      'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?w=800',
      'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=800',
    ],
    stock: 8,
    rating: 4.8,
    reviews: 89,
    featured: true,
  },
  {
    id: '3',
    name: 'D-28 Dreadnought',
    brand: 'Martin',
    category: 'acoustic',
    price: 3299,
    description: 'The D-28 is the quintessential acoustic guitar, delivering rich, powerful tone that has made it the choice of legendary artists for nearly a century.',
    features: [
      'Solid Sitka Spruce Top',
      'East Indian Rosewood Back and Sides',
      'Forward Shifted X Bracing',
      'Ebony Fingerboard',
      'Bone Nut and Saddle',
    ],
    images: [
      'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800',
      'https://images.unsplash.com/photo-1558098329-a11cff621064?w=800',
    ],
    stock: 3,
    rating: 4.9,
    reviews: 156,
    featured: true,
  },
  {
    id: '4',
    name: 'Jazz Bass American Original',
    brand: 'Fender',
    category: 'bass',
    price: 2199,
    description: 'The American Original Jazz Bass captures the vibe of Fenders early 60s basses with Pure Vintage pickups and authentic vintage appointments.',
    features: [
      'Alder Body',
      'Pure Vintage 64 Pickups',
      'Vintage-Tall Frets',
      'Nitrocellulose Lacquer Finish',
      '7.25 inch Radius Fingerboard',
    ],
    images: [
      'https://images.unsplash.com/photo-1629052164575-0ba58ca4fed1?w=800',
    ],
    stock: 4,
    rating: 4.7,
    reviews: 45,
  },
  {
    id: '5',
    name: 'Telecaster Deluxe',
    brand: 'Fender',
    category: 'electric',
    price: 1599,
    originalPrice: 1799,
    description: 'The Telecaster Deluxe brings classic 70s styling with wide-range humbucking pickups for warm, rich tones.',
    features: [
      'Alder Body',
      'Wide Range Humbuckers',
      'Maple Neck',
      'Block Inlays',
      'Vintage-Style Tuners',
    ],
    images: [
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    ],
    stock: 6,
    rating: 4.6,
    reviews: 67,
  },
  {
    id: '6',
    name: 'SG Standard',
    brand: 'Gibson',
    category: 'electric',
    price: 1999,
    description: 'The Gibson SG Standard delivers raw, aggressive tone with its dual humbuckers and lightweight mahogany body.',
    features: [
      'Mahogany Body',
      '490R/490T Humbuckers',
      'Slim Taper Neck',
      'Rosewood Fingerboard',
      'ABR-1 Bridge',
    ],
    images: [
      'https://images.unsplash.com/photo-1556449895-a33c9dba33dd?w=800',
    ],
    stock: 7,
    rating: 4.8,
    reviews: 98,
    featured: true,
  },
  {
    id: '7',
    name: 'Premium Guitar Strings Set',
    brand: 'Elixir',
    category: 'accessory',
    price: 15,
    description: 'Elixir Nanoweb coated strings provide long-lasting tone and smooth feel. Perfect for electric guitars.',
    features: [
      'Nanoweb Coating',
      'Anti-Rust Plating',
      'Extended Tone Life',
      'Smooth Feel',
      'Light Gauge 10-46',
    ],
    images: [
      'https://images.unsplash.com/photo-1558098329-a11cff621064?w=800',
    ],
    stock: 100,
    rating: 4.9,
    reviews: 342,
  },
  {
    id: '8',
    name: 'Tube Screamer TS9',
    brand: 'Ibanez',
    category: 'accessory',
    price: 99,
    description: 'The legendary Tube Screamer delivers warm overdrive tones that have defined rock and blues guitar.',
    features: [
      'Classic Overdrive Circuit',
      'True Bypass',
      'Drive, Tone, Level Controls',
      'LED Indicator',
      '9V Battery or Adapter',
    ],
    images: [
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800',
    ],
    stock: 25,
    rating: 4.8,
    reviews: 189,
  },
  {
    id: '9',
    name: 'Blues Jr IV Combo',
    brand: 'Fender',
    category: 'accessory',
    price: 699,
    originalPrice: 799,
    description: 'The Blues Junior IV delivers classic Fender tone in a compact, portable package. Perfect for practice and small gigs.',
    features: [
      '15 Watts All-Tube',
      '12 inch Celestion Speaker',
      'Fat Switch',
      'Spring Reverb',
      'Cream Covering',
    ],
    images: [
      'https://images.unsplash.com/photo-1535587566541-97121a128dc5?w=800',
    ],
    stock: 10,
    rating: 4.7,
    reviews: 234,
  },
  {
    id: '10',
    name: 'Hummingbird Original',
    brand: 'Gibson',
    category: 'acoustic',
    price: 3999,
    description: 'The Gibson Hummingbird is a true acoustic legend with its distinctive square-shoulder design and powerful voice.',
    features: [
      'Sitka Spruce Top',
      'Mahogany Back and Sides',
      'Hummingbird Pickguard',
      'LR Baggs Pickup',
      'Heritage Cherry Sunburst',
    ],
    images: [
      'https://images.unsplash.com/photo-1605020420620-20c943cc4669?w=800',
    ],
    stock: 2,
    rating: 5.0,
    reviews: 78,
  },
  {
    id: '11',
    name: 'Guitar Capo Deluxe',
    brand: 'Kyser',
    category: 'accessory',
    price: 25,
    description: 'Quick-change capo with smooth release. Works on most acoustic and electric guitars.',
    features: [
      'One-Hand Operation',
      'Padded Clamp',
      'No Neck Damage',
      'Multiple Colors',
      'Lifetime Warranty',
    ],
    images: [
      'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800',
    ],
    stock: 50,
    rating: 4.6,
    reviews: 567,
  },
  {
    id: '12',
    name: 'StingRay Special',
    brand: 'Music Man',
    category: 'bass',
    price: 2399,
    description: 'The Music Man StingRay Special offers modern refinements to the iconic StingRay design with enhanced playability.',
    features: [
      'Roasted Maple Neck',
      'Neodymium Pickup',
      '18V Preamp',
      'Lightweight Body',
      'Stainless Steel Frets',
    ],
    images: [
      'https://images.unsplash.com/photo-1629052164575-0ba58ca4fed1?w=800',
    ],
    stock: 3,
    rating: 4.9,
    reviews: 89,
  },
];

export const categories = [
  { id: 'electric', name: 'Electric Guitars', icon: '⚡' },
  { id: 'acoustic', name: 'Acoustic Guitars', icon: '🎸' },
  { id: 'bass', name: 'Bass Guitars', icon: '🎵' },
  { id: 'accessory', name: 'Accessories', icon: '🎛️' },
];

export const brands = ['Gibson', 'Fender', 'Martin', 'Ibanez', 'Music Man', 'Elixir', 'Kyser'];
