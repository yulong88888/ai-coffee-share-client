<template>
	<el-container class="wrapper">
		<el-header style="height: 80px;background-color: rgb(64,158,255)">
			<img class="header-logo" alt="Logo"/>
		</el-header>
		<el-container class="menu">
			<el-aside width="300px" class="menu">
				<ul role="menubar" class="el-menu">
					<li role="menuitem" tabindex="1" class="el-menu-item" style="padding-left: 20px;"
						@click="handleItem(0)" :class="itemActive===0?'is-active':''">商品管理
					</li>
					<li role="menuitem" tabindex="2" class="el-menu-item" style="padding-left: 20px;"
						@click="handleItem(1)" :class="itemActive===1?'is-active':''">订单管理
					</li>
					<li role="menuitem" tabindex="3" class="el-menu-item" style="padding-left: 20px;"
						@click="handleItem(2)" :class="itemActive===2?'is-active':''">用户管理
					</li>
				</ul>
			</el-aside>
			<el-main>
				<admin_products v-if="itemActive===0"/>
				<admin_orders v-if="itemActive===1"/>
				<admin_users v-if="itemActive===2"/>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import Admin_products from "./admin_products";
	import Admin_orders from "./admin_orders";
	import Admin_users from "./admin_users";

	export default {
		components: {
			Admin_users,
			Admin_orders,
			Admin_products
		},
		name: "admin",
		data() {
			return {
				itemActive: 0
			}
		},
		methods: {
			handleItem(tabindex) {
				this.itemActive = tabindex;
			}
		}
	}
</script>

<style scoped>
	.wrapper {
		height: 100%;
	}

	.header-logo {
		display: inline-block;
		vertical-align: middle;
		padding-top: 30px;
	}

	.menu {
		height: 100%;
	}

	.el-menu {
		height: 100%;
	}
</style>
