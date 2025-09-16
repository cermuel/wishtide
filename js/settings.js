let wishlistVisibility = false;
let selectedSetting = null;
let showPassword = false;
let showNewPassword = false;
let showConfirmPassword = false;
let showSupportForm = false;
let contribution = false;
let visibility = false;
let wishlistTagging = false;
let eventTagging = false;
let accountToEdit = null;
let query = "";

document.addEventListener("pageLoaded", function () {
  updateMobileView();
  window.addEventListener("resize", updateMobileView);
});

window.addEventListener("resize", updateMobileView);

function toggleWishlistVisibility() {
  wishlistVisibility = !wishlistVisibility;
  const toggleIcon = document.getElementById("wishlistToggle");
  toggleIcon.src = wishlistVisibility
    ? "/assets/icons/toggle-on.svg"
    : "/assets/icons/toggle-off.svg";
}

function selectSetting(settingId, title) {
  selectedSetting = { setting: settingId, title: title };

  const contentSections = document.querySelectorAll(".content-section");
  contentSections.forEach((section) => section.classList.add("d-none"));

  const selectedSection = document.getElementById(settingId);
  if (selectedSection) {
    selectedSection.classList.remove("d-none");
  }

  const contentTitle = document.getElementById("contentTitle");
  if (contentTitle) {
    contentTitle.textContent = title;
  }

  const mobileTitle = document.querySelector(".notification-title");
  if (mobileTitle) {
    mobileTitle.textContent = title;
  }

  updateMobileView();
}

function backToSettings() {
  selectedSetting = null;
  const contentSections = document.querySelectorAll(".content-section");
  contentSections.forEach((section) => section.classList.add("d-none"));

  const mobileTitle = document.querySelector(".notification-title");
  if (mobileTitle) {
    mobileTitle.textContent = "Settings";
  }

  updateMobileView();
}

function updateMobileView() {
  const settingsList = document.getElementById("settingsList");
  const settingsContent = document.getElementById("settingsContent");

  const backbtn = document.getElementById("back-btn");

  if (window.innerWidth < 768) {
    if (selectedSetting) {
      settingsList?.classList.add("d-none");
      settingsContent.classList.remove("d-none");
      backbtn.style.opacity = 1;
      backbtn.style.pointerEvents = "auto";
    } else {
      settingsList.classList.remove("d-none");
      settingsContent.classList.add("d-none");
      backbtn.style.opacity = 0;
      backbtn.style.pointerEvents = "none";
    }
  } else {
    settingsList.classList.remove("d-none");
    settingsContent.classList.remove("d-none");
  }
}

function showSupportFormFunc() {
  const modal = document.getElementById("supportModal");
  modal.classList.remove("d-none");
  document.body.style.overflow = "hidden";
}

function closeSupportForm() {
  const modal = document.getElementById("supportModal");
  modal.classList.add("d-none");
  document.body.style.overflow = "auto";
}

function togglePassword(inputId) {
  const passwordInput = document.getElementById(inputId);
  const eyeIcon = passwordInput
    .closest(".floating-input-container")
    .querySelector(".eye-icon");

  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  eyeIcon.src = isPassword
    ? "assets/icons/eye-closed.svg"
    : "assets/icons/eye.svg";
}

function togglePreference(preferenceId) {
  let currentState;
  let toggleElement;

  switch (preferenceId) {
    case "contribution":
      contribution = !contribution;
      currentState = contribution;
      toggleElement = document.getElementById("contributionToggle");
      break;
    case "visibility":
      visibility = !visibility;
      currentState = visibility;
      toggleElement = document.getElementById("visibilityToggle");
      break;
    case "wishlistTagging":
      wishlistTagging = !wishlistTagging;
      currentState = wishlistTagging;
      toggleElement = document.getElementById("wishlistTaggingToggle");
      break;
    case "eventTagging":
      eventTagging = !eventTagging;
      currentState = eventTagging;
      toggleElement = document.getElementById("eventTaggingToggle");
      break;
  }

  if (toggleElement) {
    toggleElement.src = currentState
      ? "/assets/icons/toggle-on.svg"
      : "/assets/icons/toggle-off.svg";
  }
}

function editAccount(name, icon, text) {
  accountToEdit = { id: name, icon: icon, text: text };

  document.getElementById("accountIcon").src = icon;
  document.getElementById("accountName").textContent = name;
  document.getElementById("accountText").textContent = text;

  const modal = document.getElementById("accountModal");
  modal.classList.remove("d-none");
  document.body.style.overflow = "hidden";
}

function closeAccountModal() {
  const modal = document.getElementById("accountModal");
  modal.classList.add("d-none");
  document.body.style.overflow = "auto";
  accountToEdit = null;
}

function filterTransactions(searchQuery) {
  query = searchQuery.toLowerCase();
  const transactionCards = document.querySelectorAll(".transaction-card");

  transactionCards.forEach((card) => {
    const wishlist = card.getAttribute("data-wishlist").toLowerCase();
    if (wishlist.includes(query)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

document.addEventListener("click", function (event) {
  const supportModal = document.getElementById("supportModal");
  const accountModal = document.getElementById("accountModal");

  if (event.target === supportModal) {
    closeSupportForm();
  }

  if (event.target === accountModal) {
    closeAccountModal();
  }
});

document.addEventListener("click", function (event) {
  if (
    event.target.classList.contains("modal-content") ||
    event.target.closest(".modal-content") ||
    event.target.classList.contains("account-modal-content") ||
    event.target.closest(".account-modal-content")
  ) {
    event.stopPropagation();
  }
});

window.toggleWishlistVisibility = toggleWishlistVisibility;
window.selectSetting = selectSetting;
window.backToSettings = backToSettings;
window.updateMobileView = updateMobileView;
window.showSupportFormFunc = showSupportFormFunc;
window.closeSupportForm = closeSupportForm;
window.togglePassword = togglePassword;
window.togglePreference = togglePreference;
window.editAccount = editAccount;
window.closeAccountModal = closeAccountModal;
window.filterTransactions = filterTransactions;
