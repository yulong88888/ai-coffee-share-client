<template>
	<div>
		<div class="products">
			<div class="menu-wrapper" ref="menuWrapper">
				<ul>
					<li v-for="(item,index) in products" class="menu-item" :class="{'current':currentIndex===index}"
						@click="selectMenu(index,$event)" ref="menuList">
						<span class="text border-1px">{{item.name}}</span>
					</li>
				</ul>
			</div>
			<div class="product-wrapper" ref="productWrapper">
				<ul>
					<li v-for="products_item in products" ref="productList">
						<h1 class="title">{{products_item.name}}</h1>
						<ul>
							<li v-for="product in products_item.product" class="product-item" @click="mTest(product)">
								<div class="icon">
									<img width="57" height="57" :src="product.icon">
								</div>
								<div class="content">
									<h2 class="name">{{product.name}}</h2>
									<p class="desc">{{product.description}}</p>
									<div class="price">
										<span>￥{{product.price}}</span>
									</div>
									<div class="cartcontrol-wrapper">
										<cartcontrol @add="addProduct" :product="product"></cartcontrol>
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<shopcart ref="shopcart" :select-products="selectProducts" :delivery-price="basic.deliveryPrice"
					  :min-price="basic.minPrice"></shopcart>
		</div>
		<el-dialog :visible.sync="cardDialogVisible" width="85%" :show-close="false"
				   custom-class="mDialog">
			<card :card-dialog-obj="cardDialogObj"></card>
		</el-dialog>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import shopcart from "../shopcart/shopcart";
	import Cartcontrol from "../cartcontrol/cartcontrol";
	import ElDialog from "../../../node_modules/element-ui/packages/dialog/src/component.vue";
	import Card from "../card/card.vue";

	let isNoBegin = true;

	export default {
		components: {
			Card,
			ElDialog,
			Cartcontrol,
			shopcart
		},
		name: "products",
		props: ['basic'],
		data() {
			return {
				products: [],
				buyProducts: [],
				listHeight: [],
				scrollY: 0,
				cardDialogVisible: false,
				cardDialogObj: {}
			};
		},
		computed: {
			currentIndex() {
				for (let i = 0; i < this.listHeight.length; i++) {
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i + 1];
					if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
						this._followScroll(i);
						return i;
					}
				}
				return 0;
			},
			selectProducts() {
				let products = [];
				this.products.forEach((product) => {
					product.product.forEach((p) => {
						if (p.count) {
							console.error("0.0.0.0", p);
							products.push(p);
						}
					});
				});
				return products;
			}
		},
		methods: {
			_initScroll() {
				this.meunScroll = new BScroll(this.$refs.menuWrapper, {
					click: true
				});

				this.productsScroll = new BScroll(this.$refs.productWrapper, {
					click: true,
					probeType: 3
				});

				this.productsScroll.on('scroll', (pos) => {
					// 判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）
					if (pos.y <= 0) {
						this.scrollY = Math.abs(Math.round(pos.y));
					}
				});
			},
			_calculateHeight() {
				let productList = this.$refs.productList;
				let height = 0;
				this.listHeight.push(height);
				for (let i = 0; i < productList.length; i++) {
					let item = productList[i];
					height += item.clientHeight;
					this.listHeight.push(height);
				}
			},
			_followScroll(index) {
				let menuList = this.$refs.menuList;
				let el = menuList[index];
				this.meunScroll.scrollToElement(el, 300, 0, -100);
			},
			selectMenu(index, event) {
				if (!event._constructed) {
					return;
				}
				let productList = this.$refs.productList;
				let el = productList[index];
				this.productsScroll.scrollToElement(el, 300);
			},
			addProduct(target) {
				this._drop(target);
			},
			_drop(target) {
				// 体验优化,异步执行下落动画
				this.$nextTick(() => {
					this.$refs.shopcart.drop(target);
				});
			},
			mTest(obj) {
				this.cardDialogVisible = true;
				this.cardDialogObj = obj;
				console.log(obj.image);
				console.log(obj.info);
				console.log(this.cardDialogObj);
			}
		},
		created() {
			// // 获取购买的东西
			// this.$axios.post("./api/shopCart/get").then(response => {
			// 	if (response.data.code === 0) {
			// 		console.log("加载服务器Session商品", response.data.recdata);
			// 		if (typeof (response.data.recdata) + "" === "undefined") {
			// 			this.buyProducts = [];
			// 			return;
			// 		}
			// 		this.buyProducts = response.data.recdata;
			// 	}
			// });

			//获取设置产品基本信息
			this.$axios.get("./api/product/get").then(response => {
				if (response.data.code === 0) {
					console.log(response.data.recdata);
					this.products = response.data.recdata;
					this.$nextTick(() => {
						this._initScroll();
						this._calculateHeight();
					});
				}
			});

			//console.log("isNoBegin", isNoBegin);
			// this.$nextTick(() => {
			// 	this._initScroll();
			// 	this._calculateHeight();
			// });
		},
		// beforeUpdate() {
		// 	console.log("isNoBegin", isNoBegin);
		// 	if (isNoBegin) {
		// 		this.$nextTick(() => {
		// 			this._initScroll();
		// 			this._calculateHeight();
		// 		});
		// 		isNoBegin = false;
		// 	}
		// },
		beforeDestroy() {
			isNoBegin = true;
			console.log("beforeDestroy", isNoBegin);
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
				&.current
					position: relative
					z-index: 10
					margin-top: -1px
					background: #fff
					font-weight: 700
					.text
						border-none()
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
					font-size: 10px
					color: rgb(147, 153, 159)
				.price
					font-weight: 700
					line-height: 24px
					margin-right: 8px
					font-size: 14px
					color: rgb(240, 20, 20)
				.cartcontrol-wrapper
					position: absolute
					right: 0
					bottom: 12px

	.mDialog
		.el-dialog__header
			padding: 0
		.el-dialog__body
			padding: 0
</style>
