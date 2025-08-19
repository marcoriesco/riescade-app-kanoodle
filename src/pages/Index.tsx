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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white mb-2">
            Kanoodle Puzzle Game
          </h1>
          <p className="text-muted-foreground">
            Encaixe todas as peças no tabuleiro sem deixar espaços vazios
          </p>
        </div>

        {/* Game Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Panel - Control Panel */}
          <div className="lg:col-span-1">
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

          {/* Center - Game Board */}
          <div className="lg:col-span-1 flex justify-center">
            <GameBoard
              board={gameState.board}
              hoveredPosition={gameState.hoveredPosition}
              selectedPiece={gameState.selectedPiece}
              isValidDrop={gameState.isValidDrop}
              onCellHover={handleCellHover}
              onDrop={placePiece}
            />
          </div>

          {/* Right Panel - Piece Selector */}
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
