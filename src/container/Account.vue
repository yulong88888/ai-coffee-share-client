<template>
	<div>
		<div>
			<div class="headImgBG" :style="{backgroundImage: 'url('+avatar+')'}">
			</div>
			<img :src="{avatar}" class="headImg"/>
		</div>
		<el-card class=" small-card">
			<el-row type="flex" class="row-bg" justify="center" style="text-align: center">
				<el-col :span="8">
					<h1 style="font-size: 24px;color: #FF0000">0</h1>
					<div>优惠券</div>
				</el-col>
				<el-col :span="8">
					<h1 style="font-size: 24px;color: #FF0000">0</h1>
					<div style="text-align: center">成长咖啡</div>
				</el-col>
				<el-col :span="8">
					<h1 style="font-size: 24px;color: #FF0000">0</h1>
					<div style="text-align: center">鸡巴豆</div>
				</el-col>
			</el-row>
		</el-card>
		<el-card class="big-card">
			<el-row type="flex" class="row-bg" justify="center">
				<el-col :span="12">
					<div style="text-align: center">我的订单</div>
				</el-col>
				<el-col :span="12">
					<div style="text-align: center">我的咖啡库</div>
				</el-col>
			</el-row>
		</el-card>
		<el-card class="big-card">
			<div class="text item">
				<span class="el-icon-goods"></span>
				<span>兑换咖啡</span>
				<span class="el-icon-arrow-right" style="float: right"></span>
			</div>
			<hr/>
			<div class="text item">
				<span class="el-icon-share"></span>
				<span>请咖啡记录</span>
				<span class="el-icon-arrow-right" style="float: right"></span>
			</div>
			<hr/>
			<div class="text item">
				<span class="el-icon-star-off"></span>
				<span>咖啡福袋</span>
				<span class="el-icon-arrow-right" style="float: right"></span>
			</div>
			<hr/>
			<div class="text item">
				<span class="el-icon-tickets"></span>
				<span>咖啡库明细</span>
				<span class="el-icon-arrow-right" style="float: right"></span>
			</div>
			<hr/>
			<div class="text item">
				<span class="el-icon-more"></span>
				<span>更多</span>
				<span class="el-icon-arrow-right" style="float: right"></span>
			</div>
		</el-card>
	</div>
</template>

<script>
	import global from "../store/index"

	export default {
		name: "user",
		data() {
			avatar = null;
		},
		created() {
			console.log("UserUI");
			avatar = global.userbaseInfo.headimgurl;
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.headImgBG
		background-repeat: no-repeat
		background-size: 100% 100%
		height: 200px
		filter: blur(10px)

	.headImg
		width: 128px
		height: 128px
		margin: auto
		position: absolute
		top: 0
		left: 0
		right: 0
		border-radius: 50%
		padding-top: 30px

	.small-card
		width: 100%
		margin-top: -40px

	.big-card
		width: 100%
		margin-top: 6px
		.text
			font-size: 14px
		.item
			padding: 6px 0px 6px 0px
</style>
