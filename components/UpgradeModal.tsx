import React, { useState } from 'react';
import { X, Check, Lock, CreditCard, ShieldCheck, Loader2, Globe, Minus, Plus } from 'lucide-react';
import { PaymentMethod } from '../types';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userCountry?: string | null;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose, onConfirm, userCountry }) => {
  const [method, setMethod] = useState<PaymentMethod>('card');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'checkout' | 'success'>('checkout');
  const [duration, setDuration] = useState(1);

  const BASE_PRICE = 49;
  const totalPrice = BASE_PRICE * duration;

  if (!isOpen) return null;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API Payment Processing
    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
      
      // Unlock Pro after showing success message briefly
      setTimeout(() => {
        onConfirm();
      }, 2000);
    }, 2000);
  };

  const incrementDuration = () => setDuration(prev => prev + 1);
  const decrementDuration = () => setDuration(prev => Math.max(1, prev - 1));

  if (step === 'success') {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm relative p-8 text-center animate-in zoom-in-95">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful!</h2>
          <p className="text-slate-500">Welcome to SocialPulse Pro.</p>
          <div className="mt-4 flex justify-center">
            <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-200 h-[90vh] md:h-auto overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* LEFT SIDE: Order Summary */}
        <div className="w-full md:w-5/12 bg-slate-50 p-8 border-r border-gray-100 flex flex-col">
          <div className="mb-6">
             <div className="flex items-center gap-2 mb-2">
                <div className="bg-slate-900 text-white p-1.5 rounded-lg">
                  <Lock className="w-4 h-4" />
                </div>
                <span className="font-bold text-lg text-slate-900">SocialPulse Pro</span>
             </div>
             <p className="text-slate-500 text-sm">Upgrade your analytics game.</p>
          </div>

          <div className="space-y-4 mb-6 flex-grow">
            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-1 rounded-full mt-0.5"><Check className="w-3 h-3 text-green-600" /></div>
              <span className="text-sm text-slate-700">Advanced Growth Projections</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-1 rounded-full mt-0.5"><Check className="w-3 h-3 text-green-600" /></div>
              <span className="text-sm text-slate-700">Competitor Benchmarking</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-1 rounded-full mt-0.5"><Check className="w-3 h-3 text-green-600" /></div>
              <span className="text-sm text-slate-700">Export PDF Reports</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-1 rounded-full mt-0.5"><Check className="w-3 h-3 text-green-600" /></div>
              <span className="text-sm text-slate-700">Priority Support</span>
            </div>
          </div>

          {/* DURATION SELECTOR */}
          <div className="mb-6 bg-white p-4 rounded-xl border border-gray-200">
            <label className="block text-xs font-bold uppercase text-slate-500 mb-3">Subscription Duration</label>
            <div className="flex items-center justify-between">
              <button 
                onClick={decrementDuration}
                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-slate-600 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="text-center">
                <span className="block text-xl font-bold text-slate-900 leading-none">{duration}</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase">{duration === 1 ? 'Month' : 'Months'}</span>
              </div>
              <button 
                onClick={incrementDuration}
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 flex items-center justify-center text-white transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-600 text-sm">Pro Plan (${BASE_PRICE}/mo)</span>
              <span className="font-bold text-slate-900 text-sm">x {duration}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-slate-500 mb-4">
              <span>Tax</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between items-center text-lg font-black text-slate-900 pt-4 border-t border-gray-200 border-dashed">
              <span>Total due today</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Payment Form */}
        <div className="w-full md:w-7/12 p-8 bg-white">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-2xl font-bold text-slate-900">Checkout</h2>
            <p className="text-slate-500 text-sm">Secure global payment encrypted by Stripe.</p>
            {userCountry && (
               <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2 justify-center md:justify-start">
                 <Globe className="w-3 h-3" /> Detected Region: {userCountry}
               </div>
            )}
          </div>

          {/* Payment Method Toggle */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setMethod('card')}
              className={`flex-1 py-3 px-4 rounded-xl border-2 flex items-center justify-center gap-2 transition-all ${
                method === 'card' 
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm' 
                  : 'border-gray-100 text-slate-500 hover:border-gray-200'
              }`}
            >
              <CreditCard className="w-5 h-5" /> Card
            </button>
            <button
              onClick={() => setMethod('paypal')}
              className={`flex-1 py-3 px-4 rounded-xl border-2 flex items-center justify-center gap-2 transition-all ${
                method === 'paypal' 
                  ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm' 
                  : 'border-gray-100 text-slate-500 hover:border-gray-200'
              }`}
            >
              <span className="font-bold italic">PayPal</span>
            </button>
          </div>

          {method === 'card' ? (
            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Email Address</label>
                <input 
                  type="email" 
                  required 
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Card Information</label>
                <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                  <input 
                    type="text" 
                    required 
                    placeholder="0000 0000 0000 0000"
                    className="w-full px-4 py-3 border-b border-gray-200 outline-none"
                  />
                  <div className="flex">
                    <input 
                      type="text" 
                      required 
                      placeholder="MM / YY"
                      className="w-1/2 px-4 py-3 border-r border-gray-200 outline-none"
                    />
                    <input 
                      type="text" 
                      required 
                      placeholder="CVC"
                      className="w-1/2 px-4 py-3 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Cardholder Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Full Name on Card"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                  ) : (
                    <>Pay ${totalPrice.toFixed(2)} & Unlock Pro</>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8">
              <p className="text-slate-600 mb-6">You will be redirected to PayPal to complete your purchase securely.</p>
              <button 
                onClick={handlePayment}
                disabled={isLoading}
                className="w-full bg-[#FFC439] hover:bg-[#F4BB29] text-slate-900 font-bold py-4 rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
              >
                 {isLoading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Connecting...</>
                  ) : (
                    <span className="italic font-bold text-lg">Pay with PayPal</span>
                  )}
              </button>
            </div>
          )}

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            <span>256-bit SSL Encrypted Payment</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;