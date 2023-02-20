const urlParams = new URLSearchParams(window.location.search);
const pokemonUrl = urlParams.get("url");

async function fetchPokemonDetails() {
  const response = await fetch(pokemonUrl);
  const data = await response.json();

  const { name, height, weight, abilities, types, stats } = data;

  const div = document.getElementById("pokemon-details");
  div.innerHTML = `
    <h2>${name}</h2>
    <p>Height: ${height} m</p>
    <p>Weight: ${weight} kg</p>
    <p>Abilities: ${abilities.map(ability => ability.ability.name).join(", ")}</p>
    <p>Types: ${types.map(type => type.type.name).join(", ")}</p>
  `;
}

fetchPokemonDetails();
