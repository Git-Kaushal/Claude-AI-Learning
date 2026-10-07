/* Working with Claude footer - add <script src="footer.js"></script> before </body> on every page */
(function () {
  if (document.getElementById('mmp-footer')) return;

  var css = document.createElement('style');
  css.textContent =
    '#mmp-footer{position:fixed;left:0;right:0;bottom:0;z-index:9999;text-align:center;' +
      'font:13px/1.45 system-ui,"Segoe UI",Roboto,sans-serif;padding:7px 12px;' +
      'background:#fff;color:#444;border-top:1px solid #ddd}' +
    '#mmp-footer .t{font-weight:700;color:#222}' +
    '#mmp-footer a{color:#3b5bdb}' +
    '@media (prefers-color-scheme:dark){#mmp-footer{background:#1b1b1f;color:#cfcfd6;border-top-color:#333}' +
      '#mmp-footer .t{color:#fff}#mmp-footer a{color:#9db4ff}}' +
    '@media (max-width:600px){#mmp-footer{font-size:11px;line-height:1.35;padding:5px 8px}}' +
    '@media print{#mmp-footer{display:none}}' +
    /* keep the page content and the map toolbar clear of the footer */
    'body{padding-bottom:var(--mmp-footer-h,0px)}' +
    'body>svg#mindmap{height:calc(100vh - var(--mmp-footer-h,0px))!important}' +
    '.mm-toolbar{bottom:calc(20px + var(--mmp-footer-h,0px))!important}';
  document.head.appendChild(css);

  var f = document.createElement('div');
  f.id = 'mmp-footer';
  f.innerHTML =
    '<div class="t">Working with Claude &mdash; a 4-week course for educators and professionals</div>' +
    '<div>Original instructional design &amp; content by <b>Kaushal J</b> &middot; ' +
      'Education Strategist / AI in Education</div>' +
    '<div><a href="index.html">&larr; Course lessons</a> &middot; <a href="course-assessment.html">Final assessment</a> &middot; <a href="trainer-view.html">Trainer view</a></div>';
  document.body.appendChild(f);

  function refit() {
    document.documentElement.style.setProperty('--mmp-footer-h', f.offsetHeight + 'px');
    if (window.mm && typeof window.mm.fit === 'function' && document.querySelector('body>svg#mindmap')) window.mm.fit();
  }
  refit();
  if (window.ResizeObserver) new ResizeObserver(refit).observe(f); else window.addEventListener('resize', refit);
  setTimeout(refit, 500);
})();
