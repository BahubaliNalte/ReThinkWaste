      // Get the modal
      var modal = document.getElementById("myModal");

      // Get the button that opens the modal
      var btn = document.getElementById("pickup");

      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName("close")[0];

      // When the user clicks the button, open the modal
      btn.onclick = function () {
        modal.style.display = "block";
      }

      // When the user clicks on <span> (x), close the modal
      span.onclick = function () {
        modal.style.display = "none";
      }

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }



document.querySelector('.schedule-pickup-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = {
        name: document.querySelector('.name').value,
        email: document.querySelector('.email').value,
        phone: document.querySelector('.phone').value,
        datePickup: document.querySelector('.date_pickup').value,
        timePickup: document.querySelector('.time_pickup').value,
        addressPickup: document.querySelector('.address_pickup').value,
        extraNotes: document.querySelector('.extra_notes').value,
        wasteType: document.querySelector('.waste_type').value,
        quantity: document.querySelector('.quantity').value,
    };

    try {
        const response = await fetch('http://localhost:3000/api/pickup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const result = await response.json();
            alert('Pickup scheduled successfully! \nCongratulation you got coupan code "DISCOUNT25" ');
        } else {
            alert('Failed to schedule pickup.');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred. Please try again.');
    }
});
