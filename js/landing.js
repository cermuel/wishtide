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
let testimonialInterval;

function getPrevIndex() {
  return (currentSlide - 1 + testimonials.length) % testimonials.length;
}

function getNextIndex() {
  return (currentSlide + 1) % testimonials.length;
}

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

function updateTestimonials() {
  const prevCard = document.querySelector(".testimonial-prev");
  const mainCard = document.querySelector(".testimonial-main");
  const nextCard = document.querySelector(".testimonial-next");

  const prevIndex = getPrevIndex();
  const nextIndex = getNextIndex();

  const prevText = prevCard.querySelector(".testimonial-text");
  const prevAvatar = prevCard.querySelector(".author-avatar");
  const prevName = prevCard.querySelector(".author-name");
  const prevRole = prevCard.querySelector(".author-role");

  prevText.textContent = `"${testimonials[prevIndex].text}"`;
  prevName.textContent = testimonials[prevIndex].name;
  prevRole.textContent = testimonials[prevIndex].role;

  if (testimonials[prevIndex].avatar) {
    prevAvatar.innerHTML = `<img src="${testimonials[prevIndex].avatar}" alt="${testimonials[prevIndex].name}">`;
  } else {
    prevAvatar.innerHTML = `<span class="avatar-initials">${getInitials(
      testimonials[prevIndex].name
    )}</span>`;
    prevAvatar.classList.add("avatar-placeholder");
  }

  const mainText = mainCard.querySelector(".testimonial-text");
  const mainAvatar = mainCard.querySelector(".author-avatar");
  const mainName = mainCard.querySelector(".author-name");
  const mainRole = mainCard.querySelector(".author-role");

  mainText.textContent = `"${testimonials[currentSlide].text}"`;
  mainName.textContent = testimonials[currentSlide].name;
  mainRole.textContent = testimonials[currentSlide].role;

  if (testimonials[currentSlide].avatar) {
    mainAvatar.innerHTML = `<img src="${testimonials[currentSlide].avatar}" alt="${testimonials[currentSlide].name}">`;
    mainAvatar.classList.remove("avatar-placeholder");
  } else {
    mainAvatar.innerHTML = `<span class="avatar-initials">${getInitials(
      testimonials[currentSlide].name
    )}</span>`;
    mainAvatar.classList.add("avatar-placeholder");
  }

  const nextText = nextCard.querySelector(".testimonial-text");
  const nextAvatar = nextCard.querySelector(".author-avatar");
  const nextName = nextCard.querySelector(".author-name");
  const nextRole = nextCard.querySelector(".author-role");

  nextText.textContent = `"${testimonials[nextIndex].text}"`;
  nextName.textContent = testimonials[nextIndex].name;
  nextRole.textContent = testimonials[nextIndex].role;

  if (testimonials[nextIndex].avatar) {
    nextAvatar.innerHTML = `<img src="${testimonials[nextIndex].avatar}" alt="${testimonials[nextIndex].name}">`;
    nextAvatar.classList.remove("avatar-placeholder");
  } else {
    nextAvatar.innerHTML = `<span class="avatar-initials">${getInitials(
      testimonials[nextIndex].name
    )}</span>`;
    nextAvatar.classList.add("avatar-placeholder");
  }

  updateDots();
}

function updateDots() {
  const dotsContainer = document.querySelector(".testimonials-dots");
  dotsContainer.innerHTML = "";

  testimonials.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = `testimonial-dot ${index === currentSlide ? "active" : ""}`;
    dot.setAttribute("aria-label", `Go to testimonial ${index + 1}`);
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
}

function goToSlide(index) {
  currentSlide = index;
  updateTestimonials();
  resetInterval();
}

function resetInterval() {
  clearInterval(testimonialInterval);
  testimonialInterval = setInterval(() => {
    if (currentSlide === testimonials.length - 1) {
      goToSlide(0);
    } else {
      goToSlide(currentSlide + 1);
    }
  }, 5000);
}

function renderFAQs() {
  const faqContainer = document.querySelector(".faq-container");

  faqs.forEach((faq, index) => {
    const faqItem = document.createElement("div");
    faqItem.className = "faq-item";

    faqItem.innerHTML = `
            <button class="faq-button" data-index="${index}">
                <span class="faq-question">${faq.question}</span>
                <div class="faq-icon">
                    <img src="/assets/icons/faq-closed.svg" alt="Expand" class="icon-closed">
                    <img src="/assets/icons/faq-opened.svg" alt="Collapse" class="icon-opened">
                </div>
            </button>
            <div class="faq-answer-wrapper ${index === 0 ? "open" : ""}">
                <div class="faq-answer">
                    <p>${faq.answer}</p>
                </div>
            </div>
        `;

    faqContainer.appendChild(faqItem);
  });

  document.querySelectorAll(".faq-button").forEach((button) => {
    button.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"));
      toggleFAQ(index);
    });
  });
}

function toggleFAQ(index) {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item, i) => {
    const wrapper = item.querySelector(".faq-answer-wrapper");
    const icon = item.querySelector(".faq-icon");

    if (i === index) {
      if (openFAQ === index) {
        wrapper.classList.remove("open");
        icon.classList.remove("open");
        openFAQ = -1;
      } else {
        wrapper.classList.add("open");
        icon.classList.add("open");
        openFAQ = index;
      }
    } else {
      wrapper.classList.remove("open");
      icon.classList.remove("open");
    }
  });
}

function initAnimations() {
  if (typeof gsap === "undefined") {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  if (typeof SplitText !== "undefined") {
    const heroTitle = new SplitText(".hero-title", { type: "words" });
    gsap.from(heroTitle.words, {
      y: 100,
      opacity: 0,
      duration: 3,
      stagger: 0.1,
      ease: "elastic.out(1, 0.3)",
    });

    const heroText = new SplitText(".hero-text", { type: "words" });
    gsap.from(heroText.words, {
      x: -1000,
      opacity: 0,
      duration: 1,
      stagger: 0.07,
      ease: "power2.out",
      delay: 2,
    });
  } else {
    gsap.from(".hero-title", {
      y: 100,
      opacity: 0,
      duration: 2,
      ease: "elastic.out(1, 0.3)",
    });

    gsap.from(".hero-text", {
      x: -100,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      delay: 1.5,
    });
  }

  const timeline = gsap.timeline({
    repeat: -1,
    repeatDelay: 5,
  });

  const heroImg1 = document.querySelectorAll(".hero-img-1");
  const heroImg2 = document.querySelectorAll(".hero-img-2");

  if (heroImg1.length > 0 && heroImg2.length > 0) {
    timeline
      .fromTo(
        heroImg1,
        {
          clipPath: "polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%)",
          duration: 0.8,
          ease: "power2.out",
          scale: 1.5,
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          scale: 1,
        }
      )
      .fromTo(
        heroImg2,
        {
          clipPath: "polygon(100% 86%, 100% 86%, 100% 100%, 100% 100%)",
          duration: 0.8,
          ease: "power2.out",
          scale: 1.5,
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          scale: 1,
        }
      );
  }

  const features = document.querySelectorAll(".feature");
  const featureContainer = document.querySelector(".feature-container");

  if (features.length > 0 && featureContainer) {
    features.forEach((feature, i) => {
      gsap.from(feature, {
        scrollTrigger: {
          trigger: featureContainer,
          start: "top 80%",
          toggleActions: "restart none restart none",
        },
        delay: i * 0.2,
        duration: 1.5,
        scale: 0.8,
        x: i % 2 ? 100 : -100,
        opacity: 0,
        ease: "power3.out",
      });
    });
  }

  const hero2Images = document.querySelectorAll(".hero-2");
  if (hero2Images.length > 0) {
    hero2Images.forEach((image, i) => {
      gsap.from(image, {
        scrollTrigger: {
          trigger: image,
          start: "top 80%",
          toggleActions: "restart none restart none",
        },
        delay: i * 0.2,
        duration: 1.2,
        scale: 0.5,
        opacity: 0,
        ease: "power3.out",
      });
    });
  }

  const howtoSection = document.querySelector(".how-to-section");
  const howtoInner = document.querySelector(".how-to-inner");

  if (howtoSection && howtoInner) {
    const scrollDistance = howtoInner.scrollWidth - howtoSection.offsetWidth;

    gsap.to(howtoInner, {
      x: -scrollDistance - 200,
      ease: "none",
      scrollTrigger: {
        trigger: howtoSection,
        pin: true,
        scrub: 1,
        end: () => `+=${howtoInner.scrollWidth + 200}`,
        pinSpacing: true,
      },
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  updateTestimonials();
  resetInterval();

  renderFAQs();

  if (typeof gsap !== "undefined") {
    setTimeout(() => {
      initAnimations();
    }, 100);
  }
});
