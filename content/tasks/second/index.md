# Geschenkgrößen zählen

Glimmerzwickel, die IT-Expertin der Wichtelwerkstatt, war in heller Aufregung, als sie dem Weihnachtsmann von deinem Erfolg in der letzten Woche berichtete. Dein Programm lief einwandfrei, und endlich war sichergestellt, dass alle Geschenke rechtzeitig geplant werden konnten. Doch kaum war dieses Problem gelöst, meldete sich schon die nächste Herausforderung: die Verpackung.

„Wir haben die Geschenke zwar geplant, aber die Verpackungen...“ Der Weihnachtsmann seufzte und fuhr sich nachdenklich durch seinen weißen Bart. „Das ist ein Problem für sich. Wir müssen genau wissen, wie viele Verpackungen in welcher Größe wir benötigen. Es wäre doch fatal, wenn uns am Ende die passenden Boxen ausgehen würden.“

Er schaute dich mit einem verschmitzten Lächeln an. „Ich habe da schon jemanden im Kopf, der uns helfen kann.“ Natürlich meinte er dich.

Um dir die Dimension des Problems zu verdeutlichen, lud Santa dich zu einem Besuch des Verpackungslagers ein. Die Reise begann aufregend: Mit Rudolf und seinen Rentier-Kollegen flog der Schlitten rasant durch die eisige Luft. Rudolf, der mit seiner leuchtend roten Nase stets der Star war, sorgte jedoch für eine überraschende Show. Mit eleganten Schleifen und Drehungen brachte er den Schlitten ins Schaukeln. Du klammertest dich am Rand des Schlittens fest, während der Weihnachtsmann laut rief: „Rudolf, konzentrier dich auf die Spur!“ Schließlich landeten alle sicher, wenn auch leicht durchgerüttelt, vor dem funkelnden Verpackungslager.

Dort erwartete euch Funkelknirps, der quirlige Chef der Verpackungsabteilung. Mit seiner überdimensionalen Brille und einem verschmitzten Lächeln führte er euch durch schier endlose Regalreihen voller Geschenkboxen, Papierrollen und Schleifen. „Hier passiert die Magie der Verpackung“, erklärte er stolz. „Aber ohne deine Hilfe könnte hier bald das Chaos ausbrechen.“

Er holte eine Liste hervor. „Wir haben alle Geschenke und ihre Größen hier aufgeschrieben. Deine Aufgabe ist es, ein Programm zu schreiben, das zählt, wie viele Verpackungen in welcher Größe wir benötigen. Damit können wir perfekt planen, und die Wichtel können sich auf das Einpacken konzentrieren.“

Der Weihnachtsmann nickte zustimmend. „Das ist genau das, was wir brauchen, um voranzukommen. Ich zähle auf dich!“

Funkelknirps reichte dir die vorbereitete C-Datei und eine Textdatei mit Geschenkgrößen. „Hier ist alles, was du brauchst. Die Basis steht, jetzt liegt es an dir, die Funktion `count_packages` zu implementieren. Du kannst das!“

Mit den Worten des Weihnachtsmanns im Ohr und Funkelknirps’ unerschütterlichem Vertrauen im Rücken warst du bereit, die nächste Herausforderung anzupacken. Weihnachten hing von deiner Lösung ab – und du warst fest entschlossen, auch dieses Mal zu glänzen!

## Aufgabe

Schreibe ein Programm, das berechnet, wie viele Verpackungen in welcher Größe benötigt werden. Die Größen `1-10` sind verfügbar.

Funkelknirps hat auch eine C-Datei für dich vorbereitet, in der einige Grundlagen schon implementiert sind. Es gibt eine struct namens `gift`, die die Größe eines Geschenks enthält. Ein Array namens `gifts` repräsentiert die Liste aller Geschenke und wird in der Funktion `create_gift_list` befüllt. Hier werden die Geschenkgrößen aus einer `txt` Datei gelesen. Deine Aufgabe ist es, die Funktion `count_packages` zu implementieren. Diese Funktion soll die Anzahl der benötigten Verpackungen pro Größe berechnen und das Ergebnis ausgeben.

Du kannst die Dateien von Funkelknirps mit folgendem Befehl herunterladen:

```bash
wget -O - https://advent.inf-lab.dev/material/second/setup.sh | bash
```

Dieser Befehl lädt die C-Datei `task2.c` und die Text-Datei `gift_sizes.txt` herunter. `gift_sizes.txt` enthält die Paketgrößen der Geschenke.

Implementiere nun die Funktion `count_packages`, die die Anzahl der benötigten Verpackungen pro Größe berechnen und das Ergebnis ausgeben soll. Du kannst davon ausgehen, dass die Größen `1-10` für Geschenke zugelassen sind.

**Beispiel:**

-   Eingabe: `gifts = [{size: 1}, {size: 2}, {size: 1}, {size: 3}, {size: 2}]`
-   Ausgabe:

```
Größe 1: 2 Verpackungen
Größe 2: 2 Verpackungen
Größe 3: 1 Verpackung
```

Die Ausgabe des Programms enthält die Anzahl der Verpackungen pro Größe. Beachte: Zugelassene Größen sind die Größen `1-10`.

Wie oft wird die Verpackung der Größe 3 benötigt? Die **Zahl** ist das Lösungswort. In diesem Beispiel wäre das **Passwort** also `1`.
