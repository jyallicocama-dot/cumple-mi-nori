"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
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
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [reason?.id]);

  useEffect(() => {
    if (!reason) return;

    // Prevent body horizontal/vertical scrolling behind modal
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    try {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.55 },
        colors: ["#A855F7", "#C084FC", "#FFFFFF", "#E879F9", "#7E22CE"],
      });
    } catch {
      // Safe fallback
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && reason.id < totalReasons) onSelectReason(reason.id + 1);
      if (e.key === "ArrowLeft" && reason.id > 1) onSelectReason(reason.id - 1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [reason, onClose, onSelectReason, totalReasons]);

  if (!reason) return null;

  return (
    <AnimatePresence>
      {/* Highest Z-Index (z-[100]) to cover footer and controls on mobile */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 overflow-x-hidden overflow-y-auto overscroll-y-contain">
        
        {/* Full Dark Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Modal Window: locked horizontally, smooth vertical scroll */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 15 }}
          transition={{ type: "spring", damping: 26, stiffness: 320 }}
          style={{ touchAction: "pan-y" }}
          className="relative w-full max-w-[calc(100vw-1.5rem)] sm:max-w-lg max-h-[88vh] overflow-x-hidden overflow-y-auto bg-gradient-to-b from-[#1E112A] via-[#12081E] to-[#0D0417] text-white rounded-3xl border-2 border-[#A855F7] shadow-[0_0_50px_rgba(168,85,247,0.6)] p-5 sm:p-7 z-10 pb-8 sm:pb-7"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="sticky top-1 right-1 float-right p-2 text-purple-300 hover:text-white rounded-full bg-purple-900/60 hover:bg-purple-800 transition-colors border border-purple-500/40 z-30"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge Header: Motivo X de 21 */}
          <div className="flex items-center gap-2 mb-3 clear-both">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#A855F7] to-[#C084FC] text-white shadow-[0_0_15px_rgba(168,85,247,0.6)]">
              <Sparkles className="w-3.5 h-3.5 fill-white" />
              <span>Motivo {reason.id} de {totalReasons}</span>
            </span>

            {reason.tag && (
              <span className="text-xs text-purple-300 font-medium px-2.5 py-0.5 rounded-full bg-purple-950/70 border border-purple-800/60">
                {reason.tag}
              </span>
            )}
          </div>

          {/* Reason Title */}
          <h3 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-purple-300 tracking-tight leading-tight mt-1 mb-1">
            {reason.title}
          </h3>

          <p className="text-xs sm:text-sm text-purple-300 font-medium italic mb-4 flex items-center gap-1.5">
            <span className="text-sm">✨</span>
            <span>{reason.shortDescription}</span>
          </p>

          {/* Centered Photo Container */}
          {reason.image && !imgError && (
            <div className="w-full flex items-center justify-center my-3 bg-purple-950/50 rounded-2xl border-2 border-[#A855F7]/50 shadow-[0_0_25px_rgba(168,85,247,0.3)] p-1.5 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={reason.image}
                alt={reason.title}
                onError={() => setImgError(true)}
                className="max-h-60 sm:max-h-72 w-auto max-w-full rounded-xl object-contain mx-auto transition-transform"
              />
            </div>
          )}

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-purple-500/40 via-purple-400/80 to-purple-500/40 my-3" />

          {/* Full Prose */}
          <div className="my-4 p-4 sm:p-5 rounded-2xl bg-purple-950/40 border border-purple-800/40 backdrop-blur-sm">
            <p className="text-purple-100 text-sm sm:text-base leading-relaxed font-normal">
              &ldquo;{reason.fullMessage}&rdquo;
            </p>
          </div>

          {/* Footer Controls: Centered and responsive */}
          <div className="mt-5 flex items-center justify-between gap-2 pt-2">
            <button
              onClick={() => onSelectReason(reason.id - 1)}
              disabled={reason.id <= 1}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                reason.id <= 1
                  ? "opacity-30 cursor-not-allowed text-gray-500"
                  : "bg-purple-950/90 hover:bg-purple-900 text-purple-200 border border-purple-700/50"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            {/* Changed from 'Te amo' to 'Con cariño 💐' */}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all flex items-center gap-1.5"
            >
              <span>Con cariño 💐</span>
            </button>

            <button
              onClick={() => onSelectReason(reason.id + 1)}
              disabled={reason.id >= totalReasons}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                reason.id >= totalReasons
                  ? "opacity-30 cursor-not-allowed text-gray-500"
                  : "bg-purple-950/90 hover:bg-purple-900 text-purple-200 border border-purple-700/50"
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
