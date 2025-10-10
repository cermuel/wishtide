let step = 1;
let view = "add";

function goNext() {
  if (step === 1) {
    if (
      !document.getElementById("wishlist-title").value ||
      !document.getElementById("wishlist-description").value
    )
      return;
    document.getElementById("wishlist-title-display").textContent =
      document.getElementById("wishlist-title").value;
    document.getElementById("wishlist-description-display").textContent =
      document.getElementById("wishlist-description").value;
  }
  if (step === 2 && view === "add") {
    if (!document.getElementById("item-name").value) return;
    addItem();
    return;
  }
  if (step < 3) {
    step++;
    showStep();
  } else {
    document.getElementById("form-state").classList.add("d-none");
    document.getElementById("success-state").classList.remove("d-none");
  }
}

function goBack() {
  if (step === 2 && view === "list") {
    showView("add-item-view", "items-list-view");
  } else if (step > 1) {
    step--;
    showStep();
  } else {
    closeModal();
  }
}

function showStep() {
  document.getElementById("step-1").classList.add("d-none");
  document.getElementById("step-2").classList.add("d-none");
  document.getElementById("step-3").classList.add("d-none");
  document.getElementById("step-" + step).classList.remove("d-none");
  for (let i = 1; i <= 3; i++) {
    document
      .getElementById("progress-" + i)
      .classList.toggle("active", i <= step);
  }
  document.getElementById("next-btn").textContent =
    step === 3 ? "Proceed to share" : "Next";
  document.getElementById("cancel-btn").style.display =
    step === 3 ? "none" : "block";
  if (step === 2) showView("add-item-view", "items-list-view");
}

function showView(show, hide) {
  document.getElementById(show).classList.remove("d-none");
  document.getElementById(hide).classList.add("d-none");
  view = show === "add-item-view" ? "add" : "list";
  if (step === 2)
    document.getElementById("next-btn").textContent =
      view === "add" ? "Add Item" : "Continue";
}

function addItem() {
  const container = document.getElementById("items-container");
  const item = document.createElement("div");
  item.className = "wishlist-item";
  item.innerHTML = `<div class="wishlist-item-content"><div class="wishlist-item-image-container"><img src="${
    document.getElementById("item-image-preview").src
  }" class="wishlist-item-image" /></div><div class="wishlist-item-details"><p class="wishlist-item-name">${
    document.getElementById("item-name").value
  }</p><div class="wishlist-item-price-container"><img src="/assets/icons/tag.svg" class="wishlist-item-tag-icon" /><p class="wishlist-item-price">$${
    document.getElementById("item-price").value
  }</p></div></div><button class="wishlist-item-toggle not-rotated"><img src="/assets/icons/chevron.svg" /></button></div>`;
  container.appendChild(item);
  document.getElementById("item-name").value = "";
  document.getElementById("item-url").value = "";
  document.getElementById("item-price").value = "";
  document.getElementById("item-note").value = "";
  document.getElementById("item-image-preview").src =
    "/assets/images/upload-image.svg";
  showView("items-list-view", "add-item-view");
}

function searchFriends(val) {
  document.getElementById("friend-dropdown").classList.toggle("d-none", !val);
}

function selectFriend(el, id, name, username, img) {
  if (document.querySelector(`[data-friend-id="${id}"]`)) return;
  const item = document.createElement("div");
  item.className = "create-event-selected-friend";
  item.dataset.friendId = id;
  item.innerHTML = `<img src="${img}" class="create-event-friend-avatar" /><div class="create-event-friend-info"><div class="create-event-friend-name">${name}</div><div class="create-event-friend-username">${username}</div></div><img src="/assets/icons/remove-friend.svg" class="create-event-friend-action create-event-remove-btn" onclick="this.parentElement.remove()" />`;
  document.getElementById("selected-friends").appendChild(item);
  document.getElementById("friend-search").value = "";
  document.getElementById("friend-dropdown").classList.add("d-none");
}

function previewImage(input, targetId) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) =>
      (document.getElementById(targetId).src = e.target.result);
    reader.readAsDataURL(input.files[0]);
  }
}

function toggleIcon(el, on, off) {
  el.src = el.src.includes("toggle-off") ? on : off;
}

function closeModal() {
  document.getElementById("create-wishlist-modal").style.display = "none";
}
