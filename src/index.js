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

// This is the parent component to the child Square() component!
function Board(props) {
  // BELOW: lifted the State Up to the Game() component.
  // const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  // const [xIsNext, setXIsNext] = useState(true);
  // function handleClick(i) {
  //   if (calculateWinner(squares) || squares[i]) {
  //     return
  //   }
  //   const newSquares = squares.slice()
  //   newSquares[i] = xIsNext ? 'X' : 'O'
  //   setSquares(newSquares)
  //   setXIsNext(!xIsNext)
  // }

  function renderSquare(i) {
    return (
      <Square
        value={props.squares[i]}        
        onClick={() => props.onClick(i)}      />
    )
  }

  //const status = 'Next player: ' + (xIsNext ? 'X' : 'O')

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
  )
}

// This is the TOP-LEVEL component
function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }])
  const [stepNumber, setStepNumber] = useState(0)
  const [xIsNext, setXIsNext] = useState(true)

  function handleClick(i) {
    // Finally, we need to move the handleClick function from the Board component to the Game component. We also need to modify handleClick because the Game component’s state is structured differently. Within the Game’s handleClick function, we concatenate new history entries onto history.
    // Note: Unlike the array push() method you might be more familiar with, the concat() method doesn’t mutate the original array, so we prefer it.

    const current = history[history.length - 1]
    const squares = current.squares.slice()

    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = xIsNext ? "X" : "O"

    setHistory(history.concat([{ squares: squares }]))
    setXIsNext(!xIsNext)
  }

  // Next, we’ll define the jumpTo function in Game to update that stepNumber. We also set xIsNext to true if the number that we’re changing stepNumber to is even:
  function jumpTo(step) {
    setStepNumber(step)
    setXIsNext((step % 2) === 0)
  }

  const current = history[history.length - 1]
  const winner = calculateWinner(current.squares)

  // Add this to start Showing the Past Moves.
  const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start'
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    )
  })
  
  let status;
  if (winner) {
    status = "Winner: " + winner
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O")
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={i => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}




// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

// Declaring a Winner:
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  
  return null;
}