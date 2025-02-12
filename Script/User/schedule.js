


let cartItems = [];

// Function to set a reminder
function setReminder(city, location, time) {
    const reminder = { city, location, time };
    cartItems.push(reminder);
    updateCartCount();
}

// Function to update the cart count displayed on the cart icon
function updateCartCount() {
    document.getElementById('cart-count').textContent = cartItems.length;
}

// Function to update the cart items list displayed in the modal
function updateCartItems() {
    const cartItemsList = document.getElementById('cart-items');
    cartItemsList.innerHTML = '';

    cartItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.city} - ${item.location} at ${item.time}`;

        // Create a remove button for each reminder
        const removeBtn = document.createElement('button');
        removeBtn.textContent = '×';
        removeBtn.style.marginLeft = '10px';
        removeBtn.style.backgroundColor = '#e74c3c'; // Red color for the remove button
        removeBtn.style.color = 'white';
        removeBtn.style.border = 'none';
        removeBtn.style.borderRadius = '50%';
        removeBtn.style.cursor = 'pointer';

        removeBtn.addEventListener('click', () => {
            removeReminder(index);
        });

        li.appendChild(removeBtn);
        cartItemsList.appendChild(li);
    });
}

// Function to remove a reminder from the cart
function removeReminder(index) {
    cartItems.splice(index, 1);
    updateCartCount();
    updateCartItems();
}

// Show the cart modal on click
document.getElementById('cart-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default anchor action
    const cartModal = document.getElementById('cart-modal');
    updateCartItems();
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
});

// Handle the Set Reminder button clicks
document.querySelectorAll('.reminder-btn').forEach(button => {
    button.addEventListener('click', function() {
        const city = this.getAttribute('data-city');
        const location = this.getAttribute('data-location');
        const time = this.getAttribute('data-time');
        setReminder(city, location, time);
    });
});
