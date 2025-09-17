import { constants } from "./constants.js";
import { home } from "./home.js";

const homedata = { wishlist: constants.wishlist, events: constants.events };

const accounts = constants.accounts;

let query = "";
const mainTabs = ["All", "Trending", "Following"];
const sortTabs = ["Accounts", "Wishlists", "Events"];
let selectedTab = mainTabs[0];
let activeTab = null;

let searchInput, mainTabsContainer, sortTabsContainer, contentContainer;

document.addEventListener("pageLoaded", function (e) {
  if (e.detail.pageName === "explore") {
    initializeElements();
    setupEventListeners();
    renderMainTabs();
    renderContent();
  }
});

function initializeElements() {
  searchInput = document.getElementById("searchInput");
  mainTabsContainer = document.getElementById("mainTabs");
  sortTabsContainer = document.getElementById("sortTabs");
  contentContainer = document.getElementById("contentContainer");
}

function setupEventListeners() {
  if (searchInput) {
    searchInput.addEventListener("input", function (e) {
      query = e.target.value;
      if (query === "") {
        activeTab = null;
        sortTabsContainer.classList.add("d-none");
      } else {
        sortTabsContainer.classList.remove("d-none");
      }
      renderContent();
    });
  }
}

function renderMainTabs() {
  if (!mainTabsContainer) return;

  mainTabsContainer.innerHTML = mainTabs
    .map(
      (tab) => `
          <button class="tab-btn ${
            tab === selectedTab ? "active" : ""
          }" onclick="selectMainTab('${tab}')">
            ${tab}
          </button>
        `
    )
    .join("");
}
function selectMainTab(tab) {
  selectedTab = tab;
  renderMainTabs();
  renderContent();
}

function selectSortTab(tab) {
  activeTab = activeTab === tab ? null : tab;
  renderSortTabs();
  renderContent();
}

window.selectMainTab = selectMainTab;
window.selectSortTab = selectSortTab;
function renderSortTabs() {
  if (!sortTabsContainer) return;

  sortTabsContainer.innerHTML = sortTabs
    .map(
      (tab) => `
          <button class="sort-tab-btn ${
            tab === activeTab ? "active" : ""
          }" onclick="selectSortTab('${tab}')">
            ${tab}
          </button>
        `
    )
    .join("");
}

function getFilteredData() {
  const filteredWishlist = homedata.wishlist.filter((w) =>
    w.name.toLowerCase().includes(query.toLowerCase())
  );
  const filteredEvents = homedata.events.filter((e) =>
    e.name.toLowerCase().includes(query.toLowerCase())
  );
  const filteredAccounts = accounts.filter((a) =>
    a.name.toLowerCase().includes(query.toLowerCase())
  );
  return { filteredWishlist, filteredEvents, filteredAccounts };
}

function renderContent() {
  if (query !== "") {
    renderSortTabs();
    renderSearchResults();
  } else {
    renderDefaultContent();
  }
}

function renderSearchResults() {
  const { filteredWishlist, filteredEvents, filteredAccounts } =
    getFilteredData();
  let content = "";

  if (activeTab === "Accounts" || activeTab === null) {
    content += renderAccountsSection(filteredAccounts);
  }
  if (activeTab === "Wishlists" || activeTab === null) {
    content += renderWishlistsSection(filteredWishlist);
  }
  if (activeTab === "Events" || activeTab === null) {
    content += renderEventsSection(filteredEvents);
  }

  contentContainer.innerHTML = content;
}

function renderDefaultContent() {
  const content = `
          <div class="d-flex flex-column align-items-center gap-4 gap-md-5 mt-4">
            ${homedata.wishlist
              .map((wish, i) =>
                renderWishlistCard(wish, i, homedata.wishlist.length)
              )
              .join("")}
          </div>
        `;
  contentContainer.innerHTML = content;
}

function renderAccountsSection(filteredAccounts) {
  return `
          <div class="mb-5">
            <h5 class="fw-bold mb-3 text-dark">Accounts</h5>
            <div class="d-flex flex-column gap-3">
              ${
                filteredAccounts.length > 0
                  ? filteredAccounts
                      .map(
                        (account) => `
                  <a href="/user.html#${account.username}" class="d-flex align-items-center gap-2 text-decoration-none">
                    <img src="${account.avatar}" class="rounded-circle" style="width: 2.5rem; height: 2.5rem; border: 1px solid rgba(18, 32, 35, 0.14);" alt="user">
                    <div>
                      <p class="mb-0" style="font-size: 0.8125rem; color: #151515;">${account.name}</p>
                      <p class="mb-0" style="font-size: 0.8125rem; color: rgba(67, 67, 67, 0.8);">@${account.username}</p>
                    </div>
                  </a>
                `
                      )
                      .join("")
                  : `<h5 class="text-muted fw-light">No items found for <span class="fw-bold text-black">"${query}"</span></h5>`
              }
            </div>
          </div>
        `;
}

function renderWishlistsSection(filteredWishlist) {
  return `
          <div class="mb-5">
            <h5 class="fw-bold mb-3 text-dark">Wishlists</h5>
            <div class="d-flex gap-3" style="overflow-x: auto;">
              ${
                filteredWishlist.length > 0
                  ? filteredWishlist
                      .map((wish, i) =>
                        renderWishlistCard(wish, i, filteredWishlist.length)
                      )
                      .join("")
                  : `<h5 class="text-muted fw-light">No items found for <span class="fw-bold text-black">"${query}"</span></h5>`
              }
            </div>
          </div>
        `;
}

function renderEventsSection(filteredEvents) {
  return `
          <div class="mb-5">
            <h5 class="fw-bold mb-3 text-dark">Events</h5>
            <div class="d-flex gap-3" style="overflow-x: auto;">
              ${
                filteredEvents.length > 0
                  ? filteredEvents
                      .map((event, i) => renderEventCard(event, i))
                      .join("")
                  : `<h5 class="text-muted fw-light">No items found for <span class="fw-bold text-black">"${query}"</span></h5>`
              }
            </div>
          </div>
        `;
}

function renderWishlistCard(wish, index, total) {
  return `
          <div class="bg-white rounded-4 border border-light-subtle" style="flex-shrink: 0; width: 100%;">
            <div class="position-relative overflow-hidden rounded-top-4" style="aspect-ratio: 531/386;">
              <img src="${
                wish.image
              }" alt="image" class="w-100 h-100" style="object-fit: cover;">
              <div class="position-absolute top-0 end-0 m-2 bg-white px-3 py-1 rounded-pill" style="font-size: 0.875rem;">
                ${index + 1}/${total}
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
                        <img src="${wish.user}" alt="user" class="user-avatar">
                        <input type="text" class="comment-input" placeholder="Add a comment">
            </div>
          </div>
        `;
}

function renderEventCard(event) {
  const progressPercentage = (event.gift.progress / event.gift.target) * 100;
  return `
          <div class="bg-white rounded-4 border border-light-subtle" style="flex-shrink: 0; width: 85%;">
            <div class="position-relative overflow-hidden rounded-top-4" style="aspect-ratio: 531/151;">
              <img src="${
                event.image
              }" alt="image" class="w-100 h-100" style="object-fit: cover;">
              <div class="position-absolute top-0 end-0 m-2 text-white border border-white border-opacity-60 px-2 py-1 rounded-pill d-flex align-items-center gap-1">
                <img src="/assets/icons/clock.svg" style="width: 0.75rem; height: 0.75rem;">
                <span style="font-size: 0.875rem;">${event.days} days</span>
              </div>
            </div>
            <div class="p-4 border-bottom border-light-subtle">
              <div class="d-flex align-items-center gap-3 mb-3">
                <img src="${
                  event.user
                }" alt="user" class="rounded-circle" style="width: 2rem; height: 2rem;">
                <span class="fw-bold">${event.name}</span>
                <div class="d-flex align-items-center gap-1 ms-auto">
                  <span style="font-size: 0.875rem;">Tagged</span>
                  <div class="d-flex align-items-center position-relative">
                    ${event.tagged
                      .map(
                        (tag, tagIndex) => `
                      <div class="bg-white rounded-circle p-1" style="margin-left: ${
                        tagIndex > 0 ? "-0.75rem" : "0"
                      }; width: 1.625rem;">
                        <img src="${tag}" alt="tagged" class="rounded-circle" style="width: 1.5rem; height: 1.5rem;">
                      </div>
                    `
                      )
                      .join("")}
                  </div>
                </div>
              </div>
              <div class="d-flex align-items-center gap-2 mb-3">
                <img src="/assets/icons/calendar.svg" alt="calendar" class="d-none d-md-block" style="width: 2rem; height: 2rem;">
                <span class="bg-light-subtle py-1 px-2 rounded">${
                  event.date
                }</span>
                <span class="bg-light-subtle py-1 px-2 rounded d-none d-md-inline">${
                  event.status
                }</span>
                <span class="bg-light-subtle py-1 px-2 rounded">RSVP count: ${
                  event.RSVP_count
                }</span>
              </div>
              <p class="text-muted mb-3">${event.description}</p>
              <div class="mb-3">
                <p class="mb-1">Gift progress</p>
                <div class="progress" style="height: 10px;">
                  <div class="progress-bar" style="width: ${progressPercentage}%; background-color: #009FE2;"></div>
                </div>
                <div class="d-flex justify-content-between mt-1">
                  <p class="mb-0 text-muted" style="font-size: 0.875rem;">Contributed: <span class="text-dark">$${
                    event.gift.progress
                  }</span></p>
                  <p class="mb-0 text-muted" style="font-size: 0.875rem;">Goal: <span class="text-dark">$${
                    event.gift.target
                  }</span></p>
                </div>
              </div>
              <button class="btn p-0 border-0 bg-transparent d-none d-md-flex align-items-center gap-1">
                <img src="/assets/icons/comment.svg" alt="comment" style="width: 1.75rem; height: 1.75rem;">
                <span class="text-muted">View comments...</span>
              </button>
            </div>
            <div class="p-4 border-bottom border-light-subtle d-none d-md-flex align-items-center gap-3">
              <img src="${
                event.user
              }" alt="user" class="rounded-circle" style="width: 2rem; height: 2rem;">
              <input type="text" class="form-control rounded-pill" placeholder="Add a comment">
            </div>
            <div class="p-4 d-flex align-items-center gap-3">
              <button class="btn flex-fill border border-light-subtle d-flex align-items-center justify-content-center gap-1 py-2 py-md-3">
                <span>View wishlist</span>
                <img src="/assets/icons/open.svg" style="width: 1.125rem; height: 1.125rem;" alt="open">
              </button>
              <button class="btn flex-fill text-white d-flex align-items-center justify-content-center gap-1 py-2 py-md-3" style="background-color: #6D29D9; border-color: #6D29D9;">
                <span>RSVP Now</span>
                <img src="/assets/icons/open-white.svg" style="width: 1.125rem; height: 1.125rem;" alt="open">
              </button>
            </div>
          </div>
        `;
}
