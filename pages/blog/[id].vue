<script setup>
  const { articles } = await useNuxtApp().$api(['articles'])
  const article = articles.find(x => x.id == useRoute().params.id)
  useNuxtApp().$scrollTop()
</script>

<template>
  <div class="mb-5">

    <Head>
      <Title>{{article.title}} - David C. Graeber</Title>
    </Head>

    <div class="relative">

      <!-- featured image -->
      <TheImage class="top-image" :asset="article.featured_image"></TheImage>
      <!-- darkening overlay -->
      <div class="top-image-overlay hidden md:block absolute bottom-0 left-0 right-0 h-80 lg:h-96"></div>

      <!-- title-->
      <div class="md:absolute bottom-0 left-0 right-0 p-9 sm:p-14 md:p-16 lg:p-20 xl:p-24">
        <h1 class="font-bold text-gray-900 md:text-white serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          {{ article.title }}
        </h1>
        <p v-if="article.description"
          class="text-gray-600 md:text-gray-200 mt-5 sm:mt-6 md:mt-7 lg:mt-8 xl:mt-9 sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
          {{ article.description }}
        </p>
      </div>
    </div>
    <hr>

    <!-- main content -->
    <div class="article-container">
      <p class="uppercase text-lg md:text-xl lg:text-2xl mb-10 md:mb-16 lg:mb-20 letter-spacing">
        <PrettyDate :dateStr="article.custom_publish_date || article.date_created"></PrettyDate>
      </p>
      <DynamicText :content="article.content"></DynamicText>
      <DynamicText class="mt-12 sm:mt-14 md:mt-16 lg:mt-18">
        <NuxtLink to="/blog">⬅ Back</NuxtLink>
      </DynamicText>
    </div>
  </div>
</template>

<!-- non-Styles -->
<style scoped>
  .top-image-overlay {
    background-image: linear-gradient(rgba(29, 28, 35, 0), rgba(19, 21, 45, 0.735));
  }

  .top-image {
    filter: brightness(0.9);
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    object-fit: cover;
    max-height: 100vh;
  }

  .article-container {
    @apply p-9 sm:p-14 md:p-16 lg:p-20 xl:p-24 mx-auto;
    max-width: 800px;
  }

  .letter-spacing {
    letter-spacing: 0.1rem;
  }
</style>