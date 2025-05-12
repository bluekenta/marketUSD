<template>
	<div class="stockDetailBuy">
		<top-back :title="$t('new').b2"></top-back>
		
		<div class="buyType flex flex-c">
			<div class="item flex" :class="{'sel': buyType==1}" @click="buyType=1">{{ $t("sharesDetails").txt9 }}</div>
			<div class="item flex" :class="{'sel': buyType==2}" @click="buyType=2">{{ $t("sharesDetails").txt10 }}</div>
		</div>
		
		<div class="gdlx flex"><!-- 市价 限价 -->
			<div class="item flex" :class="{'sel':isLimit}" @click="setLimit(true)">{{ $t("sharesDetails").txt7 }}<span></span></div>
			<div class="item flex" :class="{'sel':!isLimit}" @click="setLimit(false)">{{ $t("sharesDetails").txt8 }}<span></span></div>
		</div>
		
		<div class="InputBox">
			<div class="item" v-if="isLimit">
				<div class="tit">{{ $t("sharesDetails").txt11 }}</div>
				<div class="input flex">
					<van-stepper v-model="buyPrice" />
				</div>
			</div>
			<div class="item">
				<div class="tit">{{ $t("sharesDetails").txt12 }}</div>
				<div class="input flex">
					<van-stepper v-model="buyAmount" />
				</div>
			</div>
			<div class="item" v-if="localType=='usdt'||localType=='wh'">
				<div class="tit">{{ $t("sharesDetails").txt13 }}</div>
				<div class="gang flex flex-b">
					<div class="txt flex" :class="{'sel': gangIdx==idx}" v-for="(item,idx) in gangList" :key="idx" @click="gangIdx=idx">{{item}}</div>
				</div>
			</div>
		</div>
		<div class="balance flex flex-b">
			<div>{{ $t("new").a64 }}</div>
			<span>{{stockType=='Spain'?'':'$ '}}{{$formatMoney(userInfo[stockType])}}{{stockType=='Spain'?' €':''}}</span>
		</div>
		
		<div class="Btn" @click="changeBuyType()">
			<div class="link flex flex-c" :class="buyType==1?'link1':'link2'">{{buyType==1?$t("sharesDetails").txt9:$t("sharesDetails").txt10}}</div>
		</div>
		
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
					<div class="t1">{{stockType=='Spain'?'':'$ '}}{{ $formatMoney(buySz,3) }}{{stockType=='Spain'?' €':''}}</div>
				</div>
		
				<div class="item flex flex-b">
					<div class="t">{{ $t("new").a62 }}</div>
					<div class="t1">{{stockType=='Spain'?'':'$ '}}{{ $formatMoney(buyFuwu,3) }}{{stockType=='Spain'?' €':''}}</div>
				</div>
		
				<div class="item flex flex-b">
					<div class="t">{{ $t("new").a63 }}</div>
					<div class="t1">{{stockType=='Spain'?'':'$ '}}{{ $formatMoney(buyTotal,3) }}{{stockType=='Spain'?' €':''}}</div>
				</div>
		
				<div class="item flex flex-b">
					<div class="t">{{ $t("new").a64 }}</div>
					<div class="t1">{{stockType=='Spain'?'':'$ '}}{{$formatMoney(userInfo[stockType])}}{{stockType=='Spain'?' €':''}}
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
	export default {
		name: "stockDetailBuy",
		props: {},
		data() {
			return {
				show: false,
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
				gangList: ['5','10','15','20','25'],
				gangIdx: 0,
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
				localType: '',
				buy: ''
			};
		},
		components: {},
		mounted() {
			this.symbol = this.$route.query.symbol;
			this.localType = window.localStorage.getItem('stockType')||'usd';
			if(this.localType=='Spain'){
				this.stockType = this.localType;
			}else{
				this.stockType = 'usd';
			}
			this.buyType = this.$route.query.buyType|| 1;
			
			this.requestDetail(true);
			this.getConfig();
			this.getUserInfo();
			this.detailTime = setInterval(() => {
				this.requestDetail();
			}, 5000);
			if(this.localType=='usdt'||this.localType=='wh'){
				this.buyGang = this.gangList[this.gangIdx];
			}else{
				this.buyGang = 1;
			}
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
				console.log(1,scale,this.buyGang)
				return this.buyBj * scale;
			},
			// 本金
			buyBj() {
				//按手
				if (this.cfg.buytype == 1) {
					return this.buyGu * this.buyPrice * 100;
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
				//console.log(val)
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
				if (type == 2) this.buyPrice = parseFloat(this.details.price).toFixed(3); //初始价格
			},
			changeBuyType(type) {
				//this.buyType = type;
				this.show = true;
				//this.$toPage('/market/stockDetailBuy?symbol='+this.symbol+'&buyType='+this.buyType);
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
				//this.buyGang = parseInt(arr[0]); //杠杆倍数给默认值
				/* this.gangList = [];
				for(var i in arr){
					var row = arr[i];
					let tmp = {
						name: row
					}
					this.gangList.push(tmp);
				} */
				this.cfg = val;
			},
			requestDetail(isInit) {
				this.$server.post("/trade/stockdetails", {
					symbol: this.symbol,
					type: this.stockType
				}).then((res) => {
					this.isLoading = false; //下拉刷新状态
					this.details = res.data;
	
					if (isInit) {
						this.buyPrice = parseFloat(this.details.price).toFixed(3); //初始价格
						this.getMine();
					}
				});
			},
			buyStock() {
				console.log(this.buy);
				if(this.localType=='usdt'||this.localType=='wh'){
					this.buyGang = this.gangList[this.gangIdx];
				}else{
					this.buyGang = 1;
				}
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
				//新增参数 other_type 其他买入类型(ETF,CRY-加密货币,FUT-期货,FX-外汇)
				if (window.localStorage.getItem('stockType')=='wh') {
					op.is_qc = 4;//this.buy
					op.other_type = 'FX';
				}else if (window.localStorage.getItem('stockType')=='usdt') {
					op.is_qc = 5;//this.buy
					op.other_type = 'CRY';
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
			onSelect(event){
				
			}
		},
	};
</script>

<style scoped lang="less">
	.stockDetailBuy{
		.buyType{
			border-bottom: .01rem solid #EFEFF2;
			height: .7rem;
			.item{
				height: .31rem;
				background: #F5F5F3;
				border-radius: .05rem;
				margin: 0 .07rem;padding: 0 .3rem;
				font-weight: 600;
				font-size: .15rem;
				color: #848484;
			}
			.sel{
				color:#fff;
				&.item:first-child{
					background: #41BC9A;
				}
				&.item:last-child{
					background: #E0302F;
				}
			}
		}
		.gdlx{
			border-bottom: .01rem solid #EFEFF2;
			height: .47rem;padding: 0 .15rem;
			.item{
				position: relative;
				margin-right: .23rem;
				font-weight: 500;
				font-size: .13rem;
				color: #989898;
				height: .47rem;
				span{
					position: absolute;bottom:0;left:0;
					width:100%;height: .04rem;border-radius: .02rem;
					display: block;
				}
				&.sel{
					color: #111111;
					span{
						background: #015AA4;
					}
				}
			}
		}
		.InputBox{
			padding: .15rem;
			.item{
				.tit{
					font-weight: 400;
					font-size: .12rem;
					color: #999999;
					padding: .1rem 0;
				}
				.input{
					height: .4rem;
					border-radius: .02rem;
					border: .01rem solid #BBBBBB;
					box-sizing: border-box;
					padding: .03rem;
				}
				.gang{
					.txt{
						height: .28rem;
						border-radius: .02rem;
						border: .01rem solid #BBBBBB;
						padding: 0 .23rem;
						font-weight: 600;
						font-size: .14rem;
						color: #333333;
						&.sel{
							background: #015AA4;color:#fff;
							border: .01rem solid #015AA4;
						}
					}
				}
			}
		}
		.balance{
			padding: .15rem;
			font-weight: 400;
			font-size: .12rem;
			color: #999999;
			span{
				font-weight: 500;
				font-size: .16rem;
				color: #015AA4;
			}
		}
		.Btn{
			padding: .4rem .15rem .1rem;
			.link{
				height: .43rem;
				border-radius: .05rem;
				font-weight: 500;
				font-size: .15rem;
				color: #FFFFFF;
				&.link1{
					background: #41BC9A;
				}
				&.link2{
					background: #E0302F;
				}
			}
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
		
	}
	
	::v-deep .van-stepper {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 0.34rem;flex:1;
		background: #FFFFFF;
	
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
		width: 0.34rem;
		height: 0.34rem;
		background: #EFEFF2 url('../../assets/skin/market/jian.png') center no-repeat;
		background-size: .25rem .25rem;
		border-radius: .02rem;
	
		&:before {
			display: none;
		}
	}
	
	::v-deep .van-stepper__plus {
		width: 0.34rem;
		height: 0.34rem;
		background: #EFEFF2 url('../../assets/skin/market/jia.png') center no-repeat;
		background-size: .25rem .25rem;
		border-radius: .02rem;
	
		&:before,
		&:after {
			display: none;
		}
	}
</style>