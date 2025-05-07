<template>
	<div class="page ">
		<top-back :title="$t('申购详情')"></top-back>
		<div class="top"></div>
		<div class="card">
			<div class="card-name">{{ item.name || "-" }}<span>{{ item.code || "-" }}</span></div>
			<div class="card-date">{{ $t("new").t34 }}:{{ $formatDate("DD-MM-YYYY", item.end * 1000) }}</div>
		</div>
		<div class="list">
			{{ $t("newt").a4 }}<span>{{ ((item.price - item.bprice) / item.bprice) * 100 == -100 ? "-" : ( ((item.price - item.bprice) / item.bprice) * 100 ).toFixed(2) }}%</span>
		</div>
		<div class="list">{{ $t("newt").a8 }}<span>{{stockType=='usd'?'$ ':''}}{{ $formatMoney(item.price - item.bprice, 3) }}{{stockType=='Spain'?' €':''}}</span></div>
		<div class="list">{{ $t("newt").a7 }}<span>{{stockType=='usd'?'$ ':''}}{{ $formatMoney(parseFloat(item.price),3) || "0" }}{{stockType=='Spain'?' €':''}}</span></div>
		<div class="list">{{ $t("newt").a9 }}<span>{{ $formatMoney(item.num) || "0" }}</span></div>
		<div class="list">{{ $t("newt").a10 }}<span>{{stockType=='usd'?'$ ':''}}{{ $formatMoney(parseFloat(item.bprice),3) || "0" }}{{stockType=='Spain'?' €':''}}</span></div>
		<div class="list">{{ $t("new").t24 }}<span>{{item.gb_date}}</span></div>
		<div class="list">{{ $t("new").t25 }}<span>{{item.ss_date}}</span></div>
		<div class="list">{{ $t("new").t26 }}<span>{{item.fq_date}}</span></div>
<!--		<div class="list">{{ $t("new").t33 }}</div>-->
<!--		<input class="input" v-model="quantity" @input="quantity = quantity.replace(/[^0-9]/g, '')"-->
<!--			:placeholder="$t('new').t35" type="number" />-->
		<div @click="submitSg" class="big_btn animate__animated animate__fadeIn">{{ $t("new").t16 }}</div>
		<!--点击按钮加载效果组件 -->
		<loading ref="loading" />
	</div>
</template>

<script>
	export default {
		name: "newStockBuy",
		data() {
			return {
				item: this.$storage.get("itemTemp") || {},
				quantity: "",
				flag: false,
				type: 0,
				stockType: ''
			};
		},
		mounted() {
			this.type = this.$route.query.type;
			this.stockType = window.localStorage.getItem('stockType')||'usd';
      this.getConfig()
		},
		methods: {
      getConfig() {
        this.$server.post("/common/config", {
          type: this.$stockType,
        }).then((res) => {
          if (res.status == 1) {
            let list = res.data;
            let listLength = list.length;
            let a;
            for (a = 0; a < listLength; a++) {
              let row = list[a];
              if (row.name === "dgsg") {
                this.quantity = row.value;
              }
            }
          }
        });
      },
			submitSg() {
				if (!this.quantity) {
					this.$toast(this.$t("new").t35);
					return;
				}

				if (this.flag) {
					return;
				}

				this.flag = true;
				this.$refs.loading.open(); //开启加载

				this.$server.post("/trade/buy_newstock", {
					symbol: this.item.code,
					zhang: this.quantity,
					id: this.item.id,
					buy_type: 0,
					type: this.stockType,
				}).then((res) => {
					this.$refs.loading.close(); //关闭加载

					this.$toast(this.$formText(res.msg));
					setTimeout(() => {
						this.flag = false;
					}, 2000);
				});
			},
		},
	};
</script>

<style scoped lang="less">
	.page {}

	.top {
		background: #015AA4;
		height: .5rem;
	}

	.card {
		background: #FFFFFF;
		box-shadow: 0 0.01rem 0.08rem 0 rgba(0, 0, 0, 0.15);
		border-radius: 0.05rem;
		margin: -.25rem .15rem .11rem .15rem;
		padding: .23rem .17rem;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.card-name {
			display: flex;
			align-items: center;
			font-weight: 400;
			font-size: 0.15rem;
			color: #111111;
			line-height: 0.21rem;

			span {
				font-weight: 400;
				font-size: 0.12rem;
				color: #777777;
				margin-left: .08rem;
			}
		}

		.card-date {
			font-weight: 400;
			font-size: 0.12rem;
			color: #111111;
		}
	}

	.list {
		height: .45rem;
		border-bottom: .01rem solid rgba(247, 247, 247, 1);
		padding: 0 .15rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-weight: 400;
		font-size: 0.14rem;
		color: #777777;

		span {
			font-weight: 400;
			font-size: 0.14rem;
			color: #111111;
		}
	}

	.input {
		width: calc(100% - .3rem);
		box-sizing: border-box;
		height: 0.43rem;
		background: #F5F5F3;
		border-radius: 0.04rem;
		line-height: .43rem;
		margin: .15rem .15rem .1rem;
		padding: 0 .18rem;
		font-weight: 400;
		font-size: 0.13rem;
		color: #333;
	}

	.big_btn {
		margin: .15rem;
	}
</style>