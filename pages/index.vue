<template>
  <div class="home-containar">
    <div class="left">
      <div class="introduction">
        <div class="top">
          <p>プレミアムなビデオ会議。今なら誰でも無料でご利用いただけます。</p>
        </div>
        <div class="bottom">
          <p>
            Moriでは、安全性の高いビジネス会議サービス「Mori
            Meet」を刷新して、どなたでも無料でご利用いただけるようにしました。
          </p>
        </div>
      </div>
      <div class="main">
        <button class="button">
          <img src="/public/icon/camera.svg" />
          <p class="text">新しい会議を作成</p>
        </button>
        <div class="meetCode">
          <img src="/public/icon/keyboard.svg" />
          <input class="input" placeholder="会議コードまたはリンクを入力" />
        </div>
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
  display: flex;
  justify-content: space-between;

  > .left {
    width: 50%;
  }

  > .left > .introduction {
    width: 70%;
    margin: 0 auto;
  }

  > .left > .introduction > .top {
    font-size: 2rem;
  }

  > .left > .main {
    width: 70%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }

  > .left > .main > .button {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: rgb(26, 120, 230);
    gap: 10px;
    height: 50px;
    width: 200px;
    padding: 0 10px;
    border-radius: 5px;

    &:hover {
      background-color: rgba(26, 120, 230, 0.8);
    }
  }

  > .left > .main > .button > .text {
    font-size: 1rem;
  }

  > .left > .main > .meetCode {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: 50px;
    width: calc(100% - 210px);
    border: 1px solid rgba(0, 0, 0, 0.16);
    padding: 0 10px;
    border-radius: 5px;
    margin-right: 20px;
  }

  > .left > .main > .meetCode > .input {
    border: none;
    height: 80%;
    width: 80%;
    font-size: 1rem;
  }
}
</style>
