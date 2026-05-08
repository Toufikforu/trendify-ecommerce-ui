// =====================================================
// SHOP FILTER AND SORT SCRIPT START
// =====================================================

const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");
const sortProducts = document.getElementById("sortProducts");
const productGrid = document.getElementById("shopProductGrid");
const productCount = document.getElementById("productCount");

function getProductItems() {
  return Array.from(document.querySelectorAll(".shop-product-item"));
}

function updateProductCount(count) {
  if (productCount) {
    productCount.innerText = `Showing ${count} Product${count === 1 ? "" : "s"}`;
  }
}

function filterByPrice() {
  if (!priceRange) return;

  const maxPrice = Number(priceRange.value);
  const products = getProductItems();
  let visibleCount = 0;

  if (priceValue) {
    priceValue.innerText = `Price: $0 - $${maxPrice}`;
  }

  products.forEach(function(product) {
    const productPrice = Number(product.dataset.price);

    if (productPrice <= maxPrice) {
      product.style.display = "block";
      visibleCount++;
    } else {
      product.style.display = "none";
    }
  });

  updateProductCount(visibleCount);
}

function sortShopProducts() {
  if (!sortProducts || !productGrid) return;

  const selectedSort = sortProducts.value;
  const products = getProductItems();

  if (selectedSort === "low-high") {
    products.sort(function(a, b) {
      return Number(a.dataset.price) - Number(b.dataset.price);
    });
  }

  if (selectedSort === "high-low") {
    products.sort(function(a, b) {
      return Number(b.dataset.price) - Number(a.dataset.price);
    });
  }

  if (selectedSort === "latest") {
    products.sort(function(a, b) {
      return Number(b.dataset.latest) - Number(a.dataset.latest);
    });
  }

  if (selectedSort === "default") {
    products.sort(function(a, b) {
      return Number(a.dataset.latest) - Number(b.dataset.latest);
    });
  }

  products.forEach(function(product) {
    productGrid.appendChild(product);
  });

  filterByPrice();
}

if (priceRange) {
  priceRange.addEventListener("input", filterByPrice);
}

if (sortProducts) {
  sortProducts.addEventListener("change", sortShopProducts);
}

filterByPrice();

// =====================================================
// SHOP FILTER AND SORT SCRIPT END
// =====================================================
