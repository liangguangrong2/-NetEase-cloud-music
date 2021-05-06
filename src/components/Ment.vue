<template>
  <div @click="Top">
    <van-sticky>
      <van-nav-bar
        title="歌手个人歌曲"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight()"
      >
        <template #right>
          <van-icon name="search" size="18" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="topheader">
      <p class="thing"><img :src="jay.picUrl" alt="" /></p>
      <div class="title">{{ jay.name }}</div>
    </div>

    <div class="topheader" v-for="(noot, index) in jay" :key="index">
      <!-- {{ jay.briefDesc }} -->
    </div>

    <dl class="musiclist">
      <dt>
        <span class="next"> <i class=" iconfont icon icon-bofang9"></i></span>
        <span class="item_vv">播放全部 (共{{ retse.length }}首)</span>
      </dt>

      <!-- $emit 返回一个布尔值，取决于父链上的是否存在该事件的监听器以及事件处理程序返回的值 -->
      <dd
        v-for="(item, index) in retse"
        :key="index"
        @click="
          $emit('update:music', { item, index }), $emit('update:playlist')
        "
      >
        <h1>{{ index + 1 }}</h1>
        <div class="info">
          <h2>{{ item.name }}</h2>

          <h3
            style="width: 300px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
          >
            <span v-for="(key, index) in item.ar" :key="index"
              >{{ key.name }} &nbsp;&nbsp;</span
            >
          </h3>
        </div>
      </dd>
    </dl>
  </div>
</template>

<script>
// import { Toast } from "vant";
export default {
  // 父级接收
  props: ["item", "index", "paused"],
  data() {
    return {
      jay: [],
      retse: []
    };
  },
  methods: {
    //点击顶部
    Top() {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      // 实现滚动效果
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 10);
    },
    //导航栏点击
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push({
        path: "/serachlist",
        query: {}
      });
    },
    getoYou() {
      this.axios({
        method: "get",
        url: "/artists",
        params: {
          id: this.$route.query.id
        }
      }).then(res => {
        //console.log("details=>", res);
        this.jay = res.data.artist;
        //console.log(this.details[0].ar[0].name);
        console.log(this.jay.briefDesc);

        this.retse = res.data.hotSongs;
        console.log(this.retse);
      });
    }
  },
  created() {
    console.log(this.$route.query.id);
    this.getoYou();
  }
};
</script>

<style lang="less">
.musiclist {
  border-radius: 12px;
  background-color: #fff;
  position: relative;
  top: -12px;
  min-height: 200px;
  dt {
    margin-top: 20px;
    // margin-left: 50px;
    font-weight: 600;
    // border: 1px solid black;
    .next {
      margin-left: 26px;
    }
    .item_vv {
      margin-left: 24px;
    }
  }
  dd {
    height: 66px;
    border-bottom: 1px solid #e2e2e2;
    display: flex;
    h1 {
      flex: 0 0 78px;
      line-height: 71px;
      text-align: center;
      font-size: 17px;
      color: #707271;
      font-weight: normal;
      // margin-top: 24px;
    }
    .info {
      flex: 1;
      h2 {
        font-size: 11px;
        color: #3a3c3c;
        margin-top: 18px;
        font-weight: normal;
      }
      h3 {
        font-size: 20px;
        color: #777978;
        font-weight: normal;
      }
      span {
        font-size: 13px;
      }
    }
  }
  .iconfont {
    font-family: "iconfont" !important;
    font-size: 24px;
    font-style: normal;
    color: rgb(214, 72, 72);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
.topheader {
  width: 100%;
  //   height: 463px;
  position: relative;
  .iconitem {
    position: absolute;
    top: 10px;
    left: 5px;
    color: white;
  }
  .thing {
    width: 100%;
    // height: 463px;
    img {
      width: 100%;
    }
    // background-color: aqua;
  }
  .title {
    position: absolute;
    left: 25px;
    bottom: 10px;
    font-size: 22px;
    // font-weight: bold;
    color: white;
    height: 38px;
    overflow: hidden;
    // top: 250px;
  }
}
</style>
