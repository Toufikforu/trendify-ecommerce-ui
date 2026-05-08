document.addEventListener("DOMContentLoaded", function () {
  const wishlistBody = document.getElementById("wishlistBody");

  function updateEmptyWishlist() {
    if (!wishlistBody) return;

    const rows = wishlistBody.querySelectorAll(".wishlist-row");

    if (rows.length === 0) {
      wishlistBody.innerHTML = `
        <tr class="empty-cart-row">
          <td colspan="5">
            Your wishlist is empty. <a href="shop.html">Continue shopping</a>.
          </td>
        </tr>
      `;
    }
  }

  function updateCartCountDisplay() {
    const cart = JSON.parse(localStorage.getItem("trendifyCart")) || [];
    const cartCount = document.getElementById("cartCount");
    const cartLink = document.querySelector(".header-icon[href='cart.html']");

    const totalItems = cart.reduce(function (total, item) {
      return total + Number(item.quantity || 0);
    }, 0);

    if (cartCount) {
      cartCount.innerText = totalItems;

      if (totalItems > 0) {
        cartCount.classList.add("has-cart-items");
      } else {
        cartCount.classList.remove("has-cart-items");
      }
    }

    if (cartLink) {
      if (totalItems > 0) {
        cartLink.classList.add("has-cart-items");
      } else {
        cartLink.classList.remove("has-cart-items");
      }
    }
  }

  function addToCartFromWishlist(button) {
    const product = {
      id: button.dataset.id,
      name: button.dataset.name,
      price: Number(button.dataset.price),
      image: button.dataset.image,
      quantity: 1
    };

    let cart = JSON.parse(localStorage.getItem("trendifyCart")) || [];

    const existingProduct = cart.find(function (item) {
      return item.id === product.id;
    });

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push(product);
    }

    localStorage.setItem("trendifyCart", JSON.stringify(cart));
    updateCartCountDisplay();

    const row = button.closest("tr");
    if (row) row.remove();

    updateEmptyWishlist();
    alert(product.name + " added to cart and removed from wishlist");
  }

  document.addEventListener("click", function (event) {
    const addButton = event.target.closest(".wishlist-add-cart");
    const removeButton = event.target.closest(".remove-wishlist-item");

    if (addButton) {
      event.preventDefault();
      addToCartFromWishlist(addButton);
    }

    if (removeButton) {
      event.preventDefault();

      const row = removeButton.closest("tr");
      if (row) row.remove();

      updateEmptyWishlist();
    }
  });

  updateCartCountDisplay();
});