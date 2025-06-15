// main.js - WDM Studios

document.addEventListener("DOMContentLoaded", () => {
  // Live search filter
  const searchInput = document.querySelector(".search-input");
  const products = document.querySelectorAll(".product");

  if (searchInput) {
    searchInput.addEventListener("keyup", (e) => {
      const term = e.target.value.toLowerCase();
      products.forEach((product) => {
        const match = product.textContent.toLowerCase().includes(term);
        product.style.display = match ? "block" : "none";
      });
    });
  }

  // Cart count system (dummy version)
  let cartCount = 0;
  const cartCounter = document.querySelector(".cart-count");

  document.querySelectorAll(".product").forEach((product) => {
    product.addEventListener("click", () => {
      cartCount++;
      if (cartCounter) {
        cartCounter.textContent = `Cart (${cartCount})`;
      }
      showToast("Added to cart");
    });
  });

  // Burger menu toggle (for mobile nav)
  const burger = document.querySelector(".burger");
  const sidebar = document.querySelector(".sidebar");

  if (burger && sidebar) {
    burger.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }

  // Smooth scroll to top on checkout
  const checkoutLink = document.querySelector(".checkout-link");
  if (checkoutLink) {
    checkoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Auto-hide top bar
  const topBar = document.querySelector(".top-bar");
  if (topBar) {
    setTimeout(() => {
      topBar.style.opacity = "0";
      topBar.style.pointerEvents = "none";
    }, 5000); // hides after 5 seconds
  }

  // Update year in footer
  const footer = document.querySelector("footer p");
  if (footer) {
    const year = new Date().getFullYear();
    footer.innerHTML = `&copy; ${year} WDM Studios. A Collection for the Collective.`;
  }

  // Toast message function
  function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 100);
    setTimeout(() => {
      toast.classList.remove("show");
      toast.addEventListener("transitionend", () => toast.remove());
    }, 2000);
  }
});
