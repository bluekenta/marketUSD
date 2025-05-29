<template>
	<div class="page ">
		<top-back :title="$t('home').j3"></top-back>
		<div class="record" @click="$toPage('/home/fllowRecord')">
			<svg t="1745631762959" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4569" width="28" height="28">
				<path d="M731.99104 136.86272v49.76128a97.1776 97.1776 0 0 1 71.82848 93.61408v531.56864c-0.11776 53.64224-43.63776 97.06496-97.28512 97.06496H317.40928c-53.64224 0-97.16224-43.42272-97.28-97.06496V280.23808c0-44.73344 30.54592-82.40128 71.82336-93.61408v-49.76128C222.3616 149.16608 171.60192 209.57696 171.46368 280.23808v531.56864c0 80.3072 65.4848 145.62816 145.9456 145.62816h389.17632c80.4864 0 145.77664-65.152 145.95584-145.62816V280.23808c-0.18944-70.66112-50.95936-131.05664-120.5504-143.37536zM365.92128 244.83328c28.80512 0 52.17792-22.26688 52.17792-49.7152v-78.848c0-27.44832-23.36768-49.71008-52.17792-49.71008-28.86656 0-52.23424 22.21056-52.23424 49.71008v78.84288c0.00512 27.45344 23.41888 49.72032 52.23424 49.72032z m294.30272 0c28.81536 0 52.18304-22.26688 52.18304-49.7152v-78.848c0-27.44832-23.36768-49.71008-52.18304-49.71008-28.86656 0-52.224 22.21056-52.224 49.71008v78.84288c0 27.45344 23.36256 49.72032 52.224 49.72032zM440.15104 183.1168h143.69792V134.5536H440.15104v48.5632z m299.22816 237.89568a29.1328 29.1328 0 0 1-29.12256 29.12768H313.74336a29.12768 29.12768 0 0 1-0.03072-58.25024h396.49792a29.1328 29.1328 0 0 1 29.16864 29.12256z m0 171.0848a29.12256 29.12256 0 0 1-29.12256 29.12768H313.74336a29.12256 29.12256 0 0 1-29.13792-29.12256 29.12256 29.12256 0 0 1 29.1072-29.14304h396.49792a29.14304 29.14304 0 0 1 29.16864 29.13792z m0 171.14624a29.12256 29.12256 0 0 1-29.12256 29.12256H313.74336a29.11744 29.11744 0 0 1-29.13792-29.11232 29.12256 29.12256 0 0 1 29.1072-29.14304h396.49792a29.14816 29.14816 0 0 1 29.16864 29.1328z" fill="#fff" p-id="4570"></path>
				</svg>
		</div>
		<div class="item" v-for="(item, index) in chooseList" :key="index">
			<img class="item-img" src="../../assets/skin/market/gd.png" />
			<div class="item-foot">
				<div class="item-title">
					<div class="item-title-left">{{ item.name }}<span>{{ item.sender }}</span></div>
					<div class="item-title-btn2" v-if="item.state==1">{{$t('已结束')}}</div>
          <div class="item-title-btn" @click="stockDetails(item)" v-else>{{ $t("fllow").txt7 }}</div>
				</div>
				<div class="item-middle">
					<div class="item-middle-list">{{ $t("j2") }}<span>{{ item.dprofit }}</span></div>
          <div class="item-middle-list">{{ $t("j4") }}<span>{{item.scday}}</span></div>
					<div class="item-middle-list" style="width: 100%; justify-content: flex-start">{{ $t("fllow").txt9 }}<span style="padding-left: .1rem">{{stockType=='usd'?'$ ':''}}{{ $formatMoney(item.money) }}{{stockType=='Spain'?' €':''}}</span></div>
<!--					<div class="item-middle-list">{{ $t("fllow").txt14 }}<span>{{ $formatDate("DD-MM-YYYY", item.end*1000) }}</span></div>-->
<!--					<div class="item-middle-list">{{ $t("fllow").txt13 }}<span>{{item.scday}}</span></div>-->
				</div>
			</div>
		</div>

		<van-popup v-model="show" position="center" :style="{ width: '90%' }">
			<div class="pop">
				<div class="pop-title">
					<div class="txt">{{ stockObj.name}}</div>
				</div>
				<div class="pop-price t-c">
					<div class="t1">{{ $t("j1") }}</div>
					<div class="t">{{stockType=='usd'?'$ ':''}}{{ $formatMoney(stockObj.capital) || 0 }}{{stockType=='Spain'?' €':''}}</div>
				</div>
				<div class="pad">
					<div class="ipt">
						<div class="tt">{{ $t("new").b45 }}</div>
						<div class="">
							<input class="" v-model="buyObj.handle" type="number" :placeholder="$t('fllow').txt12" />
						</div>
						<div class="txt">
							{{ $t("fllow").txt9 }}
							<span>{{stockType=='usd'?'$ ':''}}{{ $formatMoney(stockObj.money) }}{{stockType=='Spain'?' €':''}}</span>
						</div>
					</div>

					<div @click="buyFn" class="big_btn">{{ $t("fllow").btn }}</div>
				</div>
				<div class="text-right">
					<div class="icon close animate__animated animate__fadeIn" @click="show = false"></div>
				</div>
			</div>
		</van-popup>

		<loading ref="loading" />
	</div>
</template>

<script>
	export default {
		name: "fllow",
		data() {
			return {
				loading: true,
				isShow: false,
				isLoading: false,
				currmentIndex: 0,
				stockObj: {},
				chooseList: [],
				show: false,
				buyObj: {
					handle: "",
				},
				stockType:''
			};
		},
		computed: {},
		mounted() {
			if(this.$route.query.stockType){
				this.stockType = this.$route.query.stockType||'Spain';
			}else{
				this.stockType = window.localStorage.getItem('stockType')||'usd';
			}
			this.getNew();
		},

		methods: {
			// 下拉刷新
			onRefresh() {
				this.isShow = false;
				this.getNew();
			},
			getNew() {
				this.$server.post("/trade/productlist", {
					type: this.stockType,
				}).then((res) => {
					this.isLoading = false;
					this.loading = false;

					res.data.forEach((vo) => {
						let now = Date.now() * 0.001;
						vo.state = now > vo.end ? 1 : 0;
					});
					this.chooseList = res.data;
				});
			},
			stockDetails(stock) {
				this.stockObj = stock;
				this.show = true;
			},
			buyFn() {
				if (this.buyObj.handle < Number(this.stockObj.money)) {
					this.$toast(this.$t("new").t14 + this.stockObj.money);
					return;
				}
				this.$refs.loading.open(); //开启加载

				this.$server
					.post("/trade/buy_product", {
						id: this.stockObj.id,
						money: this.buyObj.handle,
						type: this.stockType,
					})
					.then((res) => {
						
						this.$refs.loading.close(); //关闭加载

						this.show = false;
						if (res.status == 1) {
							this.$toast(this.$t("new").t15);
						}
					});
			},
		},
	};
</script>
<style scoped lang="less">
	.page {
		padding: 0 .15rem;
		
		.record{
			position: fixed;top: .14rem;right: .15rem;z-index: 999;
			
		}
		.item {
			border-radius: 0.1rem;
			border: 0.01rem solid #F5F5F3;
			margin-top: .15rem;
			overflow: hidden;
		
			.item-img {
				width: 100%;
				height: 0.87rem;
				object-fit: cover;
			}
		
			.item-foot {
				padding: .1rem;
			}
		
			.item-title {
				display: flex;
				align-items: center;
				justify-content: space-between;
		
				.item-title-left {
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
		
				.item-title-btn {
					height: 0.25rem;
					background: #015AA4;
					border-radius: 0.04rem;
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 0 .15rem;
					font-weight: 400;
					font-size: 0.12rem;
					color: #fff;
				}

        .item-title-btn2 {
          height: 0.25rem;
          background: #666;
          border-radius: 0.04rem;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 .15rem;
          font-weight: 400;
          font-size: 0.12rem;
          color: #fff;
        }
			}
		
			.item-middle {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
		
				.item-middle-list {
					width: 48%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-weight: 400;
					font-size: 0.13rem;
					color: #999999;
					margin-top: .07rem;
		
					span {
						font-weight: 600;
						font-size: 0.13rem;
						color: #333333;
					}
		
					.green {
						color: #41BC9A;
					}
				}
			}
		}
		
		.van-popup {
			background-color: transparent;
		}
		
		.close {
			position: absolute;
			left: 50%;
			bottom: -0.5rem;
			transform: translate(-50%);
		}
		
		.pop {
			background-color: #fff;
			border-radius: .13rem;
			position: relative;
		
			.btips {
				padding: 0.1rem 0;
		
				.t1 {
					font-size: 0.12rem;
					color: #343434;
				}
		
				.t2 {
					font-weight: 500;
					font-size: 0.12rem;
					color: #63AB2B;
					margin-left: 0.05rem;
				}
			}
		
			.pop-title {
				padding: 0.16rem 0;
				border-radius: 0.13rem;
				background: linear-gradient(rgba(1,90,164,.3) 0%, rgba(255, 211, 14, .01) 100%);
				font-size: 0.16rem;
				text-align: center;
		
				img {
					margin-top: -0.5rem;
					width: 1.23rem;
					height: 1.28rem;
				}
		
				.close {
					position: absolute;
					top: .16rem;
					right: .15rem;
				}
		
				.txt {
					padding-top: .1rem;
		
					span {
						margin-top: 0.06rem;
						display: inline-block;
						color: #8C8C8C;
						font-size: .12rem;
					}
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
					font-size: 0.16rem;
					color: #333333;
				}
			}
		
			.pad {
				padding: 0.2rem 0.15rem;
			}
		
			.ipt {
				margin-bottom: .1rem;
				.tt {
					font-weight: 600;
					font-size: 0.14rem;
					color: #0e1028;
				}
		
				input {
					margin: 0.12rem 0;
					width: 100%;
					background: rgba(1,90,164,.1);
					//   border-radius: 0.04rem;
					height: 0.4rem;
					line-height: 0.4rem;
					padding: 0 0.12rem;
		
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
		
	}

	

	::v-deep .van-popup {
		overflow-y: visible;
	}

	
</style>