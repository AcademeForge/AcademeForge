setInterval(function() {
  console.clear();
  if (window.performance && window.performance.clearResourceTimings) {
    window.performance.clearResourceTimings();
  }
  (function anonymous() {
    debugger;
  })();
}, 100);
