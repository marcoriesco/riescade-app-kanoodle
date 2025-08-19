import { useState, useCallback, useEffect } from 'react';
import { GameState, GamePiece, Position, BoardCell } from '@/types/game';
import { createGamePieces, rotatePiece } from '@/data/pieces';
import { useToast } from '@/hooks/use-toast';

const BOARD_ROWS = 11;
const BOARD_COLS = 5;

const createEmptyBoard = (): BoardCell[][] => {
  return Array.from({ length: BOARD_ROWS }, (_, y) =>
    Array.from({ length: BOARD_COLS }, (_, x) => ({
      x,
      y,
      isOccupied: false
    }))
  );
};

export const useGameLogic = () => {
  const { toast } = useToast();
  
  const [gameState, setGameState] = useState<GameState>({
    pieces: createGamePieces(),
    board: createEmptyBoard(),
    selectedPiece: null,
    hoveredPosition: null,
    isValidDrop: false,
    gameStarted: false,
    gameCompleted: false,
    timer: 0,
    level: 1,
    score: 0,
    soundEnabled: true
  });

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gameState.gameStarted && !gameState.gameCompleted) {
      interval = setInterval(() => {
        setGameState(prev => ({ ...prev, timer: prev.timer + 1 }));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameState.gameStarted, gameState.gameCompleted]);

  const canPlacePiece = useCallback((piece: GamePiece, position: Position): boolean => {
    return piece.shape.positions.every(pos => {
      const boardX = position.x + pos.x;
      const boardY = position.y + pos.y;
      
      if (boardX < 0 || boardX >= BOARD_COLS || boardY < 0 || boardY >= BOARD_ROWS) {
        return false;
      }
      
      return !gameState.board[boardY][boardX].isOccupied;
    });
  }, [gameState.board]);

  const selectPiece = useCallback((piece: GamePiece) => {
    setGameState(prev => ({
      ...prev,
      selectedPiece: prev.selectedPiece?.id === piece.id ? null : piece
    }));
  }, []);

  const rotatePieceHandler = useCallback((piece: GamePiece) => {
    const rotatedPiece = rotatePiece(piece);
    
    setGameState(prev => ({
      ...prev,
      pieces: prev.pieces.map(p => p.id === piece.id ? rotatedPiece : p),
      selectedPiece: prev.selectedPiece?.id === piece.id ? rotatedPiece : prev.selectedPiece
    }));
  }, []);

  const handleCellHover = useCallback((position: Position | null) => {
    setGameState(prev => {
      const isValid = position && prev.selectedPiece 
        ? canPlacePiece(prev.selectedPiece, position)
        : false;
      
      return {
        ...prev,
        hoveredPosition: position,
        isValidDrop: isValid
      };
    });
  }, [canPlacePiece]);

  const placePiece = useCallback((position: Position) => {
    if (!gameState.selectedPiece || !canPlacePiece(gameState.selectedPiece, position)) {
      toast({
        title: "Movimento inválido",
        description: "Esta peça não pode ser colocada nesta posição.",
        variant: "destructive"
      });
      return;
    }

    const newBoard = gameState.board.map(row => [...row]);
    
    gameState.selectedPiece.shape.positions.forEach(pos => {
      const boardX = position.x + pos.x;
      const boardY = position.y + pos.y;
      newBoard[boardY][boardX] = {
        ...newBoard[boardY][boardX],
        isOccupied: true,
        pieceId: gameState.selectedPiece!.id
      };
    });

    const updatedPieces = gameState.pieces.map(p =>
      p.id === gameState.selectedPiece!.id ? { ...p, isPlaced: true } : p
    );

    const isCompleted = updatedPieces.every(piece => piece.isPlaced);
    const scoreBonus = isCompleted ? Math.max(1000 - gameState.timer * 10, 100) : 50;

    setGameState(prev => ({
      ...prev,
      board: newBoard,
      pieces: updatedPieces,
      selectedPiece: null,
      hoveredPosition: null,
      isValidDrop: false,
      gameCompleted: isCompleted,
      score: prev.score + scoreBonus
    }));

    if (isCompleted) {
      toast({
        title: "Parabéns! 🎉",
        description: `Nível completado! Pontuação: +${scoreBonus}`,
      });
    } else {
      toast({
        title: "Peça encaixada!",
        description: `+${scoreBonus} pontos`,
      });
    }
  }, [gameState, canPlacePiece, toast]);

  const toggleGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      gameStarted: !prev.gameStarted
    }));
  }, []);

  const toggleSound = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      soundEnabled: !prev.soundEnabled
    }));
  }, []);

  const changeLevelHandler = useCallback((direction: 'up' | 'down') => {
    setGameState(prev => {
      const newLevel = direction === 'up' 
        ? Math.min(prev.level + 1, 10)
        : Math.max(prev.level - 1, 1);
      
      if (newLevel !== prev.level) {
        return {
          ...prev,
          level: newLevel,
          pieces: createGamePieces(),
          board: createEmptyBoard(),
          selectedPiece: null,
          hoveredPosition: null,
          isValidDrop: false,
          gameCompleted: false,
          timer: 0
        };
      }
      
      return prev;
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      pieces: createGamePieces(),
      board: createEmptyBoard(),
      selectedPiece: null,
      hoveredPosition: null,
      isValidDrop: false,
      gameCompleted: false,
      gameStarted: false,
      timer: 0
    }));
  }, []);

  return {
    gameState,
    selectPiece,
    rotatePieceHandler,
    handleCellHover,
    placePiece,
    toggleGame,
    toggleSound,
    changeLevelHandler,
    resetGame
  };
};