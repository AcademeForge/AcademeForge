(function () {
  var SIDEBAR_URL = "https://academeforge.in/global/sidebar.html";

  function injectSidebar() {
    fetch(SIDEBAR_URL)
      .then(function (res) {
        if (!res.ok) throw new Error("Failed to load sidebar: " + res.status);
        return res.text();
      })
      .then(function (html) {
        var host = document.createElement("div");
        host.id = "site-sidebar-host";
        host.style.cssText =
          "position:fixed;top:0;left:0;width:0;height:0;" +
          "overflow:visible;z-index:9999;pointer-events:none;";
        document.body.appendChild(host);
        var shadow = host.attachShadow({ mode: "open" });
        shadow.innerHTML = html;
      })
      .catch(function (err) {
        console.error("[Sidebar]", err);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectSidebar, { once: true });
  } else {
    injectSidebar();
  }
})();
