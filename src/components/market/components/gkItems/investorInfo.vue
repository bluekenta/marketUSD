<template>
	<div>
		<div class="">
			<div class="top">
				<div class=" flex flex-b ">
					<div class="t">{{ $t("newt").a68 }}</div>
					<div class="t1">{{ $t("newt").a53 }} {{ currentItem.dt }}</div>
				</div>

				<div class="flex flex-b">
					<div class="nav flex flex-b flex-1">
						<div class="nav-item t-c" :class="{ active: current == 1 }" @click="changeCurrent(1)">
							{{ $t("newt").a69 }}
						</div>
						<div class="nav-item t-c" :class="{ active: current == 2 }" @click="changeCurrent(2)">
							{{ $t("newt").a70 }}
						</div>
					</div>
					<!-- <div class="flex-1"></div> -->
				</div>
			</div>

			<div class="pdd">
				<div class="" v-show="current == 1">
					<div class="wbg flex flex-b" v-if="currentItem">
						<!-- 图 -->
						<div id="c1"></div>

						<div class="flex-1">
							<div class="flex flex-b">
								<div class="t flex">
									<div class="c1"></div>
									{{ $t("newt").t49 }}
								</div>

								<span class="num-font" :class="{ die: currentItem.net_vol_individual < 0 }">{{ currentItem.net_vol_individual < 0 ? "" : "+" }}{{ $formatMoney(currentItem.net_vol_individual) }}
								</span>
							</div>

							<div class="flex flex-b">
								<div class="t flex">
									<div class="c2"></div>
									{{ $t("newt").t51 }}
								</div>
								<span class="num-font" :calss="{ die: currentItem.net_vol_institutional < 0 }">{{ currentItem.net_vol_institutional < 0 ? "" : "+"}}{{ $formatMoney(currentItem.net_vol_institutional) }}
								</span>
							</div>
							<div class="flex flex-b">
								<div class="t flex">
									<div class="c3"></div>
									{{ $t("newt").t52 }}
								</div>

								<span class="num-font" :class="{ die: currentItem.net_vol_foreigner < 0 }">
									{{ currentItem.net_vol_foreigner < 0 ? "" : "+"
                  }}{{ $formatMoney(currentItem.net_vol_foreigner) }}
								</span>
							</div>
						</div>
					</div>
				</div>

				<div class="" v-show="current == 2">
					<div class="wbg flex flex-b" v-if="currentItem1">
						<!-- 图 -->
						<div id="c2"></div>
						<div class="flex-1">
							<div class="flex flex-b">
								<div class="t flex">
									<div class="c1"></div>
									{{ $t("newt").t49 }}
								</div>
								<span class="num-font" :class="{ die: currentItem1.cum_vol_individual < 0 }">
									{{ currentItem1.cum_vol_individual < 0 ? "" : "+"
                  }}{{ $formatMoney(currentItem1.cum_vol_individual) }}
								</span>
							</div>

							<div class="flex flex-b">
								<div class="t flex">
									<div class="c2"></div>
									{{ $t("newt").t51 }}
								</div>
								<span class="num-font" :class="{ die: currentItem1.cum_vol_institutional < 0 }">
									{{ currentItem1.cum_vol_institutional < 0 ? "" : "+"
                  }}{{ $formatMoney(currentItem1.cum_vol_institutional) }}
								</span>
							</div>
							<div class="flex flex-b">
								<div class="t flex">
									<div class="c3"></div>
									{{ $t("newt").t52 }}
								</div>
								<span class="num-font" :class="{ die: currentItem1.cum_vol_foreigner < 0 }">
									{{ currentItem1.cum_vol_foreigner < 0 ? "" : "+"
                  }}{{ $formatMoney(currentItem1.cum_vol_foreigner) }}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="list">
			<div class="tb flex flex-b">
				<div class="flex tabs flex-2">
					<div class="flex-1 t-c" :class="{ active: type == 0 }" @click="changeType(0)">
						{{ $t("newt").a71 }}
					</div>
					<div class="flex-1 t-c" :class="{ active: type == 1 }" @click="changeType(1)">
						{{ $t("newt").a72 }}
					</div>
				</div>
				<div class="flex-1"></div>
			</div>

			<!-- 切换累计的时候显示 -->
			<div class="nav-box" v-if="type == 1">
				<div class="nav-item" v-for="(item, index) in navList" :key="index"
					:class="{ active: currmentIndex === item.type }" @click="changeNav(item.type)">
					{{ $t(item.name) }}
				</div>
			</div>

			<div class="mb20">
				<div class="flex flex-b titles">
					<div class="flex-1 ">{{ $t("newt").t49 }}</div>
					<div class="flex-1 t-c">{{ $t("newt").t51 }}</div>
					<div class="flex-1 t-c">{{ $t("newt").t52 }}</div>
					<div class="flex-1 t-r">{{ $t("newt").a73 }}</div>
				</div>

				<template v-if="currentType == 'history'">
					<div class="flex flex-b item" v-for="(item, i) in dataList" :key="i">
						<div class="flex-1  red num-font" :class="{ die: item.net_vol_individual < 0 }">
							{{ item.net_vol_individual < 0 ? "" : "+"
              }}{{ $formatMoney(item.net_vol_individual) || 0 }}
						</div>
						<div class="flex-1 t-c red num-font" :class="{ die: item.net_vol_institutional < 0 }">
							{{ item.net_vol_institutional < 0 ? "" : "+"
              }}{{ $formatMoney(item.net_vol_institutional) || 0 }}
						</div>
						<div class="flex-1 t-c red num-font" :class="{ die: item.net_vol_foreigner < 0 }">
							{{ item.net_vol_foreigner < 0 ? "" : "+"
              }}{{ $formatMoney(item.net_vol_foreigner) || 0 }}
						</div>
						<div class="flex-1 t-r time">{{ item.dt }}</div>
					</div>
				</template>
				<template v-else>
					<div class="flex flex-b item" v-for="(item, i) in dataList" :key="i">
						<div class="flex-1  red num-font" :class="{ die: item.cum_vol_individual < 0 }">
							{{ item.cum_vol_individual < 0 ? "" : "+"
              }}{{ $formatMoney(item.cum_vol_individual) || 0 }}
						</div>
						<div class="flex-1 t-c red num-font" :class="{ die: item.cum_vol_institutional < 0 }">
							{{ item.cum_vol_institutional < 0 ? "" : "+"
              }}{{ $formatMoney(item.cum_vol_institutional) || 0 }}
						</div>
						<div class="flex-1 t-c red num-font" :class="{ die: item.cum_vol_foreigner < 0 }">
							{{ item.cum_vol_foreigner < 0 ? "" : "+"
              }}{{ $formatMoney(item.cum_vol_foreigner) || 0 }}
						</div>
						<div class="flex-1 t-r time">{{ item.dt }}</div>
					</div>
				</template>

				<!-- 分页切换 -->
				<van-pagination v-model="currentPage" :total-items="total" :show-page-size="5" @change="changePage">
					<template #prev-text>
						<van-icon name="arrow-left" />
					</template>
					<template #next-text>
						<van-icon name="arrow" />
					</template>
					<!-- <template #page="{ text }">{{ text }}</template> -->
				</van-pagination>
			</div>
		</div>

		<!-- 资产比例 -->
		<div class="list mborder" v-if="false">
			<div class="tb">
				<div class="flex tabs">
					<div class="" :class="{ active: type1 == 0 }" @click="changeType1(0)">
						{{ $t("newt").a74 }}
					</div>
					<div class="" :class="{ active: type1 == 1 }" @click="changeType1(1)">
						{{ $t("newt").a75 }}
					</div>
				</div>
				<!-- <div class="flex-1"></div> -->
			</div>

			<div class="flex flex-b" v-show="type1 == 0">
				<div class="flex-1 position">
					<!-- 图 -->
					<div id="chart"></div>

					<div class="nums">
						<div class="num-font">
							{{ $formatMoney(percent.num / 100000000) }}{{ $t("newt").t50 }}
						</div>
						<div class="">{{ $t("newt").a76 }}</div>
					</div>
				</div>

				<div class="flex-1">
					<div class="flex">
						<div>
							<span class="r-icon"></span>
							{{ $t("newt").a77 }}
						</div>

						<div class="ml40">{{ percent.per }}%</div>
					</div>

					<div class="flex">
						<div class="">
							<span class="b-icon"></span>
							{{ $t("newt").a78 }}
						</div>

						<div class="ml40">{{ percent.per1 }}%</div>
					</div>
				</div>
			</div>

			<!-- 销售显示 -->
			<div class="flex flex-b" v-show="type1 == 1">
				<div class="flex-1 ">
					<!-- 图 -->
					<div id="charts1"></div>
				</div>

				<div class="flex-1">
					<div class="flex" v-for="(item, i) in salesData" :key="i">
						<div class="el-txt">
							<span :class="`bg${i}`"></span>
							{{ item.name }}
						</div>
						<div class="ml40">{{ item.value }}%</div>
					</div>
				</div>
			</div>
		</div>
		<loading ref="loading" />
	</div>
</template>

<script>
	import * as echarts from "echarts";
	export default {
		name: "investorInfo",
		components: {},
		props: {
			symbol: {
				default: "",
			},
		},
		data() {
			return {
				currentPage: 1,
				current: 1,
				type: 0,
				type1: 0,
				myChart: null,
				myChart1: null,
				currentType: "history",
				pageSize: 100, //默认取100条
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
				list: [],
				currentItem: "",
				currentItem1: "",
				isLoad: false,
				isLoad1: false,
				total: 0,
				curretPage: 0,
				dataList: [],
				chartData: [],
				percent: "",
				salesData: [],
				chartData1: [],

				myChartC1: null,
				chartDataC1: [],
				myChartC2: null,
				chartDataC2: [],
			};
		},
		watch: {
			symbol: {
				handler(newValue, oldValue) {
					if (newValue && newValue !== oldValue) {
						this.getInfo();
						// this.getLast();
					}
				},
				// deep: true  // 深度监听
				immediate: true, // 第一次改变就执行
			},
		},
		created() {},
		mounted() {},
		onLoad() {},
		methods: {
			changeType1(type) {
				this.type1 = type;
				if (type) {
					this.getSales();
				}
			},
			changeType(type) {
				this.currentPage = 1;
				this.type = type;
				this.currmentIndex = 0;
				if (!type) {
					this.currentType = "history";
					this.pageSize = 100;
				} else {
					this.currentType = "cumulative";
					this.pageSize = 30;
				}
				this.getInfo();
			},
			// 累计的时候切换，limit
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
				this.getInfo();
			},
			changePage(e) {
				// console.log(e);
				//需要加载的页码e和素组下标对应
				this.dataList = this.list[e - 1];
			},
			changeCurrent(current) {
				this.$refs.loading.open(); //开启加载

				this.current = current;
				if (current == 2) {
					this.getInfo1();
				} else {
					this.getInfo();
				}
			},
			// 资产比例显示取消
			getLast() {
				this.$server
					.post("/parameter/xiaoshouer", {
						id: this.symbol,
						type: "q"
					})
					.then((res) => {
						if (res.status == 1) {
							let data = res.data.data[0].fields;
							this.percent = {
								num: data[1].value,
								per: ((data[11].value / data[1].value) * 100).toFixed(2),
								per1: ((data[25].value / data[1].value) * 100).toFixed(2),
							};

							this.chartData.push(data[11].value);
							this.chartData.push(data[25].value);
							this.getEcharts();
						}
					});
			},

			// 获取销售的图表
			getSales() {
				this.$server.post("/parameter/sales", {
					id: this.symbol
				}).then((res) => {
					if (res.status == 1) {
						let arr = Object.keys(res.data.sales_composition);
						let arr1 = Object.values(res.data.sales_composition);

						let arr2 = [];
						arr.map((item, i) => {
							arr2.push({
								name: item,
								value: arr1[i],
							});
						});
						this.salesData = arr2;
						this.chartData1 = arr1;
						this.getEcharts1();
					}
				});
			},

			getInfo() {
				this.$server
					.post("/parameter/jinggm", {
						id: this.symbol,
						type: this.currentType,
						limit: this.pageSize,
					})
					.then((res) => {
						this.$refs.loading && this.$refs.loading.close();

						if (res.status == 1) {
							if (!this.isLoad) {
								// 第一次获取第一个
								this.currentItem = res.data.data[0];

								this.chartDataC1 = [
									this.currentItem.net_vol_individual < 0 ?
									-1 * this.currentItem.net_vol_individual :
									this.currentItem.net_vol_individual,
									this.currentItem.net_vol_institutional < 0 ?
									-1 * this.currentItem.net_vol_institutional :
									this.currentItem.net_vol_institutional,
									this.currentItem.net_vol_foreigner < 0 ?
									-1 * this.currentItem.net_vol_foreigner :
									this.currentItem.net_vol_foreigner,
								];

								setTimeout(() => {
									this.getEchartsC1();
								}, 2000);
							}
							this.isLoad = true;
							// this.list = res.data.data;

							// 处理成5条一组
							let arr = this.getArr(res.data.data);
							this.list = arr;
							this.total = this.list.length * 5; //数据总条数

							this.dataList = this.list[0]; //默认值的5条数据
							// console.log("arr", arr, this.total);
						}
					});
			},
			getArr(arr) {
				if (!arr.length) return;
				let num = Math.ceil(arr.length / 5);
				let Arr = [];
				for (var i = 0; i < num; i++) {
					let arr1 = arr.splice(0, 5);
					Arr.push(arr1);
				}
				return Arr;
			},

			getEchartsC1() {
				let that = this;
				if (that.myChartC1 !== null) {
					echarts.dispose(that.myChartC1);
				}

				let chartDom = document.getElementById("c1");
				that.myChartC1 = echarts.init(chartDom);
				let option;
				option = {
					color: ["#DF4645", "#3561E5", "#F7C25C"], // 顺时针
					tooltip: {
						trigger: "item",
					},
					// 頂部圖例
					legend: {
						top: "5%",
						left: "center",
						show: false,
					},
					series: [{
						name: "",
						type: "pie",
						radius: ["90%", "50%"], //圆环
						// radius: "100%", //圆
						center: ["50%", "50%"],
						avoidLabelOverlap: false,
						label: {
							show: false,
							position: "center",
						},
						emphasis: {
							label: {
								show: true,
								fontSize: "12",
								fontWeight: "bold",
							},
						},
						labelLine: {
							show: false,
						},
						data: this.chartDataC1,
					}, ],
				};

				option && that.myChartC1.setOption(option);
			},
			getEchartsC2() {
				let that = this;
				if (that.myChartC2 !== null) {
					echarts.dispose(that.myChartC2);
				}

				let chartDom = document.getElementById("c2");
				that.myChartC2 = echarts.init(chartDom);
				let option;
				option = {
					color: ["#DF4645", "#3561E5", "#F7C25C"], // 顺时针
					tooltip: {
						trigger: "item",
					},
					// 頂部圖例
					legend: {
						top: "5%",
						left: "center",
						show: false,
					},
					series: [{
						name: "",
						type: "pie",
						radius: ["90%", "50%"], //圆环
						// radius: "100%", //圆
						center: ["50%", "50%"],
						avoidLabelOverlap: false,
						label: {
							show: false,
							position: "center",
						},
						emphasis: {
							label: {
								show: true,
								fontSize: "12",
								fontWeight: "bold",
							},
						},
						labelLine: {
							show: false,
						},
						data: this.chartDataC2,
					}, ],
				};

				option && that.myChartC2.setOption(option);
			},

			// 获取累计第一个
			getInfo1() {
				this.$server
					.post("/parameter/jinggm", {
						id: this.symbol,
						type: "cumulative",
						limit: !this.isLoad1 ? 30 : this.pageSize,
					})
					.then((res) => {
						this.$refs.loading && this.$refs.loading.close();

						if (res.status == 1) {
							this.currentItem1 = res.data.data[0];

							this.chartDataC2 = [
								this.currentItem1.cum_vol_individual < 0 ?
								-1 * this.currentItem.cum_vol_individual :
								this.currentItem1.cum_vol_individual,
								this.currentItem1.cum_vol_institutional < 0 ?
								-1 * this.currentItem1.cum_vol_institutional :
								this.currentItem1.cum_vol_institutional,
								this.currentItem1.cum_vol_foreigner < 0 ?
								-1 * this.currentItem1.cum_vol_foreigner :
								this.currentItem1.cum_vol_foreigner,
							];

							setTimeout(() => {
								this.getEchartsC2();
							}, 2000);
							this.isLoad1 = true;
						}
					});
			},
			getEcharts() {
				let that = this;
				if (that.myChart !== null) {
					echarts.dispose(that.myChart);
				}

				let chartDom = document.getElementById("chart");
				that.myChart = echarts.init(chartDom);
				let option;
				option = {
					color: ["#E73E59", "#668DE4"], // 顺时针
					tooltip: {
						trigger: "item",
					},
					// 頂部圖例
					legend: {
						top: "5%",
						left: "center",
						show: false,
					},
					series: [{
						name: "",
						type: "pie",
						radius: ["90%", "70%"], //圆环
						// radius: '100%', //圆
						center: ["50%", "50%"],
						avoidLabelOverlap: false,
						label: {
							show: false,
							position: "center",
						},
						emphasis: {
							label: {
								show: true,
								fontSize: "12",
								fontWeight: "bold",
							},
						},
						labelLine: {
							show: false,
						},
						data: this.chartData,
					}, ],
				};

				option && that.myChart.setOption(option);
			},
			getEcharts1() {
				let that = this;
				if (that.myChart1 !== null) {
					echarts.dispose(that.myChart1);
				}

				let chartDom = document.getElementById("charts1");
				that.myChart1 = echarts.init(chartDom);
				let option;
				option = {
					color: ["#E73E59", "#668DE4", "#30E0A1", "#ffa500"], // 顺时针
					tooltip: {
						trigger: "item",
					},
					// 頂部圖例
					legend: {
						top: "5%",
						left: "center",
						show: false,
					},
					series: [{
						name: "",
						type: "pie",
						radius: ["90%", "70%"], //圆环
						// radius: '100%', //圆
						center: ["50%", "50%"],
						avoidLabelOverlap: false,
						label: {
							show: false,
							position: "center",
						},
						emphasis: {
							label: {
								show: true,
								fontSize: "12",
								fontWeight: "bold",
							},
						},
						labelLine: {
							show: false,
						},
						data: this.chartData1,
					}, ],
				};

				option && that.myChart1.setOption(option);
			},
		},
	};
</script>

<style scoped lang="less">
	::v-deep .van-pagination__item {
		color: #111111;
		height: 0.3rem;
	}

	::v-deep .van-pagination__item--active {
		background: #111111;
		color: #fff;
	}

	::v-deep .van-pagination__item:active {
		color: #fff;
		background-color: #111111;
	}

	.el-txt {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		/* 显示1行文本 */
		max-width: 220px;
	}

	.position {
		position: relative;

		.nums {
			position: absolute;
			top: 50%;
			left: 40%;
			transform: translate(-50%, -50%);
			z-index: 999;

			div {
				text-align: center;
				color: #2f66cd !important;
			}
		}
	}

	.nav-box {
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 0.01rem solid #f5f5f5;

		.nav-item {
			padding: 0.1rem 0;
			flex: 1;
			font-size: 0.12rem;
			color: #a1a1a1;
			text-align: center;
			position: relative;

			&::after {
				content: "";
				width: 50%;
				height: 0.02rem;
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				background: transparent;
			}

			&.active {
				color: #E10414;

				&::after {
					background: #E10414;
				}
			}
		}
	}

	#chart,
	#charts1 {
		width: 300px;
		height: 300px;
	}

	.bg0 {
		display: inline-block;
		width: 18px;
		height: 18px;
		background-color: #e73e59;
		margin-right: 10px;
	}

	.bg1 {
		display: inline-block;
		width: 18px;
		height: 18px;
		background-color: #668de4;
		margin-right: 10px;
	}

	.bg2 {
		display: inline-block;
		width: 18px;
		height: 18px;
		background-color: #30e0a1;
		margin-right: 10px;
	}

	.bg3 {
		display: inline-block;
		width: 18px;
		height: 18px;
		background-color: #ffa500;
		margin-right: 10px;
	}

	.mborder {
		.r-icon {
			display: inline-block;
			width: 18px;
			height: 18px;
			background: #e73e59;
			margin-right: 10px;
		}

		.b-icon {
			display: inline-block;
			width: 18px;
			height: 18px;
			background: #668de4;
			margin-right: 10px;
		}

		div {
			// color: #333333;
			// line-height: 60px;
			font-size: 24px;
			// font-weight: bold;
		}

		.ml40 {
			// margin-left: 40px;
			margin-left: 20px;
		}
	}

	.list {
		border-bottom: .01rem solid #eee;
		padding:0 .16rem;
		&.mborder {
			border-top: none;
		}

		.titles {
			padding: 0.15rem 0 0;

			div {
				font-size: 0.12rem;
				color: #9f9f9f;
			}
		}

		.item {
			padding: 0.15rem 0;
			border-bottom: 0.01rem solid #e3e3e3;

			.time {
				font-size: 0.12rem;
				color: #4d4d4d;
			}

			.red {
				// color: #c04649;
				font-size: 0.12rem;
				color: #111111;
				font-family: PingFang TC, PingFang TC;

				&.die {
					// color: #4f8672;
				}
			}
		}

		.mb20 {
			margin-bottom: 0.1rem;
		}

		.tb {
			.tabs {
				border: 0.01rem solid #ebebeb;
				border-radius: 0.06rem;
				margin-top: 0.1rem;

				div {
					border-radius: 0.06rem;
					font-size: 0.12rem;
					color: #9b9ba3;
					padding: 0.05rem 0.1rem;
				}

				.active {
					color: #E10414;
					background:#FFE8E9;
				}
			}
		}
	}

	.top {
		padding:0 .12rem;
		.t {
			font-family: PingFangSC, PingFang SC;
			font-weight: 600;
			font-size: 0.16rem;
			color: #333333;
		}

		.t1 {
			font-family: PingFangSC, PingFang SC;
			font-weight: 400;
			font-size: 0.12rem;
			color: #666666;
		}

		.nav {
			margin: 0.15rem 0 0;

			.nav-item {
				width: 48%;
				border-radius: 0.06rem;
				font-size: 0.12rem;
				color: #9b9ba3;
				padding: 0.05rem 0.1rem;
				background: #F5F5F5;
				border-radius: 0.04rem;
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				font-size: 0.14rem;
				color: #666666;
				&.active {
					color: #E10414;
					background: #FFE8E9;
				}
			}
		}
	}

	.pdd {
		.wbg {
			padding: 0.1rem 0;
			line-height: 0.3rem;

			#c1,
			#c2 {
				width: 1.2rem;
				height: 1.2rem;
				margin-right: 0.1rem;
			}

			.t {
				font-size: 0.12rem;
				color: #727272;
			}

			.c1 {
				width: 0.08rem;
				height: 0.08rem;
				background: #df4645;
				border-radius: 50%;
				margin-right: 0.05rem;
			}

			.c2 {
				width: 0.08rem;
				height: 0.08rem;
				background: #3561e5;
				border-radius: 50%;
				margin-right: 0.05rem;
			}

			.c3 {
				width: 0.08rem;
				height: 0.08rem;
				background: #f7c25c;
				border-radius: 50%;
				margin-right: 0.05rem;
			}

			.num-font {
				font-weight: 600;
				font-size: 0.14rem;
				color: #e73e59;
			}

			.die {
				font-weight: 600;
				font-size: 0.14rem;
				color: #3aab59;
			}
		}
	}

	.last {
		padding: 30px 0 0;

		div {
			color: #333333;
		}

		span {
			// font-size: 32px;
			font-family: Roboto;
			font-weight: bold;
			color: #f72121;
			// margin-left: 30px;
		}

		.die {
			color: #014b8d;
		}
	}
</style>