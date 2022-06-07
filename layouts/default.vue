<template>
  <div class="layaut">
    <SharedTheHeader />
    <div class="contents">
      <slot />
    </div>
    <SharedTheFooter />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.layaut {
  > .contents {
    height: calc(100% - 100px);
  }
}

// デフォルトスタイル打ち消し
button {
  padding: 0;
  background-color: transparent;
  border: none;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
}
</style>
