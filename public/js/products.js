// Function to handle search
function searchProducts() {
    const query = document.getElementById('search').value.toLowerCase();
    const products = document.querySelectorAll('.product-item');

    products.forEach(product => {
        const name = product.getAttribute('data-name');
        if (name.includes(query)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Function to handle file upload
document.getElementById('uploadForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', document.getElementById('fileInput').files[0]);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            renderUploadedFile(result.file);
        } else {
            alert('Failed to upload file.');
        }
    } catch (error) {
        console.error('Error uploading file:', error);
        alert('An error occurred. Please try again.');
    }
});

// Function to render uploaded file
function renderUploadedFile(file) {
    const uploadedFilesDiv = document.getElementById('uploadedFiles');
    const fileElement = document.createElement('div');
    fileElement.className = 'uploaded-file';

    if (file.type.startsWith('image/')) {
        fileElement.innerHTML = `<img src="${file.url}" alt="Uploaded Image">`;
    } else if (file.type.startsWith('video/')) {
        fileElement.innerHTML = `<video controls src="${file.url}"></video>`;
    }

    uploadedFilesDiv.appendChild(fileElement);
}

// Function to add product to cart
function addToCart(productId, productName, productPrice) {
    const cart = document.getElementById('cart');
    let cartItem = document.querySelector(`.cart-item[data-id='${productId}']`);

    if (cartItem) {
        // If the product is already in the cart, update the quantity
        const quantityInput = cartItem.querySelector('input[name="quantity"]');
        quantityInput.value = parseInt(quantityInput.value) + 1;
    } else {
        // If the product is not in the cart, add a new item
        cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.setAttribute('data-id', productId);
        cartItem.setAttribute('data-price', productPrice);
        cartItem.innerHTML = `
            <h3>${productName}</h3>
            <p>Price: ₹${productPrice}</p>
            <label for="quantity-${productId}">Quantity:</label>
            <input type="number" id="quantity-${productId}" name="quantity" min="1" value="1" onchange="updateTotalPrice()">
            <button onclick="removeFromCart('${productId}')">Remove</button>
        `;
        cart.appendChild(cartItem);
    }

    document.getElementById('buyButton').style.display = 'block';
    updateTotalPrice();
}

// Function to remove product from cart
function removeFromCart(productId) {
    const cartItem = document.querySelector(`.cart-item[data-id='${productId}']`);
    if (cartItem) {
        cartItem.remove();
    }
    if (document.querySelectorAll('.cart-item').length === 0) {
        document.getElementById('buyButton').style.display = 'none';
    }
    updateTotalPrice();
}

// Function to update total price
function updateTotalPrice() {
    const cartItems = document.querySelectorAll('.cart-item');
    let totalPrice = 0;

    cartItems.forEach(item => {
        const price = parseFloat(item.getAttribute('data-price'));
        const quantity = parseInt(item.querySelector('input[name="quantity"]').value);
        totalPrice += price * quantity;
    });

    document.getElementById('totalPrice').innerText = `Total Price: ₹${totalPrice.toFixed(2)}`;
}

// Function to open buy popup
function openBuyPopup() {
    document.getElementById('buyPopup').style.display = 'block';
}

// Function to close buy popup
function closeBuyPopup() {
    document.getElementById('buyPopup').style.display = 'none';
}

// Function to handle buying items
function buyNow() {
    const cartItems = document.querySelectorAll('.cart-item');
    const cart = [];

    cartItems.forEach(item => {
        const productId = item.getAttribute('data-id');
        const quantity = item.querySelector('input[name="quantity"]').value;
        cart.push({ productId, quantity });
    });

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const payment = document.getElementById('payment').value;

    // Send cart data and user details to the server
    fetch('/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cart, name, address, phone, payment })
    })
        .then(response => response.json())
        .then(data => {
            alert('Order placed successfully!');
            document.getElementById('cart').innerHTML = '';
            document.getElementById('buyButton').style.display = 'none';
            closeBuyPopup();
            // Reload the admin dashboard to reflect the new order
            fetch('/admin/reload-orders', {
                method: 'POST'
            });
        })
        .catch(error => {
            console.error('Error placing order:', error);
            alert('An error occurred. Please try again.');
        });
}

// Function to apply coupon
function applyCoupon() {
    const enteredCode = document.getElementById('couponCode').value;
    const storedCouponCode = localStorage.getItem('couponCode'); // Retrieve coupon code from local storage

    if (enteredCode === storedCouponCode) {
        // Example: Apply a 25% discount
        const totalPriceElement = document.getElementById('totalPrice');
        let totalPrice = parseFloat(totalPriceElement.textContent.replace('Total Price: ₹', ''));
        const discount = totalPrice * 0.25;
        totalPrice -= discount;
        totalPriceElement.textContent = `Total Price: ₹${totalPrice.toFixed(2)}`;
        alert('Coupon applied successfully!');
    } else {
        alert('Invalid coupon code.');
    }
}

// Open and close the request popup
function openRequestPopup() {
  document.getElementById('requestPopup').style.display = 'block';
}

function closeRequestPopup() {
  document.getElementById('requestPopup').style.display = 'none';
}

// Handle product request submission
document.getElementById('requestForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const formData = new FormData();
  formData.append('name', document.getElementById('requestName').value);
  formData.append('price', document.getElementById('requestPrice').value);
  formData.append('maker', document.getElementById('requestMaker').value);
  formData.append('image', document.getElementById('requestImage').files[0]);

  try {
    const response = await fetch('/api/product-requests', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('Product request submitted successfully!');
      closeRequestPopup();
    } else {
      alert('Failed to submit product request.');
    }
  } catch (error) {
    console.error('Error submitting product request:', error);
    alert('An error occurred. Please try again.');
  }
});
