<!-- # Cours 3. Pourquoi un `long` fait-il 8 octets ? -->

Maintenant que nous savons pourquoi un `int` occupe **4 octets (32 bits)**, une nouvelle question se pose.

Pourquoi un `long` occupe-t-il **8 octets (64 bits)** ?

Prenons un exemple.

```csharp
int age = 18;
long population = 8_000_000_000;
```

Pourquoi le premier occupe-t-il **4 octets** et le second **8 octets** ?

La réponse est simple.

Un type numérique doit réserver suffisamment de bits pour représenter toutes les valeurs qu'il peut contenir.

Nous avons vu qu'un `int` est stocké sur **32 bits**.

Avec 32 bits, il est possible de représenter plus de **4 milliards** de combinaisons différentes.

Comme un `int` doit également représenter des nombres négatifs, sa plage de valeurs est :

```text
-2 147 483 648 à 2 147 483 647
```

Cette plage est largement suffisante pour représenter un âge, un nombre de jours ou encore un identifiant.

En revanche, certaines valeurs sont beaucoup plus grandes.

Par exemple :

- la population mondiale ;
- la distance parcourue par une sonde spatiale ;
- un très grand identifiant en base de données.

Dans ces situations, un `int` n'est plus suffisant.

Le type `long` utilise alors **64 bits**, soit **8 octets**.

Grâce à ces 64 bits, il peut représenter énormément plus de valeurs.

Sa plage est comprise entre :

```text
-9 223 372 036 854 775 808
et
 9 223 372 036 854 775 807
```

Cette différence est gigantesque.

Pour résumer :

| Type | Taille | Nombre de bits |
|------|---------|----------------|
| `int` | 4 octets | 32 bits |
| `long` | 8 octets | 64 bits |

On pourrait se demander :

> Pourquoi ne pas utiliser uniquement des `long` puisqu'ils peuvent stocker des nombres beaucoup plus grands ?

La réponse est simple.

Un `long` occupe deux fois plus de mémoire qu'un `int`.

Si ton application manipule des millions de nombres, utiliser un type plus grand que nécessaire gaspille de la mémoire.

C'est pour cette raison que C# propose plusieurs types numériques (`byte`, `short`, `int`, `long`...).

Chaque type répond à un besoin précis.

> **À retenir**
>
> Un `long` occupe toujours **8 octets (64 bits)**.
>
> Il permet de représenter des nombres beaucoup plus grands qu'un `int`, mais il utilise également deux fois plus de mémoire.