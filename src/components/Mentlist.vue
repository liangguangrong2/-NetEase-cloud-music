<template>
  <div class="meet">
    <div class="meent" @click="balck()">
      <i class=" iconfont icon  icon-fanhui3"></i>
    </div>
    <p class="conner">评论</p>
    <p class="list">
      <span>热门评论</span>
    </p>

    <div
      class="top"
      v-for="(m, i) in list_v"
      :key="i"
      :v-model="m"
      @on-change="choosePer()"
    >
      <span class="avm"> <img :src="m.user.avatarUrl" alt=""/></span
      ><span>{{ m.user.nickname }}</span>
      <!-- <span>{{ item.commentId }}</span> -->
      <p class="post_v">{{ m.time | commentTime }}</p>
      <p class="cirdel">
        <span>{{ m.likedCount }}</span
        ><i class=" iconfont icon icon-dianzan"></i>
      </p>
      <p class="load">{{ m.content }}</p>
    </div>

    <p class="list"><span>最新评论</span></p>
    <div class="top" v-for="(r, n) in comitem" :key="n">
      <span class="avm"> <img :src="r.user.avatarUrl" alt=""/></span
      ><span>{{ r.user.nickname }}</span>
      <p class="post_v">{{ r.time | commentTime }}</p>
      <p class="cirdel">
        <span>{{ r.likedCount }}</span
        ><i class=" iconfont icon icon-dianzan"></i>
      </p>
      <p class="load">{{ r.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  // 父级接收
  //   props: ["item", "index"]
  data() {
    return {
      id: "",
      list_v: [],
      comitem: []

      // p_show: true
    };
  },
  mounted() {
    // console.log(this.$route.query.id);
  },
  created() {
    /*  this.id = this.$route.query.id;*/
    // console.log("this.$route.query.id->", this.$route.query.id);
    this.getYour(this.$route.query.id);
    // this.axios({
    //   method: "get",
    //   url: "/comment/playlist",
    //   params: {
    //     id: this.$route.query.id
    //   }
    // }).then(res => {
    //   console.log(res);
    // });
  },
  // data   params
  filters: {
    commentTime(time) {
      let date = new Date(time);
      return (
        date.getFullYear() +
        "年" +
        (date.getMonth() + 1) +
        "月" +
        date.getDate() +
        "日 " +
        date.getHours() +
        "点" +
        date.getMinutes() +
        "分" +
        date.getSeconds() +
        "秒"
      );
    }
  },
  methods: {
    balck() {
      this.$router.go(-1);
    },
    // choosePer() {
    //   if (this.item.length == 0) {
    //     this.p_show = false;
    //   } else {
    //     this.p_show = true;
    //   }
    // },
    getYour(id) {
      console.log("id->", id);
      this.axios({
        url: "/comment/music",
        params: {
          id
        }
      }).then(res => {
        this.list_v = res.data.hotComments;
        // console.log(this.list_v);
        // console.log(this.detail[1].commentId);
        // console.log(this.teail);
        this.comitem = res.data.comments;
        // console.log(this.comitem);
        // console.log("res->", res);
      });
    }
  }
};
</script>
<style lang="less">
.meet {
  width: 100vw;
  height: 100vh;
  // border: 1px solid black;
  .conner {
    text-align: center;
    font-size: 18px;
  }
  .top {
    margin-top: 10px;
    // border-bottom-left-radius: 1px;
    border-bottom: 1px solid rgb(246, 223, 223);
    // height: 110px;
    .avm {
      margin-left: 10px;
      img {
        border-radius: 50%;
        width: 34px;
        height: 34px;
        vertical-align: middle;
      }
    }
    span {
      margin-right: 10px;
    }
    .post_v {
      margin-left: 51px;
      font-size: 9px;
      color: #999;
    }
    .cirdel {
      float: right;
      margin-right: 10px;
      span {
        color: rgb(143, 150, 150);
        // text-align: left;
      }
    }
    .load {
      width: 300px;
      color: #1b1a1a;
      font-size: 15px;
      line-height: 22px;
      margin-top: 5px;
      margin-left: 51px;
    }
  }
  .iconfont {
    font-family: "iconfont" !important;
    color: rgb(114, 112, 112);
    font-size: 25px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    vertical-align: middle;
  }
  .list {
    height: 24px;
    margin-top: 10px;
    background-color: rgba(242, 242, 240);
    span {
      padding: 0 10px;
      height: 23px;
      line-height: 23px;
    }
  }
}
</style>
