let v = "list",
  c = 0;

function closeManageEvent() {
  let m = document.getElementById("manage-event-modal");
  if (m) m.style.display = "none";
  document.getElementById("manage-event-css")?.remove();
}

function switchTab(t) {
  document
    .querySelectorAll(".tab-item")
    .forEach((i) => i.classList.remove("active"));
  event.target.classList.add("active");
}

function toggleCheck(e) {
  let s = e.src.includes("unchecked");
  e.src = s ? "/assets/icons/checked.svg" : "/assets/icons/unchecked.svg";
  c = s ? c + 1 : c - 1;
  upd();
}

function showDetail() {
  v = "detail";
  upd();
}

function showTagged() {
  v = "tagged";
  upd();
}

function showRSVP() {
  v = "rsvp";
  upd();
}

function goBack() {
  v = v === "tagged" || v === "rsvp" ? "detail" : "list";
  upd();
}

function showUntag() {
  document.getElementById("untag-friend-modal").classList.remove("d-none");
}

function cancelUntag() {
  document.getElementById("untag-friend-modal").classList.add("d-none");
}

function confirmUntag() {
  cancelUntag();
}

function showDel() {
  document.getElementById("delete-event-modal").classList.remove("d-none");
}

function cancelDelete() {
  document.getElementById("delete-event-modal").classList.add("d-none");
}

function confirmDelete() {
  v = "list";
  cancelDelete();
  upd();
}

function upd() {
  let b = document.getElementById("back-btn"),
    t = document.getElementById("modal-title"),
    s = document.getElementById("spacer");
  let lv = document.getElementById("events-list-view"),
    dv = document.getElementById("event-detail-view");
  let tv = document.getElementById("tagged-view"),
    rv = document.getElementById("rsvp-view"),
    mv = document.getElementById("event-main-view");
  let sf = document.getElementById("single-event-footer"),
    mf = document.getElementById("manage-event-footer");

  b.classList.toggle("d-none", v === "list");
  s.classList.toggle("d-none", v === "list");
  t.textContent =
    v === "list"
      ? "Manage events"
      : v === "detail"
      ? "Sarah Birthday"
      : v === "tagged"
      ? "Tagged"
      : "RSVP List";

  lv.classList.toggle("d-none", v !== "list");
  dv.classList.toggle("d-none", v === "list");
  tv.classList.toggle("d-none", v !== "tagged");
  rv.classList.toggle("d-none", v !== "rsvp");
  mv.classList.toggle("d-none", v === "tagged" || v === "rsvp");

  sf.classList.toggle("d-none", v !== "detail");
  mf.classList.toggle("d-none", v !== "list" || c === 0);
}

window.closeManageEvent = closeManageEvent;
window.switchTab = switchTab;
window.toggleCheck = toggleCheck;
window.showDetail = showDetail;
window.showTagged = showTagged;
window.showRSVP = showRSVP;
window.goBack = goBack;
window.showUntag = showUntag;
window.cancelUntag = cancelUntag;
window.confirmUntag = confirmUntag;
window.showDel = showDel;
window.cancelDelete = cancelDelete;
window.confirmDelete = confirmDelete;
