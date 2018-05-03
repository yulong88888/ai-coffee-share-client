import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

export default new vuex.Store({
	state: {
		userBaseInfo: {},
		baseInfo: {},
		productInfo: {},
		// count: 0
	},
	mutations: {
		setUserBaseInfoMutations: (state, payload) => {
			console.error("store", payload);
			let temp = state;
			temp.userBaseInfo = payload;
		},
		setBaseInfoMutations: (state, payload) => {
			console.error("store", payload);
			let temp = state;
			temp.baseInfo = payload;
		},
		setProductInfoMutations: (state, payload) => {
			console.error("store", payload);
			let temp = state;
			temp.productInfo = payload;
		},
		// increment: state => state.count++,
		// decrement: state => state.count--
	},
	getters: {
		userBaseInfo: state => {
			console.log("store getters userBaseInfo", state.userBaseInfo);
			return state.userBaseInfo
		},
		baseInfo: state => {
			console.log("store getters baseInfo", state.baseInfo);
			return state.baseInfo
		},
		productInfo: state => {
			console.log("store getters productInfo", state.productInfo);
			return state.productInfo
		}
	},
	actions: {
		setUserBaseInfo(context, userBaseInfo) {
			context.commit('setUserBaseInfoMutations', userBaseInfo);
		},
		setBaseInfo(context, baseInfo) {
			context.commit('setBaseInfoMutations', baseInfo);
		},
		setProductInfo(context, productInfo) {
			context.commit('setProductInfoMutations', productInfo);
		},
		// test(context) {
		// 	context.commit('increment');
		// }
	}
})
