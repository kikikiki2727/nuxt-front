<template>
  <div>
    <div v-if="aaplePending">loading...</div>
    {{ aaplePending }}
    {{ sample }}
    <button @click="fetchPosts">一覧</button>
    <button @click="createPost">作成</button>
    {{ apple }}
    <Sample2 orange="orange" />
    {{ posts }}
    {{ post }}
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const plugins = useNuxtApp();

const baseURL =
  process.env.NODE_ENV === "production"
    ? config.public.baseApiUrl
    : config.public.baseApiUrlDev;

const sample = ref<string | void>("sample");

const posts = ref(null);

const post = ref(null);

const {
  data: apple,
  pending: aaplePending,
  error,
  refresh,
} = await useAsyncData("sample", () => $fetch(`${baseURL}/${sample.value}`));
console.log(apple);

// const { data: apple, pending: aaplePending } = await useFetch(
//   `${baseURL}/${sample.value}`
// );
// console.log(apple);

onMounted(async () => {
  await import("@opentok/client");
  const vonage = new Vonage(OT);
  console.log(vonage);
  console.log(plugins.$hello());
  sample.value = await $fetch<string>(`${baseURL}/sample`).catch((error) =>
    console.log(error.data)
  );
});

const fetchPosts = async () => {
  const data = {
    name: "名前2",
    email: "email2@sample.com",
  };
  posts.value = await $fetch(`${baseURL}/post/feed`).catch((error) =>
    console.log(error.data)
  );
  console.log(posts.value[0].title);
};

const createPost = async () => {
  const data = {
    title: "ブログタイトル5",
    authorEmail: "email2@sample.com",
    published: true,
  };
  post.value = await $fetch(`${baseURL}/post`, {
    method: "POST",
    body: data,
  }).catch((error) => console.log(error.data));
  console.log(post.value);
};
</script>

// トップレベルawaitのエラー回避
<script lang="ts">
export {};
</script>
