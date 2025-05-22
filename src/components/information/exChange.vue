<template>
	<div class="page">
		<top-back :title="$t('exchange').title"></top-back>
		<div class="top"></div>
		<div class="card">
			<div class="card-list">
				<div class="card-list-txt"><!--  @click="showTypeFrom = true" -->
					<template v-if="typeIndexFrom === 'usd'">USD</template>
					<template v-if="typeIndexFrom === 'Spain'">EUR</template>
					<!-- <template v-if="typeIndexFrom === 'gbp'">GBP</template>
					<template v-if="typeIndexFrom === 'usdt'">USDT</template> -->
				</div>
				<input type="number" class="card-list-input" v-model="money" @input="changeMoney"
					:placeholder="$t('exchange').txt1" />
			</div>
			<div class="card-img"><img src="../../assets/skin/mine/change.png" @click="changeIpt" /></div>
			<div class="card-list">
				<div class="card-list-txt"><!--  @click="showTypeTo = true" -->
					<template v-if="typeIndexTo === 'usd'">USD</template>
					<template v-if="typeIndexTo === 'Spain'">EUR</template>
					<!-- <template v-if="typeIndexTo === 'gbp'">GBP</template>
					<template v-if="typeIndexTo === 'usdt'">USDT</template> -->
				</div>
				<div class="card-list-input">{{ $formatMoney(Money,5) }}</div>
			</div>
			<div class="card-tip">{{$t('mine').j26}}:1 {{typeIndexFrom=='Spain'?'EUR':typeIndexFrom.toUpperCase()}} = {{rate}}
				{{typeIndexTo=='Spain'?'EUR':typeIndexTo.toUpperCase()}}</div>
			<div class="card-tip" v-if="userInfo">{{$t('可用资金')}}:{{typeIndexFrom=='usd'?'$ ':''}}{{userInfo[typeIndexFrom]}}{{typeIndexFrom=='Spain'?' €':''}}</div>
		</div>
		<div class="big_btn" @click="submit">{{ $t('提交') }}</div>
    <div class="big_btn" @click="submit2">{{ $t('一键兑换') }}</div>

		<van-action-sheet v-model="showTypeFrom" :actions="typeList" @select="selectTypeFrom" />
		<van-action-sheet v-model="showTypeTo" :actions="typeList2" @select="selectTypeTo" />
	</div>
</template>

<script>
	export default {
		name: "exchangeRate",
		props: {},
		data() {
			return {
				language: "",
				loading: false,
				allList: [],
				typeList: [],
				typeList2: [],
				lang: this.$t("exchange"),
				typeIndexTo: "usd",
				typeIndexFrom: "Spain",
				showTypeFrom: false,
				showTypeTo: false,
				formTo: "Spainusd",
				rate: 0.0,
				money: "",
				show: true,
				Money: 0,
				userInfo: null
			};
		},
		components: {},
		computed: {},
		created() {
			this.getConfig();
		},
		mounted() {
			this.language = window.localStorage.getItem("language");

			this.typeList = [
				{
					name: "USD",
					type: "usd"
				},
				{
					name: "EUR",
					type: "Spain"
				},
			];
			this.allList = [
				{
					name: "USD",
					type: "usd"
				},
				{
					name: "EUR",
					type: "Spain"
				},
			];
			this.getTypeList();
			this.selectTypeFrom(this.typeList[1]);
		},
		methods: {
			changeMoney() {
				this.Money = parseFloat(this.rate * this.money).toFixed(4);
			},
			changeIpt() {
				let _this = this;
				_this.money = "";
				_this.Money = 0;
				let indexFrom = _this.typeIndexFrom;
				let indexTo = _this.typeIndexTo;
				_this.typeIndexFrom = indexTo;
				_this.typeIndexTo = indexFrom;
				_this.formTo = _this.typeIndexFrom + _this.typeIndexTo;
				_this.getTypeList();
				_this.getUser();
				_this.getConfig();
			},
			submit() {
				let _this = this;
				if (!_this.money) {
					this.$toast(_this.lang.txt1);
					return;
				}
				_this.loading = true;
				let parameter = {
					money: _this.money,
					from: _this.typeIndexFrom,
					to: _this.typeIndexTo,
					type: this.$stockType
				};
				_this.$server.post("/user/rotation", parameter).then((str) => {

					if (parseInt(str.status) === 1) {
            _this.getUser();
						this.$toast(_this.$t('兑换成功'));
						_this.loading = false;
					} else {
						this.$toast(_this.$t(str.msg));
						_this.loading = false;
					}
				});
			},
      submit2() {
        let _this = this;
        _this.loading = true;
        let parameter = {
          money:_this.userInfo[_this.typeIndexFrom],
          from: _this.typeIndexFrom,
          to: _this.typeIndexTo,
          type: this.$stockType
        };
        _this.$server.post("/user/rotation", parameter).then((str) => {

          if (parseInt(str.status) === 1) {
            _this.getUser();
            this.$toast(_this.$t('兑换成功'));
            _this.loading = false;
          } else {
            this.$toast(_this.$t(str.msg));
            _this.loading = false;
          }
        });
      },
			selectTypeFrom(item) {
				let _this = this;
				_this.showTypeFrom = false;
				this.money = "";
				this.Money = 0;
				_this.typeIndexFrom = item.type;
				_this.getTypeList()
				_this.getUser();
				_this.getConfig();
			},
			selectTypeTo(item) {
				let _this = this;
				_this.showTypeTo = false;
				this.money = "";
				this.Money = 0;
				_this.typeIndexTo = item.type;
				_this.formTo = _this.typeIndexFrom + _this.typeIndexTo;
				_this.getUser();
				_this.getConfig();
			},
			getUser() {
				let _this = this;
				_this.$server.post("/user/getUserinfo").then((str) => {
					if (str) {
						if (parseInt(str.status) == 1) {
							_this.userInfo = str.data;
						}
					}
				});
			},
			getConfig() {
				let _this = this;
				_this.$server.post("/common/config", {
					type: 'all'
				}).then((str) => {
					if (str) {
						if (parseInt(str.status) === 1) {
							let num = 0;
							for (var i in str.data) {
								var row = str.data[i];
								if (row.name == _this.formTo) {
									num += 1;
									_this.rate = row.value;
								}
							}
							if (num == 0) {
								_this.rate = 0.0;
							}
						}
						console.log(_this.rate);
					}
				});
			},
			getTypeList() {
				let _this = this
				let list = _this.allList
				let newList = []
				let length = list.length
				let a
				for (a = 0; a < length; a++) {
					if (_this.typeIndexFrom !== list[a].type) {
						newList.push(list[a])
					}
				}
				_this.typeList2 = newList
				//console.log(_this.typeList2[0].type)
				_this.typeIndexTo = _this.typeList2[0].type
				_this.formTo = _this.typeIndexFrom + _this.typeIndexTo;
			}
		},
	};
</script>

<style scoped lang="less">
	.page {}

	.top {
		height: .7rem;
		background: #015AA4;
	}

	.card {
		background: #FFFFFF;
		box-shadow: 0 0.01rem 0.08rem 0 rgba(0, 0, 0, 0.15);
		border-radius: 0.05rem;
		margin: -.7rem .15rem 0 .15rem;
		padding: .13rem;

		.card-list {
			height: 0.43rem;
			display: flex;
			align-items: center;

			.card-list-txt {
				width: .56rem;
				font-weight: 400;
				font-size: 0.13rem;
				color: #111111;
			}

			.card-list-input {
				width: calc(100% - .56rem);
				height: 0.43rem;
				line-height: 0.43rem;
				background: #F5F5F3;
				border-radius: 0.04rem;
				padding: 0 .15rem;
				font-weight: 400;
				font-size: 0.13rem;
				color: #333;
			}
		}

		.card-img {
			height: 0.23rem;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: .16rem 0;

			img {
				width: 0.23rem;
				height: 0.23rem;
			}
		}

		.card-tip {
			font-weight: 400;
			font-size: 0.13rem;
			color: #999999;
			line-height: 0.19rem;
			margin-top: .05rem;
			display: flex;
			align-items: center;
			justify-content: flex-end;
		}
	}

	.big_btn {
		margin: .2rem .15rem 0 .15rem;
	}
</style>