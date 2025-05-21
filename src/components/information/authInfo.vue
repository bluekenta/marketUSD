<template>
	<div class="page">
		<top-back :title="$t('mine').j8"></top-back>
		<div class="top"><img src="../../assets/skin/mine/auth.png" /></div>

		<template v-if="isEdit==true">
			<div class="ipt">
				<input v-model="form.true_name" placeholder-style="color: #999" :placeholder="$t('new').a10" />
			</div>
			<div class="ipt">
				<input v-model="form.card_id" placeholder-style="color: #999" :placeholder="$t('new').a12" />
			</div>
			<div class="upload">
				<div class="t">
					{{ $t("new").a13 }}
				</div>
				<div class="flex flex-b" style="padding: 0.12rem 0.12rem 0.16rem;">
					<div class="item flex-column-item">
						<div class="up-item" v-if="!showFrontcard">
							<div class="icon sf animate__animated animate__fadeIn"></div>
						</div>
						<img class="animate__animated animate__fadeIn" v-if="showFrontcard" :src="showFrontcard" />
						<div class="t1 flex flex-c" v-if="!showFrontcard">{{ $t("new").a14 }}</div>
						<input class="inp" accept="image/*" type="file" @change="uploadFile($event, 1)" />
					</div>
					<div class="item flex-column-item">
						<div class="up-item" v-if="!showBackcard">
							<div class="icon sf animate__animated animate__fadeIn"></div>
						</div>
						<img class="animate__animated animate__fadeIn" v-if="showBackcard" :src="showBackcard" />
						<div class="t1 flex flex-c" v-if="!showBackcard">{{ $t("new").a15 }}</div>
						<input class="inp" accept="image/*" type="file" @change="uploadFile($event, 2)" />
					</div>
				</div>
			</div>
			<div class="big_btn animate__animated animate__fadeIn" @click="submit">
				{{ $t("new").a16 }}
			</div>
		</template>

		<template v-if="isEdit==false">
			<div class="true">{{ userInfo.is_true == 1 ? $t("new").a17 : $t("mine").name2 }}</div>
			<div class="true-ipt">{{ form.true_name || "-" }}</div>
			<div class="true-ipt">{{ form.card_id || "-" }}</div>
		</template>

		<loading ref="loading" />
	</div>
</template>

<script>
	import {
		compress
	} from "../../lib/imgutils"
	export default {
		name: "authInfo",
		props: {},
		data() {
			return {
				isEdit: null,
				showFrontcard: "",
				showBackcard: "",
				form: {
					frontcard: "",
					backcard: "",
					true_name: "",
					card_id: "",
				},
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
				this.$server.post("/user/getUserinfo").then((res) => {
					if (res.status == 1) {
						this.userInfo = res.data;
						if (res.data.frontcard) {
							this.showFrontcard = this.$server.url.imgUrls + res.data.frontcard;
							this.showBackcard = this.$server.url.imgUrls + res.data.backcard;
						}
						this.form.true_name = res.data.realname;
						this.form.card_id = res.data.id_card;

						//0未认证 1已实名 2审核失败 3审核中
						if (res.data.is_true == 1 || res.data.is_true == 3) {
							this.isEdit = false;
						}
						if (res.data.is_true == 0 || res.data.is_true == 2) {
							this.isEdit = true;
						}
					}
				});
			},
			submit() {
				if (!this.form.true_name) {
					this.$toast(this.$t("new").a18);
					return;
				}
				if (!this.form.card_id) {
					this.$toast(this.$t("new").a19);
					return;
				}

				if (!this.form.frontcard || !this.form.backcard) {
					this.$toast(this.$t("new").a20);
					return;
				}
				this.$refs.loading.open(); //开启加载

				this.$server
					.post("/user/shiming", {
						id_card: this.form.card_id,
						realname: this.form.true_name,
						frontcard: this.form.frontcard,
						backcard: this.form.backcard,
					})
					.then((res) => {
						this.$refs.loading.close();

						if (res.status == 1) {
							this.$toast(this.$t(res.msg));
							this.initData();
						}
					});
			},
			uploadFile(e, type) {
				var file = e.target.files[0];
				var that = this;
				compress(file, {
					maxWidth: 640
				}, file => {
					var formdata = new FormData();
					formdata.append("card", file);
					this.$refs.loading.open(); //开启加载

					this.$server
						.post("/common/upload1", formdata)
						.then((res) => {
							this.$refs.loading.close();
							if (res.status == 1) {
								this.$toast(this.$t("new").a21);
								if (type == 1) {
									// 正面
									this.showFrontcard = this.$server.url.imgUrls + res.data; //显示用
									this.form.frontcard = res.data; //提交用
								} else {
									// 反面
									this.showBackcard = this.$server.url.imgUrls + res.data;
									this.form.backcard = res.data;
								}
							}
						})
						.catch((data) => {});
				})
			},
		},
	};
</script>

<style scoped lang="less">
	.page {}

	.top {
		height: 0.96rem;
		background: #015AA4;
		display: flex;
		align-items: center;
		justify-content: center;

		img {
			height: .96rem;
		}
	}

	.true {
		height: 0.4rem;
		background: #034b87;
		font-weight: 400;
		font-size: 0.14rem;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.true-ipt {
		height: 0.43rem;
		border-radius: 0.04rem;
		border: 0.01rem solid #E9E9E4;
		display: flex;
		align-items: center;
		font-weight: 400;
		font-size: 0.13rem;
		color: #111111;
		padding: 0 .15rem;
		margin: .2rem .2rem 0 .2rem;
	}

	.ipt {
		height: 0.43rem;
		border-radius: 0.04rem;
		border: 0.01rem solid #E9E9E4;
		display: flex;
		align-items: center;
		padding: 0 .15rem;
		margin: .2rem .2rem 0 .2rem;

		input {
			height: .43rem;
			line-height: .43rem;
			font-weight: 400;
			font-size: 0.13rem;
			color: #111111;
		}
	}

	.upload {
		margin-top: 0.1rem;
		padding: 0 .2rem;

		.t {
			padding: 0.12rem 0;
			font-weight: 400;
			font-size: 0.15rem;
			color: #333;
		}

		.item {
			width: 48%;
			position: relative;
			text-align: center;
			height: 1.01rem;
			background: #FFFFFF;
			border-radius: 0.04rem;
			border: 0.01rem dashed #CBCBCB;
			justify-content: center;

			.up-item {
				position: relative;
				overflow: hidden;
			}

			img {
				width: 1.6rem;
				height: 1rem;
				border-radius: 0.06rem;
			}

			.icon {
				margin: 0 auto;
			}

			.t1 {
				margin-top: 0.08rem;
				font-size: 0.13rem;
				color: #999;
			}
		}

		.inp {
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
			opacity: 0;
		}
	}

	.big_btn {
		margin: .2rem;
	}
</style>