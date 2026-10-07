/* guard.js : discourages casual copying and printing of these pages.
   Disables: right-click, text selection, copy/cut, drag, print, and the
   keyboard shortcuts for save, print, view-source and developer tools.
   Typing in boxes (search, readings, answers) keeps working normally.
   Note: this is a deterrent for ordinary users. It cannot stop screenshots,
   "view source", or downloading the repository (see the notes in the chat).
   Version 2 (Oct 2026): runs only once per page, even if a page loads it twice
   (the AI Education pages carry their own copy inside the file). */
(function () {
  'use strict';
  if (window.__mmpGuard) return;
  window.__mmpGuard = 2;

  var FIELDS = 'input,textarea,select,[contenteditable="true"]';

  var css = document.createElement('style');
  css.textContent =
    'html,body{-webkit-user-select:none;-moz-user-select:none;user-select:none;-webkit-touch-callout:none}' +
    FIELDS + '{-webkit-user-select:text;-moz-user-select:text;user-select:text}' +
    'img,svg{-webkit-user-drag:none}' +
    '@media print{html{display:none!important}}';
  (document.head || document.documentElement).appendChild(css);

  function inField(t) {
    if (t && t.nodeType === 3) t = t.parentElement;
    return !!(t && t.closest && t.closest(FIELDS));
  }

  /* right-click, copy, cut, drag, start of a text selection */
  ['contextmenu', 'copy', 'cut', 'dragstart', 'selectstart'].forEach(function (name) {
    document.addEventListener(name, function (e) {
      if (!inField(e.target)) e.preventDefault();
    }, true);
  });

  /* keyboard shortcuts */
  document.addEventListener('keydown', function (e) {
    var k = (e.key || '').toLowerCase();
    var mod = e.ctrlKey || e.metaKey;
    var always =
      e.key === 'F12' ||
      (mod && (k === 'p' || k === 's' || k === 'u')) ||                  /* print, save, view source */
      (mod && e.shiftKey && (k === 'i' || k === 'j' || k === 'c')) ||     /* developer tools */
      (e.metaKey && e.altKey && (k === 'i' || k === 'j' || k === 'u'));   /* same on a Mac */
    var outsideFields = mod && (k === 'a' || k === 'c' || k === 'x') && !inField(e.target);
    if (always || outsideFields) { e.preventDefault(); e.stopPropagation(); }
  }, true);

  /* printing from the browser menu: hide the page while the print preview is made */
  window.addEventListener('beforeprint', function () { document.documentElement.style.display = 'none'; });
  window.addEventListener('afterprint', function () { document.documentElement.style.display = ''; });
})();
