<!--get data from Directus -->
<script setup>
  const { blog, articles } = await useNuxtApp().$api(['blog', 'articles'])
  useNuxtApp().$scrollTop()
</script>

<!-- page -->
<template>
  <div>

    <Head>
      <Title>{{ blog.title }} - David C. Graeber</Title>
    </Head>

    <!-- top header -->
    <PageTop :heading="blog.title" :image="blog.banner"></PageTop>

    <!-- articles -->
    <section class="w-full bg-white my-10 sm:my-14 md:my-18 lg:my-24 xl:my-30">
      <div v-for="article of articles" class="max-w-3xl mx-auto serif">
        <div class="pb-10 md:mt-10 lg:mt-14 border-b md:px-8 md:pb-12 lg:pb-16 border-gray-150">
          <NuxtLink :to="'/blog/' + article.id">
            <span class="block mb-8 sm:mb-9 md:mb-10">
              <TheImage :asset="article.featured_image" class="object-cover object-center w-full md:rounded h-72" />
            </span>
            <div class="w-full px-6 md:px-0">
              <h2 class="mt-4 mb-5 text-xl font-bold md:text-2xl lg:text-3xl">
                {{ article.title }}
              </h2>
              <p class="mt-5 mb-6 text-xs text-gray-500 md:text-sm sans-serif">
                <PrettyDate :dateStr="article.custom_publish_date || article.date_created" class="uppercase"></PrettyDate>
              </p>
              <p class="text-base text-gray-600 lg:text-lg sans-serif">
                <span>{{ article.description }}</span>
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>