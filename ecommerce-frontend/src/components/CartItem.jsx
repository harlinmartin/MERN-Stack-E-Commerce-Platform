import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus } from 'lucide-react';

const CartItem = ({ item, updateQtyHandler, removeFromCartHandler }) => {
  return (
    <div className="glass p-6 rounded-3xl flex flex-col sm:flex-row items-center gap-8 group">
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
            onClick={() => updateQtyHandler(item, Math.min(item.countInStock || 10, item.qty + 1))}
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
  );
};

export default CartItem;
