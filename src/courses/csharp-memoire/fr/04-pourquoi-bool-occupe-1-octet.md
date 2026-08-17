<!-- # Cours 4 - Pourquoi un `bool` ne prend-il pas simplement 1 bit ? -->

## Objectif du cours

À la fin de ce cours, tu devras être capable de répondre à cette question :

> **Pourquoi un booléen n'occupe-t-il pas simplement 1 bit en mémoire ?**

---

## 1. Un `bool` ne peut prendre que deux valeurs

En C#, un `bool` peut contenir uniquement deux valeurs :

```csharp
bool estMajeur = true;
bool estMineur = false;
```

Contrairement à un `int`, il ne peut pas contenir 18, 25 ou 1000.

Il ne connaît que deux états :

- `true`
- `false`

On pourrait donc penser qu'un seul bit suffit.

Par exemple :

```text
0 = false
1 = true
```

Cette idée est parfaitement logique.

Alors pourquoi un `bool` n'occupe-t-il pas simplement un bit ?

---

## 2. Les processeurs préfèrent manipuler des octets

Pour comprendre, imaginons une bibliothèque.

Tu veux emprunter une seule feuille de papier.

Le bibliothécaire pourrait te donner uniquement cette feuille.

Mais ce serait compliqué à ranger, à retrouver et à transporter.

Il préfère te donner un dossier complet.

Même si une seule feuille t'intéresse.

Les processeurs fonctionnent un peu de la même manière.

Ils manipulent beaucoup plus facilement des groupes de 8 bits, appelés **octets**, que des bits isolés.

C'est plus simple et plus rapide.

---

## 3. Le choix du CLR

Dans .NET, le type `bool` est défini comme un type occupant **1 octet**.

Autrement dit :

```text
1 bool = 8 bits
```

Pourtant, une seule de ces huit positions suffit réellement à représenter la valeur.

Par exemple :

```text
00000000 = false

00000001 = true
```

Les autres bits ne sont pas utilisés pour représenter la valeur logique.

Le CLR choisit cette représentation afin de simplifier le travail du processeur et d'obtenir de meilleures performances.

---

## 4. Est-ce que cela gaspille de la mémoire ?

À première vue, oui.

On pourrait stocker huit booléens dans un seul octet.

Mais cela compliquerait énormément le travail du processeur.

À chaque lecture, il faudrait :

- retrouver le bon bit ;
- l'extraire ;
- le modifier ;
- puis réécrire tout l'octet.

Cette opération serait beaucoup plus coûteuse que de réserver directement un octet par booléen.

Les performances sont donc privilégiées par rapport à une économie de mémoire très faible.

---

## À retenir

- Un `bool` ne peut contenir que deux valeurs : `true` ou `false`.
- Un seul bit serait suffisant pour représenter ces deux états.
- En pratique, le CLR représente un `bool` sur **1 octet (8 bits)**.
- Ce choix simplifie le travail du processeur et améliore les performances.

---

## Dans le prochain cours...

Nous répondrons à une nouvelle question :

> **Pourquoi un `char` occupe-t-il 2 octets en C# ?**

Tu découvriras pourquoi un caractère n'est pas toujours représenté sur un seul octet et comment C# gère les caractères du monde entier.