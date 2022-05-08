<script setup>
  const props = defineProps(['image', 'heading'])
</script>

<template>
  <section class="flex flex-col w-full bg-gray-800 md:flex-row mb-5">
    <div class="md:order-first flex flex-col items-center justify-center w-full p-6 sm:p-10 md:p-14 md:w-1/2 lg:p-18 xl:p-24">
      <h2
        class="max-w-lg text-3xl sm:text-4xl leading-tight text-white font-bold md:text-5xl lg:text-6xl xl:text-7xl serif md:relative md:top-5">
        {{ heading }}
      </h2>
    </div>
    <div class="w-full md:w-1/2 order-first">
      <TheImage :asset="image" class="inset-0 object-cover" />
    </div>
  </section>
</template>