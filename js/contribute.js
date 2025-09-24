let currentIndex = 0;
let isAnonymous = false;
let amount = 0;
let selectedPaymentMethod = null;
let isPaid = false;

const wishlistData = {
  image: "/assets/images/wishlist-1.svg",
  price: "$150",
  name: "Tjaay Birthday wishlist",
  user: "/assets/images/user-1.svg",

  description:
    "Join me in celebrating Tjaay's special day! Help us make it memorable by contributing to this wishlist.",
  gift: { progress: 400, target: 1000 },
  id: 1,
  items: [
    {
      image: "assets/images/wishlist-2.jpg",
      name: "Jordan Airforce 1s ",
    },
    {
      image: "/assets/images/wishlist-1.svg",
      name: "Nike Sneakers",
    },
  ],
};

function initializeContribute() {
  currentIndex = 0;
  isAnonymous = false;
  amount = 0;
  selectedPaymentMethod = null;
  isPaid = false;

  updateItemDisplay();
  updateNavigationButtons();
  resetAnonymousToggle();
  resetAmountInput();
  resetPaymentMethods();
  updateProceedButton();

  document.getElementById("form-state").classList.remove("d-none");
  document.getElementById("success-state").classList.add("d-none");
}

function updateItemDisplay() {
  const currentItem = wishlistData.items[currentIndex];
  if (currentItem) {
    document.getElementById("current-item-image").src = currentItem.image;
    document.getElementById("current-item-image").alt = currentItem.name;
    document.getElementById("current-item-name").textContent = currentItem.name;
  }

  document.querySelector(".contribute-wishlist-name").textContent =
    wishlistData.name;
}

function updateNavigationButtons() {
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  if (currentIndex > 0) {
    prevBtn.classList.remove("d-none");
  } else {
    prevBtn.classList.add("d-none");
  }

  if (currentIndex < wishlistData.items.length - 1) {
    nextBtn.classList.remove("d-none");
  } else {
    nextBtn.classList.add("d-none");
  }
}

function previousItem() {
  if (currentIndex > 0) {
    currentIndex--;
    updateItemDisplay();
    updateNavigationButtons();
  }
}

function nextItem() {
  if (currentIndex < wishlistData.items.length - 1) {
    currentIndex++;
    updateItemDisplay();
    updateNavigationButtons();
  }
}

function toggleAnonymous() {
  isAnonymous = !isAnonymous;
  const toggleIcon = document.getElementById("anonymous-toggle");

  if (isAnonymous) {
    toggleIcon.src = "/assets/icons/radio.svg";
  } else {
    toggleIcon.src = "/assets/icons/unradio.svg";
  }
}

function resetAnonymousToggle() {
  isAnonymous = false;
  document.getElementById("anonymous-toggle").src = "/assets/icons/unradio.svg";
}

function handleAmountChange(event) {
  amount = parseFloat(event.target.value) || 0;
  updateProceedButton();
}

function resetAmountInput() {
  amount = 0;
  document.getElementById("amount-input").value = "";
  updateProceedButton();
}

function selectPaymentMethod(method) {
  document.getElementById("stripe-radio").src = "/assets/icons/unradio.svg";
  document.getElementById("paypal-radio").src = "/assets/icons/unradio.svg";

  if (selectedPaymentMethod === method) {
    selectedPaymentMethod = null;
  } else {
    selectedPaymentMethod = method;
    const radioId = method.toLowerCase() + "-radio";
    document.getElementById(radioId).src = "/assets/icons/radio.svg";
  }

  updateProceedButton();
}

function resetPaymentMethods() {
  selectedPaymentMethod = null;
  document.getElementById("stripe-radio").src = "/assets/icons/unradio.svg";
  document.getElementById("paypal-radio").src = "/assets/icons/unradio.svg";
  updateProceedButton();
}

function updateProceedButton() {
  const proceedBtn = document.getElementById("proceed-btn");

  if (amount > 0 && selectedPaymentMethod) {
    proceedBtn.disabled = false;
    proceedBtn.classList.remove("contribute-proceed-btn-disabled");
  } else {
    proceedBtn.disabled = true;
    proceedBtn.classList.add("contribute-proceed-btn-disabled");
  }
}

function proceedPayment() {
  if (amount > 0 && selectedPaymentMethod) {
    isPaid = true;
    showSuccessState();
  }
}

function showSuccessState() {
  document.getElementById("payment-amount").textContent = amount;

  const contributeContent = document.getElementById("contribute-content");
  contributeContent.classList.add("contribute-success-height");

  document.getElementById("form-state").classList.add("d-none");
  document.getElementById("success-state").classList.remove("d-none");
}

function closeContribute() {
  const modal = document.getElementById("contribute-modal-main");
  if (modal) {
    modal.remove();
  }
  const stylesheet = document.getElementById("contribute-css");
  if (stylesheet) {
    stylesheet.remove();
  }

  const script = document.getElementById("contribute-script");
  if (script && script.parentNode) {
    document.body.removeChild(script);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeContribute);
} else {
  initializeContribute();
}
