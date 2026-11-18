"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Music, Volume2, Sparkles } from "lucide-react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Web Audio Synth backup if no external mp3 is found
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthTimerRef = useRef<number | null>(null);

  const melodyNotes = [
    261.63, 329.63, 392.0, 523.25,
    220.0,  261.63, 329.63, 440.0,
    174.61, 220.0,  261.63, 349.23,
    196.0,  246.94, 293.66, 392.0,
  ];

  const playSynthNote = (freq: number) => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.5);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 1.6);
  };

  const startSynthLoop = () => {
    let noteIndex = 0;
    const interval = window.setInterval(() => {
      const note = melodyNotes[noteIndex % melodyNotes.length];
      playSynthNote(note);
      if (noteIndex % 2 === 0) {
        setTimeout(() => playSynthNote(note * 1.5), 180);
      }
      noteIndex++;
    }, 450);
    synthTimerRef.current = interval;
  };

  const stopSynthLoop = () => {
    if (synthTimerRef.current !== null) {
      clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }
  };

  const startAudio = useCallback(async () => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.35; // Moderate gentle volume
      try {
        await audio.play();
        setIsPlaying(true);
        return;
      } catch {
        // MP3 autoplay blocked or missing
      }
    }
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (isPlaying) {
      if (audio) audio.pause();
      stopSynthLoop();
      setIsPlaying(false);
    } else {
      if (audio) {
        audio.volume = 0.35;
        try {
          await audio.play();
          setIsPlaying(true);
          return;
        } catch {
          // Fall back to delicate synth
        }
      }
      startSynthLoop();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    // Attempt automatic start
    startAudio();

    // Browser policy fallback: Start music on user's first touch/click
    const handleFirstTouch = () => {
      startAudio();
      window.removeEventListener("click", handleFirstTouch);
      window.removeEventListener("touchstart", handleFirstTouch);
    };

    window.addEventListener("click", handleFirstTouch, { once: true });
    window.addEventListener("touchstart", handleFirstTouch, { once: true });

    return () => {
      stopSynthLoop();
      window.removeEventListener("click", handleFirstTouch);
      window.removeEventListener("touchstart", handleFirstTouch);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [startAudio]);

  return (
    <div className="fixed bottom-4 right-4 z-30">
      {/* Supports both /musica.mp3 and /romantic-music.mp3 */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src="/musica.mp3" type="audio/mpeg" />
        <source src="/romantic-music.mp3" type="audio/mpeg" />
      </audio>

      <button
        onClick={toggleMusic}
        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-xl border-2 transition-all duration-300 ${
          isPlaying
            ? "bg-gradient-to-r from-[#A855F7] to-[#EC4899] text-white border-white shadow-[0_0_25px_rgba(168,85,247,0.7)] animate-pulse"
            : "bg-black/75 backdrop-blur-md text-purple-200 border-[#A855F7]/60 hover:border-[#A855F7] hover:bg-black/90 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
        }`}
        title="Música de fondo"
      >
        {isPlaying ? (
          <>
            <div className="flex items-end gap-1 h-3.5 w-3.5">
              <span className="w-1 bg-white h-full animate-[bounce_1s_infinite_100ms] rounded-full" />
              <span className="w-1 bg-white h-2/3 animate-[bounce_1s_infinite_300ms] rounded-full" />
              <span className="w-1 bg-white h-5/6 animate-[bounce_1s_infinite_200ms] rounded-full" />
            </div>
            <span>Pausar música</span>
            <Volume2 className="w-4 h-4" />
          </>
        ) : (
          <>
            <Music className="w-4 h-4 text-purple-400" />
            <span>Poner música</span>
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
          </>
        )}
      </button>
    </div>
  );
}
