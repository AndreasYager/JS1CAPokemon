const pokemonList = document.getElementById("pokemon-list");

async function fetchPokemon() {
  const loadingIcon = document.createElement("div");
  loadingIcon.innerText = "Loading...";
  pokemonList.appendChild(loadingIcon);

  await new Promise(resolve => setTimeout(resolve, 100)); 

  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=9");
  const data = await response.json();

  pokemonList.removeChild(loadingIcon);

  for (const pokemon of data.results) {
    const response = await fetch(pokemon.url);
    const data = await response.json();
    const { name, sprites, height, weight, } = data;

    const div = document.createElement("div");
    div.innerHTML = `
      <h2><a href="details.html?name=${name}">${name}</a></h2>
      <img src="${sprites.front_default}" alt="${name} image" />
      <p>Height: ${height} m</p>
      <p>Weight: ${weight} kg</p>
    `;

    pokemonList.appendChild(div);

    await new Promise(resolve => setTimeout(resolve, 100)); 

    // Add event listener to redirect to new page on name click
    const pokemonNameLink = div.querySelector("h2 a");
    pokemonNameLink.addEventListener("click", (event) => {
      event.preventDefault();
      const pokemonName = event.target.getAttribute("href").split("=")[1];
      window.location.href = `details.html?name=${pokemonName}`;
    });
  }
}

try {
  fetchPokemon();
} catch (error) {
  console.error(error);
  const errorElement = document.createElement("div");
  errorElement.innerHTML = "An error occurred while fetching the Pokemon. Please try again.";
  pokemonList.appendChild(errorElement);
}
