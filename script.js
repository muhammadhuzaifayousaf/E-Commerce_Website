// Sample product data
const products = [
    { id: 1, name: "Redmi 9 Prime", price: 499.99, image: "https://via.placeholder.com/150", discount: 10 },
    { id: 2, name: "Refrigerator", price: 1299.99, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Apple iPhone 11", price: 699.99, image: "https://via.placeholder.com/150" },
    { id: 4, name: "4K UHD TV", price: 899.99, image: "https://via.placeholder.com/150", discount: 15 },
    { id: 5, name: "Smart AC", price: 599.99, image: "https://via.placeholder.com/150" },
    { id: 6, name: "Microwave Oven", price: 249.99, image: "https://via.placeholder.com/150", discount: 5 },
];

let cart = [];

// DOM elements
const productsContainer = document.getElementById("products");
const cartContainer = document.getElementById("cart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const cartButton = document.getElementById("cartButton");
const checkoutButton = document.getElementById("checkoutButton");
const toggleThemeButton = document.getElementById("toggleTheme");
const hamburgerMenu = document.querySelector(".hamburger-menu");
const navMenu = document.querySelector("nav ul");

// Display products
function displayProducts() {
    productsContainer.innerHTML = products.map(product => `
        <div class="product">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            ${product.discount ? `<p class="discount">-${product.discount}% OFF</p>` : ''}
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join("");
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
}

// Update cart display
function updateCart() {
    cartCount.textContent = cart.length;
    cartItems.innerHTML = cart.map(item => `
        <li>
            ${item.name} - $${item.price.toFixed(2)}
            <button onclick="removeFromCart(${cart.indexOf(item)})">Remove</button>
        </li>
    `).join("");
    cartTotal.textContent = cart.reduce((total, item) => total + item.price, 0).toFixed(2);
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Toggle cart visibility
cartButton.addEventListener("click", () => {
    cartContainer.classList.toggle("hidden");
});

// Checkout
checkoutButton.addEventListener("click", () => {
    alert(`Thank you for your purchase! Total: $${cartTotal.textContent}`);
    cart = [];
    updateCart();
    cartContainer.classList.add("hidden");
});

// Toggle theme
toggleThemeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
});

// Toggle hamburger menu
hamburgerMenu.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

// Close mobile menu when a link is clicked
document.querySelectorAll("nav ul li a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });
});

// Initialize
displayProducts();
updateCart();

// Responsive design
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove("active");
    }
});

// Search functionality
const searchInput = document.querySelector(".search-bar input");
const searchButton = document.querySelector(".search-bar button");

searchButton.addEventListener("click", performSearch);
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        performSearch();
    }
});

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
    displayFilteredProducts(filteredProducts);
}

function displayFilteredProducts(filteredProducts) {
    productsContainer.innerHTML = filteredProducts.map(product => `
        <div class="product">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            ${product.discount ? `<p class="discount">-${product.discount}% OFF</p>` : ''}
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join("");
}