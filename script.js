let cart = [];
let total = 0;

function addToCart(product, price) {
    cart.push({product, price});
    total += price;
    updateCart();
}

function updateCart() {
    const cartElement = document.getElementById('cart');
    cartElement.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = ${item.product} - ${item.price} جنيه;
        cartElement.appendChild(li);
    });
    document.getElementById('total').textContent = total;
}

function checkout() {
    if(cart.length === 0){
        alert("السلة فارغة!");
        return;
    }
    alert(تم الدفع! الإجمالي: ${total} جنيه);
    cart = [];
    total = 0;
    updateCart();
}
