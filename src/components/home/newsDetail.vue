<template>
	<div class="page ">
		<top-back :title="$t('news').j2"></top-back>
		<div class="cont">
			<div class="top">
				<div class="t">{{ info.title }}</div>
				<div class="t1">
					{{ $formatDate("DD-MM-YYYY hh:mm:ss", info.created * 1000) }}
				</div>
			</div>
			<div class="cot" v-html="info.content"></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "newsDetail",
		props: {},
		data() {
			return {
				info: {},
			};
		},
		components: {},
		methods: {},
		created() {
			let data = this.$storage.get("newsDetail");
			let cont = data.content;
			cont = cont.replace(/\&lt;/g, "<");
			cont = cont.replace(/\&gt;/g, ">");
			cont = cont.replace(/\&quot;/g, '"');
			cont = cont.replace(/\<img/g, '<img style="width:100%"');
      cont = cont.replace('class="image-hero__padding" style="', '');
			this.info = {
				...data,
				content: cont
			};
		},
		computed: {},
	};
</script>

<style scoped lang="less">
	.page {
	}
	.cont{
		background: #FFFFFF;
		border-radius: 0.13rem;
		padding: 0.15rem;
	}
	.top {
		margin-bottom: 0.2rem;
		padding-bottom: 0.1rem;
		border-bottom: 0.01rem solid #EBEBEB;
		.t {
			font-family: PingFangSC, PingFang SC;
			font-weight: 500;
			font-size: 0.15rem;
			color: #333333;
		}

		.t1 {
			font-family: PingFangSC, PingFang SC;
			font-weight: 400;
			font-size: 0.13rem;
			color: #999999;
			margin-top: 0.1rem;
		}
	}

	::v-deep .cot table {
		width: 100% !important;
	}

	::v-deep .cot p,
	::v-deep .cot div,
	::v-deep .cot pre,
	::v-deep .cot font {
		width: 100%;
		font-family: PingFangSC, PingFang SC;
		font-weight: 400;
		font-size: 0.13rem;
		color: #999999;
		line-height: 0.24rem;
		&::nth-child(n) {
			width: 100% !important;
		}
	}
</style>
