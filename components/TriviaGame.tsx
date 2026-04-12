"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questions, Category } from "@/lib/questions";
import { CheckCircle2, XCircle, ChevronRight, AlertTriangle, ShieldCheck, HelpCircle } from "lucide-react";
import clsx from "clsx";

export default function TriviaGame({ onComplete }: { onComplete: (score: number) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<Category | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const question = questions[currentIndex];
  const isCorrect = selectedAnswer === question?.correctAnswer;

  const handleAnswer = (answer: Category) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (answer === question.correctAnswer) {
      setScore((prev) => prev + 10 + (streak >= 2 ? 5 : 0)); // Bonus points for streak
      setStreak((prev) => prev + 1);
      playAudio('/sounds/success.mp3');
    } else {
      setScore((prev) => prev - 5);
      setStreak(0);
      playAudio('/sounds/error.mp3');
    }
  };

  const playAudio = (path: string) => {
    try {
      const audio = new Audio(path);
      audio.volume = 0.5;
      audio.play().catch(() => {});
    } catch(e) {}
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onComplete(score);
    }
  };

  if (!question) return null;

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b border-pink-100 bg-pink-50/50">
        <div className="flex flex-col">
          <span className="text-xs sm:text-sm font-bold text-pink-400 uppercase tracking-wider">Puntuación</span>
          <span className="text-xl sm:text-2xl font-black text-pink-600 font-mono tracking-tighter">{score}</span>
        </div>
        {streak >= 2 && (
           <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1 text-orange-500 font-bold bg-orange-100 px-3 py-1 rounded-full text-xs sm:text-sm">
             🔥 Racha x{streak} (+5 pts)
           </motion.div>
        )}
        <div className="text-sm font-medium text-neutral-400">
          {currentIndex + 1} / {questions.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-neutral-100 relative overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-pink-400" 
          initial={{ width: 0 }} 
          animate={{ width: `${((currentIndex) / questions.length) * 100}%` }} 
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="flex-1 flex flex-col p-4 sm:p-6 pb-8 overflow-y-auto w-full">
        <AnimatePresence mode="wait">
          {!showFeedback ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col pt-4"
            >
              <h2 className="text-lg sm:text-xl text-neutral-500 font-semibold mb-2 text-center sm:text-left">Te encuentras con lo siguiente...</h2>
              <div className="bg-pink-50 p-6 rounded-2xl mb-8 flex-1 flex items-center justify-center text-center shadow-inner min-h-[160px]">
                <h3 className="text-2xl sm:text-3xl font-bold text-neutral-800 leading-snug">{question.text}</h3>
              </div>

              <div className="flex flex-col gap-3 max-w-md w-full mx-auto">
                <OptionButton 
                  label="Señal de alerta" 
                  icon={<AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />} 
                  color="bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:border-red-300"
                  onClick={() => handleAnswer("Señal de alerta")} 
                />
                <OptionButton 
                  label="Mito" 
                  icon={<HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />} 
                  color="bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300"
                  onClick={() => handleAnswer("Mito")} 
                />
                <OptionButton 
                  label="Prevención" 
                  icon={<ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />} 
                  color="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:border-green-300"
                  onClick={() => handleAnswer("Prevención")} 
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center py-6"
            >
              {isCorrect ? (
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-green-500" />
                </div>
              ) : (
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-red-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <XCircle className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" />
                </div>
              )}
              
              <h3 className={clsx("text-2xl sm:text-3xl font-extrabold mb-2", isCorrect ? "text-green-600" : "text-red-500")}>
                {isCorrect ? "¡Correcto!" : "Incorrecto"}
              </h3>
              
              <div className="bg-neutral-50 rounded-2xl p-4 sm:p-6 text-neutral-700 max-w-md w-full my-4 sm:my-6 text-base sm:text-lg shadow-inner">
                {question.feedback}
              </div>

              <div className="text-xs sm:text-sm font-bold text-neutral-400 mb-6 sm:mb-8 uppercase tracking-widest">
                Categoría real: <span className="text-pink-500">{question.correctAnswer}</span>
              </div>

              <button
                onClick={handleNext}
                className="w-full max-w-xs flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-colors shadow-lg"
              >
                Continuar
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function OptionButton({ label, icon, color, onClick }: { label: string, icon: React.ReactNode, color: string, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border-2 transition-all font-bold text-base sm:text-lg w-full text-left hover:-translate-y-0.5",
        color
      )}
    >
      <div className="opacity-80">{icon}</div>
      {label}
    </button>
  );
}
