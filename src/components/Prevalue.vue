<template>
  <div>
    <van-sticky>
      <van-nav-bar
        title="个人中心"
        left-text="返回"
        right-text="退出"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </van-sticky>
    <!-- 大图片 -->
    <div class="box">
      <img :src="jack.backgroundUrl" alt="" />
      <!-- 个人信息 -->
      <div class="noot">
        <!-- 左边图片 -->
        <div class="left_img">
          <img :src="jack.avatarUrl" alt="" />
        </div>
        <!-- 右边 -->
        <div class="right_li">
          <p>{{ jack.nickname }}</p>
        </div>
        <div class="top_list">个性签名:{{ jack.signature }}</div>
      </div>

      <div class="concern">
        <span> {{ jack.follows }}关注</span><span>{{ jack.followeds }}粉丝</span
        ><span>Lv{{ jack.newFollows }}</span>
      </div>
    </div>

    <div class="top-box">
      <div class="list" @click="navghtList(foot[0].id)">
        <h4>音乐品味</h4>
        <div class="left_oo">
          <img :src="foot[0].coverImgUrl" alt="" />
        </div>
        <div class="right_oo">
          我喜欢的音乐
          <div class="top_oo">
            {{ foot[0].trackCount }}首 已下载<span>2</span>首
          </div>
        </div>
      </div>

      <div class="song">
        <h4>创建的歌单</h4>
        <div v-for="(v, u) in foot" :key="u" @click="navghtList(v.id)">
          <div class="left_oolist"><img :src="v.coverImgUrl" alt="" /></div>
          <div class="right_oolist">
            {{ v.name }}
            <div class="butom_oo">
              {{ v.trackCount }}首 播放<span>{{ v.trackCount }}</span
              >次
            </div>
          </div>
        </div>
      </div>

      <div class="song">
        <h4>收藏的歌单</h4>

        <div v-for="(z, k) in list" :key="k" @click="navghtList(z.id)">
          <div class="left_oolist"><img :src="z.coverImgUrl" alt="" /></div>
          <div class="right_oolist">
            {{ z.name }}
            <div class="butom_oo">
              {{ z.trackCount }}首 播放<span>{{ z.trackCount }}</span
              >次
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <!-- <van-tabs v-model="active">
        <van-tab title="标签 1">内容 1</van-tab>
        <van-tab title="标签 2">内容 2</van-tab>
        <van-tab title="标签 3">内容 3</van-tab>
        <van-tab title="标签 4">内容 4</van-tab>
      </van-tabs> -->
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      jack: [],
      foot: [],
      list: []
      // active: 2
    };
  },
  methods: {
    navghtList: function(id) {
      this.$router.push({
        path: "/playlist",
        query: {
          id
        }
      });
    },
    onClickLeft() {
      this.$router.push({
        // name: "Recommend"
        path: "recommend"
      });
    },
    onClickRight() {
      Toast("退出了");
    },

    getDou() {
      this.axios({
        method: "get",
        url: "/user/detail?uid=494017589"
        // params: {
        //   id: this.$route.query.id
        // }
      }).then(res => {
        //console.log("details=>", res);
        this.jack = res.data.profile;
        //console.log(this.details[0].ar[0].name);
        console.log(this.jack);
        console.log(res);
      });

      this.axios({
        method: "get",
        url: "/user/playlist?uid=494017589"
        // params: {
        //   id: this.$route.query.id
        // }
      }).then(res => {
        // console.log("res.data.playlist=>", res.data.playlist);
        this.foot = res.data.playlist.splice(0, 11);
        //console.log(this.details[0].ar[0].name);

        console.log(this.foot);
        console.log(res);

        this.list = res.data.playlist;
        console.log(this.list);
      });
    }
  },
  created() {
    this.getDou();
  }
};
</script>

<style lang="less">
.box {
  width: 100vw;
  height: 350px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }

  .noot {
    position: absolute;
    top: 182px;
    width: 100%;
    height: 300px;
    color: white;
    .left_img {
      float: left;
      width: 60px;
      height: 60px;
      margin-left: 20px;
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    .right_li {
      width: 325px;
      height: 60px;
      float: right;
      p {
        font-size: 16px;
        margin-top: 20px;
      }
    }
    .top_list {
      margin-left: 20px;
      // margin-top: 10px;
      line-height: 50px;
    }
    .top_fize {
      font-size: 12px;
      padding-left: 20px;
      // padding-top: 15px;
      line-height: 35px;
    }
  }
  .concern {
    width: 90%;
    // height: 100%;
    height: 50px;
    // border: 1px solid black;
    position: absolute;
    bottom: -20px;
    left: 20px;
    display: flex;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 0 0 1px rgb(241, 233, 233);
    span {
      flex: 1;
      margin-top: 15px;
      margin-left: 33px;
      font-weight: 700;
    }
  }
}
.top-box {
  width: 100%;
  height: 600px;
  margin-top: 50px;
  .list {
    position: relative;
    width: 90%;
    height: 120px;
    // border: 1px solid wheat;
    border-radius: 6px;
    box-shadow: 0 0 0 1px rgb(241, 233, 233);
    background-color: rgb(241, 245, 248);
    margin: 0 auto;
    h4 {
      margin-left: 20px;
      margin-top: 10px;
    }
    .left_oo {
      width: 60px;
      height: 60px;
      margin-left: 20px;
      margin-top: 10px;
      background-color: red;
      border-radius: 10px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
    .right_oo {
      position: absolute;
      left: 90px;
      top: 50px;
      .top_oo {
        // top: 20px;
        font-size: 14px;
        line-height: 40px;
        color: #8e9797;
      }
    }
  }
  .song {
    position: relative;
    // margin-top: 20px;
    width: 90%;
    // height: 120px;
    border-radius: 6px;
    box-shadow: 0 0 0 1px rgb(241, 233, 233);
    margin: 20px auto;
    h4 {
      margin-left: 20px;
      margin-top: 10px;
    }
    .left_oolist {
      width: 60px;
      height: 60px;
      margin-left: 20px;
      margin-top: 10px;
      background-color: red;
      border-radius: 10px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
    .right_oolist {
      position: absolute;
      left: 90px;
      // top: 50px;
      // top: 5px;
      margin-top: -48px;
      .butom_oo {
        // top: 20px;
        font-size: 14px;
        line-height: 40px;
        color: #8e9797;
      }
    }
  }
}
</style>
