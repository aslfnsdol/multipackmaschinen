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
// Lösungsseite: Ablauf-Schema auf Knopfdruck abspielen (ohne JS bleibt das Standbild)
(function () {
  var b = document.querySelector('[data-lp-play]');
  if (!b) return;
  var fig = document.getElementById(b.getAttribute('aria-controls')), st = document.getElementById('lp-status');
  b.hidden = false;
  b.addEventListener('click', function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { st.textContent = 'Animation ausgeschaltet, weil Ihr Gerät reduzierte Bewegung wünscht.'; return; }
    fig.classList.remove('is-run'); void fig.getBoundingClientRect(); fig.classList.add('is-run');
    st.textContent = 'Ablauf: Einzelbeutel, Etikett links und rechts, fertiges Bündel, eine Packung wird abgetrennt.';
  });
})();
