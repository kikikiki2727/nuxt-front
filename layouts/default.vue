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
    height: calc(100% - 70px); // 70px:ヘッダーの高さ
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

input {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: transparent;
  background-image: none;
  border: 1px solid rgba(0, 0, 0, 0.16);
  border-radius: 0;
  color: inherit;
  font-family: inherit;
  font-size: 1em;
  padding: 0;
  margin: 0;

  &:focus {
    outline: none;
  }
}

a {
  text-decoration: none;
  color: #000000;

  &:active {
    color: #000000;
  }

  &:focus {
    outline: none;
  }
}
</style>
