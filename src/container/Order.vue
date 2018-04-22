<template>
	<el-container>
		<el-header>Header</el-header>
		<el-main>Main</el-main>
		<el-footer class="foot">
			<el-button type="text">￥XXX</el-button>
			<el-button class="pay_btn" type="success">微信支付</el-button>
		</el-footer>
	</el-container>
</template>

<script>
	export default {
		name: "order",
		created() {
			console.log("OrderUI");
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.foot
		position: fixed
		bottom: 0
		left: 0
		width: 100%
		.pay_btn
			float: right
</style>
