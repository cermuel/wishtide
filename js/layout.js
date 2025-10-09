let createOpen = false;
let notificationOpen = false;
document.getElementById("createPopup").style.display = "none";
document.getElementById("notificationPanel").style.display = "none";

function loadCreateEvent() {
  fetch("create-event.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("wishlist-modal").innerHTML = html;
      const script = document.createElement("script");
      script.src = "js/create-event.js";
      document.body.appendChild(script);
      document.getElementById("wishlist-modal").classList.remove("hidden");
      const stylesheet = document.getElementById("create-wishlist-css");
      if (stylesheet) {
        stylesheet.remove();
      }
    });
}

function loadCreateWishlist() {
  fetch("create-wishlist.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("wishlist-modal").innerHTML = html;
      const script = document.createElement("script");
      script.src = "js/create-wishlist.js";
      document.body.appendChild(script);
      document.getElementById("wishlist-modal").classList.remove("hidden");
    });
}

function loadContribute() {
  fetch("contribute.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("contribute-modal").innerHTML = html;
      const script = document.createElement("script");
      script.src = "js/contribute.js";
      script.id = "contribute-script";

      document.body.appendChild(script);
    });
}
function loadRSVP() {
  fetch("rsvp.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("rsvp-modal").innerHTML = html;
      const script = document.createElement("script");
      script.src = "js/rsvp.js";
      script.id = "rsvp-script";

      document.body.appendChild(script);
    });
}

function loadCompleteProfile() {
  fetch("complete-modal.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("complete-profile").innerHTML = html;
      const script = document.createElement("script");
      script.src = "js/complete-modal.js";
      script.id = "complete-script";
      document.body.appendChild(script);
    });
}

function loadManageWishlist() {
  fetch("manage-wishlist.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("manage-wishlist").innerHTML = html;
      const script = document.createElement("script");
      script.id = "manage-wishlist-script";
      script.src = "js/manage-wishlist.js";

      document.body.appendChild(script);
    });
}

function loadManageEvent() {
  fetch("manage-event.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("manage-event").innerHTML = html;
      const existingScript = document.getElementById("manage-event-script");
      if (!existingScript) {
        const script = document.createElement("script");
        script.id = "manage-event-script";
        script.src = "js/manage-event.js";
        script.onload = () => {};
        document.body.appendChild(script);
      }
    });
}

function unloadCreateEvent() {
  const modal = document.getElementById("wishlist-modal");
  modal.classList.add("hidden");
  modal.innerHTML = `<div class="modal-content">
            <span class="close" onclick="closeWishlistModal()">×</span>
            <div id="wishlist-details"></div>
          </div>`;

  const scripts = document.querySelectorAll('script[src="js/create-event.js"]');
  scripts.forEach((script) => {
    document.body.removeChild(script);
    script.remove();
  });
}

function unloadCreateWishlist() {
  const modal = document.getElementById("wishlist-modal");
  modal.classList.add("hidden");
  modal.innerHTML = `<div class="modal-content">
            <span class="close" onclick="closeWishlistModal()">×</span>
            <div id="wishlist-details"></div>
          </div>`;
  const scripts = document.querySelectorAll(
    'script[src="js/create-wishlist.js"]'
  );

  scripts.forEach((script) => {
    document.body.removeChild(script);
    script.remove();
  });
}

function toggleNotification(e) {
  if (e) e.stopPropagation();
  if (!notificationOpen) {
    fetch("notification.html")
      .then((response) => response.text())
      .then((notificationHtml) => {
        const panel = document.getElementById("notificationPanel");
        const script = document.createElement("script");
        script.src = "js/notification.js";
        script.id = "notificationScript";
        document.body.appendChild(script);
        panel.innerHTML = notificationHtml;
        panel.style.display = "block";
        notificationOpen = true;
        setActiveNav();
      });
  } else {
    notificationOpen = false;
    document.getElementById("notificationPanel").style.display = "none";
    setActiveNav();
  }
}

function hideNotification() {
  notificationOpen = false;
  document.getElementById("notificationPanel").style.display = "none";
  setActiveNav();
}

function toggleCreate(e) {
  if (e) e.stopPropagation();
  toggleCreatePopup(true);
}

function toggleCreatePopup(show) {
  createOpen = show;
  document.getElementById("createPopup").style.display = createOpen
    ? "flex"
    : "none";

  setActiveNav();
}

function mapKeyToIconName(key) {
  if (key === "search" || key === "timeline") return "explore";
  return key;
}

function setActiveNav() {
  const path =
    (window.location.pathname.split("/").pop() || "home.html").replace(
      ".html",
      ""
    ) || "home";

  document.querySelectorAll(".sidebar-item, .bottom-item").forEach((node) => {
    const key = node.dataset.nav;
    const effectiveName =
      key === "search" || key === "timeline" ? "explore" : key;
    const iconEl = node.querySelector("img.icon");
    const labelEl = node.querySelector(".nav-label");

    let active = false;
    if (key === "create") {
      active = createOpen;
    } else if (key === "notification") {
      active = notificationOpen;
    } else {
      active = path === effectiveName || path.includes(effectiveName);
    }

    node.classList.toggle("active", active);

    if (key === "notification") {
      iconEl.src = "/assets/icons/bell-outline.svg";
    } else {
      iconEl.src = `/assets/icons/${
        active ? `${effectiveName}-colored` : effectiveName
      }.svg`;
    }

    if (labelEl) {
      labelEl.classList.toggle("active-text", active);
    }
  });
}

function initLayout() {
  document.querySelectorAll(".sidebar-item, .bottom-item").forEach((node) => {
    const key = node.dataset.nav;
    const effectiveName = mapKeyToIconName(key);
    const iconEl = node.querySelector("img.icon");
    if (iconEl) {
      if (!iconEl.src || iconEl.getAttribute("data-initialized") !== "1") {
        const file =
          key === "notification" ? "bell-outline.svg" : `${effectiveName}.svg`;
        iconEl.src = `/assets/icons/${file}`;
        iconEl.setAttribute("data-initialized", "1");
      }
    }
  });

  document.addEventListener("click", (e) => {
    const cp = document.getElementById("createPopup");
    if (!createOpen) return;
    if (
      cp &&
      !cp.contains(e.target) &&
      !e.target.closest('[data-nav="create"]')
    ) {
      toggleCreatePopup(false);
    }
  });
  setActiveNav();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLayout);
} else {
  initLayout();
}

function openWishlistModal() {
  const modal = document.getElementById("wishlist-modal");

  fetch("modal.html")
    .then((response) => response.text())
    .then((modalHtml) => {
      console.log(modalHtml);
      const details = document.getElementById("wishlist-details");
      details.innerHTML = modalHtml;
      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    });
}
window.unloadCreateEvent = unloadCreateEvent;
window.unloadCreateWishlist = unloadCreateWishlist;
window.loadContribute = loadContribute;
window.loadRSVP = loadRSVP;
window.loadCompleteProfile = loadCompleteProfile;
window.initLayout = initLayout;
window.toggleNotification = toggleNotification;
window.hideNotification = hideNotification;
window.setActiveNav = setActiveNav;
window.loadCreateEvent = loadCreateEvent;
window.loadCreateWishlist = loadCreateWishlist;
window.toggleCreate = toggleCreate;
window.toggleCreatePopup = toggleCreatePopup;
window.loadManageWishlist = loadManageWishlist;
window.loadManageEvent = loadManageEvent;
window.openWishlistModal = openWishlistModal;
