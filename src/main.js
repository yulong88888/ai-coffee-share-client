// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './http'
import './common/stylus/index.styl';

//需要的文件包
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from 'axios'

Vue.config.productionTip = false;

//引入UI
Vue.use(MintUI);
//引入axios
Vue.prototype.$axios = axios;

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {App},
	template: '<App/>'
});
