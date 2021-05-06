<template>
  <div class="playfullLyric" @click="$emit('toggle-show-lyric')">
    <div class="playfullLyric-text">
      <!-- ref 被用来给元素或子组件注册引用信息，
        引用信息将会注册在父组件的 $refs 对象上，
       如果是在普通的DOM元素上使用，引用指向的就是 DOM 元素，
       如果是在子组件上，引用就指向组件的实例。 -->
      <ul
        class="lyric"
        ref="lyric"
        @touchstart="touchstart"
        @touchmove="touchmove"
        @touchend="touchend"
      >
        <li v-for="(item, index) in str" :key="index">
          {{ item.text || "---" }}
        </li>
      </ul>

      <!-- <div>{{str}}</div> -->
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      str: null,
      arrLyric: [],
      scrollY: 0,
      isShowLyric: true,
      time: []
    };
  },
  props: ["newGeChi", "audio", "currentTime"],
  created() {
    // console.log("lyric--created"+this.newGeChi')
  },
  // 挂载完毕
  // 挂载： 把VUE实例生成的虚拟的DOM转成真实的DOM，放在了页面中，这就是挂载；
  // 编译出的DOM把原有的DOM替换完毕；
  // 可以获取最终的DOM元素
  mounted() {
    this.str = this.newGeChi;

    // console.log("lyric--mounted" + this.newGeChi);
  },
  updated() {
    //获取ul
    // $refs 是一个对象，持有已注册过 ref 的所有的子组件。
    let Lyric = this.$refs.lyric;
    console.log(Lyric);
    if (Lyric) {
      // console.log("lyric-mounted"+ Lyric)
      this.str = this.newGeChi;
      // console.log(this.str);
      var _newArr = [...this.str];

      let that = this;
      this.audio.ontimeupdate = function() {
        if (!that.touching) {
          var currentTime = this.currentTime;
          //数组.findIndex--->>>遍历数组,
          //返回传入一个测试条件（函数）符合条件的数组第一个元素位置(下标)。
          var i = _newArr.findIndex(element => {
            //条件:元素的时间比当前的时间大
            return element.time > currentTime;
          });

          //操作DOM元素

          Lyric.style.marginTop = -30 * (i - 1) + 250 + "px";
          var lis = Lyric.querySelectorAll("li");
          // console.log(lis);
          for (let k = 0; k < lis.length; k++) {
            lis[k].style.color = "#c9bfb2";
          }

          //判断lis[i-1]是否存在--防止style报错:
          if (lis[i - 1]) {
            lis[i - 1].style.color = "white";
          }
        }
      };
      console.log(this.audio);
    }

    // console.log("lyric--updated"+this.str)
  },
  watch: {
    newGeChi: function(n) {
      // console.log(n,"33333");
      this.str = n;
      // console.log("lyric----watch"+  this.str)
    },
    //  currentTime:function(n){
    //    //当前的播放时间
    //      console.log(n,"currentTime");

    //  }

    scrollY: function(n) {
      let Lyric = this.$refs.lyric;

      var currentTime = this.currentTime;
      //数组.findIndex--->>>遍历数组,
      //返回传入一个测试条件（函数）符合条件的数组第一个元素位置(下标)。
      this.i = this.str.findIndex(element => {
        //条件:元素的时间比当前的时间大
        return element.time > currentTime;
      });
      // console.log(Lyric, currentTime, this.i);

      //操作DOM元素

      Lyric.style.marginTop = -30 * (this.i - 1 + n) + 250 + "px";
      var lis = Lyric.querySelectorAll("li");
      for (let k = 0; k < lis.length; k++) {
        lis[k].style.color = "#c9bfb2";
      }

      //判断lis[i-1]是否存在--防止style报错:
      if (lis[this.i - 1 + n]) {
        lis[this.i - 1 + n].style.color = " #54f379";
      }
    }
  },
  //创建方法
  methods: {
    // 触摸开始
    touchstart: function(e) {
      this.touching = true;
      // console.log("touchstart", e.touches[0].clientY);
      this.y = e.touches[0].clientY;
    },
    // 触摸移动
    touchmove: function(e) {
      // console.log("touchmove", e.touches[0].clientY);
      // console.log(Math.floor((this.y - e.touches[0].clientY) / 30));
      this.scrollY = Math.floor((this.y - e.touches[0].clientY) / 30);
      console.log(this.scrollY);
    },
    // 触摸结束
    touchend: function() {
      this.touching = false;
      let ct = this.newGeChi[this.i - 1 + this.scrollY].time;
      this.audio.currentTime = ct;
    }
  }
};
</script>

<style lang="less">
.playfullLyric {
  // border: 1px solid white;
  width: 100%;
  height: 60vh;
  margin: 0 auto;
  // background-color:skyblue;
  color: #54f379;

  text-align: center;
  .playfullLyric-text {
    height: 100%;
    width: 90%;
    margin: -23px auto;
    overflow: hidden;

    // background-color:yellow;
    .lyric {
      font-weight: 700;
      line-height: 30px;
      margin-top: 250px;
      font-size: 15px;

      // li{
      //   // background-color: pink;
      // }
    }
  }
}
</style>
