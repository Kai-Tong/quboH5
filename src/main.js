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
Vue.prototype.JuheHOST = host
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

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
