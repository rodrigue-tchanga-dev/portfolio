# Déployer un site Vue 3 sur GitHub Pages avec GitHub Actions

Ce portfolio que vous lisez est déployé automatiquement à chaque `git push` grâce à GitHub Actions. Voici exactement comment j'ai mis en place ce pipeline CI/CD en moins de 30 minutes — sans serveur, sans coût.

## Prérequis

- Un projet Vue 3 avec Vite
- Un dépôt GitHub public
- GitHub Pages activé dans les paramètres du repo (Settings → Pages → Source : **GitHub Actions**)

## Étape 1 : Configurer la base dans Vite

Si votre repo s'appelle `portfolio`, le site sera servi depuis `/portfolio/`. Il faut l'indiquer à Vite :

```js
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/portfolio/',
})
```

## Étape 2 : Créer le workflow GitHub Actions

Créez le fichier `.github/workflows/deploy.yml` à la racine du projet :

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

## Ce qui se passe à chaque push

1. GitHub Actions clone le repo sur une machine Ubuntu
2. Installe les dépendances avec `npm ci`
3. Build le projet → génère le dossier `dist/`
4. Upload `dist/` comme artefact GitHub Pages
5. Déploie en production automatiquement

Durée totale : environ **2 minutes**.

## Points d'attention

**Variables d'environnement** : ne mettez jamais de clés API directement dans le code. Utilisez les **GitHub Secrets** (Settings → Secrets and variables → Actions) et référencez-les dans le workflow :

```yaml
env:
  VITE_API_KEY: ${{ secrets.VITE_API_KEY }}
```

**Cache npm** : le `cache: npm` dans `setup-node` accélère les builds suivants en réutilisant le cache des dépendances. Sur un projet standard, on passe de ~60s à ~15s pour l'installation.

## Conclusion

Ce setup convient parfaitement pour un portfolio, un site de documentation ou tout projet statique. Pour un projet plus complexe nécessitant un backend, je recommande de regarder du côté de Vercel ou Railway qui proposent des pipelines similaires avec plus de flexibilité.
