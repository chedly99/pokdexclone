import React, { useState, useEffect } from "react";
import PokemonCard from "../components/PokemonCard";
import PokemonModal from "../components/PokemonModal";
import Header from "../components/Pokeheader";

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    const fetchRandomPokemons = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/pokemons/random"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setPokemonList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRandomPokemons();
  }, []);

  const handlePokemonClick = async (pokemonName) => {
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
  };

  return (
    <div className="bg-zinc-100">
      <Header />
      <div className="container mx-auto p-4 md:p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {pokemonList &&
          pokemonList.map((pokemon, index) => (
            <PokemonCard
              key={index}
              pokemonName={pokemon.name}
              imageUrl={pokemon.image_url}
              onClick={() => handlePokemonClick(pokemon.name)}
            />
          ))}
        {selectedPokemon && (
          <PokemonModal
            closeModal={closeModal}
            pokemonDetails={pokemonDetails}
          />
        )}
      </div>
    </div>
  );
};

export default Pokedex;
