<template>
  <div>
    {{ sample }}
    <button @click="test">ボタン</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import Vonage from "~~/service/vonage";

export default defineComponent({
  setup() {
    const config = useRuntimeConfig();
    const plugins = useNuxtApp();

    const baseURL =
      process.env.NODE_ENV === "production"
        ? config.public.baseApiUrl
        : config.public.baseApiUrlDev;

    const sample = ref<string>("apple");

    onMounted(async () => {
      await import("@opentok/client");
      const vonage = new Vonage(OT);
      console.log(vonage);
      console.log(plugins.$hello());
      axios.get(`${baseURL}/sample`).then((res) => {
        sample.value = res.data;
      });
    });

    const test = () => {
      console.log("OT", OT);
    };

    return {
      sample,
      test,
    };
  },
});
</script>
