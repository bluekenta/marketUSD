<template>
	<div>
		<div class="top">
			<div class="t">{{ $t("newt").a62 }}</div>

			<div class="flex flex-b">
				<div class="tb flex-2">
					<div class="flex tabs ">
						<div class="flex-1 t-c" :class="{ active: type == 0 }" @click="changeType(0)">
							{{ $t("newt").a63 }}
						</div>
						<div class="flex-1 t-c" :class="{ active: type == 1 }" @click="changeType(1)">
							{{ $t("newt").a64 }}
						</div>
					</div>
				</div>
				<div class="flex-1"></div>
			</div>
		</div>

		<div class="cot">
			<!-- 切换 -->
			<div class="nav-box flex flex-b">
				<div class="nav-item" v-for="(item, index) in navList" :key="index"
					:class="{ active: currmentIndex === item.type }" @click="changeNav(item.type)">
					{{ $t(item.name) }}
					<span></span>
				</div>
			</div>
			<no-data v-if="chartData.length == 0"></no-data>
			<div v-show="currentType == 'volumes' && chartData.length">
				<div id="chart1"></div>
			</div>

			<div v-show="currentType == 'balances' && chartData.length">
				<div id="chart2"></div>
			</div>

			<div class="mk">
				<!-- v-if="type == 0" -->
				<div class="item">
					<div class="">
						<div class="flex flex-b mtb">
							<div class="t1">{{ $t("newt").a65 }}</div>

							<div class="t3">{{ $t("newt").a66 }} {{ currentItem.dt }}</div>
						</div>

						<div class="flex flex-b">
							<div class="t2 num-font">
								{{ $formatMoney(currentItem.short_volume) || 0
                }}{{ $t("newt").a46 }}
							</div>
							<div class="t4">{{ currentItem.short_volume_weight }}%</div>
						</div>
					</div>
				</div>

				<div class="item">
					<div class="">
						<div class="flex flex-b mtb">
							<div class="t1">{{ $t("newt").a67 }}</div>

							<div class="t3">{{ $t("newt").a66 }} {{ currentItem1.dt }}</div>
						</div>

						<div class="flex flex-b">
							<div class="t2 num-font">
								{{ $formatMoney(currentItem1.short_balance) || 0
                }}{{ $t("newt").a46 }}
							</div>
							<div class="t4">{{ currentItem1.short_balance_weight }}%</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import * as echarts from "echarts";
	export default {
		name: "buyStatus",
		components: {},
		props: {
			symbol: {
				// type: String,
				default: "",
			},
		},
		data() {
			return {
				type: 0,
				currmentIndex: 0,
				navList: [{
						name: "1个月",
						type: 0
					},
					{
						name: "3个月",
						type: 1
					},
					{
						name: "6个月",
						type: 2
					},
				],
				myChart: null,
				myChart1: null,
				currentType: "volumes",
				isLoad: false,
				isLoad1: false,
				currentItem: "",
				currentItem1: "",
				pageSize: 30,
				dataList: [],
				chartData: [],
			};
		},
		watch: {
			symbol: {
				handler(newValue, oldValue) {
					if (newValue && newValue !== oldValue) {
						this.getLast();
						this.getLast1();
					}
				},
				// deep: true  // 深度监听
				immediate: true, // 第一次改变就执行
			},
		},
		created() {},
		mounted() {
			// this.getEcharts();
		},
		onLoad() {},
		methods: {
			getLast() {
				this.$server
					.post("/parameter/volumes", {
						id: this.symbol,
						type: this.currentType,
						limit: this.pageSize,
					})
					.then((res) => {
						if (res.status == 1) {
							if (!this.isLoad) {
								// 第一次获取第一个
								this.currentItem = res.data.data[0];
							}
							this.isLoad = true;

							let arr = [];
							let arr1 = [];

							if (this.currentType == "volumes") {
								res.data.data.forEach((item) => {
									if (item.short_volume != 0) {
										arr.push(item.dt);
										arr1.push(item.short_volume);
									}
								});
								this.dataList = arr.reverse(); //最新的在最后面
								this.chartData = arr1.reverse();
								// console.log('this.chartData',this.chartData)
								if (this.chartData.length == 0) return;
								setTimeout(() => {
									this.getEcharts();
								}, 1000);
							} else {
								res.data.data.forEach((item) => {
									if (item.short_balance != 0) {
										arr.push(item.dt);
										arr1.push(item.short_balance);
									}
								});
								this.dataList = arr.reverse();
								this.chartData = arr1.reverse();
								if (this.chartData.length == 0) return;
								setTimeout(() => {
									this.getEcharts1();
								}, 1000);
							}

							// console.log(' this.chartData', this.dataList, this.chartData);
						}
					});
			},
			// 第一次赋值
			getLast1() {
				this.$server
					.post("/parameter/volumes", {
						id: this.symbol,
						type: "balances",
						limit: !this.isLoad1 ? 30 : this.pageSize,
					})
					.then((res) => {
						if (res.status == 1) {
							this.currentItem1 = res.data.data[0];
							this.isLoad1 = true;
						}
					});
			},
			changeType(type) {
				this.type = type;
				this.currmentIndex = 0;
				this.pageSize = 30;
				if (!type) {
					this.currentType = "volumes";
				} else {
					this.currentType = "balances";
				}
				this.getLast();
			},
			changeNav(type) {
				this.currmentIndex = type;
				switch (type) {
					case 0:
						this.pageSize = 30;
						break;
					case 1:
						this.pageSize = 90;
						break;
					case 2:
						this.pageSize = 180;
						break;
					default:
						break;
				}
				this.getLast();
				// this.getLast1();
			},
			// 卖空量的图
			getEcharts() {
				if (this.myChart !== null) {
					echarts.dispose(this.myChart);
				}

				var chartDom = document.getElementById("chart1");
				this.myChart = echarts.init(chartDom);
				var option;

				option = {
					tooltip: {
						trigger: "axis",
						axisPointer: {
							type: "shadow",
						},
					},
					grid: {
						// 圖標距離邊界距離（位置）
						left: "5%",
						right: "5%",
						bottom: "2%",
						top: "8%",
						containLabel: true,
					},
					xAxis: {
						type: "category",
						data: this.dataList,
						// 坐标轴显示内容 interval:0 坐标轴显示间隔
						axisLabel: {
							interval: null,
							rotate: 20,
							color: "#666",
							fontSize: "12",
						},
						// 坐标轴线
						axisLine: {
							show: true,
							lineStyle: {
								color: "#E0E0E0",
							},
						},
						// 坐标轴刻度
						axisTick: {
							show: false,
						},
					},
					yAxis: {
						type: "value",
						// min: 'dataMin', //取最小值为最小刻度
						// max: 'dataMax', //取最大值为最大刻度
						axisLine: {
							show: false, //是否显示
							lineStyle: {
								color: "#E0E0E0",
							},
						},
						type: "value",
						splitLine: {
							lineStyle: {
								color: "#E0E0E0",
							},
						},
						axisLabel: {
							// formatter: value => {
							//   return `${value} ${this.$t('万')}`;
							// },
							formatter: (value) => {
								return `${this.$formatMoney(value) || 0}`;
							},
							color: "#666666",
							fontSize: "12",
						},
					},
					series: [{
						name: "",
						type: "bar",
						barWidth: "30%",
						itemStyle: {
							// color: '#934DA9' //小圆点和线的颜色
							color: "#3561E5",
						},
						data: this.chartData,
					}, ],
				};

				option && this.myChart.setOption(option);
			},
			// 卖空余额的图
			getEcharts1() {
				if (this.myChart1 !== null) {
					echarts.dispose(this.myChart1);
				}

				var chartDom = document.getElementById("chart2");
				this.myChart1 = echarts.init(chartDom);
				var option;

				option = {
					tooltip: {
						trigger: "axis",
						axisPointer: {
							type: "shadow",
						},
					},
					grid: {
						// 圖標距離邊界距離（位置）
						left: "5%",
						right: "5%",
						bottom: "2%",
						top: "8%",
						containLabel: true,
					},
					xAxis: {
						type: "category",
						data: this.dataList,
						// 坐标轴显示内容 interval:0 坐标轴显示间隔
						axisLabel: {
							interval: null,
							rotate: 20,
							color: "#666",
							fontSize: "12",
						},
						// 坐标轴线
						axisLine: {
							show: true,
							lineStyle: {
								color: "#E0E0E0",
							},
						},
						// 坐标轴刻度
						axisTick: {
							show: false,
						},
					},
					yAxis: {
						type: "value",
						// min: 'dataMin', //取最小值为最小刻度
						// max: 'dataMax', //取最大值为最大刻度
						axisLine: {
							show: false, //是否显示
							lineStyle: {
								color: "#E0E0E0",
							},
						},
						type: "value",
						splitLine: {
							lineStyle: {
								color: "#E0E0E0",
							},
						},
						axisLabel: {
							formatter: (value) => {
								return `${this.$formatMoney(value / 10000) || 0} ${this.$t(
                "万"
              )}`;
							},
							color: "#666666",
							fontSize: "12",
						},
					},
					grid: {
						// 圖標距離邊界距離（位置）
						left: "5%",
						right: "5%",
						bottom: "2%",
						top: "8%",
						containLabel: true,
					},
					series: [{
						data: this.chartData,
						type: "line",
						lineStyle: {
							// color: '#934DA9'
							color: "#3561E5",
						},
						symbol: "circle", //将小圆点改成实心 不写symbol默认空心
						symbolSize: 0, //小圆点的大小
						itemStyle: {
							// color: '#934DA9' //小圆点和线的颜色
							color: "#3561E5",
						},
					}, ],
				};

				option && this.myChart1.setOption(option);
			},
		},
	};
</script>

<style scoped lang="less">
	#chart1,
	#chart2 {
		width: 100%;
		height: 3rem;
	}

	.cot {
		.nav-box {
			padding: 0.1rem 0;

			.nav-item {
				width: 30%;
				background: #ededed;
				border-radius: 0.3rem;
				font-size: 0.12rem;
				color: #636363;
				padding: 0.05rem;
				text-align: center;
			}

			.active {
				background: #ffe8e9;
				color: #e10414;
			}
		}

		.mk {
			padding: 0.1rem 0 0;

			.item {
				background: linear-gradient( 270deg, #FFFFFF 0%, #FFE8E9 100%);
				border-radius: 0.08rem;
				padding: 0.1rem;
				margin-bottom: 0.15rem;

				.mtb {
					margin-bottom: 0.1rem;
				}

				.t1 {
					font-weight: 600;
					font-size: 0.14rem;
					color: #161616;
				}

				.t2 {
					font-weight: 600;
					font-size: 0.16rem;
					color: #333333;
				}

				.t3 {
					font-size: 0.12rem;
					color: #878787;
				}

				.t4 {
					font-weight: bold;
					font-size: 0.16rem;
					color: #df4645;
				}
			}
		}
	}

	.top {
		padding: 0.1rem 0;

		.t {
			font-weight: 600;
			font-size: 0.16rem;
			color: #353535;
		}

		.tb {
			.tabs {
				border: 0.01rem solid #ebebeb;
				border-radius: 0.06rem;
				margin-top: 0.15rem;

				div {
					border-radius: 0.06rem;
					font-size: 0.12rem;
					color: #9b9ba3;
					padding: 0.05rem 0.1rem;
				}

				.active {
					color: #e10414;
					background: #ffe8e9;
				}
			}
		}
	}
</style>