export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  tags?: string[];
  specifications?: Record<string, string>;
}

export const categories = [
  "Electronics",
  "Fashion", 
  "Home & Kitchen",
  "Books",
  "Sports & Fitness",
  "Beauty & Personal Care",
  "Toys & Games",
  "Automotive",
  "Health & Wellness",
  "Groceries & Food"
];

export const products: Product[] = [
  // Electronics - Only products with verified working images
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description: "Premium noise-cancelling headphones with 30-hour battery life",
    price: 6499,
    originalPrice: 9999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&auto=format",
    rating: 4.5,
    reviews: 1247,
    inStock: true,
    tags: ["trending", "featured"]
  },
  {
    id: "2",
    name: "Apple iPhone 15 Pro",
    description: "Latest iPhone with A17 Pro chip, titanium design, and advanced camera",
    price: 134900,
    originalPrice: 139900,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop&auto=format",
    rating: 4.8,
    reviews: 892,
    inStock: true,
    tags: ["featured", "premium"]
  },
  {
    id: "3",
    name: "Dell XPS 13 Laptop",
    description: "Ultra-portable laptop with Intel i7, 16GB RAM, 512GB SSD",
    price: 89999,
    originalPrice: 99999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop&auto=format",
    rating: 4.6,
    reviews: 432,
    inStock: true,
    tags: ["featured"]
  },
  {
    id: "4",
    name: "Sony WH-1000XM4 Headphones",
    description: "Industry-leading noise canceling with 30-hour battery life",
    price: 24990,
    originalPrice: 29990,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop&auto=format",
    rating: 4.7,
    reviews: 2341,
    inStock: true,
    tags: ["premium", "trending"]
  },
  {
    id: "5",
    name: "iPad Air 5th Generation",
    description: "Powerful tablet with M1 chip, perfect for creativity and productivity",
    price: 59900,
    originalPrice: 64900,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop&auto=format",
    rating: 4.5,
    reviews: 876,
    inStock: true,
    tags: ["featured"]
  },
  {
    id: "6",
    name: "Canon EOS R6 Camera",
    description: "Full-frame mirrorless camera with 4K video recording",
    price: 164900,
    originalPrice: 179900,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop&auto=format",
    rating: 4.8,
    reviews: 234,
    inStock: true,
    tags: ["premium"]
  },
  {
    id: "7",
    name: "Apple Watch Series 9",
    description: "Advanced health monitoring with ECG and blood oxygen sensor",
    price: 41900,
    originalPrice: 45900,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1510017098667-27dfc7150acb?w=500&h=500&fit=crop&auto=format",
    rating: 4.4,
    reviews: 987,
    inStock: true,
    tags: ["featured", "health"]
  },
  {
    id: "8",
    name: "Samsung Galaxy S24 Ultra",
    description: "Flagship smartphone with S Pen and professional cameras",
    price: 124999,
    originalPrice: 129999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop&auto=format",
    rating: 4.7,
    reviews: 1876,
    inStock: true,
    tags: ["premium", "featured"]
  },

  // Fashion - Verified working images
  {
    id: "21",
    name: "Nike Air Max 270",
    description: "Lifestyle shoes with Max Air unit for all-day comfort",
    price: 12995,
    originalPrice: 14995,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop&auto=format",
    rating: 4.4,
    reviews: 2134,
    inStock: true,
    tags: ["trending", "sports"]
  },
  {
    id: "22",
    name: "Levi's 501 Original Fit Jeans",
    description: "Classic straight-leg jeans with authentic fit and finish",
    price: 4499,
    originalPrice: 5999,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=500&fit=crop&auto=format",
    rating: 4.2,
    reviews: 876,
    inStock: true,
    tags: ["classic", "denim"]
  },
  {
    id: "23",
    name: "Ray-Ban Aviator Sunglasses",
    description: "Iconic aviator sunglasses with crystal lenses and gold frame",
    price: 11999,
    originalPrice: 13999,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=500&h=500&fit=crop&auto=format",
    rating: 4.6,
    reviews: 1432,
    inStock: true,
    tags: ["classic", "premium"]
  },
  {
    id: "24",
    name: "Adidas Ultraboost 22",
    description: "High-performance running shoes with responsive Boost midsole",
    price: 16999,
    originalPrice: 18999,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop&auto=format",
    rating: 4.5,
    reviews: 987,
    inStock: true,
    tags: ["running", "performance"]
  },
  {
    id: "25",
    name: "Tommy Hilfiger Polo Shirt",
    description: "Classic cotton polo shirt with signature flag logo",
    price: 3999,
    originalPrice: 4999,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop&auto=format",
    rating: 4.1,
    reviews: 543,
    inStock: true,
    tags: ["casual", "classic"]
  },

  // Home & Kitchen - Verified working images
  {
    id: "41",
    name: "KitchenAid Stand Mixer",
    description: "Professional 5-quart stand mixer with 10 speeds and tilt-head design",
    price: 32999,
    originalPrice: 39999,
    category: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop&auto=format",
    rating: 4.8,
    reviews: 1432,
    inStock: true,
    tags: ["premium", "baking"]
  },
  {
    id: "42",
    name: "Nespresso Coffee Machine",
    description: "Compact espresso machine with milk frother and capsule system",
    price: 18999,
    originalPrice: 22999,
    category: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop&auto=format",
    rating: 4.6,
    reviews: 876,
    inStock: true,
    tags: ["coffee", "premium"]
  },
  {
    id: "45",
    name: "Modern Sofa Set",
    description: "Contemporary 3-seater sofa with premium fabric upholstery",
    price: 49999,
    originalPrice: 59999,
    category: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop&auto=format",
    rating: 4.2,
    reviews: 654,
    inStock: true,
    tags: ["furniture", "living room"]
  },

  // Books - Verified working images
  {
    id: "61",
    name: "The Psychology of Money",
    description: "Timeless lessons on wealth, greed, and happiness by Morgan Housel",
    price: 499,
    originalPrice: 599,
    category: "Books",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&h=500&fit=crop&auto=format",
    rating: 4.8,
    reviews: 2341,
    inStock: true,
    tags: ["finance", "bestseller"]
  },
  {
    id: "62",
    name: "Atomic Habits",
    description: "An easy and proven way to build good habits by James Clear",
    price: 449,
    originalPrice: 549,
    category: "Books",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=500&fit=crop&auto=format",
    rating: 4.9,
    reviews: 3456,
    inStock: true,
    tags: ["self-help", "bestseller"]
  },
  {
    id: "63",
    name: "Rich Dad Poor Dad",
    description: "What the rich teach their kids about money by Robert Kiyosaki",
    price: 399,
    originalPrice: 499,
    category: "Books",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&auto=format",
    rating: 4.6,
    reviews: 4321,
    inStock: true,
    tags: ["finance", "classic"]
  },
  {
    id: "64",
    name: "Think and Grow Rich",
    description: "Napoleon Hill's classic on personal achievement and success",
    price: 349,
    originalPrice: 449,
    category: "Books",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=500&fit=crop&auto=format",
    rating: 4.7,
    reviews: 1876,
    inStock: true,
    tags: ["self-help", "classic"]
  },
  {
    id: "65",
    name: "The Alchemist",
    description: "Paulo Coelho's inspiring tale about following your dreams",
    price: 299,
    originalPrice: 399,
    category: "Books",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=500&fit=crop&auto=format",
    rating: 4.5,
    reviews: 5432,
    inStock: true,
    tags: ["fiction", "bestseller"]
  },

  // Sports & Fitness - Verified working images
  {
    id: "71",
    name: "Adjustable Dumbbell Set",
    description: "Professional adjustable dumbbells with weight plates 5-50kg",
    price: 24999,
    originalPrice: 29999,
    category: "Sports & Fitness",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop&auto=format",
    rating: 4.6,
    reviews: 876,
    inStock: true,
    tags: ["strength training", "home gym"]
  },
  {
    id: "72",
    name: "Yoga Mat Premium",
    description: "Non-slip yoga mat with alignment lines and carrying strap",
    price: 2999,
    originalPrice: 3999,
    category: "Sports & Fitness",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop&auto=format",
    rating: 4.4,
    reviews: 1432,
    inStock: true,
    tags: ["yoga", "exercise"]
  },
  {
    id: "73",
    name: "Whey Protein Powder",
    description: "Premium whey protein isolate with 25g protein per serving",
    price: 4999,
    originalPrice: 5999,
    category: "Sports & Fitness",
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=500&h=500&fit=crop&auto=format",
    rating: 4.5,
    reviews: 2134,
    inStock: true,
    tags: ["supplements", "protein"]
  },
  {
    id: "74",
    name: "Resistance Bands Set",
    description: "11-piece resistance bands set with door anchor and handles",
    price: 1999,
    originalPrice: 2999,
    category: "Sports & Fitness",
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=500&fit=crop&auto=format",
    rating: 4.2,
    reviews: 987,
    inStock: true,
    tags: ["resistance training", "portable"]
  },

  // Beauty & Personal Care - Verified working images
  {
    id: "86",
    name: "Nivea Face Cream",
    description: "Daily moisturizing face cream with SPF 15 and vitamin E",
    price: 899,
    originalPrice: 1199,
    category: "Beauty & Personal Care",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500&h=500&fit=crop&auto=format",
    rating: 4.3,
    reviews: 2341,
    inStock: true,
    tags: ["skincare", "moisturizer"]
  },
  {
    id: "87",
    name: "L'Oreal Paris Shampoo",
    description: "Sulfate-free shampoo for damaged hair with keratin complex",
    price: 649,
    originalPrice: 799,
    category: "Beauty & Personal Care",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=500&fit=crop&auto=format",
    rating: 4.2,
    reviews: 1876,
    inStock: true,
    tags: ["haircare", "repair"]
  },
  {
    id: "88",
    name: "Maybelline Mascara",
    description: "Volumizing mascara with 24-hour wear and waterproof formula",
    price: 999,
    originalPrice: 1299,
    category: "Beauty & Personal Care",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=500&fit=crop&auto=format",
    rating: 4.4,
    reviews: 3456,
    inStock: true,
    tags: ["makeup", "eyes"]
  },
  {
    id: "90",
    name: "Oral-B Electric Toothbrush",
    description: "Rechargeable electric toothbrush with pressure sensor and timer",
    price: 4999,
    originalPrice: 6999,
    category: "Beauty & Personal Care",
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=500&h=500&fit=crop&auto=format",
    rating: 4.6,
    reviews: 1432,
    inStock: true,
    tags: ["oral care", "electric"]
  }
];

// Helper functions
export const getFeaturedProducts = () => products.filter(p => p.tags?.includes("featured"));
export const getTrendingProducts = () => products.filter(p => p.tags?.includes("trending"));
export const getProductsByCategory = (category: string) => products.filter(p => p.category === category);
export const getProductById = (id: string) => products.find(p => p.id === id);
export const searchProducts = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowercaseQuery) ||
    p.description.toLowerCase().includes(lowercaseQuery) ||
    p.category.toLowerCase().includes(lowercaseQuery) ||
    p.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};