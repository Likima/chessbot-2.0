import React, { useRef, useState } from "react";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable"; // Add this import statement

interface PieceProps {
  pieceType: string;
  pieceColor: string;
  move: (newX: number, newY: number) => any;
  x: number;
  y: number;
}

export default function Piece({
  pieceType,
  pieceColor,
  move,
  x,
  y,
}: PieceProps) {
  var pieceName: string = pieceColor == "w" ? "white" : "black";
  const pieceRef = useRef<HTMLButtonElement | null>(null);
  const [dragging, setDragging] = useState(false);

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
    setDragging(false);

    const squareSize = 64;
    const newX = Math.round(data.x / squareSize) * squareSize;
    const newY = Math.round(data.y / squareSize) * squareSize;

    if (
      newX + 64 * x < 0 ||
      448 - (newY + 64 * y) < 0 ||
      newX + 64 * x >= squareSize * 8 ||
      448 - (newY + 64 * y) >= squareSize * 8
    ) {
      console.log("x ", x, "y ", y);
      move(x, y);
    } else {
      const newBoardX = Math.floor((newX + 64 * x) / squareSize);
      const newBoardY = Math.floor((newY + 64 * y) / squareSize);
      console.log("newBoardX: ", newBoardX, "newBoardY: ", newBoardY);
      move(newBoardX, newBoardY);
    }
  };
  return (
    <Draggable
      nodeRef={pieceRef}
      onStop={handleStop}
      onMouseDown={() => setDragging(true)}
      position={dragging ? undefined : { x: x * 32, y: y * 32 }}
    >
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
