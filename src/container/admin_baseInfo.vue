<template>
	<div>
		<el-form ref="baseInfo" :rules="baseInfoRules" :model="baseInfo" status-icon label-width="100px"
				 class="demo-ruleForm">
			<el-form-item label="配送费" prop="deliveryPrice">
				<el-input v-model.number="baseInfo.deliveryPrice" @blur="onBlur"/>
			</el-form-item>
			<el-form-item label="起送费" prop="minPrice">
				<el-input v-model.number="baseInfo.minPrice" @blur="onBlur"/>
			</el-form-item>
			<el-upload class="upload-demo" :multiple="false" ref="uploadPic" action=""
					   :httpRequest="uploadFile">
				<el-button size="small" type="primary">上传轮播图</el-button>
				<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>
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
	</div>
</template>

<script>
	import {mapState} from 'vuex';

	export default {
		name: "admin_baseinfo",
		data() {
			return {
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
			onBlur() {
				console.log(this.baseInfo);
				let formData = new FormData();
				formData.append("deliveryPrice", this.baseInfo.deliveryPrice);
				formData.append("minPrice", this.baseInfo.minPrice);
				this.$axios({
					method: 'post',
					url: "./api/baseInfo/update",
					data: formData,
					headers: {'Content-Type': 'multipart/form-data'}
				}).then(response => {
					console.log("删除图片的服务器回调", response);
					if (response.data.code === 0) {
						this.$message({
							message: response.data.recdata.msg,
							type: 'success'
						});
						this.refreshBaseInfo();
					} else {
						this.$message.error(response.data.recdata.msg);
					}
				});
			},
			handlerDelete(index) {
				console.log(index);
				this.baseInfoBackup = this.$store.getters.baseInfo;
				let temp = this.baseInfoBackup.imgDatas;
				temp.splice(index, 1);
				console.error(temp);
				let formData = new FormData();
				formData.append("index", index);
				this.$axios({
					method: 'post',
					url: "./api/baseInfo/deleteImg",
					data: formData,
					headers: {'Content-Type': 'multipart/form-data'}
				}).then(response => {
					console.log("删除图片的服务器回调", response);
					if (response.data.code === 0) {
						this.$message({
							message: response.data.recdata.msg,
							type: 'success'
						});
						this.refreshBaseInfo();
					} else {
						this.$message.error(response.data.recdata.msg);
					}
				});
			},
			uploadFile(content) {
				//向服务器提交数据
				console.log("上传文件的内容", content);
				let formData = new FormData();
				formData.append("file", content.file);
				this.$axios({
					method: 'post',
					url: "./api/baseInfo/uploadImg",
					data: formData,
					headers: {'Content-Type': 'multipart/form-data'}
				}).then(response => {
					console.log("上传图片的服务器回调", response);
					if (response.data.code === 0) {
						this.$message({
							message: response.data.recdata.msg,
							type: 'success'
						});
						this.refreshBaseInfo();
					} else {
						this.$message.error(response.data.recdata.msg);
					}
				});
			},
			refreshBaseInfo() {
				//获取设置商户基本信息
				this.$axios.get("./api/baseInfo/get" + "?openId=" + this.$store.getters.userBaseInfo.openid).then(response => {
					if (response.data.code === 0) {
						console.log(response.data.recdata);
						this.$store.dispatch('setBaseInfo', response.data.recdata);
					}
				});
			}
		},
		computed: {
			...mapState({
				baseInfo: 'baseInfo'
			}),
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
