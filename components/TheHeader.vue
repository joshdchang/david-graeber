
<!-- get data from Directus -->
<script setup>
  const { settings, header } = await useNuxtApp().$api(['settings', 'header'])
</script>

<!-- component -->
<template>
  <div>
    
    <!-- dark gradient overlay -->
    <section class="overlay h-40 sm:h-50 md:h-56 fixed z-50 w-full"></section>
   
    <!-- header -->
    <section class="w-full sm:px-8 fixed z-50">
      <div class="sm:py-4 md:py-6 mx-auto max-w-7xl md:flex-row text-white">
        <div class="flex flex-col flex-wrap items-center p-2 sm:py-4 md:flex-row sm:border-b sm:border-t">

          <!-- nav links -->
          <nav class="flex flex-wrap items-center text-base md:ml-auto header-nav text-gray-200 sm:text-white">
            <template v-for="item of header">
              <NuxtLink v-if="item.type === 'page'" :to="item.page" class="font-medium hover:text-gray-300 uppercase header-link">
                {{ item.name }}
              </NuxtLink>
              <NuxtLink v-if="item.type === 'article'" :to="'/blog/' + item.article" class="font-medium hover:text-gray-300 uppercase header-link">
                {{ item.name }}
              </NuxtLink>
              <a v-if="item.type === 'external'" :href="item.link" class="font-medium hover:text-gray-300 uppercase header-link">
                {{ item.name }}
              </a>
            </template>
          </nav>

          <!-- name -->
          <NuxtLink to="/" class="header-name flex items-center order-first mb-2 sm:mb-4 font-bold text-lg md:mb-0 serif uppercase">
            {{ settings.header_name }}
          </NuxtLink>

        </div>
      </div>
    </section>

  </div>
</template>

<!-- non-Tailwind styles -->
<style scoped>
  .overlay {
    background-image: linear-gradient(rgba(19, 21, 45, 0.735), rgba(29, 28, 35, 0));
    pointer-events: none;
  }
  .header-link {
    letter-spacing: 0.18rem;
  }
  .header-nav a {
    @apply mx-2 sm:mx-3;
  }
  .header-name {
    letter-spacing: 0.1rem;
  }
</style>
