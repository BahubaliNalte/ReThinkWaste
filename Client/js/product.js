// Data for the products
const products = [
    { id: 1, name: 'Glasses', price: 300, image: './assets/products/glasses.webp' },
    { id: 2, name: 'Bag', price: 250, image: './assets/products/Bag.webp' },
    { id: 3, name: 'Key Stand', price: 70, image: './assets/products/keys.webp' },
    { id: 4, name: 'PhotoFrame', price: 200, image: './assets/products/photoframe.jpg' },
    { id: 5, name: 'Bag', price: 350, image: './assets/products/bag.jpg' },
];

// Cart array to ./assets/products
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
                <p>₹${item.price}</p>
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
            <p>₹${product.price}</p>
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


// Select the Buy Now button
const buyNowButton = document.getElementById('buy-now');

// Function to handle the Buy Now button click
function buyNow() {
    if (cart.length === 0) {
        alert('Your cart is empty. Add some items before checking out!');
        return;
    }

    // Display a confirmation message
    alert('Thank you for your purchase! Your order has been placed.');

    // Clear the cart
    cart = [];
    updateCart();
}

// Event listener for the Buy Now button
buyNowButton.addEventListener('click', buyNow);

// Select DOM elements
const fileInput = document.getElementById('file-input');
const previewContainer = document.getElementById('preview-container');
const placeholderText = document.getElementById('placeholder-text');
const uploadButton = document.getElementById('upload-button');

// Handle file selection
fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];

    // Clear previous preview
    previewContainer.innerHTML = '';

    // Check if a file is selected
    if (!file) {
        placeholderText.style.display = 'block';
        return;
    }

    // Hide placeholder text
    placeholderText.style.display = 'none';

    // Check if the file is an image or video
    const fileType = file.type;
    if (fileType.startsWith('image/')) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.alt = 'Preview of uploaded image';
        previewContainer.appendChild(img);
    } else if (fileType.startsWith('video/')) {
        const video = document.createElement('video');
        video.src = URL.createObjectURL(file);
        video.controls = true;
        video.alt = 'Preview of uploaded video';
        previewContainer.appendChild(video);
    } else {
        placeholderText.style.display = 'block';
        placeholderText.textContent = 'Unsupported file type.';
    }
});

// Handle upload button click
uploadButton.addEventListener('click', () => {
    if (!fileInput.files.length) {
        alert('Please select a file to upload.');
        return;
    }

    // Simulate an upload process
    alert('File uploaded successfully!');
    console.log('File uploaded:', fileInput.files[0]);

    // Clear the input and preview after upload
    fileInput.value = '';
    previewContainer.innerHTML = '<p id="placeholder-text">No file selected yet. Your preview will appear here.</p>';
});
