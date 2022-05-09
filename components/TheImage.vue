<script setup>
  const props = defineProps(['asset'])
</script>
<template>
  <img v-if="asset" :src="$directus + '/assets/' + asset">
</template>