"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HeartPulse, Stethoscope, ChevronRight, Trophy, BookOpen, PlayCircle } from "lucide-react";
import ResourcesModal from "./ResourcesModal";

export default function StartScreen({ onStart, onShowLeaderboard }: { onStart: (name: string) => void, onShowLeaderboard: () => void }) {
  const [name, setName] = useState("");
  const [modalType, setModalType] = useState<"bib" | "vid" | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length >= 2) {
      onStart(name.trim());
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 min-h-screen">
      
      <ResourcesModal 
        isOpen={modalType !== null} 
        onClose={() => setModalType(null)} 
        type={modalType === "bib" ? "bib" : "vid"} 
      />

      {/* Animated Blobs for vivid aesthetic */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white opacity-20 rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-yellow-300 opacity-20 rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <button 
        onClick={onShowLeaderboard}
        className="absolute top-6 right-6 text-white bg-white/20 hover:bg-white/30 backdrop-blur-md p-3 rounded-full transition-colors flex items-center justify-center group z-10 shadow-lg border border-white/20"
      >
        <Trophy className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      <div className="relative z-10 flex flex-col items-center w-full max-w-md pt-12 pb-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
        >
          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-xl border border-white/30 mx-auto group">
            <HeartPulse className="w-12 h-12 sm:w-14 sm:h-14 text-white group-hover:scale-110 transition-transform" />
          </div>
        </motion.div>
        
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-2 tracking-tight drop-shadow-md">
          Detecta la <span className="text-yellow-300">Señal</span>
        </h1>
        
        <p className="text-pink-100 mb-6 font-medium text-lg drop-shadow-sm px-4">¡Bienvenido(a)! Tu misión es aprender a salvar vidas.</p>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 sm:p-6 rounded-3xl mb-8 w-full text-left shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[100px] pointer-events-none"></div>
          
          <h2 className="text-yellow-300 font-bold mb-4 flex items-center gap-2 text-lg">
            <BookOpen className="w-5 h-5" />
            ¿Cómo jugar?
          </h2>
          <ul className="text-white space-y-3 text-sm sm:text-base font-medium">
            <li className="flex gap-3">
              <span className="text-yellow-300 font-black">1.</span>
              <span>Identifica si es una <strong>Señal de Alerta</strong>, un <strong>Mito</strong> o <strong>Prevención</strong>.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-yellow-300 font-black">2.</span>
              <span>¡Gana puntos por cada acierto! Mantén una racha para bonos.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-yellow-300 font-black">3.</span>
              <span>En el nivel final, arma tu <strong>rutina saludable</strong>.</span>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full mb-8">
          <input
            type="text"
            placeholder="Escribe tu nombre..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-6 py-4 rounded-full border-2 border-white/40 focus:border-yellow-300 focus:outline-none text-center text-lg font-bold text-neutral-800 placeholder:text-neutral-500 bg-white/90 focus:bg-white transition-all shadow-lg"
          />

          <button
            type="submit"
            disabled={name.trim().length < 2}
            className="w-full group relative flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 disabled:bg-white/20 disabled:text-white/50 disabled:cursor-not-allowed text-neutral-900 px-8 py-4 rounded-full font-black text-xl transition-all shadow-[0_0_20px_rgba(250,204,21,0.4)] hover:shadow-[0_0_30px_rgba(250,204,21,0.6)] hover:-translate-y-1 disabled:hover:translate-y-0 disabled:shadow-none"
          >
            <Stethoscope className="w-6 h-6" />
            Comenzar Reto
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Big Responsive Resource Buttons */}
        <div className="w-full flex flex-col sm:flex-row gap-4 mt-auto">
          <button
            type="button"
            onClick={() => setModalType("bib")}
            className="flex-1 flex flex-col items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl p-4 transition-all shadow-lg hover:-translate-y-1 group"
          >
            <BookOpen className="w-8 h-8 text-pink-200 group-hover:text-white transition-colors" />
            <span className="text-white font-bold text-lg">Bibliografía</span>
          </button>
          
          <button
            type="button"
            onClick={() => setModalType("vid")}
            className="flex-1 flex flex-col items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl p-4 transition-all shadow-lg hover:-translate-y-1 group"
          >
            <PlayCircle className="w-8 h-8 text-pink-200 group-hover:text-white transition-colors" />
            <span className="text-white font-bold text-lg">Vídeos del Tema</span>
          </button>
        </div>
        
      </div>
    </div>
  );
}
