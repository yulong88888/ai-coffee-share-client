<template>
	<div>
		<img :src="imgURL">
		<div>{{imgURL}}</div>
		<button @click="increment">++++++++</button>
		<button @click="decrement">--------</button>
		<div>{{count}}</div>
	</div>
</template>

<script>
	export default {
		name: "test",
		computed: {
			imgURL() {
				return this.$store.getters.userBaseInfo.headimgurl;
			},
			count() {
				return this.$store.state.count
			}
		},
		created() {
			console.log("测试界面");
			console.log(this.$store.state.userbaseInfo);
		},
		methods: {
			increment() {
				console.log("++++");
				this.$store.commit('increment')
			},
			decrement() {
				console.log("----");
				this.$store.commit('decrement')
			}
		}
	}
</script>

<style scoped>

</style>
