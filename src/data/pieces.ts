import { GamePiece, PieceColor } from "@/types/game";

// Define piece shapes based on the reference images
export const PIECE_SHAPES = {
  // L-shaped pieces
  L_RED: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 0, y: 1 }
  ],
  
  // Straight pieces
  STRAIGHT_ORANGE: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 }
  ],
  
  // T-shaped pieces
  T_YELLOW: [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 }
  ],
  
  // Z-shaped pieces
  Z_GREEN: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 1 }
  ],
  
  // Small L pieces
  SMALL_L_CYAN: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 }
  ],
  
  // Corner pieces
  CORNER_BLUE: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: 2 }
  ],
  
  // Plus shapes
  PLUS_PURPLE: [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 1, y: 2 }
  ],
  
  // V-shaped pieces
  V_PINK: [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 1, y: 2 }
  ],
  
  // Single dots
  DOT_WHITE: [
    { x: 0, y: 0 }
  ],
  
  // Double dots
  DOUBLE_GRAY: [
    { x: 0, y: 0 },
    { x: 1, y: 0 }
  ]
};

export const createGamePieces = (): GamePiece[] => {
  const pieces: GamePiece[] = [
    {
      id: 'piece-1',
      color: 'red',
      shape: { positions: PIECE_SHAPES.L_RED },
      rotation: 0,
      isPlaced: false
    },
    {
      id: 'piece-2',
      color: 'orange',
      shape: { positions: PIECE_SHAPES.STRAIGHT_ORANGE },
      rotation: 0,
      isPlaced: false
    },
    {
      id: 'piece-3',
      color: 'yellow',
      shape: { positions: PIECE_SHAPES.T_YELLOW },
      rotation: 0,
      isPlaced: false
    },
    {
      id: 'piece-4',
      color: 'green',
      shape: { positions: PIECE_SHAPES.Z_GREEN },
      rotation: 0,
      isPlaced: false
    },
    {
      id: 'piece-5',
      color: 'cyan',
      shape: { positions: PIECE_SHAPES.SMALL_L_CYAN },
      rotation: 0,
      isPlaced: false
    },
    {
      id: 'piece-6',
      color: 'blue',
      shape: { positions: PIECE_SHAPES.CORNER_BLUE },
      rotation: 0,
      isPlaced: false
    },
    {
      id: 'piece-7',
      color: 'purple',
      shape: { positions: PIECE_SHAPES.PLUS_PURPLE },
      rotation: 0,
      isPlaced: false
    },
    {
      id: 'piece-8',
      color: 'pink',
      shape: { positions: PIECE_SHAPES.V_PINK },
      rotation: 0,
      isPlaced: false
    },
    {
      id: 'piece-9',
      color: 'white',
      shape: { positions: PIECE_SHAPES.DOT_WHITE },
      rotation: 0,
      isPlaced: false
    },
    {
      id: 'piece-10',
      color: 'gray',
      shape: { positions: PIECE_SHAPES.DOUBLE_GRAY },
      rotation: 0,
      isPlaced: false
    }
  ];

  return pieces;
};

export const rotatePiece = (piece: GamePiece): GamePiece => {
  const rotatedPositions = piece.shape.positions.map(pos => ({
    x: -pos.y,
    y: pos.x
  }));
  
  return {
    ...piece,
    shape: { positions: rotatedPositions },
    rotation: (piece.rotation + 90) % 360
  };
};