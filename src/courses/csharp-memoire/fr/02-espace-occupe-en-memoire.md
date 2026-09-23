<!--# Cours 2 - Pourquoi un `int` occupe-t-il 4 octets ?-->

## Objectif du cours

À la fin de ce cours, tu devras être capable de répondre à cette question :

> **Pourquoi un `int` occupe-t-il exactement 4 octets en mémoire ?**

Pour répondre à cette question, nous allons essayer de comprendre ce que représente un nombre comme 18 pour un oordinateur.

---

## 1. Pourquoi un `int` fait-il 4 octets ?

Lors du cours précédent, nous avons vu que la mémoire était comparable à une immense ville composée de millions d'appartements, chacun possédant sa propre adresse.

Mais une nouvelle question se pose.

> **Tous les appartements ont-ils la même taille ?**

Autrement dit...

Lorsque j'écris :

```csharp
byte a = 1;
int b = 1;
long c = 1;
```

Est-ce que ces trois variables occupent la même place en mémoire ?

La réponse est :

> **Non.**

Mais pour comprendre pourquoi, nous devons d'abord comprendre comment un ordinateur stocke un nombre.

---

Dans le cours précédent, nous avons volontairement simplifié les choses en disant que lorsque l'on écrit :

```csharp
int age = 18;
```

le nombre **18** est rangé à une adresse mémoire et que cette adresse porte le nom **age** pour le  éveloppeur et le compilateur.

En réalité, ce n'est pas exactement **18** qui est stocké.

Pourquoi ?

Parce qu'un ordinateur ne comprend ni les chiffres, ni les lettres.

Il ne comprend que deux valeurs :

```text
0
1
```

On appelle chacune de ces positions un **bit** (*binary digit*).

---

### Convertir 18 en binaire

Pour représenter le nombre **18**, on le convertit en binaire.

Pour cela, on effectue des divisions successives par 2 et on note le quotient ainsi que le reste.

|  Division  |  Quotient  |  Reste  |
|:----------:|:---------:|:------:|
| 18 ÷ 2 | 9 | 0 |
| 9 ÷ 2 | 4 | 1 |
| 4 ÷ 2 | 2 | 0 |
| 2 ÷ 2 | 1 | 0 |
| 1 ÷ 2 | 0 | 1 |

On lit ensuite les restes **de bas en haut**.

On obtient :

```text
10010
```

Le nombre **18** s'écrit donc **10010** en binaire.

---

### Pourquoi un `int` occupe-t-il 32 bits ?

Le nombre **10010** ne contient que **5 bits**.

Pourtant, un `int` en C# est toujours stocké sur **32 bits**, c'est-à-dire **4 octets**.

On complète donc la représentation avec des zéros à gauche.

```text
00000000 00000000 00000000 00010010
```

Les zéros ajoutés à gauche ne changent pas la valeur du nombre.

Ils permettent simplement d'occuper les **32 bits** réservés à un `int`.

un int a une plage de valeurs de : -2 147 483 648 à 2 147 483 647

En C#, on a la possiblité de forcer un int sur 16 bits qui correspond en réalité à un short

```csharp
Int16 nombre = 250;
```

On l’utilise souvent pour des :

- petits identifiants,
- données de capteurs,
- valeurs numériques limitées,
- structures de données compactes,
- formats binaires / interopérabilité.

> **À retenir :**
>
> Un `int` occupe de manière standard  **4 octets (32 bits)**, quelle que soit la valeur qu'il contient.
>
> Que la variable contienne `18`, `1500` ou `2 000 000`, elle occupera **4 octets**.

---

## Dans le prochain chapitre...

Maintenant que nous savons pourquoi un `int` occupe 4 octets, nous allons répondre à une nouvelle question :

> **Pourquoi un `long` occupe-t-il 8 octets ?**

Tu découvriras également pourquoi tous les types C# n'occupent pas la même place en mémoire.