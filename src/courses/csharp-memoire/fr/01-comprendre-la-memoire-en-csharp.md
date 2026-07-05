# Cours 1 - La mémoire (RAM)

## Objectif du cours

À la fin de ce cours, tu devras être capable de répondre à cette question :

> **Lorsque j'écris une variable en C#, où va-t-elle ?**

Pour répondre à cette question, nous allons d'abord répondre à trois autres questions :

1. Qu'est-ce que la RAM ?
2. Pourquoi les adresses mémoire existent-elles ?
3. Pourquoi donner un nom à une variable ?

---

## 1. Qu'est-ce que la RAM ?

Imagine que ton ordinateur est une immense ville, comme Paris.

Dans cette ville, il existe des millions d'appartements.

Chaque appartement peut contenir quelque chose :

- une personne ;
- un meuble ;
- des cartons ;
- ou n'importe quel autre objet.

La mémoire RAM fonctionne de la même manière.

Elle est composée de millions de petits emplacements capables de stocker des données.

Ces données peuvent être :

- un nombre (`18`) ;
- une lettre (`A`) ;
- un texte (`"Bonjour"`) ;
- ou encore une partie d'un objet.

Dans une vraie ville, chaque appartement possède une adresse.

Par exemple :

```text
12 rue Victor Hugo
Appartement 15
```

En informatique, c'est exactement le même principe : chaque emplacement mémoire possède une adresse.

---

## 2. Pourquoi les adresses mémoire existent-elles ?

Restons dans notre ville.

Si je te demande :

> « Va chercher le livre rouge. »

Tu vas immédiatement me répondre :

> « Dans quel appartement ? »

Sans adresse, il faudrait ouvrir tous les appartements de la ville.

Ce serait beaucoup trop long.

L'ordinateur fait exactement la même chose.

Lorsqu'il a besoin d'une information, il va directement à son adresse mémoire. C'est ce qui lui permet d'être extrêmement rapide.

L'ordinateur ne retrouve jamais une donnée grâce à son nom (`age`, `nom`, `prix`...).

Il la retrouve grâce à son adresse mémoire.

---

## 3. Pourquoi donner un nom à une variable ?

Prenons un exemple très simple :

```csharp
int age = 18;
```

On pourrait croire que l'ordinateur retient le mot `age`.

En réalité, ce nom n'est pas destiné au processeur.

Il est principalement destiné :

- au développeur, pour rendre le code plus lisible ;
- au compilateur, qui l'utilise pour construire le programme.

Une fois le programme compilé, le processeur ne manipule plus le mot `age`.

Il travaille uniquement avec des adresses mémoire et des valeurs.

---

## À retenir

À la fin de ce premier cours, tu dois retenir quatre idées essentielles.

- La RAM est une mémoire **temporaire** qui stocke les données pendant l'exécution d'un programme.
- Elle est composée de millions d'emplacements mémoire.
- Chaque emplacement possède une adresse permettant au processeur de retrouver rapidement une donnée.
- Une variable (`age`, `nom`, `prix`...) est un nom utilisé par le développeur et le compilateur. Pendant l'exécution, le processeur manipule uniquement des adresses mémoire et des valeurs.

---

## Dans le prochain cours...

Nous répondrons à une nouvelle question :

> **Pourquoi un `int` occupe-t-il exactement 4 octets ?**

Tu découvriras ce qu'est un bit, un octet, et comment le nombre `18` est réellement représenté dans la mémoire de l'ordinateur.