<template>
	<div class="page">
		<div class="top" @click="$toPage('/login/register')">{{$t('login').j1}}</div>
		<div class="title">{{$t('login').j2}}</div>
		<div class="name">{{$t('login').j3}}</div>
		<div class="box">
			<input :placeholder="$t('login').j4" v-model="phone" maxlength="11" type="number" />
			<div @click="phone=''">&times;</div>
		</div>
		<div class="name">{{$t('login').j5}}</div>
		<div class="box">
			<input v-if="show" :placeholder="$t('login').j6" v-model="password" type="text" />
			<input v-else :placeholder="$t('login').j6" v-model="password" type="password" />
			<img src="../../assets/skin/login/look.png?2" v-if="show" @click="show=false" />
			<img src="../../assets/skin/login/unlook.png" v-else @click="show=true" />
		</div>
		<div class="tip" @click="clickKefu">{{$t('login').j7}}</div>
		<div class="big_btn" @click="login">{{$t('login').j8}}</div>
		<!--点击按钮加载效果组件 -->
		<loading ref="loading" />
	</div>
</template>
<script>
	import store from "@/store";

	export default {
		name: "login",
		data() {
			return {
				show: false,
				phone: "",
				password: "",
			};
		},
		mounted(){
			this.phone = localStorage.getItem("account");
			this.password = localStorage.getItem("pwd");
		},
		methods: {
			async login() {
				if (!this.phone) {
					this.$toast(this.$t('login').j4);
					return;
				}
				if (!this.password) {
					this.$toast(this.$t('login').j6);
					return;
				}
				let data = {
					account: this.phone,
					password: this.password,
				};

				this.$refs.loading.open(); //开启加载
				const res = await this.$server.post("/user/login", data);
				this.$refs.loading.close(); //关闭加载
				if (res.status == 1) {
					this.$toast(this.$t(res.msg));
					// 登录时首次，赋值token
					this.$server.defaults.headers.token = res.data.token;
					this.$server.defaults.headers.account = res.data.account;
					localStorage.setItem("tokend", res.data.token);
					localStorage.setItem("account", res.data.account);
					localStorage.setItem("pwd", this.password);
					setTimeout(() => {
						this.$toPage("/home/index");
					}, 1000);
				} else {
					this.$toast(this.$t(res.msg));
				}
			},
			clickKefu() {
				this.$toast(this.$t('login').j9);
			}
		},
	};
</script>
<style lang="less" scoped>
	.page {
		width: 100vw;
		min-height: 100vh;
		padding: .17rem .2rem .2rem .2rem;

		.top {
			font-weight: 600;
			font-size: 0.13rem;
			color: #015AA4;
			line-height: 0.19rem;
			display: flex;
			align-items: center;
			justify-content: flex-end;
		}

		.title {
			font-weight: 500;
			font-size: 0.27rem;
			color: #111111;
			line-height: 0.38rem;
			margin-top: .37rem;
			display: flex;
			align-items: center;
		}

		.name {
			height: .49rem;
			display: flex;
			align-items: center;
			font-weight: 400;
			font-size: 0.13rem;
			color: #111111;
		}

		.box {
			height: 0.43rem;
			background: #F5F5F3;
			border-radius: 0.04rem;
			display: flex;
			align-items: center;
			padding: 0 .16rem;

			input {
				width: 100%;
				height: 0.43rem;
				line-height: 0.43rem;
				font-weight: 400;
				font-size: 0.13rem;
				color: #111;
				border: 0;
				background: transparent;
			}

			img {
				width: 0.2rem;
				height: 0.2rem;
				margin-left: .1rem;
			}
		}

		.tip {
			height: .73rem;
			font-weight: 400;
			font-size: 0.13rem;
			color: #015AA4;
			display: flex;
			align-items: center;
		}
	}
</style>