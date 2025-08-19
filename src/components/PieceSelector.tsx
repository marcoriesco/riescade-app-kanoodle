import React from 'react';
import { GamePiece } from '@/types/game';
import { GamePiece as GamePieceComponent } from './GamePiece';

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
  onRotatePiece
}) => {
  const availablePieces = pieces.filter(piece => !piece.isPlaced);

  if (availablePieces.length === 0) {
    return (
      <div className="bg-panel-bg p-6 rounded-xl border-2 border-panel-border shadow-2xl">
        <div className="text-center text-piece-green text-xl font-bold">
          🎉 Parabéns! 🎉
          <br />
          <span className="text-sm text-muted-foreground">Todas as peças foram encaixadas!</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-panel-bg p-6 rounded-xl border-2 border-panel-border shadow-2xl">
      <h3 className="text-lg font-semibold text-white mb-4 text-center">
        Peças Disponíveis
      </h3>
      
      <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
        {availablePieces.map(piece => (
          <div
            key={piece.id}
            className="flex justify-center items-center p-2 rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors"
          >
            <GamePieceComponent
              piece={piece}
              isSelected={selectedPiece?.id === piece.id}
              onSelect={onSelectPiece}
              onRotate={onRotatePiece}
            />
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-xs text-muted-foreground text-center">
        <p>Clique para selecionar</p>
        <p>Clique direito para rotacionar</p>
      </div>
    </div>
  );
};