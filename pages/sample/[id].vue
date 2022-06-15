<template>
  <div>
    {{ route }}
    {{ route.params }}
    {{ $route.params }}
    <NuxtLink to="/sample">リンク</NuxtLink>
  </div>
</template>

<script setup lang="ts"></script>
