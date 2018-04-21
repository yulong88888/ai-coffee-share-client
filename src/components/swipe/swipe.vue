<template>
	<el-carousel :interval="2500" arrow="never" height="150px" indicator-position="none">
		<el-carousel-item v-for="imgData in imgDatas" :key="imgData">
			<img :src="imgData" style="width:100%">
		</el-carousel-item>
	</el-carousel>
</template>

<script>
	export default {
		name: "swipe",
		props: ['imgDatas'],
	}
</script>
