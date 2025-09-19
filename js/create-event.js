let currentStep = 1;
let coverImage = null;
let allowComments = false;
let searchTerm = "";
let selectedFriends = [];
const eventModal = document.getElementById("create-event-modal");
const eventDummyFriends = [
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
function initCreateEvent() {
  currentStep = 1;
  coverImage = null;
  allowComments = false;
  searchTerm = "";
  selectedFriends = [];
  updateStepDisplay();
  updateProgressBar();
  updateButtonText();
}
function handleCoverChange(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      coverImage = e.target.result;
      document.getElementById("cover-preview").src = coverImage;
    };
    reader.readAsDataURL(file);
  }
}
function handleBack() {
  if (currentStep === 1) {
    closeCreateEvent();
  } else {
    currentStep--;
    updateStepDisplay();
    updateProgressBar();
    updateButtonText();
  }
}
function handleNext() {
  if (currentStep < 3) {
    currentStep++;
    updateStepDisplay();
    updateProgressBar();
    updateButtonText();
  } else {
    submitEvent();
  }
}
function closeCreateEvent() {
  currentStep = 1;
  eventModal.style.display = "none";
  toggleCreatePopup(false);
  unloadCreateEvent();
}
function submitEvent() {
  document.getElementById("form-state").classList.add("d-none");
  document.getElementById("success-state").classList.remove("d-none");
  const content = document.querySelector(".create-event-content");
  content.classList.add("success-mode");
}
function updateStepDisplay() {
  document.getElementById("step-1").classList.add("d-none");
  document.getElementById("step-2").classList.add("d-none");
  document.getElementById("step-3").classList.add("d-none");
  document.getElementById(`step-${currentStep}`).classList.remove("d-none");
}
function updateProgressBar() {
  for (let i = 1; i <= 3; i++) {
    const progressBar = document.getElementById(`progress-${i}`);
    if (i <= currentStep) {
      progressBar.classList.add("active");
    } else {
      progressBar.classList.remove("active");
    }
  }
}
function updateButtonText() {
  const nextBtn = document.getElementById("next-btn");
  const cancelBtn = document.getElementById("cancel-btn");
  if (currentStep === 3) {
    nextBtn.textContent = "Proceed to share";
    cancelBtn.style.display = "none";
  } else {
    nextBtn.textContent = "Next";
    cancelBtn.style.display = "block";
  }
}
function toggleComments() {
  allowComments = !allowComments;
  const toggleIcon = document.getElementById("comments-toggle");
  toggleIcon.src = allowComments
    ? "/assets/icons/toggle-on.svg"
    : "/assets/icons/toggle-off.svg";
}
function handleFriendSearch(event) {
  searchTerm = event.target.value.toLowerCase();
  const dropdown = document.getElementById("friend-dropdown");
  if (searchTerm === "") {
    dropdown.classList.add("d-none");
    return;
  }
  const filteredFriends = eventDummyFriends.filter(
    (friend) =>
      friend.name.toLowerCase().includes(searchTerm) ||
      friend.username.toLowerCase().includes(searchTerm)
  );
  if (filteredFriends.length === 0) {
    dropdown.classList.add("d-none");
    return;
  }
  dropdown.innerHTML = "";
  filteredFriends.forEach((friend) => {
    const friendItem = document.createElement("div");
    friendItem.className = "create-event-friend-item";
    friendItem.onclick = () => handleAddFriend(friend);
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
function handleAddFriend(friend) {
  if (!selectedFriends.some((f) => f.id === friend.id)) {
    selectedFriends.push(friend);
    updateSelectedFriends();
    document.getElementById("friend-search").value = "";
    document.getElementById("friend-dropdown").classList.add("d-none");
    searchTerm = "";
  }
}
function handleRemoveFriend(friendId) {
  selectedFriends = selectedFriends.filter((friend) => friend.id !== friendId);
  updateSelectedFriends();
}
function updateSelectedFriends() {
  const container = document.getElementById("selected-friends");
  container.innerHTML = "";
  selectedFriends.forEach((friend) => {
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
        onclick="handleRemoveFriend(${friend.id})"
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
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCreateEvent);
} else {
  initCreateEvent();
}
window.handleFriendSearch = handleFriendSearch;
window.handleNext = handleNext;
