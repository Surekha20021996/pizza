// Global cart and order status
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0.00;

// Add item to cart
function addToCart(pizzaName, price) {
    cart.push({ name: pizzaName, price: price });
    totalPrice += price;

    // Update cart in local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalPrice', totalPrice.toFixed(2));

    displayCart();
}

// Display cart items on checkout page
function displayCart() {
    const cartDiv = document.getElementById('cart');
    const totalPriceDiv = document.getElementById('total-price');

    cartDiv.innerHTML = '';
    cart.forEach((item, index) => {
        cartDiv.innerHTML += `<p>${item.name} - $${item.price.toFixed(2)} <button onclick="removeFromCart(${index})">Remove</button></p>`;
    });

    totalPriceDiv.innerText = `$${totalPrice.toFixed(2)}`;
}

// Remove item from cart
function removeFromCart(index) {
    totalPrice -= cart[index].price;
    cart.splice(index, 1);

    // Update cart in local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalPrice', totalPrice.toFixed(2));

    displayCart();
}

// Filter menu based on dietary preferences
function filterMenu() {
    const filter = document.getElementById('dietary-filter').value;
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        const diet = item.getAttribute('data-diet');
        item.style.display = (filter === 'all' || diet === filter) ? 'block' : 'none';
    });
}

// Simulate order processing
async function processOrder() {
    const email = document.getElementById('email').value;
    const paymentMethod = document.getElementById('payment-method').value;
    const orderStatus = document.getElementById('order-status');

    if (!email) {
        alert('Please provide an email for order updates.');
        return;
    }

    // Clear local storage on order placement
    localStorage.removeItem('cart');
    localStorage.removeItem('totalPrice');

    // Simulate real-time order processing
    await updateOrderStatus('Order Received...', email);
    await delay(2000);  // Simulate 2 seconds delay
    await updateOrderStatus('Preparing Pizza...', email);
    await delay(3000);  // Simulate 3 seconds delay
    await updateOrderStatus('Pizza is on the way!', email);
    await delay(3000);  // Simulate another 3 seconds delay
    await updateOrderStatus('Pizza Delivered! Enjoy your meal!', email);
    
    // Clear cart and reset price
    cart = [];
    totalPrice = 0.00;
    displayCart();
}

// Update order status and notify user via email
async function updateOrderStatus(status, email) {
    const orderStatus = document.getElementById('order-status');
    orderStatus.innerText = status;
    await sendNotification(email, status);
}

// Simulate sending email notification (in a real app, this would be an API call)
async function sendNotification(email, message) {
    console.log(`Notification sent to ${email}: ${message}`);
}

// Helper function to create a delay (used for simulating async operations)
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// On document ready, display the cart (if there are items stored)
document.addEventListener('DOMContentLoaded', function() {
    displayCart();
});
