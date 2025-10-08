import "./layout.js";
let s = null,
  t = {};

addEventListener("resize", u);
addEventListener("DOMContentLoaded", u);

function toggleWishlistVisibility() {
  let i = document.getElementById("wishlistToggle");
  i.src = i.src.includes("off")
    ? "/assets/icons/toggle-on.svg"
    : "/assets/icons/toggle-off.svg";
}

function selectSetting(id, title) {
  s = { setting: id, title };
  document
    .querySelectorAll(".content-section")
    .forEach((e) => e.classList.add("d-none"));
  document.getElementById(id)?.classList.remove("d-none");
  document.getElementById("contentTitle").textContent = title;
  document.querySelector(".notification-title").textContent = title;
  u();
}

function backToSettings() {
  s = null;
  document
    .querySelectorAll(".content-section")
    .forEach((e) => e.classList.add("d-none"));
  document.querySelector(".notification-title").textContent = "Settings";
  u();
}

function u() {
  let l = document.getElementById("settingsList"),
    c = document.getElementById("settingsContent"),
    b = document.getElementById("back-btn");
  if (innerWidth < 768) {
    if (s) {
      l?.classList.add("d-none");
      c.classList.remove("d-none");
      b.style.opacity = 1;
      b.style.pointerEvents = "auto";
    } else {
      l.classList.remove("d-none");
      c.classList.add("d-none");
      b.style.opacity = 0;
      b.style.pointerEvents = "none";
    }
  } else {
    l.classList.remove("d-none");
    c.classList.remove("d-none");
  }
}

function showSupportFormFunc() {
  document.getElementById("supportModal").classList.remove("d-none");
  document.body.style.overflow = "hidden";
}

function closeSupportForm() {
  document.getElementById("supportModal").classList.add("d-none");
  document.body.style.overflow = "auto";
}

function togglePassword(id) {
  let p = document.getElementById(id),
    e = p.closest(".floating-input-container").querySelector(".eye-icon"),
    i = p.type === "password";
  p.type = i ? "text" : "password";
  e.src = i ? "assets/icons/eye-closed.svg" : "assets/icons/eye.svg";
}

function togglePreference(id) {
  t[id] = !t[id];
  let e = document.getElementById(id + "Toggle");
  if (e)
    e.src = t[id]
      ? "/assets/icons/toggle-on.svg"
      : "/assets/icons/toggle-off.svg";
}

function editAccount(n, i, txt) {
  document.getElementById("accountIcon").src = i;
  document.getElementById("accountName").textContent = n;
  document.getElementById("accountText").textContent = txt;
  document.getElementById("accountModal").classList.remove("d-none");
  document.body.style.overflow = "hidden";
}

function closeAccountModal() {
  document.getElementById("accountModal").classList.add("d-none");
  document.body.style.overflow = "auto";
}

function filterTransactions(q) {
  q = q.toLowerCase();
  document.querySelectorAll(".transaction-card").forEach((c) => {
    c.style.display = c.getAttribute("data-wishlist").toLowerCase().includes(q)
      ? "block"
      : "none";
  });
}

addEventListener("click", (e) => {
  if (e.target.id === "supportModal") closeSupportForm();
  if (e.target.id === "accountModal") closeAccountModal();
  if (
    e.target.classList.contains("modal-content") ||
    e.target.closest(".modal-content") ||
    e.target.classList.contains("account-modal-content") ||
    e.target.closest(".account-modal-content")
  )
    e.stopPropagation();
});

window.toggleWishlistVisibility = toggleWishlistVisibility;
window.selectSetting = selectSetting;
window.backToSettings = backToSettings;
window.updateMobileView = u;
window.showSupportFormFunc = showSupportFormFunc;
window.closeSupportForm = closeSupportForm;
window.togglePassword = togglePassword;
window.togglePreference = togglePreference;
window.editAccount = editAccount;
window.closeAccountModal = closeAccountModal;
window.filterTransactions = filterTransactions;
