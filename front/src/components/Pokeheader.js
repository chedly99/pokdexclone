import React, { useState } from "react";
import PokemonModal from "../components/PokemonModal";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemonDetails, setPokemonDetails] = useState(null);

  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/pokemons/names?query=${query}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      setSuggestions(data.slice(0, 4));
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const debouncedFetch = debounce(fetchSuggestions, 100);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    if (!value) {
      setSuggestions([]);
      setSearchQuery(null);
    } else {
      debouncedFetch(value);
    }
  };

  const handleSuggestionClick = async (pokemonName) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/pokemons/${pokemonName}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Network response error:", response.status, errorData);
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      setPokemonDetails(data);
      setSelectedPokemon(pokemonName);
    } catch (error) {
      console.error("Error fetching Pokémon details:", error);
    }
  };
  const closeModal = () => {
    setSelectedPokemon(null);
    setPokemonDetails(null);
    setSuggestions([]);
  };

  return (
    <header className="bg-gray-900 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center relative">
          <h1 className="text-4xl text-white font-bold mr-4">Pokedex</h1>
          <form>
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 rounded-lg focus:outline-none"
              value={searchQuery}
              onChange={handleInputChange}
            />
          </form>
          <div className="absolute z-10 bg-zinc-100 w-56 rounded-lg shadow-lg cursor-pointer mt-10 right-0 top-0">
            <ul>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
              {selectedPokemon && (
                <PokemonModal
                  closeModal={closeModal}
                  pokemonDetails={pokemonDetails}
                />
              )}
            </ul>
          </div>
        </div>
        <div>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg mr-4">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
