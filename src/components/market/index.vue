<template>
	<!-- 市场 -->
	<div class="page">
		<div class="top">
			<div class="top-box">
				<span class="top-item" :class="topIndex==item.type?'top-on':''" v-for="(item, index) in top"
					:key="index" @click="topIndex=item.type,changeTop()">{{item.name}}</span>
			</div>
		</div>
		<div class="long"></div>
		<div class="search" @click="$toPage('/favorite/search')">
			<img src="../../assets/skin/market/search.png" />{{$t('market').j6}}
		</div>
		<!-- 自选 -->
		<template v-if="topIndex==0">
			<div class="cot">
				<div class="list">
					<div class="lists">
						<div class="list-item " v-for="(item, idx) in chooseList" :key="idx" @click="clickZixuan(item)">
							<div class="name">{{ item.name }}<span>{{ item.symbol }}</span></div>
							<div class="price">
								{{ $formatMoney(item.price, stockType=='Spain' || stockType=='usd' ? 3: 2) || 0 }}<span>{{ $formatMoney(item.gainValue, stockType=='Spain' || stockType=='usd' ? 3: 2) || 0 }}</span>
							</div>
							<div class="per">
								<div class="per-info" :class="item.gainValue>0?'green':'red'">
									{{ item.gain.toFixed(2) }}%
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</template>
		<!-- 股票 -->
		<template v-if="topIndex==1||topIndex==2">
			<div class="menu">
				<div class="menu-item" v-for="(item, index) in menu" :key="index" @click="$toPage(item.href)"><img
						:src="item.img" />{{item.name}}</div>
			</div>
			<div class="zhiShu">
				<div class="itemBox">
					<div class="item" v-for="(item,idx) in zhiShulist" :key="idx"
						:class="item.gainValue>=0?'red':'green'"
						@click="clickZhiDetail(item),$toPage('/market/stockDetail?symbol='+item.symbol + '&type=zhishu')">
						<div class="name">{{item.symbol}}</div>
						<div class="price">{{$formatMoney(item.price)}}</div>
						<!-- {{stockType=='Spain'?'€ ':'$ '}} -->
						<div class="per">
							<div :class="item.gain>0?'green':'red'">{{$formatMoney(item.gainValue)}}</div>
							<div :class="item.gain>0?'green':'red'">{{item.gain}}%</div>
						</div>
						<img src="../../assets/skin/market/green.png" v-if="item.gain>0" />
						<img src="../../assets/skin/market/red.png" v-else />
					</div>
				</div>
			</div>
			<teShe ref="teShe" @upData="upData" :stockType="stockType" />
		</template>
		<!-- 外汇 -->
		<template v-if="topIndex==4">
			<div class="banner" @click="$toPage('/home/dayTrading')">
				<div class="txt">
					<div>{{$t('market').j20}}</div>
					<span class="flex">
						{{$t('market').j21}}
						<img src="../../assets/home/arrow3.png" />
					</span>
				</div>
				<img src="../../assets/market/img5.png" />
			</div>
			<div class="cot">
				<div class="list">
					<div class="lists">
						<div class="list-item " v-for="(item, idx) in exchangelist" :key="idx"
							@click="$toDetail(`/market/stockDetail?symbol=${item.symbol}&buy=4`, item)">
							<div class="name">{{ item.name }}<span>{{ item.symbol }}</span></div>
							<div class="price">
								$ {{ $formatMoney(item.price,3) || 0 }}<span>$ {{ $formatMoney(item.gainValue,3) || 0 }}</span>
							</div>
							<div class="per">
								<div class="per-info" :class="item.gainValue>0?'green':'red'">
									{{ $formatMoney(item.gain) }}%
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</template>
		<!-- 加密 -->
		<template v-if="topIndex==3">
			<div class="banner" @click="$toPage('/home/dayTrading')">
				<div class="txt">
					<div>{{$t('market').j20}}</div>
					<span class="flex">
						{{$t('market').j21}}
						<img src="../../assets/home/arrow3.png" />
					</span>
				</div>
				<img src="../../assets/market/img5.png" />
			</div>
			<div class="cot">
				<div class="list">
					<div class="lists">
						<div class="list-item " v-for="(item, idx) in exchangelist" :key="idx"
							@click="$toDetail(`/market/stockDetail?symbol=${item.symbol}&buy=4`, item)">
							<!--  v-if="!item.exchange" -->
							<div class="name">{{ item.symbol }}<span>{{ item.symbol }}</span></div>
							<div class="price">
								$ {{ $formatMoney(item.price,3) || 0 }}<span>$ {{ $formatMoney(item.gainValue,3) || 0 }}</span>
							</div>
							<div class="per">
								<div class="per-info" :class="item.gainValue>0?'green':'red'">
									{{ $formatMoney(item.gain) }}%
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</template>
		<loading ref="loading" />
		<tab-bar :current="1"></tab-bar>
	</div>
</template>

<script>
	import teShe from "./components/teShe.vue";
	import indexLine from "../components/index-line.vue";
	import marketProblem from "./components/marketProblem";
	import marketIndicators from "./components/marketIndicators";
	import featuredItems from "./components/featuredItems";
	import kLine from "@/components/market/components/k-line.vue";

	export default {
		name: "",
		props: {},
		data() {
			return {
				top: [{
						name: this.$t('market').j1, //自选
						type: 0
					},
					{
						name: this.$t('stockTab').j1, //西班牙
						type: 1
					},
					{
						name: this.$t('stockTab').j2, //美国
						type: 2
					},
					{
						name: this.$t('stockTab').j3, //数字货币
						type: 3
					},
					{
						name: this.$t('stockTab').j4, //外汇
						type: 4
					},
					/* {
						name: this.$t('market').j19,//加密
						type: 5
					}, */
				],
				topIndex: 1,
				menu: [],
				loading: true, //控制显示骨架屏占位显示
				isLoading: false,
				isShow: false,
				tabIdx: 0,
				zhiShulist: [],
				exchangelist: [],
				chooseList: [],
				stockType: ''
			};
		},
		components: {
			kLine,
			teShe,
			indexLine,
			marketProblem,
			marketIndicators,
			featuredItems
		},
		created() {

		},
		mounted() {
			let tmp = window.localStorage.getItem('stockType') || 'usd';
			if (tmp == 'Spain') {
				this.topIndex = 1;
			} else if (tmp == 'usd') {
				this.topIndex = 2;
			} else if (tmp == 'usdt') {
				this.topIndex = 3;
			} else if (tmp == 'wh') {
				this.topIndex = 4;
			}
			this.changeTop(this.topIndex);
		},
		computed: {},
		methods: {
			changeTop() {
				if (this.topIndex == 0) { //自选
					this.getMine();
				}
				if (this.topIndex == 1) { //股票西班牙
					this.stockType = 'Spain';
					this.upData();
					this.getZhiShu();
					window.localStorage.setItem('stockType', this.stockType);
				}
				if (this.topIndex == 2) { //股票美国
					this.stockType = 'usd';
					this.upData();
					this.getZhiShu();
					window.localStorage.setItem('stockType', this.stockType);
				}
        if(this.topIndex == 1 || this.topIndex == 2){
          this.menu = [
            {
              name: this.$t('market').j13,
              href: '/home/dayTrading',
              img: require('../../assets/skin/home/1.png'),
            },
            {
              name: this.$t("home").j3,
              href: "/home/fllow?stockType="+this.stockType,
              img: require('../../assets/skin/home/2.png?2')
            },
            {
              name: this.$t('blockTrade').j1,
              img: require('../../assets/skin/market/1.png'),
              href: "/home/blockTrade?type=0&stockType="+this.stockType,
            },
            {
              name: this.$t('newStock').j4,
              img: require('../../assets/skin/market/3.png'),
              href: "/home/newStock?stockType="+this.stockType,
            },
            {
              name: this.$t("home").j4,
              href: "/home/blockTrade?type=1&stockType="+this.stockType,
              img: require('../../assets/skin/market/7.png?2')
            },
          ]
        }
				if (this.topIndex == 3) { //数字货币
					this.stockType = 'usdt';
					window.localStorage.setItem('stockType', this.stockType);
					this.getExchange();
				}
				if (this.topIndex == 4) { //外汇
					this.stockType = 'wh';
					window.localStorage.setItem('stockType', this.stockType);
					this.getWh();
				}
				/* if (this.topIndex == 2) {
					this.getExchange()//期货
				}
				if (this.topIndex == 3) {
					this.getZhiShu();//指数
				}
				if (this.topIndex == 4) {
					this.getExchange()//外汇
				}
				if (this.topIndex == 5) {
					this.getExchange()//加密
				} */
			},
			upData() {
				this.isLoading = false;
			},
			// 下拉刷新
			onRefresh() {
				this.$refs.teShe.getInfo();
			},
			async getExchange() {
				this.exchangelist = [];
				// const res = await this.$server.post('/trade/stockdetails',{
				// 	symbol:"BTC",
				// 	type:"usd"
				// });
				// if(res&&res.data){
				// 	this.exchangelist.push(res.data);
				// }
				let arr = ["BTC", "ETH", "XRP", "BNB", "SOL", "DOGE", "TRX", "ADA", "XLM", "AVAX", "SHIB", "TON", "LTC"];
				this.$server.post("/parameter/exchange", {
					type: this.$stockType
				}).then((res) => {
					this.loading = false;
					this.isLoading = false;
					if (res && res.data) {
						this.exchangelist = res.data;
						this.exchangelist = this.exchangelist.filter(function(item) {
							//return item.symbol == 'BTC' || item.symbol == 'ETH' || item.symbol =='BNB' || item.symbol == 'SOL' || item.symbol == 'XRP' || item.symbol =='DOGE' || item.symbol == 'TON' || item.symbol == 'ADA' || item.symbol == 'DOT' || item.symbol == 'SHIB' || item.symbol == 'AVAX'
							return arr.includes(item.symbol);
						});
					}
				});
			},
			async getWh() {
				this.exchangelist = [];
				// const res = await this.$server.post('/trade/stockdetails',{
				// 	symbol:"XAUUSD",
				// 	type:"usd"
				// });
				// if(res&&res.data){
				// 	this.exchangelist.push(res.data);
				// }
				let arr = ["EUR/USD", "CAD/USD", "TWD/USD", "XAG/USD", "CHF/USD", "GBP/USD", "CNH/USD", "CNY/USD", "AUD/USD", "NZD/USD", "XAU/USD"];
				this.$server.post("/Common/exchange_fx", {
					type: this.$stockType
				}).then((res) => {
					this.loading = false;
					this.isLoading = false;
					if (res && res.data) {
						this.exchangelist = res.data.data;
						this.exchangelist = this.exchangelist.filter(function(item) {
							//return item.name.indexOf('/USD') > -1 && item.name.indexOf('BTC') == -1
							return arr.includes(item.name);
						});
					}
				});
			},
			getZhiShu() {
				this.$server.post("/parameter/zhishu", {
					type: this.stockType
				}).then((res) => {
					this.loading = false;
					this.isLoading = false;
					if (res && res.data) {
						this.zhiShulist = res.data;
					}
				});
			},
			async getMine() {
				this.chooseList = [];
				const res = await this.$server.post("/user/Optionallist", {
					offset: 0,
					type: this.$stockType
				});
				this.isLoading = false; //下拉刷新状态
				this.loading = false;
				if (res.status == 1) {
					this.chooseList = [...this.chooseList, ...res.data];
				}

				const res2 = await this.$server.post("/user/Optionallist", {
					offset: 0,
					type: 'Spain'
				});
				if (res2.status == 1) {
					this.chooseList = [...this.chooseList, ...res2.data];
				}

			},
			clickZixuan(item) {
				if (item.type == 'usd') {
					if (item.symbol == 'XAUUSD') {
						this.stockType = 'wh';
					} else if (item.symbol == 'BTC') {
						this.stockType = 'usdt'
					} else {
						this.stockType = 'usd'
					}
				} else if (item.type == 'Spain') {
					this.stockType = 'Spain'
				}
				window.localStorage.setItem('stockType', this.stockType);
				this.$storage.save("stockDetail", item);
				this.$toPage(`/market/stockDetail?symbol=${item.symbol}`);
			},
			clickZhiDetail(item) {
				this.$storage.save("stockDetail", item);
			}
		},
	};
</script>

<style scoped lang="less">
	.page {
		padding-top: .58rem;
		padding-bottom: .85rem;
	}
	
	.banner{
		margin: .15rem;
		position: relative;
		img{width:100%;}
		.txt{
			position: absolute;top:.15rem;left:.2rem;z-index: 20;
			font-weight: 400;
			font-size: .13rem;
			color: #999999;
			img{width:.18rem;margin-left: .06rem;}
			span{
				font-weight: bold;
				font-size: .25rem;
				color: #1D1D1D;
				display: inline-flex;
				margin-top: .1rem;
			}
		}
	}
	.top {
		width: 100%;
		height: .58rem;
		background: #015AA4;
		position: fixed;
		left: 0;
		top: 0;

		.top-box {
			width: 100%;
			height: .58rem;
			display: flex;
			align-items: center;
			overflow-x: scroll;
			scrollbar-width: none;
			scrollbar-color: transparent transparent;
		}

		.top-item {
			font-weight: 500;
			font-size: 0.13rem;
			color: rgba(255, 255, 255, .5);
			padding: 0 .15rem;
			display: flex;
			align-items: center;
			justify-content: center;
			white-space: nowrap;
		}

		.top-on {
			font-weight: 500;
			font-size: 0.13rem;
			color: #fff;
		}
	}

	.long {
		height: .2rem;
		background: #015AA4;
	}

	.search {
		height: 0.38rem;
		background: #FFFFFF;
		box-shadow: 0 0.01rem 0.08rem 0 rgba(0, 0, 0, 0.15);
		border-radius: 0.05rem;
		margin: -.2rem .15rem 0 .15rem;
		display: flex;
		align-items: center;
		padding: 0 .09rem;
		font-weight: 400;
		font-size: 0.11rem;
		color: #9C9C9C;

		img {
			width: 0.15rem;
			height: 0.16rem;
			margin-right: .13rem;
		}
	}

	.menu {
		display: flex;
		flex-wrap: wrap;

		.menu-item {
			width: 20%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-weight: 400;
			font-size: 0.12rem;
			color: #1D1D1D;
			line-height: 0.17rem;
			margin-top: .2rem;

			img {
				width: .28rem;
				height: .24rem;
				object-fit: contain;
				margin-bottom: .07rem;
			}
		}
	}

	.zhiShu {
		margin-top: .2rem;
		padding: 0 .1rem;

		.itemBox {
			overflow: scroll;
			display: -webkit-box;
			scrollbar-width: none;
			scrollbar-color: transparent transparent;

			.item {
				width: 33%;
				background: #F5F5F3;
				border-radius: 0.03rem;
				padding: .06rem;
				margin: 0 0.04rem;

				.name {
					font-weight: 400;
					font-size: 0.1rem;
					color: #2C2C2C;
					line-height: 0.14rem;
				}

				.price {
					font-weight: 400;
					font-size: 0.15rem;
					color: #111111;
					line-height: 0.21rem;
					margin-top: .02rem;
				}

				.per {
					font-weight: 400;
					font-size: 0.1rem;
					line-height: 0.14rem;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.green {
						color: #41BC9A;
					}

					.red {
						color: rgba(224, 48, 47, 1);
					}
				}

				img {
					height: 0.22rem;
					width: 100%;
					margin-top: .04rem;
				}
			}
		}
	}

	.cot {
		padding: 0 0.14rem;

		.list {
			.lists {
				.list-item {
					margin-top: .15rem;
					display: flex;
					align-items: center;

					.name {
						width: calc(100% / 3);
						display: flex;
						flex-direction: column;
						justify-content: center;
						font-weight: 500;
						font-size: 0.14rem;
						color: #111111;
						line-height: 0.2rem;

						span {
							font-weight: 400;
							font-size: 0.12rem;
							color: #C7C7C7;
							line-height: 0.17rem;
							margin-top: .04rem;
						}
					}

					.price {
						width: calc(100% / 3);
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						font-weight: 500;
						font-size: 0.12rem;
						color: #111111;
						line-height: 0.17rem;

						span {
							font-weight: 400;
							font-size: 0.13rem;
							color: #A4A4A3;
							line-height: 0.18rem;
							margin-top: 0.02rem;
						}
					}

					.per {
						width: calc(100% / 3);
						display: flex;
						align-items: center;
						justify-content: flex-end;

						.per-info {
							height: 0.31rem;
							border-radius: 0.04rem;
							display: flex;
							align-items: center;
							justify-content: center;
							padding: 0 .14rem;
							font-weight: 400;
							font-size: 0.13rem;
							color: #FFFFFF;
						}

						.green {
							background: #41BC9A;
						}

						.red {
							background: rgba(224, 48, 47, 1);
						}
					}
				}
			}
		}
	}
</style>