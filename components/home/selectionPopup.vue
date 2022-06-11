<template>
  <div v-if="isDisplay" class="selection-popup">
    <div class="section">
      <img class="icon -link" src="/public/icon/link.svg" />
      <p class="text">次回以降の会議を作成</p>
    </div>
    <div class="section">
      <img class="icon" src="/public/icon/plus.svg" />
      <p class="text">会議を今すぐ開始</p>
    </div>
    <div class="section">
      <img class="icon" src="/public/icon/calendar.svg" />
      <p class="text">Moriカレンダーでスケジュールを設定</p>
    </div>
  </div>
  <div v-if="isDisplay" class="overlay" @click.self="toggleDisplay"></div>
</template>
<script lang="ts">
export default defineComponent({
  setup() {
    const isDisplay = ref<boolean>(false);

    const toggleDisplay = (): void => {
      isDisplay.value = !isDisplay.value;
    };

    // defineExpose({
    //   isDisplay,
    // });

    return {
      isDisplay,
      toggleDisplay,
    };
  },
});
</script>

<style lang="scss" scoped>
.selection-popup {
  box-shadow: 0 5px 8px gray;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 8%;
  z-index: 3;
  background-color: white;

  > .section {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 0 20px;

    &:hover {
      background-color: rgba(155, 155, 155, 0.3);
      cursor: pointer;
    }
  }

  > .section > .icon {
    &.-link {
      transform: rotate(45deg);
    }
  }
}

.overlay {
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 2;
}
</style>
