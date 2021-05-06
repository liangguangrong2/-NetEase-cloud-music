<template>
  <!-- 往外传 -->
  <div class="next_e">
    <li
      class="song-item"
      @click="$emit('update:music', { item, index }), $emit('update:playlist')"
    >
      <!-- <span class="ag"> {{ item.cd }}</span> -->
      <span class="nav">{{ index + 1 }}</span>
      <div class="info">
        <p class="next">
          {{ item.name }}
        </p>

        <p>
          <span v-for="(artist, index) in info" :key="index">
            <template v-if="index"> / </template>{{ artist.name }}
          </span>
        </p>
      </div>
      <!-- currentMusic一直往下传 -->
      <div class="icon">
        <span
          class="playing"
          :class="{ paused: paused }"
          v-if="currentMusic && currentMusic.id === item.id"
        >
          <i></i>
          <i></i>
          <i></i>
        </span>
        <span v-else><i class=" iconfont icon icon-lianhe11"></i> </span>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  // 父级接收
  props: ["item", "index", "currentMusic", "paused"],
  computed: {
    info() {
      return this.item.ar || this.item.song.artists;
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="less">
.next_e {
  // width: 100%;
  // border: 1px solid;
  position: relative;
  h6 {
    color: #999;
  }
  li.song-item {
    display: flex;

    .ag img {
      width: 50px;
      // margin-left: 10px;
      margin-top: 20px;
    }
    .nav {
      width: 30px;
      height: 20px;
      // border: 1px solid;
      display: inline-block;
      font-size: 17px;
      color: #999;
      margin-top: 24px;
      // margin-left: 10px;
      text-align: center;
    }
    .info {
      flex: 1;
      border-bottom: 1px solid rgb(248, 242, 242);
      margin-top: 17px;
      margin-left: 10px;

      .next {
        font-size: 17px;
        color: rgb(12, 12, 12);
        // margin-right: 10px;
      }
      span {
        font-size: 13px;
        color: rgb(107, 151, 130);
      }
    }
    .icon {
      // margin-top: 20px;
      top: 10px;
      // margin-left: 40px;
      position: absolute;
      left: 188px;
      .playing {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-left: 184px;
        i {
          width: 6px;
          height: 30px;
          background: rgb(236, 30, 30);
          // display: inline-block;
          transform-origin: center bottom;
          margin-left: 3px;
          animation: playing 0.6s linear -0.2s infinite alternate-reverse;

          &:first-of-type {
            animation-delay: 0s;
          }
          &:last-of-type {
            animation-delay: -0.4s;
          }
        }
        &.paused {
          i {
            animation-play-state: paused;
          }
        }
      }
      .iconfont {
        font-family: "iconfont" !important;
        font-size: 24px;
        font-style: normal;
        color: rgb(190, 178, 178);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    }
  }

  @keyframes playing {
    from {
      // height: 50px;
      transform: scaleY(1);
    }
    to {
      // height: 10px;
      transform: scaleY(0.2);
    }
  }
}
</style>
