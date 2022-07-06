<template>
  <div v-if="isDisplay" class="selection-popup">
    <div class="popup">
      <div class="section" @click="createMeetingNextTime">
        <img class="icon -link" src="/public/icon/link.svg" />
        <p class="text">次回以降の会議を作成</p>
      </div>
      <div class="section" @click="createMeetingNow">
        <img class="icon" src="/public/icon/plus.svg" />
        <p class="text">会議を今すぐ開始</p>
      </div>
      <div class="section">
        <img class="icon" src="/public/icon/calendar.svg" />
        <p class="text">Moriカレンダーでスケジュールを設定</p>
      </div>
    </div>
    <div class="overlay" @click="toggleDisplay"></div>
  </div>
</template>
<script setup lang="ts">
// export default defineComponent({
//   setup() {
// const config = useRuntimeConfig();
// const baseURL =
//   process.env.NODE_ENV === "production"
//     ? config.public.baseApiUrl
//     : config.public.baseApiUrlDev;
const router = useRouter();

const isDisplay = ref<boolean>(false);
const toggleDisplay = (): void => {
  isDisplay.value = !isDisplay.value;
};

type CampaignObj = {
  id: number;
  sessionId: string;
};

// const campaign = ref<CampaignObj>(null);

const createMeetingNow = async () => {
  const campaign = await $fetch<CampaignObj>(`http://localhost:4000/campaign`, {
    method: "POST",
  }).catch((error) => {
    console.log(error.data);
    throw Error;
  });
  console.log(campaign);
  router.push(`/show?id=${campaign.id}&enter=before`);
  isDisplay.value = false;
};

const createMeetingNextTime = () => {
  isDisplay.value = false;
};

defineExpose({
  isDisplay,
});

//     return {
//       isDisplay,
//       toggleDisplay,
//       createMeetingNow,
//       createMeetingNextTime,
//     };
//   },
// });
</script>

<style lang="scss" scoped>
.selection-popup {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;

  > .popup {
    box-shadow: 0 5px 8px gray;
    border-radius: 5px;
    position: absolute;
    top: 43%;
    left: 6%;
    z-index: 3;
    background-color: white;
  }

  > .popup > .section {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 0 20px;

    &:hover {
      background-color: rgba(155, 155, 155, 0.3);
      cursor: pointer;
    }
  }

  > .popup > .section > .icon {
    &.-link {
      transform: rotate(45deg);
    }
  }

  .overlay {
    height: 100%;
    width: 100%;
    z-index: 2;
  }
}
</style>
