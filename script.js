/* Prevent mouse-wheel scrolling while preserving hover, mousemove, and click interactions */
(function () {
  function stopWheelScroll(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  document.addEventListener("wheel", stopWheelScroll, {
    passive: false,
    capture: true
  });

  window.addEventListener("wheel", stopWheelScroll, {
    passive: false,
    capture: true
  });
})();


/* Optional: tilt + moving glass highlight while the mouse is over the folder */
document.querySelectorAll('.gf').forEach(function(el) {
  var s = el.querySelector('.gf-stage');

  el.addEventListener('mousemove', function(e) {
    var r = el.getBoundingClientRect(),
        x = (e.clientX - r.left) / r.width,
        y = (e.clientY - r.top) / r.height;

    s.style.setProperty('--gf-ry', ((x - .5) * 10) + 'deg');
    s.style.setProperty('--gf-rx', ((.5 - y) * 8) + 'deg');

    el.querySelector('.gf-glass').style.setProperty('--gf-mx', (x * 100) + '%');
    el.querySelector('.gf-glass').style.setProperty('--gf-my', (y * 100) + '%');
  });

  el.addEventListener('mouseleave', function() {
    s.style.setProperty('--gf-rx', '0deg');
    s.style.setProperty('--gf-ry', '0deg');
  });
});


/* Responsive: fit the folder to the visible area, always centered */
(function() {
  var box = document.querySelector('.gf-center'),
      el = document.querySelector('.gf'),
      PAD = 0;

  function fit() {
    var w = box.clientWidth,
        h = box.clientHeight;

    var s = Math.min(
      (w - PAD * 2) / 400,
      (h - PAD * 2) / 360
    );

    el.style.setProperty('--gf-scale', Math.max(.3, s).toFixed(3));
  }

  fit();

  if (window.ResizeObserver)
    new ResizeObserver(fit).observe(box);

  window.addEventListener('resize', fit);
  window.addEventListener('orientationchange', fit);

  if (window.visualViewport)
    window.visualViewport.addEventListener('resize', fit);

  /* Touch screens have no hover: tap to open / close */
  el.addEventListener('click', function() {
    if (window.matchMedia('(hover:none)').matches)
      el.classList.toggle('is-open');
  });
})();
