/* Wirtschaftlichkeit, Modus 1: Handarbeit am Packtisch gegen Maschine. Keine Vorbelegung, kein Maschinenpreis von uns. */
(function () {
  'use strict';
  var f = document.getElementById('hr'), out = document.getElementById('h-out'), send = document.getElementById('h-send');
  if (!f || !out || !send) return;
  var $ = function (id) { return document.getElementById(id); };
  var base = send.getAttribute('href');
  var nf = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 });
  function num(s) {
    s = String(s).replace(/\s|€/g, '');
    if (s.indexOf(',') >= 0) s = s.replace(/\./g, '').replace(',', '.');
    else if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, '');
    return s === '' || isNaN(+s) ? NaN : +s;
  }
  function row(l, v) { return '<p style="display:flex;justify-content:space-between;gap:16px;border-bottom:1px solid var(--stage-line);padding:8px 0;color:var(--stage-mute)"><span>' + l + '</span><b style="color:#fff">' + v + '</b></p>'; }
  function calc() {
    var b = num($('h-b').value), l = num($('h-l').value), s = num($('h-s').value), m = num($('h-m').value), p = num($('h-p').value);
    if (!(b > 0 && l > 0 && s >= 0)) {
      out.innerHTML = '<p style="color:var(--stage-mute)">Tragen Sie Ihre Werte ein: Bündel pro Jahr, Bündel je Person und Stunde und den Stundensatz.</p>';
      send.setAttribute('href', base); return;
    }
    if (!(m >= 0)) m = 0;
    var h = b / l, frei = Math.max(0, h - m), eur = frei * s;
    var html = row('Stunden Handarbeit pro Jahr', nf.format(h) + '&nbsp;h') + row('davon frei nach Abzug der Bedienung', nf.format(frei) + '&nbsp;h') +
      '<p style="margin-top:14px;color:var(--stage-mute)">Entlastung pro Jahr</p><p style="font:700 clamp(2rem,4vw,3rem)/1 var(--font-head);color:#fff">' + nf.format(eur) + '&nbsp;€</p>';
    var msg = 'Wirtschaftlichkeit: ' + nf.format(b) + ' Bündel/Jahr, ' + nf.format(l) + ' Bündel je Person und Stunde, ' + nf.format(s) + ' €/h, Bedienung ' + nf.format(m) + ' h/Jahr. Ergebnis: ' + nf.format(frei) + ' h und ' + nf.format(eur) + ' € Entlastung pro Jahr.';
    if (p > 0 && eur > 0) {
      var mon = p / eur * 12;
      html += row('Amortisation mit Ihrem Angebotspreis', nf.format(Math.ceil(mon)) + '&nbsp;Monate');
      msg += ' Amortisation ca. ' + nf.format(Math.ceil(mon)) + ' Monate.';
    }
    out.innerHTML = html;
    send.setAttribute('href', '/kontakt?art=anfrage&quelle=rechner&msg=' + encodeURIComponent(msg) + '#anfrage');
  }
  f.addEventListener('input', calc);
  f.addEventListener('submit', function (e) { e.preventDefault(); calc(); });
})();
