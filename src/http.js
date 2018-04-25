import axios from 'axios';
import {Loading} from 'element-ui';

let loading = null;

axios.interceptors.request.use(config => {
	console.log("请求拦截");
	loading = Loading.service({fullscreen: true});
	return config;
});

axios.interceptors.response.use(config => {
	console.log("响应拦截");
	if (loading != null) {
		loading.close();
	}
	loading = null;
	return config;
});


