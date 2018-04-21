<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="cart-decrease" v-show="product.count>0" @click.stop.prevent="decreaseCart">
				<span class="inner icon-remove_circle_outline"></span>
			</div>
		</transition>
		<div class="cart-count" v-show="product.count>0">{{product.count}}</div>
		<div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
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
				this.$emit('add', event.target);
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
		font-size: 0
		.cart-decrease
			display: inline-block
			padding: 6px
			opacity: 1
			transform: translate3d(0, 0, 0)
			.inner
				display: inline-block
				line-height: 24px
				font-size: 24px
				color: rgb(255, 128, 0)
				transition: all 0.4s linear
				transform: rotate(0)
			&.move-enter-active, &.move-leave-active
				transition: all 0.4s linear
			&.move-enter, &.move-leave-active
				opacity: 0
				transform: translate3d(24px, 0, 0)
				.inner
					transform: rotate(180deg)
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
			padding: 6px
			line-height: 24px
			font-size: 24px
			color: rgb(255, 128, 0)
</style>
