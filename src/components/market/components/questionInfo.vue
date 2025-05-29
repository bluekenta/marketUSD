<template>
	<div>
		<!-- <div class="flex flex-b nav-box">
			<div class="nav-item" :class="{ active: type == item.type }" v-for="(item, i) in typeList" :key="i"
				@click="changeType(item.type)">
				{{ $t(item.name) }}
			</div>
		</div> -->

		<van-list v-model="loading" :finished="finished" :finished-text="$t('new').a51" :loading-text="$t('new').a" @load="onLoad">
			<div class="list">
				<no-data v-if="show"></no-data>
				<div class="item flex flex-b" v-for="(item, i) in list" :key="i" @click="$openUrl(item.link)">
					<div class="img animate__animated animate__fadeIn" v-if="item.image">
						<img :src="item.image" mode="aspectFill" />
					</div>
					<div class="txt">
						<div class="t el">{{ item.title }}</div>
						<div class="t1">{{ item.dt }}</div>
					</div>
				</div>
			</div>
		</van-list>

		<loading ref="loading" />
	</div>
</template>

<script>
	export default {
		name: "questionInfo",
		props: {
			symbol: {
				type: String,
				default: "",
			},
      stockType: {
        type: String,
        default: "",
      },
		},
		data() {
			return {
				show: false,
				loading: false,
				finished: false,
				type: "xiaoxi",
				page: 0,
				typeList: [{
						name: "消息",
						type: "xiaoxi",
					},
					{
						name: "披露",
						type: "pilou",
					},
					{
						name: "红外",
						type: "hongwai",
					},
					{
						name: "报告",
						type: "baogao",
					},
				],
				list: [
					// {
					// 	title:"Asya borsalarında satış eğilimi devam ediyor",
					// 	dt:1722830580,
					// 	image:"https://imgs.lofkgg.xyz/images/tr/5c5f86f081edb9f6b0404a8a55b81274.jpg"
					// },
				],
			};
		},
		created() {},
		methods: {
			onLoad() {
				this.page += 1;
				this.getInfo();
			},
			changeType(type) {
				this.type = type;
				this.page = 0;
				this.list = [];
				this.getInfo();
				this.$refs.loading.open(); //开启加载
			},
			getInfo() {
				this.$refs.loading.open(); //开启加载

				this.$server
					.post("/parameter/wenti", {
						symbol: this.symbol,
						type: this.type,
						page: this.page,
					})
					.then((res) => {
						this.loading = false;
						if (res.status == 1) {
							this.$refs.loading.close(); //关闭加载

							let data = [];
							// 前面两项返回数据结构不同
							if (this.type == "xiaoxi" || this.type == "pilou") {
								data = res.data.data;
							} else {
								data = res.data;
							}
							data.forEach((item) => {
								// item.dt = this.formatDate('YYYY.MM.DD hh:mm:ss', new Date(item.dt).getTime());
								item.dt = this.$getTimeData(item.dt);
							});
							this.list = [...this.list, ...data];
							if (this.list.length !== 0 && data.length == 0) {
								this.finished = true; //结束列表加载
							}
							if (this.list.length == 0 && data.length == 0) {
								this.show = true; //显示暂无数据
							}
						}
					});
			},
			formatDate(fmt, date) {
				let ret;
				date = new Date(date);
				const opt = {
					"Y+": date.getFullYear().toString(), // 年
					"M+": (date.getMonth() + 1).toString(), // 月
					"D+": date.getDate().toString(), // 日
					"h+": date.getHours().toString(), // 时
					"m+": date.getMinutes().toString(), // 分
					"s+": date.getSeconds().toString(), // 秒
					// 有其他格式化字符需求可以继续添加，必须转化成字符串
				};
				for (let k in opt) {
					ret = new RegExp("(" + k + ")").exec(fmt);
					if (ret) {
						fmt = fmt.replace(
							ret[1],
							ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
						);
					}
				}
				return fmt;
			},
		},
	};
</script>

<style scoped lang="less">
	.nav-box {
		padding: 0.1rem;
		background: #ffffff;
		box-shadow: 0rem 0.02rem 0.02rem 0rem rgba(149, 149, 149, 0.25);

		// margin-bottom: 0.1rem;
		.nav-item {
			background: #ededed;
			font-size: 0.12rem;
			color: #424242;
			border-radius: 0.3rem;
			padding: 0.05rem 0.1rem;
			width: 40%;
			text-align: center;

			&.active {
				font-size: 0.12rem;
				color: #ffffff;
				background: #6970af;
			}
		}
	}

	.el {
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		/* 显示2行文本 */
	}

	.list {
		margin: 0.12rem;
		
		.item {
			padding: 0.1rem 0;
			border-bottom: 0.01rem solid #f4f4f4;

			.img {
				margin-right: 0.12rem;
				img {
					width: 1.15rem;
					height: 0.76rem;
					border-radius: 0.1rem;
					// object-fit: contain;
					object-fit: cover;
				}
			}

			.txt {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.t {
					font-family: PingFangSC, PingFang SC;
					font-weight: 400;
					font-size: 0.16rem;
					color: #0C061C;
				}

				.t1 {
					margin-top: 0.1rem;
					font-family: PingFangSC, PingFang SC;
					font-weight: 400;
					font-size: 0.13rem;
					color: #999999;
				}
			}
		}
	}

	.tab {
		padding: 0 20px 30px;

		.tab-item {
			background: #f1f2f4;
			border-radius: 10px;
			color: #999999;
			height: 60px;
			line-height: 60px;
			text-align: center;
			width: 20%;
			margin-right: 20px;

			&.active {
				background: #e7f1f9;
				color: #014b8d;
			}
		}
	}
</style>