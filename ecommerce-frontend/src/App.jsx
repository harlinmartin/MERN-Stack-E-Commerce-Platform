import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages Placeholder
const Home = () => <div className="min-h-[60vh] flex items-center justify-center text-3xl font-bold">Welcome to EliteCommerce</div>;
const Login = () => <div className="min-h-[60vh] flex items-center justify-center text-3xl font-bold">Login Page</div>;
const Cart = () => <div className="min-h-[60vh] flex items-center justify-center text-3xl font-bold">Shopping Cart</div>;

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow max-w-7xl mx-auto px-6 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
