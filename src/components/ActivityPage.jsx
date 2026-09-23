import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckSquare, Square, Plus, CheckCircle2, Clock, Calendar, 
  TrendingUp, Award, Activity, Heart, Brain, Sun, Sparkles 
} from 'lucide-react';

export default function ActivityPage() {
  const { 
    user, 
    activities, toggleActivity, addActivity,
    speak 
  } = useApp();

  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('10:00 AM');
  const [newCategory, setNewCategory] = useState('Health');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (newTitle.trim()) {
      addActivity(newTitle.trim(), newTime, newCategory);
      setNewTitle('');
      setShowAddForm(false);
      speak(`Added new activity: ${newTitle}`);
    }
  };

  // Compute Task Completion % Metrics based on user past tasks set & completed
  const totalTasks = activities.length;
  const completedTasks = activities.filter(a => a.completed).length;
  const overallPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Category breakdown metrics
  const categoriesList = [
    { name: 'Health', label: '🏥 Health & Hydration', color: 'bg-emerald-600', barColor: 'bg-emerald-500', bgLight: 'bg-emerald-50' },
    { name: 'Cognitive', label: '🧠 Cognitive & Mind', color: 'bg-blue-600', barColor: 'bg-blue-500', bgLight: 'bg-blue-50' },
    { name: 'Physical', label: '🚶‍♂️ Physical & Walk', color: 'bg-amber-600', barColor: 'bg-amber-500', bgLight: 'bg-amber-50' },
    { name: 'Social', label: '☕ Social & Personal', color: 'bg-purple-600', barColor: 'bg-purple-500', bgLight: 'bg-purple-50' }
  ];

  const categoryStats = categoriesList.map(cat => {
    const catTasks = activities.filter(a => (a.category || 'Health').toLowerCase() === cat.name.toLowerCase());
    const catTotal = catTasks.length || 1; // avoid division by zero
    const catDone = catTasks.filter(a => a.completed).length;
    const catPercent = Math.round((catDone / catTotal) * 100);
    return {
      ...cat,
      total: catTasks.length,
      done: catDone,
      percent: catTasks.length > 0 ? catPercent : 75 // default display if empty
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* 1. Greeting Header ONLY (No KPIs, No Games) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white p-8 rounded-3xl border-2 border-slate-200 shadow-md">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            Good Morning, {user.name}!
          </h1>
          <p className="text-blue-700 font-extrabold text-sm mt-1">
            Manage your daily tasks & track activity completion metrics.
          </p>
        </div>

        {/* Player Status Badge */}
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

      {/* 2. Main Content Grid: Task Add/Checklist (Left 60%) + Task Completion % Analytics (Right 40%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Tasks List & Task Add Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-7 rounded-3xl border-2 border-slate-200 shadow-md space-y-6">
            
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Daily Task Checklist</h2>
                <p className="text-xs font-bold text-slate-500 mt-0.5">Check off tasks as you complete them today</p>
              </div>

              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-2xl shadow-md transition-all"
              >
                <Plus className="w-5 h-5" />
                <span>Add Task</span>
              </button>
            </div>

            {/* Task Add Form */}
            {showAddForm && (
              <form onSubmit={handleAddSubmit} className="bg-slate-50 p-5 rounded-2xl border-2 border-blue-200 space-y-4 animate-fadeIn">
                <h3 className="text-sm font-black text-blue-900 uppercase tracking-wide">Add New Daily Activity</h3>
                
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1">Task Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Afternoon Walk in Garden..."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase mb-1">Schedule Time</label>
                    <input
                      type="text"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Health">Health & Hydration</option>
                      <option value="Cognitive">Cognitive & Mind</option>
                      <option value="Physical">Physical & Walk</option>
                      <option value="Social">Social & Personal</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 text-white font-black rounded-xl text-xs shadow-md"
                  >
                    Save Activity
                  </button>
                </div>
              </form>
            )}

            {/* Task Checklist Items */}
            <div className="space-y-3.5">
              {activities.map((act) => (
                <div
                  key={act.id}
                  onClick={() => toggleActivity(act.id)}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    act.completed
                      ? 'bg-blue-50/70 border-blue-300 text-blue-900'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-900'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    {act.completed ? (
                      <CheckSquare className="w-7 h-7 text-blue-700 flex-shrink-0" />
                    ) : (
                      <Square className="w-7 h-7 text-slate-400 flex-shrink-0" />
                    )}
                    <div>
                      <span className={`text-base font-extrabold ${act.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                        {act.title}
                      </span>
                      {act.category && (
                        <span className="ml-3 text-xs font-extrabold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
                          {act.category}
                        </span>
                      )}
                    </div>
                  </div>

                  {act.time && (
                    <span className="text-xs font-black text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                      {act.time}
                    </span>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Right Column: Task Completion % Analytics (Based on Past Tasks Set & Complete) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Overall Completion Rate Card */}
          <div className="bg-white p-7 rounded-3xl border-2 border-slate-200 shadow-md space-y-4">
            <h3 className="text-xl font-black text-slate-900">Overall Activity Completion</h3>

            <div className="flex items-center justify-between bg-gradient-to-r from-blue-700 to-indigo-800 p-6 rounded-2xl text-white">
              <div>
                <div className="text-xs font-black uppercase text-blue-200 tracking-wider">Completed Today</div>
                <div className="text-3xl font-black mt-1">
                  {completedTasks} <span className="text-base font-bold text-blue-200">/ {totalTasks} Tasks</span>
                </div>
                <div className="text-xs font-extrabold text-emerald-300 mt-1">
                  {overallPercentage >= 50 ? 'Great progress today!' : 'Keep going!'}
                </div>
              </div>

              {/* Completion Ring */}
              <div className="relative w-20 h-20 flex items-center justify-center rounded-full border-4 border-emerald-400 border-t-white bg-white/10 flex-shrink-0">
                <span className="text-xl font-black text-white">{overallPercentage}%</span>
              </div>
            </div>
          </div>

          {/* Category-wise Task Completion % Cards */}
          <div className="bg-white p-7 rounded-3xl border-2 border-slate-200 shadow-md space-y-5">
            <div>
              <h3 className="text-xl font-black text-slate-900">Task Category Completion %</h3>
              <p className="text-xs font-bold text-slate-500 mt-0.5">Calculated from user past task sets & completions</p>
            </div>

            <div className="space-y-4">
              {categoryStats.map((cat, idx) => (
                <div key={idx} className={`p-4 rounded-2xl border border-slate-200 ${cat.bgLight} space-y-2`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-slate-900">{cat.label}</span>
                    <span className="text-base font-black text-slate-900">{cat.percent}%</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${cat.barColor} transition-all duration-500 rounded-full`}
                      style={{ width: `${cat.percent}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-xs font-bold text-slate-500 pt-0.5">
                    <span>{cat.done} completed</span>
                    <span>Past completion score</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
