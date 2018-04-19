<template>
	<mt-swipe :auto="1000" class="swipe-style">
		<mt-swipe-item v-for="imgData in imgDatas">
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

<style lang="stylus">
	.swipe-style
		height: 150px;
		width: 100%;
</style>
