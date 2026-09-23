import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileBarChart, Calendar, Trophy, Clock, CheckCircle, TrendingUp, 
  Brain, ShieldAlert, Filter, ArrowUpRight
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, Cell } from 'recharts';

export default function CaregiverReport() {
  const { user, gameHistory, speak } = useApp();
  const [dateFilter, setDateFilter] = useState('Daily'); // 'Daily' | 'Monthly' | 'Overall'

  const caregiverName = user.role === 'caregiver' ? user.name : user.connectedCaregiver.name;

  // Chart data for score trends
  const scoreTrendData = [
    { day: 'Mon', score: 72, accuracy: 75 },
    { day: 'Tue', score: 78, accuracy: 80 },
    { day: 'Wed', score: 85, accuracy: 88 },
    { day: 'Thu', score: 80, accuracy: 82 },
    { day: 'Fri', score: 92, accuracy: 95 },
    { day: 'Sat', score: 88, accuracy: 90 },
    { day: 'Sun', score: 95, accuracy: 98 }
  ];

  // Domain performance data matching Sketch 1 (Memory 30%, Attention 40%, etc.)
  const domainData = [
    { domain: 'Memory', percentage: 85, color: '#3B82F6' },
    { domain: 'Recall', percentage: 78, color: '#10B981' },
    { domain: 'Attention', percentage: 92, color: '#6366F1' },
    { domain: 'Speed', percentage: 70, color: '#F59E0B' },
    { domain: 'Flexibility', percentage: 65, color: '#EC4899' },
    { domain: 'Planning', percentage: 88, color: '#14B8A6' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Caregiver Greeting Banner matching Sketch 1 */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-full text-xs font-black uppercase tracking-wider mb-2">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Authorized Caregiver View</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight">
            Hii, {caregiverName}
          </h1>
          <p className="text-slate-300 text-sm font-semibold mt-1">
            Monitoring cognitive engagement and daily activity report for <span className="text-blue-400 font-bold">Didi Devi</span>.
          </p>
        </div>

        {/* Date Filter Selector matching Sketch 1 */}
        <div className="flex bg-slate-800 p-1.5 rounded-2xl border border-slate-700/80">
          {['Daily', 'Monthly', 'Overall'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setDateFilter(tab);
                speak(`Filtered report by ${tab}`);
              }}
              className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all ${
                dateFilter === tab
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab === 'Daily' ? 'Date (Daily)' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Summary KPI Cards matching Sketch 1 Wireframe */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Box 1: Games Completed */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wide text-slate-400">Games Completed</span>
            <div className="text-3xl font-black text-slate-900 mt-1">8</div>
            <span className="text-xs font-bold text-emerald-600 flex items-center mt-1">
              <TrendingUp className="w-3.5 h-3.5 mr-1" /> +2 from yesterday
            </span>
          </div>
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
            <Brain className="w-8 h-8" />
          </div>
        </div>

        {/* Box 2: Daily Activities */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wide text-slate-400">Daily Activ</span>
            <div className="text-3xl font-black text-slate-900 mt-1">8/15</div>
            <span className="text-xs font-bold text-blue-600 mt-1">53% Completed</span>
          </div>
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
            <CheckCircle className="w-8 h-8" />
          </div>
        </div>

        {/* Box 3: Active Play Time */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wide text-slate-400">Active play Time</span>
            <div className="text-3xl font-black text-slate-900 mt-1">25 min</div>
            <span className="text-xs font-bold text-slate-500 mt-1">Excludes pause time</span>
          </div>
          <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl">
            <Clock className="w-8 h-8" />
          </div>
        </div>

        {/* Box 4: Avg Game Score */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wide text-slate-400">Avg Game Score</span>
            <div className="text-3xl font-black text-slate-900 mt-1">75%</div>
            <span className="text-xs font-bold text-emerald-600 mt-1">Optimal Level Pace</span>
          </div>
          <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl">
            <Trophy className="w-8 h-8" />
          </div>
        </div>

      </div>

      {/* Charts Section matching Sketch 1 "Charts For Dashboard" */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Score Trend Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-slate-900">Score Trend Over Time</h3>
            <span className="text-xs font-bold text-slate-400">Past 7 Days</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={scoreTrendData}>
                <defs>
                  <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="score" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#scoreColor)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cognitive Domain Performance matching Sketch 1 */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-slate-900">Performance by Cognitive Category</h3>
            <span className="text-xs font-bold text-slate-400">Normalized Scores</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={domainData} layout="vertical">
                <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" fontSize={12} />
                <YAxis dataKey="domain" type="category" stroke="#94a3b8" fontSize={12} width={80} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="percentage" radius={[0, 10, 10, 0]} barSize={20}>
                  {domainData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Games Gameplay Detailed History Table */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-slate-900">Detailed Gameplay Audit History</h3>
          <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200">
            {gameHistory.length} Sessions Logged
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-black uppercase text-slate-400 tracking-wider">
                <th className="py-3 px-4">Game Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Level</th>
                <th className="py-3 px-4">Score</th>
                <th className="py-3 px-4">Accuracy</th>
                <th className="py-3 px-4">Active Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-800">
              {gameHistory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{item.gameName}</td>
                  <td className="py-3.5 px-4 text-xs text-blue-700 font-bold">
                    <span className="bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">{item.category}</span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-500">{item.date}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 bg-slate-100 font-extrabold text-xs rounded-lg text-slate-700">
                      Level {item.level}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-emerald-600">{item.score}%</td>
                  <td className="py-3.5 px-4 font-bold">{item.accuracy}%</td>
                  <td className="py-3.5 px-4 text-xs text-slate-500">{item.activeTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Non-Diagnostic Clinical Notice Disclaimer */}
      <div className="flex items-start space-x-3 bg-amber-50 p-4 rounded-2xl border border-amber-200 text-amber-900 text-xs font-semibold">
        <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p>
          <strong className="font-extrabold">Important Support Notice:</strong> MindCare reports describe gameplay performance metrics and activity completion only. They are designed for caregiver engagement support and do NOT constitute a medical diagnosis, clinical evaluation, or proof of dementia decline.
        </p>
      </div>

    </div>
  );
}
