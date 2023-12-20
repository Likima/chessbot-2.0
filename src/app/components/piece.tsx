import React, { useRef } from "react";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable"; // Add this import statement

interface PieceProps {
  pieceType: string;
  pieceColor: string;
  move: (newX: number, newY: number) => any;
  x: number;
  y: number;
}

export default function Piece({ pieceType, pieceColor, move, x, y }: PieceProps) {
  var pieceName: string = pieceColor == "w" ? "white" : "black";
  const pieceRef = useRef<HTMLButtonElement | null>(null);

  switch (pieceType) {
    case "p":
      pieceName += "pawn";
      break;
    case "r":
      pieceName += "rook";
      break;
    case "n":
      pieceName += "knight";
      break;
    case "b":
      pieceName += "bishop";
      break;
    case "q":
      pieceName += "queen";
      break;
    case "k":
      pieceName += "king";
      break;
    default:
      console.log("Invalid piece type");
      break;
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Piece clicked");
  };

const handleStop = (e: DraggableEvent, data: DraggableData) => {
    const squareSize = 64;
    const newX = Math.round(data.x / squareSize) * squareSize;
    const newY = Math.round(data.y / squareSize) * squareSize;

    if (
        newX + 64 * x < 0 ||
        448 - (newY + 64 * y) < 0 ||
        newX + 64 * x >= squareSize * 8 ||
        448 - (newY + 64 * y) >= squareSize * 8
    ) {
        console.error("Piece dragged off the board");
        move(x, y);
        return;
    }

    // Calculate the new position of the piece
    const newBoardX = Math.floor((newX + 64 * x) / squareSize);
    const newBoardY = Math.floor((newY + 64 * y) / squareSize);

    // Move the piece to the new position
    move(newBoardX, newBoardY);
};
  return (
    <Draggable nodeRef={pieceRef} onStop={handleStop}>
      <button
        ref={pieceRef}
        className="w-full h-full grid place-items-center hover:scale-[105%]"
        onClick={handleClick}
      >
        <img src={`/${pieceName}.png`} alt={pieceName} className="mr-[4px]" />
      </button>
    </Draggable>
  );
}
