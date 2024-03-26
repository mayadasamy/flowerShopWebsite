let listCart = [];
let totalQuantityHTML = document.querySelector(" .totalQuantity");
let totalPriceHTML = document.querySelector(".totalPrice");
let listCartHTML = document.querySelector(".returnCart .list");


function checkCart(){
    let cookieValue = document.cookie
    .split(';')
    .find(row => row.startsWith('listCart='));
    if (cookieValue) {
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }
}

checkCart();
addCartToHTML();

function addCartToHTML() {
    listCartHTML.innerHTML = "";
    let totalQuantity = 0;
    let totalPrice = 0;

    if(listCart){
        listCart.forEach((product) => {
            if(product){
                let newP = document.createElement("div");
                newP.classList.add("item");
                newP.innerHTML = `
                <img src="${product.image}" alt="">
                        <div class="info">
                            <div class="name">${product.name}</div>
                            <div class="price">${product.price}</div>
                        </div>
                        <div class="quantity">${product.quantity}</div>
                        <div class="returnPrice">${product.price * product.quantity}</div>
                `;
                listCartHTML.appendChild(newP);
                totalQuantity += product.quantity;

            }
        })
    }
   
}