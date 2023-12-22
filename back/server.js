const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
// const fetchPokemons = require("./fetchPokemons");

app.use(cors());
app.use(express.json());

app.get("/api/pokemons/names", async (req, res) => {
  const { query } = req.query;

  try {
    let result = await pool.query(
      "SELECT name FROM pokemons WHERE name ILIKE $1 || '%'",
      [query]
    );

    const names = result.rows.map((pokemon) => pokemon.name);
    res.json(names);
  } catch (error) {
    console.error("Error fetching Pokémon names:", error);
    res.status(500).json({ error: "Server error" });
  }
});




app.get("/api/pokemons/random", async (req, res) => {
  try {
    const result = await pool.query("SELECT name, image_url FROM pokemons ORDER BY RANDOM() LIMIT 9");
    const randomPokemons = result.rows;

    res.json(randomPokemons);
  } catch (error) {
    console.error("Error fetching random Pokémon data:", error);
    res.status(500).json({ error: "Server error" });
  }
});




app.get("/api/pokemons/:name", async (req, res) => {
  const { name } = req.params;

  try {
    const result = await pool.query(
      "SELECT name, height, weight, abilities, types, image_url FROM pokemons WHERE name = $1",
      [name]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Pokémon not found" });
    }

    const pokemonDetails = {
      name: result.rows[0].name,
      height: result.rows[0].height,
      weight: result.rows[0].weight,
      abilities: result.rows[0].abilities,
      types: result.rows[0].types,
      image_url: result.rows[0].image_url,
    };

    res.json(pokemonDetails);
  } catch (error) {
    console.error("Error fetching Pokémon details:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// fetchPokemons();

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
