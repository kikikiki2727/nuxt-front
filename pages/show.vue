<template>
  <div class="show-container">
    <MeetAfterEntering v-show="isEntered" />
    <MeetBeforeEntering v-show="!isEntered" />
    {{ isEntered }}
    <button @click="sessionConnect">入室</button>
    <div id="videos"></div>
  </div>
</template>
<script setup lang="ts">
// import { Vonage } from "~~/composables/vonage";

type TypeGenerateToken = {
  token: string;
  apiKey: string;
};

const route = useRoute();
const isEntered = ref<boolean>(false);

const campaign = ref<CampaignObj>(null);
const sessionToken = ref<string>("");
const vonageApiKey = ref<string>("");
// const vonageInstance = ref<any>(null);
let vonageInstance = null; // 一旦let

onMounted(async () => {
  if (route.query.enter === "after") isEntered.value = true;
  campaign.value = await $fetch<CampaignObj>(
    `http://localhost:4000/campaign/${route.query.id}`
  ).catch((error) => {
    console.log(error);
    throw Error;
  });
  await $fetch<TypeGenerateToken>(
    "http://localhost:4000/vonage/generate-token",
    {
      method: "POST",
      body: {
        sessionId: campaign.value.sessionId,
        role: "moderator",
      },
    }
  )
    .then((res) => {
      sessionToken.value = res.token;
      vonageApiKey.value = res.apiKey;
    })
    .catch((error) => {
      console.log(error);
      throw Error;
    });

  const OT = await import("@opentok/client");
  vonageInstance = new Vonage(OT, vonageApiKey.value, campaign.value.sessionId);
  vonageInstance.initSession();
  vonageInstance.initPublisher();
});

const sessionConnect = async () => {
  isEntered.value = await vonageInstance.sessionConnect(sessionToken.value);
};
</script>

<style lang="scss" scoped></style>
