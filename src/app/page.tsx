"use client";

import React, { useEffect, useState } from "react";
import Piece from "./components/piece";

type PieceStart = [color: "b" | "w", type: "r" | "n" | "b" | "q" | "k" | "p"];

function printBoard(board: Record<string, PieceStart>) {
  const boardSize = 8;
  for (let y = boardSize; y >= 1; y--) {
    let row = "";
    for (let x = 1; x <= boardSize; x++) {
      const piece = board[`${x}${y}`];
      if (piece) {
        row += `${piece[0]}${piece[1]} `;
      } else {
        row += "-- ";
      }
    }
    console.log(row);
  }
}

function setup() {
  const piece_types = ["rnbqkbnr", "pppppppp"];
  let board: Record<string, PieceStart> = {};
  ["b", "w"].flatMap((color) => {
    const row = color === "w" ? 1 : 8;
    const pawn_row = color === "w" ? 2 : 7;
    const pieces = piece_types.map((piece_type) => piece_type.split(""));
    pieces.forEach((piece_type, i) => {
      piece_type.forEach((piece, j) => {
        const x = j + 1;
        const y = i === 0 ? row : pawn_row;
        board[`${x}${y}`] = [color, piece] as PieceStart;
      });
    });
  });
  return board;
}

function useBoard() {
  const [board, setBoard] = useState<Record<string, PieceStart>>({});

  const createSetPiece = (x: number, y: number) => {
    // toolkit for each piece
    const move = (newX: number, newY: number) => {
      setBoard((prevBoard) => {
        if(newX === x && newY === y) return prevBoard;
        const newBoard = { ...prevBoard };
        const piece = newBoard[`${x + 1}${8 - y}`];
        delete newBoard[`${x + 1}${8 - y}`];
        newBoard[`${newX + 1}${8 - newY}`] = piece;
        return newBoard;
      });
    };
    return { move };
  };
  return { board, setBoard, createSetPiece };
}

export default function ChessBoard() {
  const boardSize = 8;
  const { board, setBoard, createSetPiece } = useBoard();

  useEffect(() => {
    setBoard(setup());
  }, []);

  return (
    <div className="grid place-items-center w-full min-h-screen">
      <div className="grid grid-cols-8 aspect-square">
        {[...Array(boardSize).keys()].map((y: number) =>
          [...Array(boardSize).keys()].map((x: number) => {
            const piece = board[`${x + 1}${boardSize - y}`]; // Flip the y coordinate
            const { move } = createSetPiece(x, y);

            return (
              <div
                key={`${x}${y}`}
                className={`${
                  (x + y) % 2 ? "bg-white" : "bg-[#0000FF]"
                } aspect-square w-10 md:w-16 border-4 border-transparent hover:border-black`}
              >
                {piece && (
                  <Piece
                    pieceType={piece[1]}
                    pieceColor={piece[0]}
                    move = {move}
                    x={x}
                    y={y}
                  />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
