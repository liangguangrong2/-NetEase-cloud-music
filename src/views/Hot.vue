<template>
  <div class="hot">
    <FoorTener></FoorTener>

    <div class="next">
      <!-- <div>{{ creator.description }}</div> -->
      <!-- <p>云音乐</p>
			<div class="text">{{ creator.name }}</div> -->
      <div class="u-hmsprt"></div>

      <!-- <p class="lister">更新日期 {{ nowtime }}月{{ nextime }}日</p> -->
    </div>
    <div>
      <div>
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
import FoorTener from "@/components/FoorTener.vue";
import SongItem from "@/components/SongItem.vue";
export default {
  components: {
    FoorTener,
    SongItem
  },
  data: function() {
    return {
      creator: [],
      item: [],
      songid: [],
      details: [],
      affer: [],
      nowtime: "",
      nextime: ""
    };
  },

  methods: {
    getTime() {
      var that = this;
      setInterval(() => {
        //new Date() new一个data对象，当前日期和时间
        //toLocaleString() 方法可根据本地时间把 Date 对象转换为字符串，并返回结果。
        that.nowtime = new Date().getMonth() + 1;
        that.nextime = new Date().getDate();

        // that.nowtime = new Date().getDate() - 1;
      }, 0);
      console.log(that.nowtime);
    }
  },

  updated() {
    this.getTime();
  },

  created() {
    // this.getTime();
    this.axios({
      method: "get",
      url: "/playlist/detail",
      params: {
        id: 3778678
      }
    }).then(res => {
      this.creator = res.data.playlist;
      // 歌曲id↓
      let arr = [];
      let songid = res.data.playlist.tracks;
      console.log("this.creator=>", this.creator);

      songid = res.data.playlist.trackIds.splice(0, 20);
      songid.forEach(element => {
        arr.push(element.id);
      });
      songid = arr.join(",");

      console.log(arr);
      console.log("songid", songid);
      this.axios({
        method: "get",
        url: "/song/detail",
        params: {
          ids: songid
        }
      }).then(res => {
        console.log("details=>", res);
        this.details = res.data.songs;
        console.log({ ...this.details });
        // let a = [];
        let a = this.details.map(ele => {
          // a.push(...ele);
          // console.log({ id: ele.id, picUrl: ele.al.picUrl, name: ele.al.name });
          return { id: ele.id, picUrl: ele.al.picUrl, name: ele.al.name };
        });
        console.log(a);
        this.a = this.affer;
      });
    });
  }
};
</script>
<style scoped lang="less">
* {
  padding: 0;
  margin: 0;
}
.hot {
  width: 100%;

  .next {
    width: 100%;
    height: 150px;
    // background-color: rgba(242, 88, 30);

    .u-hmsprt {
      width: 100%;
      height: 100%;
      background-size: 166px 97px;
      background-position: -24px -30px;
      background: url(../assets/index2.png) no-repeat;
      position: relative;
    }
    .lister {
      color: rgb(20, 20, 20);
      margin-left: 20px;
      position: absolute;
      top: 180px;
      z-index: 1000;
    }
    // img {
    // 	width: 100%;
    // 	height: 100%;
    // }
    // p {
    // 	color: rgb(240, 231, 231);
    // 	margin-left: 20px;
    // 	border: 1px solid;
    // }
    .text {
      // font-family: "微软雅黑";
      border: 1px solid;
      font-size: 45px;
      color: white;
      margin-left: 20px;
      margin-top: 20px;
    }
  }
}
</style>
