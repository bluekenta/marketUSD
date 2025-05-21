<template>
	<div class="page ">
		<top-back :title="$t('mine').j11"></top-back>
		<div class="item" v-for="(item, index) in bankList" :key="index">
			<div class="item-name">{{ item.bank_name }}</div>
			<div class="item-tip">{{item.bank_address}}</div>
			<div class="item-code">{{ formatNum(item.bank_num) }}</div>
			<div class="icon del item-del animate__animated animate__fadeIn" @click="delbakcard(item.id)"></div>
		</div>
		<div class="big_btn flex flex-c animate__animated animate__fadeIn" @click="$toPage('/information/addBankCard')">
			{{ $t("bankManagement").btn }}</div>
		<loading ref="loading" />
	</div>
</template>

<script>
	export default {
		name: "bankList",
		props: {},
		data() {
			return {
				isLoading: false,
				bankList: [],
				flag: false,
			};
		},
		components: {},
		created() {
			this.initData();
		},
		computed: {
			formatNum() {
				return (value) => {
					let str = value.slice(0, 4);
					return `${str} **** **** ****`;
				};
			},
		},
		methods: {
			delbakcard(bankid) {
				if (this.flag) return;
				this.$refs.loading.open(); //开启加载
				this.flag = true;
				this.$server
					.post("/user/delbakcard", {
						bankid
					})
					.then((res) => {
						this.$refs.loading.close();

						if (res.status == 1) {
							this.$toast(this.$t("new").a22);
							setTimeout(() => {
								this.initData();
							}, 1500);
						}
					});
			},
			initData() {
				this.$server
					.post("/user/cardList", {
						size: 200,
						page: 1
					}, (failres) => {
						that.bankList = [];
					})
					.then((res) => {
						// this.$refs.firstLoading.close();
						this.isLoading = false;
						this.flag = false;
						var arr = [];
						for (var i in res.data) {
							var row = res.data[i];
							if (row.bank_name != "TRC" && row.bank_name != "ERC") {
								arr.push(row);
							}
						}
						this.bankList = arr;
					});
			},
		},
	};
</script>

<style scoped lang="less">
	.page {
		padding: 0 0.15rem;

		.big_btn {
			margin-top: .44rem;
		}

		.item {
			padding: 0.13rem;
			background: rgba(1,90,164,.1);
			box-shadow: 0 0.01rem 0.2rem 0 rgba(255, 255, 255, 0.35);
			border-radius: 0.07rem;
			overflow: hidden;
			margin-top: .22rem;
			position: relative;

			.item-name {
				font-weight: 400;
				font-size: 0.15rem;
				color: #333;
				line-height: 0.21rem;
				display: flex;
				align-items: center;
			}

			.item-tip {
				font-weight: 400;
				font-size: 0.12rem;
				color: #333;
				line-height: 0.17rem;
				margin-top: .01rem;
				display: flex;
				align-items: center;
			}

			.item-code {
				font-weight: 400;
				font-size: 0.15rem;
				color: #333;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				line-height: 0.21rem;
				margin-top: .48rem;
			}

			.item-del {
				position: absolute;
				right: .13rem;
				top: .13rem
			}
		}
	}
</style>