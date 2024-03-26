let iconCart = document.querySelector(".iconCart");
let listProduct = document.querySelector(".listProduct");
let listCartHTML = document.querySelector(".listCart");
let cartTab = document.querySelector(".cartTab");
let header = document.querySelector(".header");
let body = document.querySelector(".body");
let showCart = document.querySelector(".hello");
let closeCart = document.querySelector(".close");
let listProductHTML = document.querySelector(".listProduct");
let iconCartSpan = document.querySelector(".iconCart span");

let listProducts = [];
let carts = [];

iconCart.addEventListener("click", () => {
  showCart.classList.toggle("showCart");
});

closeCart.addEventListener("click", () => {
  showCart.classList.remove("showCart");
});

const addDataToHTML = () => {
  listProductHTML.innerHTML = "";
  if (listProducts.length > 0) {
    listProducts.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("item");
      newProduct.dataset.id = product.id;
      newProduct.innerHTML = `
            <img src="${product.image}" alt="">
            <h2>${product.name}</h2>
            <div class="price">$${product.price}</div>
            <button class="addCart">Add to cart</button>
            `;
      listProductHTML.appendChild(newProduct);
    });
  }
};

listProductHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains("addCart")) {
    let product_id = positionClick.parentElement.dataset.id;
    addToCart(product_id);
  }
});

const addToCart = (product_id) => {
  let positionThisProductInCart = carts.findIndex(
    (value) => value.product_id == product_id
  );
  if (carts.length <= 0) {
    carts = [
      {
        product_id: product_id,
        quantity: 1,
      },
    ];
  } else if (positionThisProductInCart < 0) {
    carts.push({
      product_id: product_id,
      quantity: 1,
    });
  } else {
    carts[positionThisProductInCart].quantity += 1;
  }
  addCartToHTML();
  addCartToMemory();
};

let addCartToMemory = () => {
  localStorage.setItem("carts", JSON.stringify(carts));
};

const addCartToHTML = () => {
  listCartHTML.innerHTML = "";
  let totalQuantity = 0;

  if (carts.length > 0) {
    carts.forEach((cart) => {
      totalQuantity += cart.quantity;

      let newCart = document.createElement("div");
      newCart.classList.add("item");
      newCart.dataset.id = cart.product_id;

      let positionProduct = listProducts.findIndex(
        (value) => value.id == cart.product_id
      );

      let info = listProducts[positionProduct];
      newCart.innerHTML = `
      
          <div class="image">
            <img src="${info.image}" alt="">
          </div>
          <div class="name">
               ${info.name}
          </div>
          <div class="totalPrice">
               ${info.price * cart.quantity}
          </div>
          <div class="quantity">
                  <span class="minus">-</span>
                  <span>${cart.quantity}</span>
                  <span class="plus">+</span>
                 
          </div>
       
  `;
      listCartHTML.appendChild(newCart);
    });
  }

  iconCartSpan.innerText = totalQuantity;
};

listCartHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (
    positionClick.classList.contains("minus") ||
    positionClick.classList.contains("plus")
  ) {
    let product_id = positionClick.parentElement.parentElement.dataset.id;
    let type = "minus";
    if (positionClick.classList.contains("plus")) {
      type = "plus";
    }
    changeQuantity(product_id, type);
  }
});

let changeQuantity = (product_id, type) => {
  let positionProduct = carts.findIndex(
    (value) => value.product_id == product_id
  );
  if (type == "minus") {
    carts[positionProduct].quantity -= 1;
  } else if (type == "plus") {
    carts[positionProduct].quantity += 1;
  }

  if (carts[positionProduct].quantity <= 0) {
    carts.splice(positionProduct, 1);
  }

  addCartToHTML();
  addCartToMemory();
};

const initApp = () => {
  fetch("./products.json")
    .then((Response) => Response.json())
    .then((data) => {
      listProducts = data;
      addDataToHTML();

      if (localStorage.getItem("carts")) {
        carts = JSON.parse(localStorage.getItem("carts"));
        addCartToHTML();
      }
    });
};
initApp();
