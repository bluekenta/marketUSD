<template>
	<div class="page">
		<div class="title" style="opacity: 0">
			<img class="img" :src="$cfg.logo" />
			<div class="title">{{$cfg.title}}</div>
		</div>
		<div class="bottom" style="opacity: 0">{{$t('start').j1}}</div>
	</div>
</template>

<script>
	export default {
		name: "start",
		props: {},
		data() {
			return {};
		},
		components: {},
		mounted() {
			this.setInt();

		},
		methods: {
			setInt() {
				setTimeout(() => {
					this.startTime();
				}, 5000);
			},
			startTime() {
				if (localStorage.getItem("tokend") && localStorage.getItem("account")) {
					this.$toPage("/home/index");
				} else {
					this.$toPage("/login/login");
				}
			},
		},
	};
</script>

<style scoped lang="less">
	.page {
		min-height: 100vh;
    background: url("../../assets/start12.png");
    background-size: cover;
		padding: 1.2rem 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;

		.title {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-weight: 600;
			font-size: 0.25rem;
			color: #fff;
			line-height: 0.35rem;

			img {
				width: 0.81rem;
				height: 0.81rem;
				border-radius: .1rem;
				object-fit: contain;
				margin-bottom: .28rem;
			}
		}

		.bottom {
			font-weight: 600;
			font-size: 0.27rem;
			color: #fff;
			line-height: 0.38rem;
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;
			padding: 0 .1rem;
		}
	}
</style>