import Board from "./Board.jsx";
import React from "react";
import { connect } from "react-redux";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    
    const history = this.props.history.slice(0, this.props.stepNumber + 1);
    const current = history[history.length - 1];
    console.log(current);
    const squares = current.squares.slice();
    const {dispatch} = this.props;
      const action = {
          type: 'CLICK_SQUARE',
          i: i,
          history: history,
          squares: squares,
          stepNumber: history.length,
          xIsNext: !this.props.xIsNext
      }
      dispatch(action)
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }
  render() {
    const history = this.props.history;
    const current = history[this.props.stepNumber];
    const winner = calculateWinner(current.squares);
    console.log(this.props, this.state);
    const moves = history.map((step, move) => {
      const desc = move ? "Got to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    console.log(current.squares);
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
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

const mapStateToProps = state => {
    return {
        history: state.history,
        stepNumber: state.stepNumber,
        xIsNext: state.xIsNext
    }
    
}

export default connect(mapStateToProps)(Game);