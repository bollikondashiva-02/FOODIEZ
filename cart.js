const currentUser = localStorage.getItem("currentUser");

const cartKey = `cart_${currentUser}`;

let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

displayCart(cart);

function displayCart(data){

    let container=document.getElementById("cart-container");

    container.innerHTML="";

    if(data.length==0){

        container.innerHTML=`
        <h2 class="empty">
            🛒 Your Cart is Empty
        </h2>
        `;

        return;
    }

    data.forEach(recipe=>{

        container.innerHTML+=`

        <div class="cart-card">

            <img src="${recipe.image}" alt="${recipe.name}">

            <h2>${recipe.name}</h2>

            <p>${recipe.description ||recipe.famousDish}</p>

          ${recipe.price ? `<h3>₹ ${recipe.price}</h3>` : ""}

            <p>⭐ ${recipe.rating}</p>

           <p>⏰ ${recipe.time || recipe.deliveryTime}</p>
            <div class="btns">
            <button
                class="remove-btn"
                onclick="removeCart('${recipe.id}','${recipe.name.replace(/'/g, "\\'")}')">

                Remove 🛒

            </button>
            <button class="order-now"
             onclick="ordernow('${recipe.name.replace(/'/g, "\\'")}')">
            OrderNow <i class="bi bi-truck"></i>   
            </button>
            </div>

        </div>

        `;
    });

}

function searchCart(){

    let text=document
    .getElementById("search")
    .value
    .toLowerCase();

    let filtered=cart.filter(recipe=>

        recipe.name.toLowerCase().includes(text)

    );

    displayCart(filtered);

}

function removeCart(id,name){

    cart=cart.filter(recipe=>recipe.id!=id);

    localStorage.setItem(cartKey,JSON.stringify(cart));

    alert(`${name} Removed From Cart 🛒`);

    displayCart(cart);

}
function ordernow(name){
  alert(`🎉 ${name} Ordered Successfully! 🚚`);
}