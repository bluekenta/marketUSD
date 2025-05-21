<template>
	<div class="page ">
		<top-back :title="isChg ? $t('setting').txt4 : $t('moneyPwd').btn2"></top-back>
		<div class="cot">
			<div class="item" v-if="isChg">
				<div class="flex flex-b ipt">
					<input class="flex-1" v-model="form.old_pass" :type="show ? 'text' : 'password'"
						:placeholder="$t('moneyPwd').tip1" />
					<div class="icon animate__animated animate__fadeIn" :class="show ? 'zy' : 'by'"
						@click="show = !show"></div>
				</div>
			</div>
			<div class="item">
				<div class="flex flex-b ipt">
					<input class="flex-1" v-model="form.new_pass" :type="show1 ? 'text' : 'password'"
						:placeholder="$t('moneyPwd').tip2" />
					<div class="icon animate__animated animate__fadeIn" :class="show1 ? 'zy' : 'by'"
						@click="show1 = !show1"></div>
				</div>
			</div>
			<div class="item">
				<div class="flex flex-b ipt">
					<input class="flex-1" v-model="form.new_pass2" :type="show2 ? 'text' : 'password'"
						:placeholder="$t('moneyPwd').tip3" />
					<div class="icon animate__animated animate__fadeIn" :class="show2 ? 'zy' : 'by'"
						@click="show2 = !show2"></div>
				</div>
			</div>
		</div>
		<div class="big_btn animate__animated animate__fadeIn" @click="editPassword">
			{{ isChg ? $t("moneyPwd").btn2 : $t("moneyPwd").btn }}
		</div>
		<loading ref="loading" />
	</div>
</template>

<script>
	export default {
		name: "fundPass",
		props: {},
		data() {
			return {
				show: false,
				show1: false,
				show2: false,
				isChg: false,
				userInfo: {},
				form: {
					old_pass: "",
					new_pass: "",
					new_pass2: "",
				},
			};
		},
		components: {},
		created() {
			this.getUserInfo();
		},
		computed: {},
		methods: {
			getUserInfo() {
				this.$server.post("/user/getUserinfo").then((res) => {
					if (res.status == 1) {
						this.userInfo = res.data;
						this.isChg = !!res.data.passwords;
					}
				});
			},
			editPassword() {
				let that = this;
				if (this.isChg && !this.form.old_pass) {
					this.$toast(this.$t("moneyPwd").tip1);
					return false;
				}
				if (!this.form.new_pass && this.form.new_pass.length < 6) {
					this.$toast(this.$t("moneyPwd").tip2);
					return false;
				}
				if (this.form.new_pass2 !== this.form.new_pass) {
					this.$toast(this.$t("moneyPwd").tip4);
					return false;
				}
				this.$refs.loading.open(); //开启加载

				if (this.isChg) {
					this.$server.post("/user/changePasswords", {
						old_pass: this.form.old_pass,
						new_pass: this.form.new_pass,
						new_passs: this.form.new_pass2,
					}).then((res) => {
						this.$refs.loading.close();
						if (res.status == 1) {
							this.$toast(this.$t("moneyPwd").tip5);
							this.form = {
								old_pass: "",
								new_pass: "",
								new_pass2: "",
							};
							this.getUserInfo();
						}
					});
				} else {
					this.$server.post("/user/setPasswords", {
						new_pass: this.form.new_pass,
						new_passs: this.form.new_pass2,
					}).then((res) => {
						this.$refs.loading.close();
						if (res.status == 1) {
							this.$toast(this.$t("moneyPwd").tip6);
							this.form = {
								old_pass: "",
								new_pass: "",
								new_pass2: "",
							};
							this.getUserInfo();
						}
					});
				}
			},
		},
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