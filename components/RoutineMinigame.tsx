"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Activity, Ban, PlusCircle, Check, ChevronRight } from "lucide-react";
import clsx from "clsx";

const ACTIONS = [
  { id: "a1", label: "Hacer ejercicio moderado", type: "good", icon: <Activity className="w-6 h-6" /> },
  { id: "a2", label: "Fumar tabaco", type: "bad", icon: <Ban className="w-6 h-6" /> },
  { id: "a3", label: "Consumir alcohol en exceso", type: "bad", icon: <Ban className="w-6 h-6" /> },
  { id: "a4", label: "Comer vegetales", type: "good", icon: <Heart className="w-6 h-6" /> },
];

export default function RoutineMinigame({ onComplete }: { onComplete: (bonus: number) => void }) {
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const toggleAction = (id: string) => {
    setSelectedActions(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleFinish = () => {
    setIsFinished(true);
  };

  const calculateBonus = () => {
    let bonus = 0;
    selectedActions.forEach(id => {
      const action = ACTIONS.find(a => a.id === id);
      if (action?.type === "good") bonus += 15;
      else if (action?.type === "bad") bonus -= 10;
    });
    return Math.max(0, bonus); // No negative bonus
  };

  const bonusScore = calculateBonus();

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="p-4 border-b border-pink-100 bg-pink-50/50 text-center">
        <h2 className="text-xl font-bold text-pink-600">Nivel Bonus: ¡Arma tu rutina!</h2>
        <p className="text-sm text-neutral-500">Selecciona los hábitos saludables para ganar puntos extra.</p>
      </div>

      <div className="flex-1 p-6 flex flex-col">
        {!isFinished ? (
          <div className="flex-1 flex flex-col animate-fade-in gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ACTIONS.map(action => {
                const isSelected = selectedActions.includes(action.id);
                return (
                  <button
                    key={action.id}
                    onClick={() => toggleAction(action.id)}
                    className={clsx(
                      "flex items-center gap-3 p-4 rounded-xl border-2 transition-all font-bold text-left hover:scale-[1.02]",
                      isSelected 
                        ? "bg-pink-100 border-pink-400 text-pink-800" 
                        : "bg-neutral-50 border-neutral-200 text-neutral-600 hover:border-pink-300"
                    )}
                  >
                    <div className={clsx("w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full border-2", isSelected ? "border-pink-500 bg-pink-500 text-white" : "border-neutral-300 text-transparent")}>
                      <Check className="w-4 h-4" />
                    </div>
                    {action.icon}
                    {action.label}
                  </button>
                )
              })}
            </div>

            <div className="mt-auto pt-8 flex justify-center">
              <button
                onClick={handleFinish}
                className="w-full max-w-sm flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:-translate-y-1 transition-all disabled:opacity-50 disabled:hover:translate-y-0"
                disabled={selectedActions.length === 0}
              >
                Terminar Rutina
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center"
          >
            <div className="bg-green-100 text-green-600 p-6 rounded-full mb-6">
              <PlusCircle className="w-16 h-16" />
            </div>
            <h3 className="text-3xl font-bold text-neutral-800 mb-2">¡Rutina evaluada!</h3>
            <p className="text-xl text-neutral-600 mb-6">Conseguiste <strong className="text-pink-500">+{bonusScore}</strong> puntos extra</p>
            
            <button
               onClick={() => onComplete(bonusScore)}
               className="w-full max-w-xs bg-neutral-900 hover:bg-neutral-800 text-white py-4 rounded-xl font-bold text-lg shadow-lg"
            >
              Ver resultados finales
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
