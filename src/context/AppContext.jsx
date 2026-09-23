import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRANSLATIONS } from '../utils/i18nTranslations';
import { speakText } from '../utils/speechUtils';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation & User Role
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'dashboard' | 'games' | 'activity' | 'caregiverReport' | 'memoryBank' | 'profile'
  const [user, setUser] = useState({
    name: 'Amit Yadav',
    role: 'player', // 'player' | 'caregiver'
    email: 'amityadav@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    connectedCaregiver: {
      name: 'Aman Yadav',
      email: 'amanyadav@gmail.com',
      status: 'Connected', // 'Connected' | 'Pending'
      online: true,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    }
  });

  // Multilingual & Voice Settings
  const [language, setLanguage] = useState('en'); // 'en' | 'hi' | 'as' | 'brx' | 'kha' | 'grt' | 'lus' | 'mni' | 'nkx'
  const [voiceSettings, setVoiceSettings] = useState({
    enabled: true,
    speed: 0.9,
    pitch: 1.0,
    autoRead: true
  });
  const [isVoicePanelOpen, setIsVoicePanelOpen] = useState(false);

  // Sync / Offline status simulation
  const [syncStatus, setSyncStatus] = useState('Synced to Server'); // 'Synced to Server' | 'Saved Locally' | 'Sync Pending'

  // Auth Modal State
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'

  // Today's Activities Checklist State (Matches Image 1 & Sketch 1)
  const [activities, setActivities] = useState([
    { id: 1, title: 'Daily Check-in', time: '9:00 AM', completed: true, category: 'Health' },
    { id: 2, title: 'Memory Match Game', time: '10:00 AM', completed: true, category: 'Cognitive' },
    { id: 3, title: 'Drink Water (Glass 3)', time: '10:30 AM', completed: false, category: 'Health' },
    { id: 4, title: 'Word Builder Game', time: '11:00 AM', completed: false, category: 'Cognitive' },
    { id: 5, title: 'Walk in Park', time: '11:30 AM', completed: false, category: 'Physical' },
    { id: 6, title: 'Afternoon Tea & Memory Story', time: '4:00 PM', completed: false, category: 'Social' }
  ]);

  // Personal Memory Bank Content (Privacy-protected)
  const [memoryBank, setMemoryBank] = useState([
    {
      id: 1,
      type: 'family',
      name: 'Rohan Sharma',
      relation: 'Grandson',
      photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
      description: 'Loves playing football in Guwahati'
    },
    {
      id: 2,
      type: 'family',
      name: 'Priya Devi',
      relation: 'Daughter',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      description: 'Teaches at Assam University'
    },
    {
      id: 3,
      type: 'place',
      name: 'Kaziranga National Park',
      relation: 'Familiar Place',
      photo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80',
      description: 'Famous rhino sanctuary in Assam'
    },
    {
      id: 4,
      type: 'place',
      name: 'Umiam Lake Shillong',
      relation: 'Favourite Spot',
      photo: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80',
      description: 'Beautiful lake in Meghalaya'
    }
  ]);

  // Game Levels & Performance Metrics
  const [gameLevels, setGameLevels] = useState({
    game1: 3, // Family Recognition (Level 3)
    game2: 2, // Familiar Places (Level 2)
    game3: 4, // Find the Target (Level 4)
    game4: 1, // Remember the Sequence (Level 1)
    game5: 3, // Change the Rule (Level 3)
    game6: 2  // Arrange the Day (Level 2)
  });

  // Recent Game Audit History for Caregiver Reports
  const [gameHistory, setGameHistory] = useState([
    { id: 101, gameName: 'Memory Match', category: 'Memory', date: '2026-09-20 09:30 AM', level: 3, score: 92, accuracy: 95, activeTime: '3m 12s', completed: true },
    { id: 102, gameName: 'Word Builder', category: 'Recall', date: '2026-09-19 04:15 PM', level: 2, score: 85, accuracy: 88, activeTime: '4m 05s', completed: true },
    { id: 103, gameName: 'Logic Puzzles', category: 'Attention', date: '2026-09-19 11:00 AM', level: 4, score: 78, accuracy: 80, activeTime: '5m 20s', completed: true },
    { id: 104, gameName: 'Focus Trainer', category: 'Speed', date: '2026-09-18 02:45 PM', level: 1, score: 88, accuracy: 90, activeTime: '2m 45s', completed: true },
    { id: 105, gameName: 'Sequence Fun', category: 'Flexibility', date: '2026-09-17 10:20 AM', level: 3, score: 70, accuracy: 72, activeTime: '4m 30s', completed: true },
    { id: 106, gameName: 'Spot Difference', category: 'Planning', date: '2026-09-16 05:00 PM', level: 2, score: 95, accuracy: 98, activeTime: '3m 50s', completed: true }
  ]);

  // Active Game Modal State
  const [activeGame, setActiveGame] = useState(null);

  const speak = (text) => {
    if (voiceSettings.enabled) {
      speakText(text, language, voiceSettings.speed, voiceSettings.pitch);
    }
  };

  const toggleActivity = (id) => {
    setActivities(prev => prev.map(act => act.id === id ? { ...act, completed: !act.completed } : act));
    setSyncStatus('Sync Pending');
    setTimeout(() => setSyncStatus('Synced to Server'), 1500);
  };

  const addActivity = (title, time = '12:00 PM') => {
    const newAct = { id: Date.now(), title, time, completed: false, category: 'Personal' };
    setActivities(prev => [...prev, newAct]);
    setSyncStatus('Sync Pending');
    setTimeout(() => setSyncStatus('Synced to Server'), 1500);
  };

  const addGameRecord = (record) => {
    setGameHistory(prev => [record, ...prev]);
    if (record.suggestedLevel) {
      const key = `game${record.gameId}`;
      setGameLevels(prev => ({ ...prev, [key]: record.suggestedLevel }));
    }
    setSyncStatus('Sync Pending');
    setTimeout(() => setSyncStatus('Synced to Server'), 1500);
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS['en'];

  return (
    <AppContext.Provider value={{
      activeTab, setActiveTab,
      user, setUser,
      language, setLanguage,
      voiceSettings, setVoiceSettings,
      isVoicePanelOpen, setIsVoicePanelOpen,
      syncStatus, setSyncStatus,
      isAuthOpen, setIsAuthOpen,
      authMode, setAuthMode,
      activities, toggleActivity, addActivity,
      memoryBank, setMemoryBank,
      gameLevels, setGameLevels,
      gameHistory, addGameRecord,
      activeGame, setActiveGame,
      speak, t
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
