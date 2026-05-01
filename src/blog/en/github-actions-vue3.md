# Deploy a Vue 3 Site to GitHub Pages with GitHub Actions

This portfolio you're reading is automatically deployed on every `git push` thanks to GitHub Actions. Here's exactly how I set up this CI/CD pipeline in under 30 minutes — no server, no cost.

## Prerequisites

- A Vue 3 project with Vite
- A public GitHub repository
- GitHub Pages enabled in repo settings (Settings → Pages → Source: **GitHub Actions**)

## Step 1: Configure the base in Vite

If your repo is named `portfolio`, the site will be served from `/portfolio/`. You need to tell Vite about this:

```js
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/portfolio/',
})
```

## Step 2: Create the GitHub Actions workflow

Create the file `.github/workflows/deploy.yml` at the root of the project:

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

## What happens on every push

1. GitHub Actions clones the repo on an Ubuntu machine
2. Installs dependencies with `npm ci`
3. Builds the project → generates the `dist/` folder
4. Uploads `dist/` as a GitHub Pages artifact
5. Automatically deploys to production

Total duration: approximately **2 minutes**.

## Key points

**Environment variables**: never put API keys directly in the code. Use **GitHub Secrets** (Settings → Secrets and variables → Actions) and reference them in the workflow:

```yaml
env:
  VITE_API_KEY: ${{ secrets.VITE_API_KEY }}
```

**npm cache**: the `cache: npm` in `setup-node` speeds up subsequent builds by reusing the dependency cache. On a standard project, this takes installation from ~60s down to ~15s.

## Conclusion

This setup is perfect for a portfolio, documentation site, or any static project. For more complex projects requiring a backend, I recommend looking at Vercel or Railway, which offer similar pipelines with more flexibility.
