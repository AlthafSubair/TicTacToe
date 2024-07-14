import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

let data = ["","","","","","","","",""];

const TicTacToe = () => {
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let titleRef = useRef(null);

  const toggle = (e, num) => {
    if (lock || e.target.classList.contains('clicked') || data[num] !== "") {
      return;
    }
    e.target.classList.add('clicked');
    if (count % 2 === 0) {
      e.target.innerHTML = `<img src ='${cross_icon}'>`;
      data[num] = "x";
    } else {
      e.target.innerHTML = `<img src ='${circle_icon}'>`;
      data[num] = "O";
    }
    setCount(count + 1);
    checkwin();
  };

  const checkwin = () => {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        won(data[a]);
        break;
      }
    }
  };

  const won = (winner) => {
    setLock(true);
    titleRef.current.innerHTML = `Congratulations: <img src='${winner === "x" ? cross_icon : circle_icon}'> Wins`;
  };

  const refresh = () => {
    window.location.reload();
  };

  return (
    <div className='container bg-dark'>
      <div className="row">
        <div className="col-12">
          <h1 className="title text-center" ref={titleRef}> Tic Tac Toe Game In <span>React</span></h1>
        </div>
      </div>
      <div className="board mx-auto">
        <div className="row no-gutters">
          {[...Array(9)].map((_, index) => (
            <div className="col-4 p-1" key={index}>
              <div className="boxes" onClick={(e) => toggle(e, index)}></div>
            </div>
          ))}
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center">
          <button className="btn btn-primary mt-3 text-lg px-6 py-6 mb-2" onClick={refresh}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
