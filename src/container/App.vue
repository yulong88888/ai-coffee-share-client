<template>
	<router-view/>
</template>

<script>
	import global from "../store/index"

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
					url: "./api/getBaseInfo",
					params: {
						"code": code,
					}
				}).then(response => {
					global.userbaseInfo = response.data.recdata;
					console.log(global.userbaseInfo);
				});
			}
		}
	}
</script>
