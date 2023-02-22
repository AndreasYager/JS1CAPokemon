const pokemonDetails = document.getElementById("pokemon-details");

async function fetchPokemonDetails() {
  // Retrieve the name parameter from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const pokemonName = urlParams.get("name");

  // Display the loading icon while the API is being fetched
  const loadingIcon = document.createElement("div");
  loadingIcon.textContent = "Loading...";
  pokemonDetails.appendChild(loadingIcon);

  await new Promise(resolve => setTimeout(resolve, 100));

  try {
    // Fetch the details of the corresponding Pokemon
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await response.json();
    const { name, sprites, height, weight, abilities, types, moves, species } = data;

    // Display the details of the Pokemon
    const div = document.createElement("div");
    div.innerHTML = `
      <h2>${name}</h2>
      <img src="${sprites.front_default}" alt="${name} image" />
      <p>Height: ${height} m</p>
      <p>Weight: ${weight} kg</p>
      <p>Abilities: ${abilities.map(ability => ability.ability.name).join(", ")}</p>
      <p>Types: ${types.map(type => type.type.name).join(", ")}</p>
      <p>Moves: ${moves.map(move => move.move.name).join(", ")}</p>
      <p>Species: ${species.name}</p>
    `;
    pokemonDetails.appendChild(div);

  } catch (error) {
    console.error(error);
    const errorElement = document.createElement("div");
    errorElement.innerHTML = "An error occurred while fetching the Pokémon details. Please try again later.";
    pokemonDetails.appendChild(errorElement);

  } finally {
    // Remove the loading icon
    if (loadingIcon && loadingIcon.parentNode) {
      loadingIcon.parentNode.removeChild(loadingIcon);
    }
  }
}

fetchPokemonDetails();
