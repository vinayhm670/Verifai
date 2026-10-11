import React, { useState } from 'react';
import { Volume2, VolumeX, Mic, MicOff } from 'lucide-react';
import { speakText, stopSpeaking, createSpeechRecognizer } from '../../services/speech';

interface AudioNarratorProps {
  textToSpeak: string;
  lang?: 'en' | 'hi';
}

export const AudioNarrator: React.FC<AudioNarratorProps> = ({ textToSpeak, lang = 'en' }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleSpeech = () => {
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
    } else {
      const ok = speakText(textToSpeak, lang, () => setIsPlaying(false));
      if (ok) setIsPlaying(true);
    }
  };

  return (
    <button
      onClick={toggleSpeech}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border transition-colors ${
        isPlaying
          ? 'bg-teal-50 border-teal-300 text-teal-800 dark:bg-teal-950/40 dark:border-teal-700 dark:text-teal-300'
          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200'
      }`}
      title={isPlaying ? 'Stop voice reading' : `Listen in ${lang === 'hi' ? 'Hindi' : 'English'}`}
    >
      {isPlaying ? <VolumeX className="w-3.5 h-3.5 text-teal-600 animate-pulse" /> : <Volume2 className="w-3.5 h-3.5" />}
      <span>{isPlaying ? 'Stop' : lang === 'hi' ? 'हिंदी में सुनें' : 'Listen'}</span>
    </button>
  );
};

interface VoiceInputButtonProps {
  onTranscript: (text: string) => void;
  lang?: 'en' | 'hi';
}

export const VoiceInputButton: React.FC<VoiceInputButtonProps> = ({ onTranscript, lang = 'en' }) => {
  const [isListening, setIsListening] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleStartListening = () => {
    setErrorMsg(null);
    const recognizer = createSpeechRecognizer(
      lang,
      (result) => {
        setIsListening(false);
        onTranscript(result);
      },
      (err) => {
        setIsListening(false);
        setErrorMsg(err);
      }
    );

    if (recognizer.isSupported) {
      setIsListening(true);
      recognizer.start();
    } else {
      setErrorMsg('Speech input not supported in this browser');
    }
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={handleStartListening}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
          isListening
            ? 'bg-rose-50 border-rose-300 text-rose-700 dark:bg-rose-950/40 dark:border-rose-700 dark:text-rose-300 animate-pulse'
            : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
        }`}
        title="Dictate with voice"
      >
        {isListening ? <MicOff className="w-3.5 h-3.5 text-rose-600" /> : <Mic className="w-3.5 h-3.5" />}
        <span>{isListening ? 'Listening...' : 'Voice Input'}</span>
      </button>

      {errorMsg && (
        <div className="absolute left-0 bottom-full mb-1 z-20 w-48 p-2 text-[11px] rounded bg-slate-900 text-white shadow-lg">
          {errorMsg}
        </div>
      )}
    </div>
  );
};
