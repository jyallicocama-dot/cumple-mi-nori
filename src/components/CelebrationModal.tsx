"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, Crown, X, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
}

export default function CelebrationModal({
  isOpen,
  onClose,
  onReset,
}: CelebrationModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    // Multi-stage celebratory confetti explosion
    const end = Date.now() + 3.5 * 1000;
    const colors = ["#A855F7", "#C084FC", "#FFFFFF", "#E879F9", "#FDE047"];

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.75, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 30 }}
          transition={{ type: "spring", damping: 22, stiffness: 280 }}
          className="relative w-full max-w-lg bg-gradient-to-b from-[#2A0E3D] via-[#1A092A] to-[#0A0012] text-white rounded-3xl border-4 border-[#C084FC] shadow-[0_0_65px_rgba(192,132,252,0.7)] p-6 sm:p-9 z-10 text-center overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-purple-300 hover:text-white rounded-full bg-purple-900/40 hover:bg-purple-800/60 transition-colors border border-purple-500/30"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Crown Icon */}
          <div className="relative inline-block mx-auto mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#A855F7] via-[#C084FC] to-white p-1 shadow-[0_0_30px_rgba(168,85,247,0.8)]">
              <div className="w-full h-full rounded-full bg-[#1A092A] flex items-center justify-center">
                <Crown className="w-10 h-10 text-yellow-300 fill-yellow-400 drop-shadow-[0_0_10px_#FACC15] animate-bounce" />
              </div>
            </div>
            <Sparkles className="w-6 h-6 text-purple-200 absolute -top-1 -right-2 animate-pulse" />
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-purple-300 mb-3 tracking-tight">
            ¡Descubriste los 21 motivos! 💜
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 via-fuchsia-400 to-pink-500 mx-auto rounded-full mb-5" />

          {/* Required specific celebration text */}
          <div className="p-4 sm:p-5 rounded-2xl bg-purple-950/60 border border-purple-600/40 mb-6 shadow-inner">
            <p className="text-lg sm:text-xl font-semibold text-purple-100 leading-snug">
              &ldquo;Ahora ya sabes por qué eres mi Ñori, mi todo.&rdquo;
            </p>
            <p className="mt-3 text-sm text-purple-300 font-normal leading-relaxed">
              Gracias por cada sonrisa, cada mirada y cada momento a tu lado. Que este nuevo año de vida te traiga toda la felicidad del mundo, porque te mereces el universo entero.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-pink-300 text-sm font-semibold mb-6">
            <Heart className="w-4 h-4 fill-pink-400" />
            <span>Feliz Cumpleaños, Mi Amor Eterno</span>
            <Heart className="w-4 h-4 fill-pink-400" />
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full font-bold text-sm bg-gradient-to-r from-[#A855F7] to-[#C084FC] hover:from-purple-500 hover:to-purple-400 text-white shadow-[0_0_20px_rgba(168,85,247,0.7)] transition-all flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Guardar en mi corazón</span>
            </button>

            <button
              onClick={onReset}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full font-medium text-xs text-purple-300 hover:text-white bg-purple-950/60 hover:bg-purple-900/60 border border-purple-700/50 transition-all flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Volver a descubrirlos</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
