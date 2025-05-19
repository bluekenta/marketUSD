<template>
	<div class="page ">
		<top-back :title="$t('mine').j6"></top-back>
		<div class="cot">
      <div class="tab flex">
        <div class="tab-item flex flex-c" v-for="(item, index) in top" :key="index"
             :class="{ active: stockType == item.type, center: item.type == 'eur', }"
             @click="changeStock(item.type)">
          {{ item.name }}<span></span>
        </div>
      </div>
			<div class="tab flex">
				<div class="tab-item flex flex-c" v-for="(item, index) in navList" :key="index"
					:class="{ active: currmentIndex == item.type, center: item.type == 3, }"
					@click="changeNav(item.type)">
					{{ item.name }}<span></span>
				</div>
			</div>

			<div class="list">
				<no-data v-if="!logList.length"></no-data>
				<template v-if="currmentIndex == 1">
					<div class="list-item" v-for="(item, index) in logList" :key="index">
						<div class="list-item-top">
							{{ item.title? $t(item.title) : item.detailed?$t(item.detailed):$t(item.name) }}<span>{{stockType=='usd'?'$ ':''}}{{ $formatMoney(item.money) }}{{stockType=='Spain'?' €':''}}</span>
						</div>
						<div class="list-item-foot">
							{{ item.order_number }}<span>{{ $formatDate("DD-MM-YYYY hh:mm:ss", item.create_time * 1000) }}</span>
						</div>
					</div>
				</template>
				<!-- 充值&提现显示 -->
				<template v-else>
					<div class="list-item" v-for="(item, index) in logList" :key="index">
						<div class="list-item-top">
							{{currmentIndex==2?$t("transactionRecord").tab2:$t("transactionRecord").tab3}}<span>{{stockType=='usd'?'$ ':''}}{{ $formatMoney(item.money) }}{{stockType=='Spain'?' €':''}}</span>
						</div>
						<div class="list-item-foot">
							{{ item.order_number }}<span>{{ $formatDate("DD-MM-YYYY hh:mm:ss", item.create_time * 1000) }}</span>
						</div>
					</div>
				</template>
			</div>
		</div>
		<loading ref="loading" />
	</div>
</template>

<script>
	export default {
		name: "fundRecord",
		props: {},
		data() {
			return {
				num: "",
				isLoading: false,
				currmentIndex: 1,
				top: [
          { name: 'EUR', type: 'Spain' },
					{ name: 'USD', type: 'usd' },
					//{ name: 'USDT', type: 'usdt' },
				],
				navList: [{
						name: this.$t("transactionRecord").tab1,
						type: 1
					},
					{
						name: this.$t("transactionRecord").tab2,
						type: 2
					},
					{
						name: this.$t("transactionRecord").tab3,
						type: 3
					},
				],
				logList: [
					// {
					// 	title:'title',
					// 	detailed:'detailed',
					// 	money:100,
					// 	create_time:113131,
					// 	stat:'stat',
					// 	order_number:12132323,
					// },
					// {
					// 	title:'title',
					// 	detailed:'detailed',
					// 	money:100,
					// 	create_time:113131,
					// 	stat:'stat',
					// 	order_number:12132323,
					// }
				],
				templateData: [],
        stockType: 'Spain'
			};
		},
		components: {},
		created() {},
		mounted() {
			this.changeNav(1);
		},
		methods: {
			changeStock(type) {
				this.stockType = type
				this.changeNav(1);
			},
			searchNum() {
				if (!this.num) {
					this.logList = this.templateData;
					return;
				}
				this.logList = this.templateData.filter(
					(item) => item.order_number == this.num
				);
			},
			onRefresh() {
				this.changeNav(1);
			},
			changeNav(index) {
				this.currmentIndex = index;
				this.logList = [];
				this.num = "";
				switch (index) {
					case 1:
						this.getRecord();
						break;
					case 2:
						this.getRecharge();
						break;
					case 3:
						this.getWithdrawal();
						break;
					default:
						break;
				}
			},
			getRecord() {
				this.$refs.loading.open(); //开启加载
				this.$server
					.post("/user/capitalloglist", {
						type: this.stockType,
					})
					.then((res) => {
						this.$refs.loading.close();
						this.isLoading = false; //下拉刷新状态

						if (res.status == 1) {
							for (let i = 0; i < res.data.length; i++) {
								var row = res.data[i];
								const chineseToEnglish = {
									购买股票: this.$t("购买股票"),
									返还资金: this.$t("返还资金"),
									股票代码: this.$t("股票代码"),
									股票名称: this.$t("股票名称"),
									订单编号: this.$t("订单编号"),
									撤單: this.$t("撤單"),
									返回本金和手續費: this.$t("返回本金和手續費"),
									購買股票: this.$t("購買股票"),
									買手續費: this.$t("買手續費"),
									平仓: this.$t("平仓"),
									卖手续费: this.$t("卖手续费"),
									訂單編號: this.$t("訂單編號"),
									股票名稱: this.$t("股票名稱"),
									股票代碼: this.$t("股票代碼"),
									跟單返利: this.$t("跟單返利"),
									發單人: this.$t("發單人"),
									产品名稱: this.$t("产品名稱"),
									訂單編號: this.$t("訂單編號"),
									跟單: this.$t("跟單"),
									借券返利: this.$t("借券返利"),
									借券返還: this.$t("借券返還"),
									跟单返利: this.$t("跟单返利"),
								};
                if(row.detailed){
                  row.detailed = row.detailed.replace("DHZG", "SUNTON");
                }
								row.title = '';
								if (row.detailed) {
									const text = row.detailed.replace(/！[\s\S]*?股票名称/, "");
									const regex = new RegExp(
										Object.keys(chineseToEnglish).join("|"),
										"g"
									);
									if (text) {
										const result = text.replace(
											regex,
											(matched) => chineseToEnglish[matched]
										);
										row.detailed = result;
									}
								}
                if(row.detailed){
                  var arr = row.detailed.split(',');
                  for (let j in arr) {
                    var jrow = arr[j];
                    if (jrow.indexOf('产品名称') > -1) {
                      row.title = jrow.split('产品名称')[1];
                    } else if (jrow.indexOf('產品名稱') > -1) {
                      row.title = jrow.split('產品名稱')[1];
                    } else if (jrow.indexOf('股票名称') > -1) {
                      row.title = jrow.split('股票名称')[1];
                    } else if (jrow.indexOf('股票名稱') > -1) {
                      row.title = jrow.split('股票名稱')[1];
                    }
                    if (jrow.indexOf('股票代码') > -1) {
                      row.code = jrow.split('股票代码')[1];
                    }
                    if (jrow.indexOf('跟單') > -1) {
                      row.name = '跟單';
                    } else if (jrow.indexOf('跟单') > -1) {
                      row.name = '跟單';
                    }
                    if (jrow.indexOf('发单人') > -1) {
                      row.name = '跟單';

                    }
                  }
                }
							}
							this.logList = res.data;
							this.templateData = res.data;

						}
					});
			},
			getRecharge() {
				this.$refs.loading.open(); //开启加载

				this.$server
					.post("/user/rechargelist", {
						type: this.stockType,
					})
					.then((res) => {
						this.$refs.loading.close();
						this.logList = res.data;
						this.templateData = res.data;
					});
			},
			getWithdrawal() {
				this.$refs.loading.open(); //开启加载

				this.$server
					.post("/user/withdrawallist", {
						type: this.stockType,
					})
					.then((res) => {
						this.$refs.loading.close();

						this.logList = res.data;
						this.templateData = res.data;

					});
			},
			copy(text) {
				let textarea = document.createElement("textarea");
				textarea.value = text;
				textarea.readOnly = "readOnly";
				document.body.appendChild(textarea);
				textarea.select(); // 选中文本内容
				textarea.setSelectionRange(0, text.length); // 设置选定区的开始和结束点
				this.$toast(this.$t("capitalChannel").tit3);
				var result = document.execCommand("copy"); //将当前选中区复制到剪贴板
				textarea.remove();
			},
		},
		computed: {
			formatText() {
				return (index, value) => {
					let str = "";
					if (!value) {
						return;
					}
					if (value.name.indexOf("兌換") > -1) {
						return this.$t(value.detailed);
					}
					if (value.name.indexOf("信用借款") > -1) {
						return "";
					}
					value.detailed = value.detailed.replace("！", " ");
					value.detailed = value.detailed.replace(",", "");
					value.detailed = value.detailed.replace("卖手续费", "");
					value.detailed = value.detailed.replace("股票代码", "");
					value.detailed = value.detailed.replace("股票名称", "");
					value.detailed = value.detailed.replace("订单编号", "");
					value.detailed = value.detailed.replace("平仓", "");
					value.detailed = value.detailed.replace("发单人", this.$t("发单人"));
					value.detailed = value.detailed.replace("产品名称", this.$t("产品名称"));
					if (index) {
						let start = value.detailed.indexOf("號");
						str = value.detailed.slice(start + 1);
					} else {
						let pIdx = value.detailed.indexOf(" ");
						let name = value.detailed.slice(0, pIdx);
						let mIdx = value.detailed.indexOf("碼");
						let gIdx = value.detailed.indexOf("名");
						let code = value.detailed.slice(mIdx + 1, gIdx - 2);
						str = `${this.$t(name)}`;
					}
					/* if(str.length>18){
						str = str.substring(str.length - 18)
					} */
					return str;
				};
			},
			formatText2() {
				return (index, value) => {
					if (value.name.indexOf("跟单返利") > -1 || value.name.indexOf("跟单") > -1) {
						return this.$t(value.name);
					} else if (value.name.indexOf("信用借款") > -1 || value.name.indexOf("兌換") > -1) {
						return this.$t(value.name);
					} else {
						let str = "";
						if (!value) {
							return;
						}
						if (index) {
							let start = value.detailed.indexOf("號");
							str = value.detailed.slice(start + 1);
						} else {
							let pIdx = value.detailed.indexOf(",");
							let name = value.detailed.slice(0, pIdx);
							let mIdx = value.detailed.indexOf("碼");
							let gIdx = value.detailed.indexOf("名");
							let code = value.detailed.slice(mIdx + 1, gIdx - 2);
							str = `${this.$t(name)}`;
						}
						return str;
					}
				};
			},
		},
	};
</script>

<style scoped lang="less">
	.page {
		.cot {
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

			.list {
				.list-item {
					border-bottom: .01rem solid rgba(247, 247, 247, 1);
					padding: .15rem;

					.list-item-top {
						display: flex;
						align-items: center;
						justify-content: space-between;
						font-weight: 500;
						font-size: 0.14rem;
						color: #111111;
						line-height: 0.2rem;

						span {
							font-weight: 500;
							font-size: 0.14rem;
							color: #111111;
							line-height: 0.2rem;
						}
					}

					.list-item-foot {
						font-weight: 400;
						font-size: 0.12rem;
						color: #9A9A9A;
						line-height: 0.16rem;
						margin-top: .05rem;
						display: flex;
						align-items: center;
						justify-content: space-between;

						span {
							font-size: 0.12rem;
							color: #9A9A9A;
						}
					}
				}
			}
		}
	}
</style>