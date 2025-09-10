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
        script.onload = () => {
          console.log(`${pageName}.js loaded successfully`);

          document.dispatchEvent(
            new CustomEvent("pageLoaded", {
              detail: { pageName },
            })
          );
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
