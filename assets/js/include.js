(function () {
  var HEADER_URL = "https://academeforge.in/global/header.html";
  var FOOTER_URL = "https://academeforge.in/global/footer.html";
  var SIDEBAR_URL = "https://academeforge.in/global/sidebar.html";
  var SCRIPTS_AFTER_INJECT = [
    "https://academeforge.in/assets/js/theme.js",
    "https://academeforge.in/assets/js/lang.min.js?v=2.0",
    "https://academeforge.in/assets/js/script.min.js?v=7.0",
    "https://academeforge.in/assets/js/warn.js?v=3.0",
    "https://academeforge.in/assets/js/security.min.js?v=3.0"
  ];

  var scriptsReadyFired = false;
  function loadScriptsInOrder(urls, done) {
    var i = 0;
    function next() {
      if (i >= urls.length) {
        if (!scriptsReadyFired) {
          scriptsReadyFired = true;
          document.dispatchEvent(new Event("DOMContentLoaded", { bubbles: true, cancelable: true }));
          window.dispatchEvent(new Event("load"));
        }
        done && done();
        return;
      }
      var s = document.createElement("script");
      s.src = urls[i++];
      s.onload = next;
      s.onerror = next;
      document.body.appendChild(s);
    }
    next();
  }

  function inject(url, mountId) {
    var mount = document.getElementById(mountId);
    if (!mount) return Promise.resolve();
    return fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error("Failed to load " + url);
        return res.text();
      })
      .then(function (html) {
        mount.innerHTML = html;
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  /* Sidebar — appended directly to <body> so it is never inside
     any scrollable container and never affects page layout flow. */
  function injectSidebar(url) {
    return fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error("Failed to load " + url);
        return res.text();
      })
      .then(function (html) {
        var wrapper = document.createElement("div");
        wrapper.id = "site-sidebar";
        wrapper.style.cssText = "position:fixed;top:0;left:0;width:0;height:0;overflow:visible;pointer-events:none;z-index:9999;";
        wrapper.innerHTML = html;
        document.body.appendChild(wrapper);
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  function bootstrap() {
    Promise.all([
      inject(HEADER_URL, "site-header"),
      inject(FOOTER_URL, "site-footer"),
      injectSidebar(SIDEBAR_URL)
    ]).then(function () {
      loadScriptsInOrder(SCRIPTS_AFTER_INJECT);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap, { once: true });
  } else {
    bootstrap();
  }
})();
