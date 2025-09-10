function initNotificationPanel() {
  let notifications = [
    {
      id: 1,
      type: "contribution",
      title: "New Contribution",
      message: "Contribution from John",
      amount: "$50.00",
      date: "09/07/2025",
      time: "Today",
      avatar: "/assets/images/user.svg",
      actionText: "View wishlist",
      actionColor: "text-purple-600",
    },
    {
      id: 2,
      type: "rsvp",
      title: "RSVP - Chuck's Birthday event",
      message: "Tjaey is going",
      date: "09/07/2025",
      time: "Today",
      avatar: "/assets/images/user-1.svg",
      actionText: "View RSVP list",
      actionColor: "text-purple-600",
    },
    {
      id: 3,
      type: "rsvp",
      title: "RSVP - Birthday event",
      message: "Tjaey is going",
      date: "09/07/2025",
      time: "Today",
      avatar: "/assets/images/user-2.svg",
      actionText: "View RSVP list",
      actionColor: "text-purple-600",
    },
    {
      id: 4,
      type: "rsvp",
      title: "Hajiz birthday is tomorrow",
      message: "",
      date: "Yesterday",
      time: "Yesterday",
      avatar: "/assets/images/user.svg",
      actionText: "RSVP",
      actionColor: "text-white",
      actionBg: "bg-purple-600",
      hasButton: true,
    },
    {
      id: 5,
      type: "rsvp",
      title: "Hajiz RSVPd to your event",
      message: "",
      date: "Yesterday",
      time: "Yesterday",
      avatar: "/assets/images/friend.svg",
    },
    {
      id: 6,
      type: "wishlist",
      title: 'Hajiz liked your "Birthday wishlist"',
      message: "",
      date: "Yesterday",
      time: "Yesterday",
      avatar: "/assets/images/user-2.svg",
    },
    {
      id: 7,
      type: "follow",
      title: "Hajiz started following you",
      message: "",
      date: "Yesterday",
      time: "Yesterday",
      avatar: "/assets/images/user-1.svg",
      actionText: "Follow",
      hasButton: true,
    },
    {
      id: 8,
      type: "wishlist",
      title: '"Birthdays wishlist" has 50 views',
      message: "",
      date: "Last 7 days",
      time: "Last 7 days",
      avatar: "/assets/images/friend.svg",
      isCircular: true,
    },
  ];
  //   notifications = [];
  let activeTab = "all";

  function renderNotificationItem(notification) {
    const actionButton = notification.actionText
      ? `<div class="notification-action">
        <button class="notification-btn ${
          notification.hasButton
            ? "notification-btn-primary"
            : "notification-btn-secondary"
        }">
          ${notification.actionText}
        </button>
      </div>`
      : "";

    const divider =
      notification.message || notification.amount
        ? `<div class="notification-divider">
        ${
          notification.message
            ? `<p class="notification-message">${notification.message}</p>`
            : ""
        }
        ${
          notification.amount
            ? `<p class="notification-amount">${notification.amount}</p>`
            : ""
        }
      </div>`
        : "";

    return `
      <div class="notification-item" data-type="${notification.type}">
        <div class="notification-item-content">
          <div class="notification-item-header">
            <img src="${notification.avatar}" alt="" class="notification-avatar" />
            <div class="notification-item-body">
              <p class="notification-item-title">${notification.title}</p>
            </div>
            ${actionButton}
          </div>
          ${divider}
        </div>
      </div>
    `;
  }

  function renderNotifications(filteredNotifications) {
    const groupedNotifications = filteredNotifications.reduce(
      (acc, notification) => {
        const timeGroup = notification.time;
        if (!acc[timeGroup]) {
          acc[timeGroup] = [];
        }
        acc[timeGroup].push(notification);
        return acc;
      },
      {}
    );

    // Generate HTML for each group
    const groupsHtml = Object.entries(groupedNotifications)
      .map(([timeGroup, notifications]) => {
        const notificationsHtml = notifications
          .map((notification) => renderNotificationItem(notification))
          .join("");

        return `
        <div class="notification-group" data-time="${timeGroup}">
          <div class="notification-group-title">
            <h3>${timeGroup}</h3>
          </div>
          <div class="notification-list">
            ${notificationsHtml}
          </div>
        </div>
      `;
      })
      .join("");

    const giftMilestone =
      activeTab === "all"
        ? `
      <div id="giftMilestone" class="gift-milestone">
        <div class="gift-milestone-header">
          <h3 class="gift-milestone-title">Gift milestone</h3>
          <a href="#" class="gift-milestone-link">View list</a>
        </div>
        <div class="gift-milestone-progress">
          <div class="gift-milestone-stats">
            <span>10 Items listed</span>
            <span>40% completed</span>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar"></div>
          </div>
        </div>
      </div>
    `
        : "";

    return groupsHtml + giftMilestone;
  }

  function initNotificationTabs() {
    const tabs = document.querySelectorAll(".notification-tab");
    tabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        tabs.forEach((t) => t.classList.remove("active"));
        this.classList.add("active");
        activeTab = this.getAttribute("data-tab");
        filterNotifications();
      });
    });
  }

  function filterNotifications() {
    const filteredNotifications =
      activeTab === "all"
        ? notifications
        : notifications.filter((n) => n.type === activeTab);

    const notificationContent = document.getElementById("notificationContent");
    const notificationEmpty = document.getElementById("notificationEmpty");

    if (filteredNotifications.length === 0) {
      notificationEmpty.style.display = "flex";
      notificationContent.style.display = "none";
    } else {
      notificationEmpty.style.display = "none";
      notificationContent.style.display = "block";

      // Render the filtered notifications
      notificationContent.innerHTML = renderNotifications(
        filteredNotifications
      );
    }
  }

  initNotificationTabs();
  filterNotifications();
}

initNotificationPanel();
