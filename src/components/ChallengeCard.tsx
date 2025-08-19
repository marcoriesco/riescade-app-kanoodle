import React from 'react';
import { cn } from '@/lib/utils';

interface ChallengeCardProps {
  level: number;
}

// Configurações de desafio por nível (exemplo)
const CHALLENGE_CONFIGS = {
  1: {
    greenPins: [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }],
    orangePins: [{ x: 4, y: 3 }, { x: 5, y: 3 }, { x: 4, y: 4 }, { x: 5, y: 4 }]
  },
  2: {
    greenPins: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 2, y: 1 }],
    orangePins: [{ x: 3, y: 4 }, { x: 4, y: 4 }, { x: 3, y: 5 }]
  },
  3: {
    greenPins: [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 2 }],
    orangePins: [{ x: 4, y: 2 }, { x: 5, y: 2 }, { x: 4, y: 3 }]
  }
};

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ level }) => {
  const config = CHALLENGE_CONFIGS[level as keyof typeof CHALLENGE_CONFIGS] || CHALLENGE_CONFIGS[1];
  
  // Grid 6x8 para corresponder ao tabuleiro
  const GRID_COLS = 6;
  const GRID_ROWS = 8;
  
  const renderPin = (x: number, y: number, color: 'green' | 'orange', key: string) => {
    const pinSize = 20; // Menor que as cavidades do tabuleiro
    const spacing = 28; // Mesmo espaçamento do tabuleiro
    
    return (
      <div
        key={key}
        className={cn(
          "absolute rounded-full transition-all duration-200",
          "border border-white/20",
          color === 'green' ? "bg-pin-green" : "bg-pin-orange"
        )}
        style={{
          width: `${pinSize}px`,
          height: `${pinSize}px`,
          left: `${x * spacing + 16}px`, // 16px de margem interna
          top: `${y * spacing + 16}px`,
          boxShadow: `0 2px 6px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)`
        }}
      />
    );
  };
  
  return (
    <div className="relative z-10 -ml-6"> {/* Sobreposição parcial */}
      <div 
        className="bg-card-bg border-2 border-hud-border rounded-3xl p-6 relative kanoodle-challenge-card"
        style={{
          boxShadow: 'var(--shadow-strong)',
          width: '280px',
          height: '400px'
        }}
      >
        {/* Cabeçalho */}
        <div className="text-center mb-4">
          <h3 className="text-lg font-bold text-hud-text mb-2">
            DESAFIO {level}
          </h3>
          
          {/* Linha divisória */}
          <div 
            className="w-full h-px bg-card-divider opacity-60 mb-4"
            style={{ marginTop: '20%' }}
          />
        </div>
        
        {/* Área de pinos */}
        <div className="relative" style={{ height: '280px' }}>
          {/* Pinos verdes (área superior) */}
          {config.greenPins.map((pin, index) => 
            renderPin(pin.x, pin.y, 'green', `green-${index}`)
          )}
          
          {/* Pinos laranja (área inferior) */}
          {config.orangePins.map((pin, index) => 
            renderPin(pin.x, pin.y + 4, 'orange', `orange-${index}`) // Offset para área inferior
          )}
        </div>
        
        {/* Indicador de nível */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="flex gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-200",
                  i < level ? "bg-hover-glow" : "bg-hud-border"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};