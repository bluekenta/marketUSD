<template>
	<!-- 概括 -->
	<div class="cot">
		<div class="about">
			<div class="title">{{ $t("公司简介") }}</div>
			<div class="infos">
				<div class="flex flex-b">
					<!-- <div class="t flex-1">{{ $t("公司名称") }}</div> -->
					<div class="t1 flex-3">{{ ko_name }}</div>
				</div>
				<div class="flex flex-b">
					<!-- <div class="t flex-1">{{ $t("公司简介") }}</div> -->
					<div class="t1 flex-3">{{ description }}</div>
				</div>
			</div>
			<!-- <div class="title">{{ $t("综合资料") }}</div> -->
			<div class="info flex flex-b">
				<div class="info-item">
					<div class="">{{ $t("所属行业") }}</div>
					<div class="t">{{ info.sector }}</div>
				</div>
				<div class="info-item">
					<div class="">{{ $t("newt").a50 }}</div>
					<div class="t">{{ info.industry }}</div>
				</div>
				<div class="info-item">
					<div class="">{{ $t("成立时间")}}</div>
					<div class="t">{{ info.list_date }}</div>
				</div>
				<div class="info-item">
					<div class="">{{ $t("newt").a42 }}</div>
					<div class="t">
						{{ $t("newt").a43 }}{{ info.marketcap_rank }}{{ $t("newt").a44 }}
					</div>
				</div>
				<div class="info-item">
					<div class="">{{ $t("newt").a45 }}</div>
					<div class="t num-font">
						{{ $formatMoney(info.sharesout) }}{{ $t("newt").a46 }}
					</div>
				</div>
				<div class="info-item">
					<div class="">{{ $t("newt").t78 }}</div>
					<div class="t num-font">
						{{ $formatMoney(info.marketcap) }}{{ $t("newt").t50 }}
					</div>
				</div>
				<div class="info-item">
					<div class="">{{ $t("newt").a49 }}</div>
					<div class="t">{{ info.foreigners_pie }}%</div>
				</div>
				<div class="info-item">
					<div class="">{{ $t("newt").a48 }}</div>
					<div class="red t num-font">{{ $formatMoney(info.year_high) }}</div>
				</div>
				<div class="info-item">
					<div class="">{{ $t("newt").a51 }}</div>
					<div class="t num-font">{{ $formatMoney(info.year_low) }}</div>
				</div>
			</div>
		</div>

		<!-- 投资者 -->
		<investor-info :symbol="id"></investor-info>

		<!-- 投资者趋势 -->
		<investor-trends :symbol="id"></investor-trends>

		<div class="xs">
			<div class="tb">
				<div class=" flex flex-b">
					<div class="t">{{ $t("newt").a52 }}</div>
					<div class="t1">{{ $t("newt").a53 }} {{ years[3] }}</div>
				</div>

				<div class="flex flex-b">
					<div class="flex tabs flex-1">
						<div class="flex-1 t-c" :class="{ active: type == 0 }" @click="changeType(0)">
							{{ $t("newt").a54 }}
						</div>
						<div class="flex-1  t-c" :class="{ active: type == 1 }" @click="changeType(1)">
							{{ $t("newt").a55 }}
						</div>
					</div>
					<!-- <div class="flex-1"></div> -->
				</div>
			</div>

			<div class="nums flex flex-b">
				<div class="item flex flex-b">
					<div class="flex-1">
						<div class="t1">{{ $t("newt").a56 }}</div>
						<div class="t-c">
							<div class="t2" :class="{ die: firsetData[29] < 0 }">
								{{ firsetData[29] < 0 ? "" : "+"
                }}{{ $formatMoney(firsetData[29]) }}{{ $t("newt").t50 }}
							</div>
							<span class="t3" :class="{ die: firsetData[42] < 0 }">
								{{ firsetData[42] < 0 ? "" : "+" }}{{ firsetData[42] }}%
							</span>
						</div>
					</div>
					<div class="per">
						<!-- <u-circle-progress
              border-width="16"
              width="140"
              :percent="showPercent(firsetData[42])"
              inactive-color="#F4F5F7"
              :active-color="firsetData[42] < 0 ? '#30E0A1' : '#E73E59'"
              bg-color="transparent"
            >
              <div class="u-progress-info">
                {{ firsetData[42] < 0 ? "" : "+" }}{{ firsetData[42] }}%
              </div>
            </u-circle-progress> -->
					</div>
				</div>
				<div class="item flex flex-b center">
					<div class="flex-1">
						<div class="t1">{{ $t("newt").a57 }}</div>
						<div class="t-c">
							<div class="t2" :class="{ die: firsetData[32] < 0 }">
								{{ firsetData[32] < 0 ? "" : "+"
                }}{{ $formatMoney(firsetData[32]) }}{{ $t("newt").t50 }}
							</div>
							<span class="t3" :class="{ die: firsetData[81] < 0 }">
								{{ firsetData[81] < 0 ? "" : "+" }}{{ firsetData[81] }}%
							</span>
						</div>
					</div>

					<div class="per">
						<!-- <u-circle-progress
              border-width="16"
              width="140"
              :percent="showPercent(firsetData[81])"
              inactive-color="#F4F5F7"
              :active-color="firsetData[81] < 0 ? '#30E0A1' : '#E73E59'"
              bg-color="transparent"
            >
              <div class="u-progress-info">
                {{ firsetData[81] < 0 ? "" : "+" }}{{ firsetData[81] }}%
              </div>
            </u-circle-progress> -->
					</div>
				</div>
				<div class="item flex flex-b">
					<div class=" flex-1">
						<div class="t1">{{ $t("newt").a58 }}</div>
						<div class="t-c">
							<div class="t2" :class="{ die: firsetData[36] < 0 }">
								{{ firsetData[36] < 0 ? "" : "+"
                }}{{ $formatMoney(firsetData[36]) }}{{ $t("newt").t50 }}
							</div>
							<span class="t3" :class="{ die: firsetData[83] < 0 }">
								{{ firsetData[83] < 0 ? "" : "+" }}{{ firsetData[83] }}%
							</span>
						</div>
					</div>

					<div class="per">
						<!-- <u-circle-progress
              border-width="16"
              width="140"
              :percent="showPercent(firsetData[83])"
              inactive-color="#F4F5F7"
              :active-color="firsetData[83] < 0 ? '#30E0A1' : '#E73E59'"
              bg-color="transparent"
            >
              <div class="u-progress-info">
                {{ firsetData[83] < 0 ? "" : "+" }}{{ firsetData[83] }}%
              </div>
            </u-circle-progress> -->
					</div>
				</div>
			</div>

			<!-- 图表 -->
			<div class="chart-box">
				<div class="flex flex-b">
					<div class="flex tbs flex-2">
						<div class="flex-1 t-c" :class="{ active: types == 0 }" @click="changeTypes(0)">
							{{ $t("newt").a59 }}
						</div>
						<div class="flex-1 t-c" :class="{ active: types == 1 }" @click="changeTypes(1)">
							{{ $t("newt").a60 }}
						</div>
						<div class="flex-1 t-c" :class="{ active: types == 2 }" @click="changeTypes(2)">
							{{ $t("newt").a61 }}
						</div>
					</div>
					<div class="flex-1"></div>
				</div>

				<!-- 圖表 -->
				<div class="chart" id="main"></div>
			</div>

			<!-- 卖空状态 -->
			<buy-status :symbol="id"></buy-status>
		</div>
		<loading ref="loading" />
	</div>
</template>

<script>
	import * as echarts from "echarts";
	import investorInfo from "./gkItems/investorInfo.vue";
	import buyStatus from "./gkItems/buyStatus.vue";
	import investorTrends from "./gkItems/investorTrends.vue";
	export default {
		name: "gkInfo",
		props: {
			symbol: {
				type: String,
				default: "",
			},
      stockType: {
        type: String,
        default: "",
      },
		},
		components: {
			investorInfo,
			buyStatus,
			investorTrends,
		},
		data() {
			return {
				ko_name: "",
				showMore: true,
				info: {},
				description: "",
				type: 0,
				types: 0,
				id: "",
				firsetData: {},
				numData: {},
				years: [],
				myChart: null,
			};
		},
		computed: {
			showPercent() {
				return (str) => {
					if (!str || str === null || str == undefined) return 0;
					let isNum = str.indexOf("-");
					if (isNum > -1) {
						let num1 = Number(str.replace("-", ""));
						num1 = num1 > 100 ? 100 : num1;
						return num1;
					} else {
						let num2 = Number(str);
						num2 = num2 > 100 ? 100 : num2;
						return num2;
					}
				};
			},
		},
		created() {},
		mounted() {
			this.getInfo();
		},
		methods: {
			// 切换季度,年度显示
			changeType(type) {
				this.type = type;
				this.getNums();
				this.changeTypes(0);
			},
			// 切换图表显示
			changeTypes(type) {
				this.types = type;
				let arr = [];
				switch (type) {
					case 0:
						arr = this.numData.arr;
						break;
					case 1:
						arr = this.numData.arr1;
						break;
					case 2:
						arr = this.numData.arr2;
						break;
					default:
						break;
				}

				let newOption = {
					series: [{
						data: [...arr],
					}, ],
				};
				// console.log('myChart', this.myChart);
				// 切换更新数据
				this.myChart.setOption(newOption);
			},
			getInfo() {
				this.$refs.loading.open(); //开启加载

				// 获取概括
				this.$server.post("/parameter/gkxx", {
					symbol: this.symbol,
					type: this.stockType
				}).then((res) => {
					if (res.status == 1) {
						this.info = res.data;
					}
				});
				// 获取公司简介
				this.$server.post("/parameter/symbol_details", {
					symbol: this.symbol,
					type: this.stockType
				}).then((res) => {
					this.$refs.loading.close();

					if (res.status == 1) {
						this.id = res.data[this.symbol].id;
						this.description = res.data[this.symbol].description;
						this.ko_name = res.data[this.symbol].ko_name;
						this.info.list_date = res.data[this.symbol].list_date;
						// 要上面获取的id
						this.getNums();
					}
				});
			},
			getNums() {
				let type = "";
				type = this.type == 0 ? "q" : "y";
				this.$server.post("/parameter/xiaoshouer", {
					id: this.id,
					type
				}).then((res) => {
					if (res.status == 1) {
						this.years = [];
						this.numData = {};

						// 有某些数据 res.data.data[0].fields[36] 没有这一项，默认显示为0
						if (!this.type) {
							// 显示最近的销售
							this.firsetData = {
								"29": res.data.data[0].fields[29] ?
									(res.data.data[0].fields[29].value / 100000000).toFixed(0) : 0,
								"32": res.data.data[0].fields[32] ?
									(res.data.data[0].fields[32].value / 100000000).toFixed(0) : 0,
								"36": res.data.data[0].fields[36] ?
									(res.data.data[0].fields[36].value / 100000000).toFixed(0) : 0,
								"42": res.data.data[0].fields[42] ?
									res.data.data[0].fields[42].value.toFixed(2) : 0,
								"81": res.data.data[0].fields[81] ?
									res.data.data[0].fields[81].value.toFixed(2) : 0,
								"83": res.data.data[0].fields[83] ?
									res.data.data[0].fields[83].value.toFixed(2) : 0,
							};
						} else {
							// 是年销售就是下面这些
							// 43 82 84
							this.firsetData = {
								"29": res.data.data[0].fields[29] ?
									(res.data.data[0].fields[29].value / 100000000).toFixed(0) : 0,
								"32": res.data.data[0].fields[32] ?
									(res.data.data[0].fields[32].value / 100000000).toFixed(0) : 0,
								"36": res.data.data[0].fields[36] ?
									(res.data.data[0].fields[36].value / 100000000).toFixed(0) : 0,
								"42": res.data.data[0].fields[43] ?
									res.data.data[0].fields[43].value.toFixed(2) : 0,
								"81": res.data.data[0].fields[82] ?
									res.data.data[0].fields[82].value.toFixed(2) : 0,
								"83": res.data.data[0].fields[84] ?
									res.data.data[0].fields[84].value.toFixed(2) : 0,
							};
						}

						let arr = [];
						let arr1 = [];
						let arr2 = [];
						res.data.data.forEach((item) => {
							arr.push(
								item.fields[29] ?
								(item.fields[29].value / 100000000).toFixed(0) :
								0
							);
							arr1.push(
								item.fields[32] ?
								(item.fields[32].value / 100000000).toFixed(0) :
								0
							);
							arr2.push(
								item.fields[36] ?
								(item.fields[36].value / 100000000).toFixed(0) :
								0
							);
							this.years.push(item.report_year_month);
						});

						this.years = this.years.reverse();
						this.numData = {
							arr: arr.reverse(),
							arr1: arr1.reverse(),
							arr2: arr2.reverse(),
						};
						console.log(" this.numData", this.numData);
						this.initData();
					}
				});
			},
			initData() {
				if (this.myChart !== null) {
					this.myChart.dispose(); //重新初始化，先销毁之前的
				}

				let chartDom = document.getElementById("main");
				this.myChart = echarts.init(chartDom);
				let option;

				option = {
					tooltip: {
						trigger: "axis",
						axisPointer: {
							type: "shadow",
						},
					},
					xAxis: {
						type: "category",
						data: [...this.years],
						// 坐标轴显示内容
						axisLabel: {
							interval: 0,
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
								return `${this.$formatMoney(value) || 0} ${this.$t("亿")}`;
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
						data: [...this.numData.arr],
						type: "line",
						lineStyle: {
							color: "#3561E5",
						},
						symbol: "circle", //将小圆点改成实心 不写symbol默认空心
						symbolSize: 6, //小圆点的大小
						itemStyle: {
							color: "#3561E5", //小圆点和线的颜色
						},
					}, ],
				};
				option && this.myChart.setOption(option);
			},
		},
	};
</script>

<style scoped lang="less">
	.chart {
		width: 100%;
		height: 3rem;
	}
	.xs {
		padding: 0.1rem;

		.tb {
			.t {
				font-weight: bold;
				font-size: 0.16rem;
				color: #353535;
			}

			.t1 {
				font-size: 0.12rem;
				color: #555555;
			}

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

		.nums {
			padding: 0.15rem 0;

			.t {
				font-size: 0.12rem;
				color: #7f7f7f;
			}

			.u-progress-info {
				font-size: 0.2rem;
				color: #252525;
				text-align: center;
				font-weight: bold;
			}

			.item {
				width: 32%;
				background: #F5F7FA;
				border-radius: 0.06rem;
				padding: 0.1rem 0.05rem;

				.t1 {
					text-align: center;
					font-size: 0.14rem;
					color: #858585;
				}

				.t2 {
					font-weight: 600;
					font-size: 0.16rem;
					color: #212121;
					padding: 0.1rem 0;
				}

				.t3 {
					// background: #f8dfd9;
					// border-radius: 0.3rem;
					font-weight: 600;
					font-size: 0.14rem;
					color: #e73e59;

					&.die {
						color: #3aab59;
						// background: #f0fffa;
					}
				}
			}
		}

		.chart-box {
			.tbs {
				border: 0.01rem solid #ebebeb;
				border-radius: 0.06rem;

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

	.about {
		padding: 0.12rem;
		.title {
			font-weight: 600;
			font-size: 0.16rem;
			color: #000000;
			margin-bottom: 0.1rem;
		}

		.infos {
			line-height: 0.3rem;
			margin-bottom: 0.1rem;

			.t {
				font-family: PingFangSC, PingFang SC;
				font-weight: 500;
				font-size: 0.15rem;
				color: #333333;
			}

			.t1 {
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				font-size: 0.13rem;
				color: #999999;
			}
		}

		.info {
			line-height: 0.3rem;
			flex-wrap: wrap;
			border-bottom: .01rem solid #eee;

			.info-item {
				width: 32%;
				min-height: 0.83rem;
				background: #F5F7FA;
				padding: 0.08rem;
				margin-bottom: 0.06rem;
			}

			div {
				line-height: 0.26rem;
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				font-size: 0.12rem;
				color: #666666;
			}

			.t {
				font-family: PingFangSC, PingFang SC;
				font-weight: 500;
				font-size: 0.14rem;
				color: #333333;
			}
		}
	}
</style>