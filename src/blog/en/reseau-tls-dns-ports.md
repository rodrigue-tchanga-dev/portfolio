# Networking Explained for a .NET Developer — IP, Ports, DNS and TLS

First article in my journey toward **AppSec** (Application Security). Before breaking or securing a web application, you need to understand what actually happens between a click in the browser and the response coming back from the server. This is the foundation everything else builds on: SQL injection, XSS, CSRF, JWT...

## 1. The path of a request

When you type a URL, the request travels through several devices before reaching the server, and the response takes the reverse path.

<div style="overflow-x:auto; margin:1.5rem 0;">
<svg viewBox="0 0 860 180" width="100%" style="min-width:640px" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowA2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#0284c7"/>
    </marker>
  </defs>
  <g font-family="sans-serif" font-size="14">
    <rect x="10" y="55" width="130" height="70" rx="10" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
    <text x="75" y="85" text-anchor="middle" fill="#0f172a" font-weight="700">Client</text>
    <text x="75" y="103" text-anchor="middle" fill="#475569" font-size="12">browser</text>
    <rect x="195" y="55" width="120" height="70" rx="10" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
    <text x="255" y="95" text-anchor="middle" fill="#0f172a" font-weight="700">Switch</text>
    <rect x="370" y="55" width="120" height="70" rx="10" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
    <text x="430" y="95" text-anchor="middle" fill="#0f172a" font-weight="700">Router</text>
    <rect x="545" y="55" width="120" height="70" rx="10" fill="#f0f9ff" stroke="#0284c7" stroke-width="2"/>
    <text x="605" y="95" text-anchor="middle" fill="#0f172a" font-weight="700">Internet</text>
    <rect x="720" y="55" width="130" height="70" rx="10" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
    <text x="785" y="85" text-anchor="middle" fill="#0f172a" font-weight="700">Server</text>
    <text x="785" y="103" text-anchor="middle" fill="#475569" font-size="12">API / website</text>
    <line x1="140" y1="90" x2="192" y2="90" stroke="#0284c7" stroke-width="2" marker-end="url(#arrowA2)"/>
    <line x1="315" y1="90" x2="367" y2="90" stroke="#0284c7" stroke-width="2" marker-end="url(#arrowA2)"/>
    <line x1="490" y1="90" x2="542" y2="90" stroke="#0284c7" stroke-width="2" marker-end="url(#arrowA2)"/>
    <line x1="665" y1="90" x2="717" y2="90" stroke="#0284c7" stroke-width="2" marker-end="url(#arrowA2)"/>
    <text x="430" y="30" text-anchor="middle" fill="#64748b" font-size="12">Request (GET /api/...)</text>
    <path d="M810,145 L140,145" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#arrowA2)"/>
    <text x="430" y="165" text-anchor="middle" fill="#64748b" font-size="12">Response (200 OK + JSON)</text>
  </g>
</svg>
</div>

- The **switch** connects machines on the same local network and forwards frames based on **MAC** addresses.
- The **router** connects different networks together (e.g. your local network and the Internet) and forwards based on **IP** addresses.
- On the Internet, the request then crosses many intermediate routers before reaching the target server.

## 2. IP address vs MAC address

| | MAC address | IP address |
|---|---|---|
| Scope | Local network only | Local or global (Internet) |
| Assigned by | The network card manufacturer | The network (DHCP) or manually |
| Changes? | Fixed (in theory) | Can change on every connection |
| Used for | Identifying a machine on the local network | Routing packets between networks |
| Example | `3C:22:FB:4A:9B:1E` | `192.168.1.42` |

## 3. Ports: the entry door of a service

An IP address identifies a machine, a **port** identifies the service running on it. The `IP:Port` pair is what identifies a network connection end to end.

| Port | Protocol | Service |
|---|---|---|
| 22 | TCP | SSH |
| 53 | UDP/TCP | DNS |
| 80 | TCP | HTTP |
| 443 | TCP | HTTPS |
| 3389 | TCP | RDP (remote desktop) |
| 1433 | TCP | SQL Server |
| 5432 | TCP | PostgreSQL |

As a developer, port `443` is the one you deal with the most: it's the one any secured API runs on in production.

## 4. TCP vs UDP

| | TCP | UDP |
|---|---|---|
| Reliability | Guarantees delivery, in order | No guarantee |
| Connection | Establishes a connection (handshake) | Connectionless (direct send) |
| Speed | Slower (checks, acknowledgements) | Faster |
| Used by | HTTP, HTTPS, FTP, SSH | DNS, video streaming, online games |

HTTP/HTTPS rely on TCP because **every byte needs to arrive, in the right order**: you can't afford to lose a chunk of a JSON response.

## 5. DNS: translating a domain name into an IP address

A server only knows an IP address, not a domain name. DNS (Domain Name System) does the translation.

<div style="overflow-x:auto; margin:1.5rem 0;">
<svg viewBox="0 0 900 180" width="100%" style="min-width:680px" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowB2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#0284c7"/>
    </marker>
  </defs>
  <g font-family="sans-serif" font-size="13">
    <rect x="10" y="55" width="140" height="70" rx="10" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
    <text x="80" y="85" text-anchor="middle" fill="#0f172a" font-weight="700">Browser</text>
    <text x="80" y="103" text-anchor="middle" fill="#475569" font-size="11">example.com ?</text>
    <rect x="205" y="55" width="150" height="70" rx="10" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
    <text x="280" y="85" text-anchor="middle" fill="#0f172a" font-weight="700">Resolver</text>
    <text x="280" y="103" text-anchor="middle" fill="#475569" font-size="11">ISP DNS</text>
    <rect x="410" y="55" width="140" height="70" rx="10" fill="#f0f9ff" stroke="#0284c7" stroke-width="2"/>
    <text x="480" y="90" text-anchor="middle" fill="#0f172a" font-weight="700">Root server</text>
    <rect x="605" y="55" width="140" height="70" rx="10" fill="#f0f9ff" stroke="#0284c7" stroke-width="2"/>
    <text x="675" y="85" text-anchor="middle" fill="#0f172a" font-weight="700">TLD server</text>
    <text x="675" y="103" text-anchor="middle" fill="#475569" font-size="11">.com</text>
    <line x1="150" y1="90" x2="202" y2="90" stroke="#0284c7" stroke-width="2" marker-end="url(#arrowB2)"/>
    <line x1="355" y1="90" x2="407" y2="90" stroke="#0284c7" stroke-width="2" marker-end="url(#arrowB2)"/>
    <line x1="550" y1="90" x2="602" y2="90" stroke="#0284c7" stroke-width="2" marker-end="url(#arrowB2)"/>
    <text x="480" y="30" text-anchor="middle" fill="#64748b" font-size="11">3. "who handles .com?"</text>
  </g>
</svg>
</div>

The TLD server then tells the resolver which **authoritative server** is responsible for `example.com`, that server returns the actual IP address, and the resolver caches it before finally handing it back to the browser.

**Important point for the rest of this journey**: DNS is **not encrypted** by default (unlike HTTPS). Anyone on the network can see which domain names you're resolving, even though the content of your HTTPS requests stays protected. That's one of the reasons DNS-over-HTTPS (DoH) exists.

## 6. HTTP vs HTTPS

HTTP transports data **in plain text**: anyone on the path (public Wi-Fi, ISP, a compromised router) can read or tamper with the request. HTTPS adds a **TLS** (Transport Layer Security) layer that encrypts the transport between client and server.

## 7. The TLS handshake, step by step

<div style="overflow-x:auto; margin:1.5rem 0;">
<svg viewBox="0 0 640 300" width="100%" style="min-width:480px" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowC2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#0284c7"/>
    </marker>
  </defs>
  <g font-family="sans-serif" font-size="12">
    <rect x="20" y="10" width="120" height="40" rx="8" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
    <text x="80" y="35" text-anchor="middle" font-weight="700" fill="#0f172a">Client</text>
    <rect x="500" y="10" width="120" height="40" rx="8" fill="#ffffff" stroke="#0284c7" stroke-width="2"/>
    <text x="560" y="35" text-anchor="middle" font-weight="700" fill="#0f172a">Server</text>
    <line x1="80" y1="50" x2="80" y2="280" stroke="#cbd5e1" stroke-width="1"/>
    <line x1="560" y1="50" x2="560" y2="280" stroke="#cbd5e1" stroke-width="1"/>
    <line x1="80" y1="80" x2="555" y2="80" stroke="#0284c7" stroke-width="2" marker-end="url(#arrowC2)"/>
    <text x="320" y="72" text-anchor="middle" fill="#334155">1. ClientHello (TLS versions, cipher suites)</text>
    <line x1="560" y1="120" x2="85" y2="120" stroke="#0284c7" stroke-width="2" marker-end="url(#arrowC2)"/>
    <text x="320" y="112" text-anchor="middle" fill="#334155">2. ServerHello + Certificate</text>
    <line x1="80" y1="160" x2="555" y2="160" stroke="#0284c7" stroke-width="2" marker-end="url(#arrowC2)"/>
    <text x="320" y="152" text-anchor="middle" fill="#334155">3. Key exchange</text>
    <line x1="560" y1="200" x2="85" y2="200" stroke="#0284c7" stroke-width="2" marker-end="url(#arrowC2)"/>
    <text x="320" y="192" text-anchor="middle" fill="#334155">4. Finished (both sides)</text>
    <rect x="80" y="230" width="480" height="40" rx="8" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="4 3"/>
    <text x="320" y="255" text-anchor="middle" fill="#0369a1" font-weight="700">5. Encrypted data (application data)</text>
  </g>
</svg>
</div>

1. **ClientHello**: the browser proposes the TLS versions and cipher suites it supports.
2. **ServerHello + Certificate**: the server picks a suite and sends its certificate (public key signed by a certificate authority).
3. **Key exchange**: client and server jointly derive a shared session key, without ever sending it in plain text (Diffie-Hellman in TLS 1.3).
4. **Finished**: both sides confirm the channel is properly established.
5. From here on, all data (headers, cookies, JWT, JSON body) travels **encrypted** with the session key.

Key takeaway: the certificate's **private** key never leaves the server, and the request content (URL, headers, body) is protected once the handshake completes — but the destination IP address and the target domain name (SNI) remain visible on the network, unless Encrypted Client Hello (ECH) is used.

## 8. Why this matters for an ASP.NET Core developer

- Enforcing HTTPS with `app.UseHsts()` and an HTTP → HTTPS redirect prevents a man-in-the-middle attacker from downgrading the connection to plain HTTP.
- An expired or misconfigured certificate silently breaks trust: modern browsers block the connection instead of falling back to plain text.
- Understanding that DNS is unencrypted explains why you should never put sensitive information in a subdomain (`forgot-password.myapp.com` would be visible to anyone observing DNS traffic).

## What's next

In the next articles of this AppSec journey, I'll set up a small network lab with Kali Linux, VirtualBox and Wireshark to actually observe these exchanges (plain-text HTTP requests, the TLS handshake, DNS queries), then move on to the essential Linux commands for a future pentester.
