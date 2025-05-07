<template>
	<div class="page home">
		<div class="header">
			<img src="../../assets/skin/home/mine.png" class="header-mine" @click="$toPage('/information/index')" />
			<div class="header-search" @click="$toPage('/favorite/search')"><img
					src="../../assets/skin/home/search.png" />{{$t('home').j1}}</div>
			<img src="../../assets/skin/home/kefu.png" class="header-ke" @click="getConfig" />
			<img src="../../assets/skin/home/msg.png" class="header-msg" @click="$toPage('/information/userInfo')" />
		</div>
		<div class="total" v-if="false">
			<div class="total-info" v-if="false">{{$t('mine').j16}}(USD)<span>{{$formatMoney(totalAssets)}}</span></div>
			<div class="total-btn" @click="$toPage('/information/recharge')">{{$t('mine').j17}}</div>
		</div>
		<div class="stockTab">
			<div class="item" :class="stockType==item.type?'sel':''" v-for="(item, idx) in stockTypeList" :key="idx" @click="stockType=item.type,clickStockTab(item.type)">{{item.name}}<span></span></div>
		</div>
		<div class="menu text-center flex-wrap" v-if="stockType=='Spain'||stockType=='usd'">
			<div class="menu-item" v-for="(item, index) in menu" :key="index" @click="$toPage(item.url)"><img :src="item.img" /><span v-html="item.name"></span></div>
		</div>
		<div class="banner" v-if="false">
			<div class="banner-top"></div>
			<div class="banner-foot"></div>
			<div class="banner-box">
				<div class="banner-left">
					<div class="banner-title">{{ $t('home').j8 }}</div>
					<div class="banner-tip">{{ $t('home').j9 }}</div>
					<div class="banner-line"></div>
				</div>
				<img class="banner-img" src="../../assets/skin/home/banner.png" />
			</div>
		</div>
		
		<div class="title" v-if="stockType=='usd'||stockType=='Spain'">{{ $t('market').j4 }}</div>
		<div class="zhiShu" v-if="stockType=='usd'||stockType=='Spain'">
			<div class="itemBox">
				<div class="item" v-for="(item,idx) in indexList" :key="idx" :class="item.gainValue>=0?'red':'green'" @click="$toDetail(`/market/stockDetail?symbol=${item.symbol}&type=zhishu`, item)">
					<div class="name">{{item.name}}</div>
					<div class="price">{{item.price}}</div>
					<!-- {{stockType=='usd'?'$ ':stockType=='Spain'?'€ ':''}} -->
					<div class="per">
						<div :class="item.gain>0?'green':'red'">{{item.gainValue}}</div>
						<div :class="item.gain>0?'green':'red'">{{item.gain}}%</div>
					</div>
					<img src="../../assets/skin/market/green.png" v-if="item.gain>0" />
					<img src="../../assets/skin/market/red.png" v-else />
				</div>
			</div>
		</div>
		
		<div class="title" v-if="stockType=='usd'||stockType=='Spain'">{{ $t('热门股票') }}</div>
    <div class="title" v-else>{{ $t('j3') }}</div>
		
		<div class="stock">
			<div class="item" v-for="(item,idx) in topList" v-if="idx<6"
				@click="$toDetail(`/market/stockDetail?symbol=${item.symbol}`, item)">
				<div class="item-name">{{stockType=='usd'||stockType=='Spain'?item.name:item.symbol}}<span>{{item.symbol}}</span></div>
				<div class="item-img">
					<img src="../../assets/skin/home/green.png" v-if="item.gain>0" />
					<img src="../../assets/skin/home/red.png" v-else />
				</div>
				<div class="item-price">
					<span :class="item.gain>0?'green':'red'">{{item.gain}}%</span>
          {{stockType=='Spain'?'':'$ '}}{{$formatMoney(item.price, 3)}}{{stockType=='Spain'?' €':''}}
				</div>
			</div>
		</div>
		<div class="more" @click="$toPage('/market/index')">{{ $t('home').j6 }}</div>
		
		<div class="title">{{ $t('home').j7 }}</div>
		<div class="news">
			<div class="news-list">
				<div class="news-item" v-for="(item, index) in newsList" v-if="index<4" :key="index"
					@click="clickNewsDetail(item)">
					<div class="news-left" :style="!item.img?'width:100%':''">
						<div class="news-title">{{ item.title }}</div>
						<div class="news-date">{{ $formatDate("DD-MM-YYYY hh:mm", item.created*1000) }}</div>
					</div>
					<img :src="item.img" v-if="item.img" />
				</div>
			</div>
		</div>
		<div class="more" @click="$toPage('/home/newsList')">{{ $t('home').j6 }}</div>
		<loading ref="loading" />
		<tab-bar :current="0"></tab-bar>
	</div>
</template>

<script>
	export default {
		name: "home",
		props: {},
		data() {
			return {
				menu: [],
				flagUp: true,
				flagUserPop: false,
				indexList: [],
				loading: true,
				loading1: true,
				kfUrl: "",
				isLoading: false,
				hotList: [],
				chooseList: [],
				newsList: [],
				tabList: [],
				totalAssets: 0,
				freezeAssets: 0,
				topList: [],
				stockTypeList:[
					{
						name: this.$t('stockTab').j1,//西班牙
						type: 'Spain'
					},
					{
						name: this.$t('stockTab').j2,//美国
						type: 'usd'
					},
					{
						name: this.$t('stockTab').j3,//数字货币
						type: 'usdt'
					},
					{
						name: this.$t('stockTab').j4,//外汇
						type: 'wh'
					}
				],
				stockType: 'usd'
			};
		},
		components: {},
		created() {},
		mounted() {
			this.stockType = window.localStorage.getItem('stockType')||'usd';
			this.clickStockTab(this.stockType);
			//this.getTotalAssets()
			//this.getTop();
			this.getNews();
			//this.getIndexList();
		},
		methods: {
			clickStockTab(type){
				window.localStorage.setItem('stockType',type);
				if(this.stockType == 'usd' || this.stockType=='Spain'){//西班牙,美国
					this.getTop();
					this.getIndexList();
				}else if(this.stockType == 'usdt'){//数字货币
					this.getExchange();
				}else if(this.stockType == 'wh'){//外汇
					this.getWh();
				}
        this.menu = [
          {
            name: this.$t("日内交易"),
            img: require('../../assets/skin/home/1.png?t=1'),
            url: "/home/dayTrading",
          },
          {
            name: this.$t("home").j3,
            img: require('../../assets/skin/home/2.png'),
            url: "/home/fllow?stockType="+this.stockType,
          },
          {
            name: this.$t('blockTrade').j1,
            img: require('../../assets/skin/market/1.png?t=1'),
            url: "/home/blockTrade?type=0&stockType="+this.stockType,
          },
          {
            name: this.$t('newStock').j4,
            img: require('../../assets/skin/market/3.png'),
            url: "/home/newStock?stockType="+this.stockType,
          },
          {
            name: this.$t("home").j4,
            img: require('../../assets/skin/market/7.png'),
            url: "/home/blockTrade?type=1&stockType="+this.stockType,
          },
          /* {
            name: this.$t("home").j2,
            img: require('../../assets/skin/home/1.png'),
            url: "/home/market",
          }, */
          {
            name: this.$t('mine').j17,
            img: this.stockType=='usd'?require('../../assets/skin/mine/3.png?t=1'):require('../../assets/skin/mine/31.png?t=1'),
            url: "/information/recharge?stockType="+this.stockType,
          },
          {
            name: this.$t('mine').j8,
            img: require('../../assets/skin/home/4.png'),
            url: "/information/authInfo",
          },
          {
            name: this.$t("mine").j7,
            img: require('../../assets/skin/mine/4.png?1'),
            url: "kefu",
          },
          /* {
            name: this.$t("home").j5,
            img: require('../../assets/skin/home/4.png'),
            url: "/information/aboutUs",
          }, */
        ]
			},
			async getTotalAssets() {
				this.$refs.loading.open(); //开启加载

				const res = await this.$server.post("/user/getUserinfo");
				if (res.status == 1) {
					this.userInfo = res.data;
				}
				let money = Number(this.userInfo.usd || 0); //用户可用余额
				// 获取跟单盈亏
				const res1 = await this.$server.post("/trade/userproductlist", {
					type: this.$stockType,
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
					type: this.$stockType,
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
					type: this.$stockType,
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
					type: this.$stockType,
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
				}

				// 大宗交易申请冻结
				const res5 = await this.$server.post("/trade/ustockslist", {
					type: this.$stockType,
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
					type: this.$stockType,
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
				this.freezeAssets =
					subscriptionProfit +
					followingFreeze +
					dayDelFreeze +
					bigDealFreeze +
					positionFreeze +
					dayDealFreeze;
				// 总资产
				this.totalAssets = money + this.freezeAssets;
				this.$refs.loading.close();


			},
			// 下拉刷新
			onRefresh() {
				this.menu()
				this.getTop();
				this.getNews();
				this.getIndexList();
			},
			getTop() { //排行
				this.$server.post("/parameter/top", {
					type: this.stockType
				}).then((res) => {
					if (res && res.data) {
						this.topList = res.data;
					}
				});
			},
			async getIndexList() { // 指数
				const res = await this.$server.post("/parameter/zhishu", {
					type: this.stockType
				});

				let arr = [];
				if (res && res.data) {
					arr = res.data;
				}

				this.loading = false;
				this.isLoading = false;

				this.indexList = arr;
			},
			async getExchange(){
				this.topList = [];
				let arr = ["BTC", "ETH", "XRP", "BNB", "SOL", "DOGE", "TRX", "ADA", "XLM", "AVAX", "SHIB", "TON", "LTC"];
				this.topList = [];
				for(var i in arr){
					var row = arr[i];
					const res = await this.$server.post('/trade/stockdetails',{
						symbol:row,
						type:"usd"
					});
					if(res&&res.data){
						this.topList.push(res.data);
					}
				}
			},
			async getWh(){
				this.topList = [];
				let arr = ["EUR/USD", "CAD/USD", "TWD/USD", "XAG/USD", "CHF/USD", "GBP/USD", "CNH/USD", "CNY/USD", "AUD/USD", "NZD/USD", "XAU/USD"];
				const res = await this.$server.post('/Common/exchange_fx',{
					type:"usd"
				});
				if(res&&res.data.data){
					this.topList = res.data.data.filter(function(item){
						return arr.includes(item.name);
					})
				}
			},
			getNews() {
				let per = {}
        if(this.stockType == 'usd'){
          per = {
            exchange: "us",
            lang: "en"
          }
        }else{
          per = {
            exchange: "es",
            lang: "es"
          }
        }

				this.$server.post("/common/newss", per).then((res) => {
					this.loading1 = false;
					if (res && res.data) {
						this.newsList = res.data.result;
					}
				});
			},
			clickNewsDetail(item) {
				window.localStorage.setItem('newsDetail', JSON.stringify(item));
				this.$toPage('/home/newsDetail');
			},
			async getConfig() {
				const res = await this.$server.post("/common/config", {
					type: "all"
				});
				let val = {};
				res.data.forEach((vo) => {
					val[vo.name] = vo.value;
				});
				this.kfUrl = val.kefu;
				this.$openUrl(this.kfUrl)
			},
		},
	};
</script>

<style scoped lang="less">
	.home {
		padding-top: .44rem;
		padding-bottom: .85rem;
		
		.header {
			width: 100%;
			position: fixed;
			left: 0;
			top: 0;
			height: 0.44rem;
			display: flex;
			align-items: center;
			padding: 0 .14rem;
		
			.header-search {
				width: calc(100% - 1.11rem);
				box-sizing: border-box;
				height: 0.31rem;
				background: #F5F5F3;
				border-radius: 0.05rem;
				display: flex;
				align-items: center;
				font-weight: 400;
				font-size: 0.11rem;
				color: #9C9C9C;
				padding: 0 .09rem;
		
				img {
					width: 0.15rem;
					height: 0.16rem;
					margin-right: .12rem;
				}
			}
		
			.header-mine {
				width: 0.28rem;
				height: 0.28rem;
				margin-right: .11rem;
			}
		
			.header-ke {
				width: 0.21rem;
				height: 0.2rem;
				margin-left: .15rem;
			}
		
			.header-msg {
				width: 0.2rem;
				height: 0.18rem;
				margin-left: .16rem;
			}
		}
		
		.total {
			height: 0.52rem;
			display: flex;
			align-items: center;
			justify-content: end;
			padding: 0 .14rem;
		
			.total-info {
				display: flex;
				flex-direction: column;
				justify-content: center;
				font-weight: 400;
				font-size: 0.11rem;
				color: #1D1D1D;
				line-height: 0.17rem;
		
				span {
					font-weight: 400;
					font-size: 0.2rem;
					color: #1D1D1D;
					line-height: 0.3rem;
					margin-top: .06rem;
				}
			}
		
			.total-btn {
				height: 0.27rem;
				background: #015AA4;
				border-radius: 0.05rem;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0 .15rem;
				font-weight: 400;
				font-size: 0.14rem;
				color: #fff;
			}
		}
		
		.menu {
			//height: .78rem;
			display: flex;
			align-items: center;
			margin-top: .2rem;
		
			.menu-item {
				width: 25%;
				height: .7rem;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: start;
				font-weight: 400;
				font-size: 0.12rem;
				color: #1D1D1D;
				line-height: 0.12rem;
        span{
          font-weight: 400;
          font-size: 0.12rem;
          color: #1D1D1D;
        }
		
				img {
					//width: 0.27rem;
					height: 0.28rem;
					object-fit: cover;
					margin-bottom: .05rem;
				}
			}
		}
		
		.banner {
			height: 1.2rem;
			margin: 0 .14rem;
			display: flex;
			flex-direction: column;
			position: relative;
		
			.banner-top {
				height: .77rem;
				background: #418ECD;
				border-radius: .1rem .1rem 0 0;
			}
		
			.banner-foot {
				height: .43rem;
				background: #015AA4;
				border-radius: 0 0 .1rem .1rem;
			}
		
			.banner-box {
				width: calc(100% - .2rem);
				padding: 0 .07rem;
				box-sizing: border-box;
				height: 1rem;
				background: #FFFFFF;
				border-radius: 0.1rem;
				position: absolute;
				left: .1rem;
				top: .1rem;
				display: flex;
				align-items: center;
			}
		
			.banner-img {
				width: 1.36rem;
				height: .88rem;
				margin-left: .1rem;
			}
		
			.banner-left {
				height: 1rem;
				width: calc(100% - 1.46rem);
				display: flex;
				flex-direction: column;
				justify-content: center;
			}
		
			.banner-title {
				font-weight: 400;
				font-size: 0.17rem;
				color: #1D1D1D;
				line-height: 0.25rem;
			}
		
			.banner-tip {
				font-weight: bold;
				font-size: 0.26rem;
				color: #1D1D1D;
				line-height: 0.52rem;
				margin-top: .01rem;
			}
		
			.banner-line {
				width: 1.38rem;
				height: 0.06rem;
				background: #015AA4;
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
						height: .3rem;
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
		
		.title {
			font-weight: 500;
			font-size: 0.15rem;
			color: #111111;
			line-height: 0.21rem;
			padding: 0 .14rem;
			margin-top: .17rem;
		}
		
		.more {
			height: 0.26rem;
			background: #F5F5F3;
			border-radius: 0.04rem;
			display: flex;
			align-items: center;
			justify-content: center;
			font-weight: 400;
			font-size: 0.12rem;
			color: #A3A3A3;
			margin: 0 .14rem;
		}
		
		.stockTab {
			height: .4rem;margin: 0 .14rem;
			border-bottom: .01rem solid #F7F7F7;
			display: flex;
			align-items: flex-end;
		
			.item {
				margin-right: .28rem;
				height: .47rem;
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
					margin-top: .1rem;
				}
				&.sel {
					color: #015AA4;
					
					span {
						background: #015AA4;
					}
				}
			}
		}
		
		.stock {
			.item {
				padding: .12rem .14rem;
				display: flex;
				align-items: center;
		
				.item-name {
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
		
				.item-img {
					width: calc(100% / 3);
					display: flex;
					align-items: center;
					justify-content: center;
		
					img {
						width: 1.03rem;
						height: .27rem;
					}
				}
		
				.item-price {
					width: calc(100% / 3);
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: flex-end;
					font-weight: 500;
					font-size: 0.12rem;
					color: #111111;
					line-height: 0.17rem;
		
					span {
						font-weight: 400;
						font-size: 0.13rem;
						line-height: 0.18rem;
						margin-bottom: .02rem;
					}
		
					.green {
						color: #41BC9A;
					}
		
					.red {
						color: rgba(224, 48, 47, 1);
					}
				}
			}
		}
		
		.news {
			padding: 0 .14rem .16rem .14rem;
		
			.news-list {
				.news-item {
					display: flex;
					align-items: center;
					margin-top: .18rem;
		
					.news-left {
						width: calc(100% - .87rem);
						height: 0.77rem;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
					}
		
					.news-title {
						font-weight: 500;
						font-size: 0.14rem;
						color: #111111;
						line-height: 0.19rem;
						overflow: hidden;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						text-overflow: ellipsis;
						white-space: normal;
					}
		
					.news-date {
						font-weight: 400;
						font-size: 0.12rem;
						color: #C3C3C3;
						line-height: 0.19rem;
					}
		
					img {
						width: 0.77rem;
						height: 0.77rem;
						object-fit: cover;
						border-radius: 0.05rem;
						margin-left: .1rem;
					}
				}
			}
		}
		
	}

	
</style>