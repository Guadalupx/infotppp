let cart = [];
let cartTotal = 0;

function addToCart(productName, productPrice) {
    let product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity++;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    updateCart();
}

function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCart();
}

function updateCart() {
    let cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    cart.forEach(item => {
        let li = document.createElement('li');
        li.innerHTML = `
            ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
            <button onclick="removeFromCart('${item.name}')">Eliminar</button>
        `;
        cartItems.appendChild(li);
    });

    cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    document.getElementById('total-amount').innerText = cartTotal.toFixed(2);
    document.getElementById('ginita').innerText = cart.reduce((total, item) => total + item.quantity, 0);
}

function toggleCart() {
    let cartContainer = document.getElementById('cart-container');
    cartContainer.style.display = cartContainer.style.display === 'block' ? 'none' : 'block';
}

function checkout() {
    if (cart.length === 0) {
        alert("El carrito está vacío.");
        return;
    }
    alert(`Total a pagar: $${cartTotal.toFixed(2)}`);
    cart = [];
    updateCart();
}

function filterProducts() {
    let input = document.getElementById('search-input');
    let filter = input.value.toLowerCase();
    let products = document.querySelectorAll('.product');

    products.forEach(product => {
        let productName = product.querySelector('h4').innerText.toLowerCase();
        if (productName.includes(filter)) {
            product.style.display = '';
        } else {
            product.style.display = 'none';
        }
    });
}