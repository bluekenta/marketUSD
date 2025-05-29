<template>
	<div class="page stockDetail">
		<div class="header flex flex-b">
			<img src="../../assets/skin/mine/back.png?2" @click="goBack" />
			<div class="flex-column-item">
				<div>{{ buy!=4?details.name:details.symbol }}</div>
				<span>({{details.symbol}})</span>
			</div>
			<div class="flex">
				<div class="favo" @click="addSelect(details)">
					<img src="../../assets/market/add.png?1" v-if="!is_zixuan" />
					<img src="../../assets/market/del.png?1" v-else />
				</div>
			</div>
		</div>
		<van-pull-refresh v-model="isLoading" @refresh="onRefresh" :loosing-text="$t('new').t3"
			:loading-text="$t('new').t4" :pulling-text="$t('new').t5">
			<div class="pg">
				<div class="top-data">
					<div class="flex tp">
						<div class="price " :class="details.gain >= 0 ? 'green' : 'red'">
              <template v-if="type!='zhishu'">{{stockType=='Spain'?'':'$ '}}</template>{{ $formatMoney(details.price,stockType=='Spain' || stockType=='usd' ? 3: 2) }}{{stockType=='Spain'?' €':''}}
						</div>
						<div class="t" :class="details.gain >= 0 ? 'green' : 'red'">
							<span>
								<template v-if="type!='zhishu'">{{stockType=='Spain'?'':'$ '}}</template>{{ Number(details.gain) > 0 ? "+" : "" }}{{ $formatMoney(details.gainValue,stockType=='Spain' || stockType=='usd' ? 3: 2) }}{{stockType=='Spain'?' €':''}}
							</span>
							<span>
								{{ Number(details.gain) > 0 ? "+" : "" }}{{ details.gain }}%
							</span>
						</div>
					</div>
					<div class="list flex flex-b">
						<div class="flex  flex-b item ">
							<div class="t1">{{ $t("sharesDetails").txt1 }}</div>
							<div class="t2 red-txt">
                <template v-if="type!='zhishu'">{{stockType=='Spain'?'':'$ '}}</template>{{ isNaN(Number(details.open).toFixed(2)) ? "0" : $formatMoney(Number(details.open),stockType=='Spain' || stockType=='usd' ? 3: 2) }}{{stockType=='Spain'?' €':''}}
							</div>
						</div>
						<div class="flex flex-b item">
							<div class="t1">{{ $t("sharesDetails").txt2 }}</div>
							<div class="t2 green-txt">
                <template v-if="type!='zhishu'">{{stockType=='Spain'?'':'$ '}}</template>{{ isNaN(Number(details.preClose).toFixed(2)) ? "0" : $formatMoney(Number(details.preClose),stockType=='Spain' || stockType=='usd' ? 3: 2) }}{{stockType=='Spain'?' €':''}}
							</div>
						</div>
						<div class="flex flex-b item">
							<div class="t1">{{ $t("sharesDetails").txt3 }}</div>
							<div class="t2">
                <template v-if="type!='zhishu'">{{stockType=='Spain'?'':'$ '}}</template>{{ $formatMoney(Number(details.high),stockType=='Spain' || stockType=='usd' ? 3: 2) }}{{stockType=='Spain'?' €':''}}
							</div>
						</div>
						<div class="flex flex-b item">
							<div class="t1">{{ $t("sharesDetails").txt4 }}</div>
							<div class="t2">
                <template v-if="type!='zhishu'">{{stockType=='Spain'?'':'$ '}}</template>{{ $formatMoney(Number(details.low),stockType=='Spain' || stockType=='usd' ? 3: 2) }}{{stockType=='Spain'?' €':''}}
							</div>
						</div>
						<div class="flex flex-b item">
							<div class="t1">{{ $t("sharesDetails").txt5 }}</div>
							<div class="t2">{{ $formatMoney(details.volume, 0) }}M</div>
						</div>
					</div>
				</div>
				<div class="box">
					<template v-if="currmentIndex == 0">
						<k-line :details="details" :symbol="symbol" :stockType="stockType" ></k-line>
						<div class="buy animate__animated animate__fadeIn">
							<div class="tab flex flex-e" v-if="false">
								<div class="tab-item flex flex-c" :class="{ active: isLimit }" @click="setLimit(true)">
									{{ $t("sharesDetails").txt7 }}
								</div>
								<div class="tab-item flex flex-c" :class="{ active: !isLimit }"
									@click="setLimit(false)">
									{{ $t("sharesDetails").txt8 }}
								</div>
							</div>

							<!-- 限价 -->
							<div class="input-box" v-if="isLimit&&false">
								<div class="ipt flex">
									<div class="name"> {{ $t("sharesDetails").txt11 }} </div>
									<div class="flex-1">
										<van-stepper v-model="buyPrice" />
									</div>
								</div>
								<div class="ipt flex">
									<div class="name"> {{ $t("sharesDetails").txt12 }} </div>
									<div class="flex-1">
										<van-stepper v-model="buyAmount" />
									</div>
								</div>

								<div class="ipt flex" v-if="false">
									<div class="name"> {{ $t("sharesDetails").txt13 }} </div>
									<div class="flex-1">
										<van-stepper v-model="buyGang" />
									</div>
								</div>
							</div>

							<!-- 市价 -->
							<div class="input-box" v-if="!isLimit&&false">
								<!-- <div class="ipt flex flex-b">
								  <div class="flex-1">
									{{ $t("sharesDetails").txt11 }}
								  </div>
								  <div class="flex-2">
									<van-stepper v-model="buyPrice" />
								  </div>
								</div> -->
								<div class="ipt flex">
									<div class="name"> {{ $t("sharesDetails").txt12 }} </div>
									<div class="flex-1">
										<van-stepper v-model="buyAmount" />
									</div>
								</div>

								<div class="ipt" v-if="false">
									<div class="name"> {{ $t("sharesDetails").txt13 }} </div>
									<div>
										<van-stepper v-model="buyGang" />
									</div>
								</div>

							</div>

							<!-- 买多、空 -->
							<div class="btns flex flex-b">
								<div class="bt flex flex-c" :class="{ active: buyType == 1 }" @click="changeBuyType(1)">
									{{ $t("sharesDetails").txt9 }}
								</div>
								<div class="bt bt1 flex flex-c" :class="{ active: buyType == 2 }" @click="changeBuyType(2)">
									{{ $t("sharesDetails").txt10 }}
								</div>
							</div>

							<!-- <div class="b-btn" @click="show = true">
							  {{ $t("sharesDetails").btn }}
							</div> -->
						</div>
					</template>

					<!-- 概括 -->
					<template v-if="currmentIndex == 1">
						<gkInfo :symbol="details.symbol" :stockType="stockType" />
					</template>

					<!-- 问题 -->
					<template v-if="currmentIndex == 2">
						<questionInfo :symbol="details.symbol" :stockType="stockType" />
					</template>
				</div>
			</div>
		</van-pull-refresh>

		<van-popup v-model="show" position="bottom" :round="true" closeable>
			<div class="popup">
				<div class="title">
					<div class="name">{{ $t(details.name) }}</div>
					<div class="code" v-if="false">{{ $t(details.symbol) }}</div>
				</div>
				<div class="tab flex flex-b" v-if="false">
					<div class="tab-item" :class="{ active: isLimit }" @click="setLimit(true)">
						{{ $t("sharesDetails").txt7 }}
					</div>
					<div class="tab-item" :class="{ active: !isLimit }" @click="setLimit(false)">
						{{ $t("sharesDetails").txt8 }}
					</div>
				</div>

				<div class="item flex flex-b" v-if="isLimit&&false">
					<div class="t flex-1">{{ $t("sharesDetails").txt11 }}</div>
					<div class="t1 flex-1">
						<!-- <van-stepper v-model="buyPrice" decimal-length='2' /> -->
						<input v-model="buyPrice" />
						<!-- {{ isLimit ? $formatMoney(buyPrice) : $t("sharesDetails").txt17 }} -->
					</div>

				</div>

				<div class="item flex flex-b" v-if="false">
					<div class="t flex-1">{{ $t("new").a60 }}</div>
					<div class="t1 flex-1">
						<!-- {{ $formatMoney(buyGu) }} -->
						<van-stepper v-model="buyAmount" />
					</div>
				</div>

				<div class="item flex flex-b">
					<div class="t">{{ $t("new").a61 }}</div>
					<div class="t1">{{ $formatMoney(buySz,3) }}</div>
				</div>

				<div class="item flex flex-b">
					<div class="t">{{ $t("new").a62 }}</div>
					<div class="t1">{{ $formatMoney(buyFuwu,3) }}</div>
				</div>

				<div class="item flex flex-b">
					<div class="t">{{ $t("new").a63 }}</div>
					<div class="t1">{{ $formatMoney(buyTotal,3) }}</div>
				</div>

				<div class="item flex flex-b">
					<div class="t">{{ $t("new").a64 }}</div>
					<div class="t1">{{ stockType=='try'?$formatMoney(userInfo.try):$formatMoney(userInfo.usd) || 0 }}
					</div>
				</div>

				<div class="item" @click="buyStock">
					<div class="big_btn ">{{ $t("sharesDetails").btn }}</div>
				</div>
			</div>
		</van-popup>
		<loading ref="loading" />
	</div>
</template>

<script>
	import kLine from "./components/k-line.vue";
	import gkInfo from "./components/gkInfo.vue";
	import questionInfo from "./components/questionInfo.vue";

	export default {
		name: "stockDetail",
		props: {},
		data() {
			return {
				currmentIndex: 0,
				isLoading: false,
				userInfo: {},
				show: false,
				buyPrice: "",
				buyAmount: "",
				buyGang: "",
				buyType: 1,
				isLimit: false,
				details: {},
				detailTime: null,
				symbol: "",
				is_zixuan: false,
				cfg: {},
				navList: [{
						name: this.$t("行情"),
						type: 0,
					},
					{
						name: this.$t("newt").t42,
						type: 1,
					},
					{
						name: this.$t("问题"),
						type: 2,
					},
				],
				stockType: 'usd',
				buy: '',
        type: ''
			};
		},
		components: {
			kLine,
			gkInfo,
			questionInfo
		},
		created() {
			this.symbol = this.$route.query.symbol;
      if(this.$route.query.type){
        this.type = this.$route.query.type;
      }
			let stockType = window.localStorage.getItem('stockType')||'usd';
			if(stockType=='Spain'){
				this.stockType = stockType;
			}else{
				this.stockType = 'usd';
			}
			if (this.$route.query.buy) {
				this.buy = this.$route.query.buy
			}
			this.requestDetail(true);
			this.getConfig();
			this.getUserInfo();
			this.detailTime = setInterval(() => {
				this.requestDetail();
			}, 5000);
		},
		beforeDestroy() {
			!!this.detailTime && clearInterval(this.detailTime);
		},
		computed: {
			// 股数
			buyGu() {
				if (this.cfg.buytype == 1) {
					// 买入类型(1手)
					// return parseInt(this.buyAmount) * 100;
					return parseInt(this.buyAmount);
				}
				return 0;
			},
			// 市值
			buySz() {
				let scale = this.cfg.gtype == 1 ? this.buyGang : 1;
				return this.buyBj * scale;
			},
			// 本金
			buyBj() {
				//按手
				if (this.cfg.buytype == 1) {
					return this.buyGu * this.buyPrice;
				}
				//按万
				return Number(this.buyAmount) * this.buyPrice;
			},
			// 服务费
			buyFuwu() {
				let val = this.buySz * Number(this.cfg.buycharge);

				if (val < this.cfg.minshouxu) {
					return Number(this.cfg.minshouxu);
				}
				console.log(val)
				return val;
			},
			// 合计
			buyTotal() {
				return this.buyBj + this.buyFuwu;
			},
		},
		methods: {
			goBack() {
				this.$router.go(-1);
			},
			changeNav(type) {
				this.currmentIndex = type;
			},
			// 下拉刷新
			onRefresh() {
				this.requestDetail(true);
				this.getConfig();
				this.getUserInfo();
			},
			setLimit(type) {
				this.isLimit = type;
				if (type == 2) this.buyPrice = parseFloat(this.details.price).toFixed(2); //初始价格
			},
			changeBuyType(type) {
				this.buyType = type;
				//this.show = true;
				this.$toPage('/market/stockDetailBuy?symbol='+this.symbol+'&buyType='+this.buyType);
			},
			getUserInfo() {
				this.$server.post("/user/getUserinfo").then((res) => {
					if (res.status == 1) {
						this.userInfo = res.data;
					}
				});
			},
			// 获取配置logo
			async getConfig() {
				const res = await this.$server.post("/common/config", {
					type: this.$stockType
				});
				let val = {};
				res.data.forEach((vo) => {
					val[vo.name] = vo.value;
				});

				let arr = val.ganggang.split("/");
				this.buyGang = parseInt(arr[0]); //杠杆倍数给默认值

				this.cfg = val;
			},
			requestDetail(isInit) {
				this.$server.post("/trade/stockdetails", {
					symbol: this.symbol,
					type: this.stockType
				}).then((res) => {
					this.isLoading = false; //下拉刷新状态
					this.details = res.data;
					if(this.details.name=='Gold'){
						this.details.name = 'XAU/USD';
					}
					if (isInit) {
						this.buyPrice = parseFloat(this.details.price).toFixed(2); //初始价格
						this.getMine();
					}
				});
			},
			buyStock() {
				console.log(this.buy)
				this.$refs.loading.open(); //开启加载
				let op = {
					symbol: this.details.symbol,
					zhang: this.buyAmount,
					ganggan: this.buyGang,
					buyzd: this.buyType, //1 up ，2down
					buy_price: this.buyPrice,
					type: this.stockType,
					gdlx: this.isLimit ? 2 : 1,
				}
				if (window.localStorage.getItem('stockType')=='wh') {
					op.is_qc = 4;//this.buy
				}else if (window.localStorage.getItem('stockType')=='usdt') {
					op.is_qc = 5;//this.buy
				}
				//普通购买
				this.$server.post("/trade/buy_stock", op).then((res) => {
					this.$refs.loading.close(); //关闭加载

					if (res.status == 1) {
						this.show = false;
						this.$toast(this.$t(res.msg));
						setTimeout(() => {
							this.$toPage("/trade/index"); //跳转持仓
						}, 1000);
					}
				});
			},
			getMine() {
				this.$server.post("/user/Optionallist", {
					type: this.$stockType
				}).then((res) => {
					if (res.status == 1) {
						// 判断当前是否在自选列表里面
						let arr = res.data.filter(
							(item) => item.symbol == this.details.symbol
						);
						if (arr.length) this.is_zixuan = true;
					}
				});
			},
			addSelect(obj) {
				this.$refs.loading.open(); //加载

				if (!this.is_zixuan) {
					this.$server.post("/user/addOptional", {
						symbol: obj.symbol,
						type: this.$stockType
					}).then((res) => {
						this.$refs.loading.close();

						if (res.status == 1) {
							this.is_zixuan = true;
						}
					});
				} else {
					this.$server.post("/user/removeOptional", {
						symbol: obj.symbol,
						type: this.$stockType
					}).then((res) => {
						this.$refs.loading.close();

						if (res.status == 1) {
							this.is_zixuan = false;
						}
					});
				}
			},
		},
	};
</script>

<style scoped lang="less">
	::v-deep .van-stepper {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 0.39rem;
		background: #FFFFFF;
		border-radius: 0.08rem;
		border: 0.01rem solid #015AA4;

		.van-stepper__input {
			flex: 1;
			background: transparent;
			height: 100%;
			margin: 0;
			font-family: PingFangSC, PingFang SC;
			font-weight: 600;
			font-size: 0.15rem;
			color: #333333;
		}
	}

	::v-deep .van-stepper__minus {
		width: 0.39rem;
		height: 0.39rem;
		background: #FFE8E9;
		border-right: 0.01rem solid #015AA4;
		background: url('../../assets/skin/market/jian.png') center no-repeat;
		background-size: .25rem .25rem;

		&:before {
			display: none;
		}
	}

	::v-deep .van-stepper__plus {
		width: 0.39rem;
		height: 0.39rem;
		background: #FFE8E9;
		border-left: 0.01rem solid #015AA4;
		background: url('../../assets/skin/market/jia.png') center no-repeat;
		background-size: .25rem .25rem;

		&:before,
		&:after {
			display: none;
		}
	}

	.page {
		padding: .6rem 0 0;
		min-height: 100vh;
	}

	.header {
		height: .6rem;
		width: 100%;
		background: #015AA4;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 888;
		font-weight: 600;
		font-size: 0.14rem;
		color: #fff;
		padding: 0 0.12rem;

		span {
			font-weight: 500;
			font-size: 0.12rem;
			color: rgba(255, 255, 255, .5);
		}

		img {
			width: .1rem;
		}

		.favo {
			margin-left: 0.1rem;

			img {
				width: .2rem;
				margin-right: 0;
			}
		}

		.search {
			background: none;
			height: auto;
			margin: 0;
			padding: 0;

			img {
				width: .24rem;
			}
		}
	}

	.stockDetail {
		.top-data {
			background: #FFFFFF;
			padding: 0.12rem;
			border-bottom: .01rem solid #EFEFF2;
			.tp {
				.price {
					font-weight: 600;
					font-size: 0.3rem;
				}

				.t {
					margin-top: 0.08rem;
					font-weight: 500;
					font-size: 0.13rem;

					img {
						width: .1rem;
						margin: 0 .04rem 0 .08rem;
					}

					span {
						margin-left: .1rem;
					}
				}

				.green {
					color: #41BC9A;
				}

				.red {
					color: rgba(224, 48, 47, 1);
				}

			}

			.list {
				flex-wrap: wrap;
				padding: 0.12rem 0 0;

				.item {
					width: 48%;
					line-height: 0.24rem;

					.t1 {
						font-family: PingFangSC, PingFang SC;
						font-weight: 400;
						font-size: 0.13rem;
						color: #999999;
					}

					.t2 {
						font-family: PingFangSC, PingFang SC;
						font-weight: 500;
						font-size: 0.13rem;
						color: #333333;
					}
				}
			}
		}

		.nav-box {
			height: .36rem;
			background: linear-gradient(180deg, #FFE8E9 0%, #FFFFFF 100%);
			margin-bottom: 0.12rem;

			.nav-item {
				width: 30%;
				font-family: PingFangSC, PingFang SC;
				font-weight: 600;
				font-size: 0.14rem;
				color: #333333;
				padding: 0.15rem 0.1rem;
				text-align: center;
				background: rgba(255, 255, 255, 0.2);
				border-radius: .13rem;

				&.active {
					font-family: PingFangSC, PingFang SC;
					font-weight: 500;
					font-size: 0.14rem;
					color: #015AA4;
					width: 1.27rem;
					height: 0.44rem;
					background: url(../../assets/v2/tabBg.png) no-repeat center/100%;
					background: #FFFFFF;
					border-radius: .13rem;
				}
			}
		}

		.box {
			margin-top: 0.1rem;
			border-radius: .1rem .1rem 0 0;
			background: #fff;
			overflow: hidden;
		}

		.popup {
			padding: 0.2rem 0;

			.title {
				margin-bottom: 0.1rem;
				text-align: center;

				.name {
					font-weight: bold;
				}

				.code {
					font-size: 0.12rem;
					font-weight: 500;
					color: #8f8f8f;
					margin-top: 0.05rem;
				}
			}

			.item {
				padding: 0.1rem .16rem;

				.t {
					font-size: 0.12rem;
					color: #8f8f8f;
				}

				.t1 {
					font-weight: 500;
				}

				input {
					height: .34rem;
					border-radius: .04rem;
					border: .01rem solid #E8E8E8;
					text-align: center;
				}
			}

			.b-btn {
				margin: 0.1rem 0 0;
			}

			.tab {
				border-bottom: .01rem solid #F6F6F6;

				.tab-item {
					padding: .1rem;
					position: relative;
					font-size: 0.14rem;
					color: #A1A1A1;
					width: 48%;
					text-align: center;

					&.active {
						color: #1B1B1B;
						border-bottom: .01rem solid #1B1B1B;
					}
				}
			}

		}

		.buy {
			.tab {
				padding: 0.12rem 0.12rem 0;

				.tab-item {
					position: relative;
					height: 0.26rem;
					border-radius: 0.06rem;
					border: 0.01rem solid #E5E5E5;
					font-family: PingFangSC, PingFang SC;
					font-weight: 400;
					font-size: 0.14rem;
					color: #999999;
					//width: 24%;
					padding: 0 .1rem;
					text-align: center;
					margin-left: 0.1rem;

					&.active {
						border: 0.01rem solid #015AA4;
						color: #015AA4;
					}
				}
			}

			.ipt {
				margin: 0.12rem 0;

				.name {
					width: 30%;
					margin-right: 0.1rem;
					font-family: PingFangSC, PingFang SC;
					font-weight: 400;
					font-size: 0.14rem;
					color: #333333;
				}
			}

			.input-box {
				padding: 0.12rem .16rem 0;

				.flex-1 {
					font-size: 0.14rem;
					color: #8f8f8f;
				}
			}

			.btns {
				margin: 0.3rem 0.15rem .15rem;
				border-radius: 0.06rem;
				position: relative;
				overflow: hidden;

				.bt {
					font-weight: 500;
					font-size: 0.14rem;
					text-align: center;
					height: 0.43rem;
					background: #41BC9A;
					//border: 0.01rem solid #015AA4;
					color: #fff;
					width: 48%;
					border-radius: .04rem;
					//padding: 0.1rem 0;

					&.bt1 {
						background: #E0302F;
						//border: 0.01rem solid #015AA4;
					}
				}
			}

			.b-btn {}
		}


	}
</style>