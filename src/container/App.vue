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
				alert("Code Error");
				// let myAuthLink = "https://www.lengmang.net/ai-coffee-share/" + this.$route.path;
				// window.location.href = myAuthLink;
			} else {
				//获取设置用户基本信息
				this.$store.dispatch('setUserBaseInfo', code);
				console.log("yeah");
				this.$axios({
					method: 'post',
					url: "./getUserBaseInfo",
					params: {
						"code": code,
					}
				}).then(response => {
					console.log(response.data.recdata);
					this.$store.dispatch('setUserBaseInfo', response.data.recdata);
				});
			}
		}
	}
</script>
