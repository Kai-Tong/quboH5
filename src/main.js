import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from "axios"
import api from "./api"
import VueQuillEditor from 'vue-quill-editor'
import Vant from 'vant';
import 'vant/lib/index.css';
import '@/utils/rem'
import host from "./api/httpurl";

Vue.use(Vant);
Vue.prototype.JuheHOST = "http://m.qubodianjing.com/";
Vue.prototype.$api = api;
Vue.prototype.$axios = Axios;

import {
  inHTMLData,
  uriInUnQuotedAttr
} from "xss-filters-es6";
const xssFilters = require('xss-filters');
Vue.prototype.$inHTMLData = inHTMLData;
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
 
Vue.use(VueQuillEditor, /* { default global options } */)
router.beforeEach((to, from, next) => {
  if (to.matched.some((item) => item.meta.requireAuth)) {
    // let token = true
    let token = localStorage.getItem("h5token");
    // console.log(token);
    if (token) {
      next();
    } else {
      Vue.prototype.$toast({
        message: "请先登录再进行操作"
      })
      window.location.href = "http://m.qubodianjing.com/"
      // next({
      //     path: "/"
      // })
    }
  } else {
    // 不需要登陆
    next();
  }
})
Vue.config.productionTip = false

import * as filter from './assets/filter/index'
Object.keys(filter).forEach(keys => {
  Vue.filter(keys, filter[keys])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
