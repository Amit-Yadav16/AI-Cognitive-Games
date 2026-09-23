import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, Mail, UserCheck, Shield, KeyRound, ArrowRight } from 'lucide-react';

export default function AuthModal() {
  const { isAuthOpen, setIsAuthOpen, authMode, setAuthMode, setUser, speak, t } = useApp();
  
  const [role, setRole] = useState('player'); // 'player' | 'caregiver'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isAuthOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === 'caregiver') {
      setUser(prev => ({
        ...prev,
        role: 'caregiver',
        name: name || 'Anita Sharma (Caregiver)',
        email: email || 'anita.caregiver@mindcare.in'
      }));
      speak("Logged in successfully as Caregiver.");
    } else {
      setUser(prev => ({
        ...prev,
        role: 'player',
        name: name || 'Didi Devi',
        email: email || 'didi.devi@mindcare.in'
      }));
      speak("Logged in successfully as Player.");
    }
    setIsAuthOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={() => setIsAuthOpen(false)}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <h2 className="text-2xl font-extrabold tracking-tight">
            {authMode === 'signin' ? 'SIGN IN' : 'CREATE ACCOUNT'}
          </h2>
          <p className="text-slate-400 text-xs font-semibold mt-1">
            Access MindCare personalized cognitive support
          </p>

          {/* Role Switcher matching Sketch 2 */}
          <div className="flex bg-slate-800 p-1 rounded-xl mt-4 border border-slate-700">
            <button
              type="button"
              onClick={() => setRole('player')}
              className={`flex-1 py-2 rounded-lg font-bold text-xs transition-all flex items-center justify-center space-x-1.5 ${
                role === 'player' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Player Account</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('caregiver')}
              className={`flex-1 py-2 rounded-lg font-bold text-xs transition-all flex items-center justify-center space-x-1.5 ${
                role === 'caregiver' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Caregiver Account</span>
            </button>
          </div>
        </div>

        {/* Form Body matching Sketch 2 */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {authMode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder={role === 'player' ? "e.g. Didi Devi" : "e.g. Anita Sharma"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {authMode === 'signin' && (
            <div className="flex justify-between items-center text-xs font-semibold">
              <a href="#reset" className="text-blue-600 hover:underline">Reset password?</a>
              <button
                type="button"
                onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                className="text-slate-500 hover:text-slate-800"
              >
                Need an account? Sign Up
              </button>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-lg shadow-blue-600/20 flex items-center justify-center space-x-2 transition-transform active:scale-95"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
