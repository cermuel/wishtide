let v = "list",
  i = 0;

function closeManageWishlist() {
  let m = document.getElementById("manage-wishlist-modal");
  if (m?.parentNode) m.parentNode.removeChild(m);
  document.getElementById("manage-wishlist-css")?.remove();
}

function handleBack() {
  v =
    v === "contributors" || v === "likes"
      ? "selected"
      : v === "selected"
      ? "list"
      : v;
  i = 0;
  upd();
}

function filterWishlists(val) {
  document.querySelectorAll(".manage-wishlist-item").forEach((el) => {
    el.style.display = el
      .querySelector(".manage-wishlist-item-title")
      .textContent.toLowerCase()
      .includes(val.toLowerCase())
      ? "flex"
      : "none";
  });
}

function selectWishlist(id) {
  v = "selected";
  i = 0;
  upd();
}

function navItem(d) {
  i += d;
  if (i < 0) i = 0;
  if (i > 1) i = 1;
  document.getElementById("current-item-image").src =
    i === 0 ? "/assets/images/wishlist-2.jpg" : "/assets/images/wishlist-1.svg";
  document.getElementById("current-item-name").textContent =
    i === 0 ? "Jordan Airforce 1s" : "Nike Sneakers";
  document.getElementById("prev-item-btn").classList.toggle("d-none", i === 0);
  document.getElementById("next-item-btn").classList.toggle("d-none", i === 1);
}

function showContributors() {
  v = "contributors";
  upd();
}
function showLikes() {
  v = "likes";
  upd();
}

function upd() {
  let b = document.getElementById("back-btn"),
    h = document.getElementById("header-title"),
    e = document.getElementById("edit-btn");
  b.classList.toggle("d-none", v === "list");
  h.classList.toggle("manage-wishlist-title-with-back", v !== "list");
  h.textContent =
    v === "list"
      ? "Manage Wishlist"
      : v === "selected"
      ? "Tjaay Birthday wishlist"
      : v === "contributors"
      ? "Contributors"
      : "Likes";
  e.classList.toggle("d-none", v !== "selected");
  document
    .getElementById("wishlist-list-state")
    .classList.toggle("d-none", v !== "list");
  document
    .getElementById("selected-wishlist-state")
    .classList.toggle("d-none", v !== "selected");
  document
    .getElementById("contributors-state")
    .classList.toggle("d-none", v !== "contributors");
  document
    .getElementById("likes-state")
    .classList.toggle("d-none", v !== "likes");
}

window.closeManageWishlist = closeManageWishlist;
window.handleBack = handleBack;
window.filterWishlists = filterWishlists;
window.selectWishlist = selectWishlist;
window.navItem = navItem;
window.showContributors = showContributors;
window.showLikes = showLikes;
