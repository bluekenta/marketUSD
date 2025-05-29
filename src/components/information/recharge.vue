<template>
	<div class="page ">
		<top-back :title="$t('mine').j17"></top-back>
<!--		<div class="top">-->
<!--			<div class="tab flex" v-if="false">-->
<!--			  <div class="tab-item flex flex-c" v-for="(item, index) in top" :key="index"-->
<!--			       :class="{ active: stockType == item.type, center: item.type == 'eur', }"-->
<!--			       @click="stockType=item.type">-->
<!--			    {{ item.name }}<span></span>-->
<!--			  </div>-->
<!--			</div>-->
<!--		</div>-->
		
<!--		<div class="card">{{ $t("可用资金") }}<span>{{stockType=='usd'?'$ ':stockType=='Spain'?'€ ':''}}{{ $formatMoney(userInfo.usd) }}</span></div>-->
		<div class="title">{{ $t("自定义金额") }}</div>
		<div class="box"><input v-model="money" type="number" :placeholder="$t('请输入充值金额')" /></div>
		<div class="title">{{ $t("充值金额") }}</div>
		<div class="money-list">
			<div class="money-item" v-for="(item, index) in moneyList" :key="index"
				:class="{ active: currmentIndex == index }" @click="changeMoney(index)">
				{{ $formatMoney(item.money) }}
			</div>
		</div>
<!--		<div class="title">{{ $t("资金密码") }}</div>-->
<!--		<div class="box"><input v-model="password" type="password" :placeholder="$t('请输入资金密码')" /></div>-->
		<div class="big_btn animate__animated animate__fadeIn" @click="toKe">{{ $t("new").a30 }}</div>
		<div class="tipTit"><span>*</span>{{$t('mine').j23}}</div>
		<div class="tipCon" v-html="tip"></div>
		<loading ref="loading" />
	</div>
</template>

<script>
	export default {
		name: "recharge",
		props: {},
		data() {
			return {
				loading: true,
				currmentIndex: null,
				open: "",
				close: "",
				money: "",
				userInfo: {},
				moneyList: [{
						money: "5000"
					},
					{
						money: "10000"
					},
					{
						money: "20000"
					},
					{
						money: "30000"
					},
					{
						money: "40000"
					},
					{
						money: "50000"
					},
				],
				type: 0,
				minMoney: 0,
				maxrecharge: 0,
				password: "",
				rpassword: "",
				totalAssets: 0, //总资产
				freezeAssets: 0, //冻结资金,
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
    mounted() {
      if(this.$route.query.stockType){
        this.stockType = this.$route.query.stockType||'Spain';
      }
			this.getUserInfo();
			this.getConfig();
		},
		computed: {},
		methods: {
			async toKe() {
				this.$refs.loading.open();
				const res = await this.$server.post("/common/config", {
					type: "all"
				});
				let val = {};
				res.data.forEach((vo) => {
					val[vo.name] = vo.value;
				});
				// this.kfUrl = val.kefu;
				this.$refs.loading.close();
				this.$openUrl(val.kefu); //重新获取
			},
			changeMoney(index) {
				this.currmentIndex = index;
				this.money = this.moneyList[index].money.replace(/,/g, "");
			},
			chongzhi() {

				if (this.userInfo.is_true !== 1) {
					this.$toast(this.$t("new").a45);
					setTimeout(() => {
						this.$toPage("/information/authInfo");
					}, 2000);
					return;
				}

				if (!this.money) {
					this.$toast(this.$t("new").a42);
					return;
				}

				let val = parseInt(this.money.replace(/\,/g, ""));
				if (val < this.minrecharge) {
					this.$toast(this.$t("new").a46 + this.$formatMoney(this.minrecharge));
					return;
				}

				let parmes = {
					money: val,
					type: this.stockType,
				};

				// 有通道密码
				if (this.rpassword) {
					if (!this.password) {
						this.$toast(this.$t("请输入资金密码"));
						return;
					}

					parmes = {
						money: val,
						type: this.stockType,
						rpassword: this.password,
					};
				}

				this.$refs.loading.open(); //开启加载
				this.$server.post("/user/ischongzhi", parmes).then((res) => {
					this.$refs.loading.close();

					if (res.status == 1) {

						setTimeout(() => {
							this.$toPage(
								`/information/rechargeChannel?money=${this.money}&stockType=${this.stockType}`
							);
						}, 2000);
					}
				});
			},
			getUserInfo() {
				this.$server.post("/user/getUserinfo").then((res) => {
					if (res.status == 1) {
						this.userInfo = res.data;
						this.isChg = !!res.data.passwords;
					}
				});
			},
			getConfig() {
				this.tip = this.$t('mine').j24
				this.$server.post("/common/config", {
					type: this.stockType,
				}).then((res) => {
					if (res.status == 1) {
						let list = res.data;
						let listLength = list.length;
						let a;
						for (a = 0; a < listLength; a++) {
							let row = list[a];
							if (row.name === "srecharge") {
								this.open = row.value;
							}
							if (row.name === "erecharge") {
								this.close = row.value;
							}
							if (row.name === "maxrecharge") {
								this.maxrecharge = row.value;
							}
							if (row.name === "rpassword") {
								this.rpassword = row.value;
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

	.money-list {
		padding: 0.15rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.money-item {
			width: calc((100% - .46rem) / 3);
			height: 0.46rem;
			background: #F5F5F3;
			border-radius: 0.04rem;
			display: flex;
			align-items: center;
			justify-content: center;
			font-weight: 400;
			font-size: 0.15rem;
			color: #A2A2A1;
			margin: .09rem 0;

			&.active {
				color: #fff;
				background: #015AA4;
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