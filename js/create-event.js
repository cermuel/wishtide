let currentStep = 1,
  selectedFriends = [];

function handleBack() {
  currentStep === 1 ? closeCreateEvent() : (currentStep--, updateUI());
}

function handleNext() {
  currentStep < 3 ? (currentStep++, updateUI()) : submitEvent();
}

function updateUI() {
  for (let i = 1; i <= 3; i++) {
    document
      .getElementById(`step-${i}`)
      .classList.toggle("d-none", i !== currentStep);
    document
      .getElementById(`progress-${i}`)
      .classList.toggle("active", i <= currentStep);
  }
  document.getElementById("next-btn").textContent =
    currentStep === 3 ? "Proceed to share" : "Next";
  document.getElementById("cancel-btn").style.display =
    currentStep === 3 ? "none" : "block";
}

function handleCoverChange(e) {
  const file = e.target.files[0];
  if (file)
    (new FileReader().onload = (evt) =>
      (document.getElementById("cover-preview").src = evt.target.result)),
      new FileReader().readAsDataURL(file);
}

function toggleComments() {
  const t = document.getElementById("comments-toggle");
  t.src = t.src.includes("off")
    ? "/assets/icons/toggle-on.svg"
    : "/assets/icons/toggle-off.svg";
}

function filterFriends(e) {
  const term = e.target.value.toLowerCase();
  const items = document.querySelectorAll(
    ".create-event-dropdown .create-event-friend-item"
  );
  let hasVisible = false;
  items.forEach((i) => {
    const show = i.textContent.toLowerCase().includes(term);
    i.style.display = show ? "flex" : "none";
    if (show && term) hasVisible = true;
  });
  document
    .getElementById("friend-dropdown")
    .classList.toggle("d-none", !hasVisible);
}

function addFriend(id, name, user, img) {
  if (!selectedFriends.find((f) => f.id === id)) {
    selectedFriends.push({ id, name, user, img });
    updateSelectedFriends();
    document.getElementById("friend-search").value = "";
    document.getElementById("friend-dropdown").classList.add("d-none");
  }
}

function removeFriend(id) {
  selectedFriends = selectedFriends.filter((f) => f.id !== id);
  updateSelectedFriends();
}

function updateSelectedFriends() {
  document.getElementById("selected-friends").innerHTML = "";
  selectedFriends.forEach((f) => {
    const el = document.createElement("div");
    el.className = "create-event-selected-friend";
    el.innerHTML = `<img src="${f.img}" alt="${f.name}" class="create-event-friend-avatar"><div class="create-event-friend-info"><div class="create-event-friend-name">${f.name}</div><div class="create-event-friend-username">${f.user}</div></div><img src="/assets/icons/remove-friend.svg" alt="remove" class="create-event-friend-action create-event-remove-btn">`;
    el.lastChild.addEventListener("click", () => removeFriend(f.id));
    document.getElementById("selected-friends").appendChild(el);
  });
}

function submitEvent() {
  document.getElementById("form-state").classList.add("d-none");
  document.getElementById("success-state").classList.remove("d-none");
}

function closeCreateEvent() {
  (currentStep = 1), (selectedFriends = []);
  document.getElementById("create-event-modal").style.display = "none";
  updateUI();
}

document.addEventListener("click", (e) => {
  if (
    !document.querySelector(".create-event-search-container").contains(e.target)
  )
    document.getElementById("friend-dropdown").classList.add("d-none");
});
