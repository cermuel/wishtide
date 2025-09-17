import { constants } from "./constants.js";
import { home } from "./home.js";
const contributions = constants.contributions;

function initializeTabs() {
  const tabs = document.querySelectorAll(".tab-btn");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetTab = tab.dataset.tab;

      tabs.forEach((t) => t.classList.remove("active"));
      contents.forEach((c) => c.classList.remove("active"));

      tab.classList.add("active");
      document.getElementById(`${targetTab}-content`).classList.add("active");
    });
  });
}

function toggleQR() {
  const qrModal = document.getElementById("qrModal");
  const leftsection = document.querySelector(".left-section");

  qrModal.classList.toggle("show");
  if (qrModal.classList.contains("show")) {
    leftsection.style.overflowY = "hidden";
  } else {
    leftsection.style.overflowY = "auto";
  }
}

function renderWishlists() {
  const container = document.getElementById("wishlistItems");
  const emptyState = document.getElementById("wishlistsEmpty");

  if (constants?.wishlist?.length > 0) {
    emptyState.style.display = "none";
    container.innerHTML = constants.wishlist
      .map(
        (
          wish,
          index
        ) => `<div class="bg-white rounded-4 border border-light-subtle" style="flex-shrink: 0; width: 100%;">
                    <div class="position-relative overflow-hidden rounded-top-4" style="aspect-ratio: 531/386;">
                      <img src="${
                        wish.image
                      }" alt="image" class="w-100 h-100" style="object-fit: cover;">
                      <div class="position-absolute top-0 end-0 m-2 bg-white px-3 py-1 rounded-pill" style="font-size: 0.875rem;">
                        ${index + 1}/${constants.wishlist.length}
                      </div>
                      <div class="position-absolute bottom-0 start-0 m-2 bg-white px-3 py-1 rounded-pill d-flex align-items-center gap-1">
                        <img src="/assets/icons/tag.svg" style="width: 1rem; height: 1rem;" alt="tag">
                        <span style="font-size: 0.875rem;">${wish.price}</span>
                      </div>
                    </div>
                    <div class="p-4 border-bottom border-light-subtle">
                      <div class="d-flex align-items-center gap-3 mb-3">
                        <img src="${
                          wish.user
                        }" alt="user" class="rounded-circle" style="width: 2rem; height: 2rem;">
                        <span class="fw-bold">${wish.name}</span>
                      </div>
                      <div class="d-flex align-items-center gap-3 mb-3">
                        <button class="btn p-0 border-0 bg-transparent">
                          <img src="/assets/icons/like.svg" alt="like" style="width: 1.75rem; height: 1.75rem;">
                        </button>
                        <button class="btn p-0 border-0 bg-transparent" onclick="openWishlistModal(${
                          wish.id
                        })">
                          <img src="/assets/icons/comment.svg" alt="comment" style="width: 1.75rem; height: 1.75rem;">
                        </button>
                        <button class="btn p-0 border-0 bg-transparent">
                          <img src="/assets/icons/share.svg" alt="share" style="width: 1.75rem; height: 1.75rem;">
                        </button>
                        <button class="btn p-0 border-0 bg-transparent ms-auto">
                          <img src="/assets/icons/save.svg" alt="save" style="width: 1.75rem; height: 1.75rem;">
                        </button>
                      </div>
                        <div class="likes-section">
                                    ${home.createOverlappingAvatars(wish.likes)}
                                    <p class="likes-text mb-0">
                                        Liked by <strong>Chuks</strong> & <strong>more</strong>
                                    </p>
                                </div>
                    </div>
                       <div class="comment-section d-none d-md-flex" onclick="openWishlistModal(${
                         wish.id
                       })">
                                <img src="${
                                  wish.user
                                }" alt="user" class="user-avatar">
                                <input type="text" class="comment-input" placeholder="Add a comment">
                    </div>
                  </div>`
      )
      .join("");
  } else {
    emptyState.style.display = "block";
    container.innerHTML = "";
  }
}

function renderEvents() {
  const container = document.getElementById("eventsItems");
  const emptyState = document.getElementById("eventsEmpty");

  if (constants.events.length > 0) {
    emptyState.style.display = "none";
    container.innerHTML = constants.events
      .map(
        (event) => `
      <div class="event-card w-100 mb-4 mb-md-5">
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
                                ${home.createOverlappingAvatars(
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
  } else {
    emptyState.style.display = "block";
    container.innerHTML = "";
  }
}

function renderContributions() {
  const container = document.getElementById("contributionsItems");
  const emptyState = document.getElementById("contributionsEmpty");

  if (contributions.length > 0) {
    emptyState.style.display = "none";
    container.innerHTML = contributions
      .map(
        (contribution) => `
      <div class="contribution-card">
        <div class="contribution-header">
          <p class="contribution-name">${contribution.name}</p>
          <button class="view-list-btn">View list</button>
        </div>
        <div class="contribution-divider"></div>
        <div class="contribution-progress">
               <div class="progress-bar-container">
                                <div class="progress-bar" style="width: ${
                                  (contribution.gift.progress /
                                    contribution.gift.target) *
                                  100
                                }%;"></div>
                            </div>
         <div class="progress-text">
                                <span>Contributed: <span style="color: #151515;">$${
                                  contribution.gift.progress
                                }</span></span>
                                <span>Goal: <span style="color: #151515;">$${
                                  contribution.gift.target
                                }</span></span>
                            </div>
        </div>
      </div>
    `
      )
      .join("");
  } else {
    emptyState.style.display = "block";
    container.innerHTML = "";
  }
}

document.addEventListener("pageLoaded", function () {
  initializeTabs();
  renderWishlists();
  renderEvents();
  renderContributions();
});

document.addEventListener("click", function (e) {
  const qrModal = document.getElementById("qrModal");
  if (e.target === qrModal) {
    qrModal.classList.remove("show");
  }
});

window.toggleQR = toggleQR;
