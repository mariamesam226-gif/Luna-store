/* =========================
   HERO SLIDER
========================= */

let currentSlide = 0;

const slides = document.querySelectorAll(".slide");

function showSlide(index) {

  if (index >= slides.length) {
    currentSlide = 0;
  } else {
    currentSlide = index;
  }

  slides.forEach(slide => {
    slide.classList.remove("active");
  });

  slides[currentSlide].classList.add("active");
}

setInterval(() => {
  showSlide(currentSlide + 1);
}, 5000);


/* =========================
   MOBILE MENU
========================= */

function toggleMenu() {

  const nav = document.getElementById("nav");

  nav.classList.toggle("show");
}


document.querySelectorAll(".nav a").forEach(link => {

  link.addEventListener("click", () => {

    document.getElementById("nav").classList.remove("show");

  });

});


/* =========================
   CART
========================= */

let cart = [];


function addToCart(name, price) {

  const existingProduct = cart.find(
    item => item.name === name
  );

  if (existingProduct) {

    existingProduct.quantity += 1;

  } else {

    cart.push({
      name: name,
      price: price,
      quantity: 1
    });

  }

  updateCart();

  showToast("تمت إضافة المنتج إلى السلة 🛒");
}


function updateCart() {

  const cartItems =
    document.getElementById("cartItems");

  const cartCount =
    document.getElementById("cart-count");

  const footerCartCount =
    document.getElementById("footer-cart-count");

  const cartTotal =
    document.getElementById("cartTotal");


  let totalQuantity = 0;
  let totalPrice = 0;


  cart.forEach(item => {

    totalQuantity += item.quantity;

    totalPrice +=
      item.price * item.quantity;

  });


  cartCount.textContent = totalQuantity;

  footerCartCount.textContent = totalQuantity;

  cartTotal.textContent = totalPrice;


  if (cart.length === 0) {

    cartItems.innerHTML =
      `<p class="empty-cart">
        السلة فارغة 🛒
      </p>`;

    return;
  }


  cartItems.innerHTML = "";


  cart.forEach((item, index) => {

    const cartItem =
      document.createElement("div");

    cartItem.className = "cart-item";


    cartItem.innerHTML = `

      <div class="cart-item-info">

        <h4>${item.name}</h4>

        <span class="cart-item-price">
          $${item.price}
        </span>

      </div>


      <div class="quantity-controls">

        <button onclick="decreaseQuantity(${index})">
          −
        </button>

        <span>
          ${item.quantity}
        </span>

        <button onclick="increaseQuantity(${index})">
          +
        </button>

      </div>


      <button
        class="delete-item"
        onclick="removeFromCart(${index})">

        🗑️

      </button>

    `;


    cartItems.appendChild(cartItem);

  });

}


function increaseQuantity(index) {

  cart[index].quantity += 1;

  updateCart();
}


function decreaseQuantity(index) {

  cart[index].quantity -= 1;


  if (cart[index].quantity <= 0) {

    cart.splice(index, 1);

  }


  updateCart();
}


function removeFromCart(index) {

  cart.splice(index, 1);

  updateCart();

  showToast("تم حذف المنتج من السلة");
}


function openCart() {

  document
    .getElementById("cartModal")
    .classList.add("show");

}


function closeCart() {

  document
    .getElementById("cartModal")
    .classList.remove("show");

}


document
  .getElementById("cartModal")
  .addEventListener("click", function(event) {

    if (event.target === this) {

      closeCart();

    }

  });


function checkout() {

  if (cart.length === 0) {

    showToast("السلة فارغة 🛒");

    return;
  }


  showToast("تم إرسال طلبك بنجاح 🎉");


  cart = [];

  updateCart();


  setTimeout(() => {

    closeCart();

  }, 1200);

}


/* =========================
   TOAST
========================= */

function showToast(message) {

  const toast =
    document.getElementById("toast");

  toast.textContent = message;

  toast.classList.add("show");


  setTimeout(() => {

    toast.classList.remove("show");

  }, 2000);

}


/* =========================
   FILTER PRODUCTS
========================= */

function filterProducts(category) {

  const products =
    document.querySelectorAll(".product-card");

  let visibleProducts = 0;


  products.forEach(product => {

    const productCategory =
      product.getAttribute("data-category");


    if (
      category === "all" ||
      productCategory === category
    ) {

      product.style.display = "block";

      visibleProducts++;

    } else {

      product.style.display = "none";

    }

  });


  document.getElementById("noProducts").style.display =
    visibleProducts === 0
      ? "block"
      : "none";


  document.getElementById("searchInput").value = "";


  document
    .getElementById("products")
    .scrollIntoView({
      behavior: "smooth"
    });

}


/* =========================
   SEARCH
========================= */

function searchProducts() {

  const searchValue =
    document
      .getElementById("searchInput")
      .value
      .trim()
      .toLowerCase();


  const products =
    document.querySelectorAll(".product-card");


  let visibleProducts = 0;


  products.forEach(product => {

    const productName =
      product
        .getAttribute("data-name")
        .toLowerCase();


    if (
      productName.includes(searchValue)
    ) {

      product.style.display = "block";

      visibleProducts++;

    } else {

      product.style.display = "none";

    }

  });


  document.getElementById("noProducts").style.display =
    visibleProducts === 0
      ? "block"
      : "none";

}


/* =========================
   START CART
========================= */

updateCart();