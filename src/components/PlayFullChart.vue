<template>
  <div
    class="pev"
    @click="$emit('toggle-show-lyric')"
    :class="{ paused: paused }"
  >
    <!-- <h4>{{ currentMusic.name }}</h4> -->

    <div class="foor" v-if="currentMusic.picUrl">
      <img :src="currentMusic.picUrl" />
    </div>

    <div class="foor" v-else><img :src="currentMusic.al.picUrl" />11</div>
  </div>
</template>

<script>
export default {
  props: ["currentMusic", "paused"],
  data: function() {
    return {
      isShowLyric: true
    };
  }
};
</script>

<style scoped lang="less">
.pev.paused {
  .foor {
    // margin: 0 auto;
    img {
      animation-play-state: paused;
    }
  }
}

.pev {
  height: 400px;
  // border: 1px solid white;
  overflow: hidden;
  margin-top: 20px;
  h4 {
    color: white;
    margin-left: 10px;
    font-weight: 500;
  }

  .foor {
    width: 260px;
    height: 260px;
    border-radius: 50%;

    margin-left: 76px;
    margin-top: 80px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      animation: moveImg 8s linear infinite;
    }
  }
}
@keyframes moveImg {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
