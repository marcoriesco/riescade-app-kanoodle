import React from "react";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Minus,
  Plus,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HUDProps {
  timer: number;
  gameStarted: boolean;
  soundEnabled: boolean;
  level: number;
  score: number;
  onToggleGame: () => void;
  onToggleSound: () => void;
  onLevelChange: (delta: number) => void;
  onReload: () => void;
}

export const HUD: React.FC<HUDProps> = ({
  timer,
  gameStarted,
  soundEnabled,
  level,
  onToggleGame,
  onToggleSound,
  onLevelChange,
  onReload,
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="w-full mx-auto relative z-20">
      <div
        className="bg-hud-bg border-2 border-hud-border rounded-2xl p-6 relative kanoodle-hud"
        style={{
          boxShadow: "var(--shadow-soft)",
          background: "linear-gradient(135deg, var(--hud-bg) 0%, #1A1C1E 100%)",
        }}
      >
        {/* Topo: Logo e Subtítulo (tamanhos equivalentes ao SVG) */}
        <div className="text-center mb-4 kanoodle-hud-top">
          <h1 className="text-5xl font-black text-hud-text tracking-wider">
            KANOODLE
          </h1>
          <p className="text-xl text-hud-subtitle mt-1 mb-8">
            ULTIMATE 🏆 CHAMPION
          </p>
        </div>

        {/* Meio: Display LCD e Botões (idêntico ao SVG) */}
        <div className="flex items-center justify-center gap-8 kanoodle-hud-bottom">
          {/* Display LCD à esquerda com dimensões do SVG (200x60) */}
          <div className="flex-shrink-0">
            <div
              className="rounded-lg relative flex items-center justify-center"
              style={{
                width: 200,
                height: 60,
                backgroundColor: "hsl(var(--lcd-bg))",
                border: "2px solid hsl(var(--lcd-text))",
                boxShadow:
                  "var(--inner-shadow), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              <div
                className="font-mono font-bold text-lcd-text tracking-wider"
                style={{ fontSize: 36 }}
              >
                {formatTime(timer)}
              </div>
              <div className="absolute inset-1 border border-black/10 rounded pointer-events-none" />
            </div>
          </div>

          {/* Botões */}
          <div className="flex items-center gap-4">
            {/* Botão Mute/Sound (vermelho) */}
            <button
              onClick={onToggleSound}
              className={cn(
                "rounded-full border-2 border-white/20 transition-all duration-200",
                "flex items-center justify-center text-white hover:scale-105",
                "focus:outline-none focus:ring-2 focus:ring-hover-glow/50"
              )}
              style={{
                width: 60,
                height: 60,
                backgroundColor: `hsl(var(--btn-red))`,
                boxShadow: soundEnabled
                  ? "0 0 12px hsla(var(--btn-red), 0.4)"
                  : "none",
              }}
              aria-label={soundEnabled ? "Som ligado" : "Som desligado"}
            >
              {soundEnabled ? <Volume2 size={22} /> : <VolumeX size={22} />}
            </button>

            {/* Botão Play/Pause (verde) */}
            <button
              onClick={onToggleGame}
              className={cn(
                "rounded-full border-2 border-white/20 transition-all duration-200",
                "flex items-center justify-center text-white hover:scale-105",
                "focus:outline-none focus:ring-2 focus:ring-hover-glow/50"
              )}
              style={{
                width: 60,
                height: 60,
                backgroundColor: `hsl(var(--btn-green))`,
                boxShadow: gameStarted
                  ? "0 0 12px hsla(var(--btn-green), 0.4)"
                  : "none",
              }}
              aria-label={gameStarted ? "Pausar" : "Jogar"}
            >
              {gameStarted ? <Pause size={22} /> : <Play size={22} />}
            </button>

            {/* Botão Menos (azul) */}
            {/* <button
              onClick={() => onLevelChange(-1)}
              className={cn(
                "rounded-full border-2 border-white/20 transition-all duration-200",
                "flex items-center justify-center text-white hover:scale-105",
                "focus:outline-none focus:ring-2 focus:ring-hover-glow/50"
              )}
              style={{
                width: 60,
                height: 60,
                backgroundColor: `hsl(var(--btn-blue))`,
              }}
              aria-label="Diminuir nível"
            >
              <Minus size={22} />
            </button> */}

            {/* Botão Mais (amarelo) */}
            {/* <button
              onClick={() => onLevelChange(1)}
              className={cn(
                "rounded-full border-2 border-white/20 transition-all duration-200",
                "flex items-center justify-center text-white hover:scale-105",
                "focus:outline-none focus:ring-2 focus:ring-hover-glow/50"
              )}
              style={{
                width: 60,
                height: 60,
                backgroundColor: `hsl(var(--btn-yellow))`,
              }}
              aria-label="Aumentar nível"
            >
              <Plus size={22} />
            </button> */}

            {/* Botão Reload (neutro) */}
            <button
              onClick={onReload}
              className={cn(
                "rounded-full border-2 border-white/20 transition-all duration-200",
                "flex items-center justify-center text-white hover:scale-105",
                "focus:outline-none focus:ring-2 focus:ring-hover-glow/50"
              )}
              style={{
                width: 60,
                height: 60,
                backgroundColor: "rgba(255,255,255,0.08)",
              }}
              aria-label="Reiniciar jogo"
            >
              <RotateCcw size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
