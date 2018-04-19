<template>
	<swipe :img-datas="imgDatas"/>
</template>

<script>
	import Swipe from "./components/swipe/swipe";

	export default {
		components: {Swipe},
		name: 'App',
		data() {
			return {
				imgDatas: [
					"http://img0.imgtn.bdimg.com/it/u=1946406373,1354799675&fm=27&gp=0.jpg",
					"http://pic1.win4000.com/wallpaper/1/598aac8d2dab2.jpg",
					"http://img1.imgtn.bdimg.com/it/u=1482437651,683124644&fm=27&gp=0.jpg",
				]
			}
		}
	}
</script>

<style>

</style>
