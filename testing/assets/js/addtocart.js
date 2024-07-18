// Sample product data
const products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 },
];

// Function to display products
function displayProducts() {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('col-md-4');
        productElement.innerHTML = `
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">$${product.price}</p>
            <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
          </div>
        </div>
      `;
        productList.appendChild(productElement);
    });
}

// Function to add item to cart
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Function to display cart items
function displayCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.forEach(item => {
        const cartItemElement = document.createElement('li');
        cartItemElement.classList.add('list-group-item');
        cartItemElement.innerHTML = `
        ${item.name} - $${item.price} x ${item.quantity}
        <button class="btn btn-danger btn-sm float-right" onclick="del(${item.id})">Remove</button>
      `;
        cartItems.appendChild(cartItemElement);
    });

    // Add event listeners for remove buttons\


}
function del(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Function to remove item from cart
// function removeFromCart(productId) {
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];
//     cart = cart.filter(item => item.id !== productId);
//     localStorage.setItem('cart', JSON.stringify(cart));
//     displayCart();
// }

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();

    document.getElementById('product-list').addEventListener('click', event => {
        if (event.target.classList.contains('add-to-cart')) {
            const productId = parseInt(event.target.dataset.id);
            addToCart(productId);
        }
    });

    displayCart();

    document.getElementById('checkout').addEventListener('click', () => {
        localStorage.removeItem('cart');
        displayCart();
        alert('Checkout successful!');
    });
});
