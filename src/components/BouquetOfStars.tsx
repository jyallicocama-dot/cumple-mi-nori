"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";

export default function BouquetOfStars() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center justify-center p-6 text-center select-none"
    >
      {/* Floating Bouquet Container */}
      <motion.div
        animate={{
          y: [0, -14, 0],
          rotate: [-1, 1.2, -1],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative group cursor-pointer"
      >
        {/* Soft glowing radial background behind the bouquet */}
        <div className="absolute inset-0 -m-8 bg-gradient-to-t from-purple-600/30 via-fuchsia-500/20 to-transparent blur-3xl rounded-full pointer-events-none" />

        {/* Sparkling particle badges around bouquet */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-3 -right-3 text-purple-300 drop-shadow-[0_0_12px_#C084FC]"
        >
          <Sparkles className="w-6 h-6" />
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 2.8, repeat: Infinity, delay: 0.7, ease: "easeInOut" }}
          className="absolute top-1/4 -left-4 text-fuchsia-300 drop-shadow-[0_0_12px_#A855F7]"
        >
          <Sparkles className="w-5 h-5" />
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.2, ease: "easeInOut" }}
          className="absolute bottom-16 -right-2 text-pink-300 drop-shadow-[0_0_10px_#F472B6]"
        >
          <Heart className="w-5 h-5 fill-pink-400/40" />
        </motion.div>

        {/* The SVG Bouquet */}
        <div className="relative w-64 h-80 sm:w-72 sm:h-92 drop-shadow-[0_0_25px_rgba(168,85,247,0.55)] transition-transform duration-300 group-hover:scale-105">
          <svg
            viewBox="0 0 300 380"
            className="w-full h-full overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Gradients */}
              <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818CF8" />
                <stop offset="50%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#6B21A8" />
              </linearGradient>

              <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C084FC" />
                <stop offset="50%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#7E22CE" />
              </linearGradient>

              <linearGradient id="starLilac" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#E9D5FF" />
                <stop offset="100%" stopColor="#C084FC" />
              </linearGradient>

              <linearGradient id="starGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFBEB" />
                <stop offset="50%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#EAB308" />
              </linearGradient>

              <radialGradient id="flowerLilacCenter" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#6B21A8" />
              </radialGradient>

              <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* BOUQUET STEMS */}
            <g stroke="url(#stemGrad)" strokeWidth="3.5" strokeLinecap="round" opacity="0.85">
              <path d="M150 280 Q145 220 100 160" />
              <path d="M150 280 Q148 210 130 140" />
              <path d="M150 280 Q150 200 150 120" />
              <path d="M150 280 Q152 210 170 140" />
              <path d="M150 280 Q155 220 200 160" />
              <path d="M150 280 Q138 230 80 180" />
              <path d="M150 280 Q162 230 220 180" />
              <path d="M150 280 Q142 245 115 200" />
              <path d="M150 280 Q158 245 185 200" />
            </g>

            {/* STEM LOWER BUNDLE (gathered together) */}
            <path
              d="M142 280 L136 345 Q150 352 164 345 L158 280 Z"
              fill="url(#stemGrad)"
              opacity="0.9"
            />

            {/* FLOWERS & STAR CLUSTERS */}

            {/* FLOWER 1 (Center Top) */}
            <g transform="translate(150, 115)" filter="url(#glowFilter)">
              {[0, 72, 144, 216, 288].map((angle, i) => (
                <circle
                  key={i}
                  cx={18 * Math.cos((angle * Math.PI) / 180)}
                  cy={18 * Math.sin((angle * Math.PI) / 180)}
                  r="13"
                  fill="#C084FC"
                  opacity="0.95"
                />
              ))}
              <circle cx="0" cy="0" r="10" fill="#FFFFFF" />
              <circle cx="0" cy="0" r="6" fill="#FDE047" />
            </g>

            {/* FLOWER 2 (Upper Left) */}
            <g transform="translate(100, 150)" filter="url(#glowFilter)">
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <circle
                  key={i}
                  cx={15 * Math.cos((angle * Math.PI) / 180)}
                  cy={15 * Math.sin((angle * Math.PI) / 180)}
                  r="11"
                  fill="#E9D5FF"
                  opacity="0.95"
                />
              ))}
              <circle cx="0" cy="0" r="8" fill="#A855F7" />
              <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
            </g>

            {/* FLOWER 3 (Upper Right) */}
            <g transform="translate(200, 150)" filter="url(#glowFilter)">
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <circle
                  key={i}
                  cx={15 * Math.cos((angle * Math.PI) / 180)}
                  cy={15 * Math.sin((angle * Math.PI) / 180)}
                  r="11"
                  fill="#A855F7"
                  opacity="0.95"
                />
              ))}
              <circle cx="0" cy="0" r="8" fill="#FFFFFF" />
              <circle cx="0" cy="0" r="4" fill="#FDE047" />
            </g>

            {/* FLOWER 4 (Mid Left Outer) */}
            <g transform="translate(75, 190)" filter="url(#glowFilter)">
              {[0, 72, 144, 216, 288].map((angle, i) => (
                <circle
                  key={i}
                  cx={14 * Math.cos((angle * Math.PI) / 180)}
                  cy={14 * Math.sin((angle * Math.PI) / 180)}
                  r="10"
                  fill="#F3E8FF"
                  opacity="0.9"
                />
              ))}
              <circle cx="0" cy="0" r="7" fill="#C084FC" />
            </g>

            {/* FLOWER 5 (Mid Right Outer) */}
            <g transform="translate(225, 190)" filter="url(#glowFilter)">
              {[0, 72, 144, 216, 288].map((angle, i) => (
                <circle
                  key={i}
                  cx={14 * Math.cos((angle * Math.PI) / 180)}
                  cy={14 * Math.sin((angle * Math.PI) / 180)}
                  r="10"
                  fill="#E9D5FF"
                  opacity="0.9"
                />
              ))}
              <circle cx="0" cy="0" r="7" fill="#A855F7" />
            </g>

            {/* FLOWER 6 (Center Middle) */}
            <g transform="translate(150, 185)" filter="url(#glowFilter)">
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <circle
                  key={i}
                  cx={18 * Math.cos((angle * Math.PI) / 180)}
                  cy={18 * Math.sin((angle * Math.PI) / 180)}
                  r="12"
                  fill="#FFFFFF"
                  opacity="0.98"
                />
              ))}
              <circle cx="0" cy="0" r="9" fill="url(#flowerLilacCenter)" />
            </g>

            {/* FLOWER 7 (Lower Mid Left) */}
            <g transform="translate(115, 215)" filter="url(#glowFilter)">
              {[0, 72, 144, 216, 288].map((angle, i) => (
                <circle
                  key={i}
                  cx={12 * Math.cos((angle * Math.PI) / 180)}
                  cy={12 * Math.sin((angle * Math.PI) / 180)}
                  r="9"
                  fill="#C084FC"
                  opacity="0.9"
                />
              ))}
              <circle cx="0" cy="0" r="6" fill="#FFFFFF" />
            </g>

            {/* FLOWER 8 (Lower Mid Right) */}
            <g transform="translate(185, 215)" filter="url(#glowFilter)">
              {[0, 72, 144, 216, 288].map((angle, i) => (
                <circle
                  key={i}
                  cx={12 * Math.cos((angle * Math.PI) / 180)}
                  cy={12 * Math.sin((angle * Math.PI) / 180)}
                  r="9"
                  fill="#A855F7"
                  opacity="0.9"
                />
              ))}
              <circle cx="0" cy="0" r="6" fill="#FFFFFF" />
            </g>

            {/* GLOWING 5-POINT STARS IN THE BOUQUET */}
            {/* Top Star */}
            <g transform="translate(150, 60) scale(1.1)" filter="url(#glowFilter)">
              <polygon
                points="0,-18 5,-5 18,-5 8,4 12,17 0,9 -12,17 -8,4 -18,-5 -5,-5"
                fill="url(#starGold)"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
              <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
            </g>

            {/* Left High Star */}
            <g transform="translate(60, 130) scale(0.9)" filter="url(#glowFilter)">
              <polygon
                points="0,-16 4,-4 16,-4 7,3 10,15 0,8 -10,15 -7,3 -16,-4 -4,-4"
                fill="url(#starLilac)"
                stroke="#FFFFFF"
                strokeWidth="1.2"
              />
            </g>

            {/* Right High Star */}
            <g transform="translate(240, 130) scale(0.9)" filter="url(#glowFilter)">
              <polygon
                points="0,-16 4,-4 16,-4 7,3 10,15 0,8 -10,15 -7,3 -16,-4 -4,-4"
                fill="url(#starLilac)"
                stroke="#FFFFFF"
                strokeWidth="1.2"
              />
            </g>

            {/* Upper Right Star */}
            <g transform="translate(185, 90) scale(0.8)" filter="url(#glowFilter)">
              <polygon
                points="0,-15 4,-4 15,-4 7,3 9,14 0,7 -9,14 -7,3 -15,-4 -4,-4"
                fill="url(#starGold)"
                stroke="#FFFFFF"
                strokeWidth="1"
              />
            </g>

            {/* Upper Left Star */}
            <g transform="translate(115, 90) scale(0.8)" filter="url(#glowFilter)">
              <polygon
                points="0,-15 4,-4 15,-4 7,3 9,14 0,7 -9,14 -7,3 -15,-4 -4,-4"
                fill="#FFFFFF"
                stroke="#C084FC"
                strokeWidth="1"
              />
            </g>

            {/* Tiny accent spark stars around bouquet */}
            <g transform="translate(95, 175) scale(0.55)">
              <polygon
                points="0,-14 4,-4 14,-4 6,3 9,13 0,7 -9,13 -6,3 -14,-4 -4,-4"
                fill="#FFFFFF"
              />
            </g>
            <g transform="translate(205, 175) scale(0.55)">
              <polygon
                points="0,-14 4,-4 14,-4 6,3 9,13 0,7 -9,13 -6,3 -14,-4 -4,-4"
                fill="#FFFFFF"
              />
            </g>
            <g transform="translate(150, 150) scale(0.65)">
              <polygon
                points="0,-14 4,-4 14,-4 6,3 9,13 0,7 -9,13 -6,3 -14,-4 -4,-4"
                fill="url(#starGold)"
              />
            </g>

            {/* LILAC RIBBON & BOW (LACITO LILA) */}
            <g id="lilacRibbon" transform="translate(150, 280)" filter="url(#glowFilter)">
              {/* Left loop */}
              <path
                d="M-5 0 C-25 -25 -55 -15 -45 10 C-38 28 -15 15 -2 5 Z"
                fill="url(#ribbonGrad)"
                stroke="#F3E8FF"
                strokeWidth="2"
              />
              {/* Right loop */}
              <path
                d="M5 0 C25 -25 55 -15 45 10 C38 28 15 15 2 5 Z"
                fill="url(#ribbonGrad)"
                stroke="#F3E8FF"
                strokeWidth="2"
              />
              {/* Left ribbon tail */}
              <path
                d="M-8 8 C-18 25 -32 50 -40 70 C-30 65 -22 62 -12 68 C-14 45 -6 25 -3 10 Z"
                fill="url(#ribbonGrad)"
                stroke="#F3E8FF"
                strokeWidth="1.5"
              />
              {/* Right ribbon tail */}
              <path
                d="M8 8 C18 25 32 50 40 70 C30 65 22 62 12 68 C14 45 6 25 3 10 Z"
                fill="url(#ribbonGrad)"
                stroke="#F3E8FF"
                strokeWidth="1.5"
              />
              {/* Central Knot */}
              <ellipse
                cx="0"
                cy="3"
                rx="12"
                ry="10"
                fill="#A855F7"
                stroke="#FFFFFF"
                strokeWidth="2.5"
              />
              <circle cx="0" cy="3" r="4" fill="#F3E8FF" />
            </g>
          </svg>
        </div>
      </motion.div>

      {/* Bouquet Descriptions */}
      <div className="mt-6 space-y-1.5">
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide flex items-center justify-center gap-2 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">
          <span>Ramo de estrellas para ti</span>
          <span className="text-purple-400">✨</span>
        </h3>
        <p className="text-sm sm:text-base text-purple-200/90 font-medium italic flex items-center justify-center gap-1.5">
          <span>Hecho con amor, para Mi Ñori</span>
          <Heart className="w-4 h-4 text-pink-400 fill-pink-400 inline" />
        </p>
      </div>
    </motion.div>
  );
}
