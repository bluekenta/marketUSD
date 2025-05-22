<template>
	<div class="page ">
		<top-back :title="$t('setting').txt3"></top-back>

		<div class="cot">
			<div class="item">
				<div class="flex flex-b ipt">
					<div class="flex">
						<input class="flex-1" v-model="form.old_pass" :type="show ? 'text' : 'password'" :placeholder="$t('resetPwd').tip1" />
					</div>
					<div class="icon animate__animated animate__fadeIn" :class="show ? 'zy' : 'by'" @click="show = !show"></div>
				</div>
			</div>
			<div class="item">
				<div class="flex flex-b ipt center">
					<div class="flex">
						<input v-model="form.new_pass" :type="show1 ? 'text' : 'password'"
							:placeholder="$t('resetPwd').tip2" />
					</div>

					<div class="icon animate__animated animate__fadeIn" :class="show1 ? 'zy' : 'by'"
						@click="show1 = !show1"></div>
				</div>
			</div>
			<div class="item">
				<div class="flex flex-b ipt">
					<div class="flex">
						<input v-model="form.new_pass2" :type="show2 ? 'text' : 'password'"
							:placeholder="$t('resetPwd').tip3" />
					</div>
					<div class="icon animate__animated animate__fadeIn" :class="show2 ? 'zy' : 'by'"
						@click="show2 = !show2"></div>
				</div>
			</div>
		</div>
		<div class="big_btn animate__animated animate__fadeIn" @click="editPassword">
			{{ $t("resetPwd").btn }}
		</div>
		<loading ref="loading" />
	</div>
</template>

<script>
	export default {
		name: "loginPass",
		props: {},
		data() {
			return {
				show: false,
				show1: false,
				show2: false,
				form: {
					old_pass: "",
					new_pass: "",
					new_pass2: "",
				},
			};
		},
		components: {},
		methods: {
			editPassword() {
				let that = this;
				if (!this.form.old_pass) {
					this.$toast(this.$t("resetPwd").tip1);

					return false;
				}
				if (!this.form.new_pass && this.form.new_pass.length < 6) {
					this.$toast(this.$t("resetPwd").tip2);

					return false;
				}
				if (this.form.new_pass2 !== this.form.new_pass) {
					this.$toast(this.$t("resetPwd").tip4);
					return false;
				}
				this.$refs.loading.open(); //开启加载
				this.$server
					.post("/user/changePassword", {
						old_pass: this.form.old_pass,
						new_pass: this.form.new_pass,
						new_passs: this.form.new_pass2,
					})
					.then((res) => {
						this.$refs.loading.close();
						if (res.status == 1) {
							this.$toast(this.$t("resetPwd").tip5);
							setTimeout(() => {
								this.loginOut();
							}, 1500);
						}
					});
			},
			// 退出
			loginOut() {
				localStorage.removeItem("tokend");
				localStorage.removeItem("account");

				setTimeout(() => {
					this.$toPage("/login/login");
				}, 1500);
			},
		},
		created() {},
		computed: {},
	};
</script>

<style scoped lang="less">
	.page {
    padding: 0 0.12rem;
		min-height: 100vh;
		.cot {
			.title{
				font-size: 0.18rem;
				font-weight: 500;
				margin-bottom: 0.2rem;
			}
			.item {
        height: 0.43rem;
        background: #F5F5F3;
        border-radius: 0.04rem;
        margin-top: .2rem;
        padding: 0 .15rem;
				.ipt {
				}

				input {
          height: 0.43rem;
          font-size: 0.12rem;
          color: #333;
          line-height: 0.43rem;

					&::placeholder {
						font-size: 0.12rem;
						color: #8a8a8a;
					}
				}
			}
		}
    .big_btn{
      margin-top: .2rem;
    }
	}
</style>