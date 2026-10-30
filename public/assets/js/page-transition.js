/* Shared page transition for static pages (privacy/terms/cookies/docs).
   - Fades the page in on load (including bfcache restores via pageshow)
   - Fades out before navigating to another page
   - Skips all animation when the user prefers reduced motion */
(function () {
  var DURATION = 250;

  function reducedMotion() {
    return (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  document.documentElement.classList.add('pt-ready');

  // Restore visibility when a page is served from the back/forward cache
  window.addEventListener('pageshow', function () {
    document.body.classList.remove('page-leaving');
  });

  document.addEventListener('click', function (event) {
    var anchor = event.target && event.target.closest
      ? event.target.closest('a[href]')
      : null;
    if (!anchor) return;

    var href = anchor.getAttribute('href') || '';
    if (!href || href.charAt(0) === '#') return; // same-page anchor
    if (anchor.target === '_blank' || event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    var target;
    try {
      target = new URL(href, window.location.href);
    } catch (e) {
      return;
    }
    if (target.origin !== window.location.origin) return; // external link

    event.preventDefault();
    if (reducedMotion()) {
      window.location.href = target.href;
      return;
    }
    document.body.classList.add('page-leaving');
    window.setTimeout(function () {
      window.location.href = target.href;
    }, DURATION);
  });
})();
