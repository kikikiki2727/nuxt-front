<template>
  <div class="header">
    <div class="left">
      <NuxtLink to="/" class="nuxtLink">
        <img src="/public/icon/movie.svg" />
        <div class="context">
          <p class="text">Mori</p>
          <p class="text">Meet</p>
        </div>
      </NuxtLink>
    </div>
    <div class="right">
      <div class="date">{{ currentDate }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import format from "date-fns/format";
const dateInstance = new Date();
const dayOfWeekList = ["日", "月", "火", "水", "木", "金", "土"];
const dayOfWeekToday: string = dayOfWeekList[dateInstance.getDay()];
const currentDate = ref<string>(
  format(dateInstance, `HH:mm・M月d日(${dayOfWeekToday})`)
);

onMounted(() => {
  const fiveSeconds = 5000;
  setInterval(() => {
    currentDate.value = format(new Date(), `HH:mm・M月d日(${dayOfWeekToday})`);
    console.log(currentDate.value);
  }, fiveSeconds);
});
</script>

<style lang="scss" scoped>
.header {
  padding: 0 10px;
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > .left > .nuxtLink {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  > .left > .nuxtLink > .context {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  > .left > .nuxtLink > .context > .text {
    font-size: 1.3rem;

    &:first-of-type {
      font-weight: bold;
      font-size: 1.4rem;
    }
  }

  > .right {
    display: flex;
    align-items: center;
  }
}
</style>
