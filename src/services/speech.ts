export function speakText(text: string, lang: 'en' | 'hi' = 'en', onEnd?: () => void): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  window.speechSynthesis.cancel(); // Stop any active speech

  const cleanText = text.replace(/[*_#`[\]()]/g, ' ').substring(0, 1000); // Clean markdown
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
  utterance.rate = 0.95;
  utterance.pitch = 1.0;

  // Attempt to select an Indian English or Hindi voice if available
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(v => 
    lang === 'hi' ? (v.lang.includes('hi') || v.name.toLowerCase().includes('hindi')) :
    (v.lang.includes('en-IN') || v.name.toLowerCase().includes('india') || v.lang.includes('en'))
  );

  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function isSpeechSynthesisAvailable(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function createSpeechRecognizer(
  lang: 'en' | 'hi',
  onResult: (transcript: string) => void,
  onError: (errorMsg: string) => void
): { start: () => void; stop: () => void; isSupported: boolean } {
  if (typeof window === 'undefined') {
    return { start: () => {}, stop: () => {}, isSupported: false };
  }

  const SpeechRecognition = 
    (window as unknown as { SpeechRecognition?: any }).SpeechRecognition || 
    (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return {
      start: () => onError('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.'),
      stop: () => {},
      isSupported: false
    };
  }

  const recognizer = new SpeechRecognition();
  recognizer.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
  recognizer.continuous = false;
  recognizer.interimResults = false;

  recognizer.onresult = (event: any) => {
    if (event.results && event.results[0] && event.results[0][0]) {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    }
  };

  recognizer.onerror = (event: any) => {
    onError(event.error ? `Microphone error: ${event.error}` : 'Unable to capture voice');
  };

  return {
    start: () => {
      try {
        recognizer.start();
      } catch (err: any) {
        onError('Microphone already active or permission needed.');
      }
    },
    stop: () => {
      try {
        recognizer.stop();
      } catch {
        // ignore
      }
    },
    isSupported: true
  };
}
