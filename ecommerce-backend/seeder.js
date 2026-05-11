const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/product');

dotenv.config();

const products = [
  {
    name: 'iPhone 15 Pro',
    imageUrl: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=800&auto=format&fit=crop',
    description: 'The ultimate iPhone with Titanium design, A17 Pro chip, and advanced camera system.',
    category: 'Electronics',
    price: 134900,
    stock: 10,
    averageRating: 4.9,
  },
  {
    name: 'MacBook Air M3',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop',
    description: 'Strikingly thin and fast so you can work, play, or create anywhere.',
    category: 'Electronics',
    price: 114900,
    stock: 5,
    averageRating: 4.8,
  },
  {
    name: 'Sony WH-1000XM5',
    imageUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop',
    description: 'Industry-leading noise canceling with two processors controlling 8 microphones.',
    category: 'Electronics',
    price: 29990,
    stock: 15,
    averageRating: 4.9,
  },
  {
    name: 'Premium Leather Jacket',
    imageUrl: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5bab3?q=80&w=800&auto=format&fit=crop',
    description: 'Classic leather jacket made from high-quality cowhide for a timeless look.',
    category: 'Clothing',
    price: 8999,
    stock: 15,
    averageRating: 4.7,
  },
  {
    name: 'Minimalist Wall Clock',
    imageUrl: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?q=80&w=800&auto=format&fit=crop',
    description: 'Elegant wooden wall clock that fits perfectly in any modern home.',
    category: 'Home & Living',
    price: 2499,
    stock: 20,
    averageRating: 4.5,
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    await Product.deleteMany();
    await Product.insertMany(products);
    
    console.log('Data Seeded Successfully with Fixed Images!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
