<template>
	<div class="page">
		<top-back :title="$t('日内交易')"></top-back>

		<div class="nav-box flex flex-b">
			<div class="nav-item" v-for="(item, index) in navList" :key="index"
				:class="{ active: currmentIndex === item.type }" @click="changeNav(item.type)">
				{{ $t(item.name) }}
			</div>
		</div>

		<!-- 购买 -->
		<template v-if="currmentIndex == 0">
			<div class="tj">
				<div class="ipt">
					<div class="title">{{ $t("参与资金") }}</div>
					<div class="Input flex">
						<div>
							{{stockType=='Spain'?'':'$ '}}
						</div>
						<input v-model="money" type="text" @input="inputEvent" :placeholder="$t('请输入金额')"
							placeholder-style="color:#9A9FA5;" />
            <div>
              {{stockType=='Spain'?' €':''}}
            </div>
					</div>
					<div class="txt1 flex">
						<div>{{$t('可用资金')}}：</div>
						<span>{{stockType=='Spain'?'':'$ '}}{{$formatMoney(userInfo[stockType])}}{{stockType=='Spain'?' €':''}}</span>
					</div>
				</div>
				<div class="big_btn" @click="buyFn">{{ $t("提交") }}</div>
				<div class="txt">
					<div class="t">{{ $t("dayTrading").j1 }}</div>
					<div class="t1">{{ $t("dayTrading").j2 }}</div>
				</div>
			</div>
		</template>

		<template v-if="currmentIndex == 1">
			<div class="jy-list" v-if="chooseList.length">
				<div class="jy-item" v-for="(item, index) in chooseList" :key="index" @click="sellstrategy(item)">
					<div class="name">
						<div class="name-left">{{ item.stock_name }}<span>{{ item.stock_code }}</span></div>
						<div class="s-btn">{{ $t("抛售") }}</div>
					</div>
					<div class="hbg">
						<div class="item">
							<div class="t1">{{ $t("拥有数量") }}</div>
							<div class="t">{{ $formatMoney(item.stock_num) }}</div>
						</div>
						<div class="item">
							<div class="t1">{{ $t("评估金额") }}</div>
							<div class="t">{{stockType=='usd'?'$ ':''}}{{ $formatMoney(item.buy_price) }}{{stockType=='Spain'?' €':''}}</div>
						</div>
						<div class="item">
							<div class="t1">{{ $t("评估损益") }}</div>
							<div class="t">{{stockType=='usd'?'$ ':''}}{{ $formatMoney(item.yingkui) }}{{stockType=='Spain'?' €':''}}</div>
						</div>
						<div class="item">
							<div class="t1">{{ $t("收益率") }}</div>
							<div class="t" :class="item.gain > 0 ? 'green' : 'red'">
								{{ item.gain.toFixed(2) }}%
							</div>
						</div>
					</div>
				</div>
			</div>
			<no-data v-else></no-data>
		</template>

		<template v-if="currmentIndex == 2">
			<div class="mx-list" v-if="chooseList1.length">
				<div class="titles flex flex-b">
					<div class="flex-1">{{ $t("self").tit1 }}</div>
					<div class="flex-1 t-c">{{ $t("盈利金额") }}</div>
					<div class="flex-1 t-c">{{ $t("收益率") }}</div>
					<div class="flex-1 t-r">{{ $t("卖出时间") }}</div>
				</div>
				<div class="mx-item flex flex-b" v-for="(item, index) in chooseList1" :key="index">
					<div class="flex-1">
						<div class="name">{{ item.stock_name || "-" }}</div>
						<div class="code">{{ item.stock_code || "-" }}</div>
					</div>
					<div class="flex-1 t-c t">
            {{stockType=='usd'?'$ ':''}}{{ $formatMoney(item.yingkui) || "-" }}{{stockType=='Spain'?' €':''}}
					</div>
					<div class="flex-1 t-c t" :class="item.gain < 0 ? 'green' : 'red'">
						{{ item.gain ? item.gain.toFixed(2) : "0" }}%</div>
					<div class="flex-1 t-r t1">{{ $formatDate("DD-MM-YYYY", item.sell_time*1000) || "-" }}</div>
				</div>
			</div>
			<no-data v-else></no-data>
		</template>
		<!-- 已申请清单 -->
		<template v-if="currmentIndex == 3">
			<div class="mx-list" v-if="myList.length">
				<div class="titles flex flex-b">
					<div class="flex-1 ">{{ $t("金额") }}</div>
					<div class="flex-1 t-c">{{ $t("申请时间") }}</div>
					<div class="flex-1 t-c">{{ $t("审核时间") }}</div>
					<div class="flex-1 t-r">{{ $t("状态") }}</div>
				</div>
				<div class="mx-item flex flex-b" v-for="(item, index) in myList" :key="index">
					<div class="flex-1 t">{{stockType=='usd'?'$ ':''}}{{ $formatMoney(item.credit) }}{{stockType=='Spain'?' €':''}}</div>
					<div class="flex-1 t-c t">{{ $formatDate("DD-MM-YYYY", item.create_time*1000) || "-" }}</div>
					<div class="flex-1 t-c t" v-if="item.end_time">{{ $formatDate("DD-MM-YYYY", item.end_time*1000) }}
					</div>
					<div class="flex-1 t-c t" v-else>-</div>
					<div class="flex-1 t-r t">
						<span v-if="item.status==0">{{$t('审核中')}}</span>
						<span v-if="item.status==1">{{$t('已通过')}}</span>
						<span v-if="item.status==2">{{$t('已拒绝')}}</span>
					</div>
				</div>
			</div>
			<no-data v-else></no-data>
		</template>
		<loading ref="loading" />
	</div>
</template>

<script>
	export default {
		data() {
			return {
				money: "",
				userInfo: {},
				navList: [{
						name: "订单提交",
						type: 0
					},
					{
						name: "交易中",
						type: 1
					},
					{
						name: "交易明细",
						type: 2
					},
					{
						name: "已申请",
						type: 3
					},
				],
				currmentIndex: 0,
				chooseList: [],
				chooseList1: [],
				myList: [],
				show: false,
				stockObj: {},
				buyObj: {
					handle: null,
				},
				num: '',
				stockType:'',
				localType: ''
			};
		},
		computed: {},
		mounted() {
			this.localType = window.localStorage.getItem('stockType')||'usd';
			if(this.localType=='Spain'){
				this.stockType = this.localType;
			}else{
				this.stockType = 'usd';
			}
			this.getUserInfo();
		},
		methods: {
			inputEvent(e) {
				//let value = e.detail.value;
				// 限制输入数字
				this.$nextTick(() => {
					this.money = this.money.replace(/[^0-9]/g, "");
				});
			},
			getUserInfo() {
				this.$server.post("/user/getUserinfo").then((res) => {
					this.userInfo = res.data;
				});
			},
			TypeInput(e) {
				// 只能输入数字的验证;
				const inputType = /[^\d]/g; //想限制什么类型在这里换换正则就可以了
				this.$nextTick(function() {
					this.buyObj.handle = e.target.value.replace(inputType, "");
				});
			},
			//普通股票的持仓列表
			getNew() {
				this.$server.post("/trade/userstocklist", {
					dz_type: 3,
					type: this.stockType,
				}).then((res) => {
					this.$refs.loading.close();
					if (res.status == "1") {
						this.chooseList = Object.values(res.data);
						if(this.localType=='wh'){
							this.chooseList = this.chooseList.filter(function(item){
								return item.other_type == 'FX';
							})
						}else if(this.localType=='usdt'){
							this.chooseList = this.chooseList.filter(function(item){
								return item.other_type == 'CRY';
							})
						}
					}
				});
			},
			// 普通股票的平仓列表
			getNew1() {
				this.$server.post("/trade/userstocklists", {
					dz_type: 3,
					type: this.stockType,
				}).then((res) => {
					this.$refs.loading.close();
					if (res.status == "1") {
						this.chooseList1 = Object.values(res.data);
						if(this.localType=='wh'){
							this.chooseList = this.chooseList.filter(function(item){
								return item.other_type == 'FX';
							})
						}else if(this.localType=='usdt'){
							this.chooseList = this.chooseList.filter(function(item){
								return item.other_type == 'CRY';
							})
						}
					}
				});
			},
			// 平仓
			sellstrategy(item) {
				this.$refs.loading.open(); //开启加载
				this.$server.post("/trade/sell_stock", {
					id: item.id,
					dz_type: 3,
					type: this.stockType,
				}).then((res) => {
					this.$refs.loading.close();
					if (res.status == 1) {
						this.$toast(this.$t("position").txt4);
						this.getNew();
					} else {
						this.$toast(this.$formText(res.msg));
					}
				});
			},
			// 已申请列表
			getMine() {
				this.$server.post("/trade/urnjylist", {
					type: this.stockType,
				}).then((res) => {
					this.$refs.loading.close(); //开启加载
					this.myList = res.data;
				});
			},
			changeNav(index) {
				this.currmentIndex = index;

				if (index !== 0) {
					this.$refs.loading.open(); //开启加载
				}

				switch (index) {
					case 1:
						this.getNew();
						break;
					case 2:
						this.getNew1();
						break;
					case 3:
						this.getMine();
						break;

					default:
						break;
				}
			},
			buyFn() {
				if (!this.money) {
					this.$toast(this.$t("请输入金额"));
					return;
				}
				this.$refs.loading.open(); //开启加载
				
				let tmp = {
					money: this.money,
					type: this.stockType,
				}
				if(this.localType=='wh'){
					tmp.other_type = 'FX';
				}else if(this.localType=='usdt'){
					tmp.other_type = 'CRY';
				}
				
				this.$server.post("/trade/rnjy", tmp).then((res) => {
					this.$refs.loading.close();

					if (res.msg) {
						this.$toast(this.$t(res.msg));
						return;
					}
				});
			},
		},
	};
</script>

<style scoped lang="less">
	.page {}

	.tj {
		padding: 0 .2rem;

		.big_btn {
			margin-top: .55rem;
			height: 0.43rem;
			background: #015AA4;
			border-radius: 0.05rem;
		}

		.txt {
			line-height: 0.24rem;
			margin-top: .25rem;

			.t {
				font-size: 0.14rem;
				color: #737581;
			}

			.t1 {
				font-size: 0.12rem;
				color: #919191;
			}
		}
		.txt1{
			font-weight: 400;color:#777;
		}
		.ipt {
			.title {
				font-weight: 400;
				font-size: 0.13rem;
				color: #111111;
				line-height: 0.19rem;
				margin-top: .35rem;
			}
			.Input{
				background: #F5F5F5;
				border-radius: 0.08rem;
				padding: 0 0.1rem;
				margin: 0.15rem 0 0.2rem;
				color: #737581;
			}
			input {
				width: 100%;
				height: 0.44rem;
				background: none;
				margin-left: .1rem;

				&::placeholder {
					font-size: 0.12rem;
					color: #9a9fa5;
				}
			}
		}
	}

	.jy-list {
		.jy-item {
			padding: .15rem;
			border-bottom: 0.01rem solid rgba(247, 247, 247, 1);

			.name {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.name-left {
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
			}

			.s-btn {
				height: 0.25rem;
				background: #015AA4;
				border-radius: 0.04rem;
				padding: 0 0.15rem;
				font-weight: 400;
				font-size: 0.12rem;
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.hbg {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;

				.item {
					width: 48%;
					font-weight: 400;
					font-size: 0.13rem;
					color: #999999;
					line-height: 0.19rem;
					margin-top: .07rem;
					display: flex;
					align-items: center;
					justify-content: space-between;
				}

				.t {
					font-weight: 400;
					font-size: 0.13rem;
					color: #999999;
				}

				.t1 {
					font-weight: 600;
					font-size: 0.13rem;
					color: #333333;
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




	.mx-list {
		margin: 0.12rem;
		background: #ffffff;
		border-radius: 0.13rem;

		.mx-items {
			background: #ffffff;
			border-radius: 0.12rem;
			padding: 0.12rem;

			.t {
				font-weight: 600;
				font-size: 0.12rem;
				color: #000000;
			}

			.t1 {
				font-weight: 600;
				font-size: 0.12rem;
				color: #df4645;
			}

			.t2 {
				font-size: 0.12rem;
				color: #989898;
			}

			.t3 {
				font-weight: 600;
				font-size: 0.12rem;
				color: #232323;
			}
		}

		.titles {
			padding: 0.1rem;
			border-bottom: 0.01rem solid #f5f5f5;

			div {
				font-size: 0.12rem;
				color: #757575;
			}
		}

		.mx-item {
			padding: 0.16rem 0.12rem;

			.name {
				font-weight: bold;
				font-size: 0.12rem;
				color: #333333;
			}

			.code {
				font-weight: 400;
				font-size: 0.11rem;
				color: #999999;
			}

			.t {
				font-weight: bold;
				font-size: 0.12rem;
				color: #333333;
			}

			.t1 {
				font-weight: 400;
				font-size: 0.12rem;
				color: #999999;
			}
		}
	}


	.pd30 {
		padding: 20px 30px;

		.mx-item {
			border: 4px solid #133ca3;
			border-radius: 20px;
			padding: 30px 20px;
			margin-bottom: 20px;

			.b-btn {
				margin: 0;

				&.dis {
					background-color: #e71616;
				}
			}

			.name {
				font-size: 32px;
				color: #333333;

				&.st {
					color: #014b8d;
					font-family: Roboto;
					font-weight: bold;
				}
			}

			.code {
				display: inline-block;
				background: #f0f3fa;
				border-radius: 10px;
				padding: 10px 20px;
				font-size: 24px;
				color: #333;
				margin-top: 10px;
			}

			.num {
				font-size: 36px;
				font-family: Roboto;
				font-weight: bold;
				color: #333333;
			}

			.lv {
				font-size: 24px;
				color: #333333;

				.red {
					font-size: 36px;
					font-family: Roboto;
					font-weight: 400;
					// color: #F2232B;
					color: #e71616 !important;
					margin-left: 10px;

					&.die {
						color: #014b8d !important;
					}
				}
			}

			.time {
				font-size: 24px;
				color: #666666;
				margin-top: 30px;
			}
		}
	}

	.rns {
		position: fixed;
		top: 0.15rem;
		right: 0.15rem;
		z-index: 999;
	}

	.pop {
		background: #fff;
		// padding: 30px;
		border-radius: 10px;

		.pop-title {
			font-size: 32px;
			color: #fff;
			text-align: center;
			background: #014b8d;
			border-radius: 10px 10px 0 0;
			padding: 30px 0;
		}

		.pdd {
			padding: 0 30px 30px;

			.t2 {
				margin: 30px 0;
				color: #333333;
			}

			input {
				height: 80px;
				line-height: 80px;
				border-radius: 20px;
				background-color: #e9eff5;
				padding: 0 20px;
			}
		}

		.pop-price {
			padding: 30px 0;
			text-align: center;
			border-bottom: 2px solid #d4e0eb;

			.t {
				font-size: 32px;
				color: #333;
			}

			.t1 {
				font-size: 60px;
				font-family: Roboto;
				font-weight: bold;
				color: #014b8d;
			}
		}

		.pop-num {
			height: 60px;
			display: flex;
			align-items: center;
			// font-size: 30px;
			color: #333;
			margin-top: 20px;

			input {
				height: 88px;
				line-height: 88px;
				border: 2px solid #cccccc;
				border-radius: 20px;
				background-color: transparent;
				padding: 0 20px;
			}
		}

		.total {
			height: 100px;
			line-height: 100px;
			background: #f0f2f4;
			border-radius: 0 0 10px 10px;
			font-size: 32px;
			color: #014b8d;
			text-align: center;

			span {
				font-size: 40px;
				font-family: Roboto;
				font-weight: bold;
				color: #ff6000;
				margin-left: 10px;
			}
		}

		.b-btn {
			height: 100px;
			line-height: 100px;
			border-radius: 0 0 10px 0;
			text-align: center;
			margin: 0;
		}
	}

	.nav-box {
		padding: 0 0.15rem;
		background-color: #015AA4;

		.nav-item {
			padding: 0.1rem 0;
			flex: 1;
			font-weight: 500;
			font-size: 0.13rem;
			color: rgba(255, 255, 255, .5);
			text-align: center;
			position: relative;

			&.active {
				font-weight: 500;
				font-size: 0.13rem;
				color: #fff;
			}
		}
	}

	.th {
		// padding: 20px 30px;
		padding: 20px;
		background: #edf0f2;

		.th-td {
			color: #91a2b1;

			div {
				color: #91a2b1;
			}
		}
	}

	.list-box {
		.list-content {
			.list-item {
				padding: 30px 20px;
				border-bottom: 2px solid #cccccc;

				.b-btn {
					margin: 0 0 0 10px;
				}

				.shares-name-box {
					font-size: 32px;
					font-weight: bold;
					color: #333;

					div {
						font-size: 32px;
						// font-weight: bold;
						color: #333;
					}

					.code {
						background: #f0f3fa;
						border-radius: 10px;
						padding: 10px 0;
						font-size: 24px;
						font-weight: 400;
						font-family: Roboto;
						color: #333333;
						width: 140px;
						text-align: center;
						margin-top: 10px;
					}

					&.shares-price-num {
						font-family: Roboto;
						font-weight: bold;
						color: #ff3636;
					}
				}

				.new-price {
					display: flex;
					width: 17%;

					.shares-price-num {
						font-size: 28px;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #333;
					}
				}

				.shares-price {
					display: flex;
					width: 17%;

					.shares-price-num {
						font-size: 28px;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #333;
					}
				}

				.number {
					display: flex;
					width: 17%;

					.shares-price-num {
						font-size: 28px;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #333;
					}
				}

				.new-code {
					display: flex;
					width: 17%;
					justify-content: flex-end;
				}
			}
		}
	}

	::v-deep .uni-input-input {
		font-size: 32px;
		color: #333;
	}
</style>