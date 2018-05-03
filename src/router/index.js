import Vue from 'vue'
import Router from 'vue-router'
import Shop from '../container/Shop.vue'
import Order from '../container/Order.vue'
import Account from '../container/Account.vue'
import Building from '../container/Building.vue'
import Admin from '../container/Admin.vue'
import Test from '../container/Test.vue'

Vue.use(Router);

const routes = [
	{
		path: '/',
		redirect: '/products',
	}, {
		path: '/products',
		name: 'products',
		component: Shop
	}, {
		path: '/order',
		name: 'order',
		component: Order,
		meta: {
			title: '确认订单'
		}
	}, {
		path: '/account',
		name: 'account',
		component: Account,
		meta: {
			title: '个人中心'
		}
	}, {
		path: '/building',
		name: 'building',
		component: Building,
		meta: {
			title: '开发中...'
		}
	}, {
		path: '/admin',
		name: 'admin',
		component: Admin,
		meta: {
			title: '管理中心...'
		}
	}, {
		path: "*",
		redirect: "/building"
	}, {
		path: '/test',
		name: 'test',
		component: Test,
	}];

export default new Router({
	mode: 'history',
	base: "ai-coffee-share",
	routes: routes
})
