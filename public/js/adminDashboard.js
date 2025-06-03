document.addEventListener('DOMContentLoaded', async () => {
    await loadProducts();
    await loadOrders();

    document.getElementById('productForm').addEventListener('submit', async function (event) {
        event.preventDefault();
        const formData = new FormData(this);
        const productId = formData.get('productId');
        const url = productId ? `/api/products/${productId}` : '/api/products';
        const method = productId ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                body: formData
            });

            if (response.ok) {
                await loadProducts();
                this.reset();
            } else {
                alert('Failed to save product.');
            }
        } catch (error) {
            console.error('Error saving product:', error);
            alert('An error occurred. Please try again.');
        }
    });
});

async function loadProducts() {
    try {
        const response = await fetch('/api/products');
        const products = await response.json();
        const productTableBody = document.getElementById('productTableBody');
        productTableBody.innerHTML = '';

        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.description}</td>
            <td><img src="${product.imageUrl}" alt="${product.name}" width="100"></td>
            <td>
              <button onclick="editProduct('${product._id}')">Edit</button>
              <button onclick="deleteProduct('${product._id}')">Delete</button>
            </td>
          `;
            productTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

async function loadOrders() {
    try {
        const response = await fetch('/api/orders');
        const orders = await response.json();
        const orderTableBody = document.getElementById('orderTableBody');
        orderTableBody.innerHTML = '';

        orders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${order.name}</td>
            <td>${order.address}</td>
            <td>${order.phone}</td>
            <td>${order.payment}</td>
            <td>${order.cart.map(item => `Product ID: ${item.productId}, Quantity: ${item.quantity}`).join('<br>')}</td>
          `;
            orderTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading orders:', error);
    }
}

async function editProduct(productId) {
    try {
        const response = await fetch(`/api/products/${productId}`);
        const product = await response.json();
        document.getElementById('productId').value = product._id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productDescription').value = product.description;
        // Handle image editing if needed
    } catch (error) {
        console.error('Error editing product:', error);
    }
}

async function deleteProduct(productId) {
    try {
        const response = await fetch(`/api/products/${productId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            await loadProducts();
        } else {
            alert('Failed to delete product.');
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        alert('An error occurred. Please try again.');
    }
}
