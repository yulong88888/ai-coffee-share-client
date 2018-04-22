<template>
	<el-container>
		<el-header>Header</el-header>
		<el-main>Main</el-main>
		<el-footer class="foot">
			<div style="margin-top: 10px">
				<el-button type="text">￥XXX</el-button>
				<el-button class="pay_btn" type="success">微信支付</el-button>
			</div>
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
		box-shadow: 0px -1px 1px #000
		position: fixed
		bottom: 0
		left: 0
		width: 100%
		.pay_btn
			float: right
</style>
