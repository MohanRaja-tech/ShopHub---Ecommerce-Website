const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description: "Premium quality wireless headphones with noise cancellation and long battery life",
    price: 79.99,
    originalPrice: 99.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    inStock: true,
    stock: 25,
    rating: 4.5,
    reviews: 128,
    featured: true,
    trending: false
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    description: "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring",
    price: 199.99,
    originalPrice: 249.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    inStock: true,
    stock: 15,
    rating: 4.3,
    reviews: 89,
    featured: true,
    trending: true
  },
  {
    id: "3",
    name: "Premium Coffee Maker",
    description: "Brew the perfect cup of coffee every morning with this professional-grade coffee maker",
    price: 149.99,
    category: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
    inStock: true,
    stock: 8,
    rating: 4.7,
    reviews: 156,
    featured: false,
    trending: true
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    description: "Comfortable and supportive office chair designed for long hours of work",
    price: 299.99,
    originalPrice: 399.99,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
    inStock: true,
    stock: 12,
    rating: 4.4,
    reviews: 73,
    featured: true,
    trending: false
  },
  {
    id: "5",
    name: "Organic Cotton T-Shirt",
    description: "Soft and comfortable organic cotton t-shirt available in multiple colors",
    price: 24.99,
    originalPrice: 34.99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    inStock: true,
    stock: 50,
    rating: 4.2,
    reviews: 94,
    featured: false,
    trending: true
  },
  {
    id: "6",
    name: "Stainless Steel Water Bottle",
    description: "Insulated stainless steel water bottle that keeps drinks cold for 24 hours",
    price: 19.99,
    category: "Sports & Outdoors",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400",
    inStock: true,
    stock: 35,
    rating: 4.6,
    reviews: 112,
    featured: true,
    trending: false
  },
  {
    id: "7",
    name: "LED Desk Lamp",
    description: "Adjustable LED desk lamp with multiple brightness levels and USB charging port",
    price: 39.99,
    originalPrice: 59.99,
    category: "Home & Garden",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",
    inStock: true,
    stock: 22,
    rating: 4.1,
    reviews: 67,
    featured: false,
    trending: true
  },
  {
    id: "8",
    name: "Wireless Charging Pad",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices",
    price: 29.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400",
    inStock: false,
    stock: 0,
    rating: 4.3,
    reviews: 45,
    featured: false,
    trending: false
  },
  {
    id: "9",
    name: "Yoga Mat with Carrying Strap",
    description: "Non-slip yoga mat made from eco-friendly materials with free carrying strap",
    price: 34.99,
    category: "Sports & Outdoors",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    inStock: true,
    stock: 18,
    rating: 4.5,
    reviews: 89,
    featured: true,
    trending: true
  },
  {
    id: "10",
    name: "Bluetooth Portable Speaker",
    description: "Compact waterproof Bluetooth speaker with impressive sound quality",
    price: 49.99,
    originalPrice: 69.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
    inStock: true,
    stock: 30,
    rating: 4.4,
    reviews: 156,
    featured: true,
    trending: false
  }
];

const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert new products
    await Product.insertMany(products);
    console.log('✅ Products seeded successfully');

    console.log(`📦 Inserted ${products.length} products`);
    
    mongoose.connection.close();
    console.log('✅ Database connection closed');
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();