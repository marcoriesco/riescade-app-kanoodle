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
      className="max-w-2xl min-h-screen relative overflow-hidden kanoodle-container"
      style={{
        padding: "24px",
        margin: "0 auto",
      }}
    >
      <div className="w-full mx-auto relative">
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
        <div className="w-full mx-auto kanoodle-main-area flex items-start">
          {/* Tabuleiro Principal (Esquerda, 50%) */}
          <div className="relative flex-[0_0_60%] max-w-[60%] w-[60%]">
            <GameBoard
              board={gameState.board}
              hoveredPosition={gameState.hoveredPosition}
              selectedPiece={gameState.selectedPiece}
              isValidDrop={gameState.isValidDrop}
              onCellHover={handleCellHover}
              onDrop={placePiece}
            />
          </div>

          {/* Seletor de Peças (Direita, 50%) */}
          <div className="relative flex-[0_0_40%] max-w-[40%] w-[40%]">
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
