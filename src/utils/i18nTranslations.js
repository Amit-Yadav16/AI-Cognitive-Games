export const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
  { code: 'as', name: 'Assamese', native: 'অসমীয়া', flag: '🌿' },
  { code: 'brx', name: 'Bodo', native: 'বর\'', flag: '🏔️' },
  { code: 'kha', name: 'Khasi', native: 'Khasi', flag: '⛰️' },
  { code: 'grt', name: 'Garo', native: 'A·chik', flag: '🍃' },
  { code: 'lus', name: 'Mizo', native: 'Mizo', flag: '🌅' },
  { code: 'mni', name: 'Manipuri', native: 'মৈতৈলোন্', flag: '🌸' },
  { code: 'nkx', name: 'Kokborok', native: 'Kokborok', flag: '🏞️' }
];

export const TRANSLATIONS = {
  en: {
    appName: "MindCare",
    tagline: "Cognitive Engagement & Memory Support Platform",
    greeting: "Good Morning, Didi Devi!",
    nav: {
      home: "HOME",
      games: "Games",
      activity: "Activity",
      dashboard: "Dashboard",
      caregiverReport: "Caregiver Report",
      profile: "Profile",
      memoryBank: "Memory Bank",
      speak: "Speak",
      signIn: "Sign In",
      signUp: "Sign Up"
    },
    kpi: {
      gamesCompleted: "Games Completed",
      activePlayTime: "Active Play Time",
      avgGameScore: "Avg Game Score",
      dailyMemoryGoal: "Daily Memory Goal",
      attentionScore: "Attention Score",
      languageScore: "Language Score"
    },
    sections: {
      cognitiveGames: "Cognitive Games",
      todayChecklist: "Today's Activities Checklist",
      caregiverStatus: "Caregiver Connection Status"
    },
    games: {
      game1Title: "Memory Match",
      game1Category: "Family Recognition",
      game1Desc: "Identify your loved ones from photos",
      game2Title: "Word & Places",
      game2Category: "Familiar Places & Favourite Things",
      game2Desc: "Recognize NER landmarks & favourite items",
      game3Title: "Find the Target",
      game3Category: "Attention & Focus",
      game3Desc: "Locate specific shapes among distractors",
      game4Title: "Remember Sequence",
      game4Category: "Speed & Memory",
      game4Desc: "Repeat the picture sequence in exact order",
      game5Title: "Change the Rule",
      game5Category: "Cognitive Flexibility",
      game5Desc: "Sort items by dynamic switching rules",
      game6Title: "Arrange the Day",
      game6Category: "Planning & Sequence",
      game6Desc: "Order daily routines from morning to night"
    },
    status: {
      connected: "Connected",
      pending: "Sync Pending",
      savedLocally: "Saved Locally",
      synced: "Synced to Server"
    },
    voice: {
      title: "Voice & Language Settings",
      subtitle: "Customize language text and Text-to-Speech audio reader",
      ttsSpeed: "Speech Speed",
      ttsPitch: "Speech Pitch",
      autoRead: "Auto-read instructions when games start",
      testVoice: "Test Voice Prompt"
    }
  },
  hi: {
    appName: "माइंडकेयर",
    tagline: "संज्ञानात्मक सहायता एवं स्मृति सहयोग मंच",
    greeting: "सुप्रभात, दीदी देवी!",
    nav: {
      home: "मुख्य पृष्ठ",
      games: "खेल (Games)",
      activity: "गतिविधियां",
      dashboard: "डैशबोर्ड",
      caregiverReport: "केयरगिवर रिपोर्ट",
      profile: "प्रोफ़ाइल",
      memoryBank: "स्मृति बैंक",
      speak: "बोलें (Speak)",
      signIn: "साइन इन",
      signUp: "साइन अप"
    },
    kpi: {
      gamesCompleted: "पूरे किए गए खेल",
      activePlayTime: "सक्रिय खेल समय",
      avgGameScore: "औसत खेल स्कोर",
      dailyMemoryGoal: "दैनिक स्मृति लक्ष्य",
      attentionScore: "ध्यान स्कोर (Attention)",
      languageScore: "भाषा स्कोर (Language)"
    },
    sections: {
      cognitiveGames: "संज्ञानात्मक खेल (Cognitive Games)",
      todayChecklist: "आज की गतिविधियों की सूची",
      caregiverStatus: "केयरगिवर कनेक्शन स्थिति"
    },
    games: {
      game1Title: "स्मृति मिलान",
      game1Category: "परिवार पहचान",
      game1Desc: "तस्वीरों से अपने प्रियजनों को पहचानें",
      game2Title: "शब्द एवं स्थान",
      game2Category: "परिचित स्थान व पसंदीदा वस्तुएं",
      game2Desc: "उत्तर-पूर्वी भारत के स्थानों को पहचानें",
      game3Title: "लक्ष्य खोजें",
      game3Category: "ध्यान एवं एकाग्रता",
      game3Desc: "दी गई आकृतियों में से सही लक्ष्य चुनें",
      game4Title: "अनुक्रम याद रखें",
      game4Category: "गति व स्मरण शक्ति",
      game4Desc: "चित्रों के क्रम को सही तरीके से दोहराएं",
      game5Title: "नियम बदलें",
      game5Category: "लचीलापन (Cognitive Flexibility)",
      game5Desc: "बदलते नियमों के अनुसार वस्तुओं को छांटें",
      game6Title: "दिनचर्या व्यवस्थित करें",
      game6Category: "योजना एवं अनुक्रम",
      game6Desc: "सुबह से रात तक के कार्यों को क्रम में लगाएं"
    },
    status: {
      connected: "जुड़ा हुआ है",
      pending: "सिंक लंबित है",
      savedLocally: "स्थानीय रूप से सहेजा गया",
      synced: "सर्वर पर सिंक किया गया"
    },
    voice: {
      title: "आवाज और भाषा सेटिंग्स",
      subtitle: "भाषा पाठ और टेक्स्ट-टू-स्पीच आवाज अनुकूलित करें",
      ttsSpeed: "बोलने की गति",
      ttsPitch: "आवाज की पिच",
      autoRead: "खेल शुरू होने पर निर्देश स्वचालित रूप से पढ़ें",
      testVoice: "आवाज परीक्षण करें"
    }
  },
  as: {
    appName: "মাাইণ্ডকেয়াৰ",
    tagline: "স্মৃতি আৰু জ্ঞানমূলক সাহায্য মঞ্চ",
    greeting: "সুপ্ৰভাত, দিদি দেৱী!",
    nav: {
      home: "মুখ্য পৃষ্ঠা",
      games: "খেলসমূহ",
      activity: "দৈনন্দিন কাৰ্যসূচী",
      dashboard: "ডেশ্ববৰ্ড",
      caregiverReport: "যত্নলওঁতাৰ প্ৰতিবেদন",
      profile: "প্ৰফাইল",
      memoryBank: "স্মৃতি ভঁৰাল",
      speak: "পঢ়ি শুনাওক",
      signIn: "ছাইন ইন",
      signUp: "পঞ্জীয়ন"
    },
    kpi: {
      gamesCompleted: "সম্পূৰ্ণ খেলসমূহ",
      activePlayTime: "সক্ৰিয় খেলৰ সময়",
      avgGameScore: "গড় স্কোৰ",
      dailyMemoryGoal: "দৈনিক স্মৃতি লক্ষ্য",
      attentionScore: "মনোযোগ স্কোৰ",
      languageScore: "ভাষা স্কোৰ"
    },
    sections: {
      cognitiveGames: "জ্ঞানমূলক খেলসমূহ",
      todayChecklist: "আজিৰ কাৰ্যসূচী",
      caregiverStatus: "যত্নলওঁতাৰ সংযোগ"
    },
    games: {
      game1Title: "পৰিয়াল চিনাক্তকৰণ",
      game1Category: "স্মৃতি মিলান",
      game1Desc: "ছবিৰ পৰা আপোনজনক চিনাক্ত কৰক",
      game2Title: "পৰিচিত স্থান",
      game2Category: "পছন্দৰ বস্তু",
      game2Desc: "উত্তৰ-পূবৰ চিহ্নিত স্থান চিনাক্ত কৰক",
      game3Title: "লক্ষ্য বিচাৰক",
      game3Category: "একাগ্ৰতা",
      game3Desc: "সঠিক আকৃতি বিচাৰি উলিয়াওক",
      game4Title: "ক্ৰম মনত ৰাখক",
      game4Category: "স্মৰণ শক্তি",
      game4Desc: "ছবিৰ ক্ৰম মনত ৰাখি মিলিয়াওক",
      game5Title: "নিয়ম সলনি",
      game5Category: "মানসিক নমনীয়তা",
      game5Desc: "সলনি হোৱা নিয়মমতে বাছনি কৰক",
      game6Title: "দিনটো সজাওক",
      game6Category: "পৰিকল্পনা",
      game6Desc: "পুৱাৰ পৰা নিশালৈ কামবোৰ ক্ৰমত ৰাখক"
    },
    status: {
      connected: "সংযোজিত",
      pending: "অপেক্ষমান",
      savedLocally: "স্থানীয়ভাৱে সংৰক্ষিত",
      synced: "চাৰ্ভাৰত সংৰক্ষিত"
    },
    voice: {
      title: "ধ্বনি আৰু ভাষা সংৰূপ",
      subtitle: "ভাষা আৰু ভয়েচ চেটিং সলনি কৰক",
      ttsSpeed: "শব্দৰ গতি",
      ttsPitch: "ধ্বনিৰ স্বৰ",
      autoRead: "খেল আৰম্ভ হ'লে স্বয়ংক্ৰিয়ভাৱে পঢ়ক",
      testVoice: "আৱাজ পৰীক্ষা কৰক"
    }
  }
};
