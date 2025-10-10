let rsvp = null;

function selectRSVP(action) {
  const opts = document.querySelectorAll(".rsvp-option");
  opts.forEach((o) =>
    o.classList.remove("active-yes", "active-no", "active-maybe")
  );
  const btn = document.querySelector(`[data-action="${action}"]`);
  if (rsvp !== action) {
    rsvp = action;
    btn.classList.add(`active-${action.toLowerCase()}`);
    if (action === "Yes") toggleModal("add-to-calendar-modal");
  } else {
    rsvp = null;
  }
}

function toggleImg(el, off, on) {
  el.src = el.src.includes(off) ? on : off;
}

function toggleModal(id) {
  document.getElementById(id).classList.toggle("d-none");
}

function closeRSVP() {
  document.getElementById("rsvp-modal-main").remove();
  document.getElementById("rsvp-css").remove();
}

document.addEventListener("click", (e) => {
  if (e.target.id === "rsvp-modal-main") closeRSVP();
});
