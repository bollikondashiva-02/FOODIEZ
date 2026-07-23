
const currentUser = localStorage.getItem("currentUser");
const favoriteKey = `favorites_${currentUser}`;
let favorites = JSON.parse(localStorage.getItem(favoriteKey)) || [];
displayFavorites(favorites);
function displayFavorites(data) {
    let container = document.getElementById("favorite-container");
    container.innerHTML = "";

    if (data.length === 0) {
        container.innerHTML = `
            <h2 style="grid-column:1/-1;text-align:center;color:orangered;">
                ❤️ No Favorite Recipes Found
            </h2>
        `;
        return;
    }

    data.forEach(recipe => {

        container.innerHTML += `
        <div class="recipe-card">

            <img src="${recipe.image}" alt="${recipe.name}">

            <h2>${recipe.name}</h2>

            <p>${recipe.description}</p>

            <h3>₹ ${recipe.price}</h3>

            <p>⭐ ${recipe.rating}</p>

            <p>⏰ ${recipe.time}</p>

            <button class="remove-btn"
                onclick="removefavorite('${recipe.id}', '${recipe.name}')">
                Remove ❤️
            </button>

        </div>
        `;
    });
}


function searchRecipe() {

    let text = document
        .getElementById("search")
        .value
        .toLowerCase();

    let filtered = favorites.filter(recipe =>
        recipe.name.toLowerCase().includes(text)
    );

    displayFavorites(filtered);
}


function removefavorite(id, name) {

    favorites = favorites.filter(recipe =>String(recipe.id) != String(id));

    localStorage.setItem(favoriteKey, JSON.stringify(favorites));

    alert(`${name} Removed from Favorites ❤️`);

    displayFavorites(favorites);
}