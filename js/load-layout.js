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
        document.getElementById("pageContent").appendChild(content);

        const pageName = page.replace(".html", "");
        const script = document.createElement("script");
        script.src = `js/${pageName}.js`;
        script.onerror = () =>
          console.warn(`No JS file found for ${pageName}.html`);
        document.body.appendChild(script);
      });
  });
