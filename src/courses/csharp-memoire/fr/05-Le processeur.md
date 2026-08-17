# Cours 5 - Le processeur

## Objectif du cours

À la fin de ce cours, tu devras être capable de répondre à cette question :

> **Qui exécute réellement mon code C# ?**

Pour y répondre, nous allons répondre progressivement aux questions suivantes :

1. Qu'est-ce qu'un processeur ?
2. Que comprend-il ?
3. Comment exécute-t-il un programme ?
4. Pourquoi ne comprend-il pas le C# ?

---

## 1. Qu'est-ce qu'un processeur ?

Jusqu'à présent, nous avons vu que la mémoire RAM permettait de stocker des données.

Mais une mémoire ne fait rien toute seule.

Imagine un immense entrepôt rempli de cartons.

Les cartons sont bien rangés.

Ils possèdent tous une adresse.

Mais si personne ne vient les ouvrir, les déplacer ou les utiliser, il ne se passe absolument rien.

La mémoire RAM ressemble à cet entrepôt.

Elle stocke les informations.

Le **processeur (CPU)** est l'ouvrier qui va chercher les données, les lit, les modifie puis les remet en mémoire.

Sans processeur, un ordinateur serait incapable de faire le moindre calcul.

---

## 2. Que comprend un processeur ?

Imaginons que tu écrives :

```csharp
int age = 18;
int resultat = age + 2;
```

Toi, tu lis facilement :

> **Le résultat vaut 20.**

Le processeur, lui, ne voit jamais cela.

Il ne connaît pas :

- `int`
- `age`
- `resultat`
- `+`

Ces mots n'existent pas pour lui.

Le processeur comprend uniquement des instructions très simples, par exemple :

- charger une valeur depuis la mémoire ;
- additionner deux nombres ;
- comparer deux valeurs ;
- copier une valeur ;
- sauter à une autre instruction.

On appelle cet ensemble le **langage machine**.

Chaque famille de processeurs (Intel, AMD, ARM...) possède son propre langage machine.

---

## 3. Alors que devient mon code C# ?

Lorsque tu écris :

```csharp
int age = 18;
```

Le processeur ne lit jamais cette ligne.

Voici ce qui se passe réellement.

### Étape 1

Tu écris du code C#.

```csharp
int age = 18;
```

⬇️

### Étape 2

Le compilateur C# transforme ton code en **IL (Intermediate Language)**.

L'IL est un langage intermédiaire compris par .NET, mais **pas encore par le processeur**.

⬇️

### Étape 3

Au moment de l'exécution, le **JIT (Just-In-Time Compiler)** traduit l'IL en langage machine.

⬇️

### Étape 4

Le processeur exécute enfin ces instructions.

On peut résumer ainsi :

```text
Code C#
      │
      ▼
Compilateur C#
      │
      ▼
Code IL
      │
      ▼
JIT
      │
      ▼
Langage machine
      │
      ▼
Processeur
```

---

## 4. Comment travaille le processeur ?

Le processeur répète toujours le même cycle.

Il est extrêmement rapide.

Il effectue ce cycle plusieurs milliards de fois par seconde.

Ce cycle comporte trois étapes.

### Étape 1 : Fetch

Le processeur va chercher la prochaine instruction en mémoire.

Par exemple :

```text
Additionner deux nombres
```

### Étape 2 : Decode

Il lit cette instruction.

Il cherche à comprendre ce qu'il doit faire.

Par exemple :

> Additionner.

### Étape 3 : Execute

Il réalise réellement l'opération.

Puis il passe immédiatement à l'instruction suivante.

On appelle cela le cycle :

```text
Fetch
   ↓
Decode
   ↓
Execute
```

Encore.

Encore.

Encore.

Des milliards de fois chaque seconde.

---

## 5. Le processeur est extrêmement rapide

Les processeurs modernes fonctionnent à plusieurs gigahertz.

Par exemple :

```text
3,5 GHz
```

Cela signifie environ :

```text
3 500 000 000 cycles par seconde
```

Autrement dit, il peut exécuter plusieurs milliards d'instructions chaque seconde.

C'est ce qui permet d'ouvrir des applications, de jouer à des jeux vidéo ou de compiler un projet en quelques instants.

---

## À retenir

À la fin de ce cours, tu dois retenir les points suivants :

- La RAM stocke les données.
- Le processeur les utilise.
- Le processeur ne comprend pas le C#.
- Il comprend uniquement le langage machine.
- Avant d'être exécuté, ton code C# est transformé en IL, puis en langage machine grâce au JIT.
- Le processeur répète continuellement le cycle **Fetch → Decode → Execute**.

---

## Remarque

Pour rester simple, j'ai parlé d'un seul processeur.

En réalité, un processeur moderne possède plusieurs **cœurs (cores)**.

Chaque cœur peut exécuter ses propres instructions.

C'est ce qui permet à plusieurs tâches de s'exécuter en parallèle.

Nous reviendrons sur cette notion lorsque nous parlerons du **multithreading** et de l'**asynchronisme** en C#.