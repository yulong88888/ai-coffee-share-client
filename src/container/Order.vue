<template>
	<div>
		<el-container>
			<div @click="selectAddress" class="head">
				<el-header>
					<el-card>
						<span class="el-icon-plus" style="color: rgb(255, 128, 0)"></span>
						<span>添加配送信息</span>
						<span class="el-icon-arrow-right" style="float: right"></span>
					</el-card>
				</el-header>
			</div>
			<el-main>
				<el-card class="big-card">
					<div v-for="o in 4" :key="o">
						<div class="item text">
							<span>{{'列表内容 ' + o }}</span>
							<span style="float: right">￥</span>
						</div>
						<hr/>
					</div>
					<div class="text item">
						<span>服务费</span>
						<div style="float: right">￥</div>
					</div>
					<div class="text item" @click="selectCoupon">
						<span>优惠区域</span>
						<span class="el-icon-arrow-right" style="float: right"></span>
					</div>
					<hr/>
					<div class="text item">
						<span>总价</span>
						<span style="float: right">还需支付
							<span style="font-size: 20px">￥66</span>
						</span>
					</div>
				</el-card>
				<div @click="dialogVisible = true">
					<el-card style="margin-top: 10px">
						<span>备注</span>
						<span style="float: right">对骑手小哥哥说
							<span class="el-icon-arrow-right" style="float: right"></span>
						</span>
					</el-card>
				</div>
			</el-main>
			<el-footer class="foot">
				<div style="margin-top: 10px">
					<el-button type="text">￥66</el-button>
					<el-button class="pay_btn" type="success" @click="toPay">微信支付</el-button>
				</div>
			</el-footer>
		</el-container>
		<el-dialog
			title="备注"
			:visible.sync="dialogVisible"
			width="90%">
			<el-input placeholder="请输入内容" type="textarea" :rows="3"/>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		  	</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: "order",
		data() {
			return {
				dialogVisible: false
			}
		},
		created() {
			console.log("OrderUI");
		},
		methods: {
			selectAddress() {
				console.log("selectAddress");
			},
			selectCoupon() {
				console.log("selectCoupon");
			}, toPay() {
				console.log("toPay");
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.big-card
		width: 100%
		.text
			font-size: 14px
		.item
			padding: 6px

	.head
		width: 100%
		box-shadow: 0px 1px 5px #CCC

	.foot
		box-shadow: 0px -1px 1px #CCC
		position: fixed
		bottom: 0
		left: 0
		width: 100%
		.pay_btn
			float: right
</style>
