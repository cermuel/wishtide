document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");
  const eyeIcon = document.getElementById("eyeIcon");

  toggleBtn.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    eyeIcon.src = isPassword
      ? "assets/icons/eye-closed.svg"
      : "assets/icons/eye.svg";
    toggleBtn.setAttribute(
      "aria-label",
      isPassword ? "Hide password" : "Show password"
    );
  });
});

function loginUser(e) {
  if (e) e.preventDefault();
  loaderOverlay.classList.remove("d-none");
  setTimeout(() => {
    loaderOverlay.classList.add("d-none");
    window.location.href = "home.html";
  }, 2000);
}
