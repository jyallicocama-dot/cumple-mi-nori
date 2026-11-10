"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import confetti from "canvas-confetti";
import { Reason } from "../types";

interface ReasonModalProps {
  reason: Reason | null;
  onClose: () => void;
  onSelectReason: (id: number) => void;
  totalReasons: number;
}

export default function ReasonModal({
  reason,
  onClose,
  onSelectReason,
  totalReasons,
}: ReasonModalProps) {
  useEffect(() => {
    if (!reason) return;

    // Trigger sweet confetti explosion with lila, purple and white!
    try {
      confetti({
        particleCount: 70,
        spread: 65,
        origin: { y: 0.55 },
        colors: ["#A855F7", "#C084FC", "#FFFFFF", "#E879F9", "#7E22CE"],
      });
    } catch {
      // Safe fallback if confetti runs into browser issues
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && reason.id < totalReasons) onSelectReason(reason.id + 1);
      if (e.key === "ArrowLeft" && reason.id > 1) onSelectReason(reason.id - 1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [reason, onClose, onSelectReason, totalReasons]);

  if (!reason) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-gradient-to-b from-[#1E112A] via-[#12081E] to-[#0D0417] text-white rounded-3xl border-2 border-[#A855F7] shadow-[0_0_50px_rgba(168,85,247,0.55)] p-6 sm:p-8 z-10 overflow-hidden"
        >
          {/* Subtle glowing orb in background */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-[#A855F7]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-[#C084FC]/20 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-purple-300 hover:text-white rounded-full bg-purple-900/40 hover:bg-purple-800/60 transition-colors border border-purple-500/30"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge Header: Motivo X de 21 */}
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#A855F7] to-[#C084FC] text-white shadow-[0_0_15px_rgba(168,85,247,0.6)]">
              <Sparkles className="w-3.5 h-3.5 fill-white" />
              <span>Motivo {reason.id} de {totalReasons}</span>
            </span>

            {reason.tag && (
              <span className="text-xs text-purple-300 font-medium px-2.5 py-0.5 rounded-full bg-purple-950/60 border border-purple-800/50">
                {reason.tag}
              </span>
            )}
          </div>

          {/* Reason Title */}
          <h3 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-purple-300 tracking-tight leading-tight mt-1 mb-2">
            {reason.title}
          </h3>

          <p className="text-xs sm:text-sm text-purple-400 font-medium italic mb-5 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
            <span>{reason.shortDescription}</span>
          </p>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-purple-500/40 via-purple-400/80 to-purple-500/40 my-3" />

          {/* Full Romantic Prose */}
          <div className="my-5 p-4 sm:p-5 rounded-2xl bg-purple-950/40 border border-purple-800/40 backdrop-blur-sm">
            <p className="text-purple-100 text-base sm:text-lg leading-relaxed font-normal">
              &ldquo;{reason.fullMessage}&rdquo;
            </p>
          </div>

          {/* Footer Controls */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={() => onSelectReason(reason.id - 1)}
              disabled={reason.id <= 1}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                reason.id <= 1
                  ? "opacity-30 cursor-not-allowed text-gray-500"
                  : "bg-purple-950/80 hover:bg-purple-900 text-purple-200 border border-purple-700/50"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all flex items-center gap-1.5"
            >
              <span>Te amo 💜</span>
            </button>

            <button
              onClick={() => onSelectReason(reason.id + 1)}
              disabled={reason.id >= totalReasons}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                reason.id >= totalReasons
                  ? "opacity-30 cursor-not-allowed text-gray-500"
                  : "bg-purple-950/80 hover:bg-purple-900 text-purple-200 border border-purple-700/50"
              }`}
            >
              <span>Siguiente</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
