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
  // Formular: Vorbelegung per URL (?art= ?maschine= ?formate= ?quelle= ?produkt= ?msg=) und data-formate.
  // Alte Links mit ?formate= setzen die Maschine mit (1 → festes Format, 4-10 → Multiformat).
  var f = document.getElementById('anfrage-form');
  if (f) {
    var q = new URLSearchParams(location.search), $ = function (s) { return f.querySelector(s); };
    var sel = $('#formate'), ma = $('#maschine');
    var T = { anfrage: ['Anfrage senden', 'Multipack: Anfrage'], rueckruf: ['Rückruf anfordern', 'Multipack: Rückruf'],
      muster: ['Beutelprüfung anfragen', 'Multipack: Beutelprüfung'] };
    var setArt = function (v) {
      if (!T[v]) return;
      var r = $('input[name="anfrageart"][value="' + v + '"]'); if (r) r.checked = true;
      $('#f-submit').textContent = T[v][0];
      $('#f-subject').value = T[v][1] + (ma && ma.value ? ' (' + ma.value + ')' : '');
      $('#phone').required = v === 'rueckruf';
      [].forEach.call(f.querySelectorAll('[data-only]'), function (el) { el.hidden = el.getAttribute('data-only').split(' ').indexOf(v) < 0; });
    };
    var setOpt = function (el, v) { if (el && v && el.querySelector('option[value="' + v + '"]')) el.value = v; };
    var fm = q.get('formate'), m = q.get('maschine');
    setOpt(sel, fm);
    if (!m && fm) m = fm === '1' ? 'fest' : fm === '4-10' ? 'multiformat' : '';
    setOpt(ma, m);
    if (q.get('quelle')) $('#f-quelle').value = q.get('quelle');
    if (q.get('produkt')) $('#product').value = q.get('produkt');
    if (q.get('msg')) $('#message').value = q.get('msg');
    setArt(q.get('art') || 'anfrage');
    f.addEventListener('change', function (e) {
      if (e.target.name === 'anfrageart') setArt(e.target.value);
      if (e.target === ma) { var c = $('input[name="anfrageart"]:checked'); setArt(c ? c.value : 'anfrage'); }
    });
    document.addEventListener('click', function (e) { var a = e.target.closest('[data-formate]'); if (a && sel) setOpt(sel, a.getAttribute('data-formate')); });
  }
  // Auswahlhilfe (Startseite): drei Fragen → Empfehlung + vorausgefüllte Anfrage. Ohne JS steht die Logik als Text darunter.
  var w = document.getElementById('wahl');
  if (w) {
    var H = document.getElementById('w-h'), P = document.getElementById('w-p'), A = document.getElementById('w-a');
    var val = function (n) { var r = w.querySelector('input[name="' + n + '"]:checked'); return r ? r.value : ''; };
    var R = {
      fest: ['Multipackmaschine für ein festes Format', 'Für liegende Beutel in einem Format. Für eine Aktion wechseln Sie nur die Etikettenrolle.', 'fest', '1'],
      festPruefen: ['Festes Format, mit Prüfung Ihrer Formate', 'Ob Ihr zweites Format auf der Maschine für ein festes Format laufen kann, prüfen wir an Ihrer Formatliste.', 'fest', '2-3'],
      beide: ['Beide Wege prüfen', 'Liegende Beutel in mehreren Formaten, die oft wechseln: Wir rechnen beide Maschinen an Ihrer Formatliste durch.', 'offen', '2-3'],
      multi: ['Multiformat-Multipackmaschine', 'Für Stehbeutel in mehreren Formaten. Das Format wechselt per Rezept am Panel, in wenigen Minuten.', 'multiformat', '4-10'],
      steh1: ['Sprechen Sie uns an', 'Ein einzelnes Stehbeutel-Format: Welche Lösung passt, prüfen wir an Ihrem Beutel.', 'offen', '1']
    };
    var upd = function () {
      var b = val('beutel'), n = val('anzahl'), x = val('wechsel'), k = '';
      if (b === 'steh') k = n === 'mehrere' ? 'multi' : n === 'eins' ? 'steh1' : '';
      else if (b === 'liegend') k = n === 'eins' ? 'fest' : n === 'mehrere' ? (x === 'oft' ? 'beide' : x === 'selten' ? 'festPruefen' : '') : '';
      if (!k) return;
      var r = R[k];
      H.textContent = r[0]; P.textContent = r[1];
      var msg = 'Auswahlhilfe: ' + (b === 'steh' ? 'Stehbeutel' : 'liegende Beutel') + ', ' + (n === 'eins' ? 'ein Format' : 'mehrere Formate') + (x ? ', Wechsel ' + x : '');
      A.href = '/kontakt?art=anfrage&maschine=' + r[2] + '&formate=' + r[3] + '&quelle=auswahlhilfe&msg=' + encodeURIComponent(msg) + '#anfrage';
      A.textContent = 'Anfrage vorbereiten';
    };
    w.addEventListener('change', upd);
    w.addEventListener('submit', function (e) { e.preventDefault(); location.href = A.href; });
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
