<template>
	<!-- 特色项目 -->
	<div class="cot">
		<div class="icon lb" @click="show = true"></div>
		<div class="tabs">
			<div class="cot">
				<div class="flex tab">
					<div class="tab-item" :class="{ active: type == item.type }" v-for="(item, i) in typeList" :key="i"
						@click="changeType(item.type)">{{ $t(item.name) }}</div>
				</div>
			</div>
		</div>

		<!-- 股票价格 -->
		<stock-price v-if="type1 == 0" :currentType="type" @updateInfo="updateInfo"></stock-price>
		<!-- 交易量 -->
		<trading-volume v-if="type1 == 1" :currentType="type" @updateInfo="updateInfo"></trading-volume>
		<!-- 投资者 -->
		<investor-stock v-if="type1 == 2" :currentType="type" @updateInfo="updateInfo"></investor-stock>
		<!-- 金融 -->
		<finance-stcok v-if="type1 == 3" :currentType="type" @updateInfo="updateInfo"></finance-stcok>
		<!-- 利润 -->
		<profit-stock v-if="type1 == 4" :currentType="type" @updateInfo="updateInfo"></profit-stock>
		<!-- 股票 -->
		<featured-stocks v-if="type1 == 5" :currentType="type" @updateInfo="updateInfo"></featured-stocks>
		<!-- 卖空 -->
		<sell-short v-if="type1 == 6" :currentType="type" @updateInfo="updateInfo"></sell-short>

		<van-popup v-model="show" mode="bottom" border-radius="16">
			<div class="popup">
				<div class="title">{{ $t('newt').t74 }}</div>
				<div class="popup-item" :class="{ active: type1 == item.type }" v-for="(item, i) in typeList1" :key="i"
					@click="changeType1(item.type)">{{ $t(item.name) }}</div>
			</div>
		</van-popup>

		<loading ref="loading" />
	</div>
</template>

<script>
	import stockPrice from "./items/stockPrice.vue";
	import tradingVolume from "./items/tradingVolume.vue";
	import investorStock from "./items/investorStock.vue";
	import financeStcok from "./items/financeStcok.vue";
	import profitStock from "./items/profitStock.vue";
	import featuredStocks from "./items/featuredStocks.vue";
	import sellShort from "./items/sellShort.vue";
	export default {
		name: "featuredItems",
		components: {
			stockPrice,
			tradingVolume,
			investorStock,
			financeStcok,
			profitStock,
			featuredStocks,
			sellShort,
		},
		props: {
			isType: {
				default: 0,
			},
		},
		data() {
			return {
				show: false,
				type: "",
				page: 0,
				// 大的分类
				type1: 0,
				typeList1: [{
						name: "股票价格",
						type: "0",
					},
					{
						name: "交易量",
						type: "1",
					},
					{
						name: "投资者",
						type: "2",
					},
					{
						name: "金融",
						type: "3",
					},
					{
						name: "利润",
						type: "4",
					},
					{
						name: "股票",
						type: "5",
					},
					{
						name: "卖空",
						type: "6",
					},
				],
				typeList: [],
			};
		},
		watch: {
			isType: {
				handler(newValue, oldValue) {
					if (newValue && newValue !== oldValue) {
						this.type1 = newValue;
					}
				},
				// deep: true  // 深度监听
				immediate: true, // 第一次改变就执行
			},
		},
		created() {},
		mounted() {
			this.getInfo();
		},
		methods: {
			open() {
				this.$refs.loading.open(); //开启加载
			},
			close() {
				this.$refs.loading && this.$refs.loading.close(); //关闭加载
			},
			// 选择顶部分类，子组件更新对应数据
			changeType(type) {
				this.type = type;
			},

			// 子组件传递顶部分类数据
			updateInfo(e) {
				this.typeList = e;
				this.type = this.typeList[0].type;
			},
			changeType1(type) {
				this.type1 = type;
				this.show = false;
			},
			getInfo() {
				this.open(); //开启加载

				this.$server.post("/parameter/sczb", {
					type: this.type
				}).then((res) => {
					this.close();

					if (res.status == 1) {
						let data = Object.values(res.data);
						data.forEach((item) => {
							// 涨跌幅
							item.bd = (
								((item.close - item.prev_close) / item.prev_close) *
								100
							).toFixed(2);
						});

						this.list = [...data];
					}
				});
			},
		},
	};
</script>

<style scoped lang="less">
	.lb {
		position: fixed;
		right: 20px;
		top: 30px;
		z-index: 999;
	}
	.cot{
		margin: 0 0.12rem;
		background: #FFFFFF;
		border-radius: 0.13rem;
		.tabs {
			.cot {
				overflow: scroll;
				margin-bottom: 0.1rem;
		
				.tab {
					padding: 0.12rem 0;
					min-width: 150vw;
					border-bottom: 0.01rem solid #E4EAF1;
					.tab-item {
						font-family: PingFangSC, PingFang SC;
						font-weight: 400;
						font-size: 0.15rem;
						color: #999999;
						text-align: center;
						min-width: 12%;
						&.active {
							font-family: PingFangSC, PingFang SC;
							font-weight: 500;
							font-size: 0.15rem;
							color: #111111;
							position: relative;
							&::after{
								position: absolute;
								content: '';
								left: 0;
								bottom: -0.12rem;
								width: 100%;
								height: 0.02rem;
								background: #E10414;
							}
						}
					}
				}
			}
		}
	}
	.popup {
		padding: 30px 20px;

		.title {
			text-align: center;
			margin-bottom: 30px;
		}

		.popup-item {
			color: #9aa3aa;
			padding: 30px 20px;
			border-radius: 16px;
			font-size: 24px;

			&.active {
				// background: #e7f1f9;
				// color: #014b8d;
				background: #3365d6;
				border-radius: 16px;
				color: #fff;
			}
		}
	}

	
</style>