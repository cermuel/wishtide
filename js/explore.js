import "./layout.js";
import "./home.js";
function selectMainTab(tab) {
  const tabs = document.querySelectorAll("#mainTabs .tab-btn");
  tabs.forEach((btn) => {
    if (btn.textContent.trim() === tab) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

function selectSortTab(tab) {
  const tabs = document.querySelectorAll("#sortTabs .sort-tab-btn");
  tabs.forEach((btn) => {
    if (btn.textContent.trim() === tab) {
      btn.classList.toggle("active");
    }
  });
}

function handleSearch(value) {
  const sortTabs = document.getElementById("sortTabs");
  const contentContainer = document.getElementById("contentContainer");
  const searchResults = document.getElementById("searchResults");

  if (value === "") {
    sortTabs.classList.add("d-none");
    contentContainer.classList.remove("d-none");
    searchResults.classList.add("d-none");
  } else {
    sortTabs.classList.remove("d-none");
    contentContainer.classList.add("d-none");
    searchResults.classList.remove("d-none");
  }
}

window.handleSearch = handleSearch;
window.selectSortTab = selectSortTab;
window.selectMainTab = selectMainTab;
