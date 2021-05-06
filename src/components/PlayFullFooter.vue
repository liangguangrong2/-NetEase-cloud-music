<template>
  <div class="play-full-footer" :class="{ paused: paused }">
    <!-- <p class="lyric" @click="getVitem(currentMusic.id)">
      <span> <i class=" iconfont icon  icon-xinxi"></i></span>
    </p> -->
    <div class="progress">
      <span
        class="full"
        :style="{ width: (currentTime / duration) * 100 + '%' }"
      >
      </span>
      <input
        type="range"
        min="0"
        :max="duration"
        step="1"
        @input="getValue"
        :value="currentTime"
      />
    </div>

    <div class="box">
      <div class="item" @click="kellFer()">
        <i class=" iconfont icon  icon-047caozuo_shangyishou"></i>
      </div>

      <div class="control" @click.stop="childMethod">
        <span class="icon"></span>
      </div>

      <div class="noot" @click="prueFen()">
        <i class=" iconfont icon  icon-49xiayishou"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["currentTime", "duration", "currentMusic"],

  data: function() {
    return {
      paused: null
    };
  },

  methods: {
    getVitem: function(id) {
      this.$router.push({
        path: "/mentlist",
        query: {
          id
        }
      });
      console.log(113213211);
    },
    getValue: function(e) {
      console.log(e.target.value);
      //触发currentTime
      this.$emit("update:currentTime", e.target.value);
    },
    childMethod() {
      this.$parent.togglePlayState();
    },

    prueFen() {
      this.$parent.playNext();
    },

    kellFer() {
      this.$parent.kdNext();
    }
  },
  watch: {}
};
</script>
<style scoped lang="less">
.play-full-footer {
  // height: 2000px;

  px .toplyic {
    margin-top: 300px;
    color: white;
  }
  &.paused {
    .control {
      width: 100px;
      height: 100px;
      position: relative;
      span.icon {
        &::before {
          background: url("../assets/1.png") no-repeat;
          background-size: contain;
          width: 50px;
          height: 50px;
          position: absolute;
          left: 160px;
          top: 30px;
          content: "";
        }
      }
    }
  }
}

.play-full-footer {
  .lyric {
    color: white;
    display: flex;
    margin-left: 346px;
    margin-top: 20px;
    span {
      flex: 1;
    }
  }
  .box {
    width: 100%;

    margin-top: 100px;
    position: absolute;
    .control {
      width: 100px;
      height: 100px;
      margin-left: 138px;

      span.icon {
        position: relative;
        &::before {
          background: url("../assets/2.png") no-repeat;
          background-size: contain;
          width: 50px;
          height: 50px;
          position: absolute;
          left: 44px;
          top: -4;
          content: "";
        }
      }
    }
    .item {
      width: 20px;
      margin-left: 62px;

      position: absolute;
      top: 9px;
    }
    .noot {
      width: 20px;
      margin-right: 80px;

      position: absolute;
      right: -12px;
      top: 8px;
    }
  }
}

.progress {
  width: 70%;
  height: 4px;
  background: linear-gradient(to right, rgb(252, 254, 255), rgb(247, 241, 241));
  position: relative;
  top: 69px;
  left: 0;
  margin: 0 auto;
  border-radius: 3px;
  input {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    opacity: 0;
  }
  .full {
    color: white;
  }
  span {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background: rgb(199, 54, 54);
    border-radius: 3px;
  }
}
</style>
