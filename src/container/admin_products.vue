<template>
	<div>
		<el-button type="primary" @click="handlerAdd">添加产品</el-button>

		<el-collapse accordion>
			<div v-for="product_item in products">
				<el-collapse-item :title="product_item.name">
					<el-table :data="product_item.product" style="width: 100%">
						<el-table-column prop="nameId" label="产品编号"/>
						<el-table-column label="产品图片">
							<template slot-scope="scope">
								<img :src="scope.row.icon" width="100" height="100"/>
							</template>
						</el-table-column>
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

		<el-dialog title="添加产品" :visible.sync="dialogVisible" width="25%" :close-on-click-modal="false"
				   :before-close="dialogClose" center>
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
							   :auto-upload="false" :httpRequest="mUpload" :file-list="fileList" :on-change="onChange">
						<el-button size="small" type="primary">选取文件</el-button>
						<div class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="handlerSubmit">确 定</el-button>
  			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: "admin_products",
		data() {
			return {
				fileList: [],
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
					icon: '',
					image: '',
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
			};
		},
		methods: {
			//添加产品的弹窗
			handlerAdd() {
				this.resetForm();
				this.dialogVisible = true;
				this.product = {};
				this.timeStamps = new Date().getTime();
				this.fileList = [];
				console.log("添加产品弹窗", this.product);
			},
			//向服务器提交修改的产品数据
			handlerSubmit() {
				if (this.checkNull("item") || this.checkNull("name") ||
					this.checkNull("price" || this.checkNull("description") ||
						this.checkNull("info"))) {
					this.$message.error('参数有为空的哦，去查查吧');
					return;
				}
				if (this.fileList.length === 0) {
					this.$message.error('没有选择图片文件哦，去查查吧');
					return;
				}
				this.dialogVisible = false;
				this.$refs.uploadPic.submit();
				this.product = {};
				this.refreshProducts();
			},
			//编辑产品
			handleEdit(index, row) {
				console.log("产品编辑", row);
				this.resetForm();
				this.timeStamps = new Date().getTime();
				this.product = row;
				this.dialogVisible = true;
			},
			//TODO 删除产品
			handleDelete(index, row) {
				console.log(index, row);
				this.$axios({
					method: 'post',
					headers: {'Content-Type': 'application/json'},
					url: './api/product/delete',
					data: row,
				}).then(response => {
					console.log("删除产品", response);
					if (response.data.code === 0) {
						this.$message({
							message: response.data.recdata.msg,
							type: 'success'
						});
						this.refreshProducts();
					} else {
						this.$message.error(response.data.recdata.msg);
					}
				});
			},
			//清空编辑框状态
			resetForm() {
				//清空消息提示列表
				if (this.$refs["product"] == null) {
					return;
				}
				this.$refs["product"].resetFields();
				//清空文件列表
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
			//TODO 上传文件控件直接处理产品数据
			mUpload(content) {
				//向服务器提交数据
				let url = "";
				if (this.checkNull("nameId")) {
					console.log("添加产品", this.product);
					this.product.nameId = this.timeStamps;
					url = "./api/product/set";
				} else {
					console.log("修改产品", this.product);
					url = "./api/product/update";
				}
				console.log("上传文件的内容", content);
				console.log("提交的数据", this.product);
				let formData = new FormData();
				formData.append("file", content.file);
				formData.append("data", JSON.stringify(this.product));
				this.$axios({
					method: 'post',
					url: url,
					data: formData,
					headers: {'Content-Type': 'multipart/form-data'}
				}).then(response => {
					console.log("添加、修改产品", response);
					if (response.data.code === 0) {
						this.$message({
							message: response.data.recdata.msg,
							type: 'success'
						});
						this.refreshProducts();
					} else {
						this.$message.error(response.data.recdata.msg);
					}
				});
			},
			//文件状态改变时
			onChange(file, fileList) {
				console.log("文件选择回调函数", file, fileList);
				if (file.raw.type !== "image/png" && file.raw.type !== "image/jpeg") {
					this.$message.error("文件类型有误哦，亲");
					//清空文件列表
					this.$refs["uploadPic"].clearFiles();
					return;
				}
				this.fileList = fileList;
			},
			//TODO 刷新产品列表，UI也会更新
			refreshProducts() {
				this.$axios({
					method: 'get',
					url: "./api/product/get",
				}).then(response => {
					console.log("刷新产品", response);
					if (response.data.code === 0) {
						console.log(response.data.recdata);
						this.products = response.data.recdata;
					}
				});
			},
			//关闭弹窗
			dialogClose() {
				this.dialogVisible = false;
				this.refreshProducts();
			}
		},
		created() {
			console.log("admin_product");
			this.refreshProducts();
		}
	}
</script>

<style scoped>

</style>
