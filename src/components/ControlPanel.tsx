import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Volume2, VolumeX, Play, Pause, Minus, Plus } from 'lucide-react';

interface ControlPanelProps {
  timer: number;
  gameStarted: boolean;
  soundEnabled: boolean;
  level: number;
  score: number;
  onToggleGame: () => void;
  onToggleSound: () => void;
  onLevelChange: (direction: 'up' | 'down') => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  timer,
  gameStarted,
  soundEnabled,
  level,
  score,
  onToggleGame,
  onToggleSound,
  onLevelChange
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-panel-bg p-6 rounded-xl border-2 border-panel-border shadow-2xl">
      {/* Brand Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold font-title text-white tracking-wider">
          KANOODLE
        </h1>
        <p className="text-sm font-title text-muted-foreground">ULTIMATE CHAMPION</p>
      </div>

      {/* Digital Display */}
      <div className="bg-display-bg p-4 rounded-lg border-2 border-green-600 mb-6">
        <div className="text-center">
          <div className="text-2xl font-mono text-display-text mb-2">
            {formatTime(timer)}
          </div>
          <div className="flex justify-between text-sm text-display-text/80">
            <span>Level: {level}</span>
            <span>Score: {score}</span>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center gap-3">
        {/* Sound Button */}
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "w-12 h-12 rounded-full border-2 transition-all duration-200",
            "bg-piece-red border-piece-red text-white hover:bg-piece-red/80",
            "shadow-lg hover:shadow-xl hover:scale-105"
          )}
          onClick={onToggleSound}
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </Button>

        {/* Play/Pause Button */}
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "w-12 h-12 rounded-full border-2 transition-all duration-200",
            "bg-piece-green border-piece-green text-white hover:bg-piece-green/80",
            "shadow-lg hover:shadow-xl hover:scale-105"
          )}
          onClick={onToggleGame}
        >
          {gameStarted ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </Button>

        {/* Level Down Button */}
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "w-12 h-12 rounded-full border-2 transition-all duration-200",
            "bg-piece-cyan border-piece-cyan text-white hover:bg-piece-cyan/80",
            "shadow-lg hover:shadow-xl hover:scale-105"
          )}
          onClick={() => onLevelChange('down')}
          disabled={level <= 1}
        >
          <Minus className="w-5 h-5" />
        </Button>

        {/* Level Up Button */}
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "w-12 h-12 rounded-full border-2 transition-all duration-200",
            "bg-piece-yellow border-piece-yellow text-black hover:bg-piece-yellow/80",
            "shadow-lg hover:shadow-xl hover:scale-105"
          )}
          onClick={() => onLevelChange('up')}
          disabled={level >= 10}
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};