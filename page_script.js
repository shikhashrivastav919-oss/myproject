const products = [
  {
    id: 1,
    name: "ASUS Vivobook 14",
    brand: "Asus",
    price: 15999,
    discount: 2,
    rating: 4.3,
    reviews: 120,
    images: [
       "aasu.jpg.jpeg",
      "asuss.jpg.jpeg",
      "asuus.jpg.jpeg"
    ]
  },

{
    id: 2,
    name: "Lenovo LOQ Gen 10",
    brand: "Lenovo",
    price: 15500,
    discount: 10,
    rating: 4.4,
    reviews: 90,
    images: [
      "Lenovoo.jpg.jpeg",
      "Lenovoa.jpg.jpeg",
      "Lenovoe.jpg.jpeg",
      "Lenovol.jpg.jpeg",
    ]
  },

  {
    id: 3,
    name: "Macbook 14 pro ",
    brand: "iPhone",
    price: 20999,
    discount: 3,
    rating: 4.1,
    reviews: 98,
    images: [
      "aaple.jpg.jpeg",
      "apple.jpg.jpeg",
      "applle.jpg.jpeg",
      
    ]
  },
  {
    id: 4,
    name: "HP 15, 13th Gen",
    brand: "Hp",
    price: 13000,
    discount: 12,
    rating: 4.0,
    reviews: 110,
    images: [
      "hp.jpg.jpeg",
      "hpp.jpg.jpeg",
      "hhp.jpg.jpeg"
    ]
  },
  {
    id: 5,
    name: "Samsung Galaxy Book4",
    brand: "Samsung",
    price: 15999,
    discount: 5,
    rating: 4.8,
    reviews: 450,
    images: [
      "Samsung.jpg.jpeg",
      "Samsungg.jpg.jpeg",
      "Samsunng.jpg.jpeg",
    ]
  },
  {
    id: 6,
    name: "Victus 15 Gaming Laptop",
    brand: " Vistus",
    price: 13599,
    discount: 20,
    rating: 3.9,
    reviews: 150,
    images: [
      "victus.jpg.jpeg",
      "victuss.jpg.jpeg",
      "victtus.jpg.jpeg"
    ]
  },
  {
    id: 7,
    name: "Xiaomi Notebook Ultra",
    brand: "Redime",
    price: 12999,
    discount: 18,
    rating: 4.2,
    reviews: 175,
    images: [
      "Xiaomix.jpg.jpeg",
      "Xiaomii.jpg.jpeg",
      "Xiaomiii.jpg.jpeg",
    ]
  },
  {
    id: 8,
    name: "Lenovo LOQ Gen 10",
    brand: "Lenovo",
    price: 15500,
    discount: 10,
    rating: 4.4,
    reviews: 90,
    images: [
      "Lenovol.jpg.jpeg",
      "Lenovoo.jpg.jpeg",
      "Lenovoa.jpg.jpeg",
      "Lenovoe.jpg.jpeg"
    ]
  },
  {
    id: 9,
    name: "Dell 16 Plus Laptop",
    brand: "Dell",
    price: 12000,
    discount: 8,
    rating: 4.5,
    reviews: 130,
    images: [
      "Dell.jpg.jpeg",
      "Delll.jpg.jpeg",
      "Delle.jpg.jpeg",
    ]
  },
];

const sliderIntervals = {};

let wishlist = [];
let filteredProducts = [...products];

const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");

/* ================= RENDER ================= */
function renderProducts(data) {
  productList.innerHTML = "";

  if (data.length === 0) {
    productList.innerHTML = `<div class="no-product">😕 No product found</div>`;
    return;
  }

  productList.classList.toggle("single", data.length === 1);

  data.forEach(p => {
    const liked = wishlist.includes(p.id);

    const discountedPrice = Math.round(
      p.price - (p.price * p.discount / 100)
    );

    const imagesHTML = p.images.map(
      (img, i) => `<img src="/static/${img}" class="${i === 0 ? "active" : ""}">`
    ).join("");

    const dotsHTML = p.images.map(
      (_, i) => `<span class="${i === 0 ? "active" : ""}" onclick="changeSlide(${p.id},${i})"></span>`
    ).join("");

    productList.innerHTML += `
      <div class="card">

        <span class="heart" onclick="toggleWishlist(${p.id})">
          <i class="${liked ? "fa-solid" : "fa-regular"} fa-heart"
             style="color:${liked ? "red" : "#000"}"></i>
        </span>

        <div class="slider" id="slider-${p.id}">
          ${imagesHTML}
          <div class="slider-dots">${dotsHTML}</div>
        </div>

        <span class="label">Excellent</span>
        <h3>${p.name}</h3>

        <div class="rating">
          <i class="fa fa-star"></i> ${p.rating} (${p.reviews})
        </div>

        <div class="price">
          <span>₹${discountedPrice.toLocaleString()}</span>
          <del>₹${p.price.toLocaleString()}</del>
        </div>

        <button><i class="fa fa-cart-shopping"></i> Add to Cart</button>
      </div>
    `;

    autoSlide(p.id, p.images.length);
  });
}

/* ================= SLIDER ================= */
function changeSlide(id, index) {
  const slider = document.getElementById(`slider-${id}`);
  const imgs = slider.querySelectorAll("img");
  const dots = slider.querySelectorAll(".slider-dots span");

  imgs.forEach((img, i) => img.classList.toggle("active", i === index));
  dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
}

function autoSlide(id, total) {
  if (sliderIntervals[id]) {
    clearInterval(sliderIntervals[id]);
  }

  let index = 0;

  sliderIntervals[id] = setInterval(() => {
    index = (index + 1) % total;
    changeSlide(id, index);
  }, 3000);
}

/* ================= WISHLIST ================= */
function toggleWishlist(id) {
  wishlist.includes(id)
    ? wishlist = wishlist.filter(w => w !== id)
    : wishlist.push(id);

  renderProducts(filteredProducts);
}

/* ================= SEARCH ================= */
searchInput.addEventListener("input", () => {
  const val = searchInput.value.toLowerCase();
  filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(val)
  );
  renderProducts(filteredProducts);
});

function applyFilters() {
  const min = Number(document.getElementById("minPrice").value) || 0;
  const max = Number(document.getElementById("maxPrice").value) || Infinity;

  const selectedBrands = Array.from(
    document.querySelectorAll(".brandFilter:checked")
  ).map(cb => cb.value);

  filteredProducts = products.filter(p => {
    const finalPrice = p.price - (p.price * p.discount / 100);

    const priceMatch = finalPrice >= min && finalPrice <= max;

    const brandMatch =
      selectedBrands.length === 0 || selectedBrands.includes(p.brand);

    return priceMatch && brandMatch;
  });

  renderProducts(filteredProducts);
}

function toggleFilter() {
  document.getElementById("filterMenu")
          .classList.toggle("active");
}

/* ================= INIT ================= */
renderProducts(products);
