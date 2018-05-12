<template>
	<div>
		<el-collapse accordion>
			<div v-for="orders_item in orders">
				<el-collapse-item :title="orders_item.state">
					<el-table :data="orders" style="width: 100%">
						<el-table-column prop="orderId" label="订单编号"/>
						<!--<el-table data="accountInfo" label="买家">-->
						<el-table-column prop="accountInfo.name" label="姓名"/>
						<el-table-column prop="accountInfo.phone" label="电话"/>
						<el-table-column prop="accountInfo.address" label="地址"/>
						<!--</el-table>-->
						<el-table :data="orders.orderInfo" label="购买内容" style="width: 100%">
							<el-table-column prop="name" label="名称"/>
							<el-table-column prop="count" label="个数"/>
						</el-table>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
								<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
								</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-collapse-item>
			</div>
		</el-collapse>
	</div>
</template>

<script>
	export default {
		name: "admin_orders",
		data() {
			return {
				orders: [],
			}
		},
		methods: {
			refreshOrder() {
				this.$axios({
					method: "post",
					url: "./api/order/getAll",
				}).then(response => {
					if (response.data.code !== 0) {
						this.$message.error(response.data.recdata.msg);
					} else {
						this.orders = response.data.recdata;
						for (let i in this.orders) {
							this.orders[i].accountInfo = this.str2Obj(this.orders[i].accountInfo);
							this.orders[i].orderInfo = this.str2Obj(this.orders[i].orderInfo);
						}
						console.log(response.data.recdata);
					}
				});
			},
			str2Obj(str) {
				let json = eval('(' + str + ')');
				return json;
			}
		},
		//TODO 获取订单
		created() {
			console.log("admin_orders");
			this.refreshOrder();
		}
	}
</script>

<style scoped>

</style>
