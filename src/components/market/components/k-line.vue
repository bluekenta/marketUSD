<template>
	<div>
		<div class="stock-chart">
			<div class="chart-time flex flex-b">
				<div class="txt" :class="{ active: typeIndx === index }" v-for="(item, index) in typeList" :key="index"
					@click="selectType(index, item.val)">
					{{ item.name }}
				</div>
				<div class="icon kset animate__animated animate__fadeIn" @click="clickXb"></div>
				<div v-show="zbShow" class="zbShows">
					<div class="zbShowdiv">
						<div>{{ $t("market").j7 }}</div>
						<div :class="{ active: zbShowdiv1Index == index }" v-for="(item, index) in zbShowdiv1"
							:key="item" @click="clickZbShowdiv1(index)">
							{{ item }}
						</div>
					</div>
					<div class="zbShowdiv">
						<div>{{ $t("market").j8 }}</div>
						<div :class="{ active: zbShowdiv2Index == index }" v-for="(item, index) in zbShowdiv2"
							:key="item" @click="clickZbShowdiv2(index)">
							{{ item }}
						</div>
					</div>
				</div>
			</div>
			<div>
				<div id="Zline" v-show="typeVal == 1"></div>
				<div id="Zline1" v-show="typeVal != 1"></div>
			</div>
		</div>
		<loading ref="loading" />
	</div>
</template>

<script>
	import {
		init,
		dispose
	} from "klinecharts";
	export default {
		name: "kLine",
		props: {
			symbol: {
				type: String,
				default: "",
			},
			stockType: {
				type: String,
				default: "",
			},
			details: {
				type: Object,
				default: {},
			},
		},
		data() {
			return {
				show: false,
				zbShowdiv1: ["MA", "BOLL"],
				zbShowdiv1Index: 0,
				zbShowdiv2: ["KDJ", "MACD", "RSI", "WR"],
				zbShowdiv2Index: 0,
				typeList: [{
						name: this.$t("newt").t36,
						val: "1",
					},
					{
						name: this.$t("5分"),
						val: "5",
					},
					{
						name: this.$t("15分"),
						val: "15",
					},
					{
						name: this.$t("30分"),
						val: "30",
					},
					{
						name: this.$t("newt").t37,
						val: "1D",
					},
					{
						name: this.$t("newt").t38,
						val: "1W",
					},
					{
						name: this.$t("newt").t39,
						val: "1M",
					},
					{
						name: this.$t("newt").t41,
						val: "12M",
					},
				],
				typeIndx: 0,
				typeVal: "1",
				zbShow: false,
				timer: null,
				reLoad: false,
				htmlId: "",
				htmlId1: "",
        localType: 'usd'
			};
		},
		components: {},
		created() {},
		computed: {},
		mounted() {
			this.$refs.loading.open(); //开启加载
      this.localType = window.localStorage.getItem('stockType')||'usd';
		},
		watch: {
			symbol: {
				handler(newValue, oldValue) {
					if (newValue && newValue !== oldValue) {
						this.getChartsData();
						this.timer = setInterval(() => {
							this.reLoad = true;
							this.getChartsData();
						}, 5000);
					}
				},
				// deep: true  // 深度监听
				immediate: true, // 第一次改变就执行
			},
		},
		destroyed() {
			clearInterval(this.timer);
		},
		methods: {
			selectType(index, val) {
				this.zbShow = false;
				this.$refs.loading.open(); //开启加载
				this.typeIndx = index;
				this.typeVal = val;
				// if (index) this.showType = 'candle_solid';
				// else this.showType = 'area';
				this.getChartsData();
			},
			clickZbShowdiv1(index) {
				this.zbShow = false;
				this.zbShowdiv1Index = index;
				if (this.typeVal != "1") {
					this.getChartsData();
				}
			},
			clickZbShowdiv2(index) {
				this.zbShow = false;
				this.zbShowdiv2Index = index;
				if (this.typeVal != "1") {
					this.getChartsData();
				}
			},
			clickXb() {
				if (this.zbShow) {
					this.zbShow = false;
				} else {
					this.zbShow = true;
				}
			},
			// 获取k线数据
			getChartsData() {
        this.localType = window.localStorage.getItem('stockType')||'usd';

				//获取日期
				function timestampToDate(timestamp) {
					// 将10位时间戳转换为毫秒时间戳
					const milliseconds = timestamp * 1000;

					// 创建Date对象并传入毫秒时间戳
					const date = new Date(milliseconds);

					// 获取年份、月份和日期
					const year = date.getFullYear();
					const month = ("0" + (date.getMonth() + 1)).slice(-2);
					const day = ("0" + date.getDate()).slice(-2);

					// 拼接日期字符串，格式为：DD-MM-YYYY
					const formattedDate = `${year}-${month}-${day}`;

					return formattedDate;
				}
				//获取时间
				function getTimeFromTimestamp(timestamp) {
					const date = new Date(timestamp * 1000 - 1 * 60 * 60 * 1000); // 将时间戳转换为毫秒

					// 创建一个日期格式化对象，指定韩国时区
					const formatter = new Intl.DateTimeFormat("en-US", {
						timeZone: "America/Chicago", // 韩国时区
						year: "numeric",
						month: "numeric",
						day: "numeric",
						hour: "numeric",
						minute: "numeric",
						second: "numeric",
						hour12: false,
					});

					// 格式化日期
					const formattedDate = formatter.format(date);
					// console.log(formattedDate);
					return formattedDate.slice(
						formattedDate.length - 8,
						formattedDate.length - 3
					);

					// const hours = String(date.getHours()).padStart(2, '0'); // 获取小时，并在不足两位数时补0
					// const minutes = String(date.getMinutes()).padStart(2, '0'); // 获取分钟，并在不足两位数时补0
					// return `${hours}:${minutes}`; // 返回格式化后的时间字符串
				}
        let url = ''
        let per = {}
        if(this.localType=='wh'){
          url = '/Common/fx_history'
          per = {
            symbol: this.symbol,
            period: this.typeVal,
          }
        }else{
          url = '/trade/kline'
          per = {
            symbol: this.symbol,
            type: this.stockType,
            kline_type: this.typeVal,
          }
        }
				this.$server.post(url, per).then((res) => {
					this.$refs.loading.close(); //开启加载
          if(this.localType=='wh'){
            res = res.data
          }

					if (this.typeVal.toString() == "1") {
						//加载分时图
						let chart = init(document.getElementById("Zline"));

						// 没有数据时显示图层
						if (res.data.length == 0) {
							this.htmlId = chart.createHtml({
									id: "html_1",
									position: "content",
									style: {
										zIndex: 12,
										textAlign: "center",
										top: "50%",
										left: "50%",
										transform: "translate(-50%,-50%)",
									},
									content: `<div class="">
              <svg t="1710671846211" class="icon" viewBox="0 0 2141 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="22324" width="100" height="100"><path d="M1797.713555 210.038896l-44.031769 43.977769c-6.609965 6.582965-16.516913 6.582965-21.649886 0-6.981963-6.595965-6.981963-16.117915-0.371998-21.622886l44.217768-44.151768-44.217768-44.151768c-6.609965-6.608965-6.609965-16.489913 0-21.622886 6.608965-6.595965 16.516913-6.595965 21.649886 0l44.217768 44.150768 44.231768-44.150768c6.595965-6.595965 16.489913-6.595965 22.008884 0 6.609965 6.595965 6.609965 16.489913 0 21.622886l-44.403767 44.337767 44.031769 43.965769c6.608965 6.595965 6.608965 16.489913 0 21.622886-5.133973 5.479971-15.054921 5.479971-21.636886 0l-44.045769-43.977769zM108.255431 462.765569V524.697243c0 8.789954-6.609965 15.386919-15.412919 15.386919-7.712959 1.103994-15.399919-6.595965-15.399919-15.386919v-61.931674H15.430919a15.027921 15.027921 0 0 1-15.425919-15.399919 15.027921 15.027921 0 0 1 15.425919-15.38592h62.011674v-63.022668a15.027921 15.027921 0 0 1 15.399919-15.38592c8.816954 0 15.426919 6.581965 15.426919 15.38592v63.022668h63.114669a15.027921 15.027921 0 0 1 15.399919 15.38592 15.027921 15.027921 0 0 1-15.399919 15.386919H108.269431zM2066.95914 819.488694c-40.361788 0-74.126611-32.621829-74.12661-74.033611 0-41.399782 32.660828-74.007611 74.12661-74.007611 41.477782 0 74.126611 32.608829 74.126611 74.007611 0 41.411782-33.751823 74.033611-74.126611 74.033611z m0-119.82137c-24.934869 0-45.853759 20.506892-45.853759 45.800759a46.079758 46.079758 0 0 0 45.853759 45.79976c24.960869 0 45.879759-20.87789 45.879759-45.81276 0-25.267867-20.91889-45.787759-45.879759-45.787759z m-795.869818 203.415931l-75.962601 17.20891-301.638415 68.381641-151.645204 34.336819c-21.409888 4.786975-42.594776-8.364956-47.382751-29.469845l-34.443819-152.136201-23.537876-103.955453-128.412325-566.548024c-4.786975-21.091889 8.670954-42.089779 30.054842-46.984753L1053.070467 7.114963a11.635939 11.635939 0 0 1 13.856927 8.669954l29.149847 128.611324c4.894974 21.609886 26.903859 35.281815 48.806744 30.280841l127.799328-28.937848a11.635939 11.635939 0 0 1 13.857928 8.644955l49.829738 219.958844 31.171836 151.205206-0.08 0.319998c-87.079542 38.1538-147.894223 125.086343-147.894222 226.235812 0 56.851701 19.216899 109.235426 51.519729 150.979206z m1.501992-777.025917l-119.84637 27.222857a34.429819 34.429819 0 0 1-41.172784-25.999864l-27.528855-121.069364c-1.023995-4.389977 3.85698-7.846959 7.646959-5.399971l182.511041 116.08439c3.76298 2.339988 2.751986 8.151957-1.622991 9.175952zM716.656235 442.325676a29.815843 29.815843 0 0 0-22.607881 35.773812l2.938984 12.739933a29.828843 29.828843 0 0 0 35.772812 22.607881l464.095562-105.166447a29.815843 29.815843 0 0 0 22.607881-35.772812l-2.845985-12.739933a29.828843 29.828843 0 0 0-35.772812-22.634881L716.655235 442.325676z m41.79678 184.159033l464.188561-105.178448a29.815843 29.815843 0 0 0 22.607882-35.772812l-2.845985-12.739933a29.828843 29.828843 0 0 0-35.772813-22.634881L742.454099 555.351082a29.815843 29.815843 0 0 0-22.633881 35.772812l2.858985 12.739933a29.828843 29.828843 0 0 0 35.772812 22.634881z m707.979281 346.24418c-121.84136 0-220.623841-98.769481-220.623841-220.62484 0-121.84236 98.782481-220.623841 220.623841-220.623841 121.84236 0 220.610841 98.781481 220.61084 220.623841 0 121.85536-98.768481 220.624841-220.62384 220.62484z m-2.273989-331.322259c-23.059879 0-41.132784 6.355967-54.537713 19.0699-13.696928 12.739933-20.253894 30.320841-20.253894 52.742723h35.520814c0-12.726933 2.486987-22.740881 7.792959-29.695844 5.930969-8.497955 15.599918-12.420935 29.296846-12.420935 10.599944 0 19.0169 2.725986 24.948869 8.483956 5.597971 5.74497 8.709954 13.630928 8.709954 23.631875 0 7.57996-2.791985 14.840922-8.404956 21.516887l-3.74998 4.255978c-20.239894 17.553908-32.40883 30.293841-36.464808 38.485798-4.361977 8.165957-6.236967 18.165905-6.236968 29.682844v4.255977h35.852812v-4.255977c0-7.260962 1.555992-13.617928 4.667975-19.694897 2.819985-5.452971 6.861964-10.599944 12.473935-15.14792 14.960921-12.725933 24.004874-20.91789 26.809859-23.936874 7.473961-9.707949 11.516939-22.129884 11.516939-37.275805 0-18.485903-6.223967-33.047826-18.683901-43.64677-12.487934-10.904943-28.991848-16.064916-49.258742-16.064916z m-5.61197 174.850081c-6.848964 0-12.446935 2.127989-17.12891 6.356967-4.679975 4.254978-6.874964 9.707949-6.874964 16.383914 0 6.649965 2.193988 12.114936 6.874964 16.356914a24.645871 24.645871 0 0 0 17.12991 6.649965c6.860964 0 12.459935-2.101989 17.15391-6.343967 4.654976-4.255978 7.154962-9.999947 7.154962-16.662912a22.075884 22.075884 0 0 0-6.848964-16.357914c-4.666975-4.254978-10.598944-6.382966-17.459908-6.382967z" fill="#6970AF" p-id="22325"></path></svg>
              <div>${this.$t("暂无数据")}</div>
              </div>`,
								},
								"candle_pane"
							);

							return;
						} else {
							chart.removeHtml("candle_pane", this.htmlId);
						}

						//chart.createTechnicalIndicator('MA', false, { id: 'candle_pane',calcParams: [5, 10],})
						//自定义指标
						const simpleMovingAverage = {
							name: "MA",
							shortName: "MA",
							calcParams: [60],
							figures: [{
								key: "ma1",
								title: "MA60: ",
								type: "line"
							}],
							// 当计算参数改变时，希望提示的和参数一样，即title的值需要改变
							regenerateFigures: (params) => {
								return params.map((p, i) => {
									return {
										key: `ma${i + 1}`,
										title: `MA${p}: `,
										type: "line",
									};
								});
							},
							// 计算结果
							calc: (kLineDataList, {
								calcParams,
								figures
							}) => {
								// 注意：返回数据个数需要和kLineDataList的数据个数一致，如果无值，用{}代替即可。
								// 计算参数最好取回调参数calcParams，如果不是，后续计算参数发生变化的时候，这里计算不能及时响应
								const closeSums = [];
								return kLineDataList.map((kLineData, i) => {
									const ma = {};
									const close = kLineData.close;
									calcParams.forEach((param, j) => {
										closeSums[j] = (closeSums[j] || 0) + close;
										if (i >= param - 1) {
											ma[figures[j].key] = closeSums[j] / param;
											closeSums[j] -= kLineDataList[i - (param - 1)]
												.close;
										}
									});
									// 如果有值的情况下，这里每一项的数据格式应该是 { ma1: xxx, ma2: xxx }
									// 每个key需要和figures中的子项key对应的值一致
									return ma;
								});
							},
						};

						chart.setTimezone("America/Chicago"); //設置時區固定
						chart.createTechnicalIndicator(simpleMovingAverage, false, {
							id: "candle_pane",
						}); //自定义指标
						let areaobj = {};
						if (this.details.gain < 0) {
							areaobj = {
								lineSize: 2,
								lineColor: "rgba(253, 34, 34, 1)",
								value: "close",
								backgroundColor: [{
										offset: 0,
										color: "rgba(253, 34, 34, 0.01)",
									},
									{
										offset: 1,
										color: "rgba(253, 34, 34, 0.2)",
									},
								],
							};
						} else {
							areaobj = {
								lineSize: 2,
								lineColor: "rgba(26, 154, 119, 1)",
								value: "close",
								backgroundColor: [{
										offset: 0,
										color: "rgba(26, 154, 119, 0.01)",
									},
									{
										offset: 1,
										color: "rgba(26, 154, 119, 0.2)",
									},
								],
							};
						}
						//添加样式
						chart.setStyleOptions({
							candle: {
								type: "area",
								// 面积图
								area: areaobj,
								// 蜡烛柱
								bar: {
									upColor: "#549D7E",
									downColor: "#DE3C26",
									noChangeColor: "#999999",
								},
								tooltip: {
									showRule: "always", //不显示上面的时间，高低开。。。
									showType: "standard", // 'standard' | 'rect'
									// labels: ['', '총:', '시:', '고:', '저:'],
									labels: [
										this.$t("new").a54 + ': ',
										this.$t("new").a55 + ': ',
										this.$t("new").a56 + ': ',
										this.$t("new").a57 + ': ',
										this.$t("new").a58 + ': ',
									],
									showName: true,
									showParams: true,
									defaultValue: "n/a",
									text: {
										size: 12,
										family: "Helvetica Neue",
										weight: "normal",
										color: "#666666",
										marginTop: 6,
										marginRight: 8,
										marginBottom: 6,
										marginLeft: 8,
									},
								},
							},
							// 技术指标
							technicalIndicator: {
								margin: {
									top: 0.2,
									bottom: 0.1,
								},
								bar: {
									upColor: "#549D7E",
									downColor: "#DE3C26",
									noChangeColor: "#999999",
								},
								line: {
									size: 1,
									colors: [
										"#FF9600",
										"#9D65C9",
										"#2196F3",
										"#E11D74",
										"#01C5C4",
									],
								},
								circle: {
									upColor: "#549D7E",
									downColor: "#DE3C26",
									noChangeColor: "#999999",
								},
							},
							grid: {
								// 网格水平线
								horizontal: {
									show: false,
									size: 1,
									color: "#191a1f",
									// 'solid'|'dash'
									style: "dash",
									dashValue: [2, 2],
								},
								// 网格垂直线
								vertical: {
									show: false,
									size: 1,
									color: "#191a1f",
									// 'solid'|'dash'
									style: "dash",
									dashValue: [2, 2],
								},
							},
							xAxis: {
								tickLine: {
									color: "#E5E8F6",
								},
								axisLine: {
									color: "#E5E8F6",
								},
							},
							yAxis: {
								tickLine: {
									show: true,
									size: 1,
									length: 3,
									color: "#E5E8F6",
								},
								axisLine: {
									color: "#E5E8F6",
								},
							},
							separator: {
								size: 1,
								color: "#E5E8F6",
								activeBackgroundColor: "#E5E8F6",
							},
						});

						let data = res.data;

						// chart.applyNewData(data);
						// return

						// 获取当前时间的最新一天日期
						let currentDate = new Date(timestampToDate(data[0].time));
						let currentYear = currentDate.getFullYear();
						let currentMonth = currentDate.getMonth();
						let currentDay = currentDate.getDate();

						// 按照时间戳的顺序对数组进行排序
						let sortedData = data.sort((a, b) => a.time - b.time);


						// 筛选出日期等于最新一天的时间戳对象
						/* let latestData = sortedData.filter((obj) => {
							let date = new Date(obj.time * 1000); // 将时间戳转换为毫秒
							let year = date.getFullYear();
							let month = date.getMonth();
							let day = date.getDate();

							return (
								year === currentYear &&month === currentMonth &&day === currentDay
							);
						}); */
						let latestData = sortedData;

						// 提取最新一天时间戳对象的时间戳
						//let latestOpenValues = latestData.map((obj) => obj);
						let latestOpenValues = latestData;

						//console.log("latestOpenValues", latestOpenValues);

						let datad = [];
						let time = [];
						if (latestOpenValues.length > 0) {
							latestOpenValues.forEach((item) => {
								let kLineModel = {
									open: item.open,
									low: item.low,
									high: item.high,
									close: item.close,
									volume: item.volume,
									timestamp: item.time * 1000,
								};
								time.push(getTimeFromTimestamp(item.time));
								datad.push(kLineModel);
							});

							// console.log('time',time)

							// 这里数据时间没有冲9点开始的？？？

							let index = time.indexOf("15:30");
							let Data = datad;
							/* if (index < 0) {
								Data = datad.slice(time.indexOf("09:00"));
							} else {
								Data = datad.slice(
									time.indexOf("09:00"),
									time.indexOf("15:30") + 1
								);
							} */


							if (this.reLoad) {
								chart.updateData(Data[Data.length - 1]);
								return;
							}

							chart.applyNewData(Data);
						} else {
							this.$refs.loading.close(); //关闭加载
						}
					} else {
						//K线
						let chart = init(document.getElementById("Zline1"));
						// 没有数据时显示图层
						if (res.data.length == 0) {
							this.htmlId1 = chart.createHtml({
									id: "html_1",
									position: "content",
									style: {
										zIndex: 12,
										textAlign: "center",
										top: "50%",
										left: "50%",
										transform: "translate(-50%,-50%)",
									},
									content: `<div class="">
              <svg t="1710671846211" class="icon" viewBox="0 0 2141 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="22324" width="100" height="100"><path d="M1797.713555 210.038896l-44.031769 43.977769c-6.609965 6.582965-16.516913 6.582965-21.649886 0-6.981963-6.595965-6.981963-16.117915-0.371998-21.622886l44.217768-44.151768-44.217768-44.151768c-6.609965-6.608965-6.609965-16.489913 0-21.622886 6.608965-6.595965 16.516913-6.595965 21.649886 0l44.217768 44.150768 44.231768-44.150768c6.595965-6.595965 16.489913-6.595965 22.008884 0 6.609965 6.595965 6.609965 16.489913 0 21.622886l-44.403767 44.337767 44.031769 43.965769c6.608965 6.595965 6.608965 16.489913 0 21.622886-5.133973 5.479971-15.054921 5.479971-21.636886 0l-44.045769-43.977769zM108.255431 462.765569V524.697243c0 8.789954-6.609965 15.386919-15.412919 15.386919-7.712959 1.103994-15.399919-6.595965-15.399919-15.386919v-61.931674H15.430919a15.027921 15.027921 0 0 1-15.425919-15.399919 15.027921 15.027921 0 0 1 15.425919-15.38592h62.011674v-63.022668a15.027921 15.027921 0 0 1 15.399919-15.38592c8.816954 0 15.426919 6.581965 15.426919 15.38592v63.022668h63.114669a15.027921 15.027921 0 0 1 15.399919 15.38592 15.027921 15.027921 0 0 1-15.399919 15.386919H108.269431zM2066.95914 819.488694c-40.361788 0-74.126611-32.621829-74.12661-74.033611 0-41.399782 32.660828-74.007611 74.12661-74.007611 41.477782 0 74.126611 32.608829 74.126611 74.007611 0 41.411782-33.751823 74.033611-74.126611 74.033611z m0-119.82137c-24.934869 0-45.853759 20.506892-45.853759 45.800759a46.079758 46.079758 0 0 0 45.853759 45.79976c24.960869 0 45.879759-20.87789 45.879759-45.81276 0-25.267867-20.91889-45.787759-45.879759-45.787759z m-795.869818 203.415931l-75.962601 17.20891-301.638415 68.381641-151.645204 34.336819c-21.409888 4.786975-42.594776-8.364956-47.382751-29.469845l-34.443819-152.136201-23.537876-103.955453-128.412325-566.548024c-4.786975-21.091889 8.670954-42.089779 30.054842-46.984753L1053.070467 7.114963a11.635939 11.635939 0 0 1 13.856927 8.669954l29.149847 128.611324c4.894974 21.609886 26.903859 35.281815 48.806744 30.280841l127.799328-28.937848a11.635939 11.635939 0 0 1 13.857928 8.644955l49.829738 219.958844 31.171836 151.205206-0.08 0.319998c-87.079542 38.1538-147.894223 125.086343-147.894222 226.235812 0 56.851701 19.216899 109.235426 51.519729 150.979206z m1.501992-777.025917l-119.84637 27.222857a34.429819 34.429819 0 0 1-41.172784-25.999864l-27.528855-121.069364c-1.023995-4.389977 3.85698-7.846959 7.646959-5.399971l182.511041 116.08439c3.76298 2.339988 2.751986 8.151957-1.622991 9.175952zM716.656235 442.325676a29.815843 29.815843 0 0 0-22.607881 35.773812l2.938984 12.739933a29.828843 29.828843 0 0 0 35.772812 22.607881l464.095562-105.166447a29.815843 29.815843 0 0 0 22.607881-35.772812l-2.845985-12.739933a29.828843 29.828843 0 0 0-35.772812-22.634881L716.655235 442.325676z m41.79678 184.159033l464.188561-105.178448a29.815843 29.815843 0 0 0 22.607882-35.772812l-2.845985-12.739933a29.828843 29.828843 0 0 0-35.772813-22.634881L742.454099 555.351082a29.815843 29.815843 0 0 0-22.633881 35.772812l2.858985 12.739933a29.828843 29.828843 0 0 0 35.772812 22.634881z m707.979281 346.24418c-121.84136 0-220.623841-98.769481-220.623841-220.62484 0-121.84236 98.782481-220.623841 220.623841-220.623841 121.84236 0 220.610841 98.781481 220.61084 220.623841 0 121.85536-98.768481 220.624841-220.62384 220.62484z m-2.273989-331.322259c-23.059879 0-41.132784 6.355967-54.537713 19.0699-13.696928 12.739933-20.253894 30.320841-20.253894 52.742723h35.520814c0-12.726933 2.486987-22.740881 7.792959-29.695844 5.930969-8.497955 15.599918-12.420935 29.296846-12.420935 10.599944 0 19.0169 2.725986 24.948869 8.483956 5.597971 5.74497 8.709954 13.630928 8.709954 23.631875 0 7.57996-2.791985 14.840922-8.404956 21.516887l-3.74998 4.255978c-20.239894 17.553908-32.40883 30.293841-36.464808 38.485798-4.361977 8.165957-6.236967 18.165905-6.236968 29.682844v4.255977h35.852812v-4.255977c0-7.260962 1.555992-13.617928 4.667975-19.694897 2.819985-5.452971 6.861964-10.599944 12.473935-15.14792 14.960921-12.725933 24.004874-20.91789 26.809859-23.936874 7.473961-9.707949 11.516939-22.129884 11.516939-37.275805 0-18.485903-6.223967-33.047826-18.683901-43.64677-12.487934-10.904943-28.991848-16.064916-49.258742-16.064916z m-5.61197 174.850081c-6.848964 0-12.446935 2.127989-17.12891 6.356967-4.679975 4.254978-6.874964 9.707949-6.874964 16.383914 0 6.649965 2.193988 12.114936 6.874964 16.356914a24.645871 24.645871 0 0 0 17.12991 6.649965c6.860964 0 12.459935-2.101989 17.15391-6.343967 4.654976-4.255978 7.154962-9.999947 7.154962-16.662912a22.075884 22.075884 0 0 0-6.848964-16.357914c-4.666975-4.254978-10.598944-6.382966-17.459908-6.382967z" fill="#6970AF" p-id="22325"></path></svg>
              <div>${this.$t("暂无数据")}</div>
              </div>`,
								},
								"candle_pane"
							);

							return;
						} else {
							chart.removeHtml("candle_pane", this.htmlId1);
						}

						chart.setDataSpace(10);
						chart.isScrollEnabled(false);
						//自定义指标
						const simpleMovingAverages = {
							name: "VOL",
							shortName: "CR",
							calcParams: [20],
							figures: [{
									key: "ma1",
									title: "MA20: ",
									type: "line"
								},
								{
									key: "ma2",
									title: "MA20: ",
									type: "bar"
								},
							],
							// 当计算参数改变时，希望提示的和参数一样，即title的值需要改变
							regenerateFigures: (params) => {
								return params.map((p, i) => {
									return {
										key: `ma${i + 1}`,
										title: `MA${p}: `,
										type: "line",
									};
								});
							},
							// 计算结果
							calc: (kLineDataList, {
								calcParams,
								figures
							}) => {
								// 注意：返回数据个数需要和kLineDataList的数据个数一致，如果无值，用{}代替即可。
								// 计算参数最好取回调参数calcParams，如果不是，后续计算参数发生变化的时候，这里计算不能及时响应
								const closeSums = [];
								return kLineDataList.map((kLineData, i) => {
									const ma = {};
									const close = kLineData.close;
									calcParams.forEach((param, j) => {
										closeSums[j] = (closeSums[j] || 0) + close;
										if (i >= param - 1) {
											ma[figures[j].key] = closeSums[j] / param;
											closeSums[j] -= kLineDataList[i - (param - 1)]
												.close;
										}
									});
									// 如果有值的情况下，这里每一项的数据格式应该是 { ma1: xxx, ma2: xxx }
									// 每个key需要和figures中的子项key对应的值一致
									return ma;
								});
							},
						};
						if (this.zbShowdiv1Index == 0) {
							chart.createTechnicalIndicator("MA", false, {
								id: "candle_pane",
							});
						} else {
							chart.createTechnicalIndicator("BOLL", false, {
								id: "candle_pane",
							});
						}

						chart.createTechnicalIndicator(simpleMovingAverages, false, {
							id: "pane_1",
							height: 100,
							styles: {
								margin: {
									top: 50,
								},
							},
						}); //自定义指标

						if (this.zbShowdiv2Index == 0) {
							chart.createTechnicalIndicator("KDJ", false, {
								id: "pane_2"
							});
						} else if (this.zbShowdiv2Index == 1) {
							chart.createTechnicalIndicator("MACD", false, {
								id: "pane_2"
							});
						} else if (this.zbShowdiv2Index == 2) {
							chart.createTechnicalIndicator("RSI", false, {
								id: "pane_2"
							});
						} else if (this.zbShowdiv2Index == 3) {
							chart.createTechnicalIndicator("WR", false, {
								id: "pane_2"
							});
						}

						//添加样式
						chart.setStyleOptions({
							candle: {
								// 蜡烛图上下间距，大于1为绝对值，大于0小余1则为比例
								margin: {
									top: 0.4,
									bottom: 0.1,
								},
								type: "candle_solid",
								// 蜡烛柱
								bar: {
									upColor: "#549D7E",
									downColor: "#DE3C26",
									noChangeColor: "#999999",
								},
								tooltip: {
									showRule: "always", //不显示上面的时间，高低开。。。
									showType: "standard", // 'standard' | 'rect'
									// labels: ['', '총:', '시:', '고:', '저:'],
									labels: [
										this.$t("new").a54,
										this.$t("new").a55,
										this.$t("new").a56,
										this.$t("new").a57,
										this.$t("new").a58,
									],
									showName: true,
									showParams: true,
									defaultValue: "n/a",
									text: {
										size: 12,
										family: "Helvetica Neue",
										weight: "normal",
										color: "#666666",
										marginTop: 6,
										marginRight: 8,
										marginBottom: 6,
										marginLeft: 8,
									},
								},
							},
							// 图形
							shape: {
								point: {
									backgroundColor: "#2196F3",
									borderColor: "#2196F3",
									borderSize: 111,
									radius: 4,
									activeBackgroundColor: "#2196F3",
									activeBorderColor: "#2196F3",
									activeBorderSize: 1,
									activeRadius: 6,
								},
							},
							// 技术指标
							technicalIndicator: {
								margin: {
									top: 0.2,
									bottom: 0.1,
								},
								bar: {
									upColor: "#549D7E",
									downColor: "#DE3C26",
									noChangeColor: "#999999",
								},
								line: {
									size: 1,
									colors: [
										"#FF9600",
										"#9D65C9",
										"#2196F3",
										"#E11D74",
										"#01C5C4",
									],
								},
								circle: {
									upColor: "#549D7E",
									downColor: "#DE3C26",
									noChangeColor: "#999999",
								},
							},
							grid: {
								// 网格水平线
								horizontal: {
									show: false,
									size: 1,
									color: "#191a1f",
									// 'solid'|'dash'
									style: "dash",
									dashValue: [2, 2],
								},
								// 网格垂直线
								vertical: {
									show: false,
									size: 1,
									color: "#191a1f",
									// 'solid'|'dash'
									style: "dash",
									dashValue: [2, 2],
								},
							},
							xAxis: {
								// x轴分割
								tickLine: {
									color: "#E5E8F6",
								},
								axisLine: {
									color: "#E5E8F6",
								},
							},
							yAxis: {
								tickLine: {
									color: "#E5E8F6",
								},
								axisLine: {
									color: "#E5E8F6",
								},
							},
							separator: {
								size: 1,
								color: "#E5E8F6",
								activeBackgroundColor: "#E5E8F6",
							},
						});
						let datad = [];
						if (res.data.length > 0) {
							res.data.forEach((item) => {
								let kLineModel = {
									open: item.open,
									low: item.low,
									high: item.high,
									close: item.close,
									volume: item.volumn,
									timestamp: item.time * 1000,
								};
								datad.push(kLineModel);
							});
							chart.applyNewData(datad);
						} else {
							this.$refs.loading.close(); //关闭加载
						}
					}
				});
			},
		},
	};
</script>

<style scoped lang="less">
	.stock-chart {
		.chart-time {
			position: relative;
			background: rgba(1, 90, 164, .1);
			border-radius: 0.18rem;
			margin: 0 0.12rem 0.12rem;
			overflow: scroll;

			.txt {
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				font-size: 0.14rem;
				color: #666666;
				flex: none;
				text-align: center;
				padding: 0.1rem;

				&.active {
					background: #015AA4;
					border-radius: 0.16rem;
					font-weight: 600;
					color: #fff;
				}
			}

			.zbShows {
				position: absolute;
				top: 0.5rem;
				left: 0;
				width: 100%;
				background: #fff;
				z-index: 998;
				color: #232323;

				.zbShowdiv {
					display: flex;
					justify-content: left;
					align-items: center;
					padding: 0.15rem 0;

					div {
						color: #232323;
						padding: 0 0.1rem;
						font-size: 0.12rem;

						&:first-child {
							color: #969696;
							border-right: 0.01rem solid #969696;
						}
					}

					.active {
						color: rgba(255, 211, 14, 1);
					}
				}
			}
		}

		#Zline,
		#Zline1 {
			width: 100%;
			height: 4.5rem;
		}
	}
</style>