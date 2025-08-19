import React from 'react';
import { GamePiece as GamePieceType, PieceColor } from '@/types/game';
import { cn } from '@/lib/utils';

interface GamePieceProps {
  piece: GamePieceType;
  isSelected: boolean;
  onSelect: (piece: GamePieceType) => void;
  onRotate: (piece: GamePieceType) => void;
}

const PIECE_COLOR_MAP: Record<PieceColor, string> = {
  red: 'piece-red',
  orange: 'piece-orange',
  yellow: 'piece-yellow',
  green: 'piece-green',
  cyan: 'piece-cyan',
  blue: 'piece-blue',
  purple: 'piece-purple',
  pink: 'piece-pink',
  white: 'piece-white',
  gray: 'piece-gray'
};

export const GamePiece: React.FC<GamePieceProps> = ({
  piece,
  isSelected,
  onSelect,
  onRotate
}) => {
  if (piece.isPlaced) return null;

  const handleClick = () => {
    onSelect(piece);
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onRotate(piece);
  };

  // Calculate bounding box for the piece
  const minX = Math.min(...piece.shape.positions.map(p => p.x));
  const maxX = Math.max(...piece.shape.positions.map(p => p.x));
  const minY = Math.min(...piece.shape.positions.map(p => p.y));
  const maxY = Math.max(...piece.shape.positions.map(p => p.y));
  
  const width = maxX - minX + 1;
  const height = maxY - minY + 1;

  return (
    <div 
      className={cn(
        "relative cursor-pointer transition-all duration-200 p-2 rounded-lg",
        "hover:scale-105 hover:shadow-lg",
        isSelected && "ring-2 ring-hover-glow shadow-lg shadow-hover-glow/30 scale-105"
      )}
      onClick={handleClick}
      onContextMenu={handleRightClick}
      style={{ 
        width: `${width * 24 + 16}px`, 
        height: `${height * 24 + 16}px` 
      }}
    >
      <div className="relative w-full h-full">
        {piece.shape.positions.map((pos, index) => (
          <div
            key={index}
            className={cn(
              "absolute w-5 h-5 rounded-full transition-all duration-200",
              "shadow-lg border-2 border-white/20",
              `bg-${PIECE_COLOR_MAP[piece.color]}`,
              "hover:scale-110"
            )}
            style={{
              left: `${(pos.x - minX) * 24}px`,
              top: `${(pos.y - minY) * 24}px`,
              boxShadow: `0 2px 8px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.2)`
            }}
          />
        ))}
      </div>
      
      {/* Rotation indicator */}
      {piece.rotation > 0 && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-hover-glow rounded-full text-xs flex items-center justify-center text-black font-bold">
          {piece.rotation / 90}
        </div>
      )}
    </div>
  );
};