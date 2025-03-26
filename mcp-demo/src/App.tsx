import { useState, useEffect } from 'react'
import './App.css'

type SquareValue = 'X' | 'O' | null
type BoardState = SquareValue[]

const calculateWinner = (squares: BoardState): number[] | null => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ]

  for (const line of lines) {
    const [a, b, c] = line
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return line
    }
  }
  return null
}

interface SquareProps {
  readonly value: SquareValue
  readonly onClick: () => void
  readonly position: string
  readonly isWinner: boolean
}

function Square({ value, onClick, position, isWinner }: SquareProps) {
  return (
    <button 
      className={`square${isWinner ? ' winner' : ''}`}
      onClick={onClick} 
      data-position={position}
    >
      {value}
    </button>
  )
}

function App() {
  const [squares, setSquares] = useState<BoardState>(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  const [winningSquares, setWinningSquares] = useState<number[]>([])

  const handleClick = (i: number) => {
    if (calculateWinner(squares) || squares[i]) {
      return
    }

    const nextSquares = squares.slice()
    nextSquares[i] = xIsNext ? 'X' : 'O'
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }

  useEffect(() => {
    const winner = calculateWinner(squares)
    if (winner) {
      setWinningSquares(winner)
    }
  }, [squares])

  const winnerSymbol = winningSquares.length > 0 ? squares[winningSquares[0]] : null
  const isDraw = !winnerSymbol && squares.every(square => square !== null)
  
  const getGameStatus = () => {
    if (winnerSymbol) {
      return `Winner: ${winnerSymbol}`
    }
    if (isDraw) {
      return "Game is a draw!"
    }
    return `Next player: ${xIsNext ? 'X' : 'O'}`
  }

  const handleRestart = () => {
    setSquares(Array(9).fill(null))
    setXIsNext(true)
    setWinningSquares([])
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
            isWinner={winningSquares.includes(i)}
          />
        ))}
      </div>
    </div>
  )
}

export default App
