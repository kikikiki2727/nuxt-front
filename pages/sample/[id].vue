<template>
  <div>
    {{ routes }}
    {{ routes.params }}
    {{ $route.params }}
    <NuxtLink to="/sample">リンク</NuxtLink>
  </div>
</template>

<script setup lang="ts">
const routes = useRoute();
</script>
