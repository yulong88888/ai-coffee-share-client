import Vue from 'vue'
import Router from 'vue-router'
import Shop from '../container/Shop.vue'
import Order from '../container/Order.vue'
import User from '../container/User.vue'

Vue.use(Router);

const routes = [
	{
		path: '/',
		redirect: '/products',
	},
	{
		path: '/products',
		name: 'products',
		component: Shop
	},
	{
		path: '/order',
		name: 'order',
		component: Order,
		meta: {
			title: '确认订单'
		}
	},
	{
		path: '/user',
		name: 'user',
		component: User,
		meta: {
			title: '个人中心'
		}
	}
];

export default new Router({
	routes
})
