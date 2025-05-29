<template>
	<div class="page ">
		<top-back :title="$t('new').a39"></top-back>

		<div class="list-box">
			<div class="list-item">
				<div>
					<div class="t">{{ item.title }}</div>
					<div class="time" v-if="item.create_time">
						{{ $formatDate("DD-MM-YYYY hh:mm", item.create_time * 1000) }}
					</div>
				</div>
				<div class="cot" v-html="item.content"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "msgInfo",
		data() {
			return {
				item: {},
			};
		},
		computed: {},
		components: {},
		created() {
			let id = this.$route.query.id;
			this.initData(id);
		},

		methods: {
			initData(id) {
				this.$server
					.post("/user/noticedetail", {
						id,
					})
					.then((res) => {
						if (res.status == 1) {
							this.item = res.data;
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

	.t {
		font-weight: bold;
	}

	.list-box {

		.t {
			font-size: 0.14rem;
			color: #000000;
			font-weight: bold;
		}

		.time {
			font-size: 0.12rem;
			color: #999;
			margin-top: 0.1rem;
		}

		.cot {
			margin-top: 0.2rem;
		}
	}
</style>
