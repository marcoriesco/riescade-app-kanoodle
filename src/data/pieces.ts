import { GamePiece, PieceColor } from "@/types/game";

// Define piece shapes based on the SVG reference - 12 pieces total
export const PIECE_SHAPES = {
  // Piece 1: Green snake (#7bc043) - 5 circles
  GREEN_SNAKE: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 3, y: 1 }
  ],
  
  // Piece 2: Cyan L-long (#6ec6ff) - 5 circles  
  CYAN_L_LONG: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 2, y: 1 },
    { x: 2, y: 2 }
  ],
  
  // Piece 3: Purple straight (#3f51b5) - 4 circles
  PURPLE_STRAIGHT: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 }
  ],
  
  // Piece 4: Orange T (#ff9800) - 4 circles
  ORANGE_T: [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 }
  ],
  
  // Piece 5: Gray plus (#e0e0e0) - 5 circles
  GRAY_PLUS: [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 1, y: 2 }
  ],
  
  // Piece 6: Red irregular (#f44336) - 5 circles
  RED_IRREGULAR: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 }
  ],
  
  // Piece 7: Blue L-long (#0288d1) - 5 circles
  BLUE_L_LONG: [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 0, y: 3 },
    { x: 1, y: 3 }
  ],
  
  // Piece 8: Pink W (#f8bbd0) - 5 circles
  PINK_W: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 2, y: 1 },
    { x: 3, y: 0 }
  ],
  
  // Piece 9: Yellow U (#ffeb3b) - 5 circles
  YELLOW_U: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 0, y: 2 }
  ],
  
  // Piece 10: Pink dark L-extended (#ec407a) - 5 circles
  PINK_L_EXTENDED: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: 2 },
    { x: 2, y: 1 }
  ],
  
  // Piece 11: White small L (#fafafa) - 3 circles
  WHITE_SMALL_L: [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 0, y: 1 }
  ],
  
  // Piece 12: Green light square (#8bc34a) - 4 circles
  GREEN_SQUARE: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 }
  ]
};

export const createGamePieces = (): GamePiece[] => {
  const pieces: GamePiece[] = [
    {
      id: 'piece-1',
      color: 'green',
      shape: { positions: PIECE_SHAPES.GREEN_SNAKE },
      rotation: 0,
      isPlaced: false
    },
    {
      id: 'piece-2',
      color: 'cyan',
      shape: { positions: PIECE_SHAPES.CYAN_L_LONG },
      rotation: 0,
      isPlaced: false
    },
    {
      id: 'piece-3',
      color: 'purple',
      shape: { positions: PIECE_SHAPES.PURPLE_STRAIGHT },
      rotation: 0,
      isPlaced: false
    },
    {
      id: 'piece-4',
      color: 'orange',
      shape: { positions: PIECE_SHAPES.ORANGE_T },
      rotation: 0,
      isPlaced: false
    },
    {
      id: 'piece-5',
      color: 'gray',
      shape: { positions: PIECE_SHAPES.GRAY_PLUS },
      rotation: 0,
      isPlaced: false
    },
    {
      id: 'piece-6',
      color: 'red',
      shape: { positions: PIECE_SHAPES.RED_IRREGULAR },
      rotation: 0,
      isPlaced: false
    },
    {
      id: 'piece-7',
      color: 'blue',
      shape: { positions: PIECE_SHAPES.BLUE_L_LONG },
      rotation: 0,
      isPlaced: false
    },
    {
      id: 'piece-8',
      color: 'lightPink',
      shape: { positions: PIECE_SHAPES.PINK_W },
      rotation: 0,
      isPlaced: false
    },
    {
      id: 'piece-9',
      color: 'yellow',
      shape: { positions: PIECE_SHAPES.YELLOW_U },
      rotation: 0,
      isPlaced: false
    },
    {
      id: 'piece-10',
      color: 'pink',
      shape: { positions: PIECE_SHAPES.PINK_L_EXTENDED },
      rotation: 0,
      isPlaced: false
    },
    {
      id: 'piece-11',
      color: 'white',
      shape: { positions: PIECE_SHAPES.WHITE_SMALL_L },
      rotation: 0,
      isPlaced: false
    },
    {
      id: 'piece-12',
      color: 'lightGreen',
      shape: { positions: PIECE_SHAPES.GREEN_SQUARE },
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