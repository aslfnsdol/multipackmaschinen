/* Kostenrechner Etikett-Multipack vs. Schrumpffolie. Formeln laut nacht/02 §5.2, stehen auch sichtbar auf der Seite.
   Hauptergebnis (Review 1): Grenz-Etikettenpreis aus den Werten des Kunden; Spanne in € nur sekundär.
   Ohne JS bleibt das statische Rechenbeispiel (Beispielwerte) stehen. */
(function () {
  'use strict';
  var f = document.getElementById('calc');
  if (!f) return;
  var $ = function (id) { return document.getElementById(id); };
  var inp = {};
  [].forEach.call(f.querySelectorAll('input.in'), function (i) { inp[i.getAttribute('data-k')] = i; });
  var same = $('c-same'), sendBase = $('c-send').getAttribute('href').split('?')[0];
  f.querySelector('.calc-btns').hidden = false;
  // Plausible Bereiche [min, max] je Feld (Schutz vor Tippfehlern wie 1000000,5 oder 50000 kW)
  var LIM = { M: [1, 50e6], n: [1, 20], gF: [0.1, 100], pF: [0.1, 20], PT: [0, 200], hT: [0, 8760], pE: [0, 2],
    e: [1, 4], pL: [0, 200], PM: [0, 50], hM: [0, 8760], XS: [0, 1e6], XE: [0, 1e6],
    HP: [0, 50], HH: [0, 60], HW: [0, 52], HS: [0, 200], HB: [0, 60] };

  function num(s) {
    s = String(s).replace(/\s|€/g, '');
    if (s.indexOf(',') >= 0) s = s.replace(/\./g, '').replace(',', '.');
    else if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, '');
    return s === '' || isNaN(+s) ? NaN : +s;
  }
  var nf = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 });
  var nf2 = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  function rd(v, step) { return Math.round(v / step) * step; }
  function sg(v) { v = rd(v, 100); return (v > 0 ? '+' : v < 0 ? '−' : '') + nf.format(Math.abs(v)); }
  function e0(v) { return nf.format(rd(v, 100)) + '\u00a0€'; }
  function span(a, b, fn) { fn = fn || e0; return fn(a) === fn(b) ? fn(a) : fn(a) + ' – ' + fn(b); }
  function mark(i, bad) { var c = i.closest('.field'); if (c && bad) c.classList.add('is-invalid'); i.setAttribute('aria-invalid', bad ? 'true' : 'false'); }

  function calc() {
    if (same.checked) inp.hM.value = inp.hT.value;
    inp.hM.readOnly = same.checked;
    [].forEach.call(f.querySelectorAll('.field.is-invalid'), function (c) { c.classList.remove('is-invalid'); });
    var v = {}, ok = true;
    Object.keys(inp).forEach(function (k) {
      var n = num(inp[k].value), l = LIM[k.replace(/[01]$/, '')], bad = isNaN(n) || (l && (n < l[0] || n > l[1]));
      mark(inp[k], bad); if (bad) ok = false; v[k] = n;
    });
    ['gF', 'pF', 'pL'].forEach(function (k) {   // von > bis: nicht still tauschen, sondern am Feld melden
      if (v[k + '0'] > v[k + '1']) { mark(inp[k + '0'], true); mark(inp[k + '1'], true); ok = false; }
    });
    var verdict = $('c-verdict');
    if (!ok) {
      $('c-thr').firstChild.nodeValue = '—';
      $('c-span').firstChild.nodeValue = 'Unterschied pro Jahr: —';
      verdict.innerHTML = '<p>Ergebnis: —. Bitte prüfen Sie die markierten Felder.</p>';
      [].forEach.call(document.querySelectorAll('.result-table td, #r-kg, #r-kwh, #r-pk'), function (c) { c.textContent = '—'; });
      document.querySelector('.result').classList.add('is-stale');
      return;
    }
    var KF0 = v.M * v.gF0 / 1000 * v.pF0, KF1 = v.M * v.gF1 / 1000 * v.pF1, KFm = v.M * (v.gF0 + v.gF1) / 2000 * (v.pF0 + v.pF1) / 2;
    document.querySelector('.result').classList.remove('is-stale');
    var XH = v.HP * v.HH * v.HW * v.HS, XB = XH > 0 ? v.HB * v.HW * v.HS : 0, NET = XH - XB;   // Handarbeit als eigene Zeile, Bedienung als Gegenposten
    var KET = v.PT * v.hT * v.pE, KS0 = KF0 + KET + v.XS, KS1 = KF1 + KET + v.XS;
    var KL0 = v.M * v.e * v.pL0 / 1000, KL1 = v.M * v.e * v.pL1 / 1000, KLm = (KL0 + KL1) / 2;
    var KEM = v.PM * v.hM * v.pE, KE0 = KL0 + KEM + v.XE, KE1 = KL1 + KEM + v.XE;
    var dmin = KS0 - KE1 + NET, dmax = KS1 - KE0 + NET, dmid = (KFm + KET + v.XS) - (KLm + KEM + v.XE) + NET;
    // Grenz-Etikettenpreis je 1.000 Etiketten
    var per = v.M * v.e / 1000, t0 = (KS0 + NET - KEM - v.XE) / per, t1 = (KS1 + NET - KEM - v.XE) / per;
    var tf = function (x) { return x <= 0 ? '0,00' : nf2.format(x); };
    $('c-thr').firstChild.nodeValue = (tf(t0) === tf(t1) ? tf(t0) : tf(t0) + ' – ' + tf(t1)) + ' € je 1.000 Etiketten';
    $('c-span').firstChild.nodeValue = 'Unterschied pro Jahr: im Mittel ' + sg(dmid) + ' €, Spanne ' + sg(dmin) + ' bis ' + sg(dmax) + ' €';
    var a = nf.format(Math.abs(rd(dmin, 100))) + ' €', b = nf.format(Math.abs(rd(dmax, 100))) + ' €', h;
    if (dmin > 0) h = '<p><strong>In diesem Rechenbeispiel ist das Etikett-Multipack günstiger.</strong> Mit Ihren Werten sparen Sie laufende Kosten von ' + a + ' bis ' + b + ' pro Jahr' + (XH > 0 ? ' (inkl. Personal)' : ' an Folie und Energie') + '. Die Investition ist nicht enthalten. Lassen Sie uns die Rechnung mit Ihren echten Daten prüfen.</p>';
    else if (dmax < 0) h = '<p><strong>In diesem Rechenbeispiel ist Schrumpfen günstiger.</strong> Die laufenden Kosten liegen beim Schrumpfen pro Jahr zwischen ' + b + ' und ' + a + ' niedriger. Dann spricht der Preis nicht für das Etikett-Multipack.</p><p>Es kann trotzdem passen, wenn andere Punkte für Sie zählen: Ihr Produkt verträgt keine Wärme, der Handel will einzeln abtrennbare Packungen, oder in der Linie ist kein Platz für einen Tunnel.</p><p><strong>Nicht passend ist das Etikett-Multipack</strong> für Bündel, die rundum geschützt sein müssen, für Getränke und für Großserien mit einem Format und sehr hohen Taktzahlen. Dort bleiben Sie bei Schrumpffolie oder einer Großserienanlage besser.</p>';
    else h = '<p><strong>Mit diesen Werten ist das Ergebnis nicht eindeutig.</strong> Je nach Annahme ist mal Schrumpfen, mal das Etikett günstiger. Am stärksten wirken Ihr Folienverbrauch je Bündel und Ihr Etikettenpreis. Wenn Sie diese beiden Werte genau kennen, wird das Ergebnis klar.</p>';
    verdict.innerHTML = h;
    var set = function (id, t) { $(id).textContent = t; };
    set('r-KF', span(KF0, KF1)); set('r-KET', e0(KET)); set('r-XS', e0(v.XS)); set('r-XH', e0(XH)); set('r-XB', e0(XB));
    set('c-foot', XH > 0 ? 'Enthalten: Folie, Energie, Etiketten und der Personalunterschied aus Ihren Angaben zur Handarbeit. Nicht enthalten: Investition, Platz, Ausschuss, Produktschutz.' : 'Nicht enthalten: Investition, Personal, Platz, Ausschuss, Produktschutz.'); set('r-KS', span(KS0, KS1));
    set('r-KL', span(KL0, KL1)); set('r-KEM', e0(KEM)); set('r-XE', e0(v.XE)); set('r-KE', span(KE0, KE1));
    set('r-kg', span(v.M * v.gF0 / 1000, v.M * v.gF1 / 1000, function (x) { return nf.format(rd(x, 10)); }) + '\u00a0kg');
    set('r-kwh', nf.format(rd(v.PT * v.hT, 100)) + '\u00a0kWh');
    set('r-pk', nf.format(v.M * v.n));
    var msg = 'Kostenrechner: ' + inp.M.value + ' Multipacks/Jahr, Folie ' + inp.gF0.value + '–' + inp.gF1.value + ' g je Bündel, ' + inp.pF0.value + '–' + inp.pF1.value + ' €/kg, Tunnel ' + inp.PT.value + ' kW, ' + inp.hT.value + ' h/Jahr, Strom ' + inp.pE.value + ' €/kWh, Etikett ' + inp.pL0.value + '–' + inp.pL1.value + ' € je 1.000, Maschine ' + inp.PM.value + ' kW.';
    $('c-send').href = sendBase + '?art=anfrage&quelle=rechner&formate=offen&msg=' + encodeURIComponent(msg) + '#anfrage';
  }
  var t;
  f.addEventListener('input', function () { clearTimeout(t); t = setTimeout(calc, 250); });
  f.addEventListener('change', calc);
  $('c-reset').addEventListener('click', function () {
    Object.keys(inp).forEach(function (k) { inp[k].value = inp[k].getAttribute('data-def'); });
    same.checked = true; calc();
  });
  calc();
})();
