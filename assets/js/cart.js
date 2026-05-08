// =====================================================
// LOCAL STORAGE CART SCRIPT START
// =====================================================

let cart = JSON.parse(localStorage.getItem("trendifyCart")) || [];

function saveCart() {
  localStorage.setItem("trendifyCart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cartCount = document.getElementById("cartCount");

  if (cartCount) {
    const totalItems = cart.reduce(function(total, item) {
      return total + item.quantity;
    }, 0);

    cartCount.innerText = totalItems;

    if (totalItems > 0) {
      cartCount.classList.add("has-items");
    } else {
      cartCount.classList.remove("has-items");
    }
  }
}

function addToCart(product) {
  const existingProduct = cart.find(function(item) {
    return item.id === product.id;
  });

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push(product);
  }

  saveCart();

  alert(`${product.name} added to cart`);
}

document.querySelectorAll(".add-to-cart").forEach(function(button) {
  button.addEventListener("click", function() {
    const product = {
      id: this.dataset.id,
      name: this.dataset.name,
      price: Number(this.dataset.price),
      image: this.dataset.image,
      quantity: 1
    };

    addToCart(product);
  });
});

function loadCartPage() {
  const cartBody = document.getElementById("cartBody");

  if (!cartBody) return;

  cartBody.innerHTML = "";

  if (cart.length === 0) {
    cartBody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center py-5">
          Your cart is empty. <a href="shop.html">Continue shopping</a>.
        </td>
      </tr>
    `;

    updateCartTotal();
    return;
  }

  cart.forEach(function(item) {
    const subtotal = item.price * item.quantity;

    cartBody.innerHTML += `
      <tr>
        <td>
          <div class="cart-product">
            <img src="${item.image}" alt="${item.name}">
            <div>
              <h5>${item.name}</h5>
              <span>Product ID: ${item.id}</span>
            </div>
          </div>
        </td>

        <td>$${item.price.toFixed(2)}</td>

        <td>
          <input 
            type="number" 
            value="${item.quantity}" 
            min="1" 
            class="cart-qty"
            onchange="changeQuantity('${item.id}', this.value)"
          >
        </td>

        <td>$${subtotal.toFixed(2)}</td>

        <td>
          <button class="remove-btn" onclick="removeFromCart('${item.id}')">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });

  updateCartTotal();
}

function changeQuantity(id, quantity) {
  const item = cart.find(function(product) {
    return product.id === id;
  });

  if (item) {
    item.quantity = Math.max(1, Number(quantity));
  }

  saveCart();
  loadCartPage();
}

function removeFromCart(id) {
  cart = cart.filter(function(item) {
    return item.id !== id;
  });

  saveCart();
  loadCartPage();
}

function updateCartTotal() {
  const subtotalBox = document.getElementById("cartSubtotal");
  const shippingBox = document.getElementById("cartShipping");
  const taxBox = document.getElementById("cartTax");
  const totalBox = document.getElementById("cartTotal");

  if (!subtotalBox || !totalBox) return;

  const subtotal = cart.reduce(function(sum, item) {
    return sum + item.price * item.quantity;
  }, 0);

  const shipping = subtotal > 0 ? 15 : 0;
  const tax = subtotal > 0 ? 8.50 : 0;
  const total = subtotal + shipping + tax;

  subtotalBox.innerText = `$${subtotal.toFixed(2)}`;
  totalBox.innerText = `$${total.toFixed(2)}`;

  if (shippingBox) {
    shippingBox.innerText = `$${shipping.toFixed(2)}`;
  }

  if (taxBox) {
    taxBox.innerText = `$${tax.toFixed(2)}`;
  }
}

updateCartCount();
loadCartPage();

// =====================================================
// LOCAL STORAGE CART SCRIPT END
// =====================================================
