import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { cartAddItem, cartRemoveItem } from '../redux/slices/cartSlice';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const removeFromCartHandler = (id) => {
    dispatch(cartRemoveItem(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  const updateQtyHandler = (item, qty) => {
    dispatch(cartAddItem({ ...item, qty }));
  };

  return (
    <div className="animate-fade-in space-y-10 pb-20">
      <div className="flex items-center gap-4">
        <h1 className="text-4xl font-black text-slate-900">Your Cart</h1>
        <span className="bg-slate-200 text-slate-700 px-3 py-1 rounded-full text-sm font-bold">
          {cartItems.reduce((acc, item) => acc + item.qty, 0)} items
        </span>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-6 glass rounded-[48px]">
          <ShoppingBag className="w-20 h-20 text-slate-300" />
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
            <p className="text-slate-500 mb-8">Looks like you haven't added anything yet.</p>
            <Link to="/" className="btn-primary !px-8">
              Start Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div key={item.product} className="glass p-6 rounded-3xl flex flex-col sm:flex-row items-center gap-8 group">
                <div className="w-32 h-32 bg-white rounded-2xl p-2 flex items-center justify-center overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                </div>
                
                <div className="flex-grow space-y-2">
                  <Link to={`/product/${item.product}`} className="text-lg font-bold text-slate-900 hover:text-indigo-600 transition-colors">
                    {item.name}
                  </Link>
                  <p className="text-2xl font-black text-indigo-600">₹{item.price}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center bg-slate-50 p-1.5 rounded-xl border border-slate-200">
                    <button 
                      onClick={() => updateQtyHandler(item, Math.max(1, item.qty - 1))}
                      className="p-1.5 hover:bg-white rounded-lg transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-bold">{item.qty}</span>
                    <button 
                      onClick={() => updateQtyHandler(item, Math.min(item.countInStock, item.qty + 1))}
                      className="p-1.5 hover:bg-white rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCartHandler(item.product)}
                    className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="glass p-8 rounded-[40px] sticky top-32 space-y-8">
              <h3 className="text-2xl font-bold text-slate-900">Order Summary</h3>
              
              <div className="space-y-4 text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">
                    ₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold uppercase text-xs">Free</span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 flex justify-between items-end">
                <span className="text-lg font-medium">Total</span>
                <span className="text-4xl font-black text-slate-900">
                  ₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                </span>
              </div>

              <button 
                onClick={checkoutHandler}
                className="w-full btn-primary !py-5 flex items-center justify-center gap-3 text-lg !rounded-3xl group"
              >
                Checkout
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
