<template>
  <div>
    <div class="navitem">
      <span><img src="../assets/1.jpeg" alt="" /><b>悦听音乐</b></span>
      <!-- <u>音乐改变生活</u> -->
      <p>
        悦听音乐改变你的生活
        <!-- <span @click="getitem"> -->
        <span @click="$router.push('/Prevalue')">
          <i class=" iconfont icon icon-80gerenzhongxin"> </i>
        </span>
      </p>
    </div>
    <ul id="home-nav">
      <li>
        <router-link to="/">推荐音乐</router-link>
      </li>

      <li><router-link to="/hot">热歌榜</router-link></li>
      <li><router-link to="/search">歌手</router-link></li>
      <li><router-link to="/newmv">MV</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    getitem() {
      this.$router.push({
        path: "/login"
      });
    }
  }
};
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
}
.navitem {
  width: 100%;
  height: 40px;
  background-color: white;
  display: flex;
  span {
    flex: 1;
    margin-left: 10px;
    img {
      width: 20%;
      height: 100%;
      object-fit: cover;
      vertical-align: middle;
    }
  }
  .iconfont {
    font-family: "iconfont" !important;
    color: #c34444;
    font-size: 25px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  p {
    flex: 1;
    color: rgb(247, 22, 22);
    line-height: 40px;
    // font-weight: 600;
  }
}
#home-nav {
  border: 1px solid #e7e0e0;
  height: 41px;
  display: flex;

  li {
    flex: 1;
    text-align: center;
    list-style: none;
    a {
      //   background: lightblue;
      text-decoration: none;
      color: black;
      line-height: 40px;
      display: inline-block;
      padding: 0 10px;

      &.router-link-exact-active {
        color: #dd001b;
        border-bottom: 2px solid #dd001b;
      }
    }
  }
}
</style>
