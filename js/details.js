const urlParams = new URLSearchParams(window.location.search);
const pokemonUrl = urlParams.get("url");

  async function fetchPokemonDetails() {
    try {
      const response = await fetch(pokemonUrl);
      const data = await response.json();

      const { name, height, weight, abilities, types, moves, species } = data;

      const div = document.getElementById("pokemon-details");
      div.innerHTML = `
        <h2>${name}</h2>
        <p>Height: ${height} m</p>
        <p>Weight: ${weight} kg</p>
        <p>Abilities: ${abilities.map(ability => ability.ability.name).join(", ")}</p>
        <p>Types: ${types.map(type => type.type.name).join(", ")}</p>
        <p>Moves: ${moves.map(move => move.move.name).join(", ")}</p>
        <p>Species: ${species.name}</p>
      `;

      document.title = name;
    } catch (error) {
      const div = document.getElementById("pokemon-details");
      div.innerHTML = `<p>Error: ${error.message}</p>`;
    }
  }

  fetchPokemonDetails();
