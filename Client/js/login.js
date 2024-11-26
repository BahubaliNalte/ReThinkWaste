// Simulated User Database
const users = [];

// Toggle Forms
document.getElementById('show-signup').addEventListener('click', () => {
    document.querySelector('.auth-container').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', () => {
    document.querySelector('.auth-container').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
});

// Handle Signup
document.getElementById('signup-button').addEventListener('click', () => {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const role = document.getElementById('signup-role').value;

    if (name && email && password) {
        users.push({ name, email, password, role });
        alert('Signup successful! You can now log in.');
        document.querySelector('.auth-container').style.display = 'block';
        document.getElementById('signup-form').style.display = 'none';
    } else {
        alert('Please fill in all fields!');
    }
});

// Handle Login
document.getElementById('login-button').addEventListener('click', () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        if (user.role === 'admin') {
            alert('Welcome Admin! Redirecting to Admin Dashboard...');
            window.location.href = 'admin.html'; // Admin Dashboard
        } else {
            alert('Welcome Customer! Redirecting to Customer Dashboard...');
            window.location.href = 'index.html'; // Customer Dashboard
        }
    } else {
        alert('Invalid email or password!');
    }
});
