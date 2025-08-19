import React from "react";
import { GamePiece } from "@/types/game";
import { GamePiece as GamePieceComponent } from "./GamePiece";
import { cn } from "@/lib/utils";

interface PieceSelectorProps {
  pieces: GamePiece[];
  selectedPiece: GamePiece | null;
  onSelectPiece: (piece: GamePiece) => void;
  onRotatePiece: (piece: GamePiece) => void;
}

export const PieceSelector: React.FC<PieceSelectorProps> = ({
  pieces,
  selectedPiece,
  onSelectPiece,
  onRotatePiece,
}) => {
  const availablePieces = pieces.filter((piece) => !piece.isPlaced);

  if (availablePieces.length === 0) {
    return (
      <div className="bg-panel-bg p-6 rounded-xl border-2 border-panel-border shadow-2xl">
        <div className="text-center text-piece-green text-xl font-bold">
          🎉 Parabéns! 🎉
          <br />
          <span className="text-sm text-muted-foreground">
            Todas as peças foram encaixadas!
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-panel-bg p-6 border-2 border-board-border rounded-2xl shadow-2xl w-full"
      style={{
        backgroundColor: "#21211f",
        borderLeft: 0,
        borderRadius: "0 1rem 1rem 0",
      }}
    >
      <h3 className="text-lg font-semibold text-white mb-2 text-center">
        Peças Disponíveis
      </h3>

      <div className="mb-6 text-xs text-muted-foreground text-center">
        <p>Clique para selecionar</p>
        <p>Clique direito para rotacionar</p>
      </div>

      <div className="grid grid-cols-1 p-4 gap-4 max-h-96 overflow-y-auto">
        {availablePieces.map((piece) => {
          const isSelected = selectedPiece?.id === piece.id;
          return (
            <div
              key={piece.id}
              className={cn(
                "flex justify-center items-center p-2 rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors",
                isSelected &&
                  "ring-2 ring-hover-glow shadow-lg shadow-hover-glow/30"
              )}
            >
              <GamePieceComponent
                piece={piece}
                isSelected={isSelected}
                onSelect={onSelectPiece}
                onRotate={onRotatePiece}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
