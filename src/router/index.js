import Vue from 'vue'
import Router from 'vue-router'
import Shop from '../container/Shop.vue'
import order from '../container/Order.vue'

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
		component: order
	}
];

export default new Router({
	routes
})
