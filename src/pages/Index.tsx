import React from 'react';
import { GameBoard } from '@/components/GameBoard';
import { ControlPanel } from '@/components/ControlPanel';
import { PieceSelector } from '@/components/PieceSelector';
import { useGameLogic } from '@/hooks/useGameLogic';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

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
    resetGame
  } = useGameLogic();

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Top Section - Control Panel */}
        <div className="flex justify-center mb-8">
          <ControlPanel
            timer={gameState.timer}
            gameStarted={gameState.gameStarted}
            soundEnabled={gameState.soundEnabled}
            level={gameState.level}
            score={gameState.score}
            onToggleGame={toggleGame}
            onToggleSound={toggleSound}
            onLevelChange={changeLevelHandler}
          />
        </div>

        {/* Bottom Section - Game Board and Pieces */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          {/* Main Game Board - Takes up 3/4 of the width */}
          <div className="lg:col-span-3 flex justify-center">
            <GameBoard
              board={gameState.board}
              hoveredPosition={gameState.hoveredPosition}
              selectedPiece={gameState.selectedPiece}
              isValidDrop={gameState.isValidDrop}
              onCellHover={handleCellHover}
              onDrop={placePiece}
            />
          </div>

          {/* Right Side - Piece Selector - Takes up 1/4 of the width */}
          <div className="lg:col-span-1">
            <PieceSelector
              pieces={gameState.pieces}
              selectedPiece={gameState.selectedPiece}
              onSelectPiece={selectPiece}
              onRotatePiece={rotatePieceHandler}
            />
          </div>
        </div>

        {/* Footer Controls */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={resetGame}
            className="bg-panel-bg border-panel-border text-white hover:bg-panel-border"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reiniciar Jogo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
