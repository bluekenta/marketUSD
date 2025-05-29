<template>
	<div class="page blockTrade">
		<top-back :title="title"></top-back>
		<div class="record" @click="$toPage('/home/blockTradeRrcord?type='+type)">
			<svg t="1745631762959" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4569" width="28" height="28">
				<path d="M731.99104 136.86272v49.76128a97.1776 97.1776 0 0 1 71.82848 93.61408v531.56864c-0.11776 53.64224-43.63776 97.06496-97.28512 97.06496H317.40928c-53.64224 0-97.16224-43.42272-97.28-97.06496V280.23808c0-44.73344 30.54592-82.40128 71.82336-93.61408v-49.76128C222.3616 149.16608 171.60192 209.57696 171.46368 280.23808v531.56864c0 80.3072 65.4848 145.62816 145.9456 145.62816h389.17632c80.4864 0 145.77664-65.152 145.95584-145.62816V280.23808c-0.18944-70.66112-50.95936-131.05664-120.5504-143.37536zM365.92128 244.83328c28.80512 0 52.17792-22.26688 52.17792-49.7152v-78.848c0-27.44832-23.36768-49.71008-52.17792-49.71008-28.86656 0-52.23424 22.21056-52.23424 49.71008v78.84288c0.00512 27.45344 23.41888 49.72032 52.23424 49.72032z m294.30272 0c28.81536 0 52.18304-22.26688 52.18304-49.7152v-78.848c0-27.44832-23.36768-49.71008-52.18304-49.71008-28.86656 0-52.224 22.21056-52.224 49.71008v78.84288c0 27.45344 23.36256 49.72032 52.224 49.72032zM440.15104 183.1168h143.69792V134.5536H440.15104v48.5632z m299.22816 237.89568a29.1328 29.1328 0 0 1-29.12256 29.12768H313.74336a29.12768 29.12768 0 0 1-0.03072-58.25024h396.49792a29.1328 29.1328 0 0 1 29.16864 29.12256z m0 171.0848a29.12256 29.12256 0 0 1-29.12256 29.12768H313.74336a29.12256 29.12256 0 0 1-29.13792-29.12256 29.12256 29.12256 0 0 1 29.1072-29.14304h396.49792a29.14304 29.14304 0 0 1 29.16864 29.13792z m0 171.14624a29.12256 29.12256 0 0 1-29.12256 29.12256H313.74336a29.11744 29.11744 0 0 1-29.13792-29.11232 29.12256 29.12256 0 0 1 29.1072-29.14304h396.49792a29.14816 29.14816 0 0 1 29.16864 29.1328z" fill="#fff" p-id="4570"></path>
				</svg>
		</div>
		<div class="cot">
			<div class="title flex flex-b">
				<div class="flex-1">{{$t('股票名称')}}</div>
				<div class="flex-1 text-center">{{ $t("dividend").txt2 }}</div>
				<div class="flex-1 text-right">{{ $t("dividend").txt13 }}</div>
			</div>
			<div class="list-item" v-for="(item, index) in chooseList" :key="index"
				@click="stockDetails(item)">
        <div class="flex flex-b">
          <div class="flex-1 name">
            <div>{{ item.name }}</div>
            <span>{{ item.symbol }}</span>
          </div>
          <div class="price flex-1 text-center">
            {{stockType=='usd'?'$ ':''}}{{ $formatMoney(item.price, 3) }}{{stockType=='Spain'?' €':''}}

          </div>
          <div class="price flex-1 text-right">
            {{ $formatMoney(item.stock_num, 0) }}
          </div>
        </div>
        <div class="newBtn">
          <div class="newBtn-item">{{$t('new').a68}}</div>
        </div>
			</div>
			<no-data v-if="!chooseList.length"></no-data>
		</div>
		<van-popup v-model="show" position="center" :style="{ width: '90%' }">
			<div class="pop">
				<div class="pop-price t-c">
					<div class="t1">{{ $t("申购价格") }}</div>
					<div class="t">{{stockType=='usd'?'$ ':''}}{{ $formatMoney(stockObj.price, 3) || 0 }}{{stockType=='Spain'?' €':''}}</div>
				</div>
				<div class="pad">
					<div class="ipt">
						<!-- <div class="tt">{{ $t("new").b46 }}</div> -->
						<div class="pop-num">
							<input v-model="buyObj.handle" type="number" :placeholder="$t('dividend').txt12"
								@input="TypeInput($event)" />
						</div>
						<div class="txt">
							{{ $t("dividend").txt14 }}
							<span>{{stockType=='usd'?'$ ':''}}{{ $formatMoney(countMoney) || 0 }}{{stockType=='Spain'?' €':''}}</span>
						</div>
					</div>
					<div class="pop-num" v-if="stockObj.password">
						<div>{{ $t("new").b47 }}</div>
						<input :placeholder="$t('new').t1" type="password" v-model="password" />
					</div>
					<div class="flex flex-b btips ">
						<div class="flex">
							<div class="t1">{{ $t("newt").t13 }}</div>
							<div class="t2">
                {{stockType=='usd'?'$ ':''}}{{ $formatMoney(userInfo[stockType]) || 0 }}{{stockType=='Spain'?' €':''}}
							</div>
						</div>
						<div class="flex">
							<div class="t1">{{ $t("dividend").txt13 }}</div>
							<div class="t2">{{ $formatMoney(stockObj.stock_num, 0) || 0 }}</div>
						</div>
					</div>
					<div @click="buyFn" class="big_btn">{{ $t("dividend").btn }}</div>
				</div>
				<div class="flex flex-c">
					<div class="icon close" @click="show = false"></div>
				</div>
			</div>
		</van-popup>
		<loading ref="loading" />
	</div>
</template>

<script>
	export default {
		name: "blockTrade",
		data() {
			return {
				loading: true,
				isLoading: false,
				navList: [{
						name: this.$t("dividend").tab1,
						type: 0,
					},
					{
						name: this.$t("dividend").tab2,
						type: 1,
					},
				],
				currmentIndex: 0,
				chooseList: [],
				show: false,
				stockObj: {},
				buyObj: {
					handle: null,
				},
				password: "",
				userInfo: {},
				currentItem: {},
				type: 0,
				title: '',
				stockType:''
			};
		},
		computed: {
			countMoney() {
				return this.stockObj.price * this.buyObj.handle;
			},
		},
		mounted() {
			if(this.$route.query.stockType){
				this.stockType = this.$route.query.stockType||'Spain';
			}else{
				this.stockType = window.localStorage.getItem('stockType')||'usd';
			}
			this.type = this.$route.query.type;
			if (this.type == 0) {
				this.title = this.$t('blockTrade').j1;
			} else if (this.type == 1) {
				this.title = this.$t("home").j4;
			}
			this.initData();
			this.getNew();
		},
		methods: {
			// 下拉刷新
			onRefresh() {
				this.initData();
				this.getNew();
			},
			initData() {
				this.$server.post("/user/getUserinfo").then((res) => {
					if (res.status == 1) {
						this.userInfo = res.data;
					}
				});
			},
			TypeInput(e) {
				// 只能输入数字的验证;
				const inputType = /[^\d]/g; //想限制什么类型在这里换换正则就可以了
				this.$nextTick(function() {
					this.buyObj.handle = e.target.value.replace(inputType, "");
				});
			},
			getNew() {
				this.$server.post("/trade/nbhllist", {
					dz_type: this.type,
					type: this.stockType,
				}).then((res) => {
					this.isLoading = false;
					this.loading = false;

					if (res.status == 1) {
						this.chooseList = res.data;
					}
				});
			},
			stockDetails(stock) {
				this.show = true;
				this.currentItem = stock;
				this.stockObj = stock;
			},
			buyFn() {
				if (!this.buyObj.handle) {
					this.$toast(this.$t("dividend").txt12);
					return;
				}

				let parmes = {
					symbol: this.stockObj.code,
					zhang: this.buyObj.handle,
					is_qc: 2,
					dz_type: this.type,
					id: this.stockObj.id, //大宗增加传递参数，列表id
					type: this.stockType,
				};

				if (this.stockObj.password) {
					if (!this.password) {
						this.$toast(this.$t("new").t);
						return;
					}

					parmes.password = this.password;
				}

				this.$refs.loading.open(); //开启加载

				this.$server.post("/trade/buy_stock", parmes).then((res) => {
					this.$refs.loading.close();

					this.show = false;

					if (res.msg.indexOf('当前股票大宗交易最少买入') > -1) {
						this.$toast(res.msg.replace('当前股票大宗交易最少买入', this.$t('当前股票大宗交易最少买入')).replace('股', this.$t(
							'股')));
						return false;
					}
					if (res.msg.indexOf('当前大宗一天限购') > -1) {
						this.$toast(res.msg.replace('当前大宗一天限购', this.$t('当前大宗一天限购')).replace('次', this.$t('次')));
						return false;
					}

					if (res.msg) {
						this.$toast(this.$t(res.msg));
					}
				});
			},
		},
	};
</script>

<style scoped lang="less">
	.blockTrade {
		.record{
			position: fixed;top: .14rem;right: .15rem;z-index: 999;
			
		}

    .newBtn{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: .1rem;
      .newBtn-item{
        padding: .05rem .3rem;
        border-radius: .05rem;
        background: #015AA4;
        color: #fff;
        font-size: .12rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
		
		.pop {
			position: relative;
			background-color: #fff;
			border-radius: 0.13rem;
		
			.close {
				position: absolute;
				left: 50%;
				bottom: -0.5rem;
				transform: translate(-50%);
			}
		
			.btips {
				padding: 0.1rem 0;
		
				.t1 {
					font-family: PingFangSC, PingFang SC;
					font-weight: 400;
					font-size: 0.14rem;
					color: #999999;
				}
		
				.t2 {
					font-weight: 400;
					font-size: 0.14rem;
					color: #015AA4;
					margin-left: 0.05rem;
				}
			}
		
			.pop-price {
				padding: 0.1rem 0;
		
				.t {
					font-weight: 600;
					font-size: 0.18rem;
					color: #015AA4;
					margin-top: 0.1rem;
				}
		
				.t1 {
					font-weight: 500;
					font-size: 0.14rem;
					color: #333333;
				}
			}
		
			.pad {
				padding: 0.1rem 0.15rem;
			}
		
			.ipt {
				.tt {
					font-weight: 600;
					font-size: 0.14rem;
					color: #0e1028;
				}
		
				input {
					width: 100%;
					background: rgba(255, 211, 14, .1);
					//   border-radius: 0.04rem;
					height: 0.4rem;
					line-height: 0.4rem;
		
					&::placeholder {
						font-size: 0.12rem;
						color: #8a8a8a;
					}
				}
		
				.txt {
					font-size: 0.12rem;
					color: #9a9fa5;
		
					span {
						font-size: 0.12rem;
						color: #015AA4;
					}
				}
		
			}
		
			.pop-num {
				margin-top: 0.05rem;
		
				input {
					margin: 0.05rem 0;
					width: 100%;
					height: 0.44rem;
					background: #F5F5F5;
					border-radius: 0.08rem;
					line-height: 0.44rem;
					padding: 0 0.1rem;
		
					&::placeholder {
						font-size: 0.12rem;
						color: #9a9fa5;
					}
				}
			}
		
		
		
			.b-btn {
				margin: 0.2rem 0 0;
			}
		}
		
		.cot {
			.title {
				padding: .12rem;
		
				div {
					width: 33%;
					font-weight: 400;
					font-size: 0.1rem;
					color: #989898;
				}
			}
		
			.list-item {
				padding: 0 .12rem 0.15rem;
		
				//margin-bottom: 0.15rem;
				.name {
					font-weight: 500;
					font-size: 0.14rem;
					color: #111111;
					line-height: 0.2rem;
					width: 33%;
		
					span {
						font-weight: 400;
						font-size: 0.12rem;
						color: #C7C7C7;
						line-height: 0.17rem;
						margin-top: .04rem;
					}
				}
		
				.price {
					font-weight: 500;
					font-size: 0.12rem;
					color: #111111;
					width: 33%;
				}
			}
		}
	}

	.van-popup {
		background-color: transparent;
	}

	::v-deep .van-popup {
		overflow-y: visible;
	}

	
</style>