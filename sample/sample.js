// EMAIL
function subscribe() {
  const email = document.querySelector("input").value;

  if (email === "") {
    alert("Enter your email!");
  } else {
    alert("Subscribed successfully 🔥");
  }
}
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// SCROLL ANIMATION
const elements = document.querySelectorAll('.fade-in');

function showOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  elements.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }
  });
}
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

// ADD TO CART
function addToCart(name, price, image) {
  const existing = cartItems.find(item => item.name === name);

  if (existing) {
    existing.qty++;
  } else {
    cartItems.push({ name, price, image, qty: 1 });
  }

  renderCart();
  openCart();
}
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}
function addToCart(name, price, image) {
  const existing = cartItems.find(item => item.name === name);

  if (existing) {
    existing.qty++;
  } else {
    cartItems.push({ name, price, image, qty: 1 });
  }

  saveCart();
  renderCart();
  openCart();
}

// RENDER CART
function renderCart() {
  const container = document.querySelector(".cart-items");
  const totalEl = document.getElementById("total");

  container.innerHTML = "";

  let total = 0;

  cartItems.forEach((item, index) => {
    total += item.price * item.qty;

    container.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}">
        
        <div class="cart-info">
          <p>${item.name}</p>
          <small>$${item.price}</small>

          <div class="qty-controls">
            <button onclick="changeQty(${index}, -1)">-</button>
            <span>${item.qty}</span>
            <button onclick="changeQty(${index}, 1)">+</button>
          </div>
        </div>

        <span class="remove" onclick="removeItem(${index})">✕</span>
      </div>
    `;
  });

  totalEl.textContent = total;
}

// CHANGE QUANTITY
function changeQty(index, change) {
  cartItems[index].qty += change;

  if (cartItems[index].qty <= 0) {
    cartItems.splice(index, 1);
  }

  renderCart();
}

function changeQty(index, change) {
  cartItems[index].qty += change;

  if (cartItems[index].qty <= 0) {
    cartItems.splice(index, 1);
  }

  saveCart();
  renderCart();
}

// REMOVE ITEM
function removeItem(index) {
  cartItems.splice(index, 1);
  renderCart();
}
function removeItem(index) {
  cartItems.splice(index, 1);

  saveCart();
  renderCart();
}


// CART OPEN/CLOSE
const cart = document.querySelector(".cart-drawer");
const overlay = document.querySelector(".overlay");

function openCart() {
  cart.classList.add("active");
  overlay.classList.add("active");
}

function closeCart() {
  cart.classList.remove("active");
  overlay.classList.remove("active");
}



window.addEventListener('scroll', showOnScroll);
window.addEventListener('load', showOnScroll);
window.addEventListener("load", () => {
  renderCart();
});