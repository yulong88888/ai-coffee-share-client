<template>
	<div>
		<!--初始化控件，目前没有找到调用comuted从store获取数据的方法-->
		<div v-show="false">{{storeBaseInfo}}</div>
		<div>
			<el-form ref="baseInfo" :rules="baseInfoRules" :model="baseInfo" status-icon label-width="100px"
					 class="demo-ruleForm">
				<el-form-item label="配送费" prop="deliveryPrice">
					<el-input v-model.number="baseInfo.deliveryPrice"/>
				</el-form-item>
				<el-form-item label="起送费" prop="minPrice">
					<el-input v-model.number="baseInfo.minPrice"/>
				</el-form-item>
				<el-form-item label="轮播图">
					<el-col :span="4" v-for="(img,index) in baseInfo.imgDatas" :key="img" :offset="1">
						<el-card :body-style="{ padding: '0px' }">
							<img :src="img" class="image">
							<div style="padding: 6px;float: right">
								<div class="bottom">
									<el-button type="text" class="button" @click="handlerDelete(index)">删除</el-button>
								</div>
							</div>
						</el-card>
					</el-col>
				</el-form-item>
			</el-form>
			<el-button type="primary" @click="handlerSubmit">保存</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "admin_baseinfo",
		data() {
			return {
				baseInfo: {},
				baseInfoBackup: {},
				baseInfoRules: {
					deliveryPrice: [
						{required: true, message: '请输入配送费价格', trigger: 'blur'},
						{type: 'number', message: '产品价格必须为数字值'}
					],
					minPrice: [
						{required: true, message: '请输入起送费价格', trigger: 'blur'},
						{type: 'number', message: '产品价格必须为数字值'}
					],
				},
			}
		},
		methods: {
			handlerSubmit() {
				console.log(this.baseInfo);
			},
			handlerDelete(index) {
				console.log(index);
				this.baseInfoBackup = this.$store.getters.baseInfo;
				console.error(this.baseInfoBackup);
				let temp = this.baseInfoBackup.imgDatas;
				temp.splice(index, 1);
				console.error(temp);
			}
		},
		computed: {
			storeBaseInfo() {
				console.log("--->>>", this.$store.getters);
				this.baseInfo = this.$store.getters.baseInfo;
				return this.$store.getters.baseInfo;
			},
		},
	}
</script>

<style>
	.image {
		width: 100%;
		height: 100%;
		display: block;
	}
</style>
