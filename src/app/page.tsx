"use client";

import React from "react";
import { motion } from "framer-motion";
import StarField from "../components/StarField";
import BouquetOfStars from "../components/BouquetOfStars";
import LoveCard from "../components/LoveCard";
import ReasonsSection from "../components/ReasonsSection";
import MusicPlayer from "../components/MusicPlayer";
import { Sparkles, Heart } from "lucide-react";

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full bg-black text-white overflow-hidden flex flex-col justify-between selection:bg-purple-600 selection:text-white">
      {/* Dynamic Star Field Canvas */}
      <StarField />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col items-center">
        
        {/* HEADER SECTION */}
        <header className="text-center max-w-3xl mx-auto mb-8 sm:mb-14 space-y-4">
          
          {/* Top romantic tag */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-200 text-xs sm:text-sm font-semibold shadow-[0_0_20px_rgba(168,85,247,0.3)] backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-300 animate-spin" />
            <span>Un regalo de cumpleaños inolvidable</span>
            <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
          </motion.div>

          {/* Main Title: "Feliz Cumpleaños Mi Ñori ⭐" */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight"
          >
            <span className="text-white glow-white">Feliz Cumpleaños </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] via-[#A855F7] to-[#E879F9] glow-lilac drop-shadow-[0_0_25px_rgba(168,85,247,0.85)]">
              Mi Ñori
            </span>{" "}
            <span className="inline-block text-yellow-300 drop-shadow-[0_0_15px_#FACC15] animate-bounce">
              ⭐
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-xl text-purple-200/90 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Toca las 21 estrellitas, cada una es un motivo por el que te amo 💜
          </motion.p>
        </header>

        {/* 2 COLUMNS ON PC, 1 ON MOBILE: BOUQUET & CARD */}
        <section className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center justify-center my-4 sm:my-8">
          {/* Left Column: Bouquet of stars */}
          <div className="w-full flex justify-center">
            <BouquetOfStars />
          </div>

          {/* Right Column: Love card */}
          <div className="w-full flex justify-center">
            <LoveCard />
          </div>
        </section>

        {/* 21 REASONS INTERACTIVE SECTION */}
        <div className="w-full mt-6 sm:mt-10">
          <ReasonsSection />
        </div>
      </div>

      {/* FOOTER */}
      <footer className="relative z-10 w-full py-8 text-center text-xs sm:text-sm text-purple-400/80 border-t border-purple-950/60 bg-black/50 backdrop-blur-sm">
        <p className="flex items-center justify-center gap-1.5">
          <span>Hecho con todo mi amor para Mi Ñori</span>
          <Heart className="w-4 h-4 text-pink-400 fill-pink-400 inline" />
          <span>• 21 Motivos para celebrar tu vida</span>
        </p>
      </footer>

      {/* Floating Music Player */}
      <MusicPlayer />
    </main>
  );
}
