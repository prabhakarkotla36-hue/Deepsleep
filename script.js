const standardSizes = [
  ["6x2.5", "72x30", "6 ft", "30 in"],
  ["6x2.91", "72x35", "6 ft", "35 in"],
  ["6x3", "72x36", "6 ft", "36 in"],
  ["6x3.5", "72x42", "6 ft", "42 in"],
  ["6x4", "72x48", "6 ft", "48 in"],
  ["6x5", "72x60", "6 ft", "60 in"],
  ["6x5.5", "72x66", "6 ft", "66 in"],
  ["6x5.83", "72x70", "6 ft", "70 in"],
  ["6x6", "72x72", "6 ft", "72 in"],
  ["6.25x2.5", "75x30", "6.25 ft", "30 in"],
  ["6.25x2.91", "75x35", "6.25 ft", "35 in"],
  ["6.25x3", "75x36", "6.25 ft", "36 in"],
  ["6.25x3.5", "75x42", "6.25 ft", "42 in"],
  ["6.25x4", "75x48", "6.25 ft", "48 in"],
  ["6.25x5", "75x60", "6.25 ft", "60 in"],
  ["6.25x5.5", "75x66", "6.25 ft", "66 in"],
  ["6.25x5.83", "75x70", "6.25 ft", "70 in"],
  ["6.25x6", "75x72", "6.25 ft", "72 in"],
  ["6.5x2.5", "78x30", "6.5 ft", "30 in"],
  ["6.5x2.91", "78x35", "6.5 ft", "35 in"],
  ["6.5x3", "78x36", "6.5 ft", "36 in"],
  ["6.5x3.5", "78x42", "6.5 ft", "42 in"],
  ["6.5x4", "78x48", "6.5 ft", "48 in"],
  ["6.5x5", "78x60", "6.5 ft", "60 in"],
  ["6.5x5.5", "78x66", "6.5 ft", "66 in"],
  ["6.5x5.83", "78x70", "6.5 ft", "70 in"],
  ["6.5x6", "78x72", "6.5 ft", "72 in"]
];

const products = [
  {
    id: "cool-blush",
    name: "Deep Sleep Cool Blush Mattress",
    category: "cooling",
    categoryLabel: "Cooling comfort",
    warranty: "2 years warranty",
    thicknesses: ["4 inch", "5 inch", "6 inch"],
    description: "A refreshing comfort mattress with softy cushioning and 32 cool foam for a lighter, cooler sleep feel.",
    layers: ["Knitted Fabric", "Softy", "32 Cool Foam", "Knitted Fabric"],
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=80",
    accent: "#49bdb3"
  },
  {
    id: "ortho-sleep",
    name: "Deep Ortho Sleep Mattress",
    category: "ortho",
    categoryLabel: "Orthopedic support",
    warranty: "5 years warranty",
    thicknesses: ["5 inch", "6 inch", "8 inch", "10 inch"],
    description: "A firm, dependable orthopedic build with knitted fabric, soft HR comfort, and a resilient rebond foam core.",
    layers: ["Knitted Fabric", "4 inch Soft Foam (HR + Softy)", "Rebond Foam"],
    image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=900&q=80",
    accent: "#f2544f"
  },
  {
    id: "ortho-memory",
    name: "Deep Sleep Ortho Memory Mattress",
    category: "memory",
    categoryLabel: "Memory comfort",
    warranty: "7 years warranty",
    thicknesses: ["5 inch", "6 inch", "8 inch", "10 inch"],
    description: "A layered orthopedic memory mattress that blends contouring comfort with HR foam support.",
    layers: ["Knitted Fabric", "Memory", "Softy", "HR Foam", "Softy", "Knitted Fabric"],
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80",
    accent: "#ffd65a"
  },
  {
    id: "latex-nirvana",
    name: "Deep Sleep Ortho Latex Nirvana Mattress",
    category: "latex",
    categoryLabel: "Latex nirvana",
    warranty: "10 years warranty",
    thicknesses: ["6 inch", "8 inch", "10 inch"],
    description: "The premium latex orthopedic option with latex comfort, softy layers, HR foam, and knitted fabric finishing.",
    layers: ["Knitted Fabric", "Latex", "Softy", "HR Foam", "Softy", "Knitted Fabric"],
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=900&q=80",
    accent: "#0f8f9a"
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
const specTabs = document.querySelector("#spec-tabs");
const specCategory = document.querySelector("#spec-category");
const specTitle = document.querySelector("#spec-title");
const specWarranty = document.querySelector("#spec-warranty");
const layerStrip = document.querySelector("#layer-strip");
const lengthFilter = document.querySelector("#length-filter");
const sizeTableHead = document.querySelector(".size-table thead tr");
const sizeTableBody = document.querySelector("#size-table-body");
const variantSummary = document.querySelector("#variant-summary");
const variantGrid = document.querySelector("#variant-grid");

let cart = (JSON.parse(localStorage.getItem("deepsleepCart")) || [])
  .filter((item) => products.some((product) => item.id.startsWith(product.id)));
let currentFilter = "all";
let activeSpecId = products[0].id;

function saveCart() {
  localStorage.setItem("deepsleepCart", JSON.stringify(cart));
}

function renderProducts() {
  const filteredProducts = currentFilter === "all"
    ? products
    : products.filter((product) => product.category === currentFilter);

  productGrid.innerHTML = filteredProducts.map((product) => `
    <article class="product-card reveal visible" data-category="${product.category}">
      <div class="product-image" style="background-image: linear-gradient(180deg, rgba(17, 29, 38, 0.05), rgba(17, 29, 38, 0.22)), url('${product.image}')"></div>
      <div class="product-body">
        <div class="product-meta">
          <p class="product-category">${product.categoryLabel}</p>
          <span>${product.warranty}</span>
        </div>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="thickness-list" aria-label="Available thicknesses for ${product.name}">
          ${product.thicknesses.map((thickness) => `<span>${thickness}</span>`).join("")}
        </div>
        <button class="primary-button" type="button" data-view-type="${product.id}">View Sizes</button>
      </div>
    </article>
  `).join("");
}

function renderSpecTabs() {
  specTabs.innerHTML = products.map((product) => `
    <button class="spec-tab ${product.id === activeSpecId ? "active" : ""}" type="button" data-spec="${product.id}">
      <span>${product.categoryLabel}</span>
      <strong>${product.name.replace("Deep Sleep ", "").replace("Deep ", "")}</strong>
    </button>
  `).join("");
}

function renderActiveSpec() {
  const product = products.find((item) => item.id === activeSpecId);

  specCategory.textContent = product.categoryLabel;
  specTitle.textContent = product.name;
  specWarranty.textContent = product.warranty;

  layerStrip.innerHTML = `
    <div class="thickness-panel">
      <span>Available thickness</span>
      <strong>${product.thicknesses.join(" / ")}</strong>
    </div>
    <ol>
      ${product.layers.map((layer, index) => `
        <li style="--layer-color: ${index % 2 === 0 ? product.accent : "#ffd65a"}">
          <span>${String(index + 1).padStart(2, "0")}</span>
          ${layer}
        </li>
      `).join("")}
    </ol>
  `;

  renderVariantCards();
  renderSizeTable();
  renderSpecTabs();
}

function getVisibleSizes() {
  return standardSizes.filter((size) => lengthFilter.value === "all" || size[1].startsWith(lengthFilter.value));
}

function getActiveVariants() {
  const product = products.find((item) => item.id === activeSpecId);

  return getVisibleSizes().flatMap(([feet, inches, lengthLabel, width], sizeIndex) =>
    product.thicknesses.map((thickness, thicknessIndex) => ({
      id: `${product.id}-${inches}-${thickness.replace(/\s+/g, "-")}`,
      productId: product.id,
      name: product.name,
      categoryLabel: product.categoryLabel,
      warranty: product.warranty,
      thickness,
      feet,
      inches,
      lengthLabel,
      width,
      image: product.image,
      layers: product.layers,
      accent: product.accent
    }))
  );
}

function renderVariantCards() {
  const product = products.find((item) => item.id === activeSpecId);
  const variants = getActiveVariants();

  variantSummary.innerHTML = `
    <strong>${variants.length} available variants</strong>
    <span>${product.name}: ${getVisibleSizes().length} sizes with ${product.thicknesses.length} thickness choices.</span>
  `;

  variantGrid.innerHTML = variants.map((variant) => `
    <article class="variant-card" style="--variant-accent: ${variant.accent}">
      <div class="variant-image" style="background-image: linear-gradient(180deg, rgba(17, 29, 38, 0.02), rgba(17, 29, 38, 0.32)), url('${variant.image}')">
        <span>${variant.thickness}</span>
        <strong>${variant.inches}</strong>
      </div>
      <div class="variant-body">
        <div class="variant-heading">
          <p class="product-category">${variant.categoryLabel}</p>
          <span>${variant.warranty}</span>
        </div>
        <h4>${variant.inches} ${variant.thickness}</h4>
        <p class="variant-name">${variant.name}</p>
        <dl class="variant-specs">
          <div>
            <dt>Dimensions</dt>
            <dd>${variant.inches}</dd>
          </div>
          <div>
            <dt>Feet size</dt>
            <dd>${variant.feet}</dd>
          </div>
          <div>
            <dt>Length</dt>
            <dd>${variant.lengthLabel}</dd>
          </div>
          <div>
            <dt>Width</dt>
            <dd>${variant.width}</dd>
          </div>
        </dl>
        <button class="primary-button" type="button" data-add-to-cart="${variant.id}">Enquire Variant</button>
      </div>
    </article>
  `).join("");
}

function renderSizeTable() {
  const product = products.find((item) => item.id === activeSpecId);
  const rows = getVisibleSizes();

  sizeTableHead.innerHTML = `
    <th scope="col">Feet</th>
    <th scope="col">Inches</th>
    ${product.thicknesses.map((thickness) => `<th scope="col">${thickness}</th>`).join("")}
  `;

  sizeTableBody.innerHTML = rows.map(([feet, inches, , width]) => `
    <tr>
      <td>${feet}</td>
      <td>${inches}<span>${width} width</span></td>
      ${product.thicknesses.map(() => `<td><span class="available-pill">Available</span></td>`).join("")}
    </tr>
  `).join("");
}

function renderCart() {
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  cartCountEl.textContent = itemCount;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p class="empty-cart">Your cart is waiting for its first mattress.</p>';
    return;
  }

  cartItemsEl.innerHTML = cart.map((item) => `
    <div class="cart-item">
      <div>
        <h3>${item.name}</h3>
        <p>${item.inches ? `${item.inches}, ${item.thickness}` : item.thicknesses.join(" / ")}</p>
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
  const variant = getActiveVariants().find((item) => item.id === productId);
  const product = variant || products.find((item) => item.id === productId);
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
  themeToggle.textContent = mode === "dark" ? "Day" : "Night";
  localStorage.setItem("deepsleepTheme", mode);
}

productGrid.addEventListener("click", (event) => {
  const typeButton = event.target.closest("[data-view-type]");
  if (typeButton) {
    activeSpecId = typeButton.dataset.viewType;
    renderActiveSpec();
    document.querySelector("#sizes").scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  const button = event.target.closest("[data-add-to-cart]");
  if (!button) return;
  addToCart(button.dataset.addToCart);
});

variantGrid.addEventListener("click", (event) => {
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

specTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-spec]");
  if (!button) return;
  activeSpecId = button.dataset.spec;
  renderActiveSpec();
});

lengthFilter.addEventListener("change", () => {
  renderVariantCards();
  renderSizeTable();
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
  formStatus.textContent = "Thanks! Deep Sleep will reach out shortly.";
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
renderActiveSpec();
renderCart();
setTheme(localStorage.getItem("deepsleepTheme") || "light");
initRevealAnimations();
