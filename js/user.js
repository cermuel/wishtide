import "./layout.js";
import "./home.js";
let f = false,
  u = "Chuks";

function switchTab(t) {
  document
    .querySelectorAll(".tab-btn")
    .forEach((b) => b.classList.remove("active"));
  document
    .querySelectorAll(".tab-content")
    .forEach((c) => c.classList.remove("active"));
  event.target.classList.add("active");
  document.getElementById(t + "-content").classList.add("active");
}

function toggleFollow() {
  if (f) {
    document.getElementById("unfollowModal").style.display = "flex";
    document.getElementById("usernameSpan").textContent = u;
  } else {
    f = true;
    document.getElementById("followBtn").className = "follow-btn unfollow";
    document.getElementById("followText").textContent = "Unfollow";
  }
}

function closeUnfollowModal() {
  document.getElementById("unfollowModal").style.display = "none";
}

function confirmUnfollow() {
  f = false;
  document.getElementById("followBtn").className = "follow-btn follow";
  document.getElementById("followText").textContent = "Follow " + u;
  closeUnfollowModal();
}

addEventListener("click", (e) => {
  if (e.target.id === "unfollowModal") closeUnfollowModal();
});

addEventListener("hashchange", () => {
  u = location.hash.substring(1) || "Chuks";
  document.getElementById("username").textContent = "@" + u;
  document.getElementById("followText").textContent = f
    ? "Unfollow"
    : "Follow " + u;
});

window.switchTab = switchTab;
window.toggleFollow = toggleFollow;
window.closeUnfollowModal = closeUnfollowModal;
window.confirmUnfollow = confirmUnfollow;
