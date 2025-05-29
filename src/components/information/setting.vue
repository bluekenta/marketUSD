<template>
	<div class="page ">
		<top-back :title="$t('setting').title"></top-back>

		<div class="list">
			<div class="title">{{ $t('账户管理') }}</div>
			<div class="item flex flex-b">
				<div class="t">{{ $t("setting").txt1 }}</div>
				<div class="t1">{{ userInfo.realname }}</div>
			</div>
			<div class="item flex flex-b">
				<div class="t">{{ $t("setting").txt2 }}</div>
				<div class="t1">{{ userInfo.account }}</div>
			</div>
		</div>

		<div class="list">
			<div class="title">{{ $t('安全设置') }}</div>
			<div class="item flex flex-b" @click="$toDetail('/information/loginPass') ">
				<div class="t">{{ $t('setting').txt3 }}</div>
				<div class="icon jt1"></div>
			</div>

			<div class="item flex flex-b" @click="$toDetail('/information/fundPass') ">
				<div class="t">{{ $t('setting').txt4 }}</div>
				<div class="icon jt1"></div>
			</div>
		</div>

		<div class="b-btn" @click="exit" v-if="false">
			{{ $t("退出") }}
		</div>

		<loading ref="loading" />
	</div>
</template>

<script>
	export default {
		name: "setting",
		props: {},
		data() {
			return {
				userInfo: {},
			};
		},
		components: {},
		created() {
			this.initData();
		},
		computed: {},
		methods: {
			initData() {
				this.$server.post("/user/getUserinfo", {}).then((res) => {
					if (res.status == 1) {
						this.userInfo = res.data;
					}
				});
			},
			exit() {
				this.$storage.remove("account");
				this.$storage.remove("tokend");
				this.$refs.loading.open();
				setTimeout(() => {
					this.$refs.loading.close();
					this.$toPage("/login/start1");
				}, 1000);
			},
		},
	};
</script>

<style scoped lang="less">
	.page {
    padding: 0 .15rem;
		min-height: 100vh;
    background: rgba(245, 245, 245, 1);

		.list {
			margin-top: .2rem;
			background: #fff;
			border-radius: 0.13rem;
			.title {
				font-weight: 600;
				font-size: .13rem;
				color: #000;
				padding: 0.12rem;
				margin-bottom: 0.1rem;
				border-bottom: 0.01rem solid rgba(247, 247, 247, 1);
			}

			.item {
				padding: 0 0.12rem 0.2rem;
				border-radius: 0.08rem;
				&:last-child {
					border-bottom: none;
				}
				.t{
					font-weight: 400;
					font-size: 0.14rem;
					color: #999999;
				}
				 
				.t1{
					font-weight: 400;
					font-size: 0.12rem;
					color: #333333;
				}
			}
		}
	}
</style>