import React, { useRef } from "react";
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable'; // Add this import statement

interface PieceProps {
    pieceType: string;
    pieceColor: string;
}

export default function Piece({pieceType, pieceColor}: PieceProps) {
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
    }

    const handleStop = (e: DraggableEvent, data: DraggableData) => {
        const squareSize = 100;
        const x = Math.round(data.x / squareSize) * squareSize;
        const y = Math.round(data.y / squareSize) * squareSize;
        console.log("Piece snapped to square:", x, y);
        pieceRef.current!.style.transform = `translate(${x}px, ${y}px)`;
    };

    return(
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