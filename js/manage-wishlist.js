let comment = [
  {
    user: "/assets/images/user-1.svg",
    comment: "Nice shoes on your wishlist",
    time: "2h",
    name: "Oboz",
  },
];
let wishlist = [
  {
    image: "/assets/images/wishlist-1.svg",
    price: "$150",
    name: "Tjaay Birthday wishlist",
    user: "/assets/images/user-1.svg",
    likes: [
      "/assets/images/user-1.svg",
      "/assets/images/user-2.svg",
      "/assets/images/user.svg",
    ],
    id: 1,
    gift: {
      progress: 150,
      target: 500,
    },
    description:
      "Sarah’s turning another fabulous year older! 🎉 Browse her wishlist, pick a gift she’ll love, and help make her day sparkle.",
    comment,
    items: [
      {
        image: "/assets/images/wishlist-2.jpg",
        name: "Jordan Airforce 1s ",
      },
      {
        image: "/assets/images/wishlist-1.svg",
        name: "Nike Sneakers",
      },
    ],
  },
  {
    image: "/assets/images/wishlist-2.jpg",
    price: "$150",
    name: "Sam Birthday wishlist",
    user: "/assets/images/user-2.svg",
    likes: [
      "/assets/images/user-1.svg",
      "/assets/images/user-2.svg",
      "/assets/images/user.svg",
    ],
    id: 2,
    gift: {
      progress: 600,
      target: 1000,
    },
    description:
      "Sarah’s turning another fabulous year older! 🎉 Browse her wishlist, pick a gift she’ll love, and help make her day sparkle.",
    comment,
    items: [
      {
        image: "/assets/images/wishlist-1.svg",
        name: "Nike Sneakers",
      },
      {
        image: "/assets/images/wishlist-2.jpg",
        name: "Jordan Airforce 1s ",
      },
    ],
  },
];

wishlist = [...wishlist, ...wishlist, ...wishlist];

let currentWishlists = wishlist;
let selectedWishlist = null;
let currentItemIndex = 0;
let currentView = "list";
let searchQuery = "";

function initializeManageWishlist() {
  currentWishlists = wishlist;
  selectedWishlist = null;
  currentItemIndex = 0;
  currentView = "list";
  searchQuery = "";

  updateDisplay();
}

function closeManageWishlist() {
  const modal = document.getElementById("manage-wishlist-modal");
  if (modal && modal.parentNode) {
    modal.parentNode.removeChild(modal);
  }
  const stylesheet = document.getElementById("manage-wishlist-css");
  if (stylesheet) {
    stylesheet.remove();
  }

  const script = document.getElementById("manage-wishlist-script");
  if (script && script.parentNode) {
    document.body.removeChild(script);
  }
}

function handleBackNavigation() {
  if (currentView === "contributors" || currentView === "likes") {
    currentView = "selected";
    currentItemIndex = 0;
  } else if (currentView === "selected") {
    selectedWishlist = null;
    currentView = "list";
    currentItemIndex = 0;
  }
  updateDisplay();
}

function handleWishlistSearch(event) {
  searchQuery = event.target.value;
  filterWishlists();
}

function filterWishlists() {
  if (searchQuery.trim() === "") {
    currentWishlists = wishlist;
  } else {
    currentWishlists = wishlist.filter((wishlist) =>
      wishlist.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  updateDisplay();
}

function selectWishlist(wishlistId) {
  selectedWishlist = wishlist.find((w) => w.id === wishlistId);
  currentView = "selected";
  currentItemIndex = 0;
  updateDisplay();
}

function navigateItem(direction) {
  if (!selectedWishlist || !selectedWishlist.items) return;

  const newIndex = currentItemIndex + direction;
  if (newIndex >= 0 && newIndex < selectedWishlist.items.length) {
    currentItemIndex = newIndex;
    updateSelectedWishlistDisplay();
  }
}

function showContributors() {
  currentView = "contributors";
  updateDisplay();
}

function showLikes() {
  currentView = "likes";
  updateDisplay();
}

function updateDisplay() {
  updateHeader();
  updateContent();
  updateFooter();
  updateWishlistList();
}

function updateHeader() {
  const backBtn = document.getElementById("back-btn");
  const headerTitle = document.getElementById("header-title");

  if (currentView === "list") {
    backBtn.classList.add("d-none");
    headerTitle.textContent = "Manage Wishlist";
    headerTitle.classList.remove("manage-wishlist-title-with-back");
  } else {
    backBtn.classList.remove("d-none");
    headerTitle.classList.add("manage-wishlist-title-with-back");

    switch (currentView) {
      case "selected":
        headerTitle.textContent = selectedWishlist
          ? selectedWishlist.name
          : "Wishlist";
        break;
      case "contributors":
        headerTitle.textContent = "Contributors";
        break;
      case "likes":
        headerTitle.textContent = "Likes";
        break;
    }
  }
}

function updateContent() {
  document.getElementById("no-wishlist-state").classList.add("d-none");
  document.getElementById("wishlist-list-state").classList.add("d-none");
  document.getElementById("selected-wishlist-state").classList.add("d-none");
  document.getElementById("contributors-state").classList.add("d-none");
  document.getElementById("likes-state").classList.add("d-none");

  switch (currentView) {
    case "list":
      if (currentWishlists.length === 0) {
        document.getElementById("no-wishlist-state").classList.remove("d-none");
        updateEmptySearchInput();
      } else {
        document
          .getElementById("wishlist-list-state")
          .classList.remove("d-none");
        updateWishlistList();
      }
      break;
    case "selected":
      document
        .getElementById("selected-wishlist-state")
        .classList.remove("d-none");
      updateSelectedWishlistDisplay();
      break;
    case "contributors":
      document.getElementById("contributors-state").classList.remove("d-none");
      updateContributorsDisplay();
      break;
    case "likes":
      document.getElementById("likes-state").classList.remove("d-none");
      updateLikesDisplay();
      break;
  }
}

function updateFooter() {
  const editBtn = document.getElementById("edit-btn");

  if (currentView === "selected") {
    editBtn.classList.remove("d-none");
  } else {
    editBtn.classList.add("d-none");
  }
}

function updateEmptySearchInput() {
  const searchInput = document.getElementById("wishlist-search-empty");
  searchInput.value = searchQuery;
  searchInput.oninput = handleWishlistSearch;
}

function updateWishlistList() {
  const container = document.getElementById("wishlist-items-container");
  const searchInput = document.getElementById("wishlist-search");

  searchInput.value = searchQuery;

  container.innerHTML = "";

  currentWishlists.map((wishlist) => {
    const progressPercentage =
      (wishlist.gift.progress / wishlist.gift.target) * 100;

    const wishlistItem = document.createElement("div");
    wishlistItem.className = "manage-wishlist-item";
    wishlistItem.innerHTML = `
      <img
        src="${wishlist.image}"
        alt="${wishlist.name}"
        class="manage-wishlist-item-avatar"
      />
      <div class="manage-wishlist-item-content">
        <div class="manage-wishlist-item-header">
          <p class="manage-wishlist-item-title">${wishlist.name}</p>
          <p class="manage-wishlist-item-goal">Goal: $${wishlist.gift.progress} / ${wishlist.gift.target}</p>
        </div>
        <div class="manage-wishlist-item-progress-container">
          <div class="manage-wishlist-item-progress-bar" style="width: ${progressPercentage}%"></div>
        </div>
      </div>
      <img
        src="/assets/icons/chevron.svg"
        class="manage-wishlist-item-chevron"
        alt="view"
      />
    `;

    wishlistItem.addEventListener("click", () => selectWishlist(wishlist.id));
    container.appendChild(wishlistItem);
  });
}

function updateSelectedWishlistDisplay() {
  if (!selectedWishlist) return;

  document.getElementById("selected-wishlist-image").src =
    selectedWishlist.image;
  document.getElementById("selected-wishlist-user-avatar").src =
    selectedWishlist.user;
  document.getElementById("selected-wishlist-name").textContent =
    selectedWishlist.name;
  document.getElementById("selected-wishlist-description").textContent =
    selectedWishlist.description;

  if (selectedWishlist.items && selectedWishlist.items.length > 0) {
    const currentItem = selectedWishlist.items[currentItemIndex];
    document.getElementById("current-item-image").src = currentItem.image;
    document.getElementById("current-item-name").textContent = currentItem.name;

    const prevBtn = document.getElementById("prev-item-btn");
    const nextBtn = document.getElementById("next-item-btn");

    if (currentItemIndex > 0) {
      prevBtn.classList.remove("d-none");
    } else {
      prevBtn.classList.add("d-none");
    }

    if (currentItemIndex < selectedWishlist.items.length - 1) {
      nextBtn.classList.remove("d-none");
    } else {
      nextBtn.classList.add("d-none");
    }
  }

  const progressPercentage =
    (selectedWishlist.gift.progress / selectedWishlist.gift.target) * 100;
  document.getElementById("progress-bar").style.width =
    progressPercentage + "%";
  document.getElementById("contributed-amount").textContent =
    "$" + selectedWishlist.gift.progress;
  document.getElementById("goal-amount").textContent =
    "$" + selectedWishlist.gift.target;

  updateLikesAvatars();
}

function updateLikesAvatars() {
  const container = document.getElementById("likes-avatars");
  container.innerHTML = "";

  if (selectedWishlist && selectedWishlist.likes) {
    selectedWishlist.likes.forEach((like, index) => {
      const avatarWrapper = document.createElement("div");
      avatarWrapper.className = "manage-wishlist-like-avatar-wrapper";
      if (index > 0) {
        avatarWrapper.style.marginLeft = "-0.75rem";
      }

      const avatar = document.createElement("img");
      avatar.src = like;
      avatar.alt = "like";
      avatar.className = "manage-wishlist-like-avatar";

      avatarWrapper.appendChild(avatar);
      container.appendChild(avatarWrapper);
    });
  }
}

function updateContributorsDisplay() {
  const contentDiv = document.getElementById("contributors-content");
  const listDiv = document.getElementById("contributors-list");
  const itemsContainer = document.getElementById("contributors-items");

  if (
    !selectedWishlist ||
    !selectedWishlist.likes ||
    selectedWishlist.likes.length === 0
  ) {
    contentDiv.classList.remove("d-none");
    listDiv.classList.add("d-none");
  } else {
    contentDiv.classList.add("d-none");
    listDiv.classList.remove("d-none");

    itemsContainer.innerHTML = "";
    selectedWishlist.likes.forEach((contributor) => {
      const contributorItem = document.createElement("div");
      contributorItem.className = "manage-wishlist-contributor-item";
      contributorItem.innerHTML = `
        <img
          src="${contributor}"
          alt="contributor"
          class="manage-wishlist-contributor-avatar"
        />
        <div class="manage-wishlist-contributor-info">
          <div class="manage-wishlist-contributor-name">Samuel Chuks</div>
          <div class="manage-wishlist-contributor-username">@username</div>
        </div>
        <p class="manage-wishlist-contributor-amount">$50.00</p>
      `;
      itemsContainer.appendChild(contributorItem);
    });
  }
}

function updateLikesDisplay() {
  const contentDiv = document.getElementById("likes-content");
  const listDiv = document.getElementById("likes-list");
  const itemsContainer = document.getElementById("likes-items");

  if (
    !selectedWishlist ||
    !selectedWishlist.likes ||
    selectedWishlist.likes.length === 0
  ) {
    contentDiv.classList.remove("d-none");
    listDiv.classList.add("d-none");
  } else {
    contentDiv.classList.add("d-none");
    listDiv.classList.remove("d-none");

    itemsContainer.innerHTML = "";
    selectedWishlist.likes.forEach((like, index) => {
      const isFollowing = index % 2 === 0;
      const likeItem = document.createElement("div");
      likeItem.className = "manage-wishlist-like-item";
      likeItem.innerHTML = `
        <img
          src="${like}"
          alt="user"
          class="manage-wishlist-like-user-avatar"
        />
        <div class="manage-wishlist-like-user-info">
          <div class="manage-wishlist-like-user-name">Samuel Chuks</div>
          <div class="manage-wishlist-like-user-username">@username</div>
        </div>
        <div class="manage-wishlist-follow-btn ${
          isFollowing ? "following" : "not-following"
        }">
          ${isFollowing ? "Unfollow" : "Follow"}
        </div>
      `;
      itemsContainer.appendChild(likeItem);
    });
  }
}

document.addEventListener("pageLoaded", function () {
  if (document.getElementById("manage-wishlist-modal")) {
    initializeManageWishlist();
  }
});
