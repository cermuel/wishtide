let currentRSVPAction = null;
let plusOneEnabled = false;

const sampleEventData = {
  image: "/assets/images/event.svg",
  days: "10",
  name: "Sarah Birthday",
  user: "/assets/images/user-2.svg",
  date: "April 1, 2025",
  status: "Online",
  RSVP_count: 10,
  description:
    "Sarah’s turning another fabulous year older! 🎉 Browse her wishlist, pick a gift she’ll love, and help make her day sparkle.",
  tagged: [
    "/assets/images/user-1.svg",
    "/assets/images/user-2.svg",
    "/assets/images/user.svg",
  ],
  gift: {
    progress: 400,
    target: 1000,
  },
  id: 1,
};

function initializeRSVP() {
  populateEventData(sampleEventData);
  resetRSVPState();
}

function populateEventData(eventData) {
  document.getElementById("event-image").src = eventData.image;

  document.getElementById(
    "event-countdown"
  ).textContent = `${eventData.days} days`;

  document.getElementById("event-user-avatar").src = eventData.user;
  document.getElementById("event-user-name").textContent = eventData.name;

  document.getElementById("event-date").textContent = eventData.date;
  document.getElementById("event-status").textContent = eventData.status;
  document.getElementById(
    "event-rsvp-count"
  ).textContent = `RSVP count: ${eventData.RSVP_count}`;

  document.getElementById("event-description").textContent =
    eventData.description;

  const taggedContainer = document.getElementById("tagged-users");
  taggedContainer.innerHTML = "";
  eventData.tagged.forEach((taggedUser, index) => {
    const taggedDiv = document.createElement("div");
    taggedDiv.className = "bg-white rounded-circle p-1 rsvp-tagged-user";
    if (index > 0) {
      taggedDiv.style.marginLeft = "-0.75rem";
    }

    const img = document.createElement("img");
    img.src = taggedUser;
    img.alt = "tagged user";
    img.className = "rounded-circle rsvp-tagged-avatar";

    taggedDiv.appendChild(img);
    taggedContainer.appendChild(taggedDiv);
  });
}

function resetRSVPState() {
  currentRSVPAction = null;
  plusOneEnabled = false;

  const rsvpOptions = document.querySelectorAll(".rsvp-option");
  rsvpOptions.forEach((option) => {
    option.classList.remove("active-yes", "active-no", "active-maybe");
  });

  document.getElementById("plus-one-checkbox").src =
    "/assets/icons/unchecked.svg";

  document.getElementById("add-to-calendar-modal").classList.add("d-none");
}

function selectRSVP(action) {
  const clickedOption = document.querySelector(`[data-action="${action}"]`);

  if (currentRSVPAction === action) {
    currentRSVPAction = null;
    clickedOption.classList.remove("active-yes", "active-no", "active-maybe");
  } else {
    const rsvpOptions = document.querySelectorAll(".rsvp-option");
    rsvpOptions.forEach((option) => {
      option.classList.remove("active-yes", "active-no", "active-maybe");
    });

    currentRSVPAction = action;

    if (action === "Yes") {
      clickedOption.classList.add("active-yes");
      showAddToCalendar();
    } else if (action === "No") {
      clickedOption.classList.add("active-no");
    } else if (action === "Maybe") {
      clickedOption.classList.add("active-maybe");
    }
  }
}

function togglePlusOne() {
  plusOneEnabled = !plusOneEnabled;
  const checkbox = document.getElementById("plus-one-checkbox");

  if (plusOneEnabled) {
    checkbox.src = "/assets/icons/checked.svg";
  } else {
    checkbox.src = "/assets/icons/unchecked.svg";
  }
}

function showAddToCalendar() {
  document.getElementById("add-to-calendar-modal").classList.remove("d-none");
}

function closeAddToCalendar() {
  document.getElementById("add-to-calendar-modal").classList.add("d-none");
}

function confirmAddToCalendar() {
  closeAddToCalendar();
}

function closeRSVP() {
  resetRSVPState();
  const modal = document.getElementById("rsvp-modal-main");
  if (modal) {
    modal.remove();
  }
  const stylesheet = document.getElementById("rsvp-css");
  if (stylesheet) {
    stylesheet.remove();
  }

  const script = document.getElementById("rsvp-script");
  if (script && script.parentNode) {
    document.body.removeChild(script);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const detailsBtn = document.querySelector(".rsvp-details-btn");
  if (detailsBtn) {
    detailsBtn.addEventListener("click", function () {});
  }

  const contributeBtn = document.querySelector(".rsvp-contribute-btn");
  if (contributeBtn) {
    contributeBtn.addEventListener("click", function () {});
  }

  initializeRSVP();
});

document.addEventListener("click", function (e) {
  if (e.target.id === "rsvp-modal-main") {
    closeRSVP();
  }
});

document.addEventListener("click", function (e) {
  if (e.target.closest("#rsvp-content")) {
    e.stopPropagation();
  }
});
