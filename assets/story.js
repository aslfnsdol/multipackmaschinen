/* Scroll-Geschichte (Szenen A–C) + Formatwechsel-Schema. Keine Bibliothek, kein Scroll-Jacking.
   Ohne JS, bei reduzierter Bewegung, unter 900 px Breite oder 620 px Höhe zeigt jede Szene ihr eigenes
   Standbild (im HTML). Nur mit <html class="anim"> ab 900 px läuft die klebende Bühne.
   Jedes Bühnenelement trägt 3 Schlüsselbilder in data-k ("x y s o;…"); hier wird nur interpoliert. */
(function () {
  'use strict';
  var d = document, w = window;
  var reduce = w.matchMedia('(prefers-reduced-motion: reduce)');
  var wideMQ = w.matchMedia('(min-width: 900px)');

  function ease(t) { t = t < 0 ? 0 : t > 1 ? 1 : t; return t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function mix(a, b, t) { return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t), lerp(a[3], b[3], t)]; }
  function place(el, p) {
    el.setAttribute('transform', 'translate(' + p[0].toFixed(1) + ' ' + p[1].toFixed(1) + ') scale(' + p[2].toFixed(3) + ')');
    el.setAttribute('opacity', p[3].toFixed(3));
  }
  function nums(s, sep) { return s.split(sep).map(Number); }
  function keys(el) { return el.getAttribute('data-k').split(';').map(function (s) { return nums(s, ' '); }); }
  function op(el, v) { if (el) el.setAttribute('opacity', v.toFixed(3)); }

  /* ---------- Bühne (nur Desktop mit Bewegung) ---------- */
  var story = d.getElementById('story'), svg = story && story.querySelector('.stage');
  if (svg && d.documentElement.classList.contains('anim') && !reduce.matches) (function () {
    var q = function (r) { return [].slice.call(svg.querySelectorAll('[data-role="' + r + '"]')); };
    var items = q('icon').concat(q('label'), q('f'), q('bag')).map(function (e) { return { el: e, k: keys(e), i: +(e.getAttribute('data-i') || 0) }; });
    q('icon').forEach(function (e, i) { items[i].i = i; });
    q('label').forEach(function (e, i) { items[q('icon').length + i].i = i; });
    var belts = q('belts')[0], bo = nums(belts.getAttribute('data-o'), ' ');
    var mf = q('mf')[0], mk = keys(mf), slots = q('slot'), outs = q('outs'), cap = q('cap')[0];
    var texts = [].slice.call(story.querySelectorAll('.step-text'));
    var ticking = false, lastQ = -1, active = true;

    function render(Q) {                       // Q in [0,2]
      var seg = Math.min(1, Math.floor(Q)), t = Q - seg;
      items.forEach(function (it) { place(it.el, mix(it.k[seg], it.k[seg + 1], ease((t - it.i * .025) / .85))); });
      op(belts, lerp(bo[seg], bo[seg + 1], ease(seg ? t : (t - .4) / .5)));
      place(mf, mix(mk[seg], mk[seg + 1], ease(seg ? (t - .15) / .85 : (t - .55) / .45)));
      var lit = seg ? Math.floor(ease((t - .35) / .45) * 4.99) : 0, done = seg && t > .85;
      slots.forEach(function (s, j) { s.classList.toggle('lit', j < lit); s.classList.toggle('on', !!done && j === 2); });
      outs.forEach(function (o) { op(o, done ? ease((t - .85) / .15) : 0); });
      op(cap, seg ? ease((t - .6) / .4) : 0);
    }

    /* Fortschritt an der Textmitte: 0 = Text A mittig, 1 = Text B mittig, 2 = Text C mittig.
       Zwischen zwei Texten 30 % halten, 40 % Übergang, 30 % halten. */
    function progress() {
      var mid = w.innerHeight / 2;
      var c = texts.map(function (s) { var b = s.getBoundingClientRect(); return (b.top + b.bottom) / 2; });
      if (mid <= c[0]) return 0;
      for (var i = 0; i < c.length - 1; i++) {
        if (mid < c[i + 1]) { var t = (mid - c[i]) / (c[i + 1] - c[i]); return i + Math.max(0, Math.min(1, (t - .3) / .4)); }
      }
      return c.length - 1;
    }
    function frame() { ticking = false; if (!wideMQ.matches) return; var Q = progress(); if (Math.abs(Q - lastQ) > .0005) { lastQ = Q; render(Q); } }
    function onScroll() { if (active && !ticking) { ticking = true; w.requestAnimationFrame(frame); } }

    var dbg = /[?&]p=([\d.]+)/.exec(location.search);   // ?p=1.5 friert einen Zustand ein (Standbilder)
    if (dbg) { render(parseFloat(dbg[1])); return; }
    frame();
    if ('IntersectionObserver' in w) new IntersectionObserver(function (e) { active = e[0].isIntersecting; if (active) onScroll(); }).observe(story);
    w.addEventListener('scroll', onScroll, { passive: true });
    var lastW = w.innerWidth;
    w.addEventListener('resize', function () { if (w.innerWidth !== lastW) { lastW = w.innerWidth; lastQ = -1; onScroll(); } });
  })();

  /* ---------- Formatwechsel-Schema: startet nur auf Klick, läuft einmal durch ---------- */
  var fw = d.querySelector('[data-role="fw"]'), btn = d.getElementById('fw-btn'), cap2 = d.getElementById('fw-cap');
  if (fw && btn) {
    var fslots = [].slice.call(fw.querySelectorAll('[data-role="slot"]'));
    var fouts = [].slice.call(fw.querySelectorAll('.out')), fins = [].slice.call(fw.querySelectorAll('.inb'));
    var disp = fw.querySelector('[data-role="disp"]');
    var N = nums(fw.getAttribute('data-n') || '3 2 4 3', ' '), cur = 2, timer = null, left = 0;
    var show = function (k) {
      cur = k;
      fslots.forEach(function (s, j) { s.classList.toggle('on', j === k); });
      fouts.concat(fins).forEach(function (o, j) { o.setAttribute('opacity', j % 4 === k ? 1 : 0); });
      /* Panel markiert die Rezeptzeile, die Nummer steht in der Statuszeile */
      cap2.textContent = 'Aktiv: Rezept ' + (k + 1) + ', ' + N[k] + 'er-Bündel';
    };
    var stop = function () { clearInterval(timer); timer = null; btn.textContent = 'Formatwechsel abspielen'; };
    btn.hidden = false;
    btn.addEventListener('click', function () {
      if (timer) { stop(); return; }
      left = 4; btn.textContent = 'Anhalten';
      timer = setInterval(function () { show((cur + 1) % 4); if (--left <= 0) stop(); }, reduce.matches ? 1600 : 1100);
    });
  }
})();
