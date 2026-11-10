"use client";

import React, { useState, useRef, useEffect } from "react";
import { Music, Volume2, VolumeX, Sparkles } from "lucide-react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Web Audio Synth backup if no external mp3 is found
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthTimerRef = useRef<number | null>(null);

  // Soft romantic music box melody chords (frequencies in Hz: C, G, Am, F)
  const melodyNotes = [
    261.63, 329.63, 392.0, 523.25, // C chord arpeggio
    220.0,  261.63, 329.63, 440.0, // Am
    174.61, 220.0,  261.63, 349.23, // F
    196.0,  246.94, 293.66, 392.0, // G
  ];

  const playSynthNote = (freq: number) => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Warm music box envelope
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.6);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 1.7);
  };

  const startSynthLoop = () => {
    let noteIndex = 0;
    const interval = window.setInterval(() => {
      const note = melodyNotes[noteIndex % melodyNotes.length];
      playSynthNote(note);
      // add a delicate higher octave twinkle occasionally
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

  const toggleMusic = async () => {
    if (isPlaying) {
      // Pause
      if (audioRef.current && !audioError) {
        audioRef.current.pause();
      }
      stopSynthLoop();
      setIsPlaying(false);
    } else {
      // Try playing audio file first
      if (audioRef.current && !audioError) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          return;
        } catch {
          // If mp3 fails or doesn't exist, fall back to magical synthesized music box!
          setAudioError(true);
        }
      }
      // Fallback synth
      startSynthLoop();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      stopSynthLoop();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Hidden audio element pointing to optional user mp3 */}
      <audio
        ref={audioRef}
        src="/romantic-music.mp3"
        loop
        onError={() => setAudioError(true)}
      />

      <button
        onClick={toggleMusic}
        className={`flex items-center gap-2.5 px-4 py-3 rounded-full text-xs sm:text-sm font-bold shadow-xl border-2 transition-all duration-300 ${
          isPlaying
            ? "bg-gradient-to-r from-[#A855F7] to-[#EC4899] text-white border-white shadow-[0_0_25px_rgba(168,85,247,0.7)] animate-pulse"
            : "bg-black/70 backdrop-blur-md text-purple-200 border-[#A855F7]/60 hover:border-[#A855F7] hover:bg-black/90 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
        }`}
        title="Música romántica de fondo"
      >
        {isPlaying ? (
          <>
            <div className="flex items-end gap-1 h-4 w-4">
              <span className="w-1 bg-white h-full animate-[bounce_1s_infinite_100ms] rounded-full" />
              <span className="w-1 bg-white h-2/3 animate-[bounce_1s_infinite_300ms] rounded-full" />
              <span className="w-1 bg-white h-5/6 animate-[bounce_1s_infinite_200ms] rounded-full" />
            </div>
            <span>Música activa 💜</span>
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
