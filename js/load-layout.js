let isLayoutLoaded = false;

async function loadRightSection() {
  try {
    const response = await fetch("right-section.html");
    const html = await response.text();
    const rightSection = document.getElementById("right-section");
    if (rightSection) {
      rightSection.innerHTML = html;
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error loading right section", error);
    return false;
  }
}

function renderSuggestedUsers() {
  const container = document.getElementById("suggestedUsers");
  if (!container) return;

  const users = Array.from({ length: 8 }, (_, i) => ({
    name: "Bintu Gbadamosi",
    avatar: "/assets/images/friend.svg",
  }));
  container.innerHTML = users
    .map(
      (user) => `
                <div class="user-suggestion">
                    <img src="${user.avatar}" alt="friend" style="width: 2rem; height: 2rem;" class="rounded-circle">
                    <span style="font-size: 0.875rem; color: #242424;">${user.name}</span>
                    <button class="follow-btn">Follow</button>
                </div>
            `
    )
    .join("");
}

function loadPageContent(page) {
  const pageName = page.replace(".html", "");

  document.querySelectorAll("script[data-page-script]").forEach((script) => {
    script.remove();
  });

  fetch(page)
    .then((res) => res.text())
    .then((contentHtml) => {
      const temp = document.createElement("div");
      temp.innerHTML = contentHtml.trim();
      const content = temp.querySelector("#pageContent");
      if (content) {
        const layoutPageContent = document.getElementById("pageContent");
        if (layoutPageContent) {
          layoutPageContent.innerHTML = content.innerHTML;
        }
      }

      const script = document.createElement("script");
      script.src = `js/${pageName}.js`;
      script.type = "module";
      script.setAttribute("data-page-script", pageName);

      script.onload = async () => {
        await loadRightSection();
        if (page === "profile.html") {
          const userInfo = document.getElementById("right-user-details");
          if (userInfo) {
            userInfo.classList.add("d-none");
          }
        }
        document.dispatchEvent(
          new CustomEvent("pageLoaded", {
            detail: { pageName },
          })
        );
        renderSuggestedUsers();

        if (window.setActiveNav) {
          window.setActiveNav();
        }
      };

      script.onerror = async () => {
        console.warn(`No JS file found for ${pageName}.js`);

        await loadRightSection();
        renderSuggestedUsers();
        document.dispatchEvent(
          new CustomEvent("pageLoaded", {
            detail: { pageName },
          })
        );
        if (window.setActiveNav) {
          window.setActiveNav();
        }
      };

      document.body.appendChild(script);
    })
    .catch((err) => {
      console.error(`Error loading page ${page}:`, err);
    });
}

function navigateToPage(page) {
  if (isLayoutLoaded) {
    loadPageContent(page);

    const newUrl = page.startsWith("/") ? page : "/" + page;
    history.pushState({}, "", newUrl);
  } else {
    window.location.href = page;
  }
}

document.addEventListener("click", (event) => {
  if (!isLayoutLoaded) return;

  const link = event.target.closest("a[href]");
  if (!link) return;

  const href = link.getAttribute("href");
  if (
    !href ||
    href.startsWith("#") ||
    href.startsWith("http") ||
    href.includes("://")
  ) {
    return;
  }
  event.preventDefault();
  const page = href.startsWith("/") ? href.substring(1) : href;
  navigateToPage(page);
});

window.addEventListener("popstate", (event) => {
  if (isLayoutLoaded) {
    const page = window.location.pathname.split("/").pop() || "home.html";
    loadPageContent(page);
  }
});

if (document.getElementById("sidebar")) {
  isLayoutLoaded = true;
  const page = window.location.pathname.split("/").pop() || "home.html";
  loadPageContent(page);
} else {
  fetch("layout.html")
    .then((res) => res.text())
    .then((layoutHtml) => {
      document.body.innerHTML = layoutHtml;
      const layoutScript = document.createElement("script");
      layoutScript.src = "js/layout.js";
      document.body.appendChild(layoutScript);

      isLayoutLoaded = true;

      const page = window.location.pathname.split("/").pop() || "home.html";

      setTimeout(() => {
        loadPageContent(page);
      }, 100);
    })
    .catch((err) => {
      console.error("Error loading layout:", err);
    });
}

window.navigateToPage = navigateToPage;
