import { useDispatch } from 'react-redux';
import { cartAddItem } from '../redux/slices/cartSlice';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  const addToCartHandler = () => {
    dispatch(cartAddItem({
      product: product._id,
      name: product.name,
      image: product.imageUrl,
      price: product.price,
      countInStock: product.stock,
      qty: 1,
    }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };
  return (
    <div className="glass rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
      <Link to={`/product/${product._id}`}>
        <div className="h-64 overflow-hidden relative">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold text-slate-800">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            {product.averageRating || '4.5'}
          </div>
        </div>
      </Link>

      <div className="p-6">
        <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">
          {product.category}
        </div>
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-bold text-slate-900 mb-2 truncate group-hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-slate-500 text-sm mb-4 line-clamp-2 h-10">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-black text-slate-900">
            ₹{product.price}
          </span>
          <button 
            onClick={addToCartHandler}
            className={`${added ? 'bg-green-500' : 'bg-slate-900 hover:bg-indigo-600'} text-white p-3 rounded-2xl transition-all shadow-lg shadow-slate-200 active:scale-95 flex items-center justify-center`}
          >
            {added ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
