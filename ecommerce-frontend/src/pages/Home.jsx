import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../redux/thunks/productThunks';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal, Loader2, Package, ArrowRight } from 'lucide-react';

import { useSearchParams } from 'react-router-dom';

const Home = () => {
  const [searchParams] = useSearchParams();
  const urlKeyword = searchParams.get('keyword') || '';
  
  const [keyword, setKeyword] = useState(urlKeyword);
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('-createdAt');
  const productRef = useRef(null);

  useEffect(() => {
    setKeyword(urlKeyword);
  }, [urlKeyword]);

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, category, sort));
  }, [dispatch, keyword, category, sort]);

  const scrollToProducts = () => {
    productRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const categories = ['Electronics', 'Clothing', 'Home & Living', 'Accessories', 'Beauty'];

  return (
    <div className="space-y-16 animate-fade-in pb-20">
      {/* Hero Section */}
      <section className="relative h-[500px] rounded-[60px] overflow-hidden flex items-center px-12 group shadow-2xl">
        <div className="absolute inset-0 bg-slate-900/40 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000" 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          alt="Banner"
        />
        <div className="relative z-20 max-w-2xl text-white space-y-8">
          <div className="inline-block bg-indigo-600/80 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em]">
            New Collection 2026
          </div>
          <h1 className="text-7xl font-black leading-[1.1]">Elevate Your <br /><span className="text-indigo-400">Lifestyle.</span></h1>
          <p className="text-indigo-50 text-xl max-w-md font-medium leading-relaxed">Discover the finest selection of premium products curated with precision and style.</p>
          <button 
            onClick={scrollToProducts}
            className="btn-primary !px-10 !py-5 text-lg flex items-center gap-3 group shadow-xl shadow-indigo-500/20"
          >
            Shop Now
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <div ref={productRef} className="space-y-12">
        {/* Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between glass p-8 rounded-[40px] shadow-sm">
          <div className="relative w-full lg:max-w-md group">
            <Search className="absolute left-5 top-4 text-slate-400 w-5 h-5 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="text"
              placeholder="Search our exclusive collection..."
              className="w-full bg-slate-50 border-2 border-transparent rounded-[24px] py-4 pl-14 pr-6 focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all font-medium"
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-3 bg-white px-6 py-3.5 rounded-[20px] border border-slate-100 shadow-sm hover:border-indigo-100 transition-colors cursor-pointer">
              <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              <select 
                className="bg-transparent border-none focus:ring-0 text-sm font-bold outline-none cursor-pointer"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="flex items-center gap-3 bg-white px-6 py-3.5 rounded-[20px] border border-slate-100 shadow-sm hover:border-indigo-100 transition-colors cursor-pointer">
              <select 
                className="bg-transparent border-none focus:ring-0 text-sm font-bold outline-none cursor-pointer"
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
          <div className="flex flex-col items-center justify-center py-32 space-y-6">
            <div className="relative">
              <Loader2 className="w-16 h-16 text-indigo-600 animate-spin" />
              <div className="absolute inset-0 bg-indigo-500/10 blur-xl rounded-full" />
            </div>
            <p className="text-slate-500 font-black uppercase tracking-widest text-sm">Loading Excellence...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-red-50 rounded-[40px] border-2 border-red-100">
            <p className="text-red-600 font-bold text-lg">{error}</p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-6 text-slate-300">
            <Package className="w-24 h-24 stroke-[1]" />
            <p className="text-2xl font-black uppercase tracking-widest">No results found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
