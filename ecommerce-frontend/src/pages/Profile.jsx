import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../redux/thunks/authThunks';
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
  const { userInfo, loading, error } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

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
        <div className={`p-4 rounded-2xl text-center font-bold animate-bounce ${message.includes('match') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Profile Details Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass p-8 rounded-[48px] flex flex-col items-center text-center space-y-6 border-b-8 border-indigo-600 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
               <button 
                onClick={() => setIsEditing(!isEditing)}
                className={`p-3 rounded-2xl transition-all ${isEditing ? 'bg-red-50 text-red-500' : 'bg-indigo-50 text-indigo-600'}`}
               >
                 {isEditing ? <X className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
               </button>
            </div>
            <div className="w-32 h-32 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-[40px] flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-indigo-100 ring-8 ring-indigo-50">
              {userInfo.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{userInfo.name}</h2>
              <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">{userInfo.role}</span>
            </div>
          </div>

          <div className="glass p-8 rounded-[32px] space-y-6">
            <div className="flex items-center gap-4 text-slate-600">
              <div className="p-3 bg-slate-50 rounded-2xl"><Mail className="w-5 h-5 text-indigo-500" /></div>
              <div className="overflow-hidden text-left">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</p>
                <p className="font-bold truncate text-slate-900">{userInfo.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-slate-600">
              <div className="p-3 bg-slate-50 rounded-2xl"><Shield className="w-5 h-5 text-indigo-500" /></div>
              <div className="text-left">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Account Status</p>
                <p className="font-bold text-green-600">Verified Member</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Section: Edit Form or Activity Dashboard */}
        <div className="lg:col-span-2 space-y-8">
          {isEditing ? (
            <div className="glass p-10 rounded-[48px] shadow-2xl animate-scale-up">
              <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <Edit3 className="w-6 h-6 text-indigo-600" />
                Edit Profile
              </h3>
              <form onSubmit={submitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase ml-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-4 px-6 focus:bg-white focus:border-indigo-100 outline-none transition-all font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase ml-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-4 px-6 focus:bg-white focus:border-indigo-100 outline-none transition-all font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase ml-1">New Password</label>
                  <input
                    type="password"
                    placeholder="Leave blank to keep current"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-4 px-6 focus:bg-white focus:border-indigo-100 outline-none transition-all font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase ml-1">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-4 px-6 focus:bg-white focus:border-indigo-100 outline-none transition-all font-bold"
                  />
                </div>
                <div className="md:col-span-2 pt-4">
                  <button 
                    disabled={loading}
                    className="w-full btn-primary !py-5 flex items-center justify-center gap-3 text-lg !rounded-[24px]"
                  >
                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="glass p-10 rounded-[40px] bg-indigo-600 text-white space-y-3 group hover:-translate-y-2 transition-all cursor-pointer shadow-xl shadow-indigo-200">
                  <Package className="w-10 h-10 opacity-70" />
                  <p className="text-5xl font-black">{orders.length}</p>
                  <p className="text-xs font-black opacity-70 uppercase tracking-[0.2em]">Orders Placed</p>
                </div>
                <div className="glass p-10 rounded-[40px] bg-slate-900 text-white space-y-3 group hover:-translate-y-2 transition-all cursor-pointer shadow-xl shadow-slate-200">
                  <Calendar className="w-10 h-10 opacity-70" />
                  <p className="text-5xl font-black">2024</p>
                  <p className="text-xs font-black opacity-70 uppercase tracking-[0.2em]">Member Since</p>
                </div>
              </div>

              <div className="glass p-10 rounded-[40px] space-y-8">
                <div className="flex items-center justify-between">
                   <h3 className="text-2xl font-black text-slate-900">Recent Activity</h3>
                   <Link to="/orders" className="text-indigo-600 font-bold hover:underline text-sm">View All</Link>
                </div>
                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.slice(0, 3).map((order) => (
                      <div key={order._id} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl hover:bg-slate-100 transition-all group">
                        <div className="flex items-center gap-6">
                          <div className="p-3 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform"><Package className="w-6 h-6 text-indigo-600" /></div>
                          <div>
                            <p className="font-black text-slate-900 text-lg">Order #{order._id.slice(-6)}</p>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <Link to="/orders" className="p-3 hover:bg-white rounded-2xl transition-colors text-slate-400">
                          <ArrowRight className="w-5 h-5" />
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-20 text-center text-slate-400 space-y-6">
                    <Package className="w-20 h-20 mx-auto opacity-10" />
                    <p className="text-xl font-bold">Your order history is empty</p>
                    <Link to="/" className="inline-block btn-secondary !px-8">Discover Products</Link>
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
