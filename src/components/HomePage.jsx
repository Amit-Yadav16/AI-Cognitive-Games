import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Heart, Sun, Brain, CheckCircle2, Volume2, Sparkles, Smile, 
  Shield, ArrowRight, Flower2, Coffee, Users 
} from 'lucide-react';

export default function HomePage() {
  const { setActiveTab, user, speak, t } = useApp();

  const handlePlayGreeting = () => {
    speak(`Welcome Home, ${user.name}. MindCare is here to support your memory gently. Take your time, relax, and explore your favorite activities.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-fadeIn">
      
      {/* Serene & Peaceful Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-800 via-teal-700 to-blue-800 rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-teal-600/30">
        
        {/* Soft Decorative Ambient Circles */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-white/15 backdrop-blur-md rounded-full border border-white/20 text-xs font-black tracking-wider uppercase">
            <Flower2 className="w-4 h-4 text-emerald-300" />
            <span>Peaceful & Safe Cognitive Space</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Welcome Home, <span className="text-emerald-200">{user.name}</span>
          </h1>

          <p className="text-emerald-100 text-base sm:text-lg font-medium leading-relaxed">
            MindCare is designed with love, clarity, and calm. Revisit cherished memories, practice gentle brain games, and follow your daily routine at your own comfortable pace.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setActiveTab('games')}
              className="flex items-center space-x-2 px-7 py-4 bg-emerald-400 hover:bg-emerald-300 text-slate-900 font-extrabold rounded-2xl shadow-lg shadow-emerald-400/20 text-base transition-transform active:scale-95"
            >
              <Brain className="w-5 h-5 text-slate-900" />
              <span>Play Cognitive Games</span>
            </button>

            <button
              onClick={handlePlayGreeting}
              className="flex items-center space-x-2 px-6 py-4 bg-white/15 hover:bg-white/25 text-white font-bold rounded-2xl border border-white/20 text-base backdrop-blur-md transition-all"
            >
              <Volume2 className="w-5 h-5 text-emerald-300 animate-pulse" />
              <span>Listen to Calm Greeting 🔊</span>
            </button>
          </div>

        </div>
      </div>

      {/* Daily Peaceful Affirmation Card */}
      <div className="bg-emerald-50/80 border border-emerald-200/80 p-6 rounded-3xl flex items-center space-x-4 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
          <Sun className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-xs font-black uppercase tracking-wider text-emerald-800">Today's Reassuring Thought</h3>
          <p className="text-base font-bold text-slate-800 mt-0.5">
            “You are doing wonderfully. Every memory, story, and step today is a gentle step forward.”
          </p>
        </div>
      </div>

      {/* 4 Large Peaceful Quick-Access Tiles */}
      <div className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          What would you like to do today?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Tile 1: Play Games */}
          <div
            onClick={() => setActiveTab('games')}
            className="group bg-white p-7 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Brain className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
                Cognitive Games
              </h3>
              <p className="text-xs text-slate-500 font-semibold mt-1">
                6 gentle games for memory, recall, and attention matching your pace.
              </p>
            </div>
            <div className="flex items-center text-xs font-extrabold text-blue-600 group-hover:translate-x-1 transition-transform">
              <span>Start Playing</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Tile 2: Memory Bank */}
          <div
            onClick={() => setActiveTab('memoryBank')}
            className="group bg-white p-7 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-400 transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Heart className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                Personal Memories
              </h3>
              <p className="text-xs text-slate-500 font-semibold mt-1">
                Look at cherished family photos, loved ones, and familiar places.
              </p>
            </div>
            <div className="flex items-center text-xs font-extrabold text-emerald-600 group-hover:translate-x-1 transition-transform">
              <span>Open Memory Bank</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Tile 3: Daily Routine */}
          <div
            onClick={() => setActiveTab('activity')}
            className="group bg-white p-7 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-amber-700 transition-colors">
                Daily Activities
              </h3>
              <p className="text-xs text-slate-500 font-semibold mt-1">
                Check off your morning tea, walk in the park, and hydration goals.
              </p>
            </div>
            <div className="flex items-center text-xs font-extrabold text-amber-600 group-hover:translate-x-1 transition-transform">
              <span>View Activities</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Tile 4: Caregiver Connection */}
          <div
            onClick={() => setActiveTab('caregiverReport')}
            className="group bg-white p-7 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-purple-400 transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-purple-700 transition-colors">
                Caregiver Support
              </h3>
              <p className="text-xs text-slate-500 font-semibold mt-1">
                Connected with Anita Sharma. View reports and activity sharing.
              </p>
            </div>
            <div className="flex items-center text-xs font-extrabold text-purple-600 group-hover:translate-x-1 transition-transform">
              <span>View Reports</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
