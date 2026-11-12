# Offene Platzhalter (Branch ueberarbeitung-2026-11, Stand 13.11.2026)

Vor dem Livegang muss jede Zeile erledigt oder entschieden sein: Wert eintragen, ausblenden oder auf vorhandenes Material zurückfallen.
Prüfung: `python3 ../ueberarbeitung-2026-11-11/werkzeug/pruefen.py site` listet alle Plätze aus dem HTML (`data-offen`, `data-medium`, Freigabe-Hinweise).
Diese Datei liegt im Wurzelordner und wäre nach einem Merge öffentlich abrufbar. Vor dem Merge auf main löschen.

## Fakten (gelb gestrichelt, `data-offen`)

| Kennung | Frage | Seiten |
|---|---|---|
| F-MF-EINHEIT | Multiformat: „bis zu 80 pro Minute“ – Beutel oder Bündel? | Start, Multiformat, Vergleich |
| F-MF-FORMATE | Multiformat: Formatbereich (Beutelmaße, Bündelgrößen), Zahl der Formate | Multiformat, Vergleich |
| F-MF-FLAECHE | Multiformat: Stellfläche mit Etikettierern bestätigen | Multiformat, Vergleich |
| F-MF-PROJEKTE | Multiformat: Stand der Projekte, was wir dazu sagen dürfen | Multiformat |
| F-PATENT | Patent: Nummer, Status, Gegenstand (Ausgleichselement oder Maschine). Bis dahin steht „patentiert“ nirgends | Start, festes Format |
| F-FALL | Kunde im Einsatz, anonym: Branche, Produkt, Bündel, Schichtbetrieb, seit wann, 1–2 Zahlen | Start (Belegleiste), festes Format, Über uns |
| F-STUECKZAHL | Zahl der gebauten oder ausgelieferten Maschinen | Start (Belegleiste), festes Format |
| F-ZITAT | Zitat Ilyas Zorla aus der HERMA-Pressemitteilung (03/2025) freigeben | Start, festes Format |
| F-PRESSE | Presseleiste freigeben: HERMA, sweets processing, Packaging Europe, Food & Drink Technology (Artikel per Websuche 11.11. gefunden, Links gesetzt) | Start |
| F-BENNER | Text „Wir bauen auch Schlauchbeutel- und Vierrandsiegelmaschinen …“ freigeben | Start (Block Hersteller und Ansprechpartner) |
| F-E-UMSTELLZEIT | Festes Format: typische Umstellzeit auf ein anderes Bündel (Firmenvorstellung 2025 nennt „< 5 min“, unbestätigt) | festes Format |
| F-LIEFERZEIT | typische Lieferzeit | festes Format, Multiformat |
| F-DATENBLATT | PDF-Datenblatt je Maschine; Knopf erscheint, sobald die Datei da ist | festes Format |
| F-UPLOAD | Datei-Upload im Formular: Feld ist eingebaut, aber ausgeblendet und deaktiviert. Braucht einen Empfänger (n8n auf eigenem Server oder Web3Forms Pro). Bis dahin Hinweis „Dateien an info@benner-msa.de“ | Kontakt |

## Vorbereitet, nicht angebunden

- Automatische Antwortmail mit Datenblatt (Weg e): braucht Datenblatt und Versandweg, nichts eingebaut.
- Rechner: beide Modi starten leer (Entscheidung Frage 11). Modus 2 zeigt im Startzustand, welche Werte fehlen. Vorbelegt bleibt nur „Etiketten je Multipack = 2“, weil die Maschine so gebaut ist.

## Messung (Umami, Ereignisse)

Umami zählt Klicks auf Elemente mit `data-umami-event`. Gesetzt werden die Attribute von `../ueberarbeitung-2026-11-11/werkzeug/ereignisse.py` (läuft mit `partials.py`). Lokal und in der Vorschau wird nichts gezählt, weil `data-domains` nur multipackmaschinen.de zulässt.

| Ereignis | Was es zählt | Wo |
|---|---|---|
| anfrage-senden | Formular auf /kontakt abgeschickt. Zählt im `submit`-Ereignis (assets/script.js), also nur, wenn der Browser das Formular als gültig durchlässt. Ob Web3Forms es danach annimmt, ist nicht erfasst. Mitgesendet: art, maschine, quelle (keine Eingaben) | /kontakt |
| beutel-pruefen | Klick auf „Beutel prüfen lassen“ (alle Links mit art=muster) | alle Seiten, Menü, Handy-Leiste |
| preisrahmen-anfragen | Klick auf „Preisrahmen anfragen“ | Start, festes Format, Vergleich |
| projekt-anfragen | Klick auf „Projekt anfragen“ / „Anfragen“ (Kopfzeile) | alle Seiten |
| formatliste-pruefen | Klick auf „Formatliste prüfen lassen“ / „Formatliste schicken“ | Start, Multiformat, Vergleich |
| rueckruf-anfragen | Klick auf „Rückruf vereinbaren“ | Produktseiten, Vergleich u. a. |
| rechner-anfrage | „Ergebnis besprechen“ (Modus 1) und „Rechnung prüfen lassen“ (Modus 2) | Wirtschaftlichkeit |
| auswahl-anfrage | „Anfrage vorbereiten“ in der Auswahlhilfe | Start |
| anfrage-link | übrige Links ins Formular | einzelne Seiten |
| tel-klick | jeder Telefon-Link (`tel:`) | alle Seiten |
| mail-klick | jeder Mail-Link (`mailto:`) | alle Seiten |
| termin-buchen | Link zum Brevo-Beratungstermin | Menü, Fußzeile, Start, Kontakt |

- F-UMAMI-DS: Datenschutz 6a nennt bisher nur Seitenaufrufe. Die Klick-Ereignisse sind dort nicht beschrieben. Vorschlag für einen Zusatzsatz (nicht eingebaut): „Außerdem zählen wir, wie oft bestimmte Knöpfe angeklickt werden, etwa „Beutel prüfen lassen“, ein Telefon-Link oder das Absenden des Anfrageformulars. Inhalte, die Sie eingeben, werden dabei nicht erfasst.“ Alexander/Anwalt entscheiden.

## Medienplätze (gestreift, `data-medium`, Kennungen aus MEDIENPLAETZE.md)

S-KOPF (+ S-KOPF-MOBIL, S-SCHLEIFE), S-SCHRITT-1, S-SCHRITT-2, S-SCHRITT-3, S-ABREISSEN,
E-KOPF (+ E-SCHLEIFE), E-VIDEO, E-GALERIE-2, E-GALERIE-5, E-GALERIE-6, E-DETAIL-FAECHER, E-DETAIL-ETIKETTIERER, E-DETAIL-AUSGLEICH, E-BUENDEL-REIHE,
M-KOPF, M-FORMATWECHSEL, M-GALERIE-2, M-GALERIE-3, M-GALERIE-4, M-STEHBEUTEL-REIHE.
Noch nicht gesetzt (andere Seiten, nächste Etappe): A-BRANCHE-…, U-HALLE, U-TEAM, U-ABNAHME, K-ILYAS-VIDEO.
OG-…: gebaut als `assets/og/og-start.png`, `og-fest.png`, `og-multi.png` (Werksfoto D15), `og-vergleich.png`; Generator `../ueberarbeitung-2026-11-11/werkzeug/og_bau.mjs`. Festes Format und Vergleich sind typografisch, weil die Fotos der Maschine für ein festes Format noch keine Freigabe haben. Sobald S-KOPF oder E-KOPF geliefert sind, neu bauen.

## Fotos nur zur Ansicht (Hinweis „Freigabe offen“)

| Platz | Datei | Herkunft |
|---|---|---|
| E-KOPF | assets/images/festformat-halle-*.webp | benner-msa.de, Freigabe offen |
| E-GALERIE-1 | assets/images/festformat-schraeg-*.webp | benner-msa.de, Freigabe offen |
| E-GALERIE-3 | assets/images/festformat-person-*.webp | benner-msa.de, Freigabe und Einverständnis der Person offen |
| E-GALERIE-4 | assets/images/festformat-panel-*.webp | benner-msa.de, Freigabe offen |
| M-KOPF, M-GALERIE-1 | assets/images/multiformat-maschine-*.webp | Werksfoto, freigegeben 07.11. (D15); Hinweis zeigt nur, dass hier später ein Hallenfoto hin soll |
- F-UMAMI-DS: Datenschutz-Abschnitt 6a „Besuchsstatistik (Umami)“ – Alexander/Anwalt prüfen lassen (siehe auch „Messung“).

## Zu entscheiden (Nachtlauf 12./13.11.)

- SEO: `areaServed` im Organization-JSON-LD steht auf DE. Auf DE, AT, CH erweitern (Faktendokument C10)?
- SEO: Die alte Vorschau `assets/images/og-multipackmaschine.jpg` wird nach dem Merge nicht mehr verwendet. Löschen?
- Technik: www → ohne www per 301 (Cloudflare-Regel) ist weiter offen (Frage 13).
- Startseite: „Wann wir nicht passen“ steht jetzt auf /maschinen (Anker `#nicht-passen`), auf der Startseite nur als Link. Auf der Seite für ein festes Format steht derselbe Inhalt als „Passt nicht, wenn …“.
