export default (
  state = {
    history: [
      {
        squares: Array(9).fill(null)
      }
    ],
    stepNumber: 0,
    xIsNext: true
  },
  action
) => {
  switch (action.type) {
    case "CLICK_SQUARE":
      const { history, squares, stepNumber, xIsNext, i } = action;

      squares[i] = xIsNext ? "X" : "O";
      let newState = Object.assign({}, state, {
        history: history.concat([
          {
            squares: squares
          }
        ]),
        stepNumber: stepNumber,
        xIsNext: xIsNext
      });

      return newState;
    default:
      return state;
  }
};
