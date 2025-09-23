(function () {
  let likes = [
    "/assets/images/user-1.svg",
    "/assets/images/user-2.svg",
    "/assets/images/user.svg",
  ];
  let events = [
    {
      image: "/assets/images/event.svg",
      days: "10",
      name: "Sarah Birthday",
      user: "/assets/images/user-2.svg",
      date: "April 1, 2025",
      status: "Online",
      RSVP_count: 10,
      description:
        "Sarah's turning another fabulous year older! 🎉 Browse her wishlist, pick a gift she'll love, and help make her day sparkle.",
      tagged: likes,
      gift: { progress: 400, target: 1000 },
      id: 1,
    },
  ];

  events = [...events, { ...events[0], id: 2 }, { ...events[0], id: 3 }];
  const homedata = {
    events,
  };

  let selectedEvent = null;
  let selectedTab = "upcoming";
  let eventToManage = null;
  let viewTagged = false;
  let viewRSVP = false;
  let untagFriend = null;
  let showDelete = false;

  window.initializeManageEvent = function () {
    renderEventsList();
    updateUI();
  };

  function closeManageEvent() {
    selectedEvent = null;
    selectedTab = "upcoming";
    eventToManage = null;
    viewTagged = false;
    viewRSVP = false;
    untagFriend = null;
    showDelete = false;

    document.getElementById("manage-event-modal").style.display = "none";
    const stylesheet = document.getElementById("manage-event-css");
    if (stylesheet) {
      stylesheet.remove();
    }

    const script = document.getElementById("manage-event-script");
    if (script && script.parentNode) {
      document.body.removeChild(script);
    }

    const eventsContainer = document.getElementById("events-list");
    if (eventsContainer) {
      eventsContainer.innerHTML = "";
    }
  }

  function handleBack() {
    if (untagFriend) {
      setUntagFriend(null);
    } else if (viewTagged) {
      setViewTagged(false);
    } else if (viewRSVP) {
      setViewRSVP(false);
    } else {
      setEvent(null);
    }
    updateUI();
  }

  function switchTab(tab) {
    selectedTab = tab;
    document.querySelectorAll(".tab-item").forEach((item) => {
      item.classList.remove("active");
    });
    document.querySelector(`[data-tab="${tab}"]`).classList.add("active");
    renderEventsList();
  }

  function setEvent(event) {
    selectedEvent = event;
    if (event) {
      renderEventDetail();
    }
    updateUI();
  }

  function setEventToManage(event) {
    if (eventToManage && eventToManage.id === event.id) {
      eventToManage = null;
    } else {
      eventToManage = event;
    }
    renderEventsList();
    updateUI();
  }

  function setViewTagged(state) {
    viewTagged = state;
    if (state) {
      renderTaggedView();
    }
    updateUI();
  }

  function setViewRSVP(state) {
    viewRSVP = state;
    if (state) {
      renderRSVPView();
    }
    updateUI();
  }

  function setUntagFriend(friend) {
    untagFriend = friend;
    if (friend) {
      document.getElementById("untag-username").textContent = "cermuel";
      document.getElementById("untag-friend-modal").classList.remove("d-none");
    } else {
      document.getElementById("untag-friend-modal").classList.add("d-none");
    }
  }

  function showDeleteConfirmation() {
    showDelete = true;
    document.getElementById("delete-event-modal").classList.remove("d-none");
  }

  function cancelUntagFriend() {
    setUntagFriend(null);
  }

  function confirmUntagFriend() {
    setUntagFriend(null);
  }

  function cancelDeleteEvent() {
    showDelete = false;
    document.getElementById("delete-event-modal").classList.add("d-none");
  }

  function confirmDeleteEvent() {
    setEvent(null);
    showDelete = false;
    document.getElementById("delete-event-modal").classList.add("d-none");
  }

  function viewTaggedUsers() {
    setViewTagged(true);
  }

  function viewRSVPList() {
    setViewRSVP(true);
  }

  function renderEventsList() {
    const eventsContainer = document.getElementById("events-list");
    const events = homedata.events;

    eventsContainer.innerHTML = "";

    events.forEach((event) => {
      const eventElement = document.createElement("div");
      eventElement.className = "event-list-item";

      const isSelected = eventToManage && eventToManage.id === event.id;

      eventElement.innerHTML = `
        <img 
          src="${
            isSelected
              ? "/assets/icons/checked.svg"
              : "/assets/icons/unchecked.svg"
          }" 
          alt="check" 
          class="event-checkbox"
          onclick="setEventToManage(${JSON.stringify(event).replace(
            /"/g,
            "&quot;"
          )})"
        />
        <img src="${event.image}" alt="event" class="event-list-image" />
        <div class="event-list-info">
          <p class="event-list-name">${event.name}</p>
          <div class="event-list-date">
            <img src="/assets/icons/calendar.svg" class="event-list-calendar" alt="calendar" />
            <span class="event-list-date-text">${event.date}</span>
          </div>
        </div>
        <img 
          src="/assets/icons/chevron.svg" 
          class="event-list-chevron"
          onclick="setEvent(${JSON.stringify(event).replace(/"/g, "&quot;")})"
          alt="chevron" 
        />
      `;

      eventsContainer.appendChild(eventElement);
    });
  }

  function renderEventDetail() {
    if (!selectedEvent) return;

    document.getElementById("event-detail-image").src = selectedEvent.image;
    document.getElementById(
      "event-days"
    ).textContent = `${selectedEvent.days} days`;
    document.getElementById("event-user-image").src = selectedEvent.user;
    document.getElementById("event-name").textContent = selectedEvent.name;
    document.getElementById("event-date").textContent = selectedEvent.date;
    document.getElementById("event-status").textContent = selectedEvent.status;
    document.getElementById(
      "event-rsvp-count"
    ).textContent = `RSVP count: ${selectedEvent.RSVP_count}`;
    document.getElementById("event-description").textContent =
      selectedEvent.description;
    document.getElementById("rsvp-count-text").textContent =
      selectedEvent.RSVP_count;
    document.getElementById(
      "contributed-amount"
    ).textContent = `$${selectedEvent.gift.progress}`;
    document.getElementById(
      "goal-amount"
    ).textContent = `$${selectedEvent.gift.target}`;

    const progressPercent =
      (selectedEvent.gift.progress / selectedEvent.gift.target) * 100;
    document.getElementById("progress-bar").style.width = `${progressPercent}%`;

    const taggedContainer = document.getElementById("tagged-avatars");
    taggedContainer.innerHTML = "";

    selectedEvent.tagged.forEach((tag, index) => {
      const tagElement = document.createElement("div");
      tagElement.className = "tagged-avatar";
      if (index > 0) tagElement.style.marginLeft = "-0.75rem";

      tagElement.innerHTML = `
        <div class="tagged-avatar-wrapper">
          <img src="${tag}" alt="tagged" class="tagged-avatar-image" />
        </div>
      `;

      taggedContainer.appendChild(tagElement);
    });
  }

  function renderTaggedView() {
    if (!selectedEvent) return;

    const container = document.getElementById("tagged-friends-container");
    const noTaggedDiv = document.getElementById("no-tagged-friends");
    const taggedListDiv = document.getElementById("tagged-friends-list");

    if (selectedEvent.tagged.length === 0) {
      noTaggedDiv.classList.remove("d-none");
      taggedListDiv.classList.add("d-none");
    } else {
      noTaggedDiv.classList.add("d-none");
      taggedListDiv.classList.remove("d-none");

      container.innerHTML = "";

      selectedEvent.tagged.forEach((tagged) => {
        const taggedElement = document.createElement("div");
        taggedElement.className = "tagged-friend-item";
        taggedElement.onclick = () => setUntagFriend(tagged);

        taggedElement.innerHTML = `
          <img src="${tagged}" alt="user" class="tagged-friend-avatar" />
          <div class="tagged-friend-info">
            <div class="tagged-friend-name">Samuel Chuks</div>
            <div class="tagged-friend-username">@username</div>
          </div>
          <img src="/assets/icons/remove-friend.svg" alt="remove" class="tagged-friend-remove" />
        `;

        container.appendChild(taggedElement);
      });
    }
  }

  function renderRSVPView() {
    if (!selectedEvent) return;

    const container = document.getElementById("rsvp-participants-container");
    const noRSVPDiv = document.getElementById("no-rsvp-participants");
    const rsvpListDiv = document.getElementById("rsvp-participants-list");
    const rsvpCountSpan = document.getElementById("rsvp-count");

    if (selectedEvent.tagged.length === 0) {
      noRSVPDiv.classList.remove("d-none");
      rsvpListDiv.classList.add("d-none");
    } else {
      noRSVPDiv.classList.add("d-none");
      rsvpListDiv.classList.remove("d-none");

      rsvpCountSpan.textContent = selectedEvent.tagged.length;
      container.innerHTML = "";

      selectedEvent.tagged.forEach((participant) => {
        const participantElement = document.createElement("div");
        participantElement.className = "rsvp-participant-item";

        participantElement.innerHTML = `
          <img src="${participant}" alt="user" class="rsvp-participant-avatar" />
          <div class="rsvp-participant-info">
            <div class="rsvp-participant-name">Samuel Chuks</div>
            <div class="rsvp-participant-username">@username</div>
          </div>
        `;

        container.appendChild(participantElement);
      });
    }
  }

  function updateUI() {
    const backBtn = document.getElementById("back-btn");
    const modalTitle = document.getElementById("modal-title");
    const spacer = document.getElementById("spacer");
    const eventsListView = document.getElementById("events-list-view");
    const eventDetailView = document.getElementById("event-detail-view");
    const taggedView = document.getElementById("tagged-view");
    const rsvpView = document.getElementById("rsvp-view");
    const eventMainView = document.getElementById("event-main-view");
    const noEventsState = document.getElementById("no-events-state");
    const eventsContent = document.getElementById("events-content");
    const singleEventFooter = document.getElementById("single-event-footer");
    const manageEventFooter = document.getElementById("manage-event-footer");

    if (homedata.events.length === 0) {
      noEventsState.classList.remove("d-none");
      eventsContent.classList.add("d-none");
      return;
    } else {
      noEventsState.classList.add("d-none");
      eventsContent.classList.remove("d-none");
    }

    if (selectedEvent) {
      backBtn.classList.remove("d-none");
      spacer.classList.remove("d-none");

      if (viewTagged) {
        modalTitle.textContent = "Tagged";
      } else {
        modalTitle.textContent = selectedEvent.name;
      }
      modalTitle.classList.remove("title-centered");
    } else {
      backBtn.classList.add("d-none");
      spacer.classList.add("d-none");
      modalTitle.textContent = "Manage events";
      modalTitle.classList.add("title-centered");
    }

    if (!selectedEvent) {
      eventsListView.classList.remove("d-none");
      eventDetailView.classList.add("d-none");
    } else {
      eventsListView.classList.add("d-none");
      eventDetailView.classList.remove("d-none");

      if (viewTagged) {
        taggedView.classList.remove("d-none");
        rsvpView.classList.add("d-none");
        eventMainView.classList.add("d-none");
      } else if (viewRSVP) {
        taggedView.classList.add("d-none");
        rsvpView.classList.remove("d-none");
        eventMainView.classList.add("d-none");
      } else {
        taggedView.classList.add("d-none");
        rsvpView.classList.add("d-none");
        eventMainView.classList.remove("d-none");
      }
    }

    if (selectedEvent && !viewTagged && !viewRSVP) {
      singleEventFooter.classList.remove("d-none");
      manageEventFooter.classList.add("d-none");
    } else if (eventToManage && !selectedEvent) {
      singleEventFooter.classList.add("d-none");
      manageEventFooter.classList.remove("d-none");
    } else {
      singleEventFooter.classList.add("d-none");
      manageEventFooter.classList.add("d-none");
    }

    window.switchTab = switchTab;
    window.closeManageEvent = closeManageEvent;
    window.setEventToManage = setEventToManage;
    window.setEvent = setEvent;
    window.viewTaggedUsers = viewTaggedUsers;
    window.cancelUntagFriend = cancelUntagFriend;
    window.showDeleteConfirmation = showDeleteConfirmation;
    window.confirmUntagFriend = confirmUntagFriend;
    window.cancelDeleteEvent = cancelDeleteEvent;
    window.confirmDeleteEvent = confirmDeleteEvent;
    window.handleBack = handleBack;
    window.viewRSVPList = viewRSVPList;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", window.initializeManageEvent);
  } else {
    window.initializeManageEvent();
  }
})();
