import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getOrderDetails } from '../redux/thunks/orderThunks';
import { Package, MapPin, CreditCard, CheckCircle, Clock, ChevronLeft, Loader2, AlertCircle } from 'lucide-react';

const OrderDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { order, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 space-y-4 animate-fade-in">
      <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      <p className="text-slate-500 font-medium">Loading order details...</p>
    </div>
  );

  if (error) return (
    <div className="flex items-center gap-3 py-6 px-8 bg-red-50 border border-red-100 rounded-3xl text-red-600 animate-fade-in">
      <AlertCircle className="w-6 h-6" />
      <p className="font-medium">{error}</p>
    </div>
  );

  if (!order) return null;

  return (
    <div className="animate-fade-in space-y-10 pb-20 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <Link to="/orders" className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-colors group">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Orders
        </Link>
        <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Order ID: #{order._id.slice(-8)}</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h1 className="text-4xl font-black text-slate-900">Order Details</h1>
        <div className={`px-6 py-2 rounded-full font-black text-sm uppercase tracking-[0.2em] shadow-lg ${
          order.isPaid ? 'bg-green-600 text-white shadow-green-100' : 'bg-yellow-500 text-white shadow-yellow-100'
        }`}>
          {order.isPaid ? 'Successfully Paid' : 'Payment Pending'}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Shipping Info */}
        <div className="glass p-8 rounded-[40px] space-y-6 bg-white/40 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 rounded-2xl"><MapPin className="w-6 h-6 text-indigo-600" /></div>
            <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm">Shipping</h3>
          </div>
          <div className="space-y-2 text-slate-600 font-medium">
            <p className="text-slate-900 font-bold">{order.shippingAddress.address}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
            <p>{order.shippingAddress.country}</p>
          </div>
          <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${order.isDelivered ? 'text-green-600' : 'text-slate-400'}`}>
            {order.isDelivered ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
            {order.isDelivered ? `Delivered at ${new Date(order.deliveredAt).toLocaleDateString()}` : 'Not Delivered Yet'}
          </div>
        </div>

        {/* Payment Info */}
        <div className="glass p-8 rounded-[40px] space-y-6 bg-white/40 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 rounded-2xl"><CreditCard className="w-6 h-6 text-indigo-600" /></div>
            <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm">Payment</h3>
          </div>
          <div className="space-y-2 text-slate-600 font-medium">
            <p className="text-slate-900 font-bold">Method: {order.paymentMethod}</p>
            <p>Status: {order.isPaid ? 'Paid' : 'Pending'}</p>
          </div>
          <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${order.isPaid ? 'text-green-600' : 'text-slate-400'}`}>
            {order.isPaid ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
            {order.isPaid ? `Paid at ${new Date(order.paidAt).toLocaleDateString()}` : 'Payment Required'}
          </div>
        </div>

        {/* Total Summary */}
        <div className="glass p-8 rounded-[40px] space-y-6 bg-slate-900 text-white shadow-2xl shadow-slate-200">
           <h3 className="font-black uppercase tracking-[0.2em] text-xs opacity-60">Order Summary</h3>
           <div className="space-y-4">
             <div className="flex justify-between text-sm opacity-80">
               <span>Items Subtotal</span>
               <span className="font-bold">₹{order.totalPrice.toFixed(0)}</span>
             </div>
             <div className="flex justify-between text-sm opacity-80">
               <span>Shipping Cost</span>
               <span className="font-bold">FREE</span>
             </div>
             <div className="pt-4 border-t border-white/10 flex justify-between items-end">
               <span className="text-sm font-black uppercase tracking-widest">Total Paid</span>
               <span className="text-3xl font-black">₹{order.totalPrice.toFixed(0)}</span>
             </div>
           </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="glass p-10 rounded-[48px] bg-white/40 shadow-2xl space-y-8">
        <h3 className="text-2xl font-black text-slate-900">Order Items</h3>
        <div className="space-y-6">
          {order.orderItems.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-6 bg-white/60 rounded-[32px] group hover:bg-white transition-all shadow-sm border border-slate-100/50">
              <div className="flex items-center gap-8">
                <div className="w-24 h-24 bg-white rounded-3xl p-3 flex items-center justify-center overflow-hidden shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                  <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                </div>
                <div>
                  <Link to={`/product/${item.product}`} className="text-xl font-black text-slate-900 hover:text-indigo-600 transition-colors">
                    {item.name}
                  </Link>
                  <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">{item.qty} units × ₹{item.price}</p>
                </div>
              </div>
              <p className="text-2xl font-black text-indigo-600">₹{item.qty * item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
