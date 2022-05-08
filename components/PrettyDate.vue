<script setup>
    const props = defineProps(['dateStr'])
</script>
<template>
    <span v-if="!isNaN(new Date(dateStr))">{{ new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }}</span>
</template>