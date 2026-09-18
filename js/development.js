/* Development page — swap a cover poster for the live game iframe on demand.
   Nothing loads until the visitor asks for it. */
(function () {
  var posters = document.querySelectorAll('[data-play]');
  if (!posters.length) return;

  [].forEach.call(posters, function (btn) {
    btn.addEventListener('click', function () {
      var frame = btn.closest('.proto').querySelector('.proto__frame');
      var iframe = document.createElement('iframe');
      iframe.src = btn.getAttribute('data-play');
      iframe.title = btn.getAttribute('data-title') || 'Playable game';
      iframe.setAttribute('allow', 'autoplay; fullscreen; gamepad');
      iframe.setAttribute('allowfullscreen', '');
      frame.innerHTML = '';
      frame.appendChild(iframe);
      iframe.focus();
    });
  });
})();
