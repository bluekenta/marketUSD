<template>
	<div class="page ">
		<top-back :title="$t('new').b1"></top-back>
		<div class="top">
			<div class="tab flex" v-if="false">
			  <div class="tab-item flex flex-c" v-for="(item, index) in top" :key="index"
			       :class="{ active: stockType == item.type, center: item.type == 'eur', }"
			       @click="stockType=item.type">
			    {{ item.name }}<span></span>
			  </div>
			</div>
		</div>
		<div class="card">{{ $t("可用资金") }}<span>{{stockType=='usd'?'$ ':''}}{{ $formatMoney(userInfo[stockType]) }}{{stockType=='Spain'?' €':''}}</span></div>
		<div class="title">{{ $t("new").a26 }}</div>
		<div class="box"><input v-model="money" type="number" :placeholder="$t('new').a27" /></div>
		<div class="title">{{ $t("new").a28 }}</div>
		<div class="box"><input v-model="moneyPwd" type="password" :placeholder="$t('new').a29" /></div>
		<div class="title" @click="$toPage('/information/addBankCard')">{{ $t("new").a25 }}</div>
		<div class="box2">
			<div class="list-item" v-for="(item, index) in bankList" :key="index" @click="itemObj(item)">
				<div class="item-name">
					{{ item.bank_name }}
					<span>({{ $t("cashOut").txt6 }}{{ item.bank_num.substring(item.bank_num.length - 4) }})</span>
				</div>
				<div class="icon checked animate__animated animate__fadeIn" v-if="bankId && bankId == item.id">
				</div>
				<div class="icon nocheck animate__animated animate__fadeIn" v-else></div>
			</div>
		</div>
		<div class="big_btn animate__animated animate__fadeIn" @click="submit">{{ $t("new").a30 }}</div>
		<div class="tipTit"><span>*</span>{{$t('mine').j23}}</div>
		<div class="tipCon" v-html="tip"></div>
		<loading ref="loading" />
	</div>
</template>

<script>
	export default {
		name: "cashOut",
		props: {},
		data() {
			return {
				bankList: [],
				userInfo: {},
				isChg: "",
				money: "",
				moneyPwd: "",
				bankId: "",
				totalAssets: 0, //总资产
				freezeAssets: 0, //冻结资金
				tip: '',
				top: [
					{ name: 'USD', type: 'usd' },
					{ name: 'EUR', type: 'Spain' },
					//{ name: 'USDT', type: 'usdt' },
				],
				stockType: 'Spain'
			};
		},
		components: {},
		created() {
			this.getUserInfo();
			this.initData();
			this.getConfig();
		},
		computed: {},
		methods: {
			itemObj(item) {
				this.bankId = item.id;
			},
			submit() {
				let that = this;
				// 沒有設置密碼前往設置
				if (!this.isChg) {
					this.$toast(this.$t("new").a31);
					setTimeout(() => {
						this.$toPage("/information/fundPass");
					}, 2000);
					return;
				}

				// 没有银行卡跳转添加
				if (this.bankList.length == 0) {
					this.$toast(this.$t("new").a32);
					setTimeout(() => {
						this.$toPage("/information/addBankCard");
					}, 2000);
					return;
				}

				// 如果沒有銀行卡，前往添加
				if (!this.bankId) {
					this.$toast(this.$t("new").a32);
					return;
				}

				if (!this.money) {
					this.$toast(this.$t("new").a33);
					return;
				}

				if (!this.moneyPwd) {
					this.$toast(this.$t("new").a34);
					return;
				}

				if (this.moneyPwd == this.userInfo.passwords) {
					this.$refs.loading.open(); //开启加载
					this.$server
						.post("/user/withdrawal", {
							money: this.money,
							bankid: this.bankId,
							passwords: this.moneyPwd,
							type: this.stockType,
						})
						.then((res) => {
							this.$refs.loading.close();

							if (res.status == 1) {
								this.$toast(this.$t("new").a7);
								setTimeout(() => {
									this.$router.go(-1);
								}, 2000);
							}
						});
				} else {
					// 输入的资金密码和设置的不一致
					this.$toast(this.$t("new").a35);
				}
			},
			getUserInfo() {
				this.$server.post("/user/getUserinfo").then((res) => {
					if (res.status == 1) {
						this.userInfo = res.data;
						this.isChg = !!res.data.passwords;
					}
				});
			},
			initData() {
				this.$server.post("/user/cardList", {
					size: 200,
					page: 1,
				}, (failres) => {
					that.bankList = [];
				}).then((res) => {
					var arr = [];
					for (var i in res.data) {
						var row = res.data[i];
						if (row.bank_name != "TRC" && row.bank_name != "ERC") {
							arr.push(row);
						}
					}
					this.bankList = arr;
				});
			},
			getConfig() {
				this.tip = this.$t('mine').j25
				this.$server.post("/common/config", {
					type: this.$stockType,
				}).then((res) => {
					if (res.status == 1) {
						let list = res.data;
						let listLength = list.length;
						let a;
						for (a = 0; a < listLength; a++) {
							let row = list[a];
							if (row.name === "swithdrawal") {
								this.open = row.value;
							}
							if (row.name === "ewithdrawal") {
								this.close = row.value;
							}
							if (row.name === "minwithdrawal") {
								this.maxrecharge = row.value;
							}
						}
						this.tip = this.tip.replace("{{open}}", this.open)
						this.tip = this.tip.replace('{{close}}', this.close)
						this.tip = this.tip.replace('{{min}}', this.maxrecharge)
					}
				});
			},
		},
	};
</script>

<style scoped lang="less">
	.page {}

	.top {
		height: .7rem;
		background: #015AA4;
	}
	
	.tab {
		height: .35rem;
		display: flex;
		align-items: flex-end;
		padding: 0 .15rem;
		.tab-item {
			padding: 0 .14rem;
			height: .35rem;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			align-items: center;
			font-weight: 500;
			font-size: 0.13rem;
			color: rgba(152, 152, 152, 1);
			line-height: 0.19rem;
	
			span {
				width: 0.27rem;
				height: 0.04rem;
				background: transparent;
				border-radius: 0.02rem;
				display: block;
				margin-top: .06rem;
			}
	
			&.active {
				color: #fff;
	
				span {
					background: #fff;
				}
			}
		}
	}
	
	.card {
		background: #FFFFFF;
		box-shadow: 0 0.01rem 0.08rem 0 rgba(0, 0, 0, 0.15);
		border-radius: 0.05rem;
		margin: -.7rem .15rem 0 .15rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: .13rem;
		font-weight: 400;
		font-size: 0.13rem;
		color: #989898;
		line-height: 0.19rem;

		span {
			font-weight: 600;
			font-size: 0.27rem;
			color: #111111;
			line-height: 0.38rem;
			margin-top: .11rem;
		}
	}

	.title {
		font-weight: 400;
		font-size: 0.13rem;
		color: #111111;
		line-height: 0.19rem;
		padding: 0 .15rem;
		display: flex;
		align-items: center;
		margin-top: .22rem;
	}

	.box {
		height: 0.43rem;
		background: #F5F5F3;
		border-radius: 0.04rem;
		margin: .15rem .15rem 0 .15rem;
		padding: 0 .23rem;

		input {
			height: 0.43rem;
			line-height: .43rem;
			width: 100%;
			font-weight: 400;
			font-size: 0.13rem;
			color: #333;
		}
	}

	.box2 {
		background: #F5F5F3;
		border-radius: 0.04rem;
		margin: .15rem .15rem 0 .15rem;

		.list-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0.1rem 0.12rem 0.12rem;

			.nocheck {
				width: 0.18rem;
				height: 0.18rem;
				border-radius: 50%;
			}

			.item-name {
				display: flex;
				align-items: center;

				span {
					padding-left: 0.05rem;
				}
			}
		}
	}

	.big_btn {
		margin: .2rem .15rem 0 .15rem;
	}

	.tipTit {
		font-weight: 400;
		font-size: 0.13rem;
		color: rgba(102, 102, 102, 1);
		line-height: 0.22rem;
		margin-top: .16rem;
		padding: 0 .15rem;

		span {
			color: #FD4D4C;
		}
	}

	.tipCon {
		font-weight: 400;
		font-size: 0.13rem;
		color: #666666;
		line-height: 0.2rem;
		margin-top: .06rem;
		padding: 0 .15rem;
	}
</style>