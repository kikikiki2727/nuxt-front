<template>
  <div class="show-container">
    <MeetAfterEntering v-show="isEntered" />
    <MeetBeforeEntering v-show="!isEntered" />
    {{ isEntered }}

    <button v-if="!isEntered" @click="sessionConnect">入室</button>
    <button v-else @click="sessionDisconnect">退出</button>

    <button v-if="isActiveAudio" @click="toggleAudio">
      <img src="/public/icon/mic_on.svg" style="width: 20px" />
    </button>
    <button v-else @click="toggleAudio">
      <img src="/public/icon/mic_off.svg" style="width: 20px" />
    </button>
    <button v-if="isActiveVideo" @click="toggleVideo">
      <img src="/public/icon/camera_on.svg" style="width: 20px" />
    </button>
    <button v-else @click="toggleVideo">
      <img src="/public/icon/camera_off.svg" style="width: 25px" />
    </button>

    <button v-if="isEntered" @click="shareScreen">
      <img src="/public/icon/screen_sharing.svg" style="width: 20px" />
    </button>

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
const isActiveAudio = ref<boolean>(true);
const isActiveVideo = ref<boolean>(true);

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

const sessionDisconnect = () => {
  isEntered.value = vonageInstance.sessionDisconnect();
};

const toggleAudio = () => {
  vonageInstance.publisherObj.publishAudio(!isActiveAudio.value);
  isActiveAudio.value = !isActiveAudio.value;
};

const toggleVideo = () => {
  vonageInstance.publisherObj.publishVideo(!isActiveVideo.value);
  isActiveVideo.value = !isActiveVideo.value;
};

const shareScreen = () => {
  vonageInstance.shareScreen();
};
</script>

<style lang="scss" scoped></style>
