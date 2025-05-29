<template>
	<div class="cot">
		<div class="flex flex-b tab">
			<div class="tab-item" :class="{ active: type == item.type }" v-for="(item, i) in typeList" :key="i"
				@click="changeType(item.type)">{{ $t(item.name) }}</div>
		</div>

		<div class="list">
			<no-data v-if="!list.length"></no-data>
			<div class="item flex flex-b" v-for="(item, i) in list" :key="i" @click="$openUrl(item.link)">
				<div class="img animate__animated animate__fadeIn" v-if="item.image">
					<img :src="item.image"></img>
				</div>

				<div v-else class="line animate__animated animate__fadeIn">
				</div>

				<div class="flex-2">
					<div class="t el">{{ item.title }}</div>
					<div class="t1">{{ item.dt }}</div>
				</div>

			</div>
		</div>
		<loading ref="loading" />

	</div>
</template>

<script>
	export default {
		name: 'marketProblem',
		props: {
			symbol: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				type: '',
				page: 0,
				typeList: [{
						name: '消息',
						type: ''
					},
					{
						name: '市场',
						type: 'market'
					},
					{
						name: '经济',
						type: 'economy'
					},
					{
						name: '行业',
						type: 'industry'
					},
					{
						name: '纽带',
						type: 'bond'
					},
					// {
					//   name: '推导',
					//   type: 'derivative'
					// },
					// {
					//   name: '企业',
					//   type: 'company'
					// },
					// {
					//   name: '投资',
					//   type: 'investment'
					// }
				],
				list: []
			};
		},
		created() {

		},
		mounted() {
			this.getInfo();
		},
		methods: {
			changeType(type) {
				this.type = type;
				this.page = 0;
				this.list = [];
				this.getInfo();
			},
			reachBottom() {
				this.page += 1;
				this.getInfo();
			},
			getInfo() {
				this.$refs.loading.open(); //开启加载
				this.$server
					.post('/parameter/scxw', {
						type: this.type,
						page: this.page,
					}).then(res => {
						this.$refs.loading && this.$refs.loading.close();
						if (res.status == 1) {
							let data = [];
							// 前面两项返回数据结构不同
							if (this.type == '') {
								data = res.data.data;
							} else {
								data = res.data;
							}
							data.forEach(item => {
								// item.dt = this.formatDate('YYYY.MM.DD hh:mm:ss', new Date(item.dt).getTime());
								item.dt = this.$getTimeData(item.dt);
							});
							this.list = [...this.list, ...data];
						}
					});
			},
			formatDate(fmt, date) {
				let ret;
				date = new Date(date);
				const opt = {
					'Y+': date.getFullYear().toString(), // 年
					'M+': (date.getMonth() + 1).toString(), // 月
					'D+': date.getDate().toString(), // 日
					'h+': date.getHours().toString(), // 时
					'm+': date.getMinutes().toString(), // 分
					's+': date.getSeconds().toString() // 秒
					// 有其他格式化字符需求可以继续添加，必须转化成字符串
				};
				for (let k in opt) {
					ret = new RegExp('(' + k + ')').exec(fmt);
					if (ret) {
						fmt = fmt.replace(ret[1], ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'));
					}
				}
				return fmt;
			}
		}
	};
</script>

<style scoped lang="less">
	::-webkit-scrollbar {
		display: none;
	}
	.cot{
		margin: 0 0.12rem;
		background: #FFFFFF;
		border-radius: 0.13rem;
	}
	.el {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		/* 显示2行文本 */
	}

	.list {
		.item {
			padding: .12rem;
			.img {
				width: 1.15rem;
				height: 0.76rem;
				margin-right: .1rem;

				img {
					width: 1.15rem;
					height: 0.76rem;
					border-radius: 0.1rem;
				}
			}

			.line {
				width: 0.03rem;
				height: 0.4rem;
				background: #6970AF;
				margin-right: 0.1rem;
			}

			.t {
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				font-size: 0.14rem;
				color: #0C061C;
			}

			.t1 {
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				font-size: 0.13rem;
				color: #999999;
				margin-top: .1rem;
			}
		}
	}

	.tab {
		padding: 0.12rem;
		border-bottom: 0.01rem solid #E4EAF1;

		.tab-item {
			margin-right: 0.2rem;
			font-family: PingFangSC, PingFang SC;
			font-weight: 400;
			font-size: 0.15rem;
			color: #999999;
			text-align: center;
			text-align: center;
			padding: 0.05rem 0;

			&.active {
				font-family: PingFangSC, PingFang SC;
				font-weight: 500;
				font-size: 0.15rem;
				color: #111111;
				position: relative;
				&::after{
					position: absolute;
					content: '';
					left: 0;
					bottom: -0.12rem;
					width: 100%;
					height: 0.02rem;
					background: #E10414;
				}
			}
		}
	}
</style>
