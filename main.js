const pokemonList = document.getElementById("pokemon-list");

async function fetchPokemon() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=9");
  const data = await response.json();

  for (const pokemon of data.results) {
    const response = await fetch(pokemon.url);
    const data = await response.json();
    const { name, height, weight, abilities, types } = data;

    const div = document.createElement("div");
    div.innerHTML = `
      <h2><a href="details.html?url=${pokemon.url}">${name}</a></h2>
      <p>Height: ${height} m</p>
      <p>Weight: ${weight} kg</p>
      <p>Abilities: ${abilities.map(ability => ability.ability.name).join(", ")}</p>
      <p>Types: ${types.map(type => type.type.name).join(", ")}</p>
    `;

    pokemonList.appendChild(div);

    await new Promise(resolve => setTimeout(resolve, 100)); 

    // Add event listener to redirect to new page on name click
    const pokemonName = div.querySelector("h2 a");
    pokemonName.addEventListener("click", (event) => {
      event.preventDefault();
      const pokemonUrl = event.target.getAttribute("href").split("=")[1];
      window.location.href = `details.html?url=${pokemonUrl}`;
    });
  }
}

fetchPokemon();
