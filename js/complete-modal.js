let currentStep = 1;

function closeCompleteProfile() {
  const modal = document.getElementById("complete-profile-modal");
  if (modal) {
    modal.classList.remove("show");
    setTimeout(() => {
      const container = document.getElementById("complete-profile");
      if (container) {
        container.innerHTML = "";
      }

      const script = document.getElementById("complete-script");
      if (script) {
        script.remove();
      }
    }, 300);
  }
}

function handleCompleteProfileNext() {
  if (currentStep === 1) {
    const firstname = document.getElementById("firstname").value.trim();
    const lastname = document.getElementById("lastname").value.trim();

    if (!firstname || !lastname) {
      alert("Please fill in all required fields");
      return;
    }

    currentStep = 2;
    updateCompleteProfileStep();
  } else {
    closeCompleteProfile();
  }
}

function updateCompleteProfileStep() {
  const step1 = document.getElementById("step-1");
  const step2 = document.getElementById("step-2");
  const title = document.getElementById("complete-profile-title");
  const skipBtn = document.getElementById("skip-btn");
  const actionBtn = document.getElementById("action-btn");

  if (currentStep === 1) {
    step1.classList.remove("d-none");
    step2.classList.add("d-none");
    title.textContent = "Profile Completion";
    skipBtn.classList.add("d-none");
    actionBtn.textContent = "Update";
    actionBtn.classList.remove("complete-profile-flex-1");
  } else {
    step1.classList.add("d-none");
    step2.classList.remove("d-none");
    title.textContent = "Friend suggestions for you";
    skipBtn.classList.remove("d-none");
    actionBtn.textContent = "Next";
    actionBtn.classList.add("complete-profile-flex-1");
  }
}

document.addEventListener("click", function (event) {
  const modal = document.getElementById("complete-profile-modal");
  const content = document.getElementById("complete-profile-content");

  if (modal && event.target === modal) {
    closeCompleteProfile();
  }
});

(function initCompleteProfile() {
  setTimeout(() => {
    const modal = document.getElementById("complete-profile-modal");
    if (modal) {
      modal.classList.add("show");
    }
  }, 10);
})();
