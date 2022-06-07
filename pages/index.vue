<template>
  <div class="home-containar">
    <div class="left">
      <div class="introduction">
        <div class="top">
          <p>プレミアムなビデオ会議。今なら誰でも無料でご利用いただけます。</p>
        </div>
        <div class="bottom">
          <p>
            Googleでは、安全性の高いビジネス会議サービス「Google
            Meet」を刷新して、どなたでも無料でご利用いただけるようにしました。
          </p>
        </div>
      </div>
      <div class="main">
        <button class="button">
          <img src="/public/icon/camera.svg" />
          <p>新しい会議を作成</p>
        </button>
        <div class="input"></div>
      </div>
      <div class="bottom"></div>
    </div>
    <div class="right">
      <div class="description"></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.home-containar {
  > .left > .main > .button {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: rgb(26, 120, 230);
    gap: 10px;
    padding: 0 10px;
    border-radius: 5px;

    &:hover {
      background-color: rgba(26, 120, 230, 0.8);
    }
  }
}
</style>
