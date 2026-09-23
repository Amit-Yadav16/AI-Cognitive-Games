import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Plus, ShieldCheck, Image, Lock, Trash2, Sparkles, MapPin, UserCheck, Upload } from 'lucide-react';

export default function MemoryBank() {
  const { memoryBank, setMemoryBank, speak } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [newName, setNewName] = useState('');
  const [newRelation, setNewRelation] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newType, setNewType] = useState('family');
  const [newPhoto, setNewPhoto] = useState('');

  const memoryFileInputRef = useRef(null);

  const handleMemoryPhotoSelect = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (newName && newRelation) {
      const newItem = {
        id: Date.now(),
        type: newType,
        name: newName,
        relation: newRelation,
        description: newDesc || 'Personal memory content',
        photo: newPhoto || 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=300&q=80'
      };
      setMemoryBank(prev => [newItem, ...prev]);
      setShowAddModal(false);
      setNewName('');
      setNewRelation('');
      setNewDesc('');
      setNewPhoto('');
      speak(`Added ${newName} to your Personal Memory Bank.`);
    }
  };

  const handleDelete = (id, name) => {
    setMemoryBank(prev => prev.filter(item => item.id !== id));
    speak(`Removed ${name} from your Memory Bank.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 rounded-full text-xs font-black uppercase tracking-wider mb-2">
            <Lock className="w-3.5 h-3.5" />
            <span>Strict Privacy Protected</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight">
            Personal Memory Bank
          </h1>
          <p className="text-blue-100 text-sm font-semibold mt-1">
            Store photos of family members, familiar NER places, and favourite stories used for personalized cognitive games.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold rounded-2xl shadow-lg shadow-emerald-500/30 transition-transform active:scale-95"
        >
          <Plus className="w-5 h-5" />
          <span>Add Memory Photo</span>
        </button>
      </div>

      {/* Privacy Notice Banner */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl flex items-center justify-between text-blue-900 text-xs font-semibold">
        <div className="flex items-center space-x-3">
          <ShieldCheck className="w-6 h-6 text-blue-600 flex-shrink-0" />
          <span>
            <strong>Consent & Isolation Guarantee:</strong> Your uploaded personal photos are used strictly to generate your personalized Memory Match games. They are NEVER displayed on caregiver dashboards or shared with third parties.
          </span>
        </div>
      </div>

      {/* Memory Bank Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {memoryBank.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between">
            <div className="relative h-48 overflow-hidden">
              <img
                src={item.photo}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3">
                <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-md text-white font-black text-xs rounded-full">
                  {item.relation}
                </span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="text-lg font-black text-slate-900">{item.name}</h3>
                <p className="text-xs text-slate-500 font-semibold mt-1">{item.description}</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <span className="text-[11px] font-bold text-emerald-600 flex items-center">
                  <UserCheck className="w-3.5 h-3.5 mr-1" /> Active in Games
                </span>
                <button
                  onClick={() => handleDelete(item.id, item.name)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  title="Delete Memory"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Memory Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-blue-600 text-white p-6">
              <h2 className="text-xl font-extrabold">Add Personal Memory Content</h2>
              <p className="text-blue-100 text-xs font-semibold">Upload photo and specify name & relationship</p>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">Person or Place Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rohan Sharma"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">Relationship / Tag</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grandson, Favourite Place, etc."
                  value={newRelation}
                  onChange={(e) => setNewRelation(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Photo Upload Input & Preview */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">Upload Photo Image</label>
                
                <input
                  type="file"
                  ref={memoryFileInputRef}
                  accept="image/*"
                  onChange={handleMemoryPhotoSelect}
                  className="hidden"
                />

                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => memoryFileInputRef.current && memoryFileInputRef.current.click()}
                    className="flex items-center space-x-2 px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl text-xs border border-blue-200 transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Choose File from Device</span>
                  </button>

                  <span className="text-xs text-slate-400 font-semibold">or paste URL below</span>
                </div>

                <input
                  type="text"
                  placeholder="https://... (or choose file above)"
                  value={newPhoto}
                  onChange={(e) => setNewPhoto(e.target.value)}
                  className="w-full mt-2 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-blue-500"
                />

                {newPhoto && (
                  <div className="mt-2 flex items-center space-x-3 p-2 bg-slate-50 rounded-xl border border-slate-200">
                    <img src={newPhoto} alt="Preview" className="w-12 h-12 rounded-lg object-cover" />
                    <span className="text-xs font-bold text-emerald-600">Photo preview loaded!</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1">Memory Details / Description</label>
                <textarea
                  rows="2"
                  placeholder="Loves visiting Assam, teaches music..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-sm shadow-md"
                >
                  Save to Memory Bank
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
