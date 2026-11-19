/* =========================================================
   LOCK PAGE SCROLL
   Prevent wheel, touch, and keyboard scrolling
   while preserving hover, mouse movement, and animations.
   ========================================================= */

(function () {

  // Prevent mouse wheel scrolling
  function preventWheelScroll(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  document.addEventListener("wheel", preventWheelScroll, {
    passive: false,
    capture: true
  });

  window.addEventListener("wheel", preventWheelScroll, {
    passive: false,
    capture: true
  });

  // Prevent keyboard scrolling
  document.addEventListener("keydown", function (e) {
    const scrollKeys = [
      "ArrowUp",
      "ArrowDown",
      "PageUp",
      "PageDown",
      "Home",
      "End",
      " "
    ];

    if (scrollKeys.includes(e.key)) {
      e.preventDefault();
    }
  }, true);

  // Prevent touch scrolling
  document.addEventListener("touchmove", function (e) {
    e.preventDefault();
  }, {
    passive: false,
    capture: true
  });

})();


/* =========================================================
   HOVER TILT + MOVING GLASS HIGHLIGHT
   Original animation preserved
   ========================================================= */

document.querySelectorAll('.gf').forEach(function(el) {

  var s = el.querySelector('.gf-stage');

  el.addEventListener('mousemove', function(e) {

    var r = el.getBoundingClientRect();
    var x = (e.clientX - r.left) / r.width;
    var y = (e.clientY - r.top) / r.height;

    s.style.setProperty(
      '--gf-ry',
      ((x - .5) * 10) + 'deg'
    );

    s.style.setProperty(
      '--gf-rx',
      ((.5 - y) * 8) + 'deg'
    );

    el.querySelector('.gf-glass').style.setProperty(
      '--gf-mx',
      (x * 100) + '%'
    );

    el.querySelector('.gf-glass').style.setProperty(
      '--gf-my',
      (y * 100) + '%'
    );

  });

  el.addEventListener('mouseleave', function() {

    s.style.setProperty('--gf-rx', '0deg');
    s.style.setProperty('--gf-ry', '0deg');

  });

});


/* =========================================================
   RESPONSIVE FOLDER
   Original sizing behavior preserved
   ========================================================= */

(function() {

  var box = document.querySelector('.gf-center');
  var el = document.querySelector('.gf');
  var PAD = 0;

  function fit() {

    var w = box.clientWidth;
    var h = box.clientHeight;

    var s = Math.min(
      (w - PAD * 2) / 400,
      (h - PAD * 2) / 360
    );

    el.style.setProperty(
      '--gf-scale',
      Math.max(.3, s).toFixed(3)
    );

  }

  fit();

  if (window.ResizeObserver) {
    new ResizeObserver(fit).observe(box);
  }

  window.addEventListener('resize', fit);
  window.addEventListener('orientationchange', fit);

  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', fit);
  }

  /* Touch screens: tap to open / close */
  el.addEventListener('click', function() {

    if (window.matchMedia('(hover:none)').matches) {
      el.classList.toggle('is-open');
    }

  });

})();
