const currentUser = localStorage.getItem("currentUser");
const cartKey = `cart_${currentUser}`;
const favoriteKey = `favorites_${currentUser}`;
let allRecipes=[]
async function loadRecipes(){
    let res=await fetch("https://foodiez-api2.onrender.com/recipes");
    let data= await res.json();
   allRecipes=data;
    displayRecipes(allRecipes);
}
loadRecipes();
function searchRecipe(){
  let text=document.getElementById("search").value.toLowerCase();
   let filtered=allRecipes.filter(recipe=>
     recipe.name.toLowerCase().includes(text)
   );
   displayRecipes(filtered);

}
function displayRecipes(recipes){
  let container =document.getElementById("recipe-container");

  container.innerHTML="";
  recipes.forEach((recipe)=>{
container.innerHTML+=`
  <div class="recipe-card">
  <img src="${recipe.image}" alt="${recipe.name}">
  <h2>${recipe.name}</h2>
  <p class="desc">${recipe.description}</p>
  <div class="details">
  <span class="price"><i class="bi bi-currency-rupee"></i> ${recipe.price}</span>
  <span class="rating"><i class="bi bi-star-fill"></i>${recipe.rating}</span>
  <span class="time"><i class="bi bi-clock-fill"></i>${recipe.time}</span>
  </div>
  <div class="btns">
<button class="fav-btn" onclick="addtofavorite('${recipe.id}')">
    Add to Favorites ❤️
</button>

<button class="cart-btn" onclick="addtocart('${recipe.id}')">
    Add to Cart 🛒
</button>

<button class="order-btn" onclick="ordernow('${recipe.name}')">
    <i class="bi bi-truck"></i> Order Now
</button>
</div>  
  </div>
  `
  })
  
}


function ordernow(name){
  alert(`🎉  ${name} Order Placed Successfully!`)
}
function addtofavorite(id){
  fetch(`https://foodiez-api2.onrender.com/recipes/${id}`)
  .then(res=>res.json())
  .then(recipe=>{
    let favorites=JSON.parse(localStorage.getItem(favoriteKey)) || [];
    let exists=favorites.some(item=>item.id===recipe.id)
    if(exists){
    alert("❤️Already added to favorites!")
    return
    }
    favorites.push(recipe);
    localStorage.setItem(favoriteKey,JSON.stringify(favorites))
    alert(`❤️ ${recipe.name} added to Favorites!`);
  })
}
function addtocart(id){
  fetch(`https://foodiez-api2.onrender.com/recipes/${id}`)
  .then(res=>res.json())
  .then(recipe=>{
    let cart=JSON.parse(localStorage.getItem(cartKey))||[];
    let exists=cart.some(item=>item.id===recipe.id)
    if(exists){
      alert("🛒Already added to cart")
      return;
    }
    cart.push(recipe);
    localStorage.setItem(cartKey,JSON.stringify(cart))
    alert(`🛒${recipe.name} added to cart!`)
  })

}