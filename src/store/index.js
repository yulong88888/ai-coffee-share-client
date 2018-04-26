import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

export default new vuex.Store({
	state: {
		userBaseInfo: {
			// "city": "",
			// "country": "",
			// "headimgurl": "",
			// "language": "",
			// "nickname": "",
			// "openid": "",
			// "privilege": "",
			// "length": null,
			// "province": "",
			// "sex": null
		},
		count: 0
	},
	mutations: {
		setUserBaseInfoMutations: (state, payload) => {
			console.error(payload);
			let temp = state;
			temp.userBaseInfo = payload;
		},
		increment: state => state.count++,
		decrement: state => state.count--
	},
	getters: {
		userBaseInfo: state => {
			console.debug(state.userBaseInfo);
			return state.userBaseInfo
		}
	},
	actions: {
		setUserBaseInfo(context, userBaseInfo) {
			context.commit('setUserBaseInfoMutations', userBaseInfo);
		},
		test(context) {
			context.commit('increment');
		}
	}
})
