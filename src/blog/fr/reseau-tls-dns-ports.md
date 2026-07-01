# Le réseau expliqué à un développeur .NET — IP, ports, DNS et TLS

Premier article de mon parcours vers l'**AppSec** (Application Security). Avant de casser ou de sécuriser une application web, il faut comprendre ce qui se passe réellement entre un clic dans le navigateur et la réponse renvoyée par le serveur. C'est la base sur laquelle reposent toutes les attaques et toutes les protections qu'on verra ensuite : injection SQL, XSS, CSRF, JWT...

## 1. Le trajet d'une requête

Quand vous tapez une URL, la requête traverse plusieurs équipements avant d'atteindre le serveur, et la réponse fait le chemin inverse.

<div style="overflow-x:auto; margin:1.5rem 0;">
<svg viewBox="0 0 860 180" width="100%" style="min-width:640px" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#0284c7"/>
    </marker>
  </defs>
  <g font-family="sans-serif" font-size="14">
    <rect x="10" y="55" width="130" height="70" rx="10" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
    <text x="75" y="85" text-anchor="middle" fill="#0f172a" font-weight="700">Client</text>
    <text x="75" y="103" text-anchor="middle" fill="#475569" font-size="12">navigateur</text>
    <rect x="195" y="55" width="120" height="70" rx="10" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
    <text x="255" y="95" text-anchor="middle" fill="#0f172a" font-weight="700">Switch</text>
    <rect x="370" y="55" width="120" height="70" rx="10" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
    <text x="430" y="95" text-anchor="middle" fill="#0f172a" font-weight="700">Routeur</text>
    <rect x="545" y="55" width="120" height="70" rx="10" fill="#f0f9ff" stroke="#0284c7" stroke-width="2"/>
    <text x="605" y="95" text-anchor="middle" fill="#0f172a" font-weight="700">Internet</text>
    <rect x="720" y="55" width="130" height="70" rx="10" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
    <text x="785" y="85" text-anchor="middle" fill="#0f172a" font-weight="700">Serveur</text>
    <text x="785" y="103" text-anchor="middle" fill="#475569" font-size="12">API / site web</text>
    <line x1="140" y1="90" x2="192" y2="90" stroke="#0284c7" stroke-width="2" marker-end="url(#arrowA)"/>
    <line x1="315" y1="90" x2="367" y2="90" stroke="#0284c7" stroke-width="2" marker-end="url(#arrowA)"/>
    <line x1="490" y1="90" x2="542" y2="90" stroke="#0284c7" stroke-width="2" marker-end="url(#arrowA)"/>
    <line x1="665" y1="90" x2="717" y2="90" stroke="#0284c7" stroke-width="2" marker-end="url(#arrowA)"/>
    <text x="430" y="30" text-anchor="middle" fill="#64748b" font-size="12">Requête (GET /api/...)</text>
    <path d="M810,145 L140,145" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#arrowA)"/>
    <text x="430" y="165" text-anchor="middle" fill="#64748b" font-size="12">Réponse (200 OK + JSON)</text>
  </g>
</svg>
</div>

- Le **switch** relie les machines d'un même réseau local et route les trames selon les adresses **MAC**.
- Le **routeur** relie des réseaux différents entre eux (ex : votre réseau local et Internet) et route selon les adresses **IP**.
- Sur Internet, la requête traverse ensuite de nombreux routeurs intermédiaires avant d'atteindre le serveur cible.

## 2. Adresse IP vs adresse MAC

| | Adresse MAC | Adresse IP |
|---|---|---|
| Portée | Réseau local uniquement | Locale ou mondiale (Internet) |
| Attribuée par | Le fabricant de la carte réseau | Le réseau (DHCP) ou manuellement |
| Change ? | Fixe (en théorie) | Peut changer à chaque connexion |
| Utilisée pour | Identifier une machine sur le réseau local | Router les paquets entre réseaux |
| Exemple | `3C:22:FB:4A:9B:1E` | `192.168.1.42` |

## 3. Les ports : la porte d'entrée des services

Une adresse IP identifie une machine, un **port** identifie le service qui tourne dessus. C'est le couple `IP:Port` qui identifie une connexion réseau de bout en bout.

| Port | Protocole | Service |
|---|---|---|
| 22 | TCP | SSH |
| 53 | UDP/TCP | DNS |
| 80 | TCP | HTTP |
| 443 | TCP | HTTPS |
| 3389 | TCP | RDP (bureau à distance) |
| 1433 | TCP | SQL Server |
| 5432 | TCP | PostgreSQL |

En tant que développeur, c'est le port `443` qui vous concerne le plus au quotidien : c'est celui sur lequel tourne toute API sécurisée en production.

## 4. TCP vs UDP

| | TCP | UDP |
|---|---|---|
| Fiabilité | Garantit la livraison, dans l'ordre | Pas de garantie |
| Connexion | Établit une connexion (handshake) | Pas de connexion (envoi direct) |
| Vitesse | Plus lent (contrôles, accusés de réception) | Plus rapide |
| Utilisé par | HTTP, HTTPS, FTP, SSH | DNS, streaming vidéo, jeux en ligne |

HTTP/HTTPS s'appuient sur TCP car on a besoin que **tous les octets arrivent, dans le bon ordre** : impossible de se permettre de perdre un morceau d'une réponse JSON.

## 5. DNS : traduire un nom de domaine en adresse IP

Un serveur ne connaît qu'une adresse IP, pas un nom de domaine. Le DNS (Domain Name System) fait la traduction.

<div style="overflow-x:auto; margin:1.5rem 0;">
<svg viewBox="0 0 900 180" width="100%" style="min-width:680px" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowB" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#0284c7"/>
    </marker>
  </defs>
  <g font-family="sans-serif" font-size="13">
    <rect x="10" y="55" width="140" height="70" rx="10" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
    <text x="80" y="85" text-anchor="middle" fill="#0f172a" font-weight="700">Navigateur</text>
    <text x="80" y="103" text-anchor="middle" fill="#475569" font-size="11">exemple.com ?</text>
    <rect x="205" y="55" width="150" height="70" rx="10" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
    <text x="280" y="85" text-anchor="middle" fill="#0f172a" font-weight="700">Résolveur</text>
    <text x="280" y="103" text-anchor="middle" fill="#475569" font-size="11">DNS du FAI</text>
    <rect x="410" y="55" width="140" height="70" rx="10" fill="#f0f9ff" stroke="#0284c7" stroke-width="2"/>
    <text x="480" y="90" text-anchor="middle" fill="#0f172a" font-weight="700">Serveur racine</text>
    <rect x="605" y="55" width="140" height="70" rx="10" fill="#f0f9ff" stroke="#0284c7" stroke-width="2"/>
    <text x="675" y="85" text-anchor="middle" fill="#0f172a" font-weight="700">Serveur TLD</text>
    <text x="675" y="103" text-anchor="middle" fill="#475569" font-size="11">.com</text>
    <line x1="150" y1="90" x2="202" y2="90" stroke="#0284c7" stroke-width="2" marker-end="url(#arrowB)"/>
    <line x1="355" y1="90" x2="407" y2="90" stroke="#0284c7" stroke-width="2" marker-end="url(#arrowB)"/>
    <line x1="550" y1="90" x2="602" y2="90" stroke="#0284c7" stroke-width="2" marker-end="url(#arrowB)"/>
    <text x="480" y="30" text-anchor="middle" fill="#64748b" font-size="11">3. « qui gère .com ? »</text>
  </g>
</svg>
</div>

Puis le serveur TLD indique au résolveur quel est le **serveur autoritaire** pour `exemple.com`, celui-ci renvoie l'adresse IP réelle, et le résolveur la met en cache et la transmet enfin au navigateur.

**Point important pour la suite du parcours** : le DNS n'est **pas chiffré** par défaut (contrairement à HTTPS). N'importe qui sur le réseau peut voir les noms de domaine que vous résolvez, même si le contenu de vos requêtes HTTPS reste protégé. C'est une des raisons d'être de DNS-over-HTTPS (DoH).

## 6. HTTP vs HTTPS

HTTP transporte les données **en clair** : n'importe qui sur le chemin (Wi-Fi public, FAI, routeur compromis) peut lire ou modifier la requête. HTTPS ajoute une couche **TLS** (Transport Layer Security) qui chiffre le transport entre le client et le serveur.

## 7. Le handshake TLS, étape par étape

<div style="overflow-x:auto; margin:1.5rem 0;">
<svg viewBox="0 0 640 300" width="100%" style="min-width:480px" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowC" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#0284c7"/>
    </marker>
  </defs>
  <g font-family="sans-serif" font-size="12">
    <rect x="20" y="10" width="120" height="40" rx="8" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
    <text x="80" y="35" text-anchor="middle" font-weight="700" fill="#0f172a">Client</text>
    <rect x="500" y="10" width="120" height="40" rx="8" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
    <text x="560" y="35" text-anchor="middle" font-weight="700" fill="#0f172a">Serveur</text>
    <line x1="80" y1="50" x2="80" y2="280" stroke="#cbd5e1" stroke-width="1"/>
    <line x1="560" y1="50" x2="560" y2="280" stroke="#cbd5e1" stroke-width="1"/>
    <line x1="80" y1="80" x2="555" y2="80" stroke="#0284c7" stroke-width="2" marker-end="url(#arrowC)"/>
    <text x="320" y="72" text-anchor="middle" fill="#334155">1. ClientHello (versions TLS, cipher suites)</text>
    <line x1="560" y1="120" x2="85" y2="120" stroke="#0284c7" stroke-width="2" marker-end="url(#arrowC)"/>
    <text x="320" y="112" text-anchor="middle" fill="#334155">2. ServerHello + Certificat</text>
    <line x1="80" y1="160" x2="555" y2="160" stroke="#0284c7" stroke-width="2" marker-end="url(#arrowC)"/>
    <text x="320" y="152" text-anchor="middle" fill="#334155">3. Échange de clés</text>
    <line x1="560" y1="200" x2="85" y2="200" stroke="#0284c7" stroke-width="2" marker-end="url(#arrowC)"/>
    <text x="320" y="192" text-anchor="middle" fill="#334155">4. Finished (des deux côtés)</text>
    <rect x="80" y="230" width="480" height="40" rx="8" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="4 3"/>
    <text x="320" y="255" text-anchor="middle" fill="#0369a1" font-weight="700">5. Données chiffrées (application data)</text>
  </g>
</svg>
</div>

1. **ClientHello** : le navigateur propose les versions de TLS et les suites cryptographiques qu'il supporte.
2. **ServerHello + Certificat** : le serveur choisit une suite, et envoie son certificat (clé publique signée par une autorité de certification).
3. **Échange de clés** : client et serveur dérivent ensemble une clé de session partagée, sans jamais la faire transiter en clair (Diffie-Hellman en TLS 1.3).
4. **Finished** : les deux parties confirment que le canal est bien établi.
5. À partir de là, toutes les données (headers, cookies, JWT, corps JSON) circulent **chiffrées** avec la clé de session.

Ce qu'il faut retenir : la clé **privée** du certificat ne quitte jamais le serveur, et le contenu de la requête (URL, headers, body) est protégé une fois le handshake terminé — mais l'adresse IP de destination et le nom de domaine visé (SNI) restent visibles sur le réseau, sauf usage d'ECH (Encrypted Client Hello).

## 8. Pourquoi tout ça compte pour un développeur ASP.NET Core

- Forcer HTTPS avec `app.UseHsts()` et une redirection HTTP → HTTPS empêche un attaquant en position de "man in the middle" de rétrograder la connexion en HTTP clair.
- Un certificat expiré ou mal configuré casse silencieusement la confiance : les navigateurs modernes bloquent la connexion plutôt que de l'autoriser en clair.
- Comprendre que le DNS n'est pas chiffré explique pourquoi on ne doit jamais mettre d'information sensible dans un sous-domaine (`mot-de-passe-oublié.monapp.com` serait visible par n'importe qui observant le trafic DNS).

## Prochaine étape

Dans les prochains articles de ce parcours AppSec, je mets en place un mini laboratoire réseau avec Kali Linux, VirtualBox et Wireshark pour observer concrètement ces échanges (requêtes HTTP en clair, handshake TLS, requêtes DNS), puis je passe aux commandes Linux essentielles pour un futur pentester.
