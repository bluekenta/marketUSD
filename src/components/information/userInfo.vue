<template>
	<div class="page ">
		<top-back :title="$t('new').a48"></top-back>

		<div class="list-box">
			<div class="list-item flex flex-b" v-for="(item, i) in list" :key="i" @click="toMsgInfo(item)">
				<div>
					<div class="t">{{ item.title }}</div>
					<div class="time">
						{{ $formatDate("DD-MM-YYYY hh:mm", item.create_time * 1000) }}
					</div>
				</div>
				<div class="icon jt1"></div>
			</div>

			<no-data v-if="show"></no-data>
		</div>

		<first-loading ref="firstLoading"></first-loading>
	</div>
</template>

<script>
	export default {
		name: "userInfo",
		data() {
			return {
				show: false,
				list: [],
			};
		},
		computed: {},
		components: {},
		created() {
			this.initData();
		},
		mounted() {
			this.$refs.firstLoading.open();
		},
		methods: {
			toMsgInfo(item) {
				this.$toPage(`/information/msgInfo?id=${item.id}`);
			},
			initData() {
				this.$server.post("/user/notice").then((res) => {
					this.$refs.firstLoading.close();
					if (res.status == 1) {
						this.list = res.data;
						if (!this.list.length) {
							this.show = true;
						}
					}
				});
			},
		},
	};
</script>

<style scoped lang="less">
	.page {
		padding: 0.15rem;
	}

	.list-box {

		.list-item {
			border-bottom: 0.01rem solid #f5f5f5;
			padding: .1rem 0;
			&:last-child {
				border-bottom: none;
			}

			.t {
				font-size: 0.14rem;
				color: #000000;
				font-weight: bold;
			}

			.time {
				font-size: 0.12rem;
				color: #999;
				margin-top: 0.06rem;
			}
		}
	}
</style>
