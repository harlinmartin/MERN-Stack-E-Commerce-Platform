import React from 'react';
import { useSelector } from 'react-redux';
import { User, Mail, Shield, Calendar, Package, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.order);

  if (!userInfo) return null;

  return (
    <div className="animate-fade-in space-y-12 pb-20 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black text-slate-900">Your Account</h1>
        <p className="text-slate-500 text-lg">Manage your profile and track your orders.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="md:col-span-1 space-y-6">
          <div className="glass p-8 rounded-[40px] flex flex-col items-center text-center space-y-6 border-b-8 border-indigo-600">
            <div className="w-24 h-24 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-indigo-100">
              {userInfo.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{userInfo.name}</h2>
              <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">{userInfo.role}</span>
            </div>
          </div>

          <div className="glass p-6 rounded-3xl space-y-4">
            <div className="flex items-center gap-4 text-slate-600">
              <Mail className="w-5 h-5 text-indigo-500" />
              <div className="overflow-hidden">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Email Address</p>
                <p className="font-semibold truncate">{userInfo.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-slate-600">
              <Shield className="w-5 h-5 text-indigo-500" />
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Account Status</p>
                <p className="font-semibold text-green-600">Verified Account</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard / Quick Stats */}
        <div className="md:col-span-2 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass p-8 rounded-[32px] bg-indigo-600 text-white space-y-2 group hover:scale-[1.02] transition-all cursor-pointer">
              <Package className="w-8 h-8 opacity-80" />
              <p className="text-3xl font-black">{orders.length}</p>
              <p className="text-sm font-bold opacity-80 uppercase tracking-wider">Total Orders</p>
            </div>
            <div className="glass p-8 rounded-[32px] bg-slate-900 text-white space-y-2 group hover:scale-[1.02] transition-all cursor-pointer">
              <Calendar className="w-8 h-8 opacity-80" />
              <p className="text-3xl font-black">2024</p>
              <p className="text-sm font-bold opacity-80 uppercase tracking-wider">Member Since</p>
            </div>
          </div>

          <div className="glass p-8 rounded-[32px] space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Recent Activity</h3>
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.slice(0, 3).map((order) => (
                  <div key={order._id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-white rounded-xl shadow-sm"><Package className="w-5 h-5 text-indigo-600" /></div>
                      <div>
                        <p className="font-bold text-slate-900">Order #{order._id.slice(-6)}</p>
                        <p className="text-xs text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <Link to="/orders" className="p-2 hover:bg-white rounded-lg transition-colors">
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 space-y-4">
                <Package className="w-12 h-12 mx-auto opacity-20" />
                <p className="font-medium">No recent orders found</p>
                <Link to="/" className="inline-block text-indigo-600 font-bold hover:underline">Start shopping today</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
