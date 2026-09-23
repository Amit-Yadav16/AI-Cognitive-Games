import React from 'react';
import { useApp } from '../context/AppContext';
import { LANGUAGES } from '../utils/i18nTranslations';
import { Volume2, Globe, Sliders, CheckCircle2, X, Play, ShieldAlert } from 'lucide-react';

export default function VoiceLanguagePanel() {
  const { 
    isVoicePanelOpen, setIsVoicePanelOpen,
    language, setLanguage,
    voiceSettings, setVoiceSettings,
    speak, t 
  } = useApp();

  if (!isVoicePanelOpen) return null;

  const handleTestVoice = () => {
    speak("Hello! This is a test of the MindCare Text-to-Speech audio reader. Everything is set up clearly for you.");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-emerald-600 p-6 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
              <Volume2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold">{t.voice.title || 'Voice & Language Settings'}</h2>
              <p className="text-blue-100 text-xs font-semibold">
                {t.voice.subtitle || 'Customize language text & Text-to-Speech guidance'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsVoicePanelOpen(false)}
            className="p-2 hover:bg-white/20 rounded-xl transition-colors text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Section 1: Language Selection */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-extrabold text-slate-800 uppercase tracking-wide mb-3">
              <Globe className="w-4 h-4 text-blue-600" />
              <span>Select Interface Language (English, Hindi & 7 NER Languages)</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    speak(`Language updated to ${lang.name}`);
                  }}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all text-left font-semibold ${
                    language === lang.code
                      ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-500/20 text-blue-900 font-bold'
                      : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span className="text-xl">{lang.flag}</span>
                    <span className="text-sm">{lang.native}</span>
                  </span>
                  {language === lang.code && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section 2: Speech Speed & Pitch Controls */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-extrabold text-slate-800 uppercase tracking-wide mb-4">
              <Sliders className="w-4 h-4 text-emerald-600" />
              <span>Voice Speech Adjustments (Text-to-Speech)</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              
              {/* Speed Slider */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                  <span>{t.voice.ttsSpeed || 'Speech Speed'}</span>
                  <span className="text-blue-600">{voiceSettings.speed}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.1"
                  value={voiceSettings.speed}
                  onChange={(e) => setVoiceSettings({ ...voiceSettings, speed: parseFloat(e.target.value) })}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
                  <span>Slower (Elderly Friendly)</span>
                  <span>Normal</span>
                  <span>Faster</span>
                </div>
              </div>

              {/* Pitch Slider */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                  <span>{t.voice.ttsPitch || 'Speech Pitch'}</span>
                  <span className="text-emerald-600">{voiceSettings.pitch}</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.1"
                  value={voiceSettings.pitch}
                  onChange={(e) => setVoiceSettings({ ...voiceSettings, pitch: parseFloat(e.target.value) })}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
                  <span>Deeper</span>
                  <span>Default</span>
                  <span>Higher</span>
                </div>
              </div>

            </div>
          </div>

          {/* Section 3: Auto-read toggle */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div>
              <div className="font-extrabold text-sm text-slate-800">
                {t.voice.autoRead || 'Auto-read game instructions on launch'}
              </div>
              <div className="text-xs text-slate-500 font-semibold">
                Automatically plays voice prompts when opening any of the 6 cognitive games
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={voiceSettings.autoRead}
                onChange={(e) => setVoiceSettings({ ...voiceSettings, autoRead: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          {/* Audio Test Button */}
          <div className="pt-2">
            <button
              onClick={handleTestVoice}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-2xl shadow-lg shadow-blue-600/20 transition-transform active:scale-95"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>{t.voice.testVoice || 'Test Voice Audio Reader'}</span>
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={() => setIsVoicePanelOpen(false)}
            className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl text-sm hover:bg-slate-800 transition-colors"
          >
            Done & Save Preferences
          </button>
        </div>

      </div>
    </div>
  );
}
