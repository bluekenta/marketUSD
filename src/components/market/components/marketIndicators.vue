<template>
	<!-- 市场指标 -->
	<div class="cot">
		<div class="flex tab">
			<div class="tab-item" :class="{ active: type == item.type }" v-for="(item, i) in typeList" :key="i"
				@click="changeType(item.type)">
				{{ $t(item.name) }}
			</div>
		</div>
		<div class="flex flex-b titles">
			<div class="flex-1">{{ $t("newt").t57 }}</div>
			<div class="flex-1 t-c">
				{{ type == "jixiu" ? $t("newt").t75 : $t("newt").t58 }}
			</div>
			<div class="flex-1 t-r">{{ $t("newt").t59 }}</div>
		</div>

		<div class="list">
			<no-data v-if="!list.length"></no-data>

			<div class="list-item flex flex-b" v-for="(item, i) in list" :key="i" @click="
              $toDetail(`/market/stockDetailzs?symbol=${item.stock_id}`, item)
            ">
				<div class="flex-1 name">{{ item.code.toLocaleUpperCase() }}</div>
				<div class="price flex flex-c flex-1">
					{{ $formatMoney(item.close) }}
				</div>
				<div class="per flex-1 flex flex-e" :class="item.gain >= 0 ? 'red' : 'green'">
					<div class="icon animate__animated animate__fadeIn" :class="item.gain >= 0?'up1':'down1'" style="margin-right: 0.05rem;"></div>
					{{ item.gain }}%
				</div>
			</div>
		</div>
		<loading ref="loading" />
	</div>
</template>

<script>
	export default {
		name: "marketIndicators",
		data() {
			return {
				type: "jixiu",
				page: 0,
				typeList: [{
						name: "指数",
						type: "jixiu",
					},
					{
						name: "汇率",
						type: "huilv",
					},
					{
						name: "原料",
						type: "yuanliao",
					},
					{
						name: "数字货币",
						type: "szhb",
					},
				],
				list: [],
			};
		},
		created() {},
		mounted() {
			this.getInfo();
		},
		methods: {
			changeType(type) {
				this.type = type;
				this.list = [];
				this.getInfo();
			},
			getInfo() {
				this.$refs.loading.open(); //开启加载

				this.$server.post("/parameter/sczb", {
					type: this.type
				}).then((res) => {
					this.$refs.loading && this.$refs.loading.close();

					if (res.status == 1) {
						let data = Object.values(res.data);
						let arr = [];
						data.forEach((item) => {
							arr.push({
								ko_name: item.code.toLocaleUpperCase(),
								// time: this.$formatDate('YYYY.MM.DD hh:mm:ss', new Date(item.dt).getTime()),
								time: this.$getTimeData(item.dt),
								gainValue: item.close - item.prev_close,
								gain: (
									((item.close - item.prev_close) / item.prev_close) *
									100
								).toFixed(2),
								...item,
							});
						});

						this.list = [...arr];
					}
				});
			},
		},
	};
</script>

<style scoped lang="less">
	.cot{
		margin: 0 0.12rem;
		background: #FFFFFF;
		border-radius: 0.13rem;
	}
	.titles {
		padding: 0.1rem 0.1rem;
		div {
			font-family: PingFangSC, PingFang SC;
			font-weight: 400;
			font-size: 0.12rem;
			color: #999999;
			line-height: 0.17rem;
		}
	}

	.list {
		.list-item {
			padding: 0.12rem;
			// border-bottom: 0.02rem solid #ececec;
			border-bottom: 0.01rem solid #f5f5f5;
			.name {
				font-weight: bold;
				font-family: PingFangSC, PingFang SC;
				font-size: 0.15rem;
				color: #0C061C;
				margin-left: 0.05rem;
			}

			.code {
				font-weight: 500;
				font-size: 0.12rem;
				color: #464646;
				margin-left: 0.05rem;
			}

			.price {
				font-weight: bold;
				font-family: OPPOSans, OPPOSans;
				font-size: 0.14rem;
				.icon {
					margin-left: 0.05rem;
				}
			}

			.per {
				font-family: OPPOSans, OPPOSans;
				font-weight: normal;
				font-size: 0.14rem;
			}
		}
	}

	.tab {
		padding: 0.12rem;
		border-bottom: 0.01rem solid #E4EAF1;

		.tab-item {
			margin-right: 0.2rem;
			font-family: PingFangSC, PingFang SC;
			font-weight: 400;
			font-size: 0.15rem;
			color: #999999;
			text-align: center;
			text-align: center;
			padding: 0.05rem 0;

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
</style>