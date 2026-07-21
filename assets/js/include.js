

(function () {
  var HEADER_URL = "/global/header.html";
  var FOOTER_URL = "/global/footer.html";

  var SCRIPTS_AFTER_INJECT = [
    "/assets/js/theme.js",
    "/assets/js/lang.min.js?v=2.0",
    "/assets/js/script.min.js?v=7.0",
    "/assets/js/warn.js?v=3.0",
    "/assets/js/security.min.js?v=3.0"
  ];

  function loadScriptsInOrder(urls, done) {
    var i = 0;
    function next() {
      if (i >= urls.length) {
       
        document.dispatchEvent(new Event("DOMContentLoaded", { bubbles: true, cancelable: true }));
        window.dispatchEvent(new Event("load"));
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

  document.addEventListener("DOMContentLoaded", function () {
    Promise.all([
      inject(HEADER_URL, "site-header"),
      inject(FOOTER_URL, "site-footer")
    ]).then(function () {
      loadScriptsInOrder(SCRIPTS_AFTER_INJECT);
    });
  });
})();
