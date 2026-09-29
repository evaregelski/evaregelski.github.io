/* Resume page — skill lenses.
   Pressing a lens dims what isn't evidence for it rather than hiding it,
   so the shape of the history stays readable while the relevant lines
   come forward. Pressing it again, or Escape, clears. */
(function () {
  var bar = document.querySelector('[data-lenses]');
  if (!bar) return;
  var cv = document.querySelector('[data-cv]');
  var lenses = bar.querySelectorAll('.lens[data-lens]');
  var clear = bar.querySelector('.lens--clear');
  var active = null;

  function apply(tag) {
    active = tag;
    cv.querySelectorAll('.role__bullets li').forEach(function (li) {
      var tags = (li.getAttribute('data-tags') || '').split(' ');
      li.classList.toggle('is-match', !!tag && tags.indexOf(tag) > -1);
    });
    cv.setAttribute('data-filtered', tag ? 'true' : 'false');
    lenses.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lens === tag));
    });
    if (clear) clear.hidden = !tag;
  }

  lenses.forEach(function (b) {
    b.addEventListener('click', function () {
      apply(b.dataset.lens === active ? null : b.dataset.lens);
    });
  });
  if (clear) clear.addEventListener('click', function () { apply(null); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && active) apply(null);
  });

  apply(null);
})();
