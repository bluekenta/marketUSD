<template>
	<div class="page ">
		<top-back :title="$t('capitalChannel').title"></top-back>
		<div class="top"></div>
		<div class="card">{{ $t("capitalChannel").txt4 }}<span>{{ $formatMoney(money) }}</span></div>
		<div class="nav-box">
			<div class="nav-item" v-for="(item, index) in logList" :key="index"
				:class="{ active: currmentIndex == index }" @click="changeNav(item, index)">
				{{ $t("capitalChannel").tit1 }}{{ index + 1 }}<span></span>
			</div>
		</div>
		<div v-if="logList.length">
			<div class="list">{{ logList[currmentIndex].name }}<img src="../../assets/skin/mine/copy.png"
					@click="copy(logList[currmentIndex].name)" /></div>
			<div class="list">{{ logList[currmentIndex].bankcard }}<img src="../../assets/skin/mine/copy.png"
					@click="copy(logList[currmentIndex].bankcard)" /></div>
			<div class="list">{{ logList[currmentIndex].bankname }}<img src="../../assets/skin/mine/copy.png"
					@click="copy(logList[currmentIndex].bankname)" /></div>
		</div>
		
		<div class="upload">
			<div class="up-box flex flex-c">
				<div v-if="!showFrontcard">
					<div class="t">+</div>
					<div class="t1">{{ $t("new").a47 }}</div>
				</div>
				<img v-if="showFrontcard" :src="showFrontcard" />
				<input class="inp" accept="image/*" type="file" @change="uploadFile($event)" />
			</div>
		</div>
		<div class="big_btn animate__animated animate__fadeIn" @click="chongzhi">{{ $t("new").a30 }}</div>
		<loading ref="loading" />
	</div>
</template>

<script>
	export default {
		name: "rechargeChannel",
		props: {},
		data() {
			return {
				money: "",
				logList: [],
				currmentIndex: 0,
				showFrontcard: "",
				form: {
					frontcard: "",
				},
				userInfo: {},
				totalAssets: 0, //总资产
				freezeAssets: 0, //冻结资金
				stockType: 'usd'
			};
		},
		components: {},
		created() {
			this.stockType = this.$route.query.stockType||'usd';
			this.money = this.$route.query.money;
			this.initData();
			this.getUserInfo();
		},
		computed: {},
		methods: {
			initData() {
				let per = {
					type: this.$stockType,
				};
				this.$server.post("/common/recharge_channel", per).then((res) => {
					let arr = [];
					for (let key in res.data) {
						let obj = res.data[key];

						if (obj.name) {
							if (obj.name.indexOf(":") > -1) {
								let arr = obj.name.split(":");
								obj.title = arr[0];
								obj.name = arr[1];
							}
							arr.push(obj);
						}
					}
					this.logList = arr;
				});
			},
			getUserInfo() {
				this.$server.post("/user/getUserinfo", {}).then((res) => {
					if (res.status == 1) {
						this.userInfo = res.data;
					}
				});
			},
			changeNav(item, index) {
				this.currmentIndex = index;
			},
			chongzhi() {
				if (!this.showFrontcard) {
					this.$toast(this.$t("new").a47);
					return;
				}

				let per = {};
				per = {
					money: this.money,
					type: this.stockType,
				};
				per.rjpz = this.form.frontcard;
				this.$refs.loading.open(); //开启加载

				this.$server.post("/user/chongzhi", per).then((res) => {
					this.$refs.loading.close();
					if (res.status == 1) {
						this.$toast(this.$t(res.msg));
						this.showFrontcard = "";
					}
				});
			},
			uploadFile(e) {
				var file = e.target.files[0];
				var that = this;
				var formdata = new FormData();
				formdata.append("card", file);
				this.$refs.loading.open(); //开启加载

				this.$server
					.post("/common/upload1", formdata)
					.then((res) => {
						this.$refs.loading.close();
						if (res.status == 1) {
							this.$toast(this.$t("new").a21);
							// 正面
							this.showFrontcard = this.$server.url.imgUrls + res.data; //显示用
							this.form.frontcard = res.data; //提交用
						}
					})
					.catch((data) => {});
			},
			copy(text) {
				let textarea = document.createElement("textarea");
				textarea.value = text;
				textarea.readOnly = "readOnly";
				document.body.appendChild(textarea);
				textarea.select(); // 选中文本内容
				textarea.setSelectionRange(0, text.length); // 设置选定区的开始和结束点
				this.$toast(this.$t("capitalChannel").tit3);
				var result = document.execCommand("copy"); //将当前选中区复制到剪贴板
				textarea.remove();
			},
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
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: .13rem;
		font-weight: 400;
		font-size: 0.13rem;
		color: #989898;
		line-height: 0.19rem;

		span {
			font-weight: 600;
			font-size: 0.27rem;
			color: #111111;
			line-height: 0.38rem;
			margin-top: .11rem;
		}
	}

	.nav-box {
		height: .47rem;
		display: flex;
		align-items: flex-end;
		margin-top: .1rem;

		.nav-item {
			padding: 0 .14rem;
			height: .47rem;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			align-items: center;
			font-weight: 500;
			font-size: 0.13rem;
			color: rgba(152, 152, 152, 1);
			line-height: 0.19rem;

			span {
				width: 0.27rem;
				height: 0.04rem;
				background: transparent;
				border-radius: 0.02rem;
				display: block;
				margin-top: .1rem;
			}

			&.active {
				color: rgba(17, 17, 17, 1);

				span {
					background: #015AA4;
				}
			}
		}
	}

	.list {
		height: 0.43rem;
		background: #F5F5F3;
		border-radius: 0.04rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 .23rem;
		font-weight: 400;
		font-size: 0.13rem;
		color: #666666;
		margin: .22rem .15rem 0 .15rem;

		img {
			width: 0.16rem;
			height: 0.17rem;
			margin-left: .1rem;
		}
	}

	.upload {
		padding: 0 .15rem;
		margin-top: .2rem;

		.up-box {
			width: 100%;
			height: 1.2rem;
			position: relative;
			margin: 0 auto;
			border-radius: 0.04rem;
			border: 0.01rem solid #f1f1f1;

			text-align: center;

			.t {
				font-weight: bold;
				font-size: 0.2rem;
			}

			.t1 {
				font-weight: 500;
				font-size: 0.12rem;
				color: #353535;
			}

			img {
				width: 1rem;
				height: 1rem;
			}
		}
	}

	.big_btn {
		margin: .2rem .15rem 0 .15rem;
	}

	.inp {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		opacity: 0;
	}
</style>