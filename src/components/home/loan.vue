<template>
	<div class="page">
		<top-back :title="$t('信用贷款')" :isReg="true"></top-back>
		<div class="hbg"></div>
		<div class="jdIcon flex flex-c" @click="$toPage('/home/loanRe?stockType='+stockType)">
			<img src="../../assets/v1/jl.png" style="width: 0.2rem;height: 0.24rem;" alt="" />
		</div>
		<div class="box">
			<!-- <div class="flex flex-c">
				<van-circle v-model="currentRate" :rate="80" :color="gradientColor" layer-color="transparent" size="120px" stroke-width='160' />
			</div> -->
			<div class="flex flex-c">
				<div class="box-h-l flex-column-item">
					<span class="box-h-v">{{ userInfo.xyf }}</span>
					<span class="box-h-n">{{$t("信用评分")}}</span>
				</div>
			</div>
			<div class="box-row">
				<div class="box-col">
					<span class="box-r-v">{{ $formatMoney(parseFloat(userInfo[stockType+'kjed'])-parseFloat(userInfo[stockType+'yjed']), 0) }} €</span>
					<span class="box-r-n">{{$t("可貸金額")}}</span>
				</div>
				<div class="box-col">
					<span class="box-r-v">{{ $formatMoney(userInfo[stockType+'yjed'], 0) }} €</span>
					<span class="box-r-n">{{$t("已貸金額")}}</span>
				</div>
			</div>
			<div class="nav-box flex flex-b">
				<div class="nav-item flex flex-c" v-for="(item, idx) in navList" :key="idx" :class="{ active: navIdx === item.type }" @click="changeNav(item.type)">
					{{ item.name }}
				</div>
			</div>
		</div>
		<div class="bg">
			<div class="inputs" v-show="!navIdx">
				<div class="inputs-i">
					<span>{{$t("借貸金額")}}</span>
					<input v-model="getNum" type="text" @blur="inputOB" @focus="inputOf" @input="inputEvent" :placeholder="$t('請輸入借貸金額')" />
				</div>
				<div class="inputs-butt" @click="getK">{{$t("借款")}}</div>
			</div>
			<div class="inputs" v-show="navIdx">
				<div class="inputs-i">
					<span>{{$t("還款金額")}}</span>
					<input v-model="postNum" type="number"  @input='inputChange1' :placeholder="$t('請輸入還款金額')" />
				</div>
				<div class="inputs-butt" @click="postK">{{$t("还款")}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				currentRate: 0,
				gradientColor: {
					'0%': 'rgba(7, 143, 129, 0.01)',
					'100%': '#FFFFFF',
				},
				navList: [{
						name: this.$t("借款"),
						type: 0
					},
					{
						name: this.$t("还款"),
						type: 1
					},
				],
				navIdx: 0,
				userInfo: {},
				getNum: null,
				postNum: null,
				stockType:'Spain'
			};
		},
		components: {},
		created() {
			if(this.$route.query.stockType){
				this.stockType = this.$route.query.stockType
			}
			this.getUserInfo();
		},
		methods: {
      inputOB() {
        this.getNum = this.getNum.split('.').join('')
        if(this.getNum.toString().indexOf(',')>-1){
          this.getNum = parseInt(this.getNum.split(',').join(''))
        }
        this.getNum = this.$formatMoney(this.getNum, 0)
      },
      inputOf() {
        if (this.getNum) {
          this.getNum = this.getNum.split('.').join('')
          this.getNum = parseInt(this.getNum.split(',').join(''))
        }
      },
      inputEvent() {
        this.getNum = this.getNum.replace(/[^0-9]/g, "");
        this.getNum = parseInt(this.getNum.split(',').join(''))
        this.getNum = this.$formatMoney(this.getNum, 0)
      },
			inputChange(e) {
				this.getNum = e.target.value
			},
			inputChange1(e) {
				this.postNum = e.target.value
			},
			changeNav(index) {
				this.navIdx = index;
				this.getNum = null;
				this.postNum = null;
			},
			getUserInfo() {
				this.$server.post("/user/getUserinfo", {}).then((res) => {
					if (res.status == 1) {
						this.userInfo = res.data;
					}
				});
			},
			getK() {
				if (!this.getNum) {
					this.$toast(this.$t('请输入借贷金额'));
					return;
				}
				this.$server
					.post("/user/to_jq", {
						type: this.stockType,
						money: this.getNum.split('.').join('')
					})
					.then((res) => {
            this.$toast(this.$t(res.msg));
					});
			},
			postK() {
				if (!this.postNum) {
					this.$toast(this.$t('请输入还款金额'));
					return;
				}
				this.$server
					.post("/user/to_hq", {
						type:  this.stockType,
						money: this.postNum.split('.').join('')
					})
					.then((res) => {
						this.$toast(this.$t(res.msg));
					});
			}
		}
	};
</script>

<style scoped lang="less">
	.page {
		padding: 0.5rem 0 0.1rem;
		min-height: 100vh;
		
		.jdIcon {
			position: fixed;
			z-index: 999;
			right: 0.12rem;
			top: 0.12rem;
		}
	}
	.hbg{
		width: 100%;
		height: 2.51rem;
		background: url('../../assets/v1/loanH.png') no-repeat;
		background-size: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: -1;
	}
	::v-deep .header {
		background: transparent;
		box-shadow: none;
	}
	.box {
		overflow: hidden;
		padding: 0.5rem 0.15rem 0;
		.box-h-l {
			.box-h-n {
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				font-size: 0.14rem;
				color: #FFFFFF;
				margin-top: 0.15rem;
			}
		
			.box-h-v {
				font-family: PingFangSC, PingFang SC;
				font-weight: 500;
				font-size: 0.36rem;
				color: #FFFFFF;
			}
		}
		.box-row {
			margin: 0.6rem 0 0.2rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: #F6F6F6;
			border-radius: 0.16rem;
			padding: 0.12rem;
			.box-col {
				width: 50%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.box-r-n {
					margin-top: 0.1rem;
					font-family: PingFangSC, PingFang SC;
					font-weight: 400;
					font-size: 0.12rem;
					color: #999999;
				}

				.box-r-v {
					font-family: PingFangSC, PingFang SC;
					font-weight: 400;
					font-size: 0.16rem;
					color: #000000;
				}
			}
		}
	}
	.inputs {
		margin: .12rem;
		.inputs-i {
			display: flex;
			flex-direction: column;
			width: 100%;
			span {
				width: 100%;
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				font-size: 0.13rem;
				color: #666666;
			}

			input {
				margin-top: 0.12rem;
				height: 0.44rem;
				background: #F6F6F6;
				border-radius: 0.16rem;
				padding: 0 0.15rem;
			}
		}
		.inputs-butt {
			margin-top: .3rem;
			width: 100%;
			height: 0.4rem;
			background: #015aa4;
			border-radius: 0.16rem;
			line-height: .4rem;
			text-align: center;
			font-family: PingFangSC, PingFang SC;
			font-weight: 500;
			font-size: 0.15rem;
			color: #FFFFFF;
			animation: fadeIn;
			animation-duration: 2s;
		}
	}

	.nav-box {
		width: 100%;
		padding: 0.1rem 0;
		height: 0.43rem;
		background: #F6F6F6;
		border-radius: 0.22rem;
		padding: 0.05rem;
		.nav-item {
			font-family: PingFangSC, PingFang SC;
			font-weight: 400;
			font-size: 0.13rem;
			color: #999999;
			width: 48%;
		}
		.active {
			height: 0.33rem;
			background: #FFFFFF;
			border-radius: 0.17rem;
			font-family: PingFangSC, PingFang SC;
			font-weight: 400;
			font-size: 0.13rem;
			color: #000000;
			line-height: 0.33rem;
		}
	}

	::v-deep .uni-input-input {
		font-size: .28rem;
		font-weight: 400;
		color: #000;
	}
</style>