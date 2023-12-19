  import React from 'react';
  import Piece from './components/piece';

  export default function ChessBoard() {
    const boardSize = 8;

    const renderSquare = (row: number, col: number) => {
      const isEvenSquare = (row + col) % 2 === 0;
      const squareColor = isEvenSquare ? 'white' : 'blue'; // Set the square color to blue and white
      return (
        <div
          key={`${row}-${col}`}
          style={{
            backgroundColor: squareColor,
            width: '75px',
            height: '75px',
            display: 'inline-block', // Add display property to show squares in a row
          }}
        >
          <Piece pieceType='r' pieceColor='w' />
        </div>
      );
    };

    const renderRow = (row: number) => {
      const squares = [];
      for (let col = 0; col < boardSize; col++) {
        squares.push(renderSquare(row, col));
      }
      return <div key={row} className = "row">{squares}</div>;
    };

    const renderBoard = () => {
      const rows = [];
      for (let row = 0; row < boardSize; row++) {
        rows.push(renderRow(row));
      }
      return rows;
    };

    return <div>{renderBoard()}</div>;
  }
