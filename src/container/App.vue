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
					console.log(response.data);
				});
			}
			// let str = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx848ed0495a468c9f&redirect_uri=https%3a%2f%2fwww.lengmang.net%2fai-coffee-share%2fapi%2fgetBaseInfo&response_type=code&scope=snsapi_userinfo&#wechat_redirect";
			// let str = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx848ed0495a468c9f&redirect_uri=https%3a%2f%2fwww.lengmang.net%2fai-coffee-share%2f&response_type=code&scope=snsapi_userinfo&#wechat_redirect";
			// window.location.href = str;
			// this.$router.back();
			// this.$axios.get("https://www.lengmang.net/ai-coffee-share/getRedirect").then(response => {
			// 	console.log(response.data);
			// 	if (response.data.code === 0) {
			// 		window.location.href = str;
			// 	}
			// });
		}
	}
</script>
