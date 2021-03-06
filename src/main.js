import Vue from 'vue'
import Vant from 'vant';
import './plugins/axios'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
  
import 'vant/lib/index.css';
Vue.use(Vant);
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  data: function () {
    return {
      isShowLoading: false,
    };
  },
}).$mount('#app')