<template>
	<div class="page ">
		<top-back :title="item.name"></top-back>
		<div class="tab">
			<div class="tab-item" v-for="(item, index) in navList" :key="index"
				:class="{ active: currmentIndex == item.type }" @click="changeNav(item.type)">
				{{ item.name }}<span></span>
			</div>
		</div>
		<template v-if="currmentIndex==0">
			<div class="item">
				<div class="item-middle">
					<div class="item-middle-left">{{$t('home').j15}}</div>
					<div class="item-middle-right">
						{{$formatMoney(item.lsyl)}}<span>{{$formatMoney(item.lsylbfb)}}%</span></div>
				</div>
				<div class="item-foot">
					<div class="item-list flex-start">{{$t('home').j16}}<span>{{item.shenglv}}%</span></div>
					<div class="item-list">{{$t('home').j17}}<span>{{$formatMoney(item.gendangm)}}</span></div>
					<div class="item-list flex-end">{{$t('home').j18}}<span>{{$formatMoney(item.zxgdje)}}</span></div>
				</div>
			</div>
			<div class="big_btn animate__animated animate__fadeIn" @click="stockDetails">{{$t('home').j19}}</div>
		</template>
		<template v-if="currmentIndex==1">
			<div class="list" v-for="(item, index) in chooseList" :key="index">
				<div class="list-top">
					<div class="list-top-left">{{item.daoshiname}}<span>{{ $t(item.stat) }}</span></div>
					<div class="list-top-right">{{item.shenglv}}<span>{{$t('home').j16}}</span></div>
				</div>
				<div class="list-it">{{$t('home').j18}}<span>{{item.ljgdje}}</span></div>
				<div class="list-it">
					{{$t('home').j24}}<span>{{ $formatDate("DD.MM.YYYY hh:mm:ss",item.create_time*1000) || "-" }}</span>
				</div>
			</div>
		</template>
		<template v-if="currmentIndex==2">
			<div class="list" v-for="(item, index) in chooseList2" :key="index">
				<div class="list-top">
					<div class="list-top-left">{{item.daoshiname}}</div>
					<div class="list-top-right">{{$formatMoney(item.jiesyl)}}<span>{{$t('home').j15}}</span></div>
				</div>
				<div class="list-it">{{$t('home').j25}}<span>{{$formatMoney(item.buy_price)}}</span></div>
				<div class="list-it">{{$t('home').j24}}<span>{{$formatMoney(item.credit)}}</span></div>
			</div>
		</template>
		<van-popup v-model="show" position="bottom" :round="true" closeable :style="{ height: '2rem' }">
			<div class="pop">
				<div class="pop-title">{{ stockObj.name }}</div>
				<div class="ipt">
					<div class="txt">
						{{$t('home').j18}}
						<span>{{ $formatMoney(stockObj.zxgdje) }}</span>
					</div>
				</div>

				<div @click="submit" class="big_btn">{{$t('home').j19}}</div>
			</div>
		</van-popup>
		<first-loading ref="firstLoading"></first-loading>
		<loading ref="loading" />
	</div>
</template>

<script>
	export default {
		name: "fllow",
		data() {
			return {
				show1: false,
				isShow: false,
				isLoading: false,
				navList: [{
						name: this.$t("home").j20,
						type: 0
					},
					{
						name: this.$t("home").j21,
						type: 1
					},
					{
						name: this.$t("home").j22,
						type: 2
					},
				],
				currmentIndex: 0,
				chooseList: [],
				chooseList2: [],
				stockObj: {},
				item: {},
				show: false,
				buyObj: {
					handle: "",
				},
				stockType:''
			};
		},
		computed: {},
		mounted() {
			this.stockType = window.localStorage.getItem('stockType')||'usd';
			this.item = JSON.parse(localStorage.getItem("tutorInfo"))
			//this.$refs.firstLoading.open();
		},

		methods: {
			onRefresh() {
				this.isShow = false;
				if (this.currmentIndex == 1) {
					this.getNew()
				}
				if (this.currmentIndex == 2) {
					this.getNew2()
				}
			},
			changeNav(index) {
				this.currmentIndex = index;
				if (this.currmentIndex == 1) {
					this.getNew()
				}
				if (this.currmentIndex == 2) {
					this.getNew2()
				}
			},
			getNew2() {
				this.$server.post("/trade/aidaoshi_gdjl", {
					daoshiid: this.item.id,
					type: this.stockType
				}).then((res) => {
					this.isLoading = false;
					this.$refs.loading.close(); //关闭加载
					if (res.status == 1) {
						this.chooseList2 = res.data;
					}
				});
			},
			getNew() {
				this.$server.post("/trade/user_aigendan", {
					type: this.stockType
				}).then((res) => {
					this.isLoading = false;
					this.$refs.loading.close(); //关闭加载
					if (res.status == 1) {
						this.chooseList = res.data;
					}
				});
			},
			stockDetails() {
				this.stockObj = this.item;
				this.show = true;
			},
			buyFn() {
				this.show1 = true;
			},
			submit() {
				this.$refs.loading.open(); //开启加载
				this.$server
					.post("/trade/toaidaoshi", {
						id: this.stockObj.id,
						type: this.stockType,
					})
					.then((res) => {
						this.$refs.loading.close(); //关闭加载

						this.show1 = false;

						if (res.status == 1) {
							this.buyObj.handle = "";
							this.show = false;
							this.$toast(this.$t("home").j23);
						}
					});
			},
		},
	};
</script>
<style scoped lang="less">
	.page {}

	.tab {
		height: .47rem;
		display: flex;
		align-items: flex-end;

		.tab-item {
			padding: 0 .14rem;
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

			&.active {
				color: rgba(17, 17, 17, 1);

				span {
					background: #015AA4;
				}
			}
		}
	}

	.item {
		border-bottom: .01rem solid rgba(247, 247, 247, 1);
		padding: .15rem;

		.item-middle {
			background: rgba(65, 188, 154, 0.1);
			border-radius: 0.03rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: .1rem 0;

			.item-middle-left {
				font-weight: 400;
				font-size: 0.12rem;
				color: #777777;
				line-height: 0.17rem;
			}

			.item-middle-right {
				display: flex;
				align-items: center;
				justify-content: center;
				font-weight: 500;
				font-size: 0.16rem;
				color: #41BC9A;
				line-height: 0.23rem;

				span {
					font-weight: 500;
					font-size: 0.16rem;
					color: #41BC9A;
					line-height: 0.23rem;
					padding-left: .1rem;
				}
			}
		}

		.item-foot {
			margin-top: .11rem;
			display: flex;
			align-items: center;
		}

		.item-list {
			width: calc(100% / 3);
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-weight: 400;
			font-size: 0.1rem;
			color: #999999;
			line-height: 0.14rem;

			span {
				font-weight: 600;
				font-size: 0.13rem;
				color: #333333;
				line-height: 0.19rem;
			}
		}

		.flex-start {
			align-items: flex-start;
		}

		.flex-end {
			align-items: flex-end;
		}
	}

	.big_btn {
		margin: .2rem .15rem 0 .15rem;
	}

	.list {
		border-bottom: .01rem solid rgba(247, 247, 247, 1);
		padding: .15rem;

		.list-top {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.list-top-left {
				display: flex;
				flex-direction: column;
				justify-content: center;
				font-weight: 500;
				font-size: 0.14rem;
				color: #000000;
				line-height: 0.16rem;

				span {
					font-weight: 500;
					font-size: 0.12rem;
					color: #A6A6A6;
					line-height: 0.16rem;
				}
			}

			.list-top-right {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: flex-end;
				font-weight: 500;
				font-size: 0.16rem;
				color: #015AA4;
				line-height: 0.18rem;

				span {
					font-weight: 400;
					font-size: 0.12rem;
					color: #A6A6A6;
					line-height: 0.18rem;
				}
			}
		}

		.list-it {
			padding: 0.04rem 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-weight: 400;
			font-size: 0.12rem;
			color: #909090;
			line-height: 0.14rem;

			span {
				font-weight: 400;
				font-size: 0.12rem;
				color: #0F0F0F;
			}
		}
	}

	.pop {
		background: #fff;
		padding: 0 0.15rem 0.15rem;
		position: relative;
		min-height: 50vh;

		.btips {
			padding: 0.1rem 0;

			.t1 {
				font-weight: 500;
				font-size: 0.12rem;
				color: #333;
			}

			.t2 {
				font-weight: 500;
				font-size: 0.12rem;
				color: #015AA4;
				margin-left: 0.05rem;
			}
		}

		.pop-title {
			font-weight: 500;
			font-size: 0.14rem;
			color: #333;
			text-align: center;
			padding: 0.15rem 0;
			border-bottom: 0.01rem solid rgba(0, 0, 0, .1);
		}

		.pop-price {
			padding: 0.15rem 0 0;

			.t {
				font-weight: bold;
				font-size: 0.14rem;
				color: #015AA4;
				margin-top: 0.05rem;
			}

			.t1 {
				font-weight: 500;
				font-size: 0.14rem;
				color: #333;
			}
		}

		.ipt {
			padding: 0.1rem 0;

			.t1 {
				font-size: 0.12rem;
				color: #333;
			}

			.t2 {
				font-size: 0.12rem;
				font-weight: 600;
				color: #015AA4;
				margin-left: 0.05rem;
			}

			.t3 {
				font-size: 0.12rem;
				font-weight: 600;
				color: #015AA4;
				margin-left: 0.05rem;
			}

			input {
				width: 100%;
				background: transparent;
				border-radius: 0.05rem;
				border: 0.01rem solid #015AA4;
				height: 0.4rem;
				line-height: 0.4rem;
				padding: 0 0.1rem;
				color: #333;

				&::placeholder {
					font-weight: 500;
					font-size: 0.14rem;
					color: #999999;
				}
			}
		}

		.pop-num {
			input {
				width: 100%;
				background: transparent;
				border-radius: 0.05rem;
				border: 0.01rem solid #fff;
				height: 0.4rem;
				line-height: 0.4rem;
				padding: 0 0.1rem;

				&::placeholder {
					font-weight: 500;
					font-size: 0.14rem;
					color: #999999;
				}
			}
		}

		.txt {
			font-weight: 500;
			font-size: 0.12rem;
			color: #333;
			padding: 0.1rem 0;

			span {
				font-weight: 500;
				font-size: 0.12rem;
				color: #015AA4;
				margin-left: 0.05rem;
			}
		}

		.big_btn {
			margin: 0.2rem 0 0;
			border-radius: 0.05rem;
		}
	}
</style>