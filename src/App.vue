<template>
	<div>
		<swipe :img-datas="imgDatas"/>
		<products :products="products"/>
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
				products: [],
				imgDatas: [
					"http://img0.imgtn.bdimg.com/it/u=1946406373,1354799675&fm=27&gp=0.jpg",
					"http://pic1.win4000.com/wallpaper/1/598aac8d2dab2.jpg",
					"http://img1.imgtn.bdimg.com/it/u=1482437651,683124644&fm=27&gp=0.jpg",
				]
			}
		}, created() {
			console.log("主UI");
			this.$axios.get("./api/products").then(response => {
				if (response.data.code === 0) {
					console.log(response.data.data);
					this.products = response.data.data;
				}
			});
		}
	}
</script>

<style>
</style>
