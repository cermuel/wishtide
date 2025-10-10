function filterTab(t) {
  document
    .querySelectorAll(".notification-tab")
    .forEach((b) => b.classList.remove("active"));
  event.target.classList.add("active");
  let e = document.getElementById("notificationEmpty"),
    c = document.getElementById("notificationContent"),
    m = document.getElementById("giftMilestone");

  if (t === "all") {
    document
      .querySelectorAll(".notification-item")
      .forEach((i) => (i.style.display = "block"));
    document
      .querySelectorAll(".notification-group")
      .forEach((g) => (g.style.display = "block"));
    if (m) m.style.display = "block";
    e.style.display = "none";
    c.style.display = "block";
  } else {
    let v = false;
    document.querySelectorAll(".notification-item").forEach((i) => {
      let s = i.dataset.type === t;
      i.style.display = s ? "block" : "none";
      if (s) v = true;
    });
    document.querySelectorAll(".notification-group").forEach((g) => {
      let h = Array.from(g.querySelectorAll(".notification-item")).some(
        (i) => i.style.display !== "none"
      );
      g.style.display = h ? "block" : "none";
    });
    if (m) m.style.display = "none";
    e.style.display = v ? "none" : "flex";
    c.style.display = v ? "block" : "none";
  }
}

window.filterTab = filterTab;
