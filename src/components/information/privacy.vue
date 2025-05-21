<template>
	<div class="page ">
		<top-back :title="$t('privacy').j1"></top-back>
		<div class="list" v-html="info"></div>
    <no-data v-if="!info"></no-data>
	</div>
</template>

<script>
	export default {
		name: "aboutInfo",
		props: {},
		data() {
			return {
				info: "",
			};
		},
		components: {},
		methods: {
			initData() {
				this.$server.post("/common/wenben", {
						type: this.$stockType,
						name: "用户协议"
					})
					.then((res) => {
						if (res.status == 1) {
							this.info = res.data;
						}
					});
			},
		},
		created() {
			this.initData();
		},
		computed: {},
	};
</script>

<style scoped lang="less">
	.page {
		min-height: 100vh;
	}
	.list {
    padding: 0.15rem;
	}
</style>