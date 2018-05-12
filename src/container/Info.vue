<template>
	<div>
		<el-container>
			<el-main>
				<div v-for="(obj,index) in infos" :key="index" style="padding: 12px 0" @click="selectInfo(obj)">
					<el-card class="box-card text item">
						<el-row :gutter="20">
							<el-col :span="20">
								<div class="grid-content bg-purple">
									<div>姓名:{{obj.name }}</div>
									<div>电话:{{obj.phone }}</div>
									<div>地址:{{obj.address }}</div>
								</div>
							</el-col>
							<el-col :span="4">
								<span><i class="el-icon-edit button"
										 @click.stop.prevent="alertDialog(obj,index)"></i></span>
							</el-col>
						</el-row>
						<i class="el-icon-delete button" @click.stop.prevent="deleteInfo(index)"></i>
					</el-card>
				</div>
			</el-main>
			<el-footer class="foot">
				<div style="margin-top: 10px">
					<el-button class="pay_btn" type="success" @click="alertDialog(null,-1)">添加信息</el-button>
				</div>
			</el-footer>
		</el-container>
		<el-dialog title="添加信息" :visible.sync="dialogVisible" width="95%" class="demo-ruleForm" center
				   :before-close="dialogClose">
			<el-form ref="infoForm" :model="infoForm" :rules="rules" class="demo-ruleForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="infoForm.name" prop="name"/>
				</el-form-item>
				<el-form-item label="电话" prop="phone">
					<el-input v-model="infoForm.phone" prop="phone"/>
				</el-form-item>
				<el-form-item label="住址" prop="address">
					<el-input v-model="infoForm.address" prop="address"/>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="submitInfo">确 定</el-button>
  			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: "user_delivery_info",
		data() {
			return {
				//修改数据索引
				index: -1,
				//服务器数据
				infos: [],
				//表格内容
				infoForm: {
					name: '',
					phone: '',
					address: ''
				},
				//弹窗开关
				dialogVisible: false,
				//校验规则
				rules: {
					name: [
						{required: true, message: '请输入姓名', trigger: 'blur'},
					],
					phone: [
						{required: true, message: '请输入电话', trigger: 'blur'},
					],
					address: [
						{required: true, message: '请输入地址', trigger: 'blur'}
					]
				},
			}
		},
		methods: {
			alertDialog(obj, index) {
				if (obj != null) {
					this.infoForm = obj;
				} else {
					this.infoForm = {
						name: '',
						phone: '',
						address: ''
					};
				}
				this.index = index;
				this.dialogVisible = true;
				//清空消息提示列表
				if (this.$refs["infoForm"] != null) {
					this.$refs["infoForm"].resetFields();
				}
			},
			//TODO 删除数据
			deleteInfo(index) {
				console.log("delete" + index);
				this.$axios({
					method: "post",
					url: "./api/account/delete",
					data: {
						index: index
					}
				}).then(response => {
					if (response.data.code !== 0) {
						this.$message.error(response.data.recdata.msg);
					} else {
						this.refreshInfo();
					}
				});
			},
			//TODO 页面参数跳转
			selectInfo(obj) {
				console.log("select", obj);
				this.$router.push({
					path: '/order',
					query: obj
				});
			},
			submitInfo() {
				console.log(this.infoForm);
				if ((this.infoForm.name === null || this.infoForm.name === "") ||
					(this.infoForm.phone === null || this.infoForm.phone === "") ||
					(this.infoForm.address === null || this.infoForm.address === "")) {
					this.$message.error("数据有为空的哦，请仔细检查");
					return;
				}
				//TODO 增加和更新数据
				if (this.index !== -1) {
					console.log("修改了数据", this.index, this.infoForm);
					this.$axios({
						method: "post",
						url: "./api/account/update",
						data: {
							index: this.index,
							accountInfo: this.infoForm
						}
					}).then(response => {
						if (response.data.code !== 0) {
							this.$message.error(response.data.recdata.msg);
						} else {
							this.refreshInfo();
						}
						this.dialogVisible = false;
					});
				} else {
					console.log("添加了数据", this.index, this.infoForm);
					this.$axios({
						method: "post",
						url: "./api/account/set",
						data: {
							accountInfo: this.infoForm
						}
					}).then(response => {
						if (response.data.code !== 0) {
							this.$message.error(response.data.recdata.msg);
						} else {
							this.refreshInfo();
						}
						this.dialogVisible = false;
					});
				}
				this.index = -1;
			},
			dialogClose() {
				this.dialogVisible = false;
				this.index = -1;
				this.refreshInfo();
			},
			refreshInfo() {
				//TODO 获取用户数据
				this.$axios.post("./api/account/getAccountInfo").then(response => {
					if (response.data.code === 0) {
						console.log("加载服务器保存的用户信息", response.data.recdata);
						if (typeof (response.data.recdata) + "" === "undefined") {
							this.infos = [];
							return;
						}
						this.infos = response.data.recdata;
					}
				});
			}
		},
		created() {
			// 获取存储的数据
			this.refreshInfo();
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.text
		font-size: 14px

	.item
		padding: 18px 0

	.button
		padding: 0
		float: right
		font-size: 24px

	.foot
		box-shadow: 0px -1px 1px #CCC
		position: fixed
		bottom: 0
		left: 0
		width: 100%
		.pay_btn
			width: 100%
</style>
