<template>
	<el-row class="index">
		<el-card :body-style="{ padding: '0px' }">
			<img :src="cardDialogObj.image" class="image">
			<div style="padding: 14px;">
				<span>{{cardDialogObj.name}}</span>
				<div class="bottom clearfix">
					<span class="info">{{ cardDialogObj.info }}</span>
				</div>
			</div>
		</el-card>
	</el-row>
</template>

<script>
	import ElRow from "element-ui/packages/row/src/row";

	export default {
		components: {ElRow},
		name: "card",
		props: {
			cardDialogObj: {}
		},
		data() {
			return {
				currentDate: new Date()
			};
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.index
		.el-card
			border: 0

	.info
		font-size: 13px
		color: #999

	.bottom
		margin-top: 13px
		line-height: 12px

	.image
		width: 100%
		display: block

	.clearfix:before,
	.clearfix:after
		display: table
		content: ""

	.clearfix:after
		clear: both
</style>

