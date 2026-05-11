import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listMyOrders } from '../redux/thunks/orderThunks';
import { Package, Calendar, CreditCard, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Orders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(listMyOrders());
  }, [dispatch]);

  return (
    <div className="animate-fade-in space-y-10 pb-20">
      <div className="flex items-center gap-4">
        <h1 className="text-4xl font-black text-slate-900">Order History</h1>
        <span className="bg-slate-200 text-slate-700 px-3 py-1 rounded-full text-sm font-bold">
          {orders.length} orders
        </span>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
          <p className="text-slate-500 font-medium">Fetching your orders...</p>
        </div>
      ) : error ? (
        <div className="flex items-center gap-3 py-6 px-8 bg-red-50 border border-red-100 rounded-3xl text-red-600">
          <AlertCircle className="w-6 h-6" />
          <p className="font-medium">{error}</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-6 glass rounded-[48px]">
          <Package className="w-20 h-20 text-slate-300" />
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">No orders yet</h2>
            <p className="text-slate-500 mb-8">Your shopping history will appear here once you make a purchase.</p>
            <Link to="/" className="btn-primary !px-8">
              Explore Products
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="glass p-8 rounded-[32px] hover:shadow-xl transition-all group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-4 flex-grow">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Calendar className="w-4 h-4" />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <CreditCard className="w-4 h-4" />
                      {order.paymentMethod}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      order.isPaid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.isPaid ? 'Paid' : 'Pending Payment'}
                    </span>
                  </div>
                  
                  <div className="flex -space-x-4 overflow-hidden">
                    {order.orderItems.map((item, idx) => (
                      <div key={idx} className="w-16 h-16 rounded-2xl border-4 border-white bg-white overflow-hidden shadow-sm">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-right space-y-2 shrink-0">
                  <p className="text-sm text-slate-500">Total Amount</p>
                  <p className="text-3xl font-black text-slate-900">₹{order.totalPrice.toFixed(2)}</p>
                  <Link to={`/order/${order._id}`} className="flex items-center justify-end gap-2 text-indigo-600 font-bold group-hover:gap-3 transition-all">
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
