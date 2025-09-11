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
    console.error("Error loading right seciton", error);
    return false;
  }
}

function renderSuggestedUsers() {
  const container = document.getElementById("suggestedUsers");
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

fetch("layout.html")
  .then((res) => res.text())
  .then((layoutHtml) => {
    document.body.innerHTML = layoutHtml;

    const layoutScript = document.createElement("script");
    layoutScript.src = "js/layout.js";
    document.body.appendChild(layoutScript);

    const page = window.location.pathname.split("/").pop() || "home.html";

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

        const pageName = page.replace(".html", "");
        const script = document.createElement("script");
        script.src = `js/${pageName}.js`;
        script.type = "module";
        script.onload = async () => {
          await loadRightSection();

          document.dispatchEvent(
            new CustomEvent("pageLoaded", {
              detail: { pageName },
            })
          );
          renderSuggestedUsers();
        };
        script.onerror = () => {
          console.warn(`No JS file found for ${pageName}.js`);
        };
        document.body.appendChild(script);
      })
      .catch((err) => {
        console.error(`Error loading page ${page}:`, err);
      });
  })
  .catch((err) => {
    console.error("Error loading layout:", err);
  });
