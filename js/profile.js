import "./layout.js";
import "./home.js";

function switchTab(tabName) {
  const tabs = document.querySelectorAll(".tab-btn");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => tab.classList.remove("active"));
  contents.forEach((content) => content.classList.remove("active"));

  event.target.classList.add("active");
  document.getElementById(tabName + "-content").classList.add("active");
}

function toggleQR() {
  const qrModal = document.getElementById("qrModal");
  const leftSection = document.querySelector(".left-section");
  qrModal.classList.toggle("show");

  if (qrModal.classList.contains("show")) {
    leftSection.style.overflowY = "hidden";
  } else {
    leftSection.style.overflowY = "auto";
  }
}

document.addEventListener("click", function (e) {
  const qrModal = document.getElementById("qrModal");
  if (e.target === qrModal) {
    qrModal.classList.remove("show");
    document.querySelector(".left-section").style.overflowY = "auto";
  }
});

window.switchTab = switchTab;
window.toggleQR = toggleQR;
