'use client'

import React, { useEffect, useState } from 'react';
import Piece from './components/piece';

type PieceStart = [color: 'b' | 'w', type: 'r' | 'n' | 'b' | 'q' | 'k' | 'p']

function setup(){
  const piece_types = ["rnbqkbnr", "pppppppp"];
  let board: Record<string, PieceStart> = {};
  ['b','w'].flatMap((color) => {
    const row = color === 'w' ? 1 : 8;
    const pawn_row = color === 'w' ? 2 : 7;
    const pieces = piece_types.map((piece_type) => piece_type.split(''));
    pieces.forEach((piece_type, i) => {
      piece_type.forEach((piece, j) => {
        const x = j + 1;
        const y = i === 0 ? row : pawn_row;
        board[`${x}${y}`] = [color, piece] as PieceStart;
      })
    })
  })
  console.log(board)
  return board
}

export default function ChessBoard() {
  const boardSize = 8;
  const [board, setBoard] = useState<Record<string, PieceStart>>({});

  useEffect(() => {
    setBoard(setup());
  }, []);

  return <div className="grid place-items-center w-full min-h-screen" >
      <div className="grid grid-cols-8 aspect-square">{
        [...Array(boardSize).keys()].map((y: number) => 
          [...Array(boardSize).keys()].map((x: number) => {
              const piece = board[`${x + 1}${boardSize - y}`]; // Flip the y coordinate
              return <div key={`${x}${y}`} className={`${(x + y) % 2 ? 
              "bg-white" : "bg-[#0000FF]"} aspect-square w-10 md:w-16 border-4 border-transparent hover:border-black`}
              >
                {piece && <Piece pieceType={piece[1]} pieceColor={piece[0]} />}
              </div>
            }
          )
        )
      }
    </div>
  </div>
}
