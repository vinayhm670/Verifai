import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../../services/sampleData';
import { Language } from '../../i18n/translations';
import { HelpCircle, CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ScamQuizProps {
  lang: Language;
}

export const ScamQuiz: React.FC<ScamQuizProps> = ({ lang }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const question = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === question.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-900 mb-2">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Interactive Digital Safety Masterclass</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {lang === 'hi' ? 'स्कैम अवेयरनेस क्विज़' : 'Scam Awareness Quiz'}
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          * All scenarios are educational simulations designed to train safe reflexes for real-world scams.
        </p>
      </div>

      {!quizFinished ? (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100 dark:border-slate-800">
            <span>Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}</span>
            <span className="font-semibold text-teal-800 dark:text-teal-400">Score: {score}</span>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-teal-700 dark:text-teal-400 uppercase tracking-wider block">
              Scenario: {question.scenarioContext}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
              {lang === 'hi' ? question.questionHindi : question.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {(lang === 'hi' ? question.optionsHindi : question.options).map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === question.correctIndex;

              let btnStyle = 'border-slate-200 dark:border-slate-700 hover:border-teal-600 bg-slate-50/50 dark:bg-slate-800/40 text-slate-800 dark:text-slate-200';
              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold ring-1 ring-emerald-500';
                } else if (isSelected) {
                  btnStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 ring-1 ring-rose-500';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-start justify-between gap-3 ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswered && (
            <div className="p-4 rounded-xl bg-teal-50/50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900 text-xs space-y-1">
              <span className="font-bold text-teal-900 dark:text-teal-200 block">
                {lang === 'hi' ? 'सुरक्षा नियम:' : 'Safety Rule & Explanation:'}
              </span>
              <p className="text-slate-700 dark:text-slate-300">
                {lang === 'hi' ? question.explanationHindi : question.explanation}
              </p>
            </div>
          )}

          {/* Footer Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart Quiz</span>
            </button>

            {isAnswered && (
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-teal-800 hover:bg-teal-900 rounded-lg shadow-sm transition-colors"
              >
                <span>{currentIdx + 1 === QUIZ_QUESTIONS.length ? 'See Final Score' : 'Next Question'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results Card */
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xs text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-400 mx-auto flex items-center justify-center">
            <Award className="w-8 h-8" />
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Quiz Completed!
          </h2>

          <div className="text-3xl font-extrabold text-teal-800 dark:text-teal-400 font-mono">
            {score} / {QUIZ_QUESTIONS.length}
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
            {score === QUIZ_QUESTIONS.length
              ? 'Outstanding! You have exceptional digital safety awareness and recognize high-risk Indian cyber threats.'
              : 'Good effort! Review the safety guidelines to sharpen your reflexes against urgent UPI links and job scams.'}
          </p>

          <div className="pt-4 flex items-center justify-center gap-3">
            <button
              onClick={handleRestart}
              className="px-5 py-2 text-xs font-bold text-white bg-teal-800 hover:bg-teal-900 rounded-lg shadow-sm"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
