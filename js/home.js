import { constants } from "./constants.js";

let wishlist = constants.wishlist;
let events = constants.events;

function createOverlappingAvatars(avatars, className = "likes-avatars") {
  return `
                <div class="${className}">
                    ${avatars
                      .map(
                        (avatar, index) => `
                        <div class="like-avatar" style="margin-left: ${
                          index > 0 ? "-0.5rem" : "0"
                        };">
                            <img src="${avatar}" alt="avatar" class="rounded-circle">
                        </div>
                    `
                      )
                      .join("")}
                </div>
            `;
}

function renderWishlist() {
  const container = document.getElementById("wishlistContainer");
  container.innerHTML = wishlist
    .map(
      (wish, i) => `
                <div class="wishlist-card">
                    <section class="card-image">
                        <img src="${wish.image}" alt="wishlist image">
                        <div class="counter-tag image-overlay">
                            ${i + 1}/${wishlist.length}
                        </div>
                        <div class="image-overlay price-tag">
                            <img src="/assets/icons/tag.svg" style="width: 1rem; height: 1rem;" alt="tag">
                            <span>${wish.price}</span>
                        </div>
                    </section>
                    <section class="card-content">
                        <div class="user-info">
                            <img src="${
                              wish.user
                            }" alt="user" class="user-avatar">
                            <span class="fw-bold">${wish.name}</span>
                        </div>
                        <div class="action-icons">
                            <button class="action-icon">
                                <img src="/assets/icons/like.svg" alt="like">
                            </button>
                            <button class="action-icon" onclick="openWishlistModal(${
                              wish.id
                            })">
                                <img src="/assets/icons/comment.svg" alt="comment">
                            </button>
                            <button class="action-icon">
                                <img src="/assets/icons/share.svg" alt="share">
                            </button>
                            <button class="action-icon ms-auto">
                                <img src="/assets/icons/save.svg" alt="save">
                            </button>
                        </div>
                        <div class="likes-section">
                            ${createOverlappingAvatars(wish.likes)}
                            <p class="likes-text mb-0">
                                Liked by <strong>Chuks</strong> & <strong>more</strong>
                            </p>
                        </div>
                    </section>
                    <div class="comment-section d-none d-md-flex" onclick="openWishlistModal(${
                      wish.id
                    })">
                        <img src="${wish.user}" alt="user" class="user-avatar">
                        <input type="text" class="comment-input" placeholder="Add a comment">
                    </div>
                </div>
            `
    )
    .join("");
}

function renderEvents() {
  const container = document.getElementById("eventsContainer");
  if (events.length === 0) {
    container.innerHTML = `
                    <section class="no-events">
                        <img src="/assets/images/no-event.svg" alt="no event" style="height: 5rem;">
                        <p class="mb-0" style="color: var(--text-gray-light);">No upcoming event</p>
                    </section>
                `;
    return;
  }
  container.innerHTML = events
    .map(
      (event, i) => `
                <div class="event-card">
                    <section class="card-image event-card-image">
                        <img src="${event.image}" alt="event image">
                        <div class="image-overlay days-tag">
                            <img src="/assets/icons/clock.svg" style="width: 0.75rem;" alt="clock">
                            <span>${event.days} days</span>
                        </div>
                    </section>
                    <section class="card-content">
                        <div class="user-info">
                            <img src="${
                              event.user
                            }" alt="user" class="user-avatar">
                            <span class="fw-bold">${event.name}</span>
                            <div class="ms-auto d-flex align-items-center gap-1">
                                <span style="font-size: 0.875rem;">Tagged</span>
                                ${createOverlappingAvatars(
                                  event.tagged,
                                  "likes-avatars"
                                )}
                            </div>
                        </div>
                        <div class="event-tags">
                            <img src="/assets/icons/calendar.svg" style="width: 2rem;" alt="calendar" class="d-none d-md-block">
                            <span class="event-tag">${event.date}</span>
                            <span class="event-tag d-none d-md-inline">${
                              event.status
                            }</span>
                            <span class="event-tag">RSVP count: ${
                              event.RSVP_count
                            }</span>
                        </div>
                        <p class="event-description">${event.description}</p>
                        <div class="progress-section">
                            <p style="font-size: 0.875rem;" class="mb-1">Gift progress</p>
                            <div class="progress-bar-container">
                                <div class="progress-bar" style="width: ${
                                  (event.gift.progress / event.gift.target) *
                                  100
                                }%;"></div>
                            </div>
                            <div class="progress-text">
                                <span>Contributed: <span style="color: #151515;">$${
                                  event.gift.progress
                                }</span></span>
                                <span>Goal: <span style="color: #151515;">$${
                                  event.gift.target
                                }</span></span>
                            </div>
                        </div>
                        <button class="d-flex align-items-center gap-1 border-0 bg-transparent d-none d-md-flex">
                            <img src="/assets/icons/comment.svg" style="width: 1.75rem;" alt="comment">
                            <span style="font-size: 0.875rem; color: var(--text-gray-lighter);">View comments...</span>
                        </button>
                    </section>
                    <div class="comment-section d-none d-md-flex" style="border-bottom: 1px solid #ddd;">
                        <img src="${event.user}" alt="user" class="user-avatar">
                        <input type="text" class="comment-input" placeholder="Add a comment">
                    </div>
                    <div class="event-buttons">
                        <button class="event-btn btn-outline">
                            <span>View wishlist</span>
                            <img src="/assets/icons/open.svg" style="width: 1.125rem;" alt="open">
                        </button>
                        <button class="event-btn btn-primary">
                            <span>RSVP Now</span>
                            <img src="/assets/icons/open-white.svg" style="width: 1.125rem;" alt="open">
                        </button>
                    </div>
                </div>
            `
    )
    .join("");
}

function openWishlistModal(wishlistId) {
  const modal = document.getElementById("wishlist-modal");
  const wishlistItem = wishlist.find((w) => w.id == wishlistId);

  if (!wishlistItem) {
    return;
  }

  fetch("modal.html")
    .then((response) => response.text())
    .then((modalHtml) => {
      const details = document.getElementById("wishlist-details");
      details.innerHTML = modalHtml;

      populateModalContent(wishlistItem);

      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    })
    .catch((error) => {
      console.error("Error loading modal:", error);

      const details = document.getElementById("wishlist-details");
      details.innerHTML = `<h2>Wishlist ${wishlistId}</h2><p>Details about ${wishlistItem.name}...</p>`;
      modal.classList.remove("hidden");
    });
}

function populateModalContent(wishlistItem) {
  const modalImage = document.getElementById("modal-wishlist-image");
  if (modalImage) {
    modalImage.src = wishlistItem.image;
    modalImage.alt = wishlistItem.name;
  }

  const userAvatar = document.getElementById("modal-user-avatar");
  if (userAvatar) {
    userAvatar.src = wishlistItem.user;
  }

  const wishlistName = document.getElementById("modal-wishlist-name");
  if (wishlistName) {
    wishlistName.textContent = wishlistItem.name;
  }

  const description = document.getElementById("modal-wishlist-description");
  if (description) {
    description.textContent = wishlistItem.description;
  }

  const progressBar = document.getElementById("modal-progress-bar");
  const progressAmount = document.getElementById("modal-progress-amount");
  const progressGoal = document.getElementById("modal-progress-goal");

  if (wishlistItem.gift && progressBar && progressAmount && progressGoal) {
    const percentage =
      (wishlistItem.gift.progress / wishlistItem.gift.target) * 100;
    progressBar.style.width = percentage + "%";
    progressAmount.textContent = `$${wishlistItem.gift.progress}`;
    progressGoal.textContent = `$${wishlistItem.gift.target}`;
  }

  const commentsSection = document.getElementById("modal-comments-section");
  if (commentsSection && wishlistItem.comment) {
    commentsSection.innerHTML = wishlistItem.comment
      .map(
        (comment) => `
                  <div class="d-flex align-items-start gap-2 mb-3 comment">
                    <img
                      src="${comment.user}"
                      alt="${comment.name}"
                      class="rounded-circle comment-avatar"
                    />
                    <div class="flex-grow-1">
                      <p class="mb-0 comment-author">
                        ${comment.name}
                        <span class="comment-time">${comment.time}</span>
                      </p>
                      <p class="mb-0 comment-text">${comment.comment}</p>
                    </div>
                    <img src="/assets/icons/like.svg" alt="like" class="comment-like" />
                  </div> 
                  `
      )
      .join("");
  }
}

function closeWishlistModal() {
  const modal = document.getElementById("wishlist-modal");
  modal.classList.add("hidden");
  document.body.style.overflow = "";

  if (window.location.pathname.includes("/wishlist/")) {
    history.back();
  }
}

window.onpopstate = (event) => {
  const modal = document.getElementById("wishlist-modal");
  if (event.state && event.state.modal) {
    openWishlistModal(event.state.id);
  } else {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }
};

document.addEventListener("click", function (e) {
  const modal = document.getElementById("wishlist-modal");
  if (e.target === modal) {
    closeWishlistModal();
  }
});
document.addEventListener("pageLoaded", function (e) {
  if (e.detail.pageName === "home") {
    renderWishlist();
    renderEvents();
  }
});
document.querySelectorAll(".action-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const text = this.querySelector("span").textContent;
  });
});

window.openWishlistModal = openWishlistModal;
window.closeWishlistModal = closeWishlistModal;

export const home = { createOverlappingAvatars };
