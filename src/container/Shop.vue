<template>
	<div>
		<swipe :img-datas="basic.imgDatas"/>
		<products :products="products" :basic="basic"/>
	</div>
</template>

<script>
	import Swipe from "../components/swipe/swipe";
	import Products from "../components/products/products";

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
			this.$axios.get("./api/baseInfo/get").then(response => {
				if (response.data.code === 0) {
					console.log(response.data.recdata);
					this.basic = response.data.recdata;
				}
			});
			this.$axios.get("./api/product/get").then(response => {
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
