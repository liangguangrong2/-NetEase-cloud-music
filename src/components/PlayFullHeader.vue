<template>
  <div class="next-b" @click="$emit('show-play-bar')">
    <div class="head_v">
      <div class="list">
        <i class=" iconfont icon icon-fanhui"></i>
      </div>

      <p>
        {{ currentMusic.name }} ---
        <!-- <span class="next_v">{{ currentMusic.song.artists[0].name }}</span> -->
      </p>
    </div>

    <div></div>
  </div>
</template>

<script>
export default {
  props: ["currentMusic"]
};
</script>

<style lang="less">
.next-b {
  font-size: 20px;
  color: white;
  height: 50px;
  // background-color: rgba(112, 107, 107);

  position: relative;
  .head_v {
    width: 100%;
    // background-color: red;
  }
  .list {
    width: 100px;
    // border: 1px solid white;
    margin-left: 10px;
    padding-top: 10px;
    overflow: hidden;
  }
  p {
    position: absolute;
    font-size: 16px;
    bottom: 21px;
    left: 128px;
  }
  .next_v {
    font-size: 10px;
    color: rgb(213, 215, 218);
    text-align: center;
    line-height: 2;
  }
}

.iconfont {
  font-family: "iconfont" !important;
  color: rgb(253, 234, 234);
  font-size: 25px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
