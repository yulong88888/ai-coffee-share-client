<template>
	<div>
		<swipe :img-datas="basic.imgDatas"/>
		<products :basic="basic"/>

		<!--<products :products="products" :basic="basic"/>-->

		<!--<swipe :img-datas="basic.imgDatas"/>-->
		<!--<products :products="products" :basic="basic"/>-->
	</div>
</template>

<script>
	import Swipe from "../components/swipe/swipe";
	import Products from "../components/products/products";
	import {mapState} from 'vuex';

	export default {
		components: {
			Products,
			Swipe
		},
		name: 'Shop',
		data() {
			return {
				// basic: {},
				// products: {},
			}
		},
		computed: {
			...mapState({
				basic: 'baseInfo',
				// products: 'productInfo'
			}),
			// storeBasic() {
			// 	console.log("--->>>", this.$store.getters);
			// 	return this.$store.getters.baseInfo;
			// },
			// storeProducts() {
			// 	console.log("--->>>", this.$store.getters);
			// 	return this.$store.getters.productInfo;
			// }
		},
		created() {
			console.log("主UI");

			//获取设置商户基本信息
			this.$axios.get("./api/baseInfo/get").then(response => {
				if (response.data.code === 0) {
					console.log(response.data.recdata);
					this.$store.dispatch('setBaseInfo', response.data.recdata);
				}
			});

			// console.log("openid", this.$store.getters.userBaseInfo.openid);
			// //获取基础信息
			// this.$axios({
			// 	method: 'get',
			// 	url: "./api/baseInfo/get",
			// 	params: {
			// 		"openId": this.$store.getters.userBaseInfo.openid,
			// 	}
			// }).then(response => {
			// 	if (response.data.code === 0) {
			// 		console.log(response.data.recdata);
			// 		this.basic = response.data.recdata;
			// 	}
			// });
			// //获取产品信息
			// this.$axios({
			// 	method: 'get',
			// 	url: "./api/product/get",
			// 	params: {
			// 		"openId": this.$store.getters.userBaseInfo.openid,
			// 	}
			// }).then(response => {
			// 	if (response.data.code === 0) {
			// 		console.log(response.data.recdata);
			// 		this.products = response.data.recdata;
			// 	}
			// });
		}
	}
</script>

<style>
</style>
