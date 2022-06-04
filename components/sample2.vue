<template>
  <div>
    {{ sample2 }}
    {{ orange }}
  </div>
</template>
<script setup lang="ts">
const sample2 = ref<string>("sample2");

type Props = {
  orange: string;
  cherry?: string;
};

const props = defineProps<Props>();
</script>
