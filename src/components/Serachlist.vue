<template>
  <div class="search">
    <!-- <div class="meent" @click="balck()">
      <i class=" iconfont icon  icon-fanhui3"></i>
    </div> -->
    <van-sticky>
      <div @click="Top">
        <van-nav-bar
          title="搜索"
          left-text="返回"
          right-text="按钮"
          left-arrow
          @click-left="onClickLeft"
          @click-right="onClickRight"
        />
      </div>
    </van-sticky>
    <div class="box_v">
      <span><i class=" iconfont icon  icon-search"></i></span>
      <input
        type="text"
        @input="inputing = false"
        v-model.trim="inputValue"
        placeholder="查找歌手 歌曲 "
      />

      <button @click="inputValue = ''" v-if="suggests.length && inputValue">
        <i class=" iconfont icon icon-qingchu6"></i>
      </button>
    </div>

    <!-- 历史搜索 -->
    <div class="del" v-if="!suggests.length && !inputValue">
      <!-- 历史搜索 -->
      <h4>
        <div>
          <p>搜索记录</p>
        </div>
        <span @click="empty">
          <i class=" iconfont icon  icon-qingkong"></i>
        </span>
      </h4>
      <ul>
        <li
          v-for="(listitemt, index) in historyList"
          :key="index"
          @click="goSearchDetail(listitemt)"
        >
          {{ listitemt }}
        </li>
      </ul>
    </div>

    <div class="itemBing">
      <div class="itemBox" v-if="suggests && !inputValue">
        <p class="ui_x"><i class=" iconfont icon  icon-remen"></i>热歌榜</p>
        <div class="box-top" v-for="(noot, index) in topsearch" :key="index">
          <!-- <span class="nav">{{ index + 1 }}</span> -->
          <div class="solid" @click="getSugg_(noot)">
            {{ noot.searchWord }}
            <span>{{ noot.score }}</span>

            <p class="mppn">{{ noot.content }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 搜索建议 -->
    <ul class="box_b" v-if="!inputing && inputValue">
      <p class="uting">搜索建议</p>
      <!-- 拿到inputvalue里面的搜索建议 -->
      <!-- 点击的是搜索建议的名字 keyword -->

      <li
        class="units"
        @click="foot(item.keyword)"
        v-for="(item, index) in suggests"
        :key="index"
      >
        <i class=" iconfont icon icon-chazhao"></i>
        {{ item.keyword }}
      </li>
      <div></div>
    </ul>

    <!-- <p>{{ inputing }}</p> -->
    <ul class="jieguo" v-if="inputing && inputValue">
      <li class="liu">搜素结果</li>

      <SongItem
        @update:music="$emit('update:music', $event)"
        @update:playlist="$emit('update:playlist', abc)"
        v-for="(song, index) in abc"
        :key="song.id"
        :item="song"
        :index="index"
        :currentMusic="$attrs.currentMusic"
        :paused="$attrs.paused"
      />
    </ul>
  </div>
</template>

<script>
import { Toast } from "vant";
import SongItem from "@/components/SongItem.vue";
export default {
  components: {
    SongItem
  },
  data() {
    return {
      inputValue: "",
      suggests: [],
      inputing: false,
      details: [],
      item: [],
      str: [],
      abc: [],
      topsearch: [],
      historyList: [] //历史搜索记录，存本地
    };
  },
  mounted() {
    //如果本地存储的数据historyList有值，直接赋值给data中的historyList
    if (JSON.parse(localStorage.getItem("historyList"))) {
      this.historyList = JSON.parse(localStorage.getItem("historyList"));
      // console.log(this.historyList);
    }
  },

  created: function() {
    // this.foot();
    this.getPost();
  },

  methods: {
    // balck() {
    //   this.$router.go(-1);
    // },
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
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      Toast("按钮");
    },
    // 热歌榜
    getSugg_(v) {
      this.inputValue = v.searchWord;
      console.log(this.inputValue);
      this.foot(v.searchWord);
      // console.log(111);
    },
    //点击历史搜索，跳转搜索结果页
    goSearchDetail(listitemt) {
      // history[i] == index;
      this.inputValue = listitemt;
      this.foot(listitemt);
      console.log(this.inputValue);
      console.log(this.listitemt);
      console.log("点击了");
    },

    getPost() {
      this.axios({
        method: "get",
        url: "/search/hot/detail"
      }).then(res => {
        this.topsearch = res.data.data.splice(0, 15);
        // this.topsearch = res.data.result.hots.splice(0, 9);

        // console.log(this.topsearch);
      });
    },

    foot: function(a) {
      console.log("foot方法");
      // this.abc = null;
      // this.inputValue = item.keyword;
      this.inputing = true;
      this.axios.get("/search?keywords= " + a).then(res => {
        // a就是搜索建议传过来的keyword 然后传给搜索
        // console.log(a);
        // console.log("搜索建议", res.data.result.allMatch);
        // this.suggests = res.data.result.allMatch;
        // console.log(a);

        // details本来是搜索建议的
        this.details = res.data.result.songs;
        // console.log(this.details);

        let str = "";
        // 循环拿到details里面id
        this.details.forEach(ele => {
          // let songid = ele;
          // 把id传给变量出来的str
          str += ele.id + ",";
          // console.log(this.str);
          // console.log(ele.id);
        });
        str = str.slice(0, str.length - 1);
        // console.log(this.str);
        // 歌单列表id拼接搜索建议的id然后渲染相同匹配的内容
        this.axios.get("/song/detail?ids= " + str).then(res => {
          console.log("res->", res.data.songs);
          console.log("abc->", this.abc);
          this.abc = [];
          this.abc.push(...res.data.songs);
          // console.log(this.abc);
          // let a = [];

          //.map()
          // map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
          // map() 方法按照原始数组元素顺序依次处理元素。
          // 是否改变原数组：否
          // 是否对空数组进行检测：否
          // this.abc = this.abc.map(ele => {
          //   return {
          //     id: ele.id,
          //     picUrl: ele.al.picUrl,
          //     name: ele.al.name,
          //     song: { artists: [...ele.ar] }
          //   };
          // });
          console.log(this.abc);
        });
      });
    },
    //清空历史搜索记录
    empty() {
      // this.$toast.success("清空历史搜索成功");
      localStorage.removeItem("historyList");
      this.historyList = [];
    }
  },
  watch: {
    inputValue: function(n) {
      // console.log(this.suggests.length);
      this.suggests = [];
      if (n) {
        console.log(1222221);
        this.axios
          .get("/search/suggest?keywords=" + n + "&type=mobile")
          .then(res => {
            console.log("搜索建议", res.data.result.allMatch);
            // this.suggests = res.data.result.allMatch;
            this.$set(this, "suggests", res.data.result.allMatch);
            console.log(this.suggests);
            // n就是请求的参数
            console.log(n);
            if (!this.historyList.includes(this.inputValue)) {
              // 如果没有就添加
              this.historyList.unshift(this.inputValue);

              //   localStorage.setItem存储historyList到本地
              localStorage.setItem(
                "historyList",
                // JSON.stringify() 方法将 historyList 对象转换为字符串 不然不能保存到。 localStorage
                JSON.stringify(this.historyList)
              );
            }
          });
      } else {
        // console.log("搜素结果");
      }
    }
  }
};
</script>

<style lang="less">
.search {
  .meent {
    margin-left: 10px;
    margin-top: 10px;
  }
  .jieguo {
    font-size: 15px;
    margin-left: 10px;
    .liu {
      margin-left: 20px;
      list-style: none;
      margin-top: 20px;
    }
  }
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
    input {
      width: 70%;
      height: 30px;
      padding-top: 4px;
      margin-left: 10px;
      background: none;
      outline: none;
      border: none;
    }

    button {
      width: 18px;
      height: 18px;
      // border-radius: 50%;
      margin-left: 60px;

      // outline: none;
      // border: none;
      border: 1px solid white;
      // color: rgb(230, 223, 223);
      // background-color: rgb(206, 192, 192);
      .iconfont {
        font-family: "iconfont" !important;
        color: rgb(108, 110, 105);
        font-size: 18px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    }
  }
  .del {
    // width: 100%;
    h4 {
      display: flex;
      align-items: center;
      color: black;
      font-weight: 600;
      font-size: 14px;
      letter-spacing: 1.5px;
      width: 380px;
      margin-top: 25px;
      font: normal bold 16px "幼圆";
      i {
        color: #585757;
        // font-size: 18px;
        margin-right: 6px;
      }
    }
    h4 > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-left: 23px;
      // border: 1px solid;
    }
    span {
      flex: 1;
      margin-left: 261px;
      margin-top: 10px;
    }
    & > ul {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
      list-style: none;
      & > li {
        padding: 4px 12px;
        // border-radius: 6px;
        color: #1a1a1a;
        background-color: #f1f5f8;
        margin-left: 14px;
        letter-spacing: 1.5px;
        margin-top: 10px;
        font-family: "Lucida Console", "Courier New", monospace;
        font-size: 15px;
        // margin-bottom: 8px;
        // box-shadow: 1px 1px 1px 1px rgb(216, 208, 208);
      }
    }
  }
  .itemBing {
    // height: 100%;
    // width: 100%;
    .itemBox {
      // border: 1px solid;
      // width: 100%;
      margin-top: 25px;
      .ui_x {
        width: 80px;
        margin-left: 20px;
        // font-size: 10px;
        // border: 1px solid gainsboro;
        border-bottom: 1px solid #f11818;
        font-weight: bold;
        color: red;
      }
      .box-top {
        margin-left: 12px;
        // display: flex;
        margin-top: 10px;

        .solid {
          color: #070707;
          margin: 5px 2px;
          margin-right: 77px;
          // border-radius: 6px;
          // border-bottom: 1px solid rgb(206, 204, 199);
          float: left;
          padding: 8px;
          text-align: left;
          // background-color: #ececec;

          min-width: 70px;
          span {
            color: rgb(201, 197, 192);
            font-size: 10px;
            margin-left: 10px;
          }
          .mppn {
            font-size: 10px;
            margin-left: 1px;
            margin-top: 8px;
            color: rgb(179, 176, 173);
          }
        }
      }
    }
  }
  .box_b {
    width: 87%;
    height: 100%;
    // background-color: rgb(240, 245, 245);

    // box-shadow: 0 0 1px 1px rgb(196, 187, 187);
    // border: 1px solid;
    margin: 0 auto;
    margin-top: 30px;
    .units {
      margin-top: 10px;
      border-bottom: 1px solid rgb(248, 237, 237);
    }

    li {
      margin-top: 12px;
      // border-top: 1px solid gainsboro;
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
  .iconfont {
    font-family: "iconfont" !important;
    color: rgb(41, 36, 36);
    font-size: 18px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
</style>
