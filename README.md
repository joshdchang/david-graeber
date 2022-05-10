# [David C. Graeber Website](https://davidcgraeber.com)
This website is built using Nuxt 3 (Hybrid SPA/SSG) and Directus.
Hosting and DNS is provided by Cloudflare.
Zapier triggers a webhook once per day to rebuild Cloudflare Pages for better SEO using SSR.

## To deploy to Cloudflare Pages
- set SSR to true in nuxt.config
- npm run generate
- delete dist alias
- commit and sync to origin

## TODO
- Environment variables
- Test whether Cloudflare Pages is truly generating site or if it is reading .output from repo
- Universal fonts