# Santacloud reparieren

Die Wichtelwerkstatt summte vor Betriebsamkeit. Nach deinem Erfolg bei der Planung der Geschenkgrößen und Verpackungen
schien vorerst alles ruhig. Überall waren die kleinen Helfer in Bewegung: Hier wurden letzte Geschenke eingepackt, dort
glitzernde Schleifen gebunden. Währenddessen saß Glimmerzwickel, die IT-Expertin der Wichtel, mit einem Stirnrunzeln vor
ihrem Bildschirm. Sie schüttelte den Kopf, rutschte von ihrem hohen Stuhl und eilte durch die schmalen Gänge der
Werkstatt.

Mit einem lauten „Oh je!“ stürmte sie in das Büro des Weihnachtsmanns. Dieser saß gerade an seinem Schreibtisch, die
Lesebrille auf der Nase, und studierte die Listen mit den Namen der Kinder. „Was ist los, Glimmerzwickel?“ fragte er,
ohne aufzusehen.

„Ein Problem, Herr Weihnachtsmann! Ein großes Problem!“, rief sie und fuchtelte aufgeregt mit einem Klemmbrett. „Es geht
um die Weihnachtskarten! Wir haben so viele neue Karten geschrieben, aber ich bin mir nicht sicher, ob wir alles korrekt
vorbereitet haben. Es gibt eine Möglichkeit, dass manche Karten nicht mit den bisherigen Listen übereinstimmen.“

Der Weihnachtsmann runzelte die Stirn und setzte seine Brille ab. „Nicht übereinstimmen? Das klingt gar nicht gut. Was
bedeutet das konkret?“

„Nun,“ begann Glimmerzwickel und wischte sich die Stirn, „jedes Jahr schreiben wir die Karten sorgfältig, und alle
verwendeten Worte werden in einem speziellen System gespeichert. Es sorgt dafür, dass wir nichts vergessen und alle
Karten perfekt vorbereitet sind. Aber dieses Jahr haben wir so viele neue Karten geschrieben, dass wir prüfen müssen, ob
die neuen Worte in unseren bisherigen Daten enthalten sind.“

Der Weihnachtsmann lehnte sich zurück und dachte nach. „Das klingt nach einer Aufgabe, die wir schnell lösen müssen. Ich
schlage vor, dass wir unseren erfahrenen Wichinf (Inf-Einf-B Wichtel) hinzuziehen“.

Kurze Zeit später standest du, begleitet vom Weihnachtsmann und Glimmerzwickel, vor einer großen, massiven Tür im
hintersten Teil der Wichtelwerkstatt. „Das ist unsere Santacloud“, erklärte Glimmerzwickel. „Hier bewahren wir die Daten
der vergangenen Jahre auf – alle Worte, die je auf einer Weihnachtskarte standen. Es ist unser Herzstück, und ohne diese
Grundlage könnten wir nicht sicherstellen, dass die Karten jedes Jahr so wunderbar werden.“ Eine Maschine wie die
Santacloud hast du noch nie gesehen. Sie brummt laut und bringt den Boden zum wackeln. Außerdem kann man in diese
Maschine durch eine Tür hineingehen.

Mit einem leisen Knarzen öffnete sich die Tür. Dahinter erstreckte sich ein riesiger Raum, dessen Wände von leuchtenden,
pulsierenden Linien bedeckt waren, die sich in alle Richtungen verzweigten. „Das hier ist unsere Datenstruktur, ein
Trie“, erklärte Glimmerzwickel mit Stolz in der Stimme. „Jedes Wort ist hier gespeichert. Es ist wie ein riesiges Netz,
das alle Informationen miteinander verbindet.“

„Beeindruckend“, sagte der Weihnachtsmann. „Aber was müssen wir jetzt tun?“

Glimmerzwickel holte eine Liste hervor. „Hier sind die Worte aus den neuen Weihnachtskarten. Wir müssen jedes einzelne
überprüfen, ob es in unserem Trie enthalten ist. Wenn wir ein Wort finden, wissen wir, dass alles in Ordnung ist. Wenn
nicht, müssen wir es hinzufügen.“

Der Weihnachtsmann nickte und wandte sich an dich. „Du hast uns schon bei den Geschenken und Verpackungen geholfen. Ohne
deine Fähigkeiten wären wir nicht so weit gekommen. Denkst du, du kannst auch dieses Problem lösen?“

Mit einem entschlossenen Nicken erklärtest du dich bereit. Du spürtest, dass diese Herausforderung anspruchsvoll sein
würde – aber auch, dass du sie meistern würdest.

## Aufgabe

Du erhältst fünf Dateien:

- `trie_words_2023.txt`: Diese Datei enthält alle verwendeten Worte aus den Weihnachtskarten im Jahr 2023.
- `trie_words_2022.txt`: Diese Datei enthält alle verwendeten Worte aus den Weihnachtskarten im Jahr 2022.
- `trie_words_2021.txt`: Diese Datei enthält alle verwendeten Worte aus den Weihnachtskarten im Jahr 2021.
- `trie_words_2020.txt`: Diese Datei enthält alle verwendeten Worte aus den Weihnachtskarten im Jahr 2020.
- `trie_words_2019.txt`: Diese Datei enthält alle verwendeten Worte aus den Weihnachtskarten im Jahr 2019.

```bash
wget -O - https://advent.inf-lab.dev/material/third/setup.sh | bash
```

Deine Aufgabe ist es:

- Implementiere die `contains_word` Funktion, um zu prüfen, ob ein bestimmtes Wort im Trie vorhanden ist.
- Prüfe, in welchen Dateien das Wort `python` enthalten ist. Führe dein Programm nun für alle der fünf bereitgestellten
  Dateien aus.
- Ist `python` in einer Datei enthalten merkst du dir das und addierst für jede weitere Datei, in der das Wort `python`
  enthalten ist `+1`. Am Ende hast du also eine Zahl, die minimal `0` ist, wenn kein Datei `python` enthält oder maximal
  `5` ist, wenn alle Dateien `python` enthalten.
- Multipliziere dein Ergebnis nun mit `3`. Die Zahl, die du erhältst, ist das **Passwort** für diese Aufgabe.
