// created using latest vite and react (V 19.1.1).
// Starter code came from React.dev's tic-tac-toe tutorial boilerplate starter code. Then customized and added some flare
import React, { useState } from 'react';
import './App.css';

function Square({value, onSquareClick}) {
  return (
    <button 
      className="square" 
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({xIsNext, squares, onPlay}) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const boardSize = 3;
  const boardRows = Array(boardSize)
    .fill(null)
    .map((_, rowIndex) => (
      <div className = "flex" key={rowIndex}>
        {Array(boardSize)
          .fill(null)
          .map((_, colIndex) => {
            const squareIndex = rowIndex * boardSize + colIndex;
            return (
              <Square
                key={squareIndex}
                value={squares[squareIndex]}
                onSquareClick={() => handleClick(squareIndex)}
              />
            );
          })
        }
      </div>
    ));
  return (
    <div>
      <div className="status">{status}</div>
      <div>{boardRows}</div>
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
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
const [isSortAscending, setIsSortAscending] = useState(true);
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
    if(move > 0) {
      description = `Go to move #${move+1}`;
    } else {
      description = 'Go to start';
    }
    return (
      <li key={move}>
        <p>You are at move # {move}</p>
        {/* <button onClick={() => jumpTo(move)}>
          {description}
        </button> */}
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
        <button
          onClick={() => setIsSortAscending(!isSortAscending)}
        >
          Sort {isSortAscending ? 'descending' : 'ascending'}
        </button>
        <ol>
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
      return squares[a];
    }
  }
  return null;
}
