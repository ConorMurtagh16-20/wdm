document.addEventListener("DOMContentLoaded", () => {
  const cartTable = document.querySelector(".cart-table tbody");
  const subtotalEl = document.querySelector(".subtotal-amount");
  const checkoutBtn = document.querySelector(".checkout-btn");
  const tosCheck = document.querySelector("#tos-check");
  const cartCountEl = document.getElementById("cart-count");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartTable.innerHTML = ""; // Clear existing

    let subtotal = 0;
    let totalItems = 0;

    cart.forEach((item, index) => {
      const row = document.createElement("tr");
      row.classList.add("cart-item");

      const total = item.price * item.quantity;
      subtotal += total;
      totalItems += item.quantity;

      row.innerHTML = `
        <td><img src="${item.img}" class="cart-thumb" alt="${item.name}"></td>
        <td>
          <strong>${item.name}</strong><br>${item.size}<br>
          <a href="#" class="remove-link" data-index="${index}">Remove</a>
        </td>
        <td>€${item.price.toFixed(2)}</td>
        <td><input type="number" class="qty-input" value="${item.quantity}" min="1" data-index="${index}"></td>
        <td>€${total.toFixed(2)}</td>
      `;

      cartTable.appendChild(row);
    });

    subtotalEl.textContent = `€${subtotal.toFixed(2)}`;
    cartCountEl.textContent = totalItems;
  }

  // Delegate qty change
  document.addEventListener("input", (e) => {
    if (e.target.classList.contains("qty-input")) {
      const i = e.target.dataset.index;
      cart[i].quantity = parseInt(e.target.value);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }
  });

  // Delegate removal
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-link")) {
      e.preventDefault();
      const i = e.target.dataset.index;
      cart.splice(i, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }
  });

  // TOS checkbox
  if (tosCheck) {
    checkoutBtn.disabled = true;
    tosCheck.addEventListener("change", () => {
      checkoutBtn.disabled = !tosCheck.checked;
      checkoutBtn.style.opacity = tosCheck.checked ? "1" : "0.5";
    });
  }

  // Save contact info & go to checkout
  checkoutBtn.addEventListener("click", () => {
    const contactInput = document.getElementById("contact-info");
    const contactValue = contactInput?.value.trim();

    if (!contactValue) {
      alert("Please enter your contact info (Discord, Instagram, or email).");
      return;
    }

    localStorage.setItem("contactInfo", contactValue);
    window.location.href = "checkout.html";
  });

  // Keyboard shortcut "C" to checkout
  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "c" && tosCheck?.checked) {
      window.location.href = "checkout.html";
    }
  });

  renderCart();
});
