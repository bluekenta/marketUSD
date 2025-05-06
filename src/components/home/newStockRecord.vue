<template>
	<div class="newStockRecord">
		<top-back :title="$t('trade').j8"></top-back>
		<div>
			<no-data v-if="!xinguList.length"></no-data>
			<div class="hold" v-for="(item, index) in xinguList" :key="index">
				<div class="hold-top">
					<div class="hold-top-left">
						<div class="hold-top-name">{{ item.stock_name }}</div>
						<div class="hold-top-bottom">
							<span class="hold-top-code">{{ item.stock_code || '-' }}</span>
						</div>
					</div>
					<div class="hold-top-retreat">{{ $t(item.xgstate) }}</div>
				</div>
				<div class="hold-foot">
					<div class="hold-foot-item flex-start">
						{{$t('trade').j37}}<span>{{stockType=='usd'?'$ ':''}}{{ $formatMoney(item.apply_price, 3) }}{{stockType=='Spain'?' €':''}}</span>
					</div>
<!--					<div class="hold-foot-item">{{$t('trade').j38}}<span>{{ $formatMoney(item.apply_total, 0) }}</span>-->
<!--					</div>-->
					<div class="hold-foot-item">
						{{$t('trade').j39}}
						<span v-if="item.status==1||item.status==2">{{ $formatMoney(item.lucky_total, 0) }}</span>
						<span v-else>-</span>
					</div>
					<div class="hold-foot-item flex-end">
						{{$t('trade').j40}}<span>{{stockType=='usd'?'$ ':''}}{{ $formatMoney(item.subs_value) }}{{stockType=='Spain'?' €':''}}</span>
					</div>
					<div class="hold-foot-item flex-start">{{$t('trade').j41}}<span>{{stockType=='usd'?'$ ':''}}{{ $formatMoney(item.rjmoney) }}{{stockType=='Spain'?' €':''}}</span></div>
					<div class="hold-foot-item">
						{{$t('trade').j42}}<span>{{stockType=='usd'?'$ ':''}}{{ $formatMoney(item.subs_value - item.rjmoney) }}{{stockType=='Spain'?' €':''}}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "newStockRecord",
		data() {
			return {
				xinguList: [],
				stockType: ''
			};
		},
		mounted() {
			this.stockType = window.localStorage.getItem('stockType') || 'usd';
			this.getList();
		},
		methods: {
			// 获取列表
			getList() {
				this.$server.post("/trade/usernewstocklist", {
					type: this.stockType,
					buy_type: 0,
				}).then((res) => {
					if (res.status == 1) {
						this.xinguList = res.data;
					}
				});
			},

		},
	};
</script>

<style scoped lang="less">
	.newStockRecord {
		.hold {
			border-top: .01rem solid rgba(247, 247, 247, 1);
			padding: .16rem;

			.hold-top {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.hold-top-left {
					display: flex;
					flex-direction: column;
					justify-content: center;
				}

				.hold-top-name {
					display: flex;
					align-items: center;
					font-weight: 500;
					font-size: 0.14rem;
					color: #111111;
					line-height: 0.2rem;

					span {
						margin-left: .07rem;
						height: 0.19rem;
						background: #F5F5F3;
						border-radius: 0.04rem;
						display: flex;
						align-items: center;
						justify-content: center;
						padding: 0 .05rem;
						font-weight: 400;
						font-size: 0.11rem;
						color: #015AA4;
					}
				}

				.hold-top-bottom {
					display: flex;
					align-items: center;
					margin-top: .04rem;
				}

				.hold-top-type {
					height: 0.19rem;
					border-radius: 0.04rem;
					padding: 0 .03rem;
					display: flex;
					align-items: center;
					justify-content: center;
					font-weight: 400;
					font-size: 0.11rem;
					color: #FFFFFF;
					margin-right: .08rem;
				}

				.hold-top-code {
					height: 0.19rem;
					background: #015AA4;
					border-radius: 0.04rem;
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 0 .08rem;
					font-weight: 400;
					font-size: 0.11rem;
					color: #FFFFFF;
				}

				.green {
					background: #41BC9A;
				}

				.red {
					background: rgba(224, 48, 47, 1);
				}

				.hold-top-arrow {
					width: 0.08rem;
					height: 0.15rem;
					margin-left: .1rem;
				}

				.hold-top-retreat {
					height: 0.25rem;
					background: #015AA4;
					border-radius: 0.04rem;
					padding: 0 .15rem;
					display: flex;
					align-items: center;
					justify-content: center;
					font-weight: 400;
					font-size: 0.12rem;
					color: #fff;
				}

				.hold-top-sell {
					font-weight: 400;
					font-size: 0.12rem;
					color: #999999;
				}
			}

			.hold-middle {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: .12rem;

				.hold-middle-left {
					display: flex;
					flex-direction: column;
					justify-content: center;
					font-weight: 400;
					font-size: 0.1rem;
					color: #9A9A9A;
					line-height: 0.14rem;

					span {
						font-weight: 600;
						font-size: 0.15rem;
						line-height: 0.21rem;
						margin-top: .01rem;
					}

					.green {
						color: #41BC9A;
					}

					.red {
						color: rgba(224, 48, 47, 1);
					}
				}

				.hold-middle-right {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: flex-end;
					font-weight: 400;
					font-size: 0.1rem;
					color: #9A9A9A;
					line-height: 0.14rem;

					span {
						font-weight: 600;
						font-size: 0.15rem;
						line-height: 0.21rem;
						margin-top: .01rem;
					}

					.green {
						color: #41BC9A;
					}

					.red {
						color: rgba(224, 48, 47, 1);
					}
				}
			}

			.hold-foot {
				display: flex;
				flex-wrap: wrap;

				.hold-foot-item {
					width: calc(100% / 3);
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					font-weight: 400;
					font-size: 0.1rem;
					color: #9A9A9A;
					line-height: 0.14rem;
					margin-top: .1rem;

					span {
						font-weight: 400;
						font-size: 0.12rem;
						color: #111111;
						line-height: 0.17rem;
						margin-top: .05rem;
					}
				}

				.flex-start {
					align-items: flex-start;
				}

				.flex-end {
					align-items: flex-end;
				}
			}

			.hold-btn {
				height: 0.26rem;
				background: #F5F5F3;
				border-radius: 0.04rem;
				display: flex;
				align-items: center;
				justify-content: center;
				font-weight: 400;
				font-size: 0.11rem;
				color: #9A9A9A;
				margin-top: .11rem;
			}
		}
	}
</style>