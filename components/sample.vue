<template>
  <div>
    {{ sample }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";

export default defineComponent({
  setup() {
    const config = useRuntimeConfig();

    const baseURL =
      process.env.NODE_ENV === "production"
        ? config.public.baseApiUrl
        : config.public.baseApiUrlDev;

    const sample = ref<string>("apple");

    onMounted(() => {
      console.log(process.env.NODE_ENV);
      axios.get(`${baseURL}/sample`).then((res) => {
        sample.value = res.data;
      });
    });

    return {
      sample,
    };
  },
});
</script>
