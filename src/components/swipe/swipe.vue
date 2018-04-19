<template>
	<mt-swipe :auto="1000" style="height: 150px;width: 100%;">
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

<style>
</style>
