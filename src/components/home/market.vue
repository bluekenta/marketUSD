<template>
	<div class="page ">
		<top-back :title="$t('home').j2"></top-back>
		<div class="top">
			<div class="top-left">
				<div class="top-left-btn" v-for="(item, index) in select" :key="index"
					:class="selectIndex==item.type?'top-left-on':''" @click="changePai(item.type)">{{item.name}}</div>
			</div>
			<img class="top-img" src="../../assets/skin/home/pai.png" />
		</div>
		<div class="nav">
			<div class="top-box">
				<span class="top-item" :class="topIndex==item.type?'top-on':''" v-for="(item, index) in top"
					:key="index" @click="changeTop(item.type)">{{item.name}}</span>
			</div>
		</div>
		<template v-if="topIndex==0">
			<div class="list">
				<div class="list-item " v-for="(item, idx) in list" :key="idx"
					@click="$toDetail(`/market/stockDetail?symbol=${item.symbol}`, item)">
					<div class="name">{{ item.name }}<span>{{ item.symbol }}</span></div>
					<div class="price">
            {{stockType=='usd'?'$ ':''}}{{ $formatMoney(item.price) || 0 }}{{stockType=='Spain'?' €':''}}<span>{{stockType=='usd'?'$ ':''}}{{ $formatMoney(item.gainValue) || 0 }}{{stockType=='Spain'?' €':''}}</span></div>
					<div class="per">
						<div class="per-info" :class="item.gainValue>0?'green':'red'">{{ item.gain.toFixed(2) }}%</div>
					</div>
				</div>
			</div>
		</template>
		<template v-if="topIndex==1">
			<div class="list">
				<div class="list-item " v-for="(item, idx) in zhiShulist" :key="idx"
					@click="$toDetail(`/market/stockDetail?symbol=${item.symbol}`, item)">
					<div class="name">{{ item.name }}<span>{{ item.symbol }}</span></div>
					<div class="price">
            {{stockType=='usd'?'$ ':''}}{{ $formatMoney(item.price) || 0 }}{{stockType=='Spain'?' €':''}}<span>{{stockType=='usd'?'$ ':''}}{{ $formatMoney(item.gainValue) || 0 }}{{stockType=='Spain'?' €':''}}</span></div>
					<div class="per">
						<div class="per-info" :class="item.gainValue>0?'green':'red'">{{ item.gain.toFixed(2) }}%</div>
					</div>
				</div>
			</div>
			
		</template>
		<loading ref="loading" />
	</div>
</template>

<script>
	export default {
		name: "market",
		data() {
			return {
				loading: true,
				isLoading: false,
				select: [{
						name: this.$t('home').j10,
						type: 0
					},
					{
						name: this.$t('指数'),
						type: 1
					},
				],
				selectIndex: 0,
				top: [{
						name: this.$t('market').j2,
						type: 0
					},
					{
						name: this.$t('market').j4,
						type: 1
					},
				],
				topIndex: 0,
				list: [],
				zhiShulist: [],
				stockType: ''
			};
		},
		computed: {},
		created() {},
		mounted() {
			this.stockType = window.localStorage.getItem('stockType') || 'usd';
			this.getInfo();
		},
		methods: {
			changePai(type) {
				this.selectIndex = type
				if (this.topIndex == 0) {
					this.getInfo();
				}
				if (this.topIndex == 1) {
					this.getZhiShu()
				}
			},
			changeTop(type) {
				this.topIndex = type
				if (this.topIndex == 0) {
					this.getInfo();
				}
				if (this.topIndex == 1) {
					this.getZhiShu()
				}
			},
			getInfo() {
				this.$refs.loading.open(); //开启加载
				this.$server.post("/parameter/top", {
					type: this.stockType
				}).then((res) => {
					this.$emit("upData");

					this.$refs.loading && this.$refs.loading.close();
					this.loading = false;
					if (this.selectIndex == 0) {
						this.list = []
						let list = res.data
						let length = list.length
						let a
						for (a = 0; a < length; a++) {
							if (list[a].gainValue > 0) {
								this.list.push(list[a])
							}
						}
						this.list.sort(function(a, b) {
							return b.gain - a.gain;
						});
					}
					if (this.selectIndex == 1) {
						this.list = []
						let list = res.data
						let length = list.length
						let a
						for (a = 0; a < length; a++) {
							if (list[a].gainValue < 0) {
								this.list.push(list[a])
							}
						}
						this.list.sort(function(a, b) {
							return a.gain - b.gain;
						});
					}
				});
			},
			getZhiShu() {
				this.$server.post("/parameter/zhishu", {
					type: this.stockType
				}).then((res) => {
					this.loading = false;
					this.isLoading = false;
					if (res && res.data) {
						if (this.selectIndex == 0) {
							this.zhiShulist = []
							let list = res.data
							let length = list.length
							let a
							for (a = 0; a < length; a++) {
								if (list[a].gainValue > 0) {
									this.zhiShulist.push(list[a])
								}
							}
							this.zhiShulist.sort(function(a, b) {
								return b.gain - a.gain;
							});
						}
						if (this.selectIndex == 1) {
							this.zhiShulist = []
							let list = res.data
							let length = list.length
							let a
							for (a = 0; a < length; a++) {
								if (list[a].gainValue < 0) {
									this.zhiShulist.push(list[a])
								}
							}
							this.zhiShulist.sort(function(a, b) {
								return a.gain - b.gain;
							});
						}
					}
				});
			},
		},
	};
</script>

<style scoped lang="less">
	.page {
		background: #015AA4;
	}

	.top {
		height: 0.85rem;
		background: #015AA4;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		padding: 0 .14rem;

		.top-img {
			width: 0.91rem;
			height: .85rem;
		}

		.top-left {
			display: flex;
			align-items: flex-end;

			.top-left-btn {
				height: 0.3rem;
				background: rgba(255, 255, 255, 0.4);
				border-radius: 0.06rem;
				font-weight: 600;
				font-size: 0.12rem;
				color: #111111;
				padding: 0 .15rem;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-right: .17rem;
			}

			.top-left-on {
				background: rgba(17, 17, 17, 1);
				color: rgba(255, 255, 255, 1);
			}
		}
	}

	.nav {
		width: 100%;
		height: .58rem;
		background: #015AA4;

		.top-box {
			width: 100%;
			height: .58rem;
			display: flex;
			align-items: center;
			overflow-x: scroll;
			scrollbar-width: none;
			scrollbar-color: transparent transparent;
		}

		.top-item {
			font-weight: 500;
			font-size: 0.13rem;
			color: rgba(255, 255, 255, .5);
			padding: 0 .15rem;
			display: flex;
			align-items: center;
			justify-content: center;
			white-space: nowrap;
		}

		.top-on {
			font-weight: 500;
			font-size: 0.13rem;
			color: #fff;
		}
	}

	.list{
		background: #fff;padding: .1rem 0;
		min-height: calc(100vh - 2rem);
		
		.list-item {
			margin-top: .15rem;
			padding: 0 .14rem;
			display: flex;
			align-items: center;
		
			.name {
				width: calc(100% / 3);
				display: flex;
				flex-direction: column;
				justify-content: center;
				font-weight: 500;
				font-size: 0.14rem;
				color: #111111;
				line-height: 0.2rem;
		
				span {
					font-weight: 400;
					font-size: 0.12rem;
					color: #C7C7C7;
					line-height: 0.17rem;
					margin-top: .04rem;
				}
			}
		
			.price {
				width: calc(100% / 3);
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				font-weight: 500;
				font-size: 0.12rem;
				color: #111111;
				line-height: 0.17rem;
		
				span {
					font-weight: 400;
					font-size: 0.13rem;
					color: #A4A4A3;
					line-height: 0.18rem;
					margin-top: 0.02rem;
				}
			}
		
			.per {
				width: calc(100% / 3);
				display: flex;
				align-items: center;
				justify-content: flex-end;
		
				.per-info {
					height: 0.31rem;
					border-radius: 0.04rem;
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 0 .14rem;
					font-weight: 400;
					font-size: 0.13rem;
					color: #FFFFFF;
				}
		
				.green {
					background: #41BC9A;
				}
		
				.red {
					background: rgba(224, 48, 47, 1);
				}
			}
		}
	}
	
</style>