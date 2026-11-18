"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Star } from "lucide-react";

export default function LoveCard() {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      className="flex flex-col items-center justify-center p-4 sm:p-6"
    >
      {/* The White Card with 4px Lilac Border and Glowing Lilac Shadow */}
      <div className="relative w-full max-w-sm sm:max-w-md bg-white text-gray-900 border-4 border-[#A855F7] rounded-3xl p-6 sm:p-7 shadow-[0_0_35px_rgba(168,85,247,0.5)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(168,85,247,0.7)] group">
        
        {/* Decorative corner stars */}
        <div className="absolute -top-3 -left-3 bg-[#A855F7] text-white p-1.5 rounded-full shadow-lg border-2 border-white">
          <Star className="w-4 h-4 fill-white" />
        </div>
        <div className="absolute -top-3 -right-3 bg-[#A855F7] text-white p-1.5 rounded-full shadow-lg border-2 border-white">
          <Sparkles className="w-4 h-4 fill-white" />
        </div>

        {/* Photo Container */}
        <div className="relative w-full aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden mb-5 border-2 border-purple-200 bg-gradient-to-br from-purple-100 via-pink-50 to-purple-200 flex items-center justify-center shadow-inner">
          {!imgError ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src="/mi-nori.jpg"
              alt="Mi Ñori"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-6 text-purple-700 space-y-3">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-purple-200/80 flex items-center justify-center text-purple-600 shadow-inner">
                  <span className="text-3xl">🌸</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-sm sm:text-base text-purple-900">
                  Foto de Mi Ñori
                </p>
                <p className="text-xs text-purple-500 max-w-[200px] leading-tight">
                  Coloca tu foto como <span className="font-mono bg-purple-100 px-1 py-0.5 rounded text-purple-800">/public/mi-nori.jpg</span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#7E22CE] tracking-tight flex items-center justify-center gap-2">
            <span>Mi Ñori</span>
            <span className="text-2xl text-purple-500">✨</span>
          </h2>

          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#A855F7] to-transparent mx-auto rounded-full" />

          <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-normal italic px-2">
            &ldquo;Eres mi estrellita favorita, la que ilumina hasta mis días más oscuros. Gracias por existir.&rdquo;
          </p>

          {/* Clean footer note with bouquet */}
          <div className="pt-2 flex items-center justify-center gap-2 text-xs text-purple-700 font-medium">
            <span className="text-sm">💐</span>
            <span>Deseándote lo mejor en tu día especial</span>
            <span className="text-sm">💐</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
