import React from "react";
import { BoardCell, Position, GamePiece } from "@/types/game";
import { cn } from "@/lib/utils";

interface GameBoardProps {
  board: BoardCell[][];
  hoveredPosition: Position | null;
  selectedPiece: GamePiece | null;
  isValidDrop: boolean;
  onCellHover: (position: Position | null) => void;
  onDrop: (position: Position) => void;
}

const BOARD_ROWS = 11;
const BOARD_COLS = 5;

export const GameBoard: React.FC<GameBoardProps> = ({
  board,
  hoveredPosition,
  selectedPiece,
  isValidDrop,
  onCellHover,
  onDrop,
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

    return selectedPiece.shape.positions
      .map((pos) => ({
        x: hoveredPosition.x + pos.x,
        y: hoveredPosition.y + pos.y,
      }))
      .filter(
        (pos) =>
          pos.x >= 0 && pos.x < BOARD_COLS && pos.y >= 0 && pos.y < BOARD_ROWS
      );
  };

  const previewPositions = getPreviewPositions();

  const isPreviewPosition = (x: number, y: number): boolean => {
    return previewPositions.some((pos) => pos.x === x && pos.y === y);
  };

  return (
    <div className="relative z-30">
      {" "}
      {/* Primeiro plano */}
      <div
        className="bg-board-bg border-2 border-board-border p-5 relative kanoodle-board"
        style={{
          boxShadow: "var(--shadow-strong)",
          width: "100%",
          borderRight: 0,
          borderRadius: "1rem 0 1rem 1rem",
        }}
      >
        <div className="grid grid-cols-5 place-items-center gap-2 h-full items-center justify-center">
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
                  "w-12 h-12 rounded-full transition-all duration-200 cursor-pointer",
                  "flex items-center justify-center relative",
                  isOccupied
                    ? "bg-muted border-2 border-muted-foreground"
                    : "bg-board-hole border-4 border-board-border hover:border-hover-glow/50",
                  isPreview &&
                    (isValidDrop
                      ? "bg-valid-drop/40 border-valid-drop shadow-lg shadow-valid-drop/40"
                      : "bg-invalid-drop/40 border-invalid-drop shadow-lg shadow-invalid-drop/40")
                )}
                style={{
                  boxShadow: isOccupied
                    ? "none"
                    : "var(--inner-shadow), inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
                onMouseEnter={() => handleMouseEnter(x, y)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(x, y)}
              >
                {isOccupied && (
                  <div
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-white/90 to-gray-300 shadow-inner border border-white/20"
                    style={{
                      boxShadow:
                        "0 1px 3px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4)",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
