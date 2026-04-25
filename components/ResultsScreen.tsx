"use client";

import { motion } from "framer-motion";
import { Award, RotateCcw, Medal, Trophy, BookOpen, PlayCircle } from "lucide-react";
import clsx from "clsx";
import { useState } from "react";
import ResourcesModal from "./ResourcesModal";

export default function ResultsScreen({ score, onRestart, onShowLeaderboard }: { score: number, onRestart: () => void, onShowLeaderboard: () => void }) {
  const [modalType, setModalType] = useState<"bib" | "vid" | null>(null);
  
  let message = "";
  let subMessage = "";
  let color = "";
  
  if (score >= 80) {
    message = "¡Eres un guardián de la salud! 💖";
    subMessage = "Tienes un excelente conocimiento sobre prevención y alertas del cáncer de mama.";
    color = "text-pink-500";
  } else if (score >= 50) {
    message = "Vas muy bien, sigue aprendiendo";
    subMessage = "Conoces lo básico, pero aún hay detalles importantes que recordar.";
    color = "text-orange-500";
  } else {
    message = "¡No te preocupes! Aprender salva vidas";
    subMessage = "Te invitamos a intentarlo otra vez. ¡Cada vez sabrás más!";
    color = "text-neutral-500";
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white relative overflow-hidden">
      <ResourcesModal 
        isOpen={modalType !== null} 
        onClose={() => setModalType(null)} 
        type={modalType === "bib" ? "bib" : "vid"} 
      />

      <div className="absolute -top-32 -left-32 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-pink-200 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
        className="mb-8 mt-4"
      >
        <div className="w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center shadow-lg border-4 border-yellow-200 mx-auto">
          {score >= 80 ? (
            <Award className="w-16 h-16 text-yellow-500" />
          ) : (
            <Medal className="w-16 h-16 text-yellow-500" />
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full flex-1 flex flex-col justify-center"
      >
        <div className="text-xl font-bold text-neutral-400 mb-2 uppercase tracking-wide">Puntuación Final</div>
        <div className={clsx("text-6xl font-black mb-6 font-mono", color)}>
          {score}
        </div>

        <h2 className={clsx("text-2xl sm:text-3xl font-extrabold mb-4", color)}>{message}</h2>
        <p className="text-neutral-600 max-w-md mx-auto mb-8 text-lg">
          {subMessage}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <button
            onClick={() => setModalType("bib")}
            className="flex items-center gap-2 text-pink-600 font-bold bg-pink-50 hover:bg-pink-100 px-5 py-3 rounded-2xl transition-colors border border-pink-100"
          >
            <BookOpen className="w-5 h-5" />
            Bibliografía
          </button>
          <button
            onClick={() => setModalType("vid")}
            className="flex items-center gap-2 text-red-600 font-bold bg-red-50 hover:bg-red-100 px-5 py-3 rounded-2xl transition-colors border border-red-100"
          >
            <PlayCircle className="w-5 h-5" />
            Vídeos del tema
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-auto">
          <button
            onClick={onRestart}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:-translate-y-1 transition-all"
          >
            <RotateCcw className="w-6 h-6" />
            Volver a jugar
          </button>
          <button
            onClick={onShowLeaderboard}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:-translate-y-1 transition-all"
          >
            <Trophy className="w-6 h-6" />
            Top Posiciones
          </button>
        </div>
      </motion.div>
    </div>
  );
}
