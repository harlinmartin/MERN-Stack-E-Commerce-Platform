import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { cartAddItem, cartRemoveItem } from '../redux/slices/cartSlice';
import { createOrder } from '../redux/thunks/orderThunks';
import CartItem from '../components/CartItem';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus, Loader2 } from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const { loading: orderLoading } = useSelector((state) => state.order);

  const removeFromCartHandler = (id) => {
    dispatch(cartRemoveItem(id));
  };

  const checkoutHandler = async () => {
    if (!userInfo) {
      navigate('/login?redirect=/cart');
      return;
    }

    const orderData = {
      orderItems: cartItems.map(item => ({
        name: item.name,
        qty: item.qty,
        image: item.image,
        price: item.price,
        product: item.product,
      })),
      shippingAddress: {
        address: userInfo.address || '123 Main St',
        city: userInfo.city || 'Mumbai',
        postalCode: userInfo.postalCode || '400001',
        country: userInfo.country || 'India',
      },
      paymentMethod: 'PayPal',
      itemsPrice: cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
    };

    await dispatch(createOrder(orderData));
    navigate('/orders');
  };

  const updateQtyHandler = (item, qty) => {
    dispatch(cartAddItem({ ...item, qty }));
  };

  return (
    <div className="animate-fade-in space-y-10 pb-20">
      <div className="flex items-center gap-4">
        <h1 className="text-4xl font-black text-slate-900">Your Cart</h1>
        <span className="bg-slate-200 text-slate-700 px-3 py-1 rounded-full text-sm font-bold">
          {cartItems.reduce((acc, item) => acc + item.qty, 0)} items
        </span>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-6 glass rounded-[48px]">
          <ShoppingBag className="w-20 h-20 text-slate-300" />
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
            <p className="text-slate-500 mb-8">Looks like you haven't added anything yet.</p>
            <Link to="/" className="btn-primary !px-8">
              Start Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <CartItem 
                key={item.product} 
                item={item} 
                updateQtyHandler={updateQtyHandler} 
                removeFromCartHandler={removeFromCartHandler} 
              />
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="glass p-8 rounded-[40px] sticky top-32 space-y-8">
              <h3 className="text-2xl font-bold text-slate-900">Order Summary</h3>
              
              <div className="space-y-4 text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">
                    ₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold uppercase text-xs">Free</span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 flex justify-between items-end">
                <span className="text-lg font-medium">Total</span>
                <span className="text-4xl font-black text-slate-900">
                  ₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                </span>
              </div>

              <button 
                onClick={checkoutHandler}
                disabled={cartItems.length === 0 || orderLoading}
                className="w-full btn-primary !py-5 flex items-center justify-center gap-3 text-lg !rounded-3xl group shadow-xl shadow-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {orderLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    Checkout
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
