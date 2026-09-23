// Browser Web Speech API Utility for MindCare Audio Guidance

export function speakText(text, lang = 'en', rate = 0.9, pitch = 1.0) {
  if (!('speechSynthesis' in window)) {
    console.warn("Speech Synthesis not supported in this browser.");
    return false;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate; // Slightly slower speed (0.8 - 0.9) for elderly clarity
  utterance.pitch = pitch;

  // Language mapping
  if (lang === 'hi') {
    utterance.lang = 'hi-IN';
  } else if (lang === 'as' || lang === 'brx' || lang === 'mni') {
    utterance.lang = 'hi-IN'; // Fallback to Hindi voice for NER region if specific accent unavailable
  } else {
    utterance.lang = 'en-US';
  }

  // Attempt to select best voice
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(v => v.lang.startsWith(utterance.lang) || v.lang.startsWith(lang));
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
