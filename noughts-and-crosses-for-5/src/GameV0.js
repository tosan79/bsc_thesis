//src/Game.js
import React, { useState, useEffect } from "react";

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function Board({ squares, onClick }) {
  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  };

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

const botMoves = [
  [0, 1, 2], // Bot X's moves
  [3, 4, 5], // Bot O's moves
];

function GameV0() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [moveIndex, setMoveIndex] = useState(0);

  useEffect(() => {
    if (moveIndex < 5) {
      const timer = setTimeout(() => {
        const newSquares = squares.slice();
        const botMove = xIsNext
          ? botMoves[0][moveIndex]
          : botMoves[1][moveIndex];
        if (!newSquares[botMove]) {
          newSquares[botMove] = xIsNext ? "X" : "O";
          setSquares(newSquares);
          setXIsNext(!xIsNext);
          setMoveIndex(moveIndex + 1);
        }
      }, 1000); // 1 second delay between moves
      return () => clearTimeout(timer);
    }
  }, [moveIndex, squares, xIsNext]);

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} onClick={() => {}} />
      </div>
      <div className="game-info">
        <div>{`Next player: ${xIsNext ? "X" : "O"}`}</div>
      </div>
    </div>
  );
}

export default GameV0;
