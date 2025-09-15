// created using latest vite and react (V 19.1.1).
// Starter code came from React.dev's tic-tac-toe tutorial boilerplate starter code. Then customized and added some flare
import React, { useState } from 'react';
import './App.css';

function Square({value, onSquareClick, isWinning}) {
  return (
    <button 
      className={`square ${isWinning ? 'winning-square' : ''}`} 
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({xIsNext, squares, onPlay}) {
  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo ? winnerInfo.winner : null;
  const winningLine = winnerInfo ? winnerInfo.line : [];

  function handleClick(i) {
    if (winner || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
    console.log(`status(winner): ${status}`);
  } else
  if(squares.every(Boolean)) {
    status = 'Tie Game';
    console.log(`status(tie): ${status}`);
  }
  else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    console.log(`status(nextPlayer): ${status}`);
  }

  const boardSize = 3;
  const boardRows = Array(boardSize)
    .fill(null)
    .map((_, rowIndex) => (
      <div className="flex" key={rowIndex}>
        {Array(boardSize)
          .fill(null)
          .map((_, colIndex) => {
            const squareIndex = rowIndex * boardSize + colIndex;
            return (
              <Square
                key={squareIndex}
                value={squares[squareIndex]}
                onSquareClick={() => handleClick(squareIndex)}
                isWinning={winningLine.includes(squareIndex)}
            />
            );
          })
        }
      </div>
    ));
  return (
    <>
      <header className="status">
        <h1>Re-Ac-Toe</h1>
        <p className="subheader">tic-tac-toe made w/ React</p>
        <p>{status}</p>
      </header>
      <div className="board-container">
        {boardRows}
      </div>
      {/* <div className="board-row">
        <Square
          value={squares[0]}
          onSquareClick={() => handleClick(0)} 
        />
        <Square
          value={squares[1]}
          onSquareClick={() => handleClick(1)} 
        />
        <Square
          value={squares[2]}
          onSquareClick={() => handleClick(2)} 
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3)} 
        />
        <Square
          value={squares[4]}
          onSquareClick={() => handleClick(4)} 
        />
        <Square
          value={squares[5]}
          onSquareClick={() => handleClick(5)} 
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          onSquareClick={() => handleClick(6)} 
        />
        <Square
          value={squares[7]}
          onSquareClick={() => handleClick(7)} 
        />
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8)} 
        />
      </div> */}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isSortAscending, setIsSortAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if(move === currentMove) {
      description = `You are at move #${move}`;
      return (
        <li className="move-list-item" key={move}>
          <p>{description}</p>
        </li>
      );
    }
    description = move > 0 ? `Go to move #${move}` : 'Go to start'; 

    return (
      <li className="move-list-item" key={move}>
        {/* <p>You are at move # {move}</p> */}
        <button onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>
    );
  });
  const sortedMoves = isSortAscending ? moves : [...moves].reverse();
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div> 
      {/* /.game-board */}
      <div className="game-info">
        <ol className="move-list">
          <button className="sort-button"
            onClick={() => setIsSortAscending(!isSortAscending)}
          >
            Sort {isSortAscending ? 'descending' : 'ascending'}
          </button>
          {sortedMoves}
        </ol>
      </div>
      {/* /.game-info */}
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return { 
        winner: squares[a],
        line: [a, b, c] 
      };
    }
  }
  return null;
}
