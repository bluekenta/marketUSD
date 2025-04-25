<template>
	<div class="cot">
		<van-skeleton title :row="15" :loading="loading">
			<div class="t">
				<!-- {{ $t("new").b43 }} -->
				{{ $t("newt").t47 }}
				<div class="time" v-if="list.length">
					{{ $t("newt").t48 }} {{ list[0].time }}
				</div>
			</div>
			<div class="border">
				<div class="change">
					<!-- <div class="flex flex-b">
						{{ $t(cunrretnName) }}
						<div class="icon xl animate__animated animate__fadeIn" @click="show = !show"></div>
					</div> -->
					 <!-- v-if="show" -->
					<div class="nav-boxs flex">
						<div class="nav-items" v-for="(item, idx) in navList" :key="idx"
							:class="{ active: currmentIndex === item.type }" @click="changeNav(item.type, idx)">
							{{ $t(item.name) }}
						</div>
					</div>
				</div>

				<!-- 显示第一个 -->
				<div class="num" v-if="false">
					<div class="flex">
						<div class="t" :class="currentItem.gain > 0 ? 'red' : 'green'">
							{{ currentItem.gain <= 0 ? "" : "+"}}{{ $formatMoney(currentItem.gainValue, 2) }} ({{  currentItem.gain <= 0 ? "" : "+"}}{{ currentItem.gain }}%)
						</div>
						<div class="t1" :class="currentItem.gain > 0 ? 'red' : 'green'">
							{{ $formatMoney(currentItem.close, 2) }}
						</div>
						<div class="icon animate__animated animate__fadeIn"
							:class="currentItem.gain < 0 ? 'down1' : 'up1'"></div>
					</div>
				</div>
			</div>

			<div>
				<div class="line-box">
					<div>
						<!-- 显示指数k线详情 -->
						<k-line :currentItem="currentItem" :currentId="currentId"></k-line>
						<!-- 只有部分有这个数据 -->
						<div class="flex flex-b last" v-if="lastInfo">
							<div class="">
								{{ $t("newt").t49 }}
								<span v-if="lastInfo.individuals_net_vol_valued"
									:class="{ die: lastInfo.individuals_net_vol_valued < 0 }">
									{{(lastInfo.individuals_net_vol_valued / 100000000).toFixed( 0  ) }}{{ $t("newt").t50 }}
								</span>
								<span v-else>0</span>
							</div>
							<div class="">
								{{ $t("newt").t51 }}
								<span v-if="lastInfo.total_institutions_net_vol_valued" :calss="{die: lastInfo.total_institutions_net_vol_valued < 0, }">
									{{ ( lastInfo.total_institutions_net_vol_valued / 100000000).toFixed(0)}}{{ $t("newt").t50 }}
								</span>
								<span v-else>0</span>
							</div>
							<div class="">
								{{ $t("newt").t52 }}
								<span v-if="lastInfo.total_foreigners_net_vol_valued"
									:class="{ die: lastInfo.total_foreigners_net_vol_valued < 0 }">{{(lastInfo.total_foreigners_net_vol_valued / 100000000).toFixed(0)}}{{ $t("newt").t50 }}
								</span>
								<span v-else>0</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div v-if="false">
				<!-- 指数 -->
				<div class="nums flex flex-b">
					<div class="nums-item" :class="{ center: i == 1 }" v-for="(item, i) in list" :key="i"
						@click="changeId(item)">
						<div class="name" @click.stop="
                $toDetail(`/market/stockDetailzs?symbol=${item.stock_id}`, item)
              ">
							{{ item.ko_name }}
						</div>
						<div class="t flex flex-c" :class="{ die: item.gain < 0 }">
							{{ $formatMoney(item.close, 2) }}
							<div class="icon animate__animated animate__fadeIn"
								:class="item.gain < 0 ? 'down1' : 'up1'"></div>
						</div>
						<div class="t1" :class="{ die: item.gain < 0 }">
							{{ item.gain <= 0 ? "" : "+"
              }}{{ $formatMoney(item.gainValue, 2) }} ({{
                item.gain <= 0 ? "" : "+"
              }}{{ item.gain }}%)
						</div>
					</div>
				</div>
			</div>
		</van-skeleton>
		<loading ref="loading" />
	</div>
</template>

<script>
	import kLine from "./kLine.vue";
	export default {
		name: "index-line",
		props: {},
		data() {
			return {
				loading: true,
				show: false,
				currentId: "",
				cunrretnName: "国内的",
				navList: [{
						name: "国内的",
						type: "gngs"
					},
					{
						name: "美国",
						type: "meiguo"
					},
					{
						name: "加密货币",
						type: "szhb"
					},
				],
				currmentIndex: "gngs",
				list: [],
				code: "",
				lastInfo: {},
				currentItem: {},
				timer: null,
			};
		},
		components: {
			kLine
		},
		created() {
			this.getInfo();
			this.timer = setInterval(() => {
				this.getInfo();
			}, 60 * 1000);
		},
		computed: {},
		mounted() {},
		beforeDestroy() {
			clearInterval(this.timer);
		},
		methods: {
			changeId(item) {
				this.currentItem = item;
				this.currentId = item.stock_id;
				this.getLast(item.code);
				// setTimeout(() => {
				//   this.$sharesDetails2(item);
				// }, 2000);
			},
			changeNav(type, index) {
				this.currmentIndex = type;
				this.cunrretnName = this.navList[index].name;
				this.show = false;
				this.$refs.loading.open(); //开启加载
				this.getInfo();
			},
			getInfo() {
				this.$server
					.post("/parameter/gszk", {
						type: this.currmentIndex
					})
					.then((res) => {
						this.$refs.loading && this.$refs.loading.close(); //关闭加载
						this.loading = false;
						if (res.status == 1) {
							let arr = [];
							res.data.forEach((item) => {
								// 美国的type 下面有一条数据没有details
								arr.push({
									ko_name: item.details ?
										item.details.ko_name :
										item.code.toLocaleUpperCase(),
									// id: item.details ? item.details.id : item.stock_id,
									// close: item.close,
									// code: item.code,
									// time: this.formatDate('YYYY.MM.DD hh:mm:ss', new Date(item.dt).getTime()),
									time: this.$formatDate(
										"DD.MM.YYYY hh:mm:ss",
										new Date().getTime()
									),
									gainValue: item.close - item.prev_close,
									gain: (
										((item.close - item.prev_close) / item.prev_close) *
										100
									).toFixed(2),
									...item,
								});
							});
							this.list = arr;
							this.currentItem = this.list[0];
							this.currentId = this.list[0].stock_id; //默认列表第一个
							this.code = this.list[0].code;

							this.getLast(this.code);
							this.changeId(this.currentItem); //触发当前获取
						}
					});
			},
			getLast(code) {
				this.$server.post("/parameter/gszk_last", {
					code
				}).then((res) => {
					if (res.status == 1) {
						this.lastInfo = res.data;
					}
				});
			},
		},
	};
</script>

<style scoped lang="less">
	.cot {
		margin: 0 0.12rem;
		padding: 0.12rem;
		background: #FFFFFF;
		border-radius: 0.13rem;
		.t {
			font-family: PingFangSC, PingFang SC;
			font-weight: 400;
			font-size: 0.15rem;
			color: #000000;
		}

		.time {
			font-family: PingFangSC, PingFang SC;
			font-weight: 400;
			font-size: 0.13rem;
			color: #999999;
			margin: 0.05rem 0;
		}

		.border {
			.num {
				.t {
					font-weight: 600;
					font-size: 0.12rem;
				}

				.t1 {
					font-weight: 600;
					font-size: 0.18rem;
					margin: 0 0.05rem;
				}
			}
		}

		.change {
			padding: 0.05rem;
			position: relative;
			margin-right: 0.05rem;

			.icon {
				margin-left: 0.05rem;
			}

			.nav-boxs {
				// position: absolute;
				// width: 100%;
				// top: 00rem;
				// left: 0;
				z-index: 999;
				padding: 0.05rem 0;

				.nav-items {
					margin-right: .1rem;
					padding: 0.02rem 0.1rem;
					border-radius: 0.06rem;
					border: 0.01rem solid #E5E5E5;
					font-family: PingFangSC, PingFang SC;
					font-weight: 400;
					font-size: 0.14rem;
					color: #999999;
				}
				.active{
					border: 0.01rem solid #e10414;
					color: #e10414;
				}
			}
		}

		.nums {
			text-align: center;
			padding: 0.1rem 0;
			border-bottom: 0.01rem solid #f5f5f5;

			.nums-item {
				width: 32%;

				&.center {
					border-left: 0.02rem solid #bbc5c1;
					border-right: 0.02rem solid #bbc5c1;
				}

				.name {
					font-weight: 600;
					font-size: 0.12rem;
					margin-bottom: 0.05rem;
				}

				.icon {
					margin-left: 0.05rem;
				}

				.t {
					font-weight: 500;
					font-size: 0.16rem;
					color: #c5585e;

					&.die {
						color: #4f8672;
					}
				}

				.t1 {
					font-size: 0.12rem;
					color: #c5585e;

					&.die {
						color: #4f8672;
					}
				}
			}
		}

		.line-box {
			.last {
				padding: 0.1rem 0;

				div {
					font-weight: 500;
					font-size: 0.12rem;
					color: #1e1e1e;
				}

				span {
					font-weight: 600;
					margin-left: 0.05rem;
					color: #DA333D;
				}
				.die {
					color:#00B4D5;
				}
			}
		}
	}

</style>
