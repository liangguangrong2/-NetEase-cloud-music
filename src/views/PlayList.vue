<template>
  <div @click="Top">
    <van-sticky>
      <van-nav-bar
        title="歌单详情"
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
    <div class="playlist">
      <img class="misszhou" :src="creator.coverImgUrl" alt="" />
      <div class="fler" :v-for="creator in details">
        <span class="menu">歌单</span>
        <span class="play-count">{{
          creator.playCount | formatPlayCount
        }}</span>
        <img :src="creator.coverImgUrl" alt="" />
        <div class="log">
          <div class="next">
            <div class="text">{{ creator.name }}</div>
            <p class="over">
              <img :src="crever.avatarUrl" alt="" />

              <span>{{ crever.nickname }}</span>
              <!-- <span>hhq->{{ creator.name }}</span> -->
            </p>
            <!-- <div class="pinglun" @click="tempLapn(details[0].ar[0].id)"> -->
            <div class="pinglun" @click="tempLapn(creator.id)">
              <i class=" iconfont icon icon-pinglun"> </i>
            </div>
            <!-- <span>{{ creator.id }}</span> -->
            <!-- <span>{{ details[0].ar[0].id }}1</span> -->
          </div>
        </div>
      </div>

      <div>
        <h6>歌单列表</h6>
        <SongItem
          @update:music="$emit('update:music', $event)"
          @update:playlist="$emit('update:playlist', details)"
          v-for="(song, index) in details"
          :key="song.id"
          :item="song"
          :index="index"
          :currentMusic="$attrs.currentMusic"
          :paused="$attrs.paused"
        />
      </div>
    </div>
  </div>
</template>
<script>
import SongItem from "@/components/SongItem.vue";
export default {
  components: {
    SongItem
  },
  data: function() {
    return {
      creator: [],
      item: [],
      songid: [],
      details: [],
      crever: []
    };
  },
  filters: {
    formatPlayCount: function(value) {
      return (value / 10000).toFixed(1) + "万";
    }
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
      console.log("dasads");
    },
    onClickRight() {
      this.$router.push({
        path: "/serachlist",
        query: {}
      });
    },
    tempLapn: function(id) {
      this.$router.push({
        path: "npmcom",
        query: {
          id
        }
      });
    },
    getDay() {
      this.axios({
        method: "get",
        url: "/playlist/detail",
        params: {
          id: this.$route.query.id
        }
      }).then(res => {
        this.creator = res.data.playlist;
        this.crever = res.data.playlist.creator;
        console.log(this.crever);
        //console.log(this.creator.id);
        // 歌曲id↓
        let ids = "";
        let songid = res.data.playlist.tracks.splice(0, 20);
        //console.log("this.creator=>", this.creator);
        //console.log("this.creator=>", this.creator.id);

        // songid = res.data.playlist.trackIds
        songid.forEach((element, i) => {
          // console.log(element.id);
          // ids.push(element.id);
          if (i == songid.length - 1) {
            ids += element.id;
            return;
          }
          ids += element.id + ",";
        });
        // ids = ids.join(",");
        // console.log(ids);
        // arr.join(",");
        // console.log(arr);

        this.axios({
          method: "get",
          url: "/song/detail",
          params: {
            ids
          }
        }).then(res => {
          //console.log("details=>", res);
          this.details = res.data.songs;
          //console.log(this.details[0].ar[0].name);
        });
      });
    }
  },
  created() {
    //console.log(this.$route.query.id);
    this.getDay();
  },
  // watch: {
  //   firstName(newName, oldName) {
  //     //console.log(oldName);
  //   }
  // },
  destroy() {
    //console.log(this.$route.query.id);
  }
};
</script>

<style scoped lang="less">
.playlist {
  position: relative;
  overflow-x: hidden;
  .misszhou {
    width: 100%;
    height: 185px;
    filter: blur(5px);
    object-fit: cover;
    // background-color: black;
  }
  h6 {
    // background-color: aquamarine;
    margin-left: 10px;
    margin-top: 5px;
  }
  .fler {
    width: 100%;
    height: 186px;
    // background-color: rgb(97, 100, 100);
    display: flex;
    position: absolute;
    top: 30px;
    left: 10px;

    img {
      width: 123px;
      height: 126px;
      margin-left: 7px;
    }
    .menu {
      position: absolute;
      z-index: 3;
      top: 10px;
      left: 7px;
      padding: 0 8px;
      height: 17px;
      color: #fff;
      font-size: 9px;
      text-align: center;
      line-height: 17px;
      background-color: rgba(217, 48, 48, 0.8);
      border-top-right-radius: 17px;
      border-bottom-right-radius: 17px;
    }
    .play-count {
      font-size: 12px;
      position: absolute;
      top: 3px;
      left: 66px;
      color: white;
      text-shadow: 0 0 1px black;
      &::before {
        content: "";
        background: no-repeat
          url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+");
        background-position: left center;
        background-size: auto 100%;
        width: 1.2em;
        height: 0.9em;
        display: inline-block;
        // vertical-align: middle;
      }
    }
    .log {
      .next {
        // flex: 1;
        position: absolute;
        text-overflow: ellipsis;
        display: -webkit-box;
        top: -30px;
        /*控制在3行*/
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        .text {
          width: 200px;
          color: white;
          font-size: 16px;
          margin-top: 30px;
          margin-left: 20px;
        }
        .over {
          margin-top: 40px;
          margin-left: 10px;
          img {
            border-radius: 50%;
            width: 34px;
            height: 34px;
            object-fit: cover;
            vertical-align: middle;
          }
          span {
            color: white;
            font-size: 14px;
            // vertical-align: middle;
            margin-left: 10px;
          }
        }
        .pinglun {
          // border: 1px solid;
          margin-left: 216px;
          margin-top: 5px;
        }
      }

      .next-box {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        /*控制在3行*/
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
      }
    }
  }
  h6 {
    color: rgb(105, 102, 102);
    font-size: 14px;
    // font-weight: bold;
  }
}
</style>
