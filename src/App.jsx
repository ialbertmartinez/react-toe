// created using latest vite and react (V 19.1.1).
// Starter code came from React.dev's tic-tac-toe tutorial boilerplate starter code. Then customized and added some flare
import { useState } from 'react';
import './app.css';

function Square({ value, onSquareClick, isWinning, index, disabled }) {
  const label = `Square ${index + 1}${value ? `, ${value}` : ', empty'}`;
  return (
    <button 
      className={`square${isWinning ? ' winning-square' : ''}`} 
      onClick={onSquareClick}
      aria-label={label}
      disabled={disabled}
    >
      {value}
    </button>
  );
}

function Board({xIsNext, squares, onPlay}) {
  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo ? winnerInfo.winner : null;
  const winningLine = winnerInfo ? winnerInfo.line : [];
  const isWin = Boolean(winner);

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
                index={squareIndex}
                disabled={Boolean(winner) || Boolean(squares[squareIndex])}
            />
            );
          })
        }
      </div>
    ));
  return (
    <>
      <header className="text-center m-8 status">
        <h1 className="text-[3rem] text-white leading-[1] font-black">Re-Ac-Toe</h1>
        <p className="text-white small-caps mb-[40px]">tic-tac-toe made w/ React</p>
        <p className="text-white font-bold" role="status" aria-live="polite">{status}</p>
      </header>
      <div className={`flex flex-col flex-nowrap box-border rounded-[50px] shadow-[0_4px_4px_rgba(255,255,255,0.3)] my-10 w-full h-[500px] board-container${isWin ? ' celebrate-win' : ''}`}>
        {boardRows}
      </div>
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
          <p className="font-bold text-white/90">{description}</p>
        </li>
      );
    }
    description = move > 0 ? `Go to move #${move}` : 'Go to start'; 

    return (
      <li className="move-list-item" key={move}>
        {/* <p>You are at move # {move}</p> */}
        <button 
          onClick={() => jumpTo(move)}
          className="bg-[#141414] text-[#05df72] font-light"  
        >
          {description}
        </button>
      </li>
    );
  });
  const sortedMoves = isSortAscending ? moves : [...moves].reverse();
  return (
    <div className="w-[1000px] h-[1000px] gap-20 flex items-start game">
      <div className="w-3/5 game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div> 
      {/* /.game-board */}
      <div className="game-info gap-[40px]">
        <button className="sort-button px-[8px] py-[16px] mb-[40px] text-center bg-transparent border-2 border-solid text-green-400 hover:bg-green-400 hover:text-black"
            onClick={() => setIsSortAscending(!isSortAscending)}
          >
            Sort {isSortAscending ? 'descending' : 'ascending'}
          </button>
        <ol className="move-list">
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
