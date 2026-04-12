"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HeartPulse, Stethoscope, ChevronRight, Trophy } from "lucide-react";

export default function StartScreen({ onStart, onShowLeaderboard }: { onStart: (name: string) => void, onShowLeaderboard: () => void }) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length >= 2) {
      onStart(name.trim());
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-pink-50 to-white relative">
      <button 
        onClick={onShowLeaderboard}
        className="absolute top-6 right-6 text-pink-500 bg-pink-100 hover:bg-pink-200 p-3 rounded-full transition-colors flex items-center justify-center group"
      >
        <Trophy className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
      >
        <div className="w-32 h-32 bg-pink-100 rounded-full flex items-center justify-center mb-6 shadow-inner mx-auto">
          <HeartPulse className="w-16 h-16 text-pink-500" />
        </div>
      </motion.div>
      
      <h1 className="text-4xl font-extrabold text-pink-800 mb-4 tracking-tight">
        Detecta la <span className="text-pink-500">Señal</span>
      </h1>
      <p className="text-neutral-600 mb-8 max-w-sm text-lg">
        Aprende a reconocer síntomas de alerta, desmitifica creencias y descubre acciones de prevención contra el cáncer de mama.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-xs">
        <input
          type="text"
          placeholder="Tu nombre..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-6 py-4 rounded-full border-2 border-pink-200 focus:border-pink-500 focus:outline-none text-center text-lg font-semibold text-neutral-800 placeholder:text-neutral-400 bg-white/80 transition-all shadow-sm focus:shadow-pink-500/20"
        />

        <button
          type="submit"
          disabled={name.trim().length < 2}
          className="w-full group relative flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 disabled:bg-neutral-300 disabled:cursor-not-allowed text-white px-8 py-4 rounded-full font-bold text-xl transition-all shadow-lg hover:shadow-pink-500/30 hover:-translate-y-1 disabled:hover:translate-y-0 disabled:hover:shadow-none"
        >
          <Stethoscope className="w-6 h-6" />
          Comenzar
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </div>
  );
}
