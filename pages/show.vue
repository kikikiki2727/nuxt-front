<template>
  <div class="show-container">
    <MeetBeforeEntering />
    <MeetAfterEntering />
    <div class="after"></div>
  </div>
</template>
<script setup lang="ts">
const show = ref<string>("meet");
</script>

<style lang="scss" scoped></style>
