"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Check, Sparkles, Trophy } from "lucide-react";
import confetti from "canvas-confetti";
import { reasonsData } from "../data/reasons";
import { Reason } from "../types";
import ReasonModal from "./ReasonModal";
import CelebrationModal from "./CelebrationModal";

export default function ReasonsSection() {
  const [visitedIds, setVisitedIds] = useState<number[]>([]);
  const [activeReason, setActiveReason] = useState<Reason | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [hasShownCelebrationOnce, setHasShownCelebrationOnce] = useState(false);

  // Restore visited state from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem("nori_visited_reasons");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setVisitedIds(parsed);
        }
      }
    } catch {
      // Ignore if localStorage unavailable
    }
  }, []);

  const total = reasonsData.length;
  const count = visitedIds.length;
  const percentage = Math.min(100, Math.round((count / total) * 100));

  const handleSelectStar = (reason: Reason) => {
    // Add to visited if not present
    let updated = visitedIds;
    if (!visitedIds.includes(reason.id)) {
      updated = [...visitedIds, reason.id];
      setVisitedIds(updated);
      try {
        localStorage.setItem("nori_visited_reasons", JSON.stringify(updated));
      } catch {
        // Ignore
      }
    }

    setActiveReason(reason);

    // If this completed all 21 reasons!
    if (updated.length === total && !hasShownCelebrationOnce) {
      setTimeout(() => {
        setShowCelebration(true);
        setHasShownCelebrationOnce(true);
      }, 700);
    }
  };

  const handleSelectReasonById = (id: number) => {
    const target = reasonsData.find((r) => r.id === id);
    if (target) {
      handleSelectStar(target);
    }
  };

  const handleResetProgress = () => {
    setVisitedIds([]);
    setShowCelebration(false);
    setHasShownCelebrationOnce(false);
    try {
      localStorage.removeItem("nori_visited_reasons");
    } catch {
      // Ignore
    }
  };

  const triggerCheerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.8 },
      colors: ["#A855F7", "#C084FC", "#FFFFFF"],
    });
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 relative z-10">
      
      {/* SECTION HEADER & PROGRESS BAR */}
      <div className="w-full max-w-2xl mx-auto mb-10 text-center">
        {/* Progress Text */}
        <div className="flex items-center justify-between text-sm sm:text-base font-bold text-purple-200 mb-2 px-1">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#C084FC]" />
            <span>Progreso de amor:</span>
          </span>
          <span className="text-[#E9D5FF] tracking-wider font-extrabold">
            {count}/{total} motivos descubiertos
          </span>
        </div>

        {/* Progress Bar Container */}
        <div className="relative w-full h-4 sm:h-5 bg-purple-950/70 rounded-full border border-purple-500/40 p-0.5 overflow-hidden shadow-[0_0_15px_rgba(168,85,247,0.3)]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-[#A855F7] via-[#C084FC] to-[#EC4899] shadow-[0_0_12px_rgba(236,72,153,0.7)]"
          />
        </div>

        {/* Completion Message or Helper text */}
        {count === total ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-900/80 to-fuchsia-900/80 border border-fuchsia-500/60 text-fuchsia-200 text-xs sm:text-sm font-semibold shadow-[0_0_20px_rgba(236,72,153,0.4)] cursor-pointer"
            onClick={() => setShowCelebration(true)}
          >
            <Trophy className="w-4 h-4 text-yellow-300" />
            <span>¡Descubriste los 21 motivos! Toca aquí para ver tu mensaje final</span>
          </motion.div>
        ) : (
          <p className="mt-3 text-xs sm:text-sm text-purple-300/80 italic">
            Toca cada estrellita para descubrir un secreto de amor ✨
          </p>
        )}
      </div>

      {/* 21 CIRCULAR STAR BUTTONS */}
      {/* Styled to look stunning on both PC and Mobile */}
      <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 md:gap-5 max-w-4xl mx-auto">
        {reasonsData.map((reason, index) => {
          const isVisited = visitedIds.includes(reason.id);

          return (
            <motion.button
              key={reason.id}
              onClick={() => handleSelectStar(reason)}
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.92 }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.025, type: "spring", stiffness: 260 }}
              className={`relative group w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex flex-col items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                isVisited
                  ? "bg-white text-purple-900 border-2 sm:border-[3px] border-[#A855F7] shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                  : "bg-gradient-to-br from-[#A855F7] to-[#7E22CE] text-white border-2 sm:border-[3px] border-white shadow-[0_0_18px_rgba(168,85,247,0.7)] hover:shadow-[0_0_28px_rgba(192,132,252,1)]"
              }`}
              title={`Motivo ${reason.id}: ${reason.title}`}
            >
              {/* Star icon */}
              <Star
                className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform ${
                  isVisited
                    ? "text-[#A855F7] fill-[#A855F7]"
                    : "text-white fill-white group-hover:scale-110 drop-shadow-[0_0_6px_#fff]"
                }`}
              />

              {/* Number */}
              <span
                className={`text-[10px] sm:text-xs font-black tracking-tight leading-none mt-0.5 ${
                  isVisited ? "text-purple-800" : "text-white/95"
                }`}
              >
                {reason.id}
              </span>

              {/* Checkmark badge when visited */}
              {isVisited && (
                <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-0.5 shadow-sm border border-white">
                  <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                </div>
              )}

              {/* Floating pulse ring on unvisited stars */}
              {!isVisited && (
                <span className="absolute inset-0 rounded-full border border-purple-300/40 animate-ping pointer-events-none opacity-40" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* MODAL FOR SINGLE REASON */}
      <ReasonModal
        reason={activeReason}
        onClose={() => setActiveReason(null)}
        onSelectReason={handleSelectReasonById}
        totalReasons={total}
      />

      {/* FINAL CELEBRATION MODAL */}
      <CelebrationModal
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        onReset={handleResetProgress}
      />
    </section>
  );
}
