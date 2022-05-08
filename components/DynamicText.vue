<script setup>
  const props = defineProps(['content', 'theme'])
</script>

<template>
  <div>
    <div class="dt" :class="theme" v-if="content" v-html="content"></div>
    <div class="dt" v-else>
      <slot></slot>
    </div>
  </div>
</template>

<!-- non-Tailwind css -->
<style>
  /* fonts */
  .serif {
    font-family: 'Playfair Display', serif;
  }
  .sans-serif {
    font-family: 'Poppins', sans-serif;
  }

  /* default */
  .dt {
    @apply text-gray-600 text-lg sm:text-xl sans-serif;
    line-height: 1.5;
  }

  .dt h1 {
    @apply serif mt-11 sm:mt-14 md:mt-16 font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900;
  }

  .dt h2 {
    @apply serif mt-9 sm:mt-12 md:mt-14 font-bold text-2xl sm:text-3xl md:text-4xl text-gray-900;
  }

  .dt h3 {
    @apply serif mt-9 sm:mt-12 md:mt-14 font-bold text-xl sm:text-2xl md:text-3xl text-gray-900;
  }

  .dt a {
    @apply text-blue-600;
  }

  .dt img {
    @apply rounded w-full;
  }

  .dt img.left-float {
    @apply sm:mr-8 xl:mr-8 w-48 xl:w-40 lg:w-48 sm:w-40 max-w-full lg:float-none xl:float-left sm:float-left;
  }

  .dt hr {
    @apply mt-8 sm:mt-11 mb-8 sm:mb-11;
  }

  .dt div {
    @apply mt-10 sm:mt-12;
  }

  .dt input,
  .dt textarea {
    @apply mt-3 sm:mt-4;
  }

  .dt ul {
    list-style-position: outside;
    list-style-type: square;
    padding-left: 1rem;
    margin-left: 1rem;
    margin-top: 1rem;
  }

  .dt ul ul {
    list-style-type: circle;
  }

  .dt ol {
    list-style-position: outside;
    list-style-type: auto;
    padding-left: 1rem;
    margin-left: 1rem;
    margin-top: 1rem;
  }

  .dt li {
    @apply mb-3;
  }

  .dt blockquote {
    @apply rounded border-l-8 border-gray-300 bg-gray-100 px-3 py-4;
  }

  .dt * {
    @apply mb-6 sm:mb-7 md:mb-8;
  }

  .dt> :first-child,
  .dt blockquote> :first-child {
    margin-top: 0 !important;
  }

  .dt> :last-child,
  .dt blockquote> :last-child {
    margin-bottom: 0 !important;
  }

  .dt .dg-m-0 {
    margin: 0;
  }

  /* sans */
  .dt.theme-sans {
    @apply text-gray-400;
  }

  .dt.theme-sans h1,
  .dt.theme-sans h2,
  .dt.theme-sans h3 {
    @apply sans-serif text-gray-700;
  }

  .dt.theme-sans h1 {
    @apply text-3xl;
  }

  .dt.theme-sans h2 {
    @apply text-2xl;
  }

  .dt.theme-sans h3 {
    @apply text-xl;
  }
</style>