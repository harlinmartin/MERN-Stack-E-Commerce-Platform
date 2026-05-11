import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingBag, User, LogOut, Search, Menu, Package } from 'lucide-react';
import { logout } from '../redux/slices/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 glass px-6 py-4 mb-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          EliteCommerce
        </Link>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-md mx-8 relative group">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full bg-slate-100 border-none rounded-2xl py-2.5 pl-4 pr-10 focus:ring-2 focus:ring-indigo-500 transition-all group-hover:bg-slate-200"
          />
          <Search className="absolute right-3 top-3 text-slate-400 w-5 h-5" />
        </div>

        {/* Icons/Links */}
        <div className="flex items-center gap-6">
          <Link to="/cart" className="relative p-2 text-slate-600 hover:text-indigo-600 transition-all hover:scale-110">
            <ShoppingBag className="w-6 h-6" />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </span>
            )}
          </Link>

          {userInfo ? (
            <div className="flex items-center gap-4">
              <Link to="/orders" className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-bold transition-colors">
                <Package className="w-5 h-5" />
                <span className="hidden sm:inline">Orders</span>
              </Link>
              <Link to="/profile" className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-bold transition-colors">
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">{userInfo.name}</span>
              </Link>
              <button 
                onClick={logoutHandler}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="btn-secondary !px-5 !py-2 text-sm font-bold">Login</Link>
              <Link to="/register" className="btn-primary !px-5 !py-2 text-sm font-bold shadow-lg shadow-indigo-200">Join</Link>
            </div>
          )}

          <button className="md:hidden text-slate-600">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
