import axios from 'axios';
import {Indicator, Toast} from 'mint-ui';

axios.interceptors.request.use(config => {
	console.log("请求拦截");
	Indicator.open({
		text: '加载中...',
		spinnerType: 'fading-circle'
	});
	return config;
});

axios.interceptors.response.use(config => {
	console.log("响应拦截");
	Indicator.close();
	return config;
});


