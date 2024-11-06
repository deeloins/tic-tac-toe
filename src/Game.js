import React, { useState, useEffect } from 'react';
import Board from './Board';

const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scoreX, setScoreX] = useState(0); // Score for player X
  const [scoreO, setScoreO] = useState(0); // Score for player O
  const [selectedRounds, setSelectedRounds] = useState(3); // Default to best of 3
  const [currentRound, setCurrentRound] = useState(1); // Track current round
  const [result, setResult] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const handleClick = (index) => {
    if (squares[index] || calculateWinner(squares) || gameOver) return;

    const nextSquares = squares.slice();
    nextSquares[index] = isXNext ? 'X' : 'O';
    setSquares(nextSquares);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setResult('');
  };

  const handleNewGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setScoreX(0);
    setScoreO(0);
    setCurrentRound(1);
    setGameOver(false);
    setResult('');
  };

  const handleRoundsSelection = (event) => {
    setSelectedRounds(parseInt(event.target.value));
    handleNewGame(); // Reset game if rounds selection changes
  };

  useEffect(() => {
    const winner = calculateWinner(squares);
    const majorityWins = Math.floor(selectedRounds / 2) + 1; // Wins needed to win the series
  
    if (winner) {
      setResult(`Winner: ${winner}`);
  
      if (!gameOver) {
        if (winner === 'X') {
          setScoreX((prevScoreX) => {
            const newScoreX = prevScoreX + 1;
            if (newScoreX === majorityWins || currentRound === selectedRounds) {
              setGameOver(true); // End game if Player X reaches required wins or last round is completed
            }
            return newScoreX;
          });
        } else if (winner === 'O') {
          setScoreO((prevScoreO) => {
            const newScoreO = prevScoreO + 1;
            if (newScoreO === majorityWins || currentRound === selectedRounds) {
              setGameOver(true); // End game if Player O reaches required wins or last round is completed
            }
            return newScoreO;
          });
        }
      }
  
      // Only proceed to the next round if the game is not over and rounds are left
      if (!gameOver && currentRound < selectedRounds) {
        setTimeout(() => {
          handleReset();
          setCurrentRound((prevRound) => prevRound + 1);
        }, 2000);
      }
    } else if (squares.every((square) => square !== null)) {
      setResult('Draw!');
  
      // Advance to the next round if it’s a draw and rounds are remaining
      if (!gameOver && currentRound < selectedRounds) {
        setTimeout(() => {
          handleReset();
          setCurrentRound((prevRound) => prevRound + 1);
        }, 2000);
      } else {
        setGameOver(true); // End game after the final round if it’s a draw
      }
    } else {
      setResult(`Next player: ${isXNext ? 'X' : 'O'}`);
    }
  }, [squares, isXNext, currentRound, selectedRounds, gameOver]);
  
  const finalResult = () => {
    if (scoreX > scoreO) return 'Player X Wins the Series!';
    if (scoreO > scoreX) return 'Player O Wins the Series!';
    return 'The Series Ended in a Draw!';
  };

  return (
    <div className="flex flex-col items-center min-h-screen w-full h-full bg-gradient-to-tr from-cyan-700 to-indigo-950 m-0 p-0">
      <div className="text-6xl font-bold mb-10 p-11 border-x-10 text-blue-600 bg-transparent font-Londrina text-center w-full">
        <h1>Tic Tac Toe</h1>
      </div>
      {!gameOver && currentRound === 1 && (
        <div className="mb-4">
          <label htmlFor="rounds" className="mr-4 text-xl text-white">Select Rounds:</label>
          <select
            id="rounds"
            value={selectedRounds}
            onChange={handleRoundsSelection}
            className="px-2 py-1 border rounded-md"
          >
            <option value="3">Best of 3</option>
            <option value="4">Best of 4</option>
            <option value="5">Best of 5</option>
          </select>
        </div>
      )}
      <div className="mb-8 text-2xl mt-0 text-blue-500 flex justify-between font-Caveat">
        <div className="m-5 mb-0">Player X: {scoreX}</div>
        <div className="m-5 mb-0">Player O: {scoreO}</div>
      </div>
      <div className="mt-3 text-white font-Caveat text-2xl">Round {currentRound} of {selectedRounds}</div>
      <Board squares={squares} onClick={handleClick} />
      <h2 className="text-xl mt-8 font-bold text-blue-600">{result}</h2>
      {gameOver && (
        <div className="flex flex-col items-center">
          <h2 className="text-3xl mt-8 font-bold text-blue-500">{finalResult()}</h2>
          <button
            onClick={handleNewGame}
            className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            Start New Game
          </button>
        </div>
      )}
    </div>
  );
};

// Function to calculate the winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6],            // diagonals
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
