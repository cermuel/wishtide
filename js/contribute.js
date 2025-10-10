const items = [
  { image: "/assets/images/wishlist-1.svg", name: "Nike Sneakers" },
  { image: "assets/images/wishlist-2.jpg", name: "Jordan Airforce 1s" },
];
let idx = 0,
  anon = false,
  amt = 0,
  method = null;

function navigate(d) {
  idx = Math.max(0, Math.min(idx + d, items.length - 1));
  document.getElementById("current-item-image").src = items[idx].image;
  document.getElementById("current-item-name").textContent = items[idx].name;
  document.getElementById("prev-btn").classList.toggle("d-none", idx === 0);
  document
    .getElementById("next-btn")
    .classList.toggle("d-none", idx === items.length - 1);
}

function toggle(id, base) {
  const el = document.getElementById(id);
  el.src = el.src.includes("unradio")
    ? base + "radio.svg"
    : base + "unradio.svg";
}

function selectPayment(m) {
  method = method === m ? null : m;
  document.getElementById("stripe-radio").src =
    "/assets/icons/" + (method === "stripe" ? "radio" : "unradio") + ".svg";
  document.getElementById("paypal-radio").src =
    "/assets/icons/" + (method === "paypal" ? "radio" : "unradio") + ".svg";
  checkForm();
}

function checkForm() {
  amt = parseFloat(document.getElementById("amount-input").value) || 0;
  document.getElementById("proceed-btn").disabled = !(amt > 0 && method);
}

function proceedPayment() {
  document.getElementById("payment-amount").textContent = amt;
  document.getElementById("form-state").classList.add("d-none");
  document.getElementById("success-state").classList.remove("d-none");
}

function closeContribute() {
  document.getElementById("contribute-modal-main").remove();
  document.getElementById("contribute-css").remove();
}

navigate(0);
