import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LANGUAGES } from '../utils/i18nTranslations';
import { 
  Brain, Volume2, Globe, User, LogIn, CheckCircle2, RefreshCw, 
  Settings, Heart, Activity, LayoutDashboard, FileBarChart, Sparkles, Home 
} from 'lucide-react';

export default function Navbar() {
  const { 
    activeTab, setActiveTab, 
    language, setLanguage, 
    user, 
    syncStatus, 
    setIsAuthOpen, setAuthMode,
    setIsVoicePanelOpen,
    speak, t 
  } = useApp();

  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const handleSpeakClick = () => {
    speak(`Welcome to MindCare. Currently on ${activeTab} view. Select any cognitive game or daily activity to begin.`);
    setIsVoicePanelOpen(true);
  };

  const navItems = [
    { id: 'home', label: t.nav.home || 'HOME', icon: Home },
    { id: 'dashboard', label: t.nav.dashboard || 'Dashboard', icon: LayoutDashboard },
    { id: 'games', label: t.nav.games || 'Games', icon: Brain },
    { id: 'activity', label: t.nav.activity || 'Activity', icon: Activity },
    { id: 'caregiverReport', label: t.nav.caregiverReport || 'Caregiver Report', icon: FileBarChart },
    { id: 'memoryBank', label: t.nav.memoryBank || 'Memory Bank', icon: Heart }
  ];

  const currentLangObj = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand matching Image 1 & Sketch 2 */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setActiveTab('home')}
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Brain className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                Mind<span className="text-blue-600">Care</span>
              </span>
              <span className="hidden sm:block text-xs font-semibold text-emerald-600 tracking-wide">
                Cognitive Support AI
              </span>
            </div>
          </div>

          {/* Main Top Navigation Items matching Sketch 2 */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Language, Speak, User Profile Pill */}
          <div className="flex items-center space-x-2.5">
            
            {/* Sync Status Pill */}
            <div className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-slate-200 bg-slate-50 text-slate-700">
              <span className={`w-2 h-2 rounded-full ${syncStatus === 'Synced to Server' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
              <span>{syncStatus}</span>
            </div>

            {/* Language Selector Dropdown matching Sketch 2 */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-2 bg-slate-100 hover:bg-slate-200/80 text-slate-800 rounded-xl font-semibold text-sm border border-slate-200 transition-colors"
                title="Select Language (English, Hindi, North Eastern Languages)"
              >
                <Globe className="w-4 h-4 text-blue-600" />
                <span className="hidden sm:inline font-bold">{currentLangObj.flag} {currentLangObj.native}</span>
                <span className="sm:hidden font-bold">{currentLangObj.code.toUpperCase()}</span>
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50">
                  <div className="px-3 py-1.5 text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                    Select Language / ভাষা
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangDropdownOpen(false);
                          speak(`Language changed to ${lang.name}`);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2 text-left text-sm font-semibold hover:bg-blue-50 transition-colors ${
                          language === lang.code ? 'text-blue-700 font-bold bg-blue-50/70' : 'text-slate-700'
                        }`}
                      >
                        <span className="flex items-center space-x-2">
                          <span>{lang.flag}</span>
                          <span>{lang.native} ({lang.name})</span>
                        </span>
                        {language === lang.code && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Speak 🔊 Button matching Sketch 2 */}
            <button
              onClick={handleSpeakClick}
              className="flex items-center space-x-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-md shadow-emerald-600/20 transition-all hover:scale-105"
              title="Voice Guidance / Speak Instructions"
            >
              <Volume2 className="w-4 h-4 animate-bounce" />
              <span className="hidden sm:inline">Speak 🔊</span>
            </button>

            {/* Profile Avatar / Login Pill matching Sketch 2 */}
            <div className="flex items-center space-x-2 border-l border-slate-200 pl-2.5">
              <button
                onClick={() => setActiveTab('profile')}
                className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 p-1.5 pr-3 rounded-2xl border border-slate-200 transition-colors"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-9 h-9 rounded-xl object-cover ring-2 ring-blue-500/40"
                />
                <span className="hidden sm:inline font-bold text-sm text-slate-800">
                  {user.name}
                </span>
              </button>

              <button
                onClick={() => {
                  setAuthMode('signin');
                  setIsAuthOpen(true);
                }}
                className="p-2.5 text-slate-500 hover:text-blue-700 bg-slate-100 hover:bg-blue-50 rounded-xl transition-colors"
                title="Sign In / Sign Up Switcher"
              >
                <LogIn className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
