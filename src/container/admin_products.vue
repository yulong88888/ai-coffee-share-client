<template>
	<div>
		<el-button type="primary" @click="addProduct">添加产品</el-button>

		<el-collapse accordion>
			<div v-for="product_item in products">
				<el-collapse-item :title="product_item.name">
					<el-table :data="product_item.product" style="width: 100%">
						<el-table-column prop="nameId" label="产品编号"/>
						<el-table-column prop="name" label="产品名称"/>
						<el-table-column prop="price" label="产品价格"/>
						<el-table-column prop="description" label="产品描述"/>
						<el-table-column prop="info" label="产品信息"/>
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

		<!--<el-table :data="testData" style="width: 100%">-->
		<!--<el-table-column prop="id" label="产品编号"/>-->
		<!--<el-table-column prop="name" label="产品名称"/>-->
		<!--<el-table-column prop="price" label="产品价格"/>-->
		<!--<el-table-column prop="description" label="产品描述"/>-->
		<!--<el-table-column prop="info" label="产品信息"/>-->
		<!--<el-table-column label="操作">-->
		<!--<template slot-scope="scope">-->
		<!--<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
		<!--<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
		<!--</template>-->
		<!--</el-table-column>-->
		<!--</el-table>-->

		<el-dialog title="添加产品" :visible.sync="dialogVisible" width="25%" :close-on-click-modal="false" center>
			<el-form ref="product" :rules="rules" :model="product" status-icon label-width="100px"
					 class="demo-ruleForm">
				<el-form-item label="分组名称" prop="item">
					<el-input v-model="product.item" name="0.0"/>
				</el-form-item>
				<el-form-item label="产品名称" prop="name">
					<el-input v-model="product.name"/>
				</el-form-item>
				<el-form-item label="产品价格" prop="price">
					<el-input v-model.number="product.price"/>
				</el-form-item>
				<el-form-item label="产品描述" prop="description">
					<el-input v-model="product.description"/>
				</el-form-item>
				<el-form-item label="产品信息" prop="info">
					<el-input type="textarea" v-model="product.info"/>
				</el-form-item>
				<el-form-item label="产品图片">
					<el-upload class="upload-demo" ref="uploadPic" :limit="1" action=""
							   :auto-upload="false" :httpRequest="mUpload">
						<el-button size="small" type="primary">选取文件</el-button>
						<div class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="submitProduct">确 定</el-button>
				<el-button @click="dialogVisible = false">取 消</el-button>
  			</span>
		</el-dialog>
	</div>
</template>

<script>
	//用于上传文件的文件随机ID
	let uploadIconData = {};
	let uploadImageData = {};
	export default {
		name: "admin_products",
		data() {
			return {
				dialogVisible: false,
				timeStamps: null,
				products: {},
				product: {
					id: '',
					item: '',
					name: '',
					nameId: '',
					price: '',
					description: '',
					info: '',
					iconLink: '',
					imageLink: '',
				},
				rules: {
					item: [
						{required: true, message: '请输入产品分组名称', trigger: 'blur'},
						{min: 1, max: 10, message: '长度10个字符以内', trigger: 'blur'}
					],
					name: [
						{required: true, message: '请输入产品名称', trigger: 'blur'},
						{min: 1, max: 10, message: '长度10个字符以内', trigger: 'blur'}
					],
					price: [
						{required: true, message: '请输入产品价格', trigger: 'blur'},
						{type: 'number', message: '产品价格必须为数字值'}
					],
					description: [
						{required: true, message: '请输入产品描述', trigger: 'blur'}
					],
					info: [
						{required: true, message: '请输入产品信息', trigger: 'blur'}
					]
				},
				testData: [{
					id: 11111,
					name: "测试数据一",
					price: 10,
					description: "测试数据一 明细",
					info: "测试数据一 明细明细明细明细明细明细明细明细明细明细明细明细明细明细明细明细明细明细明细明细",
				}, {
					id: 11111,
					name: "测试数据一",
					price: 10,
					description: "测试数据一 明细",
					info: "测试数据一 明细明细明细明细明细明细明细明细明细明细明细明细明细明细明细明细明细明细明细明细",
				}, {
					id: 11111,
					name: "测试数据一",
					price: 10,
					description: "测试数据一 明细",
					info: "测试数据一 明细明细明细明细明细明细明细明细明细明细明细明细明细明细明细明细明细明细明细明细",
				}]
			};
		},
		methods: {
			//添加产品的弹窗
			addProduct() {
				this.resetForm();
				this.dialogVisible = true;
				this.product = {};
				this.timeStamps = new Date().getTime();
				uploadIconData = {
					type: "icon",
					uploadId: this.timeStamps
				};
				uploadImageData = {
					type: "image",
					uploadId: this.timeStamps
				};
				console.error(this.product);
			},
			submitProduct() {
				if (this.checkNull("item") || this.checkNull("name") ||
					this.checkNull("price" || this.checkNull("description") ||
						this.checkNull("info"))) {
					this.$message.error('参数有为空的哦，去查查吧');
					return;
				}
				this.dialogVisible = false;
				let url = "";
				if (this.checkNull("nameId")) {
					this.product.nameId = this.timeStamps + "";
					this.product.iconLink = this.timeStamps + "";
					this.product.imageLink = "image_" + this.timeStamps;
					url = "./api/product/add";
					console.log("添加产品", this.product);
				} else {
					url = "./api/product/change";
					console.log("修改产品", this.product);
				}
				//向服务器提交数据
//				this.$axios({
//					method: 'post',
//					headers: {'Content-Type': 'application/json'},
//					url: url,
//					data: this.product,
//				}).then(response => {
//					this.$message.error(response.data.recdata);
//					console.log(response);
//					if (response.data.code === 0) {
//						console.log(response.data);
//					}
//				});

				this.$refs.uploadPic.submit();
				this.product = {};
			},
			handleEdit(index, row) {
				this.resetForm();
				this.timeStamps = new Date().getTime();
				uploadIconData = {
					type: "icon",
					uploadId: this.timeStamps
				};
				uploadImageData = {
					type: "image",
					uploadId: this.timeStamps
				};
				this.product = row;
				this.dialogVisible = true;
			},
			handleDelete(index, row) {
				console.log(index, row);
			},
			//清空编辑框状态
			resetForm() {
				if (this.$refs["product"] == null) {
					return;
				}
				this.$refs["product"].resetFields();
				if (this.$refs["uploadPic"] == null) {
					return;
				}
				this.$refs["uploadPic"].clearFiles();
			},
			checkNull(obj) {
				if (obj in this.product) {
					return false;
				} else {
					return true;
				}
			},
//			getUploadPicUrl() {
//				return "./api/product/add" + "?opneid=" + this.$store.getters.userBaseInfo.openid;
//			},
			mUpload(content) {
				console.log(content);
				console.log(this.product);
				let formData = new FormData();
				formData.append("file", content.file);
				formData.append("data", JSON.stringify(this.product));
				//向服务器提交数据
				let url = "";
				if (this.checkNull("nameId")) {
					url = "./api/product/update" + "?opneid=" + this.$store.getters.userBaseInfo.openid;
				} else {
					url = "./api/product/set" + "?opneid=" + this.$store.getters.userBaseInfo.openid;
				}
				this.$axios({
					method: 'post',
					url: url,
					data: formData,
					headers: {'Content-Type': 'multipart/form-data'}
				}).then(response => {
					this.$message.error(response.data.recdata);
					console.log(response);
					if (response.data.code === 0) {
						console.log(response.data);
					}
				});
			}
		},
		beforeCreate() {
			console.log("admin_product");
			this.$axios({
				method: 'get',
				url: "./api/product/get" + "?opneid=" + this.$store.getters.userBaseInfo.openid,
			}).then(response => {
				console.log(response);
				if (response.data.code === 0) {
					console.log(response.data.recdata);
					this.products = response.data.recdata;
				}
			});
		}
	}
</script>

<style scoped>

</style>
