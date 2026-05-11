import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { listProductDetails } from '../redux/thunks/productThunks';
import { cartAddItem } from '../redux/slices/cartSlice';
import { ShoppingCart, Star, ShieldCheck, Truck, RotateCcw, Minus, Plus, Loader2 } from 'lucide-react';

const ProductDetail = () => {
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, product } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    dispatch(cartAddItem({
      product: product._id,
      name: product.name,
      image: product.imageUrl,
      price: product.price,
      countInStock: product.stock,
      qty,
    }));
    navigate('/cart');
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 space-y-4 animate-fade-in">
      <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      <p className="text-slate-500 font-medium">Fetching product details...</p>
    </div>
  );

  return (
    <div className="animate-fade-in pb-20">
      {error ? (
        <div className="text-center py-20 bg-red-50 rounded-3xl border border-red-100 text-red-600 font-medium">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Section */}
          <div className="glass rounded-[48px] overflow-hidden p-8 flex items-center justify-center bg-white">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="max-h-[600px] w-auto object-contain hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Info Section */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="bg-indigo-100 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-sm font-semibold text-slate-700">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {product.averageRating || '4.8'} (120+ Reviews)
                </div>
              </div>
              <h1 className="text-5xl font-black text-slate-900 leading-tight">{product.name}</h1>
              <p className="text-4xl font-black text-indigo-600">₹{product.price}</p>
            </div>

            <p className="text-slate-600 leading-relaxed text-lg">
              {product.description}
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center bg-slate-100 p-2 rounded-2xl border border-slate-200">
                  <button 
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="p-2 hover:bg-white rounded-xl transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-bold text-lg">{qty}</span>
                  <button 
                    onClick={() => setQty(Math.min(product.stock, qty + 1))}
                    className="p-2 hover:bg-white rounded-xl transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-sm">
                  <span className={`font-bold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                  </span>
                </div>
              </div>

              <button 
                disabled={product.stock === 0}
                onClick={addToCartHandler}
                className="w-full btn-primary !py-5 flex items-center justify-center gap-3 text-lg !rounded-3xl disabled:opacity-50"
              >
                <ShoppingCart className="w-6 h-6" />
                Add to Cart
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-200">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="p-3 bg-slate-50 rounded-2xl"><Truck className="w-6 h-6 text-indigo-600" /></div>
                <span className="text-xs font-bold text-slate-900">Fast Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="p-3 bg-slate-50 rounded-2xl"><ShieldCheck className="w-6 h-6 text-indigo-600" /></div>
                <span className="text-xs font-bold text-slate-900">Secure Payments</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="p-3 bg-slate-50 rounded-2xl"><RotateCcw className="w-6 h-6 text-indigo-600" /></div>
                <span className="text-xs font-bold text-slate-900">Free Returns</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
