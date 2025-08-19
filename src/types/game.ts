export type PieceColor = 'red' | 'orange' | 'yellow' | 'green' | 'cyan' | 'blue' | 'purple' | 'pink' | 'white' | 'gray';

export interface Position {
  x: number;
  y: number;
}

export interface PieceShape {
  positions: Position[];
}

export interface GamePiece {
  id: string;
  color: PieceColor;
  shape: PieceShape;
  rotation: number;
  isPlaced: boolean;
}

export interface BoardCell {
  x: number;
  y: number;
  isOccupied: boolean;
  pieceId?: string;
}

export interface GameState {
  pieces: GamePiece[];
  board: BoardCell[][];
  selectedPiece: GamePiece | null;
  hoveredPosition: Position | null;
  isValidDrop: boolean;
  gameStarted: boolean;
  gameCompleted: boolean;
  timer: number;
  level: number;
  score: number;
  soundEnabled: boolean;
}

export interface Challenge {
  id: string;
  name: string;
  difficulty: number;
  preplacedPieces: {
    pieceId: string;
    position: Position;
    rotation: number;
  }[];
}