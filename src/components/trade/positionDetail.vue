<template>
	<div class="page">
		<top-back :title="$t('trade').j46"></top-back>
		<div class="top"></div>
		<div class="card">
			<div class="card-left">
				<div class="card-name">{{ item.stock_name }}<span>{{ item.stock_code }}</span></div>
				<div class="card-price">{{currentItem.type=='Spain'?'':'$ '}}{{ $formatMoney(item.buy_price) }}{{currentItem.type=='Spain'?' €':''}}</div>
			</div>
			<div class="card-right">
				<div class="card-tit">{{$t('trade').j47}}</div>
				<div class="card-ying" :class="currentItem.yingkui>0?'green':'red'">
          {{currentItem.type=='Spain'?'':'$ '}}{{$formatMoney(currentItem.yingkui)}}{{stockType=='Spain'?' €':''}}<span>{{ $formatMoney(currentItem.gain*currentItem.ganggang) }}%</span></div>
			</div>
		</div>
		<div class="list">
			{{$t('trade').j48}}
			<span v-if="parseInt(item.buyzd) == 1">{{$t('trade').j9}}</span>
			<span v-if="parseInt(item.buyzd) == 2">{{$t('trade').j10}}</span>
		</div>
		<div class="list">{{$t('trade').j49}}<span>{{ $formatMoney(item.stock_num, 0) }}</span></div>
		<div class="list">
			{{$t('trade').j50}}<span>{{currentItem.type=='Spain'?'':'$ '}}{{ item.sell_time ? $formatMoney(item.sell_price, 3) || 0 : $formatMoney(item.buy_price, 3) || 0 }}{{currentItem.type=='Spain'?'':'$ '}}</span>
		</div>
		<div class="list">
			{{$t('trade').j51}}<span>{{ item.sell_time ? $formatDate("DD-MM-YYYY hh:mm", item.sell_time*1000) : $formatDate("DD-MM-YYYY hh:mm", item.buy_time*1000) }}</span>
		</div>
		<div class="list">{{$t('trade').j52}}<span>{{currentItem.type=='Spain'?'':'$ '}}{{ $formatMoney(item.credit) }}{{currentItem.type=='Spain'?' €':''}}</span></div>
<!--		<div class="list">-->
<!--			{{$t('trade').j53}}<span>{{currentItem.type=='Spain'?'€ ':'$ '}}{{ item.sell_time ? $formatMoney(item.sell_poundage, 3) || 0 : $formatMoney(item.buy_poundage, 3) || 0 }}</span>-->
<!--		</div>-->
		<div class="list">{{$t('trade').j54}}<span>{{ item.strategy_num }}</span></div>
		<div class="list">
			{{$t('trade').j55}}
			<span v-if="item.sell_time">{{$t('已平仓')}}</span>
			<span v-else>{{$t('持仓中')}}</span>
		</div>
	</div>
</template>
<script>
	export default {
		name: "positionDetail",
		data() {
			return {
				isLoading: false,
				currentItem: {},
				item: {},
				statusStr: [
					this.$t("newt").a,
					this.$t("newt").a1,
					this.$t("newt").a2,
					this.$t("newt").a3,
					"",
				],
			};
		},
		computed: {},
		created() {
			this.currentItem = this.$storage.get("currentItem");
			this.item = this.currentItem;
		},
		methods: {
			// 下拉刷新
			onRefresh() {
				this.getDetail();
			},
			// 获取详情
			getDetail() {
				this.$server.post("/trade/stockdetail", {
					id: this.currentItem.id,
					type: this.$stockType,
				}).then((res) => {
					this.isLoading = false;
					if (res.status == 1) {
						this.item = res.data;
					}
				});
			},
		},
	};
</script>
<style scoped lang="less">
	.page {}

	.top {
		background: #015AA4;
		height: .6rem;
	}

	.card {
		background: #FFFFFF;
		box-shadow: 0 0.01rem 0.08rem 0 rgba(0, 0, 0, 0.15);
		border-radius: 0.05rem;
		margin: -.51rem .15rem .11rem .15rem;
		padding: .23rem .17rem;
		display: flex;
		align-items: center;

		.card-left {
			width: 50%;
			display: flex;
			flex-direction: column;
			justify-content: center;
		}

		.card-name {
			display: flex;
			flex-direction: column;
			justify-content: center;
			font-weight: 400;
			font-size: 0.15rem;
			color: #111111;
			line-height: 0.21rem;

			span {
				font-weight: 400;
				font-size: 0.11rem;
				color: #777777;
			}
		}

		.card-price {
			font-weight: 400;
			font-size: 0.18rem;
			color: #111111;
			line-height: 0.25rem;
			margin-top: .08rem;
		}

		.card-right {
			width: 50%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-end;
		}

		.card-tit {
			display: flex;
			flex-direction: column;
			justify-content: center;
			font-weight: 400;
			font-size: 0.13rem;
			color: #111111;
			line-height: 0.21rem;
		}

		.card-ying {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-end;
			font-weight: 400;
			font-size: 0.18rem;
			line-height: 0.25rem;
			margin-top: .08rem;

			span {
				font-weight: 400;
				font-size: 0.15rem;
				line-height: 0.21rem;
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
		height: .45rem;
		border-bottom: .01rem solid rgba(247, 247, 247, 1);
		padding: 0 .15rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-weight: 400;
		font-size: 0.14rem;
		color: #777777;

		span {
			font-weight: 400;
			font-size: 0.14rem;
			color: #111111;
		}
	}
</style>