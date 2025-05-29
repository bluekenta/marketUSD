<template>
	<div class="page tutor">
		<top-back :title="$t('home').j4"></top-back>
		<div class="record" @click="$toPage('/tutor/tutorRecord')">
			<svg t="1745631762959" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4569" width="28" height="28">
				<path d="M731.99104 136.86272v49.76128a97.1776 97.1776 0 0 1 71.82848 93.61408v531.56864c-0.11776 53.64224-43.63776 97.06496-97.28512 97.06496H317.40928c-53.64224 0-97.16224-43.42272-97.28-97.06496V280.23808c0-44.73344 30.54592-82.40128 71.82336-93.61408v-49.76128C222.3616 149.16608 171.60192 209.57696 171.46368 280.23808v531.56864c0 80.3072 65.4848 145.62816 145.9456 145.62816h389.17632c80.4864 0 145.77664-65.152 145.95584-145.62816V280.23808c-0.18944-70.66112-50.95936-131.05664-120.5504-143.37536zM365.92128 244.83328c28.80512 0 52.17792-22.26688 52.17792-49.7152v-78.848c0-27.44832-23.36768-49.71008-52.17792-49.71008-28.86656 0-52.23424 22.21056-52.23424 49.71008v78.84288c0.00512 27.45344 23.41888 49.72032 52.23424 49.72032z m294.30272 0c28.81536 0 52.18304-22.26688 52.18304-49.7152v-78.848c0-27.44832-23.36768-49.71008-52.18304-49.71008-28.86656 0-52.224 22.21056-52.224 49.71008v78.84288c0 27.45344 23.36256 49.72032 52.224 49.72032zM440.15104 183.1168h143.69792V134.5536H440.15104v48.5632z m299.22816 237.89568a29.1328 29.1328 0 0 1-29.12256 29.12768H313.74336a29.12768 29.12768 0 0 1-0.03072-58.25024h396.49792a29.1328 29.1328 0 0 1 29.16864 29.12256z m0 171.0848a29.12256 29.12256 0 0 1-29.12256 29.12768H313.74336a29.12256 29.12256 0 0 1-29.13792-29.12256 29.12256 29.12256 0 0 1 29.1072-29.14304h396.49792a29.14304 29.14304 0 0 1 29.16864 29.13792z m0 171.14624a29.12256 29.12256 0 0 1-29.12256 29.12256H313.74336a29.11744 29.11744 0 0 1-29.13792-29.11232 29.12256 29.12256 0 0 1 29.1072-29.14304h396.49792a29.14816 29.14816 0 0 1 29.16864 29.1328z" fill="#fff" p-id="4570"></path>
				</svg>
		</div>
		<div class="tab">
			<div class="top-box">
				<div class="tab-item" v-for="(item, index) in navList" :key="index"
					:class="{ active: currmentIndex == item.type }" @click="changeNav(item.type)">
					{{ item.name }}
				</div>
			</div>
		</div>
		<no-data v-if="isShow"></no-data>
		<div class="item" v-for="(item, index) in chooseList" :key="index">
			<div class="item-top">
				<img :src="item.avatar" />
				{{item.name}}
			</div>
			<div class="item-middle">
				<div class="item-middle-left">
					<div class="item-middle-txt">{{$t('home').j15}}</div>
					<div class="item-middle-num">{{$formatMoney(item.lsyl)}}<span>{{$formatMoney(item.lsylbfb)}}%</span>
					</div>
				</div>
				<div class="item-middle-right" @click="toDetails(item)">{{$t('home').j19}}</div>
			</div>
			<div class="item-foot">
				<div class="item-list flex-start">{{$t('home').j16}}<span>{{item.shenglv}}%</span></div>
				<div class="item-list">{{$t('home').j17}}<span>{{$formatMoney(item.gendangm)}}</span></div>
				<div class="item-list flex-end">{{$t('home').j18}}<span>{{$formatMoney(item.zxgdje)}}</span></div>
			</div>
		</div>
		<first-loading ref="firstLoading"></first-loading>
		<loading ref="loading" />
	</div>
</template>

<script>
	export default {
		name: "tutor",
		data() {
			return {
				show1: false,
				isShow: false,
				isLoading: false,
				navList: [{
						name: this.$t("home").j12,
						type: 0
					},
					{
						name: this.$t("home").j13,
						type: 1
					},
					{
						name: this.$t("home").j14,
						type: 2
					},
				],
				currmentIndex: 0,
				stockObj: {},
				chooseList: [],
				show: false,
				buyObj: {
					handle: "",
				},
				stockType:''
			};
		},
		computed: {},
		mounted() {
			this.stockType = window.localStorage.getItem('stockType')||'usd';
			this.getNew();
			this.$refs.firstLoading.open();
		},

		methods: {
			changeNav(index) {
				this.currmentIndex = index;
				this.getNew()
			},
			// 下拉刷新
			onRefresh() {
				this.isShow = false;
				this.getNew();
			},
			getNew() {
				this.$server.post("/trade/aidaoshi", {
					dsjb: this.currmentIndex,
					type: this.stockType
				}).then((res) => {
					this.isLoading = false;
					this.$refs.firstLoading.close(); //关闭初始加载的效果

					res.data.forEach((vo) => {
						let now = Date.now() * 0.001;
						vo.state = now > vo.end ? -1 : now > vo.end ? 1 : 0;
					});
					this.chooseList = res.data;
					console.log(this.chooseList, 444444)
					if (!this.chooseList.length) {
						this.isShow = true;
					}
				});
			},
			toDetails(obj) {
				localStorage.setItem("tutorInfo", JSON.stringify(obj));
				this.$toPage('/tutor/info');
			},
		},
	};
</script>
<style scoped lang="less">
	.tutor {
		.record{
			position: fixed;top: .14rem;right: .15rem;z-index: 999;
			
		}
		.tab {
			width: 100%;
			height: .58rem;
			background: #015AA4;
		
			.top-box {
				width: 100%;
				height: .58rem;
				display: flex;
				align-items: center;
				overflow-x: scroll;
				scrollbar-width: none;
				scrollbar-color: transparent transparent;
			}
		
			.tab-item {
				font-weight: 500;
				font-size: 0.13rem;
				color: rgba(255, 255, 255, .5);
				padding: 0 .15rem;
				display: flex;
				align-items: center;
				justify-content: center;
				white-space: nowrap;
		
				&.active {
					font-weight: 500;
					font-size: 0.13rem;
					color: #fff;
				}
			}
		}
		
		.item {
			padding: .15rem;
			border-bottom: .01rem solid rgba(247, 247, 247, 1);
		
			.item-top {
				display: flex;
				align-items: center;
				font-weight: 500;
				font-size: 0.15rem;
				color: #333333;
		
				img {
					width: 0.35rem;
					height: 0.35rem;
					border-radius: 50%;
					object-fit: cover;
					margin-right: .08rem;
				}
			}
		
			.item-middle {
				margin-top: .19rem;
				display: flex;
				align-items: center;
				justify-content: space-between;
		
				.item-middle-left {
					display: flex;
					flex-direction: column;
					justify-content: center;
				}
		
				.item-middle-txt {
					font-weight: 400;
					font-size: 0.12rem;
					color: #777777;
					line-height: 0.17rem;
				}
		
				.item-middle-num {
					font-weight: 600;
					font-size: 0.19rem;
					color: #41BC9A;
					line-height: 0.27rem;
					display: flex;
					align-items: center;
		
					span {
						font-weight: 400;
						font-size: 0.13rem;
						color: #41BC9A;
						padding-left: .1rem;
					}
				}
		
				.item-middle-right {
					height: 0.25rem;
					background: #015AA4;
					border-radius: 0.04rem;
					display: flex;
					align-items: center;
					justify-content: center;
					font-weight: 400;
					font-size: 0.12rem;
					color: #fff;
					padding: 0 .15rem;
				}
			}
		
			.item-foot {
				margin-top: .13rem;
				display: flex;
				align-items: center;
			}
		
			.item-list {
				width: calc(100% / 3);
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				font-weight: 400;
				font-size: 0.1rem;
				color: #999999;
				line-height: 0.14rem;
		
				span {
					font-weight: 600;
					font-size: 0.13rem;
					color: #333333;
					line-height: 0.19rem;
				}
			}
		
			.flex-start {
				align-items: flex-start;
			}
		
			.flex-end {
				align-items: flex-end;
			}
		}
	}

	
</style>