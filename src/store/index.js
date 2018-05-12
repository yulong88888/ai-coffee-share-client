import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

export default new vuex.Store({
	state: {
		userBaseInfo: {},
		// count: 0
	},
	mutations: {
		setUserBaseInfoMutations: (state, payload) => {
			console.error("store", payload);
			let temp = state;
			temp.userBaseInfo = payload;
		},
		// increment: state => state.count++,
		// decrement: state => state.count--
	},
	getters: {
		userBaseInfo: state => {
			console.log("store getters userBaseInfo", state.userBaseInfo);
			return state.userBaseInfo
		},
	},
	actions: {
		setUserBaseInfo(context, userBaseInfo) {
			context.commit('setUserBaseInfoMutations', userBaseInfo);
		},
		// test(context) {
		// 	context.commit('increment');
		// }
	}
})
