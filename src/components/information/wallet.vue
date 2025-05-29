<template>
	<div class="page">
		<div class="headerBox">
			<div class="header-title">{{$t('mine').j15}}</div>
		</div>
		<div class="card">
			<div class="card-top">{{$t('mine').j16}}(EUR)<img src="../../assets/skin/mine/order.png"
					@click="$toPage('/information/fundRecord')" /></div>
			<div class="card-price">{{$formatMoney(totalAssets['eur'])}} €</div>
			<div class="card-foot">
				<div class="card-foot-btn1" @click="$toPage('/information/recharge')">{{$t('mine').j17}}</div>
				<div class="card-foot-btn2" @click="$toPage('/information/cashOut')">{{$t('mine').j18}}</div>
				<div class="card-foot-btn2" @click="$toPage('/information/exChange')">{{$t('mine').j19}}</div>
        <div class="card-foot-btn2" @click="$toPage('/home/loan')">{{$t('信用贷款')}}</div>
			</div>
		</div>
		<div class="list"><!--  v-for="(item, index) in list" :key="index" -->
			<div class="item">
				<div class="list-top">
					<img :src="require('../../assets/skin/mine/eur.png')" />
					EUR
				</div>
				<div class="list-foot">
					<div class="list-foot-item flex-start">
						{{$t('mine').j20}}<span>{{$formatMoney(totalAssets.eur)}} €</span></div>
					<div class="list-foot-item">
						{{$t('mine').j21}}<span>{{$formatMoney(freezeAssets.eur)}} €</span>
					</div>
					<div class="list-foot-item flex-end">
						{{$t('mine').j22}}
						<span>{{ $formatMoney(userInfo.Spain) }} €</span>
					</div>
				</div>
			</div>
			<div class="item">
				<div class="list-top">
					<img :src="require('../../assets/skin/mine/usd.png')" />
					USD
				</div>
				<div class="list-foot">
					<div class="list-foot-item flex-start">
						{{$t('mine').j20}}<span>$ {{$formatMoney(totalAssets.usd)}}</span></div>
					<div class="list-foot-item">
						{{$t('mine').j21}}<span>$ {{$formatMoney(freezeAssets.usd)}}</span>
					</div>
					<div class="list-foot-item flex-end">
						{{$t('mine').j22}}
						<span>$ {{ $formatMoney(userInfo.usd) }}</span>
					</div>
				</div>
			</div>
			<div class="item">
				<div class="list-top">
					<img :src="require('../../assets/skin/mine/licai.png')" />
					{{$t('mine').j27}}
				</div>
				<div class="list-foot">
					<div class="list-foot-item flex-start">
						{{$t('mine').j20}}<span>{{$formatMoney(userInfo.Spainfund)}} €</span>
					</div>
					
				</div>
			</div>
			<!-- <div class="item">
				<div class="list-top"><img :src="require('../../assets/skin/mine/'+item+'.png')" />{{item.toUpperCase()}}
				</div>
				<div class="list-foot">
					<div class="list-foot-item flex-start">
						{{$t('mine').j20}}<span>{{$formatMoney(totalAssets[item])}}</span></div>
					<div class="list-foot-item">{{$t('mine').j21}}<span>{{$formatMoney(freezeAssets[item])}}</span></div>
					<div class="list-foot-item flex-end">
						{{$t('mine').j22}}
						<span>
							{{item=='eur'?$formatMoney(userInfo['Spain']):$formatMoney(userInfo[item])}}
						</span>
					</div>
				</div>
			</div> -->
		</div>
		<loading ref="loading" />
		<tab-bar :current="4"></tab-bar>
	</div>
</template>

<script>
	export default {
		name: "information",
		props: {},
		data() {
			return {
				chartData: [],
				show: true,
				loading: true,
				isLoading: false,
				kfUrl: "",
				userInfo: {},
				list: ['eur', 'usd','eur'],
				totalProfit: {
					usd: 0,
					eur: 0,
					brl: 0,
					gbp: 0,
					usdt: 0
				},
				totalAssets: {
					usd: 0,
					eur: 0,
					brl: 0,
					gbp: 0,
					usdt: 0
				},
				freezeAssets: {
					usd: 0,
					eur: 0,
					brl: 0,
					gbp: 0,
					usdt: 0
				},
			};
		},
		computed: {},
		mounted() {
			let length = this.list.length
			let a
			for (a = 0; a < length; a++) {
				this.getMonet(this.list[a]);
			}
		},
		methods: {
			goUrl(url) {
				if (url == "kefu") {
					this.goKefu();
				} else {
					this.$toPage(url);
				}
			},
			goKefu() {
				this.getConfig();
			},
			getMonet(type) {
				this.getTotalAssets(type);
			},
			// 获取总资产
			async getTotalAssets(type) {
				let stockType = type=='eur'?'Spain':type;
				this.$refs.loading.open(); //开启加载

				const res = await this.$server.post("/user/getUserinfo");
				if (res.status == 1) {
					this.userInfo = res.data;
				}
				let money = Number(this.userInfo[stockType] || 0); //用户可用余额
				// 获取跟单盈亏
				const res1 = await this.$server.post("/trade/userproductlist", {
					type: stockType,
				});
				let followingFreeze = 0; //量化跟单的认缴冻结
				if (res1.status == 1 && res1.data && Array.isArray(res1.data)) {
					let arr = [];
					res1.data.forEach((item) => {
						if (item.status == 0) {
							arr.push(Number(item.money)); //跟单冻结的资金
						}
					});
					let total = arr.reduce((a, b) => a + b, 0);
					followingFreeze = total;
				}

				// 申購列表的投資
				const res2 = await this.$server.post("/trade/usernewstocklist", {
					type: stockType,
					buy_type: 0,
				});
				let subscriptionProfit = 0; //新股申请的认缴冻结
				if (res2.status == 1 && res2.data && Array.isArray(res2.data)) {
					let arr = [];
					let arr1 = [];
					res2.data.forEach((item) => {
						if (item.status == 1) {
							arr.push(Number(item.rjmoney == "-" ? 0 : item.rjmoney)); //認繳的资金
						}
						if (item.status == 0) {
							arr1.push(Number(item.rjmoney == "-" ? 0 : item.rjmoney)); //计算申购认缴等于0的
						}
					});
					let total = arr.reduce((a, b) => a + b, 0);
					let total1 = arr1.reduce((a, b) => a + b, 0);

					subscriptionProfit = total + total1;
				}

				// 日内交易的申请冻结 接口报错
				const res3 = await this.$server.post("/trade/urnjylist", {
					type: stockType,
				});
				let dayDelFreeze = 0;
				if (res3.status == 1 && res3.data && Array.isArray(res3.data)) {
					let arr = [];
					res3.data.forEach((item) => {
						if (item.status == 0) {
							arr.push(Number(item.credit));
						}
					});
					let total = arr.reduce((a, b) => a + b, 0);
					dayDelFreeze = total;
				}

				// 持仓中的申请冻结
				const res4 = await this.$server.post("/trade/userstocklist", {
					type: stockType,
					page: 1,
					size: 300,
				});
				let positionFreeze = 0;
				delete res4.data.ccsz;
				delete res4.data.fdyk;
				let dataArr = Object.values(res4.data);
				if (dataArr.length) {
					let arr = [];
					let arr2 = [];
					dataArr.forEach((item) => {
						if (item.status == 0) {
							arr.push(
								Number(item.buy_price) * Number(item.stock_num) + item.yingkui
							);
							arr2.push(
								item.yingkui
							);
						}
					});

					let total = arr.reduce((a, b) => a + b, 0);
					let total2 = arr2.reduce((a, b) => a + b, 0);
					positionFreeze = total;
					this.totalProfit[stockType] = total2;
				}

				// 大宗交易申请冻结
				const res5 = await this.$server.post("/trade/ustockslist", {
					type: stockType,
				});
				let bigDealFreeze = 0;
				if (res5.status == 1 && res5.data && Array.isArray(res5.data)) {
					let arr = [];
					res5.data.forEach((item) => {
						if (item.status == 0) {
							arr.push(Number(item.credit)); //認繳的资金
						}
					});
					let total = arr.reduce((a, b) => a + b, 0);
					bigDealFreeze = total;
				}

				// 日内交易持仓
				const res6 = await this.$server.post("/trade/userstocklist", {
					type: stockType,
					buy_type: 1,
				});
				let dayDealFreeze = 0;
				delete res6.data.ccsz;
				delete res6.data.fdyk;
				let dataArr1 = res6.data;
				if (dataArr1.length) {
					let arr = [];
					dataArr1.forEach((item) => {
						if (item.status == 0) {
							arr.push(Number(item.credit)); //認繳的资金
						}
					});
					let total = arr.reduce((a, b) => a + b, 0);
					dayDealFreeze = total;
				}

				// 冻结资产
				this.freezeAssets[type] =
					subscriptionProfit +
					followingFreeze +
					dayDelFreeze +
					bigDealFreeze +
					positionFreeze +
					dayDealFreeze;
				// 总资产
				this.totalAssets[type] = money + this.freezeAssets[type];
				this.$refs.loading.close();

			},

			async getConfig() {
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

		},
	};
</script>

<style scoped lang="less">
	.page {
		padding-bottom: .85rem;
	}

	.headerBox {
		height: 1.23rem;
		background: #015AA4;

		.header-title {
			height: .53rem;
			padding: 0 .15rem;
			display: flex;
			align-items: center;
			font-weight: 500;
			font-size: 0.13rem;
			color: #fff;
		}
	}

	.card {
		height: 1.44rem;
		background: #FFFFFF;
		box-shadow: 0 0.01rem 0.08rem 0 rgba(0, 0, 0, 0.15);
		border-radius: 0.05rem;
		margin: -.7rem .15rem 0 .15rem;
		padding: .13rem;
		box-sizing: border-box;

		.card-top {
			font-weight: 400;
			font-size: 0.13rem;
			color: #989898;
			line-height: 0.19rem;
			display: flex;
			align-items: center;
			justify-content: space-between;

			img {
				width: 0.19rem;
				height: .22rem;
			}
		}

		.card-price {
			font-weight: 600;
			font-size: 0.27rem;
			color: #111111;
			line-height: 0.38rem;
			margin-top: .11rem;
		}

		.card-foot {
			height: 0.31rem;
			margin-top: .15rem;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.card-foot-btn1 {
				height: 0.31rem;
				background: #015AA4;
				border-radius: 0.04rem;
				font-weight: 400;
				font-size: 0.13rem;
				color: #fff;
				padding: 0 .12rem;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.card-foot-btn2 {
				height: 0.31rem;
				background: rgba(245, 245, 243, 1);
				border-radius: 0.04rem;
				font-weight: 400;
				font-size: 0.13rem;
				color: #111111;
				padding: 0 .12rem;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}

	.list {
		.item{
			border-bottom: .01rem solid rgba(247, 247, 247, 1);
			padding: .23rem .18rem;
		}
		.list-top {
			display: flex;
			align-items: center;
			font-weight: 500;
			font-size: 0.14rem;
			color: #111111;
			line-height: 0.2rem;

			img {
				width: 0.24rem;
				height: 0.24rem;
				margin-right: .08rem;
			}
		}

		.list-foot {
			display: flex;
			align-items: center;
			margin-top: .16rem;

			.list-foot-item {
				width: calc(100% / 3);
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				font-weight: 400;
				font-size: 0.11rem;
				color: #9A9A9A;
				line-height: 0.15rem;

				span {
					font-weight: 400;
					font-size: 0.13rem;
					color: #111111;
					line-height: 0.19rem;
					margin-top: .06rem;
				}
			}

			.flex-start {
				align-items: flex-start;
			}

			.flex-end {
				align-items: flex-end;
			}
		}
	}
</style>