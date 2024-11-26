// Sample products data (this could be fetched from a database in a real application)
const products = [
    { id: 1, name: 'Glasses', price: 300, image: './assets/products/glasses.webp' },
    { id: 2, name: 'Bag', price: 250, image: './assets/products/Bag.webp' },
    { id: 3, name: 'Key Stand', price: 70, image: './assets/products/keys.webp' },
    { id: 4, name: 'PhotoFrame', price: 200, image: './assets/products/photoframe.jpg' },
    { id: 5, name: 'Bag', price: 350, image: './assets/products/bag.jpg' },
];

// Sample cart data (this could also be dynamic)
let cart = [
    { id: 1, name: 'Glasses', price: 300, quantity: 2, image: './assets/products/glasses.webp' },
    { id: 2, name: 'Bag', price: 250, quantity: 1, image: './assets/products/Bag.webp' },
];

// Select DOM elements
const productListContainer = document.getElementById('product-list');
const cartItemsList = document.getElementById('cart-items-list');
const addProductButton = document.getElementById('add-product-button');

// Function to display products (Admin Panel)
function displayProducts() {
    productListContainer.innerHTML = ''; // Clear previous products
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" width="50">
            <div>${product.name} - ₹${product.price}</div>
            <button onclick="removeProduct(${product.id})">Delete</button>
            <button onclick="editProduct(${product.id})">Edit</button>
        `;
        productListContainer.appendChild(productDiv);
    });
}

// Function to display cart items (Frontend UI)
function displayCartItems() {
    cartItemsList.innerHTML = ''; // Clear previous cart items
    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="50">
            <div>${item.name} - ₹${item.price} x ${item.quantity}</div>
            <button onclick="removeFromCart(${item.id})">Remove</button>
            <button onclick="updateQuantity(${item.id})">Update Quantity</button>
        `;
        cartItemsList.appendChild(cartItemDiv);
    });
}

// Function to remove a product (Admin Panel)
function removeProduct(productId) {
    const productIndex = products.findIndex(product => product.id === productId);
    if (productIndex !== -1) {
        products.splice(productIndex, 1);
        displayProducts();
        updateCartProductList();  // Update cart UI
    }
}

// Function to edit a product (Admin Panel)
function editProduct(productId) {
    const product = products.find(product => product.id === productId);
    if (product) {
        const newName = prompt("Edit product name:", product.name);
        const newPrice = prompt("Edit product price:", product.price);
        product.name = newName || product.name;
        product.price = newPrice || product.price;
        displayProducts();
        updateCartProductList();  // Update cart UI
    }
}

// Function to remove an item from the cart (Frontend UI)
function removeFromCart(itemId) {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
        displayCartItems();
    }
}

// Function to update the quantity of a cart item (Frontend UI)
function updateQuantity(itemId) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        const newQuantity = prompt("Update quantity:", item.quantity);
        if (newQuantity && !isNaN(newQuantity) && newQuantity > 0) {
            item.quantity = newQuantity;
            displayCartItems();
        }
    }
}

// Function to add a new product (Admin Panel)
addProductButton.addEventListener('click', () => {
    const name = prompt("Enter product name:");
    const price = prompt("Enter product price:");
    const image = prompt("Enter product image URL:");

    if (name && price && image) {
        const newProduct = {
            id: products.length + 1,
            name: name,
            price: parseFloat(price),
            image: image
        };
        products.push(newProduct);
        displayProducts();
        updateCartProductList();  // Update cart UI
    }
});

// Function to update cart UI after product changes
function updateCartProductList() {
    cart.forEach(item => {
        const updatedProduct = products.find(product => product.id === item.id);
        if (updatedProduct) {
            item.name = updatedProduct.name;
            item.price = updatedProduct.price;
        }
    });
    displayCartItems(); // Re-render the cart items with updated products
}

// Initialize
displayProducts();
displayCartItems();
