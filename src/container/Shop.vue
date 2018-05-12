<template>
	<div>
		<swipe :img-datas="basic.imgDatas"/>
		<products :basic="basic"/>
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
				basic: {},
				products: {},
			}
		},
		created() {
			console.log("主UI");
			//获取基础信息
			this.$axios({
				method: 'get',
				url: "./api/baseInfo/get",
			}).then(response => {
				if (response.data.code === 0) {
					console.log(response.data.recdata);
					this.basic = response.data.recdata;
				}
			});
			//获取产品信息
			this.$axios({
				method: 'get',
				url: "./api/product/get",
			}).then(response => {
				if (response.data.code === 0) {
					console.log(response.data.recdata);
					this.products = response.data.recdata;
				}
			});
		}
	}
</script>

<style>
</style>
