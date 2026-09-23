import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Trophy, Clock, Target, Eye, MessageSquare, TrendingUp, 
  Brain, BarChart2, PieChart, Activity, CheckCircle2, ShieldCheck 
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  BarChart, Bar, Cell, PieChart as RePieChart, Pie
} from 'recharts';

export default function PlayerDashboard() {
  const { user, speak, t } = useApp();

  // Chart 1: 7-Day Cognitive Score Trend Data
  const scoreTrendData = [
    { day: 'Mon', score: 72, accuracy: 75 },
    { day: 'Tue', score: 78, accuracy: 80 },
    { day: 'Wed', score: 85, accuracy: 88 },
    { day: 'Thu', score: 80, accuracy: 82 },
    { day: 'Fri', score: 92, accuracy: 95 },
    { day: 'Sat', score: 88, accuracy: 90 },
    { day: 'Sun', score: 95, accuracy: 98 }
  ];

  // Chart 2: Category Performance Breakdown
  const domainData = [
    { domain: 'Memory', score: 85, color: '#3B82F6' },
    { domain: 'Recall', score: 78, color: '#10B981' },
    { domain: 'Attention', score: 92, color: '#6366F1' },
    { domain: 'Speed', score: 70, color: '#F59E0B' },
    { domain: 'Flexibility', score: 65, color: '#EC4899' },
    { domain: 'Planning', score: 88, color: '#14B8A6' }
  ];

  // Chart 3: Weekly Active Play Time vs Target
  const playTimeData = [
    { day: 'Mon', activeMin: 45, targetMin: 60 },
    { day: 'Tue', activeMin: 55, targetMin: 60 },
    { day: 'Wed', activeMin: 70, targetMin: 60 },
    { day: 'Thu', activeMin: 60, targetMin: 60 },
    { day: 'Fri', activeMin: 75, targetMin: 60 },
    { day: 'Sat', activeMin: 80, targetMin: 60 },
    { day: 'Sun', activeMin: 90, targetMin: 60 }
  ];

  // Chart 4: Daily Cognitive Goal Distribution
  const goalDistributionData = [
    { name: 'Memory Goal', value: 65, color: '#3B82F6' },
    { name: 'Attention Goal', value: 92, color: '#10B981' },
    { name: 'Language Goal', value: 88, color: '#8B5CF6' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-fadeIn">
      
      {/* 1. Top Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white p-8 rounded-3xl border-2 border-slate-200 shadow-md">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            Good Morning, {user.name}!
          </h1>
          <p className="text-blue-700 font-extrabold text-sm mt-1">
            Personalized cognitive performance & memory analytics dashboard.
          </p>
        </div>

        {/* Player Online Status Badge */}
        <div className="flex items-center space-x-4 bg-emerald-50 px-5 py-3 rounded-2xl border-2 border-emerald-200">
          <div className="relative flex items-center justify-center">
            <span className="w-4 h-4 rounded-full bg-emerald-500 animate-ping absolute"></span>
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 relative"></span>
          </div>
          <div>
            <div className="text-xs font-black uppercase text-emerald-800 tracking-wider">Player Status</div>
            <div className="text-base font-black text-emerald-900">Online & Active</div>
          </div>
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-2xl object-cover ring-2 ring-emerald-600/40 ml-2"
          />
        </div>
      </div>

      {/* 2. KPIs Overview Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-wide">
          KPIs Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* KPI 1: Games Completed */}
          <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm hover:border-blue-400 transition-all flex items-center justify-between">
            <div className="space-y-2">
              <span className="text-base font-extrabold text-slate-900 block">1. Games Completed</span>
              <span className="inline-block px-3 py-1 text-xs font-extrabold bg-emerald-100 text-emerald-800 rounded-full">
                High Performance
              </span>
            </div>
            <div className="relative w-20 h-20 flex items-center justify-center rounded-full border-4 border-emerald-500 border-t-slate-200 flex-shrink-0">
              <span className="text-2xl font-black text-slate-900">5/8</span>
            </div>
          </div>

          {/* KPI 2: Active Play Time */}
          <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm hover:border-blue-400 transition-all flex items-center justify-between">
            <div className="space-y-2">
              <span className="text-base font-extrabold text-slate-900 block">2. Active Play Time</span>
              <span className="inline-block px-3 py-1 text-xs font-extrabold bg-blue-100 text-blue-800 rounded-full">
                High Focus
              </span>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-slate-900 block">1h 15m</span>
              <div className="flex items-end justify-end space-x-1 h-6 mt-1">
                <div className="w-2.5 bg-blue-300 rounded-t h-3"></div>
                <div className="w-2.5 bg-blue-500 rounded-t h-5"></div>
                <div className="w-2.5 bg-blue-700 rounded-t h-6"></div>
              </div>
            </div>
          </div>

          {/* KPI 3: Avg Game Score */}
          <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm hover:border-blue-400 transition-all flex items-center justify-between">
            <div className="space-y-2">
              <span className="text-base font-extrabold text-slate-900 block">3. Avg Game Score</span>
              <span className="inline-block px-3 py-1 text-xs font-extrabold bg-emerald-100 text-emerald-800 rounded-full">
                Optimal Score
              </span>
            </div>
            <div className="text-right flex items-center space-x-2">
              <Trophy className="w-8 h-8 text-amber-500" />
              <span className="text-3xl font-black text-slate-900">1450 <span className="text-sm font-bold text-slate-600">pts</span></span>
            </div>
          </div>

          {/* KPI 4: Daily Memory Goal */}
          <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm hover:border-blue-400 transition-all flex items-center justify-between">
            <div className="space-y-2">
              <span className="text-base font-extrabold text-slate-900 block">4. Daily Memory Goal</span>
              <span className="inline-block px-3 py-1 text-xs font-extrabold bg-blue-100 text-blue-800 rounded-full">
                Memory Goal
              </span>
            </div>
            <div className="relative w-20 h-20 flex items-center justify-center rounded-full border-4 border-blue-600 border-r-slate-200 flex-shrink-0">
              <span className="text-xl font-black text-slate-900">65%</span>
            </div>
          </div>

          {/* KPI 5: Attention Score */}
          <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm hover:border-blue-400 transition-all flex items-center justify-between">
            <div className="space-y-2">
              <span className="text-base font-extrabold text-slate-900 block">5. Attention Score</span>
              <span className="inline-block px-3 py-1 text-xs font-extrabold bg-emerald-100 text-emerald-800 rounded-full">
                Focus Score
              </span>
            </div>
            <div className="relative w-20 h-20 flex items-center justify-center rounded-full border-4 border-emerald-500 flex-shrink-0">
              <span className="text-xl font-black text-slate-900">92%</span>
            </div>
          </div>

          {/* KPI 6: Language Score */}
          <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm hover:border-blue-400 transition-all flex items-center justify-between">
            <div className="space-y-2">
              <span className="text-base font-extrabold text-slate-900 block">6. Language Score</span>
              <span className="inline-block px-3 py-1 text-xs font-extrabold bg-blue-100 text-blue-800 rounded-full">
                Speech Score
              </span>
            </div>
            <div className="relative w-20 h-20 flex items-center justify-center rounded-full border-4 border-blue-600 flex-shrink-0">
              <span className="text-xl font-black text-slate-900">88%</span>
            </div>
          </div>

        </div>
      </div>

      {/* 3. NEW 4 Analytics Graphs Grid (Replacing Games & Activity sections) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-wide">
            Cognitive & Activity Analytics
          </h2>
          <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200">
            4 Interactive Analytics Charts
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Graph 1: Cognitive Score Trend Over Time */}
          <div className="bg-white p-7 rounded-3xl border-2 border-slate-200 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900">1. Cognitive Performance & Score Trend</h3>
                <p className="text-xs font-bold text-slate-500">7-Day Score Progression & Accuracy Rate</p>
              </div>
              <span className="p-2 bg-blue-50 text-blue-700 rounded-xl">
                <TrendingUp className="w-6 h-6" />
              </span>
            </div>
            <div className="h-64 pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={scoreTrendData}>
                  <defs>
                    <linearGradient id="dashScoreColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#64748b" fontSize={13} fontWeight="bold" />
                  <YAxis domain={[0, 100]} stroke="#64748b" fontSize={13} fontWeight="bold" />
                  <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                  <Area type="monotone" dataKey="score" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#dashScoreColor)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Graph 2: Domain Performance Breakdown */}
          <div className="bg-white p-7 rounded-3xl border-2 border-slate-200 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900">2. Domain Performance Scores</h3>
                <p className="text-xs font-bold text-slate-500">Breakdown by Cognitive Skills</p>
              </div>
              <span className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                <BarChart2 className="w-6 h-6" />
              </span>
            </div>
            <div className="h-64 pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={domainData} layout="vertical">
                  <XAxis type="number" domain={[0, 100]} stroke="#64748b" fontSize={13} fontWeight="bold" />
                  <YAxis dataKey="domain" type="category" stroke="#64748b" fontSize={13} fontWeight="bold" width={85} />
                  <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="score" radius={[0, 10, 10, 0]} barSize={22}>
                    {domainData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Graph 3: Weekly Active Play Time vs Target */}
          <div className="bg-white p-7 rounded-3xl border-2 border-slate-200 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900">3. Active Play Time vs Daily Target</h3>
                <p className="text-xs font-bold text-slate-500">Minutes Spent on Cognitive Exercises</p>
              </div>
              <span className="p-2 bg-indigo-50 text-indigo-700 rounded-xl">
                <Clock className="w-6 h-6" />
              </span>
            </div>
            <div className="h-64 pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={playTimeData}>
                  <XAxis dataKey="day" stroke="#64748b" fontSize={13} fontWeight="bold" />
                  <YAxis stroke="#64748b" fontSize={13} fontWeight="bold" />
                  <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="activeMin" fill="#3B82F6" radius={[8, 8, 0, 0]} barSize={24} name="Active Minutes" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Graph 4: Daily Goal Distribution */}
          <div className="bg-white p-7 rounded-3xl border-2 border-slate-200 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900">4. Daily Cognitive Goal Progress</h3>
                <p className="text-xs font-bold text-slate-500">Memory, Attention & Speech Goal Levels</p>
              </div>
              <span className="p-2 bg-purple-50 text-purple-700 rounded-xl">
                <PieChart className="w-6 h-6" />
              </span>
            </div>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                  <Pie
                    data={goalDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {goalDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </RePieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
