<template>
	<mt-swipe :auto="2500" class="swipe">
		<mt-swipe-item v-for="imgData in imgDatas" :key="imgData">
			<img :src="imgData" style="width:100%">
		</mt-swipe-item>
	</mt-swipe>
</template>

<script>
	export default {
		name: "swipe",
		props: ['imgDatas'],
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"

	.swipe
		height: 150px
		width: 100%
</style>
