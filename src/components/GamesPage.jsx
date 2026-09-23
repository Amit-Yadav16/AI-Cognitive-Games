import React from 'react';
import { useApp } from '../context/AppContext';
import { Play, Sparkles, Trophy, Brain, CheckCircle2, Star } from 'lucide-react';

export default function GamesPage() {
  const { user, gameLevels, setActiveGame, speak } = useApp();

  // 6 Cognitive Games matching the reference sketch (media_1789934391708.jpg)
  const gamesList = [
    {
      id: 4, // Remember the Sequence
      num: 1,
      title: 'Remember the Sequence',
      category: 'Memory',
      categoryColor: 'bg-blue-600 text-white',
      level: gameLevels.game4 || 2,
      score: '80%',
      metric: 'Accuracy 4/5',
      image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=600&q=80',
      badgeGradient: 'from-blue-600 to-indigo-700'
    },
    {
      id: 1, // Family Recognition
      num: 2,
      title: 'Family Recognition',
      category: 'Recall',
      categoryColor: 'bg-cyan-700 text-white',
      level: gameLevels.game1 || 2,
      score: '75%',
      metric: 'Correct 3/4',
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80',
      badgeGradient: 'from-cyan-600 to-blue-800'
    },
    {
      id: 3, // Find the Target
      num: 3,
      title: 'Find the Target',
      category: 'Attention',
      categoryColor: 'bg-emerald-600 text-white',
      level: gameLevels.game3 || 1,
      score: '70%',
      metric: 'Wrong taps 2',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80',
      badgeGradient: 'from-emerald-600 to-teal-800'
    },
    {
      id: 2, // Quick Match
      num: 4,
      title: 'Quick Match',
      category: 'Processing Speed',
      categoryColor: 'bg-purple-600 text-white',
      level: gameLevels.game2 || 1,
      score: '85%',
      metric: 'Active time 2 min',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      badgeGradient: 'from-purple-600 to-indigo-800'
    },
    {
      id: 5, // Change the Rule
      num: 5,
      title: 'Change the Rule',
      category: 'Cognitive Flexibility',
      categoryColor: 'bg-amber-600 text-white',
      level: gameLevels.game5 || 2,
      score: '65%',
      metric: 'Switch errors 2',
      image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80',
      badgeGradient: 'from-amber-600 to-orange-800'
    },
    {
      id: 6, // Arrange the Day
      num: 6,
      title: 'Arrange the Day',
      category: 'Planning & Sequencing',
      categoryColor: 'bg-teal-600 text-white',
      level: gameLevels.game6 || 1,
      score: '80%',
      metric: 'Correct placements 4/5',
      image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80',
      badgeGradient: 'from-teal-600 to-emerald-800'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* 1. Greeting Header ONLY */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-slate-900 text-white p-8 rounded-3xl border-2 border-slate-800 shadow-xl">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Good Morning, {user.name}!
          </h1>
          <p className="text-emerald-400 font-extrabold text-sm mt-1">
            Choose a cognitive game to play & practice memory.
          </p>
        </div>

        {/* Player Status Badge */}
        <div className="flex items-center space-x-4 bg-slate-800 px-5 py-3 rounded-2xl border border-slate-700">
          <div className="relative flex items-center justify-center">
            <span className="w-4 h-4 rounded-full bg-emerald-500 animate-ping absolute"></span>
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 relative"></span>
          </div>
          <div>
            <div className="text-xs font-black uppercase text-slate-400 tracking-wider">Player Status</div>
            <div className="text-base font-black text-emerald-400">Online & Active</div>
          </div>
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-2xl object-cover ring-2 ring-emerald-500 ml-2"
          />
        </div>
      </div>

      {/* 2. 6 Cognitive Games Grid in 3x3 / 3-Column Large Format */}
      <div className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-wide">
          6 Cognitive Games
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gamesList.map((g) => (
            <div
              key={g.id}
              onClick={() => {
                setActiveGame(g);
                speak(`Launching game ${g.num}: ${g.title}, ${g.category}. Level ${g.level}.`);
              }}
              className="group bg-slate-950 text-white rounded-3xl border-2 border-slate-800 overflow-hidden shadow-xl hover:border-blue-500 hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Cover Photo */}
              <div className="relative h-52 overflow-hidden bg-slate-900">
                <img
                  src={g.image}
                  alt={g.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                {/* Category Pill */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3.5 py-1.5 rounded-full text-xs font-black tracking-wide ${g.categoryColor} shadow-md`}>
                    {g.category}
                  </span>
                </div>
              </div>

              {/* Game Info Details matching reference image */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">
                    {g.num}. {g.title}
                  </h3>
                  
                  {/* High Contrast Level & Score Metrics */}
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-sm font-extrabold text-slate-300">
                    <span className="px-2.5 py-1 bg-slate-800 rounded-lg text-emerald-400 border border-slate-700">
                      Level {g.level}
                    </span>
                    <span className="px-2.5 py-1 bg-slate-800 rounded-lg text-blue-400 border border-slate-700">
                      Score {g.score}
                    </span>
                    <span className="px-2.5 py-1 bg-slate-800 rounded-lg text-slate-300 border border-slate-700">
                      {g.metric}
                    </span>
                  </div>
                </div>

                {/* Large Tap to Play Button */}
                <button
                  type="button"
                  className="w-full py-3.5 px-4 bg-blue-600 group-hover:bg-blue-500 text-white font-black rounded-2xl shadow-lg flex items-center justify-center space-x-2 text-base transition-all"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>PLAY GAME</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
