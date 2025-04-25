<template>
	<div class="headerBox">
		<div class="header" @click="goBack">
			<div class="header-left">
				<img src="../../assets/skin/mine/back.png?2" />
				{{ title }}
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "topBack",
		props: {
			title: {
				type: String,
				default: "",
			},
		},
		data() {
			return {};
		},
		components: {},
		created() {},
		computed: {},
		methods: {
			goBack() {
				this.$router.go(-1);
			},
		},
	};
</script>

<style scoped lang="less">
	.headerBox {
		height: 0.58rem;
	}

	.header {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		padding: 0 0.2rem;
		background: #015AA4;
		height: 0.58rem;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.header-left {
			display: flex;
			align-items: center;
			font-weight: 600;
			font-size: 0.16rem;
			color: #fff;

			img {
				width: .1rem;
				//height: .16rem;
				margin-right: .16rem;
			}
		}

		.icon {
			position: absolute;
			top: .15rem;
			left: .16rem;
		}

		.t {
			font-family: PingFangSC, PingFang SC;
			font-weight: 600;
			font-size: 0.17rem;
			color: #111111;
		}
	}
</style>