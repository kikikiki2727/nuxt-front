<template>
  <div class="header">
    <div class="left">
      <NuxtLink to="/" class="nuxtLink">
        <svg
          version="1.1"
          id="_x32_"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="30px"
          height="30px"
          viewBox="0 0 512 512"
          style="width: 32px; height: 32px; opacity: 1"
          xml:space="preserve"
        >
          <g>
            <path
              class="st0"
              d="M284.719,129.453H25.344c-14,0-25.344,11.328-25.344,25.328v202.422c0,14,11.344,25.344,25.344,25.344h259.375
            c14,0,25.344-11.344,25.344-25.344V154.781C310.063,140.781,298.719,129.453,284.719,129.453z"
              style="fill: rgb(58, 171, 210)"
            ></path>
            <path
              class="st0"
              d="M502.313,174.547c-6.125-4.797-14.094-6.516-21.656-4.688L357,199.984
            c-11.375,2.766-19.359,12.938-19.359,24.641v60c0,11.688,7.984,21.859,19.359,24.625l123.656,30.141
            c7.563,1.813,15.531,0.094,21.656-4.703c6.109-4.813,9.688-12.156,9.688-19.922V194.484
            C512,186.703,508.422,179.359,502.313,174.547z"
              style="fill: rgb(58, 171, 210)"
            ></path>
          </g>
        </svg>
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
