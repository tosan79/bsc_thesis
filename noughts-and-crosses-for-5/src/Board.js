import React, { useState, useEffect } from 'react';
import './Board.css';

const N = 10; // Board size

const Board = ({ moves, onGameOver }) => {
    const [board, setBoard] = useState(Array.from({ length: N }, () => Array(N).fill(' ')));

    // Function to update the board state with each move
    const playMove = (x, y, player) => {
        setBoard(prevBoard => {
            const newBoard = prevBoard.map(row => row.slice()); // Deep copy of the board
            newBoard[x][y] = player;
            return newBoard;
        });
    };

    useEffect(() => {
        let moveIndex = 0;
        let currentPlayer = 'O';

        const interval = setInterval(() => {
            if (moveIndex < moves.length) {
                const [x, y] = moves[moveIndex];
                playMove(x, y, currentPlayer);
                currentPlayer = currentPlayer === 'O' ? 'X' : 'O'; // Toggle player after each move
                moveIndex += 1;
            } else {
                clearInterval(interval);
                onGameOver();
            }
        }, 1000); // Play each move with a 1-second delay

        return () => clearInterval(interval); // Cleanup on unmount
    }, [moves, onGameOver]);

    return (
        <div>
            <table className="board">
                <tbody>
                    {board.map((row, i) => (
                        <tr key={i}>
                            {row.map((cell, j) => (
                                <td key={j} className="cell">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Board;
