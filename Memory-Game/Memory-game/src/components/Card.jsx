import React from "react";

function Card({ card, handleClick, flipped }) {
  return (
    <div
      className="w-24 h-32 perspective"
      onClick={() => handleClick(card)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Back side – black cover (visible by default) */}
        <div className="absolute w-full h-full bg-gray-300 backface-hidden rounded" />

        {/* Front side – the actual image (visible when flipped) */}
        <img
          src={card.image}
          alt="card front"
          className="absolute w-full h-full backface-hidden rotate-y-180 rounded"
        />
      </div>
    </div>
  );
}

export default Card;
