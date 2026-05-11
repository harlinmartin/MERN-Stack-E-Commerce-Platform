const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/product');
const User = require('./models/user');

dotenv.config();

const products = [
  {
    name: 'iPhone 15 Pro',
    imageUrl: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800',
    description: 'The ultimate iPhone with Titanium design, A17 Pro chip, and advanced camera system.',
    category: 'Electronics',
    price: 999.99,
    stock: 10,
    averageRating: 4.9,
  },
  {
    name: 'MacBook Air M3',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
    description: 'Strikingly thin and fast so you can work, play, or create anywhere.',
    category: 'Electronics',
    price: 1299.99,
    stock: 5,
    averageRating: 4.8,
  },
  {
    name: 'Premium Leather Jacket',
    imageUrl: 'https://images.unsplash.com/photo-1551028711-03057e444391?auto=format&fit=crop&q=80&w=800',
    description: 'Classic leather jacket made from high-quality cowhide for a timeless look.',
    category: 'Clothing',
    price: 199.99,
    stock: 15,
    averageRating: 4.7,
  },
  {
    name: 'Minimalist Wall Clock',
    imageUrl: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&q=80&w=800',
    description: 'Elegant wooden wall clock that fits perfectly in any modern home.',
    category: 'Home & Living',
    price: 49.99,
    stock: 20,
    averageRating: 4.5,
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    await Product.deleteMany();
    await Product.insertMany(products);
    
    console.log('Data Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
