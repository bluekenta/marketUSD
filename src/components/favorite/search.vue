<template>
	<div class="page search">
		<top-back :title="$t('search').j1"></top-back>
		<div class="long"></div>
		<div class="search">
			<img src="../../assets/skin/market/search.png" />
			<input @input="handleInput" type="text" v-model="keyword" :placeholder="$t('search').j3" />
		</div>
		<div class="stockTab">
			<div class="item" :class="stockType==item.type?'sel':''" v-for="(item, idx) in stockTypeList" :key="idx" @click="stockType=item.type,clickStockTab(item.type)">{{item.name}}<span></span></div>
		</div>
		<div class="box" v-show="keyword" v-if="listData.length > 0">
			<!-- 股票列表 -->
			<div class="">
				<div class="list">
					<div class="list-item flex flex-b" v-for="(item, idx) in listData" :key="idx"
						@click=" $toDetail(`/market/stockDetail?symbol=${item.symbol}`, item) ">
						<div class="flex-2">
							<div class="name">{{ item.local_name }}</div>
							<div class="code">{{ item.symbol }}</div>
						</div>
						<div class="flex-1 t-center">
							<div class="price green" :class="{ red: Number(item.gainValue) < 0, }">
                {{stockType=='usd'?'$ ':''}}{{ $formatMoney(item.price) || 0 }}{{stockType=='Spain'?' € ':''}}
							</div>
						</div>
						<div class="flex-1 flex flex-e">
							<div>
								<div class="per green" :class="{ red: Number(item.gainValue) < 0, }">
									{{ item.gain > 0 ? "+" : "" }}{{ item.gain || 0 }}%
								</div>
								<div class="per green" :class="{ red: Number(item.gainValue) < 0, }">
                  {{stockType=='usd'?'$ ':''}}{{ item.gainValue > 0 ? "+" : "" }}{{ item.gainValue || 0 }}{{stockType=='Spain'?' €':''}}
								</div>
							</div>
							<div class="icon animate__animated animate__fadeIn"
								:class="item.isZx ? 'checked' : 'nocheck'" @click.stop="optional(item)"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<loading ref="loading" />
	</div>
</template>

<script>
	export default {
		name: "search",
		props: {},
		data() {
			return {
				keyword: "",
				imgList: {
					search: "",
					delete: "",
					hook: "",
					jia: "",
				},
				listData: [],
				flag: true,
				account: "",
				stockTypeList:[
					{
						name: this.$t('stockTab').j1,//西班牙
						type: 'Spain'
					},
					{
						name: this.$t('stockTab').j2,//美国
						type: 'usd'
					},
					/* {
						name: this.$t('stockTab').j3,//数字货币
						type: 'usdt'
					}, */
					/* {
						name: this.$t('stockTab').j4,//外汇
						type: 'wh'
					} */
				],
				stockType: 'usd'
			};
		},
		components: {},
		created() {},
		mounted() {
			this.stockType = window.localStorage.getItem('stockType')||'usd';
			// 使用 lodash 的防抖函数
			this.handleInput = _.debounce(this.handleInput, 1000);
		},
		methods: {
			clickStockTab(type){
				window.localStorage.setItem('stockType',type);
				this.searchFn();
			},
			handleInput() {
				this.searchFn();
			},
			optional(obj) {
				this.$refs.loading.open(); //开启加载
				if (!obj.isZx) {
					this.$server.post("/user/addOptional", {
						symbol: obj.symbol,
						type: this.stockType
					}).then((res) => {
						this.$refs.loading.close();

						if (res.status == 1) {
							this.listData = this.listData.map((item) => {
								if (item.symbol == obj.symbol) {
									item.isZx = true;
								}

								return item;
							});
						}
					});
				} else {
					this.$server.post("/user/removeOptional", {
						symbol: obj.symbol,
						type: this.stockType
					}).then((res) => {
						this.$refs.loading.close();

						if (res.status == 1) {
							this.listData = this.listData.map((item) => {
								if (item.symbol == obj.symbol) {
									item.isZx = false;
								}

								return item;
							});
						}
					});
				}
			},
			getMine() {
				this.$server.post("/user/Optionallist", {
					type: this.stockType
				}).then((res) => {
					if (res.status == 1) {
						// 判断当前是否在自选列表里面
						let arr = this.listData.map((item) => {
							res.data.forEach((it) => {
								if (item.symbol == it.symbol) {
									item.isZx = true;
								}
							});
							return item;
						});

						this.listData = arr;
					}
				});
			},
			doSearch(str) {
				this.keyword = str;
				this.searchFn();
			},
			clearHistory() {
				this.oldKeywordList = [];
				this.$storage.remove(this.account + "searchHistory");
			},
			searchFn() {
				if(!this.keyword){
					return;
				}
				let that = this;
				this.$refs.loading.open(); //开启加载
				this.listData = [];
				this.$server.post("/trade/search", {
					content: this.keyword,
					type: this.stockType
				}).then((res) => {
					this.$refs.loading.close();
					if (res.status == 1) {
						res.data = res.data ? res.data : [];
						if (res.data.length > 0) {
							this.listData = res.data;
							// 判断是否自选
							this.getMine();
						}
					}
				});
			},
		},
	};
</script>

<style scoped lang="less">
	.search {
		.long {
			height: .2rem;
			background: #015AA4;
		}
		
		.search {
			height: 0.38rem;
			background: #FFFFFF;
			box-shadow: 0 0.01rem 0.08rem 0 rgba(0, 0, 0, 0.15);
			border-radius: 0.05rem;
			margin: -.2rem .15rem 0 .15rem;
			display: flex;
			align-items: center;
			padding: 0 .09rem;
			font-weight: 400;
			font-size: 0.11rem;
			color: #9C9C9C;
		
			img {
				width: 0.15rem;
				height: 0.16rem;
				margin-right: .13rem;
			}
		
			input {
				font-size: 0.14rem;
				color: #000;
				margin-left: 0.1rem;
		
				&::placeholder {
					color: #999;
				}
			}
		}
		
		.box {
			padding: 0.15rem;
		
			.list {
				.list-item {
					padding: 0.1rem 0;
					border-bottom: 0.01rem solid #ebebeb;
		
					&:last-child {
						border-bottom: 0;
					}
		
					.icon {
						margin-left: 0.05rem;
					}
		
					.name {
						font-weight: 500;
						font-size: 0.13rem;
						color: #333333;
					}
		
					.code {
						font-weight: 400;
						font-size: 0.11rem;
						color: #999999;
						margin-top: 0.05rem;
					}
		
					.t {
						font-size: 0.12rem;
						margin-top: 0.05rem;
					}
		
					.price {
						font-weight: 600;
						font-size: 0.12rem;
						color: #333333;
					}
		
					.per {
						font-weight: 600;
						font-size: 0.12rem;
					}
				}
			}
		
			.green {
				color: #41BC9A;
			}
		
			.red {
				color: rgba(224, 48, 47, 1);
			}
		}
		
		.stockTab {
			height: .47rem;margin: 0 .14rem;
			border-bottom: .01rem solid #F7F7F7;
			display: flex;
			align-items: flex-end;
		
			.item {
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
				&.sel {
					color: rgba(17, 17, 17, 1);
					
					span {
						background: #015AA4;
					}
				}
			}
		}
	}

	
</style>