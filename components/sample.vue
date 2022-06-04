<template>
  <div>
    <div v-if="aaplePending">loading...</div>
    {{ aaplePending }}
    {{ sample }}
    <button @click="test2">ボタン</button>
    {{ apple }}
    <Sample2 orange="orange" />
  </div>
</template>

<script setup lang="ts">
import axios from "axios";

const config = useRuntimeConfig();
const plugins = useNuxtApp();
const route = useRoute();

const baseURL =
  process.env.NODE_ENV === "production"
    ? config.public.baseApiUrl
    : config.public.baseApiUrlDev;

const sample = ref<string>("sample");

// const {
//   data: apple,
//   pending: aaplePending,
//   error,
//   refresh,
// } = await useAsyncData("sample", () =>
//   $fetch(`${baseURL}/${sample.value}`)
// );
// console.log(apple);

const { data: apple, pending: aaplePending } = await useFetch(
  `${baseURL}/${sample.value}`
);
console.log(apple);

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
</script>
