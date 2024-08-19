const btn = document.getElementById("btn");
const card = document.getElementById("card");
const url = "https://pokeapi.co/api/v2/pokemon/";

const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "FF0069",
  fighting: "#30336b",
  fire: "#f0932b0",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
};

const generatePoke = () => {
  const id = Math.floor(Math.random() * 150) + 1;
  const finalUrl = url + id;
  fetch(finalUrl)
    .then((response) => response.json())
    .then((data) => {
      generateData(data);
    })
    .catch((err) => {
      console.error("error", err);
    });
};

const generateData = (data) => {
  const name = data.name[0].toUpperCase() + data.name.slice(1);
  const hp = data.stats[0].base_stat;
  const img = data.sprites.other.dream_world.front_default;
  const attack = data.stats[1].base_stat;
  const defense = data.stats[2].base_stat;
  const speed = data.stats[5].base_stat;
  const themeColor = typeColor[data.types[0].type.name];
  card.innerHTML = ` <p class="hp">
                <span>HP</span>
                ${hp}
            </p>
            <img src=${img} alt="pokemon_image">
            <div class="header">
                <p>${name}</p>
            </div>
            <div class="types"></div>
            <div class="special">
                <div>
                    <p>${attack}</p>
                    <p>Attack</p>
                </div>
                <div>
                    <p>${defense}</p>
                    <p>Defense</p>
                </div>
                <div>
                    <p>${speed}</p>
                    <p>Speed</p>
                </div>
            </div>`;
  appendTypes(data.types);
  styleCard(themeColor);
};

const appendTypes = (type) => {
  type.forEach((type) => {
    const span = document.createElement("span");
    span.textContent = type.type.name;
    document.querySelector(".types").appendChild(span);
  });
};
const styleCard = (color) => {
  card.style.background = `radial-gradient(circle at 50% 0% , ${color} 36% , #ffffff 36%)`;
  card.querySelectorAll(".types span").forEach((typeSpan) => {
    typeSpan.style.backgroundColor = color;
  });
};

btn.addEventListener("click", generatePoke);
window.addEventListener("load", generatePoke);
