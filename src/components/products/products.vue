<template>
	<div>
		<div class="products">
			<div class="menu-wrapper">
				<ul>
					<li v-for="item in data_products" class="menu_item">
						<span class="text border-1px">{{item.name}}</span>
					</li>
				</ul>
			</div>
			<div class="goods-wrapper" ref="foodsWrapper"></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "products",
		props: ['data_products'],
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"

	.products
		display: flex
		position: absolute
		top: 150px
		bottom: 46px
		width: 100%
		overflow: hidden
		.menu-wrapper
			flex: 0 0 80px
			width: 80px
			background: #f3f5f7
			.menu_item
				display: table
				height: 54px
				width: 56px
				padding: 0 12px
				line-height: 14px
				.text
					display: table-cell
					width: 56px
					vertical-align: middle
					border-1px(rgba(7, 17, 27, 0.1))
					font-size: 12px

	.goods-wrapper
		flex: 1
</style>
