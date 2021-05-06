import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue'
import Search from "../views/Search.vue";
import Newmv from "../views/Newmv.vue";
import store from '@/store'



import PlayList from "../views/PlayList.vue";
import Recommend from "../views/Recommend";

import Npmcom from "../components/Npmcom.vue";
import Serachlist from "../components/Serachlist.vue";
import Ment from "../components/Ment.vue";
import Mentlist from "../components/Mentlist.vue";
// import Prevalue from "../components/Prevalue.vue";



import Lyric from "../components/Lyric.vue";
// import Login from "../components/Login.vue";



Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: "/Login"
  },

  {
    path: "/login",
    name: "Login",
    component: () => import('../components/Login.vue'),
    // component: Prevalue,
    // meta: {
    //   isShowNav: true
    // },

  },
  {
    path: "/Prevalue",
    name: "Prevalue",
    // component: Prevalue,
    component: () => import('../components/Prevalue.vue'),
    // 独享路由守卫
    beforeEnter: (to, from, next) => {
      // let login = store.state.login || window.localStorage.getItem("login");
      let login = store.state.login;
      // 判断登录情况
      if (!login) {
        next("/login");
        return;
      } else {
        next();
      }

    }
  },


  {
    path: '/recommend',
    name: 'Recommend',
    component: Recommend,
    meta: {
      isShowNav: true
    },
  },
  // 路由懒加载，打包的时候 把组件当作一个单独的js文件 当链接跳转的这里的时候才加载 就是路由懒加载
  {
    path: "/hot",
    name: "Hot",


    meta: {
      isShowNav: true
    },
  },

  {
    path: '/search',
    name: 'Search',
    component: Search,
    meta: {
      isShowNav: true
    },


  }, {
    path: '/newmv',
    name: 'Newmv',
    component: Newmv,
    meta: {
      isShowNav: true
    },
  },
  // 以上三个动用了路由元信息 定义了   meta: {requiresAuth:true/false} 认证登录,是否显示这三个


  // 歌单详情页面
  {
    path: '/playlist',
    name: 'PlayList',
    component: PlayList,

  },

  {
    path: '/npmcom',
    name: 'Npmcom',
    component: Npmcom,

  },

  {
    path: '/serachlist',
    name: 'Serachlist',
    component: Serachlist,

  }, {
    path: '/ment',
    name: 'Ment',
    component: Ment,

  }, {
    path: '/mentlist',
    name: 'Mentlist',
    component: Mentlist,

  }, {
    path: '/lyric',
    name: 'Lyric',
    component: Lyric,

  },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: Login,

  // },


]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes

})
// router.beforeEach((to, from, next) => {

//   let login = store.state.login || window.localStorage.getItem("login");
//   // 登录界面验证

//     // 判断登录情况
//     if (!login) {
//       next("/login");
//       return;
//     } else {
//       next();

//   }
//   // if (!login) {
//   //   next("/login")
//   //   return
//   // } else {
//   //   next()
//   //   return
//   // }

// })
export default router