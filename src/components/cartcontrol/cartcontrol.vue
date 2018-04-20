<template>
	<div class="cartcontrol">
		<div class="cart-decrease icon-remove_circle_outline" @click="decreaseCart" v-show="product.count>0"></div>
		<div class="cart-count" v-show="product.count>0">{{product.count}}</div>
		<div class="cart-add icon-add_circle" @click="addCart"></div>
	</div>
</template>

<script>
	import Vue from 'vue';

	export default {
		name: "cartcontrol",
		props: {
			product: {
				type: Object
			}
		},
		methods: {
			addCart(event) {
				if (!event._constructed) {
					return;
				}
				if (!this.product.count) {
					Vue.set(this.product, 'count', 1);
				} else {
					this.product.count++;
				}
			},
			decreaseCart(event) {
				if (!event._constructed) {
					return;
				}
				if (this.product.count) {
					this.product.count--;
				}
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.cartcontrol
		font-size 0
		.cart-decrease, .cart-add
			display: inline-block
			padding: 6px
			font-size 24px
			line-height: 24px
			color: rgb(0, 160, 220)
		.cart-count
			display: inline-block
			vertical-align: top
			width: 12px
			padding-top: 6px
			line-height: 24px
			text-align: center
			font-size: 10px
			color: rgb(147, 153, 159)
		.cart-add
			display: inline-block


</style>
