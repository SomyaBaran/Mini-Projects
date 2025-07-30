import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import { cardImages } from "./data/cards";

function App() {
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [matched, setMatched] = useState([]);
  const [disable, setDisable] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (firstCard && secondCard) {
      setDisable(true);

      if (firstCard.image === secondCard.image) {
        setMatched((prev) => [...prev, firstCard.id, secondCard.id]);
        resetTurn();
      } else {
        setTimeout(resetTurn, 1000);
      }
    }
  }, [firstCard, secondCard]);

  useEffect(() => {
    if (cards.length > 0 && matched.length === cards.length) {
      setGameWon(true);
    }
  }, [matched, cards]);

  const shuffleCards = () => {
    const shuffled = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffled);
    setMatched([]);
    setFirstCard(null);
    setSecondCard(null);
    setGameWon(false);
  };

  const handleClick = (card) => {
    if (disable || card === firstCard || matched.includes(card.id)) return;

    if (!firstCard) {
      setFirstCard(card);
    } else {
      setSecondCard(card);
    }
  };

  const resetTurn = () => {
    setFirstCard(null);
    setSecondCard(null);
    setDisable(false);
  };

  return (
    <div className="min-h-screen relative bg-black text-white flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="gooey-top"></div>
      <div className="gooey-bottom"></div>

      <h1
        className="text-5xl mb-10 font-extrabold tracking-wide"
        style={{ fontFamily: "Anton, sans-serif" }}
      >
        Memory Game
      </h1>

      {gameWon && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center z-20">
          <h2 className="text-4xl font-bold text-white mb-4">🎉 Congo! You won! 🎉</h2>
          <button
            onClick={shuffleCards}
            className="px-6 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition"
          >
            Play Again
          </button>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4 z-10">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleClick={handleClick}
            flipped={
              card === firstCard || card === secondCard || matched.includes(card.id)
            }
          />
        ))}
      </div>
    </div>
  );
}

export default App;
