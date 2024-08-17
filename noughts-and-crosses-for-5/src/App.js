import React, { useEffect, useState } from 'react';
import Board from './Board';

function App() {
    const [moves, setMoves] = useState([]);
    const [winner, setWinner] = useState('');
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        fetch('/moves.json')  // Replace with the correct path or URL
            .then(response => response.json())
            .then(data => {
                setMoves(data);
                if (data.length > 0) {
                    setWinner(data.length % 2 === 0 ? 'X' : 'O');
                }
            })
            .catch(error => console.error('Error fetching moves:', error));
    }, []);

    const handleGameOver = () => {
        setGameOver(true);
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center', fontFamily: 'monospace', fontWeight: 'bold' }}>noughts & crosses:</h1>
            <h3 style={{ textAlign: 'center', fontFamily: 'monospace', fontWeight: 50, letterSpacing: 3 }}>5 in a row</h3>
            <Board moves={moves} onGameOver={handleGameOver}/>
            {gameOver && <p style={{ textAlign: 'center', fontFamily: 'monospace' }}>Winner: {winner}</p>}
        </div>
    );
}

export default App;
