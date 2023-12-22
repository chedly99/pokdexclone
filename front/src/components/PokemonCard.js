import React from "react";

const PokemonCard = ({ pokemonName, onClick, imageUrl }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-xl p-4 mb-4 hover:bg-gray-100 cursor-pointer text-center"
      onClick={onClick}
    >
      <img
        src={imageUrl}
        alt={pokemonName}
        className="w-20 h-20 mx-auto mb-4"
      />
      <h3 className="text-xl text-transform: capitalize font-style: italic mb-2 hover:underline">
        {pokemonName}
      </h3>
    </div>
  );
};

export default PokemonCard;
