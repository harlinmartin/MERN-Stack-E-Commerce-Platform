import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../redux/thunks/authThunks';
import { listMyOrders } from '../redux/thunks/orderThunks';
import { User, Mail, Shield, Calendar, Package, ArrowRight, Edit3, Save, X, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const { userInfo, loading: authLoading } = useSelector((state) => state.auth);
  const { orders, loading: ordersLoading } = useSelector((state) => state.order);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      dispatch(listMyOrders());
    }
  }, [userInfo, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateProfile({ name, email, password }));
      setIsEditing(false);
      setMessage('Profile Updated Successfully!');
      setTimeout(() => setMessage(null), 3000);
    }
  };

  if (!userInfo) return null;

  return (
    <div className="animate-fade-in space-y-12 pb-20 max-w-5xl mx-auto">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black text-slate-900">Your Account</h1>
        <p className="text-slate-500 text-lg">Manage your profile and track your orders.</p>
      </div>

      {message && (
        <div className={`p-4 rounded-2xl text-center font-bold animate-bounce shadow-lg ${message.includes('match') ? 'bg-red-50 text-red-600' : 'bg-green-600 text-white'}`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Profile Details Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass p-8 rounded-[48px] flex flex-col items-center text-center space-y-6 border-b-8 border-indigo-600 shadow-2xl relative overflow-hidden bg-white/40">
            <div className="absolute top-0 right-0 p-4">
               <button 
                onClick={() => setIsEditing(!isEditing)}
                className={`p-3 rounded-2xl transition-all shadow-md ${isEditing ? 'bg-red-50 text-red-500' : 'bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white'}`}
               >
                 {isEditing ? <X className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
               </button>
            </div>
            <div className="w-32 h-32 bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 rounded-[40px] flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-indigo-200 ring-8 ring-indigo-50/50">
              {userInfo.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">{userInfo.name}</h2>
              <span className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em] bg-indigo-50 px-3 py-1 rounded-full">{userInfo.role}</span>
            </div>
          </div>

          <div className="glass p-8 rounded-[32px] space-y-6 bg-white/40 shadow-xl">
            <div className="flex items-center gap-4 text-slate-600">
              <div className="p-3 bg-indigo-50 rounded-2xl"><Mail className="w-5 h-5 text-indigo-600" /></div>
              <div className="overflow-hidden text-left">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</p>
                <p className="font-bold truncate text-slate-900">{userInfo.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-slate-600">
              <div className="p-3 bg-green-50 rounded-2xl"><Shield className="w-5 h-5 text-green-600" /></div>
              <div className="text-left">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Account Status</p>
                <p className="font-bold text-green-600">Verified Member</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Section: Edit Form or Activity Dashboard */}
        <div className="lg:col-span-2 space-y-8">
          {isEditing ? (
            <div className="glass p-10 rounded-[48px] shadow-2xl animate-scale-up bg-white/80">
              <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <Edit3 className="w-6 h-6 text-indigo-600" />
                Edit Profile
              </h3>
              <form onSubmit={submitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-100 border-2 border-transparent rounded-2xl py-4 px-6 focus:bg-white focus:border-indigo-100 outline-none transition-all font-bold text-slate-900"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-100 border-2 border-transparent rounded-2xl py-4 px-6 focus:bg-white focus:border-indigo-100 outline-none transition-all font-bold text-slate-900"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-100 border-2 border-transparent rounded-2xl py-4 px-6 focus:bg-white focus:border-indigo-100 outline-none transition-all font-bold text-slate-900"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-slate-100 border-2 border-transparent rounded-2xl py-4 px-6 focus:bg-white focus:border-indigo-100 outline-none transition-all font-bold text-slate-900"
                  />
                </div>
                <div className="md:col-span-2 pt-4">
                  <button 
                    disabled={authLoading}
                    className="w-full btn-primary !py-5 flex items-center justify-center gap-3 text-lg !rounded-[24px] shadow-xl shadow-indigo-200"
                  >
                    {authLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="glass p-10 rounded-[48px] bg-gradient-to-br from-indigo-600 to-indigo-700 text-white space-y-3 group hover:-translate-y-2 transition-all cursor-pointer shadow-2xl shadow-indigo-200">
                  <div className="bg-white/20 w-16 h-16 rounded-3xl flex items-center justify-center"><Package className="w-8 h-8 text-white" /></div>
                  <p className="text-6xl font-black">{orders.length}</p>
                  <p className="text-xs font-black opacity-80 uppercase tracking-[0.3em]">Total Orders</p>
                </div>
                <div className="glass p-10 rounded-[48px] bg-gradient-to-br from-slate-800 to-slate-900 text-white space-y-3 group hover:-translate-y-2 transition-all cursor-pointer shadow-2xl shadow-slate-300">
                  <div className="bg-white/10 w-16 h-16 rounded-3xl flex items-center justify-center"><Calendar className="w-8 h-8 text-white" /></div>
                  <p className="text-6xl font-black">2024</p>
                  <p className="text-xs font-black opacity-80 uppercase tracking-[0.3em]">Joined Date</p>
                </div>
              </div>

              <div className="glass p-10 rounded-[48px] space-y-8 bg-white/40 shadow-2xl">
                <div className="flex items-center justify-between">
                   <h3 className="text-2xl font-black text-slate-900">Recent Activity</h3>
                   <Link to="/orders" className="flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all text-sm uppercase tracking-widest">
                     View All <ArrowRight className="w-4 h-4" />
                   </Link>
                </div>
                {ordersLoading ? (
                   <div className="py-20 flex justify-center"><Loader2 className="w-10 h-10 text-indigo-600 animate-spin" /></div>
                ) : orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.slice(0, 3).map((order) => (
                      <Link key={order._id} to={`/order/${order._id}`} className="flex items-center justify-between p-6 bg-white/60 rounded-[32px] hover:bg-white transition-all group border border-slate-100/50 shadow-sm hover:shadow-md">
                        <div className="flex items-center gap-6">
                          <div className="p-4 bg-indigo-50 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all"><Package className="w-6 h-6" /></div>
                          <div>
                            <p className="font-black text-slate-900 text-lg">Order #{order._id.slice(-6)}</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-right flex items-center gap-4">
                           <div>
                             <p className="font-black text-indigo-600 text-lg">₹{order.totalPrice.toFixed(0)}</p>
                             <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">{order.isPaid ? 'Paid' : 'Pending'}</p>
                           </div>
                           <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="py-20 text-center text-slate-400 space-y-6">
                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto"><Package className="w-12 h-12 opacity-20" /></div>
                    <p className="text-xl font-bold">Your order history is empty</p>
                    <Link to="/" className="inline-block btn-primary !px-10">Start Shopping</Link>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
