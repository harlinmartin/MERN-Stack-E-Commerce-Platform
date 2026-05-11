const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/product');

dotenv.config();

const products = [
  {
    name: 'iPhone 15 Pro',
    imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&q=80&w=800',
    description: 'The ultimate iPhone with Titanium design, A17 Pro chip, and advanced camera system.',
    category: 'Electronics',
    price: 134900,
    stock: 10,
    averageRating: 4.9,
  },
  {
    name: 'MacBook Air M3',
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop',
    description: 'Strikingly thin and fast so you can work, play, or create anywhere.',
    category: 'Electronics',
    price: 114900,
    stock: 8,
    averageRating: 4.8,
  },
  {
    name: 'Sony WH-1000XM5',
    imageUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800',
    description: 'Industry-leading noise canceling with two processors controlling 8 microphones.',
    category: 'Electronics',
    price: 29990,
    stock: 15,
    averageRating: 4.9,
  },
  {
    name: 'Premium Leather Jacket',
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800',
    description: 'Classic leather jacket made from high-quality cowhide for a timeless look.',
    category: 'Clothing',
    price: 8999,
    stock: 15,
    averageRating: 4.7,
  },
  {
    name: 'Minimalist Wall Clock',
    imageUrl: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&q=80&w=800',
    description: 'Elegant wooden wall clock that fits perfectly in any modern home.',
    category: 'Home & Living',
    price: 2499,
    stock: 20,
    averageRating: 4.5,
  },
  {
    name: 'Apple AirPods Pro 2',
    imageUrl: 'https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?auto=format&fit=crop&q=80&w=800',
    description: 'Active Noise Cancellation and Transparency mode for a customized fit.',
    category: 'Accessories',
    price: 24900,
    stock: 30,
    averageRating: 4.8,
  },
  {
    name: 'Premium Cotton T-Shirt',
    imageUrl: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=800',
    description: 'Super soft, 100% organic cotton tee with a perfect modern fit.',
    category: 'Clothing',
    price: 1499,
    stock: 50,
    averageRating: 4.6,
  },
  {
    name: 'Modern Smart Watch',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
    description: 'Track your fitness, notifications, and more with this sleek companion.',
    category: 'Electronics',
    price: 4999,
    stock: 25,
    averageRating: 4.4,
  },
  {
    name: 'Designer Sunglasses',
    imageUrl: 'https://images.unsplash.com/photo-1511499767390-a73923f61dd0?auto=format&fit=crop&q=80&w=800',
    description: 'Classic aviator style with polarized lenses for ultimate protection and style.',
    category: 'Accessories',
    price: 7999,
    stock: 15,
    averageRating: 4.7,
  },
  {
    name: 'Organic Skin Care Set',
    imageUrl: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=800',
    description: 'Complete daily routine with natural ingredients for glowing, healthy skin.',
    category: 'Beauty',
    price: 3499,
    stock: 20,
    averageRating: 4.9,
  },
  {
    name: 'Ceramic Decorative Vase',
    imageUrl: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&q=80&w=800',
    description: 'Hand-crafted ceramic vase with a unique texture for your living space.',
    category: 'Home & Living',
    price: 1899,
    stock: 12,
    averageRating: 4.6,
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany();
    await Product.insertMany(products);

    console.log('Data Seeded Successfully with FINAL Verified Images!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
