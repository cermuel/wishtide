const loaderOverlay = document.getElementById("loaderOverlay");
const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loaderOverlay.classList.remove("d-none");
  setTimeout(() => {
    loaderOverlay.classList.add("d-none");
  }, 2000);
});
