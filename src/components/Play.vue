<template>
  <div class="play" :class="{ paused: paused }">
    <audio
      :src="
        'https://music.163.com/song/media/outer/url?id=' +
          currentMusic.id +
          '.mp3'
      "
      autoplay
      ref="audio"
    ></audio>

    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__slideInUp"
      leave-active-class="animate__animated animate__slideOutDown"
    >
      <div
        class="play-bar"
        v-show="isShowPlayBar"
        @click="isShowPlayBar = false"
      >
        <div v-if="currentMusic.picUrl">
          <img :src="currentMusic.picUrl" />
        </div>

        <div v-else><img :src="currentMusic.al.picUrl" /></div>

        <h5>
          {{ currentMusic.name }} --
          <!-- <span>{{ playlist[0].ar[0].name }}</span> -->
        </h5>

        <div class="control" @click.stop="togglePlayState">
          <canvas ref="circle" width="50" height="50"></canvas>
          <span class="icon"></span>
        </div>
      </div>
    </transition>

    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div class="play-full" v-if="!isShowPlayBar">
        <div
          class="mask"
          :style="{ backgroundImage: `url('${currentMusic.picUrl}')` }"
        ></div>

        <PlayFullHeader
          @show-play-bar="isShowPlayBar = true"
          :currentMusic="currentMusic"
        />
        <template>
          <PlayFullLyric
            :currentTime="currentTime"
            :currentMusic="currentMusic"
            :audio="this.$refs.audio"
            :newGeChi="newGeChi"
            v-if="isShowLyric"
            @toggle-show-lyric="isShowLyric = !isShowLyric"
          />
          <PlayFullChart
            v-else
            @toggle-show-lyric="isShowLyric = !isShowLyric"
            :currentMusic="currentMusic"
            :paused="paused"
          />
        </template>
        <PlayFullFooter
          :currentMusic="currentMusic"
          v-bind:currentTime="currentTime"
          v-bind:duration="duration"
          @update:currentTime="$refs.audio.currentTime = $event"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import PlayFullHeader from "@/components/PlayFullHeader.vue";
import PlayFullChart from "@/components/PlayFullChart.vue";
import PlayFullLyric from "@/components/PlayFullLyric.vue";
import PlayFullFooter from "@/components/PlayFullFooter.vue";
export default {
  props: ["currentMusic", "currentIndex", "playlist", "newGeChi"],
  components: {
    PlayFullHeader,
    PlayFullChart,
    PlayFullLyric,
    PlayFullFooter
  },
  data: function() {
    return {
      paused: null,
      duration: 0,
      //记录当前播放器播放到哪里
      currentTime: 0,

      isShowPlayBar: true,
      //是否显示歌词:
      isShowLyric: false
    };
  },
  // created() {
  //   console.log("created", this.$refs.usernameInput);
  //   // console.log(this.$refs.usernameInput);
  // },

  // 用箭头函数拿到的this指向vue实例对象就等于指向里面的this.$refs.audio;
  mounted() {
    console.log("mounted", this.$refs.audio);
    // console.log(this.$refs.usernameInput);
    // 简写
    // 		refs-一个对象,持有已注册过ref的所有子组件。

    let audio = this.$refs.audio;
    audio.addEventListener("pause", () => {
      console.log("暂停");
      this.paused = true;
    });
    audio.addEventListener("play", () => {
      console.log("播放");
      this.paused = false;
    });
    // var _this = this
    //拿到歌的长度
    audio.addEventListener("durationchange", () => {
      // console.log("当前歌曲时长", this.duration);
      this.duration = audio.duration;
    });

    audio.addEventListener("timeupdate", () => {
      // console.log("当前播放到", this.currentTime);
      this.currentTime = audio.currentTime;

      // drawCircle参数传输
      this.drawCircle(this.currentTime, this.duration);
    });

    // eneed自动播完
    audio.addEventListener("ended", () => {
      //播放下一曲
      this.playNext();
    });
  },

  // updated() {
  // console.log("update", this.$refs.usernameInput);
  // },

  methods: {
    // 圆形跟着n和total来变
    drawCircle: function(n, total) {
      let canvas = this.$refs.circle;
      // 然后，创建 context 对象：
      // getContext("2d") 对象是内建的 HTML5 对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。
      let ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, 50, 50);
      ctx.beginPath();
      ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
      ctx.arc(25, 25, 20, 0, Math.PI * 2, false); // 绘制圆形
      // stroke() 方法在画布上绘制确切的路径。
      ctx.stroke();
      // closePath() 方法创建从当前点到开始点的路径。
      ctx.closePath();

      // beginPath() 方法开始一条路径，或重置当前的路径。
      ctx.beginPath();
      //路径颜色
      ctx.strokeStyle = "rgba(255, 0, 0, 0.6)";
      // arc() 方法创建弧/曲线（用于创建圆或部分圆）。
      ctx.arc(
        25,
        25,
        19,
        // Math.PI 表示一个圆的周长与直径的比例
        Math.PI * -0.5,
        Math.PI * ((n / total) * 2 - 0.5),
        false
      ); // 绘制

      // stroke() 方法在画布上绘制确切的路径。
      ctx.stroke();
      // closePath() 方法创建从当前点到开始点的路径。
      ctx.closePath();
    },

    togglePlayState: function() {
      let audio = this.$refs.audio;
      if (this.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    },
    //计算上一首歌的方法:
    calculatePre: function() {
      // 根据当前播放模式 随机 单曲循环 顺序 顺序循环
      //定义变量
      let preIndex;
      //判断如果当前的下标比 播放列表的长度-1 还小
      if (this.currentIndex <= 0) {
        preIndex = this.playlist.length - 1;
      } else {
        preIndex = this.currentIndex - 1;
      }
      //返回下一首歌的下标:
      return preIndex;
    },
    //计算下一首歌的方法:
    calculateNext: function() {
      //根据当前模式播放 随机 单曲循环 顺序 顺序循环
      let nextIndex;
      if (this.currentIndex < this.playlist.length - 1) {
        nextIndex = this.currentIndex + 1;
      } else {
        nextIndex = 0;
      }
      return nextIndex;
    },

    playNext: function() {
      console.log("下一曲");
      //定义变量接收调用 calculateNext()方法下一首歌的下标值:
      let index = this.calculateNext();
      //向父组件发出@update:music方法 带两个参数( item,index)---(播放列表中下一首歌的歌曲,一首歌的下标值)
      // 在子组件里用$emit()向父组件触发一个事件，父组件监听这个事件就行了
      this.$emit("update:music", {
        item: this.playlist[index],
        index
      });
    },

    kdNext: function() {
      console.log("上一曲");
      let index = this.calculatePre();
      // 获取当前音乐
      this.$emit("update:music", {
        item: this.playlist[index],
        index
      });
    }
  },

  watch: {
    paused: function(n) {
      this.$emit("update:paused", n);
    }
  }
};
</script>
<style scoped lang="less">
.play {
  &.paused {
    .play-bar {
      img {
        animation-play-state: paused;
      }
      .control {
        span.icon {
          position: relative;
          background: url("../assets/22.png") no-repeat;
          background-size: contain;
          width: 35px;
          height: 35px;
          position: absolute;
          left: 10px;
          top: 6px;
        }
      }
    }
  }
}
.play-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9;
  width: 100%;
  border-top: 1px solid rgb(248, 218, 218);
  background: rgb(253, 251, 251);
  display: flex;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
  img {
    width: 36px;
    height: 36px;
    margin: 7px;
    border-radius: 50%;
    animation: playing 6s linear infinite;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.15);
  }
  h5 {
    flex: 1;
    margin-top: 16px;
  }

  .control {
    position: relative;
    span.icon {
      background: url("../assets/33.png") no-repeat;
      background-size: contain;
      width: 38px;
      height: 38px;
      position: absolute;
      left: 6px;
      top: 6px;
    }
  }
}
.play-full {
  background: linear-gradient(
    to right,
    rgb(56, 56, 56),
    rgb(95, 95, 95),
    rgb(56, 56, 56)
  );

  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  .toplyic {
    margin-top: 200px;
    color: white;
  }

  .mask {
    background: url("http://p1.music.126.net/fwXShM46KdIj3hB8_lJ71g==/109951165545588869.jpg");
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    filter: blur(10px) brightness(0.5);
  }
}

@keyframes playing {
  form {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
