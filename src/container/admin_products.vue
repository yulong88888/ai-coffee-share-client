<template>
	<div>
		<el-button type="primary" @click="addProduct">添加产品</el-button>

		<el-collapse accordion>
			<el-collapse-item title="反馈 Feedback">
				<el-table :data="testData" style="width: 100%">
					<el-table-column prop="id" label="产品编号"/>
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
		</el-collapse>

		<el-table :data="testData" style="width: 100%">
			<el-table-column prop="id" label="产品编号"/>
			<el-table-column prop="name" label="产品名称"/>
			<el-table-column prop="price" label="产品价格"/>
			<el-table-column prop="description" label="产品描述"/>
			<el-table-column prop="info" label="产品信息"/>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

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
				<el-form-item label="产品小图">
					<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :limit="1"
							   :auto-upload="false">
						<el-button size="small" type="primary">选取文件</el-button>
						<span class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</span>
					</el-upload>
				</el-form-item>
				<el-form-item label="产品大图">
					<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :limit="1"
							   :auto-upload="false">
						<el-button size="small" type="primary">选取文件</el-button>
						<span class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</span>
					</el-upload>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
				<el-button @click="dialogVisible = false">取 消</el-button>
  			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: "admin_products",
		data() {
			return {
				dialogVisible: false,
				product: {
					item: '',
					name: '',
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
			addProduct() {
				this.resetForm();
				this.dialogVisible = true;
				this.product = {};
				console.error(this.product);
			},
			handleEdit(index, row) {
				this.resetForm();
				this.product = row;
				console.log(index, row);
				console.error(this.product);
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
			}
		}
	}
</script>

<style scoped>

</style>
