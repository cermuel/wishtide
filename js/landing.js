const features = [
  {
    title: "Wishlist",
    text: "Add products, experiences, or cash funds. Set privacy from Public to Friends to Private. Share once—no more guesswork.",
  },
  {
    title: "Contributions",
    text: "Secure payment options. Real-time tracking. Choose to show name/amount, or give anonymously.",
  },
  {
    title: "Events",
    text: "Attach a wishlist to birthdays, showers, weddings, graduations, and more. Manage RSVPs and send updates in one place.",
  },
  {
    title: "Handles",
    text: "Claim a @handle so friends can always find your latest wishlist and events.",
  },
];

const howTo = [
  {
    number: 1,
    title: "Create",
    text: "Pick wishlist or event, add items, set a goal, and choose your privacy.",
    img: "/assets/images/create.svg",
  },
  {
    number: 2,
    title: "Add Items",
    text: "Tag and or share publicly, privately or invite friends. Also, share link to friends or post it to your social—done.",
    img: "/assets/images/add-items.svg",
  },
  {
    number: 3,
    title: "Tag & share",
    text: "Tag and or share publicly, privately or invite friends. Also, share link to friends or post it to your social—done.",
    img: "/assets/images/tag.svg",
  },
  {
    number: 4,
    title: "Celebrate",
    text: "Watch contributions arrive, track progress, and say thanks with one tap.",
    img: "/assets/images/tag.svg",
  },
];

const testimonials = [
  {
    id: 1,
    text: "WishList made my birthday so special! My friends contributed to my dream camera fund, and I finally got the Sony A7 IV I'd been wanting for months. The platform made it so easy for everyone to chip in.",
    name: "Sarah Chen",
    role: "Photography Enthusiast",
    avatar: "/assets/images/user-1.svg",
  },
  {
    id: 2,
    text: "I love how transparent the contribution process is. I could see exactly who contributed to my laptop fund for college, and it felt amazing to have my family and friends support my education goals.",
    name: "Marcus Johnson",
    role: "College Student",
    avatar: null,
  },
  {
    id: 3,
    text: "As a mom, creating wishlists for my kids' birthdays has been a game-changer. Relatives can contribute to bigger gifts instead of buying duplicates, and the kids get exactly what they want!",
    name: "Emily Rodriguez",
    role: "Mother of Two",
    avatar: "/assets/images/user-2.svg",
  },
  {
    id: 4,
    text: "My wedding registry was scattered across multiple stores until I found WishList. Now all our friends and family can contribute to our honeymoon fund and home essentials in one place. Brilliant!",
    name: "David Park",
    role: "Newlywed",
    avatar: "/assets/images/user.svg",
  },
  {
    id: 5,
    text: "Running fundraising for my art studio equipment was so much easier with WishList. The progress tracking motivated my supporters, and I reached my goal 2 weeks early!",
    name: "Alex Thompson",
    role: "Digital Artist",
    avatar: null,
  },
];

const faqs = [
  {
    question: "What is Wishtide?",
    answer:
      "A social gifting app for creating and sharing wishlists, collecting contributions, and planning events—so everyone gives what's truly wanted.",
  },
  {
    question: "How do contributions work?",
    answer:
      "Friends and family can contribute any amount toward items on your wishlist. Once enough contributions are collected, you can purchase the item or receive the funds directly to your account.",
  },
  {
    question: "Can I make private lists?",
    answer:
      "Yes! You can create private wishlists that are only visible to people you specifically invite. You have full control over who can view and contribute to your lists.",
  },
  {
    question: "Is Wishtide secure?",
    answer:
      "Absolutely. We use bank-level encryption to protect your financial information and personal data. All transactions are processed through secure payment gateways, and we never store your payment details.",
  },
];

let currentSlide = 0;
let openFAQ = 0;

function getPrevIndex() {
  return (currentSlide - 1 + testimonials.length) % testimonials.length;
}

function getNextIndex() {
  return (currentSlide + 1) % testimonials.length;
}

function goToSlide(index) {
  currentSlide = index;
  renderTestimonials();
}

function toggleFAQ(index) {
  openFAQ = openFAQ === index ? -1 : index;
  renderFAQs();
}

function renderFeatures() {
  const container = document.getElementById("features-grid");
  container.innerHTML = features
    .map(
      (feature) => `
        <div class="col-12 col-sm-6">
            <div class="bg-white border border-nav rounded-5 p-4 p-sm-5 d-flex flex-column gap-3 feature-card">
                <img src="/assets/icons/logo-small.svg" class="feature-icon" alt="">
                <h1 class="text-dark-custom feature-card-title">${feature.title}</h1>
                <p class="text-muted-custom feature-card-text">${feature.text}</p>
            </div>
        </div>
    `
    )
    .join("");
}

function renderScrollingFeatures() {
  const container = document.getElementById("scrolling-features");
  const scrollingItems = [
    {
      icon: "/assets/icons/spark-colored.svg",
      text: "No hidden fees for users",
    },
    { icon: "/assets/icons/spark-colored.svg", text: "Link sharing" },
    { icon: "/assets/icons/spark-colored.svg", text: "Contribution receipts" },
  ];

  const duplicatedItems = [...scrollingItems, ...scrollingItems];

  container.innerHTML = duplicatedItems
    .map(
      (item) => `
        <img src="${item.icon}" alt="" class="flex-shrink-0 scrolling-icon">
        <p class="flex-shrink-0 scrolling-text text-dark-custom">${item.text}</p>
    `
    )
    .join("");
}

function renderHowTo() {
  const howToGrid = document.getElementById("how-to-grid");

  howTo.forEach((item) => {
    const howToItem = document.createElement("div");
    howToItem.className = `how-to-item ${item.number % 2 ? "" : "reverse"}`;
    howToItem.innerHTML = `
        <img src="${item.img}" alt="${item.title}">
        <div class="how-to-content">
          <h1 class="number">${item.number}.</h1>
          <h1 class="title">${item.title}</h1>
          <p>${item.text}</p>
        </div>
      `;
    howToGrid.appendChild(howToItem);
  });
}

function renderTestimonials() {
  const container = document.getElementById("testimonials-container");
  const prevIndex = getPrevIndex();
  const nextIndex = getNextIndex();

  const createAvatarHTML = (testimonial) => {
    if (testimonial.avatar) {
      return `<img src="${testimonial.avatar}" alt="${testimonial.name}" class="testimonial-avatar">`;
    } else {
      const initials = testimonial.name
        .split(" ")
        .map((n) => n[0])
        .join("");
      return `
                <div class="testimonial-avatar-placeholder">
                    <span class="testimonial-initials">${initials}</span>
                </div>
            `;
    }
  };

  container.innerHTML = `
        <div class="d-none d-md-block testimonial-side-preview">
            <div class="bg-white rounded-3 p-4 shadow-sm border border-light text-center">
                <p class="text-muted testimonial-preview-text">"${
                  testimonials[prevIndex].text
                }"</p>
                <div class="d-flex align-items-center justify-content-center gap-2">
                    ${createAvatarHTML(testimonials[prevIndex])}
                    <div class="text-start">
                        <p class="fw-semibold text-dark testimonial-preview-name">${
                          testimonials[prevIndex].name
                        }</p>
                        <p class="text-muted testimonial-preview-role">${
                          testimonials[prevIndex].role
                        }</p>
                    </div>
                </div>
            </div>
        </div>
        

        <div class="testimonial-main-container">
            <div class="bg-white rounded-3 border p-4 p-sm-5 text-center testimonial-main-card">
                <p class="text-dark testimonial-main-text">"${
                  testimonials[currentSlide].text
                }"</p>
                <div class="d-flex align-items-center justify-content-start gap-3 testimonial-author">
                    ${createAvatarHTML(testimonials[currentSlide])}
                    <div class="text-start">
                        <p class="fw-semibold text-dark testimonial-main-name">${
                          testimonials[currentSlide].name
                        }</p>
                        <p class="text-muted testimonial-main-role">${
                          testimonials[currentSlide].role
                        }</p>
                    </div>
                </div>
            </div>
        </div>
        

        <div class="d-none d-md-block testimonial-side-preview">
            <div class="bg-white rounded-3 p-4 shadow-sm border border-light text-center">
                <p class="text-muted testimonial-preview-text">"${
                  testimonials[nextIndex].text
                }"</p>
                <div class="d-flex align-items-center justify-content-center gap-2">
                    ${createAvatarHTML(testimonials[nextIndex])}
                    <div class="text-start">
                        <p class="fw-semibold text-dark testimonial-preview-name">${
                          testimonials[nextIndex].name
                        }</p>
                        <p class="text-muted testimonial-preview-role">${
                          testimonials[nextIndex].role
                        }</p>
                    </div>
                </div>
            </div>
        </div>
    `;

  renderTestimonialIndicators();
}

function renderTestimonialIndicators() {
  const container = document.getElementById("testimonial-indicators");
  container.innerHTML = testimonials
    .map(
      (_, index) => `
        <button 
            class="testimonial-indicator ${
              index === currentSlide ? "active" : ""
            }"
            onclick="goToSlide(${index})"
            aria-label="Go to testimonial ${index + 1}"
        ></button>
    `
    )
    .join("");
}

function renderFAQs() {
  const container = document.getElementById("faq-container");
  container.innerHTML = faqs
    .map(
      (faq, index) => `
        <div class="border-bottom border-light pb-3 mb-4 faq-item">
            <button 
                class="btn btn-link w-100 d-flex align-items-center justify-content-between text-start p-0 text-decoration-none faq-button"
                onclick="toggleFAQ(${index})"
            >
                <span class="fw-semibold text-dark faq-question">${
                  faq.question
                }</span>
                <div class="flex-shrink-0 faq-icon-container">
                    <img 
                        src="${
                          openFAQ === index
                            ? "/assets/icons/faq-opened.svg"
                            : "/assets/icons/faq-closed.svg"
                        }"
                        alt="${openFAQ === index ? "Collapse" : "Expand"}"
                        class="faq-icon ${
                          openFAQ === index ? "rotate-180" : ""
                        }"
                    >
                </div>
            </button>
            <div class="faq-answer ${openFAQ === index ? "show" : ""}">
                <div class="pe-5 pb-2">
                    <p class="text-muted faq-answer-text">${faq.answer}</p>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  renderFeatures();
  renderScrollingFeatures();
  renderHowTo();
  renderTestimonials();
  renderFAQs();
});

window.goToSlide = goToSlide;
window.toggleFAQ = toggleFAQ;
