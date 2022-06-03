<template>
  <div>
    {{ sample }}
    <button @click="test2">ボタン</button>
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
      const data = {
        name: "名前2",
        email: "email2@sample.com",
      };
      axios.post(`${baseURL}/user`, data).then((res) => {
        console.log(res.data);
      });
    };

    const test2 = () => {
      const data = {
        title: "ブログタイトル2",
        authorEmail: "email2@sample.com",
        publishd: true,
      };
      axios.post(`${baseURL}/post`, data).then((res) => {
        console.log(res.data);
      });
    };

    return {
      sample,
      test,
      test2,
    };
  },
});
</script>
