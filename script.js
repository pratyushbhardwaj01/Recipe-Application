let searchResultContainer = document.querySelector(".searchResult");

let formElement = document.querySelector("form");

const API_ID = "442df8c4";
const API_KEY = "ba152a0787e60383e2e85b5cc23724cc";

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchQueryValue = document.querySelector("input").value;
  fetchApi(searchQueryValue);
});

async function fetchApi(searchQueryValue) {
  const baseUrl = `https://api.edamam.com/search?q=${searchQueryValue}&app_id=${API_ID}&app_key=${API_KEY}&from=0&to=20`;
  const response = await fetch(baseUrl);
  const data = await response.json();

  generateHtml(data.hits);
}

function generateHtml(data) {
  for (let i = 0; i < data.length; i++) {
    let searchItemContainer = document.createElement("div");
    searchItemContainer.classList.add("searchItemContainer");

    let recipeImage = document.createElement("img");
    recipeImage.src = data[i].recipe.image;
    recipeImage.alt = "recipe-Image";

    let searchDetailContainer = document.createElement("div");
    searchDetailContainer.classList.add("searchDetailContainer");

    let recipeName = document.createElement("h1");
    recipeName.textContent = data[i].recipe.label;

    let recipeCalorie = document.createElement("p");
    recipeCalorie.textContent = `Calories: ${Math.round(
      data[i].recipe.calories
    )}`;

    let viewRecipe = document.createElement("a");
    viewRecipe.textContent = "View";
    viewRecipe.href = data[i].recipe.url;

    searchDetailContainer.appendChild(recipeName);
    searchDetailContainer.appendChild(recipeCalorie);
    searchDetailContainer.appendChild(viewRecipe);

    searchItemContainer.appendChild(recipeImage);
    searchItemContainer.appendChild(searchDetailContainer);

    searchResultContainer.appendChild(searchItemContainer);
  }
}
