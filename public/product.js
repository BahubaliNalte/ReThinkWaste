// Data for the products
const products = [
    { id: 1, name: 'Product 1', price: 10, image: 'product1.jpg' },
    { id: 2, name: 'Product 2', price: 20, image: 'product2.jpg' },
    { id: 3, name: 'Product 3', price: 30, image: 'product3.jpg' },
    { id: 4, name: 'Product 4', price: 40, image: 'product4.jpg' },
    { id: 5, name: 'Product 4', price: 40, image: 'product4.jpg' },
    { id: 6, name: 'Product 4', price: 40, image: 'product4.jpg' },
    { id: 7, name: 'Product 4', price: 40, image: 'product4.jpg' },
    { id: 8, name: 'Product 4', price: 40, image: 'product4.jpg' },
    { id: 9, name: 'Product 4', price: 40, image: 'product4.jpg' },
    { id: 10, name: 'Product 4', price: 40, image: 'product4.jpg' },
];

// Cart array to store items
let cart = [];

// Select DOM elements
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElem = document.getElementById('total-price');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const searchInput = document.getElementById('search-input');
const productContainer = document.querySelector('.products');

// Function to update the cart display
function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="info">
                <h4>${item.name}</h4>
                <p>$${item.price}</p>
                <p>Quantity: <input type="number" value="${item.quantity}" min="1" data-id="${item.id}" class="quantity-input"></p>
            </div>
            <button data-id="${item.id}" class="remove-item">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
    });
    totalPriceElem.textContent = total.toFixed(2);
}

// Function to add a product to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

// Function to remove an item from the cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Function to filter products based on the search term
function searchProducts(query) {
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase())
    );
    displayProducts(filteredProducts);
}

// Function to display products
function displayProducts(productList) {
    productContainer.innerHTML = '';
    productList.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.setAttribute('data-id', product.id);
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button class="add-to-cart">Add to Cart</button>
        `;
        productContainer.appendChild(productDiv);
    });
}

// Event listeners for Add to Cart buttons
productContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const productId = parseInt(e.target.closest('.product').dataset.id);
        addToCart(productId);
    }
});

// Event listener for removing items
cartItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item')) {
        const productId = parseInt(e.target.dataset.id);
        removeFromCart(productId);
    }
});

// Event listener for changing item quantities
cartItemsContainer.addEventListener('input', (e) => {
    if (e.target.classList.contains('quantity-input')) {
        const productId = parseInt(e.target.dataset.id);
        const quantity = parseInt(e.target.value);
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            updateCart();
        }
    }
});

// Event listener for search input
searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    searchProducts(query);
});

// Display all products initially
displayProducts(products);
