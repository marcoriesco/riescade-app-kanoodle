import React from "react";
import { GameBoard } from "@/components/GameBoard";
import { HUD } from "@/components/HUD";
import { PieceSelector } from "@/components/PieceSelector";
import { useGameLogic } from "@/hooks/useGameLogic";

const Index = () => {
  const {
    gameState,
    selectPiece,
    rotatePieceHandler,
    handleCellHover,
    placePiece,
    toggleGame,
    toggleSound,
    changeLevelHandler,
    resetGame,
  } = useGameLogic();

  return (
    <div
      className="min-h-screen relative overflow-hidden kanoodle-container"
      style={{
        background: "var(--canvas-bg)",
        padding: "24px",
      }}
    >
      <div className="max-w-7xl mx-auto relative">
        {/* HUD Eletrônico (Topo) */}
        <div className="mb-6 flex justify-center">
          <HUD
            timer={gameState.timer}
            gameStarted={gameState.gameStarted}
            soundEnabled={gameState.soundEnabled}
            level={gameState.level}
            score={gameState.score}
            onToggleGame={toggleGame}
            onToggleSound={toggleSound}
            onLevelChange={(delta) =>
              changeLevelHandler(delta > 0 ? "up" : "down")
            }
            onReload={resetGame}
          />
        </div>

        {/* Área Principal: Tabuleiro + Seletor de Peças */}
        <div className="flex items-start justify-center gap-4 w-full max-w-2xl mx-auto kanoodle-main-area ">
          {/* Tabuleiro Principal (Esquerda, Primeiro Plano) */}
          <div className="relative">
            <GameBoard
              board={gameState.board}
              hoveredPosition={gameState.hoveredPosition}
              selectedPiece={gameState.selectedPiece}
              isValidDrop={gameState.isValidDrop}
              onCellHover={handleCellHover}
              onDrop={placePiece}
            />
          </div>

          {/* Seletor de Peças (Direita) */}
          <div className="relative">
            <PieceSelector
              pieces={gameState.pieces}
              selectedPiece={gameState.selectedPiece}
              onSelectPiece={selectPiece}
              onRotatePiece={rotatePieceHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
