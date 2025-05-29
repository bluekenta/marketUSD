<template>
	<!-- 新股申购 -->
	<div class="page newStock">
		<top-back :title="$t('newStock').j4"></top-back>
		<div class="record" @click="$toPage('/home/newStockRecord')">
			<svg t="1745631762959" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4569" width="28" height="28">
				<path d="M731.99104 136.86272v49.76128a97.1776 97.1776 0 0 1 71.82848 93.61408v531.56864c-0.11776 53.64224-43.63776 97.06496-97.28512 97.06496H317.40928c-53.64224 0-97.16224-43.42272-97.28-97.06496V280.23808c0-44.73344 30.54592-82.40128 71.82336-93.61408v-49.76128C222.3616 149.16608 171.60192 209.57696 171.46368 280.23808v531.56864c0 80.3072 65.4848 145.62816 145.9456 145.62816h389.17632c80.4864 0 145.77664-65.152 145.95584-145.62816V280.23808c-0.18944-70.66112-50.95936-131.05664-120.5504-143.37536zM365.92128 244.83328c28.80512 0 52.17792-22.26688 52.17792-49.7152v-78.848c0-27.44832-23.36768-49.71008-52.17792-49.71008-28.86656 0-52.23424 22.21056-52.23424 49.71008v78.84288c0.00512 27.45344 23.41888 49.72032 52.23424 49.72032z m294.30272 0c28.81536 0 52.18304-22.26688 52.18304-49.7152v-78.848c0-27.44832-23.36768-49.71008-52.18304-49.71008-28.86656 0-52.224 22.21056-52.224 49.71008v78.84288c0 27.45344 23.36256 49.72032 52.224 49.72032zM440.15104 183.1168h143.69792V134.5536H440.15104v48.5632z m299.22816 237.89568a29.1328 29.1328 0 0 1-29.12256 29.12768H313.74336a29.12768 29.12768 0 0 1-0.03072-58.25024h396.49792a29.1328 29.1328 0 0 1 29.16864 29.12256z m0 171.0848a29.12256 29.12256 0 0 1-29.12256 29.12768H313.74336a29.12256 29.12256 0 0 1-29.13792-29.12256 29.12256 29.12256 0 0 1 29.1072-29.14304h396.49792a29.14304 29.14304 0 0 1 29.16864 29.13792z m0 171.14624a29.12256 29.12256 0 0 1-29.12256 29.12256H313.74336a29.11744 29.11744 0 0 1-29.13792-29.11232 29.12256 29.12256 0 0 1 29.1072-29.14304h396.49792a29.14816 29.14816 0 0 1 29.16864 29.1328z" fill="#fff" p-id="4570"></path>
				</svg>
		</div>
		<!-- <div class="nav">
			<div class="item" :class="navIndex==item.type?'sel':''" v-for="(item, index) in navList" :key="index" @click="navIndex=item.type,changeNav(item.type)">{{item.name}}<span></span></div>
		</div> -->
		<div class="list" v-if="navIndex==0">
			<div class="item" v-for="(item, idx) in ksgList" :key="idx" @click="toDetail(item)">
				<div class="item-top">
					<div class="item-top-left">
						<div class="item-top-name">{{ item.name }}</div>
						<div class="item-top-foot">{{ item.code || '-' }}
							|<span>{{ $t("截止时间") }}:{{ $formatDate("DD-MM-YYYY", item.end * 1000) }}</span></div>
					</div>
					<div class="item-top-btn" v-if="item.isKsg">{{ $t("申购") }}</div>
				</div>
				<div class="item-middle">
					<div class="item-middle-info flex-start">
						{{ $t("newt").a9 }}<span>{{ $formatMoney(item.num) || "0" }}</span></div>
					<div class="item-middle-info">
						{{ $t("newt").a8 }}
						<span v-if="item.price">{{stockType=='usd'?'$ ':''}}{{ $formatMoney(item.price - item.bprice, 3) }}{{stockType=='Spain'?' €':''}}</span>
						<span v-else>0</span>
					</div>
					<div class="item-middle-info flex-end">
						{{ $t("newt").a7 }}<span>{{stockType=='usd'?'$ ':''}}{{ $formatMoney(parseFloat(item.price),3) || "0" }}{{stockType=='Spain'?' €':''}}</span></div>
					<div class="item-middle-info flex-start">
						{{ $t("newt").a10 }}<span>{{stockType=='usd'?'$ ':''}}{{ $formatMoney(parseFloat(item.bprice),3) || "0" }}{{stockType=='Spain'?' €':''}}</span></div>
					<div class="item-middle-info">
						{{ $t("newt").a4 }}<span>{{ ((item.price - item.bprice) / item.bprice) * 100 == -100 ? "-" : ( ((item.price - item.bprice) / item.bprice) * 100 ).toFixed(2) }}%</span>
					</div>
				</div>
			</div>
		</div>
		<!--点击按钮加载效果组件 -->
		<loading ref="loading" />
	</div>
</template>

<script>
	export default {
		name: "newStock",
		data() {
			return {
				loading: true,
				isShow: false,
				isLoading: false,
				currmentIndex: 0,
				navList: [{
						name: this.$t("newStock").j1,
						type: 0
					},
					{
						name: this.$t("newStock").j2,
						type: 1
					},
					{
						name: this.$t("newStock").j3,
						type: 2
					},
				],
				navIndex: 0,
				ksgList: [],
				userInfo: {},
				quantity: "",
				stockType: ''
			};
		},
		mounted() {
			this.stockType = window.localStorage.getItem('stockType')||'usd';
			this.getList();
		},
		methods: {
			// 下拉刷新
			onRefresh() {
				this.isShow = false;
				this.getList();
			},
			changeNav(type) {
				this.getList();
			},
			// 获取列表
			getList() {
				this.$server.post("/trade/placinglist", {
					type: this.stockType,
					buy_type: 0
				}).then((res) => {
					this.isLoading = false; //下拉刷新状态
					this.loading = false;
					if (res.status == 1) {
						let now = new Date().getTime();
						let arr = [];
						res.data.forEach((item) => {
							// 可申购
							if (item.start * 1000 < now && now < item.end * 1000) {
								item.time = Math.floor(
									(item.end * 1000 - now) / 1000 / 60 / 60 / 24
								);
								item.isKsg = true; //是否可申购
							} else if (now < item.start * 1000) {
								item.time = Math.floor(
									(item.start * 1000 - now) / 1000 / 60 / 60 / 24
								);
								// 待申购
								item.isKsg = false;
							}

							arr.push(item);
						});
						this.ksgList = [...new Set(arr)];

						if (!this.ksgList.length) {
							this.isShow = true;
						}
					}
				});
			},
			toDetail(item) {
				this.$storage.save("itemTemp", item);
				this.$toPage(`/home/newStockBuy`);
			},
		},
	};
</script>

<style scoped lang="less">
	.newStock {
		.record{
			position: fixed;top: .14rem;right: .15rem;z-index: 999;
			
		}
		.nav {
			height: .47rem;
			display: flex;
			align-items: flex-end;
		
			.item {
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
			}
		
			.sel {
				color: rgba(17, 17, 17, 1);
		
				span {
					background: #015AA4;
				}
			}
		}
		
		.item {
			padding: .15rem;
			border-bottom: 0.01rem solid rgba(247, 247, 247, 1);
		
			.item-top {
				display: flex;
				align-items: center;
				justify-content: space-between;
		
				.item-top-btn {
					height: 0.25rem;
					background: #FFD30E;
					border-radius: 0.04rem;
					padding: 0 .15rem;
					font-weight: 400;
					font-size: 0.12rem;
					color: #111111;
					display: flex;
					align-items: center;
					justify-content: center;
				}
		
				.item-top-left {
					display: flex;
					flex-direction: column;
					justify-content: center;
				}
		
				.item-top-name {
					font-weight: 500;
					font-size: 0.14rem;
					color: #111111;
					line-height: 0.2rem;
				}
		
				.item-top-foot {
					font-weight: 400;
					font-size: 0.12rem;
					color: #C7C7C7;
					line-height: 0.17rem;
					display: flex;
					align-items: center;
		
					span {
						font-weight: 400;
						font-size: 0.12rem;
						color: #111111;
						margin-left: .1rem;
					}
				}
			}
		
			.item-middle {
				display: flex;
				flex-wrap: wrap;
		
				.item-middle-info {
					width: calc(100% / 3);
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					font-weight: 400;
					font-size: 0.1rem;
					color: #9A9A9A;
					line-height: 0.14rem;
					margin-top: .13rem;
		
					span {
						font-weight: 400;
						font-size: 0.12rem;
						color: #111111;
						line-height: 0.17rem;
						margin-top: .05rem;
					}
				}
		
				.flex-start {
					align-items: flex-start;
				}
		
				.flex-end {
					align-items: flex-end;
				}
			}
		}
		
	}

	
</style>