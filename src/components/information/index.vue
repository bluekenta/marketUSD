<template>
	<!-- 个人 -->
	<div class="page">
		<div class="headerBox">
			<div class="header-top">
				<img src="../../assets/skin/mine/back.png?2" class="header-top-back" @click="goBack" />
				<img src="../../assets/skin/mine/setting.png?2" class="header-top-setting"
					@click="$toPage('/information/setting')" />
			</div>
			<div class="header-middle">
				<img src="../../assets/skin/home/mine.png?2" class="header-middle-img" />
				<div class="header-middle-box">
					<div class="header-middle-name">{{userInfo.account}}</div>
					<div class="header-middle-true" v-if="userInfo.is_true==1"><img
							src="../../assets/skin/mine/true.png?2" />{{$t('mine').j1}}</div>
					<div class="header-middle-false" v-else>{{$t('mine').j2}}</div>
				</div>
			</div>
		</div>
		<div class="middle">
			<div class="middle-title">{{$t("mine").j3}}</div>
			<div class="middle-box">
				<div class="middle-box-item" style="text-align: center" v-for="(item, index) in menu1" :key="index" @click="goUrl(item.url)">
					<img :src="item.img" /><span v-html="item.name"></span>
				</div>
			</div>
		</div>
		<div class="card">
			<div class="card-list" v-for="(item, index) in menu2" :key="index" @click="goUrl(item.url)">
				{{ item.name }}
        <img src="../../assets/skin/mine/arrow.png" />
      </div>
		</div>
		<div class="card">
			<div class="card-list" v-for="(item, index) in menu3" :key="index" @click="goUrl(item.url)">
				{{ item.name }}<img src="../../assets/skin/mine/arrow.png" /></div>
		</div>
		<div class="out" @click="exit"><img src="../../assets/skin/mine/out.png" />{{$t("setting").btn}}</div>
		<loading ref="loading" />
	</div>
</template>

<script>
	export default {
		name: "information",
		props: {},
		data() {
			return {
				show: true,
				loading: true,
				isLoading: false,
				kfUrl: "",
				userInfo: {},
				menu1: [{
						name: this.$t("mine").j4,
						img: require('../../assets/skin/mine/1.png?1'),
						url: "/trade/index",
					},
					{
						name: this.$t("mine").j5,
						img: require('../../assets/skin/mine/2.png?1'),
						url: "/information/wallet",
					},
					{
						name: this.$t("mine").j6,
						img: require('../../assets/skin/mine/31.png?1'),
						url: "/information/fundRecord",
					},
					{
						name: this.$t("mine").j7,
						img: require('../../assets/skin/mine/4.png?1'),
						url: "kefu",
					},
				],
				menu2: [{
						name: this.$t("mine").j8.replace('<br/>',' '),
						url: "/information/authInfo",
					},
					{
						name: this.$t("mine").j9,
						url: "/information/loginPass",
					},
					{
						name: this.$t("mine").j10,
						url: "/information/fundPass",
					},
					{
						name: this.$t("mine").j11,
						url: "/information/bankList",
					},
				],
				menu3: [{
						name: this.$t("mine").j12,
						url: "/information/userInfo",
					},
					{
						name: this.$t("mine").j13,
						url: "/information/changeLang",
					},
					{
						name: this.$t("mine").j14,
						url: "/information/aboutUs",
					},
				],
			};
		},
		computed: {},
		mounted() {
			this.getTotalAssets();
		},
		methods: {
			goBack() {
				this.$router.go(-1);
			},
			goUrl(url) {
				if (url == "kefu") {
					this.goKefu();
				} else {
					this.$toPage(url);
				}
			},
			exit() {
				this.$storage.remove("tokend");
				this.$refs.loading.open();
				setTimeout(() => {
					this.$refs.loading.close();
					this.$toPage("/login/login");
				}, 1000);
			},
			goKefu() {
				this.getConfig();
			},
			async getTotalAssets() {
				const res = await this.$server.post("/user/getUserinfo");
				if (res.status == 1) {
					this.userInfo = res.data;
				}
			},
			async getConfig() {
				this.$refs.loading.open();
				const res = await this.$server.post("/common/config", {
					type: "all"
				});
				let val = {};
				res.data.forEach((vo) => {
					val[vo.name] = vo.value;
				});
				// this.kfUrl = val.kefu;
				this.$refs.loading.close();
				this.$openUrl(val.kefu); //重新获取
			},
		},
	};
</script>

<style scoped lang="less">
	.page {
		background: rgba(245, 245, 245, 1);
		min-height: 100vh;
	}

	.headerBox {
		height: 1.44rem;
		background: #015AA4;
		padding: .17rem .19rem 0 .19rem;

		.header-top {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.header-top-back {
				width: 0.1rem;
				height: .17rem;
			}

			.header-top-setting {
				width: 0.21rem;
				height: .2rem;
			}
		}

		.header-middle {
			height: 0.42rem;
			display: flex;
			align-items: center;
			margin-top: .22rem;

			.header-middle-img {
				width: 0.42rem;
				height: 0.42rem;
			}

			.header-middle-box {
				display: flex;
				flex-direction: column;
				justify-content: center;
				margin-left: .12rem;
			}

			.header-middle-name {
				font-weight: 500;
				font-size: 0.13rem;
				color: #fff;
				line-height: 0.19rem;
			}

			.header-middle-true {
				font-weight: 400;
				font-size: 0.12rem;
				color: #fff;
				line-height: 0.16rem;
				display: flex;
				align-items: center;
				margin-top: .01rem;

				img {
					width: 0.12rem;
					height: 0.13rem;
					margin-right: .06rem;
				}
			}

			.header-middle-false {
				font-weight: 400;
				font-size: 0.12rem;
				color: #999999;
				line-height: 0.16rem;
				margin-top: .01rem;
			}
		}
	}

	.middle {
		background: #FFFFFF;
		border-radius: 0.05rem;
		margin: -.29rem .15rem 0 .15rem;

		.middle-title {
			height: .39rem;
			border-bottom: .01rem solid rgba(247, 247, 247, 1);
			display: flex;
			align-items: center;
			padding: 0 .16rem;
			font-weight: 600;
			font-size: 0.14rem;
			color: #111111;
		}

		.middle-box {
			height: 1.04rem;
			display: flex;
			align-items: center;

			.middle-box-item {
				width: 25%;
				height: 1.04rem;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				font-weight: 400;
				font-size: 0.12rem;
				color: #1D1D1D;
				line-height: 0.17rem;

				img {
					//width: 0.27rem;
					height: 0.24rem;
					object-fit: cover;
					margin-bottom: .05rem;
				}
			}
		}
	}

	.card {
		background: #FFFFFF;
		border-radius: 0.05rem;
		margin: .17rem .15rem 0 .15rem;

		.card-list {
			border-bottom: .01rem solid rgba(247, 247, 247, 1);
			height: .49rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 .13rem;
			font-weight: 400;
			font-size: 0.13rem;
			color: #1D1D1D;

			img {
				width: 0.06rem;
				height: .11rem;
			}
		}
	}

	.out {
		height: 0.5rem;
		background: #FFFFFF;
		border-radius: 0.05rem;
		margin: .17rem .15rem 0 .15rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 400;
		font-size: 0.13rem;
		color: #015AA4;

		img {
			width: 0.18rem;
			height: 0.19rem;
			margin-right: .1rem;
		}
	}
</style>