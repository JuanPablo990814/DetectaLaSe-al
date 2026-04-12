"use client";

import { useState } from "react";
import StartScreen from "./StartScreen";
import TriviaGame from "./TriviaGame";
import ResultsScreen from "./ResultsScreen";
import RoutineMinigame from "./RoutineMinigame";
import Leaderboard, { ScoreEntry } from "./Leaderboard";

type GameState = "START" | "TRIVIA" | "MINIGAME" | "RESULTS" | "LEADERBOARD";

export default function GameContainer() {
  const [gameState, setGameState] = useState<GameState>("START");
  const [playerName, setPlayerName] = useState("");
  const [score, setScore] = useState(0);

  const handleStart = (name: string) => {
    setPlayerName(name);
    setGameState("TRIVIA");
  };

  const saveScore = (finalScore: number) => {
    const newEntry: ScoreEntry = { name: playerName, score: finalScore, date: new Date().toISOString() };
    
    // Save locally just in case it's still useful
    const saved = localStorage.getItem("detecta_la_senal_leaderboard");
    const scores = saved ? JSON.parse(saved) : [];
    scores.push(newEntry);
    localStorage.setItem("detecta_la_senal_leaderboard", JSON.stringify(scores));

    // Post to global local DB
    fetch('/api/leaderboard', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEntry)
    }).catch(e => console.error("Could not upload score", e));
  };

  const handleTriviaComplete = (finalScore: number) => {
    setScore(finalScore);
    setGameState("MINIGAME");
  };

  const handleMinigameComplete = (bonusScore: number) => {
    const finalScore = score + bonusScore;
    setScore(finalScore);
    saveScore(finalScore);
    setGameState("RESULTS");
  }

  const handleRestart = () => {
    setScore(0);
    setPlayerName("");
    setGameState("START");
  };

  return (
    <div className="w-full max-w-2xl mx-auto min-h-[650px] bg-white rounded-3xl shadow-2xl shadow-pink-500/10 overflow-hidden border-4 border-pink-100 flex flex-col relative top-0">
      {gameState === "START" && <StartScreen onStart={handleStart} onShowLeaderboard={() => setGameState("LEADERBOARD")} />}
      {gameState === "TRIVIA" && <TriviaGame onComplete={handleTriviaComplete} />}
      {gameState === "MINIGAME" && <RoutineMinigame onComplete={handleMinigameComplete} />}
      {gameState === "RESULTS" && <ResultsScreen score={score} onRestart={handleRestart} onShowLeaderboard={() => setGameState("LEADERBOARD")} />}
      {gameState === "LEADERBOARD" && (
        <Leaderboard onBack={() => {
          // If we came from results, we restart or go back to results? Best is back to Start.
          setGameState("START");
          setScore(0);
          setPlayerName("");
        }} />
      )}
    </div>
  );
}
