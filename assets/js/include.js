(function () {
  var HEADER_URL = "/global/header.html";
  var FOOTER_URL = "/global/footer.html";

  // Scripts that touch nav/footer/drawer/cmd-palette elements.
  // Loaded in this order, only after both partials are injected.
  var SCRIPTS_AFTER_INJECT = [
    "/assets/js/theme.js",
    "/assets/js/lang.min.js?v=1.0",
    "/assets/js/script.min.js?v=6.0",
    "/assets/js/warn.js?v=1.0",
    "/assets/js/security.min.js?v=2.0"
  ];

  function loadScriptsInOrder(urls, done) {
    var i = 0;
    function next() {
      if (i >= urls.length) { done && done(); return; }
      var s = document.createElement("script");
      s.src = urls[i++];
      s.onload = next;
      s.onerror = next; // don't block the rest if one fails
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

  document.addEventListener("DOMContentLoaded", function () {
    Promise.all([
      inject(HEADER_URL, "site-header"),
      inject(FOOTER_URL, "site-footer")
    ]).then(function () {
      loadScriptsInOrder(SCRIPTS_AFTER_INJECT);
    });
  });
})();
