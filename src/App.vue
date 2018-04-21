<template>
	<div>
		<swipe :img-datas="basic.imgDatas"/>
		<products :products="products" :basic="basic"/>
		<router-link to="/goods"></router-link>
	</div>
</template>

<script>
	import Swipe from "./components/swipe/swipe";
	import Products from "./components/products/products";

	export default {
		components: {
			Products,
			Swipe
		},
		name: 'App',
		data() {
			return {
				basic: [],
				products: [],
			}
		}, created() {
			console.log("主UI");
			this.$axios.get("./api/data").then(response => {
				if (response.data.code === 0) {
					console.log(response.data);
					this.basic = response.data.recdata.basic;
					this.products = response.data.recdata.products;
				}
			});
		}
	}
</script>

<style>
</style>
