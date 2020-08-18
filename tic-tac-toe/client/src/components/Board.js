import React from "react";
import Square from "./Square";

const Board = ({ squares, onClick }) => (
  <div className="board">
    {onClick
      ? squares.map((square, i) => (
          <Square key={i} value={square} onClick={() => onClick(i)} />
        ))
      : squares.map((square, i) => <Square key={i} value={square} />)}
  </div>
);

export default Board;
