import React from "react";

interface PieceProps {
    pieceType: string;
    pieceColor: string;
}

export default function Piece({pieceType, pieceColor}: PieceProps) {
    var pieceName: string = pieceColor == "w" ? "white" : "black";
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

    return (
        <button className="w-full h-full grid place-items-center hover:scale-[105%] ease-in-out transition-all duration-300" onClick={handleClick}>
            <img src = {`/${pieceName}.png`} alt={pieceName} className="mr-[4px]"/>
        </button>
    );
}