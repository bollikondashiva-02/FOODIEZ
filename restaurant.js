const currentUser = localStorage.getItem("currentUser");
const cartKey = `cart_${currentUser}`;
let allRestaurants=[];
async function loadRestaurants(){
    let res=await fetch("https://foodiez-api2.onrender.com/restaurants");
    let data=await res.json();
    allRestaurants=data;
    displayRestaurants(allRestaurants);
}
loadRestaurants();
function searchRestaurants(){
 let text=document.getElementById("search").value.toLowerCase();
 let filtered=allRestaurants.filter(restaurant=>
    restaurant.name.toLowerCase().includes(text)
 );
 displayRestaurants(filtered)
}
function displayRestaurants(restaurants){

    let container = document.getElementById("restaurant-container");
    container.innerHTML = "";

    restaurants.forEach(restaurant => {

        container.innerHTML += `
        <div class="restaurant-card">

            <img src="${restaurant.image}">

            <h2>${restaurant.name}</h2>

            <p>🍛 ${restaurant.famousDish}</p>

            <p>⭐ ${restaurant.rating}</p>

            <p>📍 ${restaurant.location}</p>

            <p>🚚 ${restaurant.deliveryTime}</p>

            <div class="btns">

                <button class="cart-btn" onclick="addtocart('${restaurant.id}')">
                    Add to Cart 🛒
                </button>

                <button class="order-btn" data-name="${restaurant.name}">
                    Order Now <i class="bi bi-truck"></i>
                </button>

            </div>

        </div>
        `;

    });

    
    document.querySelectorAll(".order-btn").forEach(button => {
        button.addEventListener("click", function () {
            ordernow(this.dataset.name);
        });
    });
}
  
function ordernow(name){
     alert(`🎉  ${name} Order Placed Successfully!`)
}
function addtocart(id){
    fetch(`https://foodiez-api2.onrender.com/restaurants/${id}`)
    .then(res=>res.json())
    .then(restaurant=>{
        let cart=JSON.parse(localStorage.getItem(cartKey))||[]
        let exists=cart.some(item=>item.id===restaurant.id);
        if(exists){
          alert("🛒Already added to cart");
          return;
        }
       cart.push({
      id: restaurant.id,
      name: restaurant.name,
      image: restaurant.image,
      description: restaurant.famousDish,
      price: "",
      rating: restaurant.rating,
     time: restaurant.deliveryTime
});
         localStorage.setItem(cartKey,JSON.stringify(cart))
         alert(`🛒${restaurant.name} added to cart!`)
    })
}
