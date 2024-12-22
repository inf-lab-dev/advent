# Schlitten Navigationssystem

„Nun ist eigentlich alles erledigt: Die Wunschzettel sind sortiert, die Geschenke verpackt, und jedes Geschenk
beinhaltet mittlerweile eine individuelle Karte des Weihnachtsmanns. Inzwischen wurden die Geschenke auch bereits auf
den Schlitten des Weihnachtsmanns geladen!“ rief Glimmerzwickel stolz. Doch dann hielt sie inne, und ihr
Gesichtsausdruck verdüsterte sich.

„Moment mal… Was ist mit dem Navigationssystem?“ fragte sie und wandte sich mit großen Augen an den Weihnachtsmann.

„Das Navigationssystem? Das wurde doch von Knobelschlau überarbeitet, oder nicht?“ antwortete der Weihnachtsmann und zog
nachdenklich an seinem Bart.

Die Wichtelwerkstatt war in heller Aufregung, denn dieses Jahr hatte ein besonders findiger Wichtel namens Knobelschlau
eine revolutionäre Neuerung für den Schlitten des Weihnachtsmanns entwickelt: Ein hochmodernes Navigationssystem.

„Herr Weihnachtsmann, dieses System wird alles verändern!“ rief Knobelschlau stolz. „Es berechnet die effizienteste
Route für die Geschenkelieferung und berücksichtigt sogar das Wetter, die Windrichtung und die Startzeit!“

„Das klingt beeindruckend“, sagte der Weihnachtsmann, während er das glänzende Interface des Navigators betrachtete.
„Aber ist es zuverlässig? Wir dürfen keine Fehler riskieren, Knobelschlau.“

„Nun ja, eine Funktion um lange Wege auf der Route zu finden fehlt noch.“, entgegnete der Wichtel mit einem nervösen
Lächeln. „Außerdem hab ich begonnen das System zu testen. Dabei sind mir einige Fehler aufgefallen. Die müssten noch
behoben werden“.

Der Weihnachtsmann nickte energisch. „Auf jeden Fall! Nichts ist schlimmer, als wenn mich das System in eine Sackgasse
führt und ich mit dem ganzen Gespann wie ein übermütiger Rentierfahrer rückwärts ausmanövrieren muss. Du weißt ja,
Rudolph, mein bestes Rentier, ist beim Rückwärtslaufen immer so tollpatschig. Und erst letzte Woche habe ich eine
Mitteilung von der Schlittenversicherungsstelle bekommen – die Beiträge wurden erhöht. Da kann ich es jetzt wirklich
nicht gebrauchen, auch noch meine Schadensfreiheitsklasse zu verlieren.“ Er drehte sich zu dir und sagte: „Du hast ein
gutes Händchen dafür, Probleme zu lösen. Könntest du das System anpassen, sodass alle Fehler behoben sind, und
zusätzlich eine Funktion schreiben, um große Distanzen auf meiner Route zu ermitteln?“

## Aufgabe

Lade zuerst das Material mit dem folgenden Befehl runter:

```bash
wget -O - https://advent.inf-lab.dev/material/fourth/setup.sh | bash
```

Deine Aufgabe ist es nun die Fehler von Knobelschlau in der Klasse `NavigationSystem`, welche sich in der Datei
`navigation_system.py` befindet, zu verbessern. In jeder Funktion dieser Klasse ist mindestens ein Fehler. Die Tests in
`test_navigation_system.py` kannst du als Hilfestellung verwenden. Mit `pytest test_navigation_system.py`. Kannst du die
Tests ausführen. Möglicherweise möchtest du nicht immer alle Tests ausführen. Lies dazu doch einfach in
der [pytest-Dokumentation](https://docs.pytest.org/en/stable/how-to/usage.html) wie das geht.

Knobelschlau hat die gegebenen Tests nach den Anforderungen im Lasten- und Pflichtenheft geschrieben. Du kannst also
davon ausgehen, dass die Testfunktionen in `test_navigation_system.py` korrekt sind.

<details>
<summary>Annotationen von Knobelschlau</summary>

Knobelschlau hat dir zudem eine detaillierte Beschreibung der `find_closest_location` Funktion gegeben:

- Die Funktion prüft, ob `current_location` in der Liste der Orte (`self.locations`) enthalten ist. Falls nicht, wird
  ein `ValueError` ausgelöst. (siehe [Python `raise`](https://docs.python.org/3/reference/simple_stmts.html#raise))
- Sie erstellt ein Dictionary `distances`, das die Distanzen von `current_location` zu anderen Zielen enthält. Hierzu
  werden Einträge aus `self.distances` gefiltert, deren Startpunkt `current_location` ist. (
  siehe [Python Dictionary Comprehensions](https://docs.python.org/3/tutorial/datastructures.html#dictionaries))
- Wenn das Dictionary `distances leer ist, gibt die Funktion `(None, -1)` zurück.
- Andernfalls wird die kürzeste Distanz mit `min` bestimmt. Der Schlüssel (`key`) im Dictionary `distances`, der den
  minimalen Wert hat, wird als `closest_location` zurückgegeben. (siehe [Python
  `min` Funktion](https://docs.python.org/3/library/functions.html#min))

</details>

Beachte, dass zwei Tests immer noch fehlschlagen werden (`test_find_long_distances` und
`test_find_long_distances_empty`). Diese erwarten nämlich, dass du noch eine neue Funktion implementierst. Die
Anforderungen an diese Funktion werden im folgenden geschildert.

Nachdem du alle Fehler korrigiert hast, sollst du noch die Funktion `find_long_distances` implementieren. Diese Funktion
soll eine Ganzzahl als Argument übergeben bekommen. Diese Ganzzahl ist der `threshold`, ab dem eine Distanz als *lange
Distanz* gilt. Demnach soll die Funktion die entsprechenden Distanzen filtern und in einer Liste nur die zurückgeben,
die länger als der übergebene `threshold` sind. Die Elemente in der Liste soll nach folgender Struktur aufgebaut sein:
`((start, end), distance)`. Ob du die Vorgaben genau einhältst, kannst du anhand der Tests überprüfen.

Denn auch für die `find_long_distances` Funktion hat Knobelschlau bereits Tests geschrieben. Wenn du die Funktion nun
richtig implementiert hast, sollten alle Tests korrekt durchlaufen.

Die Orte (`locations`) und Distanzen (`distances`), die der Weihnachtsmann anfliegen, bzw. überwinden muss, sind bereits
in `navigation_system.py` angegeben. Rufe nun die Funktion `find_long_distances` mit dem Argument `400` auf. Du möchtest
also eine Liste der Distanzen erhalten, die größer als `400` Kilometer sind.

Das Lösungswort ist nun die Summe der Distanzen, die größer als `400` Kilometer sind. Gebe die Zahl ohne `.` oder `,`
ein. Wäre die Summe als `123.456` ist das Lösungswort `123456`.


