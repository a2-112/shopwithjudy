import { products } from "./product.js"
// This create an easy way to access each item container in html to avoid creating to many variables and If's
const categoryContainers = {
  home: document.getElementById("home"),
  dress: document.getElementById("dress"),
  it: document.getElementById("it"),
  shoe: document.getElementById("shoe"),
  bag: document.getElementById("bag"),
  utensil: document.getElementById("utensil"),
  beauty: document.getElementById("beauty"),
  jewelry: document.getElementById("jewelry"),
};

const saved = JSON.parse(localStorage.getItem("cart")) || []

/*====== DOM ====== */
const itemLink = document.querySelector(".items-link");
const dialog = document.querySelector("dialog");
const views = document.getElementById("recent");
const itemContainer = document.getElementById("items-con");
const modal = document.getElementById("modal-content");
const closeModal = document.getElementById("close-modal");
const cart = document.getElementById("cart");
const cartLink = document.querySelector(".cart-link");
const cartTotal = document.getElementById("cart-total");
const input = document.querySelector('input[type="search"]');
const search = document.getElementById("search-results");
const closeCart =document.getElementById("close-cart")
const main = document.querySelector(".container")

/*===== Active Section ===== */
let lastActiveSection = "home";

/*===== Class =====*/
class Cache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }
   // if the value already exists, delete and re-set it so it moves to the "most recently used" end of the Map
  get(key) {
    if (!this.cache.has(key)) return -1;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }
  // This update the entry and evict the oldest entry when capacity is full
  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    if (this.cache.size === this.capacity) {
      this.cache.delete([...this.cache.keys()][0]);
    }
    this.cache.set(key, value);
views.innerHTML += `<img src="${value.image}" data-id="${value.id}" alt="${value.name}">`
  }
}
const capacity = new Cache(5);

const cartMap = new Map(saved)  
// Use to identify product,quantity and add product if not present in cart
const addToCart = (product) => {
  if (cartMap.has(product.id)) {
    const existing = cartMap.get(product.id);
    existing.quantity = existing.quantity + 1;
  } else {
    cartMap.set(product.id, { product: product, quantity: 1 });
  }
  renderCart(); // rebuild display
};

/*======================================= */

/*===== Create Item container Function ===== */
// A shorter way to create containers for items and details
const createCard = (product, container) => {
  product.map((info) => {
    container.innerHTML += `
        <div class = "item" data-id=${info.id}>
          <img src = "${info.image}"  alt="${info.name}">
          <h4>${info.name}</h4>
          <div class= "info">
  <p>$ ${info.price}</p>
  <button class="add">Add to Cart</button>
  </div>
  </div>
  `;
  });
};
// This create container for each selected cart, using the data from product object that has undergo the whole process
const cartCard = (data, container) => {
  container.innerHTML += `
<div class="cart-item">
<img src ="${data.product.image}" alt="${data.product.name}">
<div class="cart-product">
<h3>${data.product.name}</h3>
<p id="prices">$ ${data.product.price}</p>
</div>
<div>
<div data-id="${data.product.id}" class ="control">
<p id="quantity">${data.quantity}</p>
<div class="action">
<button data-action="plus">&plus;</button>
<button data-action="minus">&minus;</button>
</div>
</div>
<p id="product"> Product Total: <span>$${data.product.price * data.quantity}</span></p>
</div>
</div>
`;
};

/*======================================= */

/*===== Home ===== */
const container = categoryContainers.home;
createCard(products, container);

/*===== Other Item ===== */
const items = () => {
  const product = Object.keys(categoryContainers);
  product.forEach((item) => {
    const findProduct = products.filter((cat) => cat.category.includes(item));
    const container = categoryContainers[item];
    createCard(findProduct, container);
  });
};
items();

/*======================================= */

/*======= Callback Functions ========= */
//Update the recent viewed container taking it info from cache inline with the accurate capacity
const renderRecent = () => {
  views.innerHTML = ""; // clear first
  // loop through capacity.cache's current values and rebuild the strip
  for (const value of capacity.cache.values()) {
 views.innerHTML += `<img src="${value.image}" data-id="${value.id}" alt="${value.name}">`
  }
};
// Update cartCard with the accurate details from cartMap and returns the total sum of all cart selected
const renderCart = () => {
  cart.innerHTML = ""; // step 1: clear
  let total = 0;
  for (const entry of cartMap.values()) {
    // step 2: loop through {product, quantity} objects
    total += entry.product.price * entry.quantity;
    cartCard(entry, cart);
  }
  cartTotal.textContent = `Total: $${total}`;
  localStorage.setItem("cart", JSON.stringify([...cartMap.entries()]))

};
renderCart()
/*======================================= */

/*===== Events ===== */
//Access cart action button through the product id to measure the increase and decrease of item and update renderCart
cart.addEventListener("click", (e) => {
  const actionBtn = e.target.closest("[data-action]");
  if (!actionBtn) return;
  const wrapper = e.target.closest("[data-id]");
  const productId = Number(wrapper.dataset.id);
  const entry = cartMap.get(productId);
  if (actionBtn.dataset.action === "plus") {
    entry.quantity += 1;
  } else {
    entry.quantity -= 1;
    if (entry.quantity < 1) {
      cartMap.delete(productId);
    }
  }

  renderCart();
});

cartLink.addEventListener("click", (e) => {
  if (e.target.dataset.section || e.target.closest("button[data-section]")) {
    document.querySelector(".carts").toggleAttribute("hidden")
  }
});

main.addEventListener("click", (e) => {
  const itemDiv = e.target.closest(".item");
  const addBtn = e.target.closest(".add");
  if (addBtn) {
    const value = itemDiv.dataset.id;
    const all = products.filter((item) => item.id === Number(value));
    addToCart(all[0]);
    dialog.close();
    return;
  }
  if (itemDiv) {
    const value = itemDiv.dataset.id;
    const all = products.filter((item) => item.id === Number(value));
    all.map((img) => {
      capacity.put(img.id, img);
      renderRecent();
    });
    dialog.hidden = false;
    dialog.showModal();
    modal.innerHTML = "";
    createCard(all, modal);
  }
  return;
});

closeModal.addEventListener("click", () => {
  dialog.close();
});

input.addEventListener("input", () => {
  const text = input.value.toLowerCase();
  if (!text) {
    search.hidden = true;
    document.getElementById(lastActiveSection).hidden = false;
  } else {
    document.querySelectorAll(".section").forEach((section) => {
      section.hidden = true; // hide everything, including whatever category was active
    });
    const searchResult = products.filter((product) =>
      product.name.toLowerCase().includes(text),
    );
    search.innerHTML = "";
    createCard(searchResult, search);
    search.hidden = false;
  }
});
closeCart.addEventListener("click",() => {
     document.querySelector(".carts").toggleAttribute("hidden")
})

views.addEventListener("click", (e) => {
    const img = e.target.closest("img")
    if (!img) return
    
    const value = img.dataset.id
    const all = products.filter((item) => item.id === Number(value))
    
    dialog.showModal()
    modal.innerHTML = ""
    createCard(all, modal)
})

itemLink.addEventListener("click", (e) => {
  if (e.target.dataset.section) {
    itemLink.querySelectorAll("button").forEach(btn =>{
    btn.classList.remove("active")
    })
    e.target.classList.add("active")
       lastActiveSection = e.target.dataset.section;
    document.querySelectorAll(".section").forEach((section) => {
      section.hidden = true;
    });
    document.getElementById(lastActiveSection).hidden = false;
  }
});
/*======================================= */
