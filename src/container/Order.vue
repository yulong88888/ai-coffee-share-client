<template>
	<div>
		<el-container>
			<div @click="selectAddress" class="head">
				<el-header>
					<div v-if="JSON.stringify(this.accountInfo) === '{}'">
						<el-card>
							<span class="el-icon-plus" style="color: rgb(255, 128, 0)"></span>
							<span>添加配送信息</span>
							<span class="el-icon-arrow-right" style="float: right"></span>
						</el-card>
					</div>
					<div v-else>
						<el-card>
							<span style="float: left">
								<div>姓名：{{this.accountInfo.name}}</div>
								<div>电话：{{this.accountInfo.phone}}</div>
								<div>地址：{{this.accountInfo.address}}</div>
							</span>
							<span class="el-icon-arrow-right" style="float: right"></span>
						</el-card>
					</div>

				</el-header>
			</div>
			<el-main>
				<el-card class="big-card">
					<div v-for="obj in buyProducts" :key="obj.id">
						<div class="item text">
							<span>{{ obj.name }}</span>
							<span>x{{ obj.count }}</span>
							<span style="float: right">{{ (obj.price*obj.count).toFixed(2) }}￥</span>
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
							<span style="font-size: 20px">￥{{totalPrice.toFixed(2)}}</span>
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
					<el-button type="text">￥{{totalPrice.toFixed(2)}}</el-button>
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
				//购买的产品
				buyProducts: [],
				accountInfo: {},
				totalPrice: 0,
				dialogVisible: false,
			}
		},
		created() {
			console.log("OrderUI");
		},
		methods: {
			selectAddress() {
				console.log("selectAddress");
				this.$router.push({
					path: '/info',
				});
			},
			selectCoupon() {
				console.log("selectCoupon");
			},
			toPay() {
				console.log("toPay");
			},
			// // 取到路由带过来的参数
			// getParams() {
			// 	let routerParams = this.$route.params.obj;
			// 	// 将数据放在当前组件的数据内
			// 	console.error(routerParams);
			// 	// this.msg = routerParams
			// }
		},
		// watch: {
		// 	'$route': 'getParams'
		// },
		created() {
			console.log(this.$route.query);
			this.accountInfo = this.$route.query;
			// 获取购买的东西
			this.$axios.post("./api/shopCart/get").then(response => {
				if (response.data.code === 0) {
					console.log("加载服务器Session商品", response.data.recdata);
					if (typeof (response.data.recdata) + "" === "undefined") {
						this.buyProducts = [];
						return;
					}
					this.buyProducts = response.data.recdata;
					//计算总价
					let temp = 0;
					this.buyProducts.forEach(function (obj) {
						temp += obj.price * obj.count;
					});
					this.totalPrice = temp;
				}
			});
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

	/*box-shadow: 0px 1px 5px #CCC*/

	.foot
		box-shadow: 0px -1px 1px #CCC
		position: fixed
		bottom: 0
		left: 0
		width: 100%
		.pay_btn
			float: right
</style>
