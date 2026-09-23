import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import GamesPage from './components/GamesPage';
import ActivityPage from './components/ActivityPage';
import PlayerDashboard from './components/PlayerDashboard';
import CaregiverReport from './components/CaregiverReport';
import MemoryBank from './components/MemoryBank';
import ProfilePage from './components/ProfilePage';
import VoiceLanguagePanel from './components/VoiceLanguagePanel';
import AuthModal from './components/AuthModal';
import PhaserGameContainer from './components/games/PhaserGameContainer';

function MainContent() {
  const { activeTab } = useApp();

  return (
    <main className="pb-16">
      {activeTab === 'home' && <HomePage />}
      {activeTab === 'dashboard' && <PlayerDashboard />}
      {activeTab === 'games' && <GamesPage />}
      {activeTab === 'activity' && <ActivityPage />}
      {activeTab === 'caregiverReport' && <CaregiverReport />}
      {activeTab === 'memoryBank' && <MemoryBank />}
      {activeTab === 'profile' && <ProfilePage />}

      {/* Global Modals & Overlay Drawers */}
      <VoiceLanguagePanel />
      <AuthModal />
      <PhaserGameContainer />
    </main>
  );
}

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
        <Navbar />
        <MainContent />
      </div>
    </AppProvider>
  );
}
