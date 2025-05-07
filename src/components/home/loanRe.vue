<template>
	<div class="page">
		<top-back :title="$t('贷款记录')"></top-back>
		<div style="height: .5rem;"></div>
		<div class="card">
			<div class="card-item" v-for="(item, index) in reList" :key="index">
				<div class="card-row">
					<span class="card-name">{{ item.order_number }}</span>
					<span class="card-value">{{ $formatMoney(item.money, 0) }}</span>
				</div>
				<div class="card-row">
					<span class="card-time">{{ $formatDate('YYYY/MM/DD hh:mm:ss', new Date(item.create_time *1000).getTime()) }}</span>
					<span class="card-status">{{ $t(stateList[item.status]) || '-' }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				reList: [
					// {
					// 	order_number:1122222,
					// 	money:100,
					// 	create_time:1333333,
					// 	status:'審核中'
					// }
				],
				stateList: [this.$t('审核中'), this.$t('已通过'),this.$t('已拒绝')],
				stockType:'mxn'
			};
		},
		components: {},
		created() {
			if(this.$route.query.stockType){
				this.stockType = this.$route.query.stockType
			}
			this.getReList();
		},
		methods: {
			getReList() {
				this.$server.post("/user/loanlist", {
					type: this.stockType
				}).then((res) => {
					if (res.status == 1) {
						this.reList = res.data;
					}
				});
			}
		}
	};
</script>

<style scoped lang="less">
	.page {
		min-height: 100vh;
	}
	::v-deep .uni-input-input {
		font-size: 28rpx;
		font-weight: 400;
		color: #000;
	}

	.card {
		margin: 0.15rem;
		.card-item {
			background: #F6F6F6;
			border-radius: 0.16rem;
			padding: 0.12rem;
			margin-bottom: 0.1rem;
			.card-row {
				width: 100%;
				padding: 0.05rem 0;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.card-name {
					font-family: PingFangSC, PingFang SC;
					font-weight: 400;
					font-size: 0.15rem;
					color: #000000;
				}

				.card-value {
					font-family: DINPro, DINPro;
					font-weight: 500;
					font-size: 0.16rem;
					color: #343EDF;
				}

				.card-time {
					font-family: PingFangSC, PingFang SC;
					font-weight: 400;
					font-size: 0.13rem;
					color: #666666;
				}

				.card-status {
					font-family: PingFangSC, PingFang SC;
					font-weight: 400;
					font-size: 0.13rem;
					color: #333333;
				}
			}
		}
	}
</style>