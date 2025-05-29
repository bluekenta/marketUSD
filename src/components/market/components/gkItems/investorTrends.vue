<template>
	<div>
		<div class="top">
			<div class="t">{{ $t("newt").a79 }}</div>
			<div class="flex flex-b">
				<div class="t1 flex-1 ">
					{{ dataList.industry }} {{ dataList.count }} {{ $t("newt").a80 }}
				</div>
				<div class="flex-2"></div>
			</div>
		</div>

		<!-- 新的显示 -->
		<div class="list flex flex-b">
			<div class="list-item">
				<div class="flex flex-b">
					<div class="flex tt">
						<div class="pm animate__animated animate__fadeIn">
							{{ dataList.marketcap_rank || "-" }}
						</div>
						{{ $t("newt").t78 }}
					</div>
					<div class="icon animate__animated animate__fadeIn" :class="dataList.marketcap < 0 ? 'down' : 'up'">
					</div>
				</div>
				<div class="flex flex-b pad10">
					<div class="t">{{ $t("newt").a82 }}</div>
					<div class="t-r red num-font" :class="{ die: dataList.marketcap < 0 }">
						{{ $formatMoney(dataList.marketcap) }}{{ $t("newt").t50 }}
					</div>
				</div>
				<div class="flex flex-b">
					<div class="t">{{ $t("newt").a83 }}</div>
					<div class="t-r red num-font" :class="{ die: dataList.marketcap_avg < 0 }">
						{{ $formatMoney(dataList.marketcap_avg) }} {{ $t("newt").t50 }}
					</div>
				</div>
			</div>

			<div class="list-item">
				<div class="flex flex-b">
					<div class="flex tt">
						<div class="pm">{{ dataList.net_income_growth_rank || "-" }}</div>
						{{ $t("newt").a84 }}
					</div>
					<div class="icon" :class="dataList.net_income_growth < 0 ? 'down' : 'up'"></div>
				</div>
				<div class="flex flex-b pad10">
					<div class="t">{{ $t("newt").a82 }}</div>
					<div class="t-r red num-font" :class="{ die: dataList.net_income_growth < 0 }">
						{{ dataList.net_income_growth < 0 ? "" : "+"
            }}{{ dataList.net_income_growth }}%
					</div>
				</div>
				<div class="flex flex-b">
					<div class="t">{{ $t("newt").a83 }}</div>
					<div class="t-r red num-font" :class="{ die: dataList.net_income_growth_avg < 0 }">
						{{ $formatMoney(dataList.net_income_growth_avg) }}%
					</div>
				</div>
			</div>

			<div class="list-item">
				<div class="flex flex-b">
					<div class="flex tt">
						<div class="pm">{{ dataList.debt_ratio_rank || "-" }}</div>
						{{ $t("newt").a85 }}
					</div>
					<div class="icon" :class="dataList.debt_ratio < 0 ? 'down' : 'up'"></div>
				</div>
				<div class="flex flex-b pad10">
					<div class="t">{{ $t("newt").a82 }}</div>
					<div class="t-r red num-font" :class="{ die: dataList.debt_ratio < 0 }">
						{{ dataList.debt_ratio < 0 ? "" : "+" }}{{ dataList.debt_ratio }}%
					</div>
				</div>
				<div class="flex flex-b">
					<div class="t">{{ $t("newt").a83 }}</div>
					<div class="t-r red num-font" :class="{ die: dataList.debt_ratio_avg < 0 }">
						{{ dataList.debt_ratio_avg < 0 ? "" : "+"
            }}{{ dataList.debt_ratio_avg }}%
					</div>
				</div>
			</div>

			<div class="list-item">
				<div class="flex flex-b">
					<div class="flex tt">
						<div class="pm">{{ dataList.per_rank || "-" }}</div>
						PER
					</div>
					<div class="icon" :class="dataList.per < 0 ? 'down' : 'up'"></div>
				</div>
				<div class="flex flex-b pad10">
					<div class="t">{{ $t("newt").a82 }}</div>
					<div class="t-r red num-font" :class="{ die: dataList.per < 0 }">
						{{ dataList.per < 0 ? "" : "+" }}{{ dataList.per
            }}{{ $t("newt").a86 }}
					</div>
				</div>
				<div class="flex flex-b">
					<div class="t">{{ $t("newt").a83 }}</div>
					<div class="t-r red num-font" :class="{ die: dataList.per_avg < 0 }">
						{{ dataList.per_avg < 0 ? "" : "+" }}{{ dataList.per_avg
            }}{{ $t("newt").a86 }}
					</div>
				</div>
			</div>

			<div class="list-item">
				<div class="flex flex-b">
					<div class="flex tt">
						<div class="pm">{{ dataList.pbr_rank || "-" }}</div>
						PBR
					</div>
					<div class="icon" :class="dataList.pbr < 0 ? 'down' : 'up'"></div>
				</div>
				<div class="flex flex-b pad10">
					<div class="t">{{ $t("newt").a82 }}</div>
					<div class="t-r red num-font" :class="{ die: dataList.pbr < 0 }">
						{{ dataList.pbr < 0 ? "" : "+" }}{{ dataList.pbr
            }}{{ $t("newt").a86 }}
					</div>
				</div>
				<div class="flex flex-b">
					<div class="t">{{ $t("newt").a83 }}</div>
					<div class="t-r red num-font" :class="{ die: dataList.pbr_avg < 0 }">
						{{ dataList.pbr_avg < 0 ? "" : "+" }}{{ dataList.pbr_avg
            }}{{ $t("newt").a86 }}
					</div>
				</div>
			</div>

			<div class="list-item">
				<div class="flex flex-b">
					<div class="flex tt">
						<div class="pm">{{ dataList.roe_rank || "-" }}</div>
						ROE
					</div>
					<div class="icon" :class="dataList.roe < 0 ? 'down' : 'up'"></div>
				</div>
				<div class="flex flex-b pad10">
					<div class="t">{{ $t("newt").a82 }}</div>
					<div class="t-r red num-font" :class="{ die: dataList.roe < 0 }">
						{{ dataList.roe < 0 ? "" : "+" }}{{ dataList.roe
            }}{{ $t("newt").a86 }}
					</div>
				</div>
				<div class="flex flex-b">
					<div class="t">{{ $t("newt").a83 }}</div>
					<div class="t-r red num-font" :class="{ die: dataList.roe_avg < 0 }">
						{{ dataList.roe_avg < 0 ? "" : "+" }}{{ dataList.roe_avg
            }}{{ $t("newt").a86 }}
					</div>
				</div>
			</div>
		</div>

		<!-- 弃用 -->
		<div class="" v-if="false">
			<div class="title flex flex-b">
				<div class="flex-1"></div>

				<div class="flex-1 t-c">{{ $t("newt").a81 }}</div>
				<div class="flex-1 t-c">{{ $t("newt").a82 }}</div>
				<div class="flex-1 t-r">{{ $t("newt").a83 }}</div>
			</div>

			<div class="item flex flex-b">
				<div class="flex-1">{{ $t("newt").t78 }}</div>
				<div class="flex-1 t-c red num-font" :class="{ die: dataList.marketcap < 0 }">
					{{ $formatMoney(dataList.marketcap) }}{{ $t("newt").t50 }}
				</div>
				<div class="flex-1 t-c red num-font" :class="{ die: dataList.marketcap_avg < 0 }">
					{{ $formatMoney(dataList.marketcap_avg) }} {{ $t("newt").t50 }}
				</div>
				<div class="flex-1 t-r">
					<span class="hbg">{{ dataList.marketcap_rank }}{{ $t("newt").a80 }}</span>
				</div>
			</div>

			<div class="item flex flex-b">
				<div class="flex-1">{{ $t("newt").a84 }}</div>
				<div class="flex-1 t-c red" :class="{ die: dataList.net_income_growth < 0 }">
					{{ dataList.net_income_growth < 0 ? "" : "+"
          }}{{ dataList.net_income_growth }}%
				</div>
				<div class="flex-1 t-c red" :class="{ die: dataList.net_income_growth_avg < 0 }">
					{{ dataList.net_income_growth_avg }}%
				</div>
				<div class="flex-1 t-r">
					<span class="hbg">{{ dataList.net_income_growth_rank }}{{ $t("newt").a80 }}</span>
				</div>
			</div>

			<div class="item flex flex-b">
				<div class="flex-1">{{ $t("newt").a85 }}</div>
				<div class="flex-1 t-c red" :class="{ die: dataList.debt_ratio < 0 }">
					{{ dataList.debt_ratio < 0 ? "" : "+" }}{{ dataList.debt_ratio }}%
				</div>
				<div class="flex-1 t-c red" :class="{ die: dataList.debt_ratio_avg < 0 }">
					{{ dataList.debt_ratio_avg < 0 ? "" : "+"
          }}{{ dataList.debt_ratio_avg }}%
				</div>
				<div class="flex-1 t-r ">
					<span class="hbg">{{ dataList.debt_ratio_rank }}{{ $t("newt").a80 }}</span>
				</div>
			</div>

			<div class="item flex flex-b">
				<div class="flex-1">PER</div>
				<div class="flex-1 t-c red" :class="{ die: dataList.per < 0 }">
					{{ dataList.per < 0 ? "" : "+" }}{{ dataList.per
          }}{{ $t("newt").a86 }}
				</div>
				<div class="flex-1 t-c red" :class="{ die: dataList.per_avg < 0 }">
					{{ dataList.per_avg < 0 ? "" : "+" }}{{ dataList.per_avg
          }}{{ $t("newt").a86 }}
				</div>
				<div class="flex-1 t-r ">
					<span class="hbg">{{ dataList.per_rank }}{{ $t("newt").a80 }}</span>
				</div>
			</div>

			<div class="item flex flex-b">
				<div class="flex-1">PBR</div>
				<div class="flex-1 t-c red" :class="{ die: dataList.pbr < 0 }">
					{{ dataList.pbr < 0 ? "" : "+" }}{{ dataList.pbr
          }}{{ $t("newt").a86 }}
				</div>
				<div class="flex-1 t-c red" :class="{ die: dataList.pbr_avg < 0 }">
					{{ dataList.pbr_avg < 0 ? "" : "+" }}{{ dataList.pbr_avg
          }}{{ $t("newt").a86 }}
				</div>
				<div class="flex-1 t-r ">
					<span class="hbg">{{ dataList.pbr_rank }}{{ $t("newt").a80 }}</span>
				</div>
			</div>

			<div class="item flex flex-b">
				<div class="flex-1">ROE</div>
				<div class="flex-1 t-c red" :class="{ die: dataList.roe < 0 }">
					{{ dataList.roe < 0 ? "" : "+" }}{{ dataList.roe }}%
				</div>
				<div class="flex-1 t-c red" :class="{ die: dataList.roe_avg < 0 }">
					{{ dataList.roe_avg < 0 ? "" : "+" }}{{ dataList.roe_avg }}%
				</div>
				<div class="flex-1 t-r ">
					<span class="hbg">{{ dataList.roe_rank }}{{ $t("newt").a80 }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "investorTrends",
		components: {},
		props: {
			symbol: {
				// type: String,
				default: "",
			},
		},
		data() {
			return {
				dataList: "",
			};
		},
		watch: {
			symbol: {
				handler(newValue, oldValue) {
					if (newValue && newValue !== oldValue) {
						this.getLast();
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
			getLast() {
				this.$server
					.post("/parameter/industry", {
						id: this.symbol
					})
					.then((res) => {
						if (res.status == 1) {
							this.dataList = res.data;
						}
					});
			},
		},
	};
</script>

<style scoped lang="less">
	.top {
		margin-top: 0.2rem;
		padding:0 .16rem;
		.t {
			font-size: 0.16rem;
			color: #353535;
			font-weight: bold;
		}

		.t1 {
			color: #E10414;
			background: #FFE8E9;
			padding: 0.05rem 0.1rem;
			border-radius: 0.06rem;
			margin: 0.15rem 0;
			text-align: center;
		}
	}

	.list {
		flex-wrap: wrap;
		border-bottom: .08rem solid #eee;
		padding:0 .16rem;
		.list-item {
			width: 49%;
			padding: 0.05rem;
			margin-bottom: 0.1rem;
			background: #ffffff;
			border: 0.01rem solid #ebebeb;
			border-radius: 0.08rem;

			.pm {
				height: 0.2rem;
				background-color: #f7c25c;
				border-radius: 0.04rem;
				line-height: 0.2rem;
				font-weight: 600;
				font-size: 0.12rem;
				color: #ffffff;
				text-align: center;
				margin-right: 0.05rem;
				padding: 0 0.05rem;
			}

			.tt {
				font-size: 0.12rem;
				color: #000000;
			}

			.pad10 {
				padding: 0.1rem 0;
			}

			.t {
				font-size: 0.12rem;
				color: #707070;
			}

			.t1 {
				font-weight: 500;
				font-size: 0.12rem;
			}

			.red {
				color: #e73e59;

				&.die {
					color: #3aab59;
				}
			}
		}
	}

	.title {
		// background: #f0f2f5;
		padding: 20px;

		div {
			font-size: 24px;
			color: #9b9ba3;
		}
	}

	.item {
		padding: 20px;
		
		div {
			font-size: 24px;
			font-weight: bold;
		}

		.hbg {
			display: inline-block;
			background: #f4f5f7;
			border-radius: 8px;
			padding: 10px;
			min-width: 100px;
			text-align: center;
			font-size: 24px;
		}

		.red {
			color: #f72121;

			&.die {
				color: #3aab59;
			}
		}
	}
</style>