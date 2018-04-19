<template>
	<div>
		<div class="products">
			<div class="menu-wrapper" ref="menuWrapper">
				<ul>
					<li v-for="item in products" class="menu-item">
						<span class="text border-1px">{{item.name}}</span>
					</li>
				</ul>
			</div>
			<div class="product-wrapper" ref="productWrapper">
				<ul>
					<li v-for="products_item in products">
						<h1 class="title">{{products_item.name}}</h1>
						<ul>
							<li v-for="product in products_item.product" class="product-item">
								<div class="icon">
									<img width="57" height="57" :src="product.icon">
								</div>
								<div class="content">
									<h2 class="name">{{product.name}}</h2>
									<p class="desc">{{product.description}}</p>
									<div class="price">
										<span>￥{{product.price}}</span>
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';

	export default {
		name: "products",
		props: ['products'],
		method: {
			initScroll() {
				this.meunScroll = new BScroll(this.$refs.menuWrapper, {
					click: true
				});

				this.foodsScroll = new BScroll(this.$refs.productWrapper, {
					click: true,
					probeType: 3
				});

				this.foodsScroll.on('scroll', (pos) => {
					// 判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）
					if (pos.y <= 0) {
						this.scrollY = Math.abs(Math.round(pos.y));
					}
				});
			}
		}, created() {
			this.$nextTick(() => {
				this.initScroll();
			});
		}
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
			.menu-item
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

	.product-wrapper
		flex: 1
		.title
			padding-left: 14px
			height: 26px
			line-height: 26px
			border-left: 2px solid #d9dde1
			font-size: 12px
			color: rgb(147, 153, 159)
			background: #f3f5f7
		.product-item
			display: flex
			margin: 18px
			padding-bottom: 18px
			border-1px(rgba(7, 17, 27, 0.1))
			&:last-child
				border-none()
				margin-bottom: 0
			.icon
				flex: 0 0 57px
				margin-right: 10px
			.content
				flex: 1
				.name
					margin: 2px 0 8px 0
					height: 14px
					line-height: 14px
					font-size: 14px
					color: rgb(7, 17, 27)
				.desc
					line-height: 12px
					margin-bottom: 8px
				.price
					font-weight: 700
					line-height: 24px
					margin-right: 8px
					font-size: 14px
					color: rgb(240, 20, 20)
</style>
