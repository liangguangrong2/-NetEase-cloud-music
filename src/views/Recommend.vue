<template>
  <div>
    <div class="recommend">
      <div class="box_v" @click="getDylist()">
        <span><i class=" iconfont icon  icon-search"></i></span>
        <input
          type="text"
          class="search_bar__input"
          placeholder="搜索歌手 歌曲"
        />

        <!-- <button @click="inputValue = ''">x</button> -->
      </div>
      <!--
    <van-swipe class="my-swipe" :autoplay="3000" loop>
      <van-swipe-item v-for="(item, index) in banners" :key="index">
        <div class="box-v">
          <img class="auto-img" :src="item.prc" alt="" />11
        </div>
      </van-swipe-item>
    </van-swipe> -->

      <!-- <van-swipe
      @change="changeCurrentIndex"
      :autoplay="5000"
      loop
      style="height: 200px;"
      vertical
    >
      <van-swipe-item v-for="(i, index) in banners" :key="index" :item="item">
        <div>
          <img class="auto-img" :src="i.prc" alt="" />
        </div>
      </van-swipe-item>
    </van-swipe> -->

      <!-- <div v-for="(m, index) in banners" :key="index">
      <span>{{ m.song.al.name }}</span>
    </div> -->
      <RecommendPlayList :currentRecommends="currentRecommends"
        >推荐歌单</RecommendPlayList
      >

      <!-- 但是往下传给子组件 -->
      <RecommendNewMusic
        @update:music="$emit('update:music', $event)"
        @update:playlist="$emit('update:playlist', $event)"
        :newSongs="newSongs"
        :currentMusic="$attrs.currentMusic"
        :paused="$attrs.paused"
        >最新音乐</RecommendNewMusic
      >

      <!-- <Ment
      @update:music="$emit('update:music', $event)"
      @update:playlist="$emit('update:ment', newSongs)"
      v-for="(song, index) in newSongs"
      :key="song.id"
      :item="song"
      :index="index"
      :currentMusic="$attrs.currentMusic"
      :paused="$attrs.paused"
    >
    </Ment> -->
    </div>
  </div>
</template>

<script>
import RecommendPlayList from "@/components/RecommendPlayList.vue";
import RecommendNewMusic from "@/components/RecommendNewMusic.vue";
// import Ment from "@/components/Ment.vue";

export default {
  components: {
    RecommendPlayList,
    RecommendNewMusic
    // Ment
  },

  data() {
    return {
      recommends: [],
      newSongs: [],
      recommendsIndex: 0,
      isLoading: false,
      count: 0,
      banners: [],
      //当前轮播图片索引
      currentIndex: 0,
      songitem: []
    };
  },
  // 计算属性
  computed: {
    currentRecommends: function() {
      return this.recommends.slice(
        this.recommendsIndex * 6,
        (this.recommendsIndex + 1) * 6
      );
    }
  },

  created() {
    console.log(this.getUserInfo);
    this.getUserInfo();
  },

  methods: {
    getDylist() {
      this.$router.push({
        path: "/serachlist",
        query: {}
      });
    },
    getUserInfo() {
      this.isLoading = true;
      this.axios
        .get("/personalized")
        .then(response => {
          this.recommends = response.data.result;
        })
        // finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。
        .finally(() => {
          this.count = this.count + 1;
        });

      this.axios
        .get("/personalized/newsong")
        .then(response => {
          this.newSongs = response.data.result;
          // console.log("推荐歌单", response);
        })
        .finally(() => {
          this.count = this.count + 1;
        });

      this.axios({
        method: "get",
        url: "/banner?type=2"
      }).then(res => {
        console.log(res);

        if (res.data.code == 200) {
          this.banners = res.data.banners.slice(1, 10);
          // this.songitem = this.banners[0].song.al.name;
          console.log(this.banners);
          console.log(this.songitem);
        }
      });
    },

    //修改轮播图片索引
    changeCurrentIndex(index) {
      this.currentIndex = index;
    }
  },
  watch: {
    count: function(n) {
      if (n >= 2) {
        this.$root.isShowLoading = false;
      }
    }
  }

  // 果要在每次进入页面的时候获取最新的数据，需要在activated阶段获取数据，承担原来created钩子中获取数据的任务。不会销毁数据
};
</script>

<style lang="less">
.recommend {
  position: relative;
  .box_v {
    width: 90%;
    height: 36px;
    // box-shadow: 1px 1px 1px rgb(197, 192, 192);
    // margin-top: 15px;
    // margin-left: 15px;
    margin: 20px auto;
    // border-radius: 50px;
    background-color: rgb(240, 247, 247);
    // border-bottom: 1px solid #817f7f;
    span {
      margin-left: 5px;
      width: 10px;

      .iconfont {
        font-family: "iconfont" !important;
        color: rgb(5, 5, 5);
        font-size: 14px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    }
    .search_bar__input {
      width: 70%;
      height: 30px;
      padding-top: 4px;
      margin-left: 10px;
      background: none;
      outline: none;
      border: none;
    }
  }
}
</style>
