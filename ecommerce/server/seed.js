const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  joinedDate: { type: Date, default: Date.now }
});

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  stock: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Models
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);

// Sample data
const sampleUsers = [
  {
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: 'admin@123',
    role: 'admin',
    joinedDate: new Date()
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user',
    phone: '+91-9876543210',
    address: {
      street: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400001',
      country: 'India'
    },
    joinedDate: new Date('2024-01-15')
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    role: 'user',
    phone: '+91-9876543211',
    address: {
      street: '456 Park Avenue',
      city: 'Delhi',
      state: 'Delhi',
      zipCode: '110001',
      country: 'India'
    },
    joinedDate: new Date('2024-02-20')
  },
  {
    name: 'Mike Johnson',
    email: 'mike@example.com',
    password: 'password123',
    role: 'user',
    phone: '+91-9876543212',
    address: {
      street: '789 Oak Street',
      city: 'Bangalore',
      state: 'Karnataka',
      zipCode: '560001',
      country: 'India'
    },
    joinedDate: new Date('2024-03-10')
  }
];

const sampleProducts = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "Premium quality wireless headphones with noise cancellation",
    price: 2999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    stock: 50,
    featured: true
  },
  {
    name: "Smart Fitness Watch",
    description: "Track your fitness goals with this advanced smartwatch",
    price: 8999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    stock: 30,
    featured: true
  },
  {
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and eco-friendly cotton t-shirt",
    price: 899,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    stock: 100,
    featured: false
  },
  {
    name: "Professional Camera",
    description: "High-quality DSLR camera for photography enthusiasts",
    price: 45999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500",
    stock: 15,
    featured: true
  },
  {
    name: "Running Shoes",
    description: "Lightweight and comfortable running shoes",
    price: 3499,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    stock: 75,
    featured: false
  },
  {
    name: "Leather Wallet",
    description: "Premium leather wallet with multiple card slots",
    price: 1299,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
    stock: 40,
    featured: false
  },
  {
    name: "Gaming Laptop",
    description: "High-performance laptop for gaming and work",
    price: 89999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500",
    stock: 10,
    featured: true
  },
  {
    name: "Yoga Mat",
    description: "Non-slip yoga mat for your fitness routine",
    price: 1999,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500",
    stock: 60,
    featured: false
  }
];

const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});

    // Insert sample users
    await User.insertMany(sampleUsers);
    console.log('Sample users inserted');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log('Sample products inserted');

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();