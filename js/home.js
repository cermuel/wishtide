import "./layout.js";

function openWishlistModal() {
  const modal = document.getElementById("wishlist-modal");

  fetch("modal.html")
    .then((response) => response.text())
    .then((modalHtml) => {
      const details = document.getElementById("wishlist-details");
      details.innerHTML = modalHtml;
      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    });
}

function closeWishlistModal() {
  const modal = document.getElementById("wishlist-modal");
  modal.classList.add("hidden");
  document.body.style.overflow = "";
}

document.addEventListener("click", function (e) {
  const modal = document.getElementById("wishlist-modal");
  if (e.target === modal) {
    closeWishlistModal();
  }
});

window.openWishlistModal = openWishlistModal;
window.closeWishlistModal = closeWishlistModal;
