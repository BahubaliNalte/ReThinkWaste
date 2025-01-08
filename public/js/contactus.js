document.querySelector('.gform').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = {
        name: document.querySelector('.name').value,
        email: document.querySelector('.email').value,
        message: document.querySelector('.message').value,
    };

    try {
        const response = await fetch('http://localhost:3000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const result = await response.json();
            alert('Your message has been submitted successfully!');
            document.querySelector('.gform').reset(); // Clear form fields
        } else {
            alert('Failed to submit the form.');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred. Please try again.');
    }
});

