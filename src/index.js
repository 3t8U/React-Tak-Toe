import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from "./components/Game";
import { createStore } from "redux";
import reducer from "./reducers/game-reducer";
import { Provider } from "react-redux";

const store = createStore(reducer);


ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById("root")
);



export default store;