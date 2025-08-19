import React from 'react';
import { BoardCell, Position, GamePiece } from '@/types/game';
import { cn } from '@/lib/utils';

interface GameBoardProps {
  board: BoardCell[][];
  hoveredPosition: Position | null;
  selectedPiece: GamePiece | null;
  isValidDrop: boolean;
  onCellHover: (position: Position | null) => void;
  onDrop: (position: Position) => void;
}

const BOARD_ROWS = 8;
const BOARD_COLS = 10;

export const GameBoard: React.FC<GameBoardProps> = ({
  board,
  hoveredPosition,
  selectedPiece,
  isValidDrop,
  onCellHover,
  onDrop
}) => {
  const handleMouseEnter = (x: number, y: number) => {
    onCellHover({ x, y });
  };

  const handleMouseLeave = () => {
    onCellHover(null);
  };

  const handleClick = (x: number, y: number) => {
    if (selectedPiece && hoveredPosition) {
      onDrop({ x, y });
    }
  };

  const getPreviewPositions = (): Position[] => {
    if (!selectedPiece || !hoveredPosition) return [];
    
    return selectedPiece.shape.positions.map(pos => ({
      x: hoveredPosition.x + pos.x,
      y: hoveredPosition.y + pos.y
    })).filter(pos => 
      pos.x >= 0 && pos.x < BOARD_COLS && 
      pos.y >= 0 && pos.y < BOARD_ROWS
    );
  };

  const previewPositions = getPreviewPositions();

  const isPreviewPosition = (x: number, y: number): boolean => {
    return previewPositions.some(pos => pos.x === x && pos.y === y);
  };

  return (
    <div className="bg-board-bg p-6 rounded-xl border-2 border-board-border shadow-2xl">
      <div className="grid grid-cols-10 gap-1">
        {Array.from({ length: BOARD_ROWS * BOARD_COLS }, (_, index) => {
          const x = index % BOARD_COLS;
          const y = Math.floor(index / BOARD_COLS);
          const cell = board[y]?.[x];
          const isOccupied = cell?.isOccupied || false;
          const isPreview = isPreviewPosition(x, y);
          
          return (
            <div
              key={`${x}-${y}`}
              className={cn(
                "w-8 h-8 rounded-full border-2 transition-all duration-200 cursor-pointer",
                "flex items-center justify-center",
                isOccupied 
                  ? "bg-muted border-muted-foreground" 
                  : "bg-board-hole border-board-border hover:border-hover-glow/50",
                isPreview && (
                  isValidDrop 
                    ? "bg-valid-drop/30 border-valid-drop shadow-lg shadow-valid-drop/30" 
                    : "bg-invalid-drop/30 border-invalid-drop shadow-lg shadow-invalid-drop/30"
                )
              )}
              onMouseEnter={() => handleMouseEnter(x, y)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(x, y)}
            >
              {isOccupied && (
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-white to-gray-300 shadow-inner" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};