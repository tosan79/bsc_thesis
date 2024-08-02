// src/Game.js
import React, { useState, useEffect } from "react";
import Board from "./Board";

const botMoves = [
  [0, 4, 8], // Bot X's moves
  [1, 3, 5], // Bot O's moves
];

function Game() {
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

export default Game;
