<script lang="ts" setup>
  import '/assets/index.css'

  useHead({
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      {
        rel: 'preconnect',
        href: "https://fonts.googleapis.com",
      },
      {
        rel: 'preconnect',
        href: "https://fonts.gstatic.com",
        crossorigin: true
      },
      {
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;700&display=swap",
        rel: "stylesheet"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.sandbox.google.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'apple-touch-icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      // { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' },
      { name: 'msapplication-TileColor', content: '#2d89ef' },
      { name: 'theme-color', content: '#ffffff' }
    ],
  })

</script>

<!-- main page structure -->
<template>
  <div class="sans-serif">
    <TheHeader />
    <NuxtPage />
    <TheFooter />
  </div>
</template>