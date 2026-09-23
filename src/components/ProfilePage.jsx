import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Camera, User, Mail, Shield, CheckCircle, Save, Globe, Volume2, Key, UserCheck, Upload } from 'lucide-react';
import { LANGUAGES } from '../utils/i18nTranslations';

export default function ProfilePage() {
  const { user, setUser, language, setLanguage, voiceSettings, setVoiceSettings, speak, t } = useApp();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [caregiverName, setCaregiverName] = useState(user.connectedCaregiver.name);
  const [caregiverEmail, setCaregiverEmail] = useState(user.connectedCaregiver.email);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [uploadFeedback, setUploadFeedback] = useState(false);

  const fileInputRef = useRef(null);

  // Handle Photo Upload from Device File System
  const handlePhotoSelect = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const photoDataUrl = reader.result;
        setUser(prev => ({
          ...prev,
          avatar: photoDataUrl
        }));
        setUploadFeedback(true);
        speak("Profile photo updated successfully.");
        setTimeout(() => setUploadFeedback(false), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      name,
      email,
      connectedCaregiver: {
        ...prev.connectedCaregiver,
        name: caregiverName,
        email: caregiverEmail
      }
    }));
    setSavedSuccess(true);
    speak("Profile settings saved successfully.");
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Title */}
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Player Profile & Caregiver Connection</h1>
          <p className="text-slate-500 font-semibold text-sm mt-1">
            Manage your details, connected caregiver access, and language preferences.
          </p>
        </div>
      </div>

      {/* Main Profile Form Card matching Sketch 1 Profile Wireframe */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-8">
        
        {/* Profile Avatar Upload Circle matching Sketch 1 */}
        <div className="flex flex-col items-center justify-center border-b border-slate-100 pb-8">
          
          {/* Hidden HTML5 File Input */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handlePhotoSelect}
            className="hidden"
          />

          <div 
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            className="relative group cursor-pointer"
            title="Click to select image file from computer"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-36 h-36 rounded-full object-cover ring-4 ring-blue-600/30 shadow-xl group-hover:opacity-90 transition-opacity"
            />
            
            {/* Camera Overlay Icon */}
            <div className="absolute bottom-1 right-1 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg border-2 border-white transition-transform active:scale-95 group-hover:scale-110">
              <Camera className="w-5 h-5" />
            </div>
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            className="mt-3 flex items-center space-x-1.5 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl transition-colors"
          >
            <Upload className="w-4 h-4" />
            <span>Upload New Profile Photo</span>
          </button>

          {uploadFeedback && (
            <span className="text-xs font-black text-emerald-600 mt-2 flex items-center">
              <CheckCircle className="w-4 h-4 mr-1" /> Profile picture updated!
            </span>
          )}

          <span className="text-xs font-semibold text-slate-400 mt-1">
            Click photo or camera icon to upload image from your device
          </span>
        </div>

        {/* Form Inputs Grid matching Sketch 1 Wireframe */}
        <div className="space-y-6">
          
          <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide flex items-center space-x-2">
            <User className="w-4 h-4 text-blue-600" />
            <span>Personal Details</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase mb-2">Player Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase mb-2">Optional Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Connected Caregiver Section matching Sketch 1 Annotation */}
          <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide flex items-center space-x-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Connected Caregiver Details</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase mb-2">Caregiver Name</label>
              <input
                type="text"
                required
                value={caregiverName}
                onChange={(e) => setCaregiverName(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase mb-2">Caregiver Email</label>
              <input
                type="email"
                required
                value={caregiverEmail}
                onChange={(e) => setCaregiverEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Language & Voice Guidance Preferences */}
          <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide flex items-center space-x-2">
            <Globe className="w-4 h-4 text-blue-600" />
            <span>Language & Audio Settings</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase mb-2">Preferred Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.flag} {l.native} ({l.name})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div>
                <div className="font-extrabold text-xs text-slate-800">Voice Guidance Enabled</div>
                <div className="text-[11px] text-slate-500 font-semibold">Audio reader for instructions</div>
              </div>
              <input
                type="checkbox"
                checked={voiceSettings.enabled}
                onChange={(e) => setVoiceSettings({ ...voiceSettings, enabled: e.target.checked })}
                className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
              />
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          {savedSuccess ? (
            <span className="text-sm font-extrabold text-emerald-600 flex items-center">
              <CheckCircle className="w-4 h-4 mr-1.5" /> Settings Saved!
            </span>
          ) : (
            <span></span>
          )}

          <button
            type="submit"
            className="flex items-center space-x-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-2xl shadow-lg shadow-blue-600/20 transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile</span>
          </button>
        </div>

      </form>

    </div>
  );
}
