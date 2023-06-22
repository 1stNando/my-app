import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// This is the child component. Prop passed from Board().
// setValue is a setter function. By calling setValue from an onClick handler, we tell React to re-render that Square whenever its <button> is clicked. After the update, the Square’s value will be 'X', so we’ll see the X on the game board. If you click on any Square, an X should show up.

// The code defines a functional component called Square that represents an individual square on the game board. It takes a props parameter, which is an object containing properties passed to the component.

// Within the Square component, the useState hook is used to define a state variable value and its corresponding setter function setValue. The initial state of value is an empty string.

// The Square component returns a button element. When the button is clicked, the onClick event is triggered, and it calls an arrow function that sets the value state to 'X'.
function Square(props) {
  return (
    <button
      className="square"      
      
      onClick={() => props.onClick('X')}> {props.value}   

    </button>
  );
}

// This is the parent component.
function Board() {

  // Add a useState call to set a state value
  const [squares, setSquares] = useState(Array(9).fill(null))

  // New useState call, and set the first move to be "X" by default. Each time a player moves, xIsNext (a boolean) will be flipped to determine which player goes next and the game’s state will be saved.
  const[xIsNext, setXIsNext] = useState(true)

  // Define handleClick function used in helper function.
  function handleClick(i) {
    const newSquares = squares.slice()
    newSquares[i] = 'X'
    setSquares(newSquares)
  }
  
  // Helper function:
  function renderSquare(i) {
   return (
      <Square
        value={squares[i]}
        onClick={() => handleClick(i)}
        />
    );
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
