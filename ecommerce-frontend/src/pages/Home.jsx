import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../redux/thunks/productThunks';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal, Loader2, Package } from 'lucide-react';

const Home = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('-createdAt');

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, category, sort));
  }, [dispatch, keyword, category, sort]);

  const categories = ['Electronics', 'Clothing', 'Home & Living', 'Accessories', 'Beauty'];

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[400px] rounded-[40px] overflow-hidden bg-slate-900 flex items-center px-12 group">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/50 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
          alt="Banner"
        />
        <div className="relative z-20 max-w-xl text-white space-y-6">
          <h1 className="text-6xl font-black leading-tight">Elevate Your <br />Lifestyle.</h1>
          <p className="text-indigo-100 text-lg max-w-md">Discover the finest selection of premium products curated just for you.</p>
          <button className="btn-primary !px-8 !py-4 text-lg">Shop Now</button>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between glass p-6 rounded-[32px]">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search our collection..."
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm">
            <SlidersHorizontal className="w-4 h-4 text-slate-500" />
            <select 
              className="bg-transparent border-none focus:ring-0 text-sm font-medium outline-none"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm">
            <select 
              className="bg-transparent border-none focus:ring-0 text-sm font-medium outline-none"
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="-createdAt">Newest First</option>
              <option value="price">Price: Low to High</option>
              <option value="-price">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
          <p className="text-slate-500 font-medium">Loading premium collection...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20 bg-red-50 rounded-3xl border border-red-100">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4 text-slate-400">
          <Package className="w-16 h-16" />
          <p className="text-xl font-semibold">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
