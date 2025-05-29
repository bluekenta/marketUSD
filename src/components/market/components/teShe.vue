<template>
	<div class="cot">
		<div class="nav" v-if="show">
			<div class="nav-item" :class="navIndex==item.type?'nav-on':''" v-for="(item, index) in nav" :key="index"
				@click="changeNav(item.type)">{{item.name}}<span></span></div>
		</div>
		<div class="list">
			<div class="titles">
				<div class="flex-start">{{ $t("newt").t57 }}</div>
				<div>{{ $t("newt").t58 }}</div>
				<div class="flex-end">{{ $t("newt").t59 }}</div>
			</div>

			<div class="lists">
				<div class="list-item " v-for="(item, idx) in list" :key="idx"
					@click="$toDetail(`/market/stockDetail?symbol=${item.symbol}`, item)">
					<div class="name">{{ item.name }}<span>{{ item.symbol }}</span></div>
					<div class="price">
            {{stockType=='usd'?'$ ':''}}{{ $formatMoney(item.price, 3) || 0 }}{{stockType=='Spain'?' €':''}}<span>{{stockType=='usd'?'$ ':''}}{{ $formatMoney(item.gainValue, 3) || 0 }}{{stockType=='Spain'?' €':''}}</span></div>
					<div class="per">
						<div class="per-info" :class="item.gainValue>0?'green':'red'">{{ item.gain.toFixed(2) }}%</div>
					</div>
				</div>
			</div>
		</div>
		<loading ref="loading" />
	</div>
</template>

<script>
	export default {
		name: "teShe",
		components: {},
		data() {
			return {
				loading: true,
				nav: [{
						name: this.$t('market').j15,
						type: 0
					},
					{
						name: this.$t('market').j16,
						type: 1
					},
					{
						name: this.$t('market').j17,
						type: 2
					},
					{
						name: this.$t('market').j18,
						type: 3
					},
				],
				navIndex: 0,
				list: [],
			};
		},
		props: {
			stockType:{
				type: String,
				default: '',
			},
			show: {
				type: Boolean,
				default: true,
			},
		},
		created() {},
		mounted() {
			//this.getInfo();
		},
		watch: {
			stockType: { //0币币交易,1合約交易,2期權交易
				handler(newValue, oldValue) {
					this.getInfo();
				},
				// deep: true,  // 深度监听
				immediate: true, // 第一次改变就执行
			},
		},
		onLoad() {},
		methods: {
			changeNav(type) {
				this.navIndex = type
				this.getInfo()
			},
			getInfo() {
				//this.$refs.loading.open(); //开启加载
				if(!this.stockType){
					return;
				}
				this.$server.post("/parameter/top", {
					type: this.stockType
				}).then((res) => {
					this.$emit("upData");
					//this.$refs.loading && this.$refs.loading.close();
					this.loading = false;
					if (this.navIndex == 0) {
						this.list = res.data;
					}
					if (this.navIndex == 1) {
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
					if (this.navIndex == 2) {
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
					if (this.navIndex == 3) {
						this.list = res.data;
						this.list.sort(function(a, b) {
							return b.volume - a.volume;
						});
					}
				});
			},
		},
	};
</script>

<style scoped lang="less">
	.nav {
		height: .47rem;
		display: flex;
		align-items: flex-end;

		.nav-item {
			margin-right: .28rem;
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

		.nav-on {
			color: rgba(17, 17, 17, 1);

			span {
				background: #015AA4;
			}
		}
	}

	.cot {
		padding: 0 0.14rem;

		.list {
			.titles {
				height: .21rem;
				display: flex;
				align-items: center;
				margin-top: .2rem;

				div {
					width: calc(100% / 3);
					height: .21rem;
					display: flex;
					align-items: center;
					justify-content: center;
					font-weight: 400;
					font-size: 0.1rem;
					color: #989898;
				}

				.flex-start {
					justify-content: flex-start;
				}

				.flex-end {
					justify-content: flex-end;
				}
			}

			.lists {
				.list-item {
					margin-top: .15rem;
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
		}
	}
</style>