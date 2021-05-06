<template>
  <div class="box">
    <!-- <div>
      <p class="boom">热门歌手</p>
      <div
        class="next"
        v-for="(item, index) in foot"
        :key="index"
        @click="getDataitem(item.id)"
      >
        <span><img :src="item.picUrl" alt=""/></span>
        <span class="list_x"
          >{{ item.name
          }}<i class=" iconfont icon icon-biaoqiankuozhan_wode-175"></i
        ></span>
      </div>
    </div> -->
    <!--
    <div>
      <p class="boom">男歌手</p>
      <div
        class="next"
        v-for="(item, index) in gitem"
        :key="index"
        @click="getDataitem(item.id)"
      >
        <span><img :src="item.picUrl" alt=""/></span>
        <span class="list_x"
          >{{ item.name
          }}<i class=" iconfont icon icon-biaoqiankuozhan_wode-175"></i
        ></span>
      </div>
    </div> -->
    <!-- <div>
      <p class="boom">女歌手</p>
      <div
        class="next"
        v-for="(item, index) in utem"
        :key="index"
        @click="getDataitem(item.id)"
      >
        <span><img :src="item.picUrl" alt=""/></span>
        <span class="list_x"
          >{{ item.name
          }}<i class=" iconfont icon icon-biaoqiankuozhan_wode-175"></i
        ></span>
      </div>
    </div> -->

    <p class="boom">全球榜歌手</p>
    <div
      class="next"
      v-for="(item, index) in singer"
      :key="index"
      @click="getDataitem(item.id)"
    >
      <span><img :src="item.picUrl" alt=""/></span>
      <span class="list_x">{{ item.name }}</span>
      <!-- <span>{{ item.id }}</span> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    }
  },
  data: function() {
    return {
      singer: [],
      foot: [],
      gitem: [],
      utem: []
    };
  },

  methods: {
    getDataitem: function(id) {
      this.$router.push({
        path: "/ment",
        query: {
          id
        }
      });
    },
    temPlist() {
      this.axios({
        method: "get",
        url: "/top/artists"
      }).then(res => {
        //console.log("details=>", res);
        this.singer = res.data.artists.splice(30, 40);
        //console.log(this.details[0].ar[0].name);
        console.log(this.singer);
      });
      this.axios({
        method: "get",
        url: "/top/artists?offset=0&limit=30"
      }).then(res => {
        //console.log("details=>", res);
        this.foot = res.data.artists.splice(0, 5);
        //console.log(this.details[0].ar[0].name);
        console.log(this.foot);
      });
      this.axios({
        method: "get",
        url: "artist/list?cat=1001"
      }).then(res => {
        //console.log("details=>", res);
        this.gitem = res.data.artists.splice(0, 5);
        //console.log(this.details[0].ar[0].name);
        console.log(this.gitem);
      });
      this.axios({
        method: "get",
        url: "artist/list?cat=1002"
      }).then(res => {
        //console.log("details=>", res);
        this.utem = res.data.artists.splice(0, 5);
        //console.log(this.details[0].ar[0].name);
        console.log(this.gitem);
      });
    }
  },
  created() {
    this.temPlist();
  }
};
</script>

<style lang="less">
.box {
  //   border: 1px solid black;
  width: 100vw;
  height: 100vh;
  .boom {
    margin-left: 12px;
    margin-top: 20px;
    color: red;
  }
  .next {
    margin-top: 20px;
    margin-left: 10px;
    span {
      img {
        width: 40px;
        height: 40px;
        // border-radius: 50%;
        vertical-align: middle;
        object-fit: cover;
      }
    }
    .list_x {
      margin-left: 20px;
      i {
        margin-left: 10px;
        vertical-align: middle;
      }
      .iconfont {
        // margin-top: 15px;
        font-family: "iconfont" !important;
        font-size: 24px;
        font-style: normal;
        color: rgb(214, 72, 72);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    }
  }
}
</style>
