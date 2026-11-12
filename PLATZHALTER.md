# Offene Platzhalter (Branch ueberarbeitung-2026-11, Stand 12.11.2026)

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
| F-FALL | Kunde im Einsatz, anonym: Branche, Produkt, Bündel, Schichtbetrieb, seit wann, 1–2 Zahlen | Start, festes Format, Über uns |
| F-STUECKZAHL | Zahl der gebauten oder ausgelieferten Maschinen | Start, festes Format |
| F-ZITAT | Zitat Ilyas Zorla aus der HERMA-Pressemitteilung (03/2025) freigeben | Start, festes Format |
| F-PRESSE | Presseleiste freigeben: HERMA, sweets processing, Packaging Europe, Food & Drink Technology (Artikel per Websuche 11.11. gefunden, Links gesetzt) | Start |
| F-BENNER | Text „Wir bauen auch Schlauchbeutel- und Vierrandsiegelmaschinen …“ freigeben | Start |
| F-E-UMSTELLZEIT | Festes Format: typische Umstellzeit auf ein anderes Bündel (Firmenvorstellung 2025 nennt „< 5 min“, unbestätigt) | festes Format |
| F-LIEFERZEIT | typische Lieferzeit | festes Format, Multiformat |
| F-DATENBLATT | PDF-Datenblatt je Maschine; Knopf erscheint, sobald die Datei da ist | festes Format |
| F-UPLOAD | Datei-Upload im Formular: Feld ist eingebaut, aber ausgeblendet und deaktiviert. Braucht einen Empfänger (n8n auf eigenem Server oder Web3Forms Pro). Bis dahin Hinweis „Dateien an info@benner-msa.de“ | Kontakt |

## Vorbereitet, nicht angebunden

- Automatische Antwortmail mit Datenblatt (Weg e): braucht Datenblatt und Versandweg, nichts eingebaut.
- Besuchsmessung: nichts eingebaut.
- Rechner Modus 2 (Schrumpffolie gegen Etikett): startet weiter mit Annahmen und zeigt damit „nicht eindeutig“. Modus 1 (Handarbeit gegen Maschine) startet leer. Entscheidung: Modus 2 leer starten oder Beispiel freigeben.

## Medienplätze (gestreift, `data-medium`, Kennungen aus MEDIENPLAETZE.md)

S-KOPF (+ S-KOPF-MOBIL, S-SCHLEIFE), S-SCHRITT-1, S-SCHRITT-2, S-SCHRITT-3, S-ABREISSEN,
E-KOPF (+ E-SCHLEIFE), E-VIDEO, E-GALERIE-2, E-GALERIE-5, E-GALERIE-6, E-DETAIL-FAECHER, E-DETAIL-ETIKETTIERER, E-DETAIL-AUSGLEICH, E-BUENDEL-REIHE,
M-KOPF, M-FORMATWECHSEL, M-GALERIE-2, M-GALERIE-3, M-GALERIE-4, M-STEHBEUTEL-REIHE.
Noch nicht gesetzt (andere Seiten, nächste Etappe): A-BRANCHE-…, U-HALLE, U-TEAM, U-ABNAHME, K-ILYAS-VIDEO, OG-….

## Fotos nur zur Ansicht (Hinweis „Freigabe offen“)

| Platz | Datei | Herkunft |
|---|---|---|
| E-KOPF | assets/images/festformat-halle-*.webp | benner-msa.de, Freigabe offen |
| E-GALERIE-1 | assets/images/festformat-schraeg-*.webp | benner-msa.de, Freigabe offen |
| E-GALERIE-3 | assets/images/festformat-person-*.webp | benner-msa.de, Freigabe und Einverständnis der Person offen |
| E-GALERIE-4 | assets/images/festformat-panel-*.webp | benner-msa.de, Freigabe offen |
| M-KOPF, M-GALERIE-1 | assets/images/multiformat-maschine-*.webp | Werksfoto, freigegeben 07.11. (D15); Hinweis zeigt nur, dass hier später ein Hallenfoto hin soll |
