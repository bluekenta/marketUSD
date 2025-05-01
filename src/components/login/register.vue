<template>
	<div class="page">
		<div class="top" @click="$toPage('/login/login')">{{$t('register').j1}}</div>
		<div class="title">{{$t('register').j2}}</div>
		<div class="name">{{$t('register').j3}}</div>
		<div class="box">
			<input type="number" :placeholder="$t('register').j4" maxlength="11" v-model="form.account" />
		</div>
		<div class="name">{{$t('register').j5}}</div>
		<div class="box">
			<input v-if="show" type="text" :placeholder="$t('register').j6" v-model="form.pwd" />
			<input v-else type="password" :placeholder="$t('register').j6" v-model="form.pwd" />
			<img src="../../assets/skin/login/look.png" v-if="show" @click="show=false" />
			<img src="../../assets/skin/login/unlook.png" v-else @click="show=true" />
		</div>
		<div class="name">{{$t('register').j7}}</div>
		<div class="box">
			<input v-if="show1" type="text" :placeholder="$t('register').j8" v-model="form.pwd1" />
			<input v-else type="password" :placeholder="$t('register').j8" v-model="form.pwd1" />
			<img src="../../assets/skin/login/look.png" v-if="show1" @click="show1=false" />
			<img src="../../assets/skin/login/unlook.png" v-else @click="show1=true" />
		</div>
		<div class="name">{{$t('register').j9}}</div>
		<div class="box">
			<input type="text" :placeholder="$t('register').j10" v-model="form.inviter" />
		</div>
		<div class="tip">
			<img src="../../assets/skin/login/check.png?2" v-if="flagCheck" @click="flagCheck=false" />
			<img src="../../assets/skin/login/uncheck.png" v-else @click="flagCheck=true" />
			{{$t('register').j11}}<span
				@click="$toPage('/information/privacy')">{{$t('register').j16}}{{$cfg.title}}{{$t('register').j12}}</span>
		</div>
		<div class="big_btn" @click="register">{{$t('register').j13}}</div>
		<loading ref="loading" />
	</div>
</template>
<script>
	import {
		mapMutations
	} from "vuex";
	export default {
		name: "login",
		data() {
			return {
				flagCheck: false,
				show: false,
				show1: false,
				form: {
					account: "",
					inviter: "",
					pwd: "",
					pwd1: "",
				},
			};
		},
		methods: {
			async register() {
				if (!this.form.account) {
					this.$toast(this.$t("register").j4);
					return;
				}
				if (!this.form.pwd) {
					this.$toast(this.$t("register").j6);
					return;
				}
				if (!this.form.pwd1) {
					this.$toast(this.$t("register").j8);
					return;
				}
				if (this.form.pwd1 !== this.form.pwd) {
					this.$toast(this.$t("register").j15);
					return;
				}
				if (!this.form.inviter) {
					this.$toast(this.$t("register").j10);
					return;
				}

				if (!this.flagCheck) {
					this.$toast(this.$t("register").j14);
					return;
				}

				this.$refs.loading.open(); //开启加载
				const res = await this.$server.post("/user/register", {
					...this.form
				});
				this.$refs.loading.close();
				if (res.status == 1) {
					this.$toast(this.$t(res.msg));
					setTimeout(() => {
						this.goLogin();
					}, 1000);
				}
			},
			async goLogin() {
        let _this = this
				let data = {
					account: this.form.account,
					password: this.form.pwd,
				};
				const res = await this.$server.post("/user/login", data);

				if (res.status == 1) {
					this.$toast(this.$t(res.msg));
					// 登录时首次，赋值token
          this.$server.defaults.headers.token = res.data.token;
          this.$server.defaults.headers.account = res.data.account;
          localStorage.setItem("tokend", res.data.token);
          localStorage.setItem("account", res.data.account);
          localStorage.setItem("pwd", this.form.pwd);
					setTimeout(() => {
            _this.$toPage("/home/index");
					}, 1000);
				} else {
					this.$toast(this.$t(res.msg));
				}
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
			color: #111111;
			display: flex;
			align-items: center;

			span {
				color: #015AA4;
			}

			img {
				width: 0.19rem;
				height: 0.19rem;
				margin-right: .12rem;
			}
		}
	}
</style>