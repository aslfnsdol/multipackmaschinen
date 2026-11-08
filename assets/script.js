// multipackmaschinen.de — kleine Komfortfunktionen. Alles funktioniert auch ohne JS:
// Menü = natives <details>, FAQ = <details>, Formular sendet nativ an Web3Forms.
(function () {
  'use strict';
  // Mobilmenü nach Klick auf einen Link schließen
  var mnav = document.querySelector('.mnav');
  if (mnav) {
    mnav.addEventListener('click', function (e) { if (e.target.closest('a')) mnav.removeAttribute('open'); });
    document.addEventListener('click', function (e) { if (!mnav.contains(e.target)) mnav.removeAttribute('open'); });
  }
  // Formular: Vorbelegung per URL (?art= ?formate= ?quelle= ?produkt= ?msg=) und data-formate, Anfrageart steuert Pflicht/Text
  var f = document.getElementById('anfrage-form');
  if (f) {
    var q = new URLSearchParams(location.search), sel = f.querySelector('#formate');
    var T = { anfrage: ['Anfrage senden', 'Multipack: Anfrage'], rueckruf: ['Rückruf anfordern', 'Multipack: Rückruf'], muster: ['Musteranfrage senden', 'Multipack: Muster'] };
    var setArt = function (v) {
      if (!T[v]) return;
      var r = f.querySelector('input[name="anfrageart"][value="' + v + '"]'); if (r) r.checked = true;
      f.querySelector('#f-submit').textContent = T[v][0];
      f.querySelector('#f-subject').value = T[v][1];
      f.querySelector('#phone').required = v === 'rueckruf';
      [].forEach.call(f.querySelectorAll('[data-only]'), function (el) { el.hidden = el.getAttribute('data-only') !== v; });
    };
    if (q.get('formate')) sel.value = q.get('formate');
    if (q.get('quelle')) f.querySelector('#f-quelle').value = q.get('quelle');
    if (q.get('produkt')) f.querySelector('#product').value = q.get('produkt');
    if (q.get('msg')) f.querySelector('#message').value = q.get('msg');
    setArt(q.get('art') || 'anfrage');
    f.addEventListener('change', function (e) { if (e.target.name === 'anfrageart') setArt(e.target.value); });
    document.addEventListener('click', function (e) { var a = e.target.closest('[data-formate]'); if (a) sel.value = a.getAttribute('data-formate'); });
  }
})();
// Lösungsseite: Ablauf-Animation (#lpa). Ersetzt in assets/script.js den Block „Lösungsseite: Ablauf-Schema auf Knopfdruck…“ (Z. 33–44).
// Ohne JS bleibt das Standbild. Läuft nur, solange der Abschnitt sichtbar ist; Knopf hält an (WCAG 2.2.2).
(function () {
  var fig = document.getElementById('lpa'), b = document.querySelector('[data-lpa]'), st = document.getElementById('lpa-status');
  if (!fig || !b || !st) return;
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)');
  var seen = false, vis = false, user = false;
  var RM = 'Standbild, weil Ihr Gerät reduzierte Bewegung wünscht. ';
  var TXT = 'Beutel laufen ein und stapeln sich, zwei Etikettierer setzen je ein Etikett, das Multipack läuft aus.';
  function sync() {
    if (rm.matches) {
      fig.classList.remove('lpa-on', 'lpa-hold'); b.hidden = true;
      st.textContent = RM + TXT;
      return;
    }
    if (st.textContent.indexOf(RM) === 0) st.textContent = '';
    b.hidden = false;
    if (seen) fig.classList.add('lpa-on');
    fig.classList.toggle('lpa-hold', !vis || user);
    b.textContent = user ? 'Abspielen' : 'Anhalten';
  }
  b.addEventListener('click', function () {
    user = !user; seen = true; sync();
    st.textContent = user ? 'Animation angehalten.' : 'Animation läuft: ' + TXT;
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e) {
      vis = e[0].isIntersecting; if (vis) seen = true;
      sync();
    }, { threshold: 0.35 }).observe(fig);
  } else seen = vis = true;
  if (rm.addEventListener) rm.addEventListener('change', sync);
  sync();
})();
