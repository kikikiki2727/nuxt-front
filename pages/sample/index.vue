<template>
  <div>
    {{ sampleIndex }}
    <NuxtLink to="/sample/1">リンク</NuxtLink>
    {{ composablesSample }}
    {{ composablesClass }}
    {{ composablesFunc }}
    <Sample2 orange="orange" />
  </div>
</template>

<script setup lang="ts">
const sampleIndex = ref("sample");
const composablesSample = returnSample();
const composablesClass = new useSampleClass();
const composablesFunc = composablesClass.classFunc();
</script>
