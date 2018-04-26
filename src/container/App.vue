<template>
	<router-view/>
</template>

<script>
	export default {
		beforeCreate() {
			console.log("获取用户基本数据");
			console.log(this.$route.query);
			let code = this.$route.query.code;
			if (code == null) {
				alert("Error");
				// let myAuthLink = "https://www.lengmang.net/ai-coffee-share/" + this.$route.path;
				// window.location.href = myAuthLink;
			} else {
				console.log("yeah");
				this.$axios({
					method: 'post',
					url: "./getBaseInfo",
					params: {
						"code": code,
					}
				}).then(response => {
					console.log(response.data.recdata);
					this.$store.dispatch('setUserBaseInfo', response.data.recdata);
					this.$store.dispatch('test');
					//console.log(global.userBaseInfo);
				});
			}
		}
	}
</script>
