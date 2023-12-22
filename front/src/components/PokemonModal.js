import React from "react";

const PokemonModal = ({ closeModal, pokemonDetails }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
      <div className="modal w-96 bg-white rounded-lg shadow-lg">
        {pokemonDetails && (
          <div className="p-6">
            <div className="flex justify-center mb-4">
              <img
                src={pokemonDetails.image_url}
                alt={pokemonDetails.name}
                className="w-32 h-32 object-contain"
              />
            </div>
            <p className="text-2xl font-bold capitalize mb-4">
              {pokemonDetails.name.charAt(0).toUpperCase() +
                pokemonDetails.name.slice(1)}
            </p>

            <hr className="border-t border-gray-200 mb-4" />
            <div>
              <p className="text-lg">
                <span className="font-semibold">Height:</span>{" "}
                {pokemonDetails.height}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Weight:</span>{" "}
                {pokemonDetails.weight}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Abilities:</span>{" "}
                {pokemonDetails.abilities.join(", ")}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Types:</span>{" "}
                {pokemonDetails.types.join(", ")}
              </p>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                className="bg-red-500 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonModal;
