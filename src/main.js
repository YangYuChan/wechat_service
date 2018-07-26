// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
var echarts = require('echarts');
import Vue from 'vue'
import infiniteScroll from 'vue-infinite-scroll'
import App from './App'
import router from './router'
import axios from 'axios';
import Mint from 'mint-ui';
import Wx from 'weixin-js-sdk';
import ElementUI from 'element-ui';
import $ from 'jquery';
import Echarts from 'echarts';
import 'mint-ui/lib/style.css';
import '../static/style/reset.css';
import '../static/font/iconfont.css';
import '../static/icon/iconfont.css';
import '../static/style/login.scss';
//import '../static/style/login.scss';
import '../static/js/flexible.js';



Vue.use(infiniteScroll)
Vue.use(Mint);
Vue.use(ElementUI);
Vue.config.productionTip = false

Vue.prototype.$axios = axios;
Vue.prototype.$echarts = Echarts; 


new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
