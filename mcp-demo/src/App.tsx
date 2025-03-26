import { useState } from 'react'
import './App.css'

type SquareValue = 'X' | 'O' | null
type BoardState = SquareValue[]

const calculateWinner = (squares: BoardState): SquareValue => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ]

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

interface SquareProps {
  readonly value: SquareValue
  readonly onClick: () => void
  readonly position: string
}

function Square({ value, onClick, position }: SquareProps) {
  return (
    <button className="square" onClick={onClick} data-position={position}>
      {value}
    </button>
  )
}

function App() {
  const [squares, setSquares] = useState<BoardState>(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  const handleClick = (i: number) => {
    if (calculateWinner(squares) || squares[i]) {
      return
    }

    const nextSquares = squares.slice()
    nextSquares[i] = xIsNext ? 'X' : 'O'
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }

  const winner = calculateWinner(squares)
  const isDraw = !winner && squares.every(square => square !== null)
  
  const getGameStatus = () => {
    if (winner) {
      return `Winner: ${winner}`
    }
    if (isDraw) {
      return "Game is a draw!"
    }
    return `Next player: ${xIsNext ? 'X' : 'O'}`
  }

  const handleRestart = () => {
    setSquares(Array(9).fill(null))
    setXIsNext(true)
  }

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <div className="game-info">
        <div className="status">{getGameStatus()}</div>
        <button className="restart-button" onClick={handleRestart}>
          Restart Game
        </button>
      </div>
      <div className="board">
        {squares.map((square, i) => (
          <Square
            key={`square-${i}-${square ?? 'empty'}`}
            value={square}
            onClick={() => handleClick(i)}
            position={`row-${Math.floor(i / 3)}-col-${i % 3}`}
          />
        ))}
      </div>
    </div>
  )
}

export default App
