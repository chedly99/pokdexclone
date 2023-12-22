const axios = require("axios");
const pool = require("./db");

const fetchPokemons = async () => {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=100"
    );
    const pokemons = response.data.results;

    for (const pokemon of pokemons) {
      const pokemonDetails = await axios.get(pokemon.url);
      const { name, height, weight, abilities, types, sprites } =
        pokemonDetails.data;

      const formattedAbilities = abilities.map(
        (ability) => ability.ability.name
      );
      const formattedTypes = types.map((type) => type.type.name);
      const imageUrl = sprites.front_default;

      await pool.query(
        "INSERT INTO pokemons (name, height, weight, abilities, types, image_url) VALUES ($1, $2, $3, $4, $5, $6)",
        [name, height, weight, formattedAbilities, formattedTypes, imageUrl]
      );
    }

    console.log("Data insertion complete!");
  } catch (error) {
    console.error("Error inserting data:", error);
  }
};

module.exports = fetchPokemons;
