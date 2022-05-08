<script setup>
  const props = defineProps(['asset'])
</script>
<template>
  <img v-if="asset" :src="'https://david-graeber.up.railway.app/assets/' + asset">
</template>