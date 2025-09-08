const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");
const loaderOverlay = document.getElementById("loaderOverlay");

const createBtn = document.getElementById("createAccountBtn");
const verifyBtn = document.getElementById("verifyOtpBtn");
const resendBtn = document.getElementById("resendBtn");
const backToStep1 = document.querySelectorAll("#backToStep1");
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");
const otpInputs = document.querySelectorAll(".otp");

let countdown = 60;
let timer;

createBtn.addEventListener("click", (e) => {
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

verifyBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loaderOverlay.classList.remove("d-none");
  setTimeout(() => {
    loaderOverlay.classList.add("d-none");
    step2.classList.add("d-none");
    step3.classList.remove("d-none");
  }, 2000);
});

backToStep1.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    step2.classList.add("d-none");
    step1.classList.remove("d-none");
  })
);

togglePassword.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePassword.querySelector("img").src = "assets/icons/eye-closed.svg";
  } else {
    passwordInput.type = "password";
    togglePassword.querySelector("img").src = "assets/icons/eye.svg";
  }
});

otpInputs.forEach((input, index) => {
  input.addEventListener("input", (e) => {
    if (e.target.value && index < otpInputs.length - 1) {
      otpInputs[index + 1].focus();
    }
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpInputs[index - 1].focus();
    }
  });
});

function startTimer() {
  countdown = 60;
  resendBtn.disabled = true;
  resendBtn.textContent = `Resend code in ${countdown}s`;
  timer = setInterval(() => {
    countdown--;
    resendBtn.textContent =
      countdown > 0 ? `Resend code in ${countdown}s` : "Resend code";
    if (countdown <= 0) {
      clearInterval(timer);
      resendBtn.disabled = false;
    }
  }, 1000);
}

resendBtn.addEventListener("click", () => {
  if (!resendBtn.disabled) {
    otpInputs.forEach((input) => (input.value = ""));
    otpInputs[0].focus();
    startTimer();
  }
});
