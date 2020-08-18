import React, { useState, useEffect } from "react";
import { calculateWinner } from "../helper";
import Board from "./Board";
import queryString from "query-string";
import PropTypes from "prop-types";
import io from "socket.io-client";
const Game = ({ location, history }) => {
  if (!localStorage.username) history.push("/login");
  const values = queryString.parse(location.search);
  const [ghistory, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const [socket, setSocket] = useState(0);
  const winner = calculateWinner(ghistory[stepNumber]);
  const xO =
    xIsNext && localStorage.username
      ? localStorage.username[0]
      : localStorage.vs && localStorage.vs[0];
  const [join, setJoin] = useState(0);
  useEffect(() => {
    setSocket(io("http://localhost:5000/"));
  }, []);

  if (socket && !join) {
    const id = localStorage.username;
    const myData = [localStorage.username, localStorage.vs];
    const myroom = myData.sort()[0] + "" + myData.sort()[1];
    socket.emit("join", { myroom, id }, (error) => {
      console.log(error);
    });
    setJoin(true);
    console.log("heor");
  }
  if (socket) {
    socket.on("message", (mess) => {
      if (mess.other === localStorage.username) {
        setHistory(mess.ghistory);
        setStepNumber(mess.stepNumber);
        setXisNext(mess.vs);
        console.log("sdf");
      }
    });
  }

  const handleClick = async (i) => {
    const id = localStorage.username;
    const other = localStorage.vs;
    const myData = [localStorage.username, localStorage.vs];
    const myroom = myData.sort()[0] + "" + myData.sort()[1];
    const historyPoint = ghistory.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
    // return if won or occupied
    if (winner || squares[i]) return;
    // select square

    squares[i] = xO;
    await setHistory([...historyPoint, squares]);
    await setStepNumber(historyPoint.length);
    await setXisNext(!xIsNext);
    const vs = xIsNext;
    const tuple = {
      ghistory: [...historyPoint, squares],
      vs: true,
      stepNumber: stepNumber + 1,
      id,
      myroom,
      other,
    };

    socket.emit("sendMessage", tuple, () => console.log("done"));
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const renderMoves = () =>
    ghistory.map((_step, move) => {
      const destination = move ? `Go to move #${move}` : "Go to Start";
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });
  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("vs");
    history.push("/login");
  };
  return (
    <>
      <h1>
        {localStorage.username &&
          localStorage.username.toUpperCase() +
            " vs " +
            localStorage.vs.toUpperCase()}
      </h1>
      <div className="row">
        <div className="col-md-2 col-xs-2">
          <button onClick={logout} className="btn btn-primary mb-3">
            logout
          </button>
        </div>
        <div className="col-md-7 col-xs-7">
          {xIsNext ? (
            <Board squares={ghistory[stepNumber]} onClick={handleClick} />
          ) : (
            <Board squares={ghistory[stepNumber]} onClick={false} />
          )}
        </div>
        <div className="col-md-3 col-xs-3">
          <div className="info-wrapper">
            <div>
              <h3>History</h3>
              {renderMoves()}
            </div>
            <h3>{winner ? "Winner: " + winner : "Next Player: " + xO}</h3>
          </div>
        </div>
      </div>
    </>
  );
};
Game.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
};
export default Game;
