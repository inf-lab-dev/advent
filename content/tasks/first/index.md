# Wunschzettel sortieren

Weihnachten steht kurz bevor, und im
Weihnachtsmanndorf [Rovaniemi](https://de.m.wikipedia.org/wiki/Datei:Weihnachtsmanndorf_Rovaniemi.jpg) herrscht
geschäftiges Treiben. In den letzten Jahren hat sich auch der Weihnachtsmann der modernen Technologie zugewandt:
Alle **Wunschzettel** werden jetzt digital verwaltet! Die Wichtel haben eine spezielle Software namens _GiftNow_
entwickelt, mit der die Zettel direkt ins System eingescannt werden. Außerdem müssen die Wunschzettel nach der Anzahl
der Geschenke, die die Kinder darauf geschrieben haben, sortiert werden. So spart der Weihnachtsmann wertvolle Zeit beim
Abholen der Geschenke aus dem Lager. Die Aufgabe des Sortierens müssen die Wichtel von Hand übernehmen. Dieser
Arbeitsschritt kann noch nicht automatisiert von _GiftNow_ übernommen werden.

Am 1. Dezember macht sich Glimmerzwickel, die leitende Wichtel-IT-Expertin, gerade an die letzte Prüfung der
Wunschzettel-Datenbank. Die Datenbank scheint vollständig zu sein, und alles sieht perfekt aus. Doch plötzlich ertönt
ein lautes Piepen.

"Was ist das?", fragt sie besorgt, als ein großes, rotes Warnsignal auf dem Monitor erscheint:

> Fehler: Datenbank beschädigt. Alle Einträge wurden unsortiert wiederhergestellt.

"Oh nein!", ruft Glimmerzwickel und stürzt zum Weihnachtsmann. "Santa, wir haben ein Problem! Die Wunschzettel-Datenbank
ist durcheinander geraten. Die Wunschzettel der Kinder sind völlig unsortiert. Ohne Ordnung wird es unmöglich sein, die
Geschenke rechtzeitig zu verteilen!"

Der Weihnachtsmann reibt sich die Stirn. "Was machen wir jetzt? Wir können die Listen doch nicht manuell durchgehen. Das
dauert Monate!"

Da kommt Glimmerzwickel eine Idee. Sie eilt zurück zu ihrem Arbeitsplatz, ruft alle IT-Wichtel zusammen und erklärt: "
Wir benötigen ein Programm, das die Wunschzettel der Kinder nach der Anzahl der darauf vermerkten Geschenke sortiert –
und zwar in absteigender Reihenfolge. Schnell, jemand muss das programmieren!"

Für einige Sekunden herrscht komplette Stille im Raum. Keiner traut sich diese Aufgabe zu. Du überlegst: "Ich belege
Inf-Einf-B. Da habe ich doch bereits etwas über Sortieralgorithmen gelernt. Ein solches Programm sollte für mich also
kein Problem sein, oder?".

Glimmerzwickel unterbricht die Still: "Wenn das niemand übernehmen kann, können wir nicht garantieren, dass alle
Geschenke rechtzeitig ausgeliefert werden. Einen solchen Vorfall gab es noch nie." Laut rufst du: "Ich mach das!".

## Aufgabe

Schreibe ein Programm, das die Wunschzettel so sortiert, dass der Wunschzettel mit den meisten Geschenken am Anfang des
Arrays steht und der Wunschzettel mit den wenigsten Geschenken am Ende des Arrays.

Glimmerzwickel hat bereits eine C-Datei für dich erstellt, in der schon einige Dinge implementiert sind. Es existiert
bereits eine `struct` namens `wishlist` welche Daten einer einzelnen Wunschliste enthält. Das ist der Name (`name`) des
Kindes und die Anzahl der Geschenke (`num_of_presents`), die auf der Liste vermerkt sind. Außerdem existiert ein Array
`wishlists`, welches alle Wunschlisten enthält. Dieses Array wird in der `create_wishlists` Funktion befüllt. Auch die
`main` Funktion ist bereits fertig. Sie ruft die Funktion `create_wishlists` und `sort_wishlists` auf. Zum Schluss wird
der Name des Kinds ausgegeben, das die meisten Geschenke auf der Wunschliste angegeben hat.
Deine Aufgabe ist es nun, das durcheinander geratene Array `wishlists` zu sortieren. Diese Funktionalität soll in der
Funktion `sort_wishlists` implementiert werden.

```c
#include <stdio.h>
#include <cs50.h>
#include <string.h>

#define WISHLISTS_SIZE 400

typedef struct
{
    string name;
    int num_of_presents;
} wishlist;

wishlist wishlists[WISHLISTS_SIZE];

void create_wishlists(void);
void sort_wishlists(void);

int main(void)
{
    create_wishlists();

    sort_wishlists();

    printf("%s gets the most presents.\n", wishlists[0].name);

    return 0;
}

void sort_wishlists(void)
{
    // TODO: implement this function so that it sorts the wishlists array in descending order depended on num_of_presents
}

void create_wishlists(void)
{
    string names[] = {
        "Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace", "Heidi", "Ivan", "Judy",
        "Kara", "Leo", "Mia", "Noah", "Olive", "Paul", "Quinn", "Ruth", "Sam", "Tina",
        "Uma", "Vera", "Will", "Xena", "Yara", "Zane", "Amy", "Ben", "Cora", "Dave",
        "Ella", "Fred", "Gina", "Hank", "Ivy", "Jack", "Kate", "Liam", "Mona", "Nina",
        "Omar", "Pete", "Quincy", "Rose", "Sara", "Tom", "Ursula", "Victor", "Wendy", "Xavier",
        "Yvonne", "Zara", "Aria", "Bryce", "Caleb", "Dana", "Eli", "Faith", "Gavin", "Hope",
        "Iris", "Jade", "Kyle", "Lila", "Miles", "Nora", "Oscar", "Penny", "Quinlan", "Ruby",
        "Sean", "Tara", "Ulysses", "Violet", "Wes", "Ximena", "Yusuf", "Zoey", "Aiden", "Bella",
        "Cody", "Daisy", "Ethan", "Fiona", "Gabe", "Holly", "Ian", "Jess", "Kelly", "Logan",
        "Alan", "Bianca", "Chris", "Delia", "Elena", "Felix", "Georgia", "Harvey", "Isla", "Jonah",
        "Karen", "Luca", "Maddie", "Nathan", "Opal", "Peter", "Quilla", "Riley", "Sophie", "Tim",
        "Una", "Vince", "Willa", "Xander", "Yasmin", "Zack", "Aaron", "Beth", "Colin", "Darla",
        "Elliot", "Farrah", "Gemma", "Henry", "Isabel", "James", "Kim", "Lucas", "Marie", "Nick",
        "Olivia", "Phillip", "Quinton", "Rebecca", "Scott", "Theresa", "Ulrich", "Valerie", "Warren", "Xenia",
        "Yvette", "Zora", "Alex", "Brenda", "Connor", "Dina", "Evan", "Faye", "George", "Hannah",
        "Irene", "Jason", "Kylie", "Lance", "Melissa", "Nathaniel", "Ophelia", "Paige", "Quinn", "Ron",
        "Shawn", "Tanya", "Uriel", "Vanessa", "Wayne", "Xiomara", "Yara", "Zane", "Adrian", "Bonnie",
        "Cameron", "Dylan", "Emilia", "Finn", "Gabrielle", "Hugo", "Ismael", "Julia", "Kurt", "Lila",
        "Mason", "Nina", "Orion", "Priscilla", "Quill", "Ryan", "Sylvia", "Troy", "Uma", "Victor",
        "Whitney", "Xavier", "Yolanda", "Zion", "Anna", "Brian", "Celeste", "Declan", "Emily", "Fiona",
        "Garrett", "Hailey", "Isaiah", "Joanna", "Kevin", "Lara", "Matthew", "Norah", "Oscar", "Paula",
        "Quinn", "Rafael", "Samantha", "Trevor", "Ursula", "Vera", "Wesley", "Xander", "Yolanda", "Zack",
        "Ashley", "Brad", "Carly", "Dean", "Ethan", "Felicity", "Gordon", "Harper", "Ian", "Jenna",
        "Kelsey", "Liam", "Maggie", "Neil", "Opal", "Patrick", "Quincy", "Rachel", "Steven", "Taylor",
        "Ulrich", "Victoria", "Wanda", "Ximena", "Yusuf", "Zara", "Amber", "Blake", "Courtney", "Drew",
        "Emma", "Frances", "George", "Helena", "Isac", "Jackie", "Kara", "Logan", "Mila", "Nathan",
        "Olive", "Paul", "Quinn", "Rosa", "Sophia", "Tom", "Ulysses", "Vanessa", "Will", "Xena",
        "Yasmine", "Zeke", "Andrea", "Brent", "Celia", "Dexter", "Elsa", "Franklin", "Giselle", "Hudson",
        "Ivory", "Jeremiah", "Kayla", "Landon", "Maya", "Nico", "Owen", "Portia", "Quentin", "Rita",
        "Spencer", "Tessa", "Umar", "Violet", "Winston", "Xara", "Yvette", "Zelda", "Anthony", "Brenda",
        "Caden", "Danielle", "Elliott", "Felipe", "Gabriel", "Haley", "Isla", "Jorge", "Kaitlyn", "Leo",
        "Monica", "Nash", "Orla", "Payton", "Quinn", "Rowan", "Scarlett", "Theo", "Uri", "Vince",
        "Wayne", "Xander", "Yasmin", "Zoey", "Amelia", "Bryce", "Cara", "Dwayne", "Ellie", "Finn",
        "Georgia", "Henry", "Ivy", "Jacob", "Kira", "Lyla", "Marcus", "Noelle", "Olivia", "Parker",
        "Quinn", "Rory", "Sara", "Tobias", "Uma", "Victor", "Wendy", "Ximena", "Yves", "Zara",
        "Ava", "Blake", "Clara", "Derek", "Ezra", "Faith", "Grace", "Harry", "Ian", "Jade",
        "Kenny", "Luna", "Michael", "Natalie", "Omar", "Phoebe", "Quinlan", "Riley", "Sienna", "Tyler",
        "Uriah", "Vera", "Willow", "Xander", "Yara", "Zion"
    };


    int presents[WISHLISTS_SIZE] = {
        15, 4, 26, 9, 18, 6, 13, 21, 5, 10,
        20, 7, 25, 16, 3, 12, 8, 24, 11, 14,
        22, 2, 19, 1, 17, 23, 10, 8, 13, 2,
        4, 20, 18, 3, 7, 16, 15, 6, 12, 5,
        9, 24, 21, 11, 19, 22, 1, 25, 17, 14,
        2, 23, 23, 4, 15, 8, 18, 12, 5, 11,
        20, 16, 14, 7, 19, 3, 24, 22, 13, 25,
        1, 9, 23, 6, 17, 21, 10, 2, 22, 18,
        8, 15, 5, 19, 12, 24, 7, 16, 11, 22,
        4, 13, 20, 3, 9, 17, 6, 25, 2, 14,
        23, 1, 10, 6, 18, 15, 21, 12, 5, 8,
        16, 3, 22, 9, 6, 13, 7, 24, 19, 4,
        11, 20, 1, 14, 23, 17, 2, 25, 18, 10,
        22, 6, 8, 13, 21, 16, 3, 5, 19, 24,
        7, 20, 9, 4, 17, 12, 6, 11, 15, 2,
        14, 23, 25, 1, 18, 22, 6, 9, 8, 13,
        21, 7, 19, 16, 3, 12, 24, 5, 17, 25,
        4, 11, 20, 2, 23, 15, 18, 10, 9, 13,
        8, 21, 6, 16, 7, 3, 22, 5, 14, 19,
        4, 12, 24, 11, 17, 1, 20, 18, 21, 15,
        25, 10, 9, 7, 6, 13, 2, 8, 23, 21,
        3, 12, 19, 16, 22, 11, 5, 14, 4, 24,
        17, 1, 4, 18, 20, 25, 23, 15, 10, 7,
        9, 22, 12, 16, 5, 19, 8, 3, 13, 21
    };


    for (int i = 0; i < WISHLISTS_SIZE; i++)
    {
        wishlists[i].name = names[i];
        wishlists[i].num_of_presents = presents[i];
    }
}

```

Bei folgendem Beispiel, soll nach dem Sortieren folgendes raus kommen:

**Eingabe:** `["Ben: 2", "Anna: 6", "Clara: 3", "David: 10"]` <br>
**Ausgabe:** `David gets the most presents.`

Der Name des Kinds mit den meisten Geschenken auf der Wunschliste ist das **Passwort** für diese Aufgabe.
