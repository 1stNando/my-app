import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// This is the child component. Prop passed from Board().
// By calling setValue from an onClick handler, we tell React to re-render that Square whenever its <button> is clicked. After the update, the Square’s value will be 'X', so we’ll see the X on the game board. If you click on any Square, an X should show up.
function Square(props) {
  const [value, setValue] = useState('');

  return (
    <button
      className="square"      
      
      onClick={() => setValue('X')}    >
      {value}    </button>
  );
}

// This is the parent component.
function Board() {
  
  function renderSquare(i) {
    return <Square value={i} />;
  }

  const status = 'Next player: X';

  return (
    <div>
      <div className="status">{status}</div>
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

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
