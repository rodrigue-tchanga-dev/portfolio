<!-- # Cours 4 - Pourquoi un `bool` ne prend-il pas simplement 1 bit ? -->

## Objectif du cours

À la fin de ce cours, tu devras être capable de répondre à cette question :

> **Pourquoi un char occupe-t-il 2 octets en mémoire ?**

---

## 1. La convention ASCII

On  a vue précedemment qu'un ordinateur ne pouvais contenir que des 0 ou des 1 en mémoire. Pour les lettres, la règle reste la même.

Par exemple, on a vu que 18 converti en binaire valait 10010 stocké sur 32 bits soit 
`00000000 00000000 00000000 00010010`

Pour les lettres
```csharp
char exemple = 'c';
```
`c` n'est pas une valeur mathématique donc dans ce contexte est est d'abord encodée selon une table standard comme par exemple

- ASCCI
- UTF-8
- Unicode

En C#, les chaines de caractères sont souvent stockées en UTF-16, donc un caractère comme `c` est représenté par un code Unicoe `'c' = U+0063`

Et en binaire

`00000000 01100011`


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