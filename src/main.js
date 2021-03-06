// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './container/App.vue'
import router from './router'
import './http'
import './common/stylus/index.styl';
//需要的文件包
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store/index'

Vue.config.productionTip = false;

//引入UI
Vue.use(ElementUI);
//引入axios
Vue.prototype.$axios = axios;

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
});
