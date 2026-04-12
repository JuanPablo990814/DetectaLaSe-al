"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, ChevronLeft } from "lucide-react";
import clsx from "clsx";

export interface ScoreEntry {
  name: string;
  score: number;
  date: string;
}

export default function Leaderboard({ onBack }: { onBack: () => void }) {
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/leaderboard', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setScores(data.sort((a, b) => b.score - a.score).slice(0, 10));
        }
      })
      .catch(e => console.error("Error loading server leaderboard", e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center p-8 flex-col bg-white">
      <div className="w-full relative flex items-center justify-center mb-8">
        <button 
          onClick={onBack}
          className="absolute left-0 text-neutral-500 hover:text-pink-500 p-2 rounded-full hover:bg-pink-100 transition-colors"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <Trophy className="w-10 h-10 text-yellow-500 mr-3" />
        <h2 className="text-3xl font-extrabold text-pink-800">Top Posiciones</h2>
      </div>

      <div className="w-full max-w-md flex-1 overflow-y-auto pr-2">
        {loading ? (
          <div className="flex flex-col items-center justify-center mt-20 text-pink-400">
            <span className="animate-pulse font-bold text-xl">Cargando posiciones...</span>
          </div>
        ) : scores.length === 0 ? (
          <div className="text-center text-neutral-400 mt-20">
            <p>¡Aún no hay puntuaciones!</p>
            <p className="text-sm">Sé el primero en jugar y dejar tu marca.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {scores.map((entry, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={clsx(
                  "flex items-center justify-between p-4 rounded-2xl border-2",
                  idx === 0 ? "bg-yellow-50 border-yellow-200" :
                  idx === 1 ? "bg-neutral-100 border-neutral-300" :
                  idx === 2 ? "bg-orange-50 border-orange-200" : "bg-neutral-50 border-neutral-100"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={clsx(
                    "w-8 h-8 flex items-center justify-center rounded-full font-bold",
                    idx === 0 ? "bg-yellow-200 text-yellow-700" :
                    idx === 1 ? "bg-neutral-300 text-neutral-700" :
                    idx === 2 ? "bg-orange-200 text-orange-700" : "bg-neutral-200 text-neutral-500"
                  )}>
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-800 text-lg">{entry.name}</h4>
                    <span className="text-xs text-neutral-400">{new Date(entry.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="text-2xl font-black font-mono text-pink-500">{entry.score}</div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
