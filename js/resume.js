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

/* Resume page — the timeline draws itself as you scroll.
   The lit rail's tip tracks a line 62% of the way down the viewport, and each
   role's dot lights once that line reaches it. Scrolling back up un-draws it. */
(function () {
  var tracks = [].slice.call(document.querySelectorAll('.track'));
  if (!tracks.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  tracks.forEach(function (t) { t.classList.add('track--live'); });
  var TOP = 10, BOTTOM = 32, ticking = false;          // the rail's inset from the track, in px
  function update() {
    ticking = false;
    var line = window.innerHeight * 0.62;
    tracks.forEach(function (t) {
      var r = t.getBoundingClientRect(), railH = Math.max(1, r.height - TOP - BOTTOM);
      var p = Math.min(1, Math.max(0, (line - r.top - TOP) / railH));
      t.style.setProperty('--p', p.toFixed(4));
      t.querySelectorAll('.role').forEach(function (role) {
        role.classList.toggle('is-lit', role.getBoundingClientRect().top + 14 < line);
      });
    });
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
