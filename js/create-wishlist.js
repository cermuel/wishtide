let currentWishlistStep = 1;
let wishlistCoverImage = null;
let wishlistTitle = "";
let wishlistDescription = "";
let enableContributions = false;
let friendSearchTerm = "";
let selectedWishlistFriends = [];
let wishlistItems = [];
let currentNewItem = {};
let addItemView = true;
let currentEditingItem = null;
const wishlistModal = document.getElementById("create-wishlist-modal");
const wishlistDummyFriends = [
  {
    id: 1,
    name: "Hammed Jude",
    username: "@Hajeed",
    image: "/assets/images/user-1.svg",
  },
  {
    id: 2,
    name: "Samuel Ngene",
    username: "@Cermuel",
    image: "/assets/images/user-2.svg",
  },
  {
    id: 3,
    name: "Kevin De Bruyne",
    username: "@Shady",
    image: "/assets/images/friend.svg",
  },
  {
    id: 4,
    name: "David Hamilton",
    username: "@Dave",
    image: "/assets/images/user.svg",
  },
  {
    id: 5,
    name: "John Doe",
    username: "@User",
    image: "/assets/images/user-2.svg",
  },
];
function initCreateWishlist() {
  currentWishlistStep = 1;
  wishlistCoverImage = null;
  wishlistTitle = "";
  wishlistDescription = "";
  enableContributions = false;
  friendSearchTerm = "";
  selectedWishlistFriends = [];
  wishlistItems = [];
  currentNewItem = {};
  addItemView = true;
  currentEditingItem = null;
  updateWishlistStepDisplay();
  updateWishlistProgressBar();
  updateWishlistButtonText();
}
function handleWishlistCoverChange(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      wishlistCoverImage = e.target.result;
      document.getElementById("cover-preview").src = wishlistCoverImage;
    };
    reader.readAsDataURL(file);
  }
}
function handleItemImageChange(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      currentNewItem.img = e.target.result;
      document.getElementById("item-image-preview").src = currentNewItem.img;
    };
    reader.readAsDataURL(file);
  }
}
function handleWishlistBack() {
  if (currentWishlistStep === 1) {
    closeCreateWishlist();
  } else if (currentWishlistStep === 2 && !addItemView) {
    showAddItemView();
  } else {
    currentWishlistStep--;
    updateWishlistStepDisplay();
    updateWishlistProgressBar();
    updateWishlistButtonText();
  }
}
function handleWishlistNext() {
  if (currentWishlistStep === 1) {
    const titleInput = document.getElementById("wishlist-title");
    const descriptionInput = document.getElementById("wishlist-description");
    wishlistTitle = titleInput.value.trim();
    wishlistDescription = descriptionInput.value.trim();
    if (!wishlistTitle || !wishlistDescription) {
      return;
    }
    currentWishlistStep++;
    updateWishlistStepDisplay();
    updateWishlistProgressBar();
    updateWishlistButtonText();
  } else if (currentWishlistStep === 2) {
    if (addItemView) {
      handleAddWishlistItem();
    } else {
      currentWishlistStep++;
      updateWishlistStepDisplay();
      updateWishlistProgressBar();
      updateWishlistButtonText();
    }
  } else if (currentWishlistStep === 3) {
    submitWishlist();
  }
}
function handleAddWishlistItem() {
  const name = document.getElementById("item-name").value.trim();
  const url = document.getElementById("item-url").value.trim();
  const price = document.getElementById("item-price").value.trim();
  const note = document.getElementById("item-note").value.trim();
  if (!name) return;
  const newItem = {
    id: wishlistItems.length,
    name: name,
    url: url,
    price: price,
    note: note,
    img: currentNewItem.img || "/assets/images/upload-image.svg",
  };
  wishlistItems.push(newItem);
  document.getElementById("item-name").value = "";
  document.getElementById("item-url").value = "";
  document.getElementById("item-price").value = "";
  document.getElementById("item-note").value = "";
  document.getElementById("item-image-preview").src =
    "/assets/images/upload-image.svg";
  currentNewItem = {};
  showItemsListView();
}
function showAddItemView() {
  addItemView = true;
  document.getElementById("add-item-view").classList.remove("d-none");
  document.getElementById("items-list-view").classList.add("d-none");
  updateWishlistButtonText();
}
function showItemsListView() {
  addItemView = false;
  document.getElementById("add-item-view").classList.add("d-none");
  document.getElementById("items-list-view").classList.remove("d-none");
  document.getElementById("wishlist-title-display").textContent = wishlistTitle;
  document.getElementById("wishlist-description-display").textContent =
    wishlistDescription;
  renderWishlistItems();
  updateWishlistButtonText();
}
function renderWishlistItems() {
  const container = document.getElementById("items-container");
  container.innerHTML = "";
  wishlistItems.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.className = "wishlist-item";
    itemElement.innerHTML = `
      <div class="wishlist-item-content">
        <div class="wishlist-item-image-container">
          <img
            src="${item.img}"
            alt="${item.name}"
            class="wishlist-item-image"
          />
        </div>
        <div class="wishlist-item-details">
          <p class="wishlist-item-name">${item.name}</p>
          <div class="wishlist-item-price-container">
            <img
              src="/assets/icons/tag.svg"
              class="wishlist-item-tag-icon"
              alt="price tag"
            />
            <p class="wishlist-item-price">$${item.price}</p>
          </div>
        </div>
        <button
          class="wishlist-item-toggle not-rotated"
          onclick="toggleItemEdit(${item.id})"
        >
          <img
            src="/assets/icons/chevron.svg"
            alt="toggle"
          />
        </button>
      </div>
    `;
    container.appendChild(itemElement);
  });
}
function toggleItemEdit(itemId) {
  const item = wishlistItems.find((i) => i.id === itemId);
  if (!item) return;
  currentEditingItem = { ...item };
  document.getElementById("edit-item-name").value = item.name;
  document.getElementById("edit-item-url").value = item.url;
  document.getElementById("edit-item-price").value = item.price;
  document.getElementById("edit-item-note").value = item.note;
  document.getElementById("item-edit-modal").classList.remove("d-none");
}
function closeItemEditModal() {
  document.getElementById("item-edit-modal").classList.add("d-none");
  currentEditingItem = null;
}
function updateCurrentItem() {
  if (!currentEditingItem) return;
  const name = document.getElementById("edit-item-name").value.trim();
  const url = document.getElementById("edit-item-url").value.trim();
  const price = document.getElementById("edit-item-price").value.trim();
  const note = document.getElementById("edit-item-note").value.trim();
  const itemIndex = wishlistItems.findIndex(
    (item) => item.id === currentEditingItem.id
  );
  if (itemIndex !== -1) {
    wishlistItems[itemIndex] = {
      ...wishlistItems[itemIndex],
      name: name,
      url: url,
      price: price,
      note: note,
    };
  }
  renderWishlistItems();
  closeItemEditModal();
}
function removeCurrentItem() {
  if (!currentEditingItem) return;
  wishlistItems = wishlistItems.filter(
    (item) => item.id !== currentEditingItem.id
  );
  renderWishlistItems();
  closeItemEditModal();
}
function closeCreateWishlist() {
  currentWishlistStep = 1;
  wishlistModal.style.display = "none";
  toggleCreatePopup(false);
  unloadCreateWishlist();
}
function submitWishlist() {
  document.getElementById("form-state").classList.add("d-none");
  document.getElementById("success-state").classList.remove("d-none");
  const content = document.querySelector(".create-event-content");
  content.classList.add("success-mode");
}
function updateWishlistStepDisplay() {
  document.getElementById("step-1").classList.add("d-none");
  document.getElementById("step-2").classList.add("d-none");
  document.getElementById("step-3").classList.add("d-none");
  document
    .getElementById(`step-${currentWishlistStep}`)
    .classList.remove("d-none");
  if (currentWishlistStep === 2) {
    showAddItemView();
  }
}
function updateWishlistProgressBar() {
  for (let i = 1; i <= 3; i++) {
    const progressBar = document.getElementById(`progress-${i}`);
    if (i <= currentWishlistStep) {
      progressBar.classList.add("active");
    } else {
      progressBar.classList.remove("active");
    }
  }
}
function updateWishlistButtonText() {
  const nextBtn = document.getElementById("next-btn");
  const cancelBtn = document.getElementById("cancel-btn");
  if (currentWishlistStep === 2) {
    if (addItemView) {
      nextBtn.textContent = "Add Item";
    } else {
      nextBtn.textContent = "Continue";
    }
    cancelBtn.style.display = "block";
  } else if (currentWishlistStep === 3) {
    nextBtn.textContent = "Proceed to share";
    cancelBtn.style.display = "none";
  } else {
    nextBtn.textContent = "Next";
    cancelBtn.style.display = "block";
  }
}
function toggleContributions() {
  enableContributions = !enableContributions;
  const toggleIcon = document.getElementById("contributions-toggle");
  toggleIcon.src = enableContributions
    ? "/assets/icons/toggle-on.svg"
    : "/assets/icons/toggle-off.svg";
}
function handleWishlistFriendSearch(event) {
  friendSearchTerm = event.target.value.toLowerCase();
  const dropdown = document.getElementById("friend-dropdown");
  if (friendSearchTerm === "") {
    dropdown.classList.add("d-none");
    return;
  }
  const filteredFriends = wishlistDummyFriends.filter(
    (friend) =>
      friend.name.toLowerCase().includes(friendSearchTerm) ||
      friend.username.toLowerCase().includes(friendSearchTerm)
  );
  if (filteredFriends.length === 0) {
    dropdown.classList.add("d-none");
    return;
  }
  dropdown.innerHTML = "";
  filteredFriends.forEach((friend) => {
    const friendItem = document.createElement("div");
    friendItem.className = "create-event-friend-item";
    friendItem.onclick = () => handleAddWishlistFriend(friend);
    friendItem.innerHTML = `
      <img
        src="${friend.image}"
        alt="${friend.name}"
        class="create-event-friend-avatar"
      />
      <div class="create-event-friend-info">
        <div class="create-event-friend-name">${friend.name}</div>
        <div class="create-event-friend-username">${friend.username}</div>
      </div>
      <img
        src="/assets/icons/add-friend.svg"
        alt="add"
        class="create-event-friend-action"
      />
    `;
    dropdown.appendChild(friendItem);
  });
  dropdown.classList.remove("d-none");
}
function handleAddWishlistFriend(friend) {
  if (!selectedWishlistFriends.some((f) => f.id === friend.id)) {
    selectedWishlistFriends.push(friend);
    updateSelectedWishlistFriends();
    document.getElementById("friend-search").value = "";
    document.getElementById("friend-dropdown").classList.add("d-none");
    friendSearchTerm = "";
  }
}
function handleRemoveWishlistFriend(friendId) {
  selectedWishlistFriends = selectedWishlistFriends.filter(
    (friend) => friend.id !== friendId
  );
  updateSelectedWishlistFriends();
}
function updateSelectedWishlistFriends() {
  const container = document.getElementById("selected-friends");
  container.innerHTML = "";
  selectedWishlistFriends.forEach((friend) => {
    const friendItem = document.createElement("div");
    friendItem.className = "create-event-selected-friend";
    friendItem.innerHTML = `
      <img
        src="${friend.image}"
        alt="${friend.name}"
        class="create-event-friend-avatar"
      />
      <div class="create-event-friend-info">
        <div class="create-event-friend-name">${friend.name}</div>
        <div class="create-event-friend-username">${friend.username}</div>
      </div>
      <img
        onclick="handleRemoveWishlistFriend(${friend.id})"
        src="/assets/icons/remove-friend.svg"
        alt="remove"
        class="create-event-friend-action create-event-remove-btn"
      />
    `;
    container.appendChild(friendItem);
  });
}
document.addEventListener("click", function (event) {
  const searchContainer = document.querySelector(
    ".create-event-search-container"
  );
  const dropdown = document.getElementById("friend-dropdown");
  if (searchContainer && !searchContainer.contains(event.target)) {
    dropdown.classList.add("d-none");
  }
});
document.addEventListener("click", function (event) {
  const modal = document.getElementById("item-edit-modal");
  const content = document.querySelector(".item-edit-content");
  if (
    modal &&
    !modal.classList.contains("d-none") &&
    !content.contains(event.target)
  ) {
    closeItemEditModal();
  }
});
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCreateWishlist);
} else {
  initCreateWishlist();
}
window.handleWishlistFriendSearch = handleWishlistFriendSearch;
window.handleWishlistNext = handleWishlistNext;
window.handleWishlistBack = handleWishlistBack;
window.closeCreateWishlist = closeCreateWishlist;
window.handleWishlistCoverChange = handleWishlistCoverChange;
window.handleItemImageChange = handleItemImageChange;
window.toggleContributions = toggleContributions;
window.showAddItemView = showAddItemView;
window.toggleItemEdit = toggleItemEdit;
window.closeItemEditModal = closeItemEditModal;
window.updateCurrentItem = updateCurrentItem;
window.removeCurrentItem = removeCurrentItem;
