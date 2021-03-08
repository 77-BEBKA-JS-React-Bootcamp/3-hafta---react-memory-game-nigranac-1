import React, { useState, useEffect } from "react";

let cards = [
  "far fa-gem",
  "far fa-gem",
  "far fa-heart",
  "far fa-heart",
  "fas fa-cat",
  "fas fa-cat",
  "fa fa-bolt",
  "fa fa-bolt",
];
function Card() {
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [newGame, setNewGame] = useState(true);
  const [matches, setMatches] = useState(0);
  let matchCards = [];
  let openCards = [];

  useEffect(() => {
    shuffleArray(cards);
    setNewGame(false);
  }, []);

  function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  function clickHandler(e) {
    if (openCards.length === 0) {
      let card1 = e.target;
      card1.classList.remove("closed");
      card1.classList.add("open");
      openCards.push(card1);
    } else if (openCards.length === 1) {
      let card2 = e.target;
      card2.classList.remove("closed");
      card2.classList.add("open");
      openCards.push(card2);
      setMoves(moves + 1);
    }

    if (openCards.length === 2) {
      let card1 = openCards[1];
      let card2 = openCards[0];

      if (card1.classList.value === card2.classList.value) {
        setMatches(matches + 1);

        matchCards.push(card1.classList.value, card2.classList.value);

        setScore(score + 1);

        openCards = [];
      } else {
        setTimeout(function () {
          card1.classList.remove("open");
          card2.classList.remove("open");
          card1.classList.add("closed");
          card2.classList.add("closed");
        }, 1000);
        openCards = [];
      }

      if (matches === 4) {
        alert(`Game Over! Score: ${score} Number of moves: ${moves} `);
      }
    }
  }

  return (
    <div>
      <div>
        <h1 id="memory-header">Memory Game</h1>
        <h3 id="memory-text"> Start if you trust your memory 😊</h3>
      </div>
      <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
        <h3 className="score">Moves: {moves} </h3>
        <h3 className="score">Score: {score}</h3>
      </div>

      <div className="deck">
        {cards.map((card) => {
          return <i className={`${card} closed`} onClick={clickHandler} />;
        })}
      </div>
    </div>
  );
}

export default Card;
