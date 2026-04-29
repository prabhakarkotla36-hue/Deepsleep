const products = [
  {
    id: "deepsleep-plush",
    name: "DeepSleep Plush",
    price: 899,
    firmness: "soft",
    description: "A pillow-soft feel with cooling gel foam for gentle pressure relief.",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "deepsleep-hybrid",
    name: "DeepSleep Hybrid",
    price: 1099,
    firmness: "medium",
    description: "Balanced support from pocket springs and contouring foam layers.",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "deepsleep-luxe",
    name: "DeepSleep Luxe",
    price: 1399,
    firmness: "medium",
    description: "Hotel-inspired comfort with breathable quilted cashmere-touch fabric.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "deepsleep-ortho",
    name: "DeepSleep Ortho",
    price: 1199,
    firmness: "hard",
    description: "Firm orthopedic support that keeps your spine aligned all night.",
    image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "deepsleep-breeze",
    name: "DeepSleep Breeze",
    price: 999,
    firmness: "soft",
    description: "Airflow channels and cool-touch foam for warm sleepers.",
    image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "deepsleep-elite",
    name: "DeepSleep Elite",
    price: 1599,
    firmness: "hard",
    description: "Our most supportive luxury build with reinforced edge stability.",
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=900&q=80"
  }
];

const productGrid = document.querySelector("#product-grid");
const filterButtons = document.querySelectorAll(".filter-button");
const cartButton = document.querySelector(".cart-button");
const cartDrawer = document.querySelector("#cart-drawer");
const closeCartButton = document.querySelector(".close-cart");
const cartItemsEl = document.querySelector("#cart-items");
const cartCountEl = document.querySelector("#cart-count");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("#nav-menu");
const themeToggle = document.querySelector(".theme-toggle");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

let cart = JSON.parse(localStorage.getItem("deepsleepCart")) || [];
let currentFilter = "all";

function saveCart() {
  localStorage.setItem("deepsleepCart", JSON.stringify(cart));
}

function renderProducts() {
  const filteredProducts = currentFilter === "all"
    ? products
    : products.filter((product) => product.firmness === currentFilter);

  productGrid.innerHTML = filteredProducts.map((product) => `
    <article class="product-card reveal visible" data-firmness="${product.firmness}">
      <div class="product-image" style="background-image: url('${product.image}')"></div>
      <div class="product-body">
        <div class="product-meta">
          <h3>${product.name}</h3>
        </div>
        <p>${product.description}</p>
        <button class="primary-button" type="button" data-add-to-cart="${product.id}">Add to Cart</button>
      </div>
    </article>
  `).join("");
}

function renderCart() {
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  cartCountEl.textContent = itemCount;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p class="empty-cart">Your cart is waiting for its first cloud.</p>';
    return;
  }

  cartItemsEl.innerHTML = cart.map((item) => `
    <div class="cart-item">
      <div>
        <h3>${item.name}</h3>
        <p>${item.firmness}</p>
      </div>
      <div class="qty-controls" aria-label="Quantity controls for ${item.name}">
        <button type="button" data-decrease="${item.id}" aria-label="Decrease ${item.name} quantity">-</button>
        <span>${item.quantity}</span>
        <button type="button" data-increase="${item.id}" aria-label="Increase ${item.name} quantity">+</button>
      </div>
    </div>
  `).join("");
}

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  renderCart();
  openCart();
}

function updateCartQuantity(productId, change) {
  const item = cart.find((cartItem) => cartItem.id === productId);
  if (!item) return;

  item.quantity += change;
  cart = cart.filter((cartItem) => cartItem.quantity > 0);
  saveCart();
  renderCart();
}

function openCart() {
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
}

function setTheme(mode) {
  document.body.classList.toggle("dark", mode === "dark");
  themeToggle.textContent = mode === "dark" ? "Sun" : "Moon";
  localStorage.setItem("deepsleepTheme", mode);
}

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add-to-cart]");
  if (!button) return;
  addToCart(button.dataset.addToCart);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((filterButton) => filterButton.classList.remove("active"));
    button.classList.add("active");
    currentFilter = button.dataset.filter;
    renderProducts();
  });
});

cartButton.addEventListener("click", openCart);
closeCartButton.addEventListener("click", closeCart);

cartDrawer.addEventListener("click", (event) => {
  if (event.target === cartDrawer) closeCart();

  const increaseButton = event.target.closest("[data-increase]");
  const decreaseButton = event.target.closest("[data-decrease]");

  if (increaseButton) updateCartQuantity(increaseButton.dataset.increase, 1);
  if (decreaseButton) updateCartQuantity(decreaseButton.dataset.decrease, -1);
});

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navMenu.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

themeToggle.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("dark") ? "light" : "dark";
  setTheme(nextTheme);
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "Thanks! A DeepSleep specialist will reach out shortly.";
  contactForm.reset();
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

function initRevealAnimations() {
  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
}

renderProducts();
renderCart();
setTheme(localStorage.getItem("deepsleepTheme") || "light");
initRevealAnimations();


