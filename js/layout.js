let createOpen = false;
let notificationOpen = false;
document.getElementById("createPopup").style.display = "none";
document.getElementById("notificationPanel").style.display = "none";

function toggleNotification(e) {
  if (e) e.stopPropagation();
  notificationOpen = !notificationOpen;
  document.getElementById("notificationPanel").style.display = notificationOpen
    ? "block"
    : "none";
  setActiveNav();
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
