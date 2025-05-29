<template>
	<div class="page ">
		<top-back :title="$t('bankManagement').btn"></top-back>

		<div class="cot">
			<div class="item flex">
				<input :placeholder="$t('bandBankCard').tip1" v-model="realname" />
			</div>
      <div class="item flex">
        <input :placeholder="$t('bandBankCard').tip3" v-model="bank_name" />
      </div>
			<div class="item flex">
				<input :placeholder="$t('bandBankCard').tip2" v-model="bank_num" />
			</div>
			<div class="item flex">
				<input :placeholder="$t('bandBankCard').tip5" v-model="bank_code" />
			</div>
<!--			<div class="item flex">-->
<!--				<input :placeholder="$t('bandBankCard').tip4" v-model="bank_address" />-->
<!--			</div>-->
			
		</div>
		<div class="big_btn animate__animated animate__fadeIn" @click="addCard">
			{{ $t("bandBankCard").btn }}
		</div>
		<loading ref="loading" />
	</div>
</template>

<script>
	export default {
		name: "addBankCard",
		props: {},
		data() {
			return {
				bank_num: "",
				bank_name: "",
				bank_address: "",
				realname: "",
				bank_code: "",
			};
		},
		components: {},
		created() {},
		computed: {},
		methods: {
			addCard() {
				let that = this;
				if (!!that.bank_num && !!that.bank_name && !!that.realname) {
					let parmes = {
						bank_num: that.bank_num,
						bank_name: that.bank_name,
						bank_address: that.bank_address,
						realname: this.realname,
						bank_code: this.bank_code,
						type: this.$stockType,
					};
					this.$refs.loading.open(); //开启加载

					this.$server.post("/user/addCard", parmes).then((res) => {
						this.$refs.loading.close();

						if (res.status == 1) {
							this.$toast(that.$t("new").a7);
							setTimeout(() => {
								this.$router.go(-1);
							}, 1500);
						}
					});
				} else {
					this.$toast(that.$t("bandBankCard").tip6);
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