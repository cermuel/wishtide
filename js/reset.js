const toggleBtn = document.getElementById("togglePassword");
const toggleBtnReset = document.getElementById("togglePasswordReset");
const passwordInput = document.getElementById("password");
const passwordInputReset = document.getElementById("reset-password");
const eyeIcon = document.getElementById("eyeIcon");
const eyeIconReset = document.getElementById("eyeIconReset");
const resetBtn = document.getElementById("resetBtn");

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
toggleBtnReset.addEventListener("click", () => {
  const isPassword = passwordInputReset.type === "password";
  passwordInputReset.type = isPassword ? "text" : "password";
  eyeIconReset.src = isPassword
    ? "assets/icons/eye-closed.svg"
    : "assets/icons/eye.svg";
  toggleBtnReset.setAttribute(
    "aria-label",
    isPassword ? "Hide password" : "Show password"
  );
});

resetBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loaderOverlay.classList.remove("d-none");
  setTimeout(() => {
    loaderOverlay.classList.add("d-none");
    step1.classList.add("d-none");
    step2.classList.remove("d-none");
    startTimer();
    otpInputs[0].focus();
  }, 2000);
});
