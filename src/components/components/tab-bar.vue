<template>
	<div class="tabss"><!-- 底部导航 -->
		<div class="item" @click="$toPage('/home/index')">
			<span class="item-box" v-if="current == 0"><img src="../../assets/skin/menu/1-on.png?1" /></span>
			<template v-else>
				<img class="item-img" src="../../assets/skin/menu/1.png?1" />
				<span class="item-txt">{{ $t("menu").j1 }}</span>
			</template>
		</div>
		<div class="item" @click="$toPage('/market/index')">
			<span class="item-box" v-if="current == 1"><img src="../../assets/skin/menu/2-on.png?1" /></span>
			<template v-else>
				<img class="item-img" src="../../assets/skin/menu/2.png?1" />
				<span class="item-txt">{{ $t("menu").j2 }}</span>
			</template>
		</div>
		<div class="item" @click="$toPage('/trade/index')">
			<span class="item-box" v-if="current == 2"><img src="../../assets/skin/menu/3-on.png?1" /></span>
			<template v-else>
				<img class="item-img" src="../../assets/skin/menu/3.png?1" />
				<span class="item-txt">{{ $t("menu").j3 }}</span>
			</template>
		</div>
		<div class="item" @click="$toPage('/home/newsList')">
			<span class="item-box" v-if="current == 3"><img src="../../assets/skin/menu/4-on.png?1" /></span>
			<template v-else>
				<img class="item-img" src="../../assets/skin/menu/4.png?1" />
				<span class="item-txt">{{ $t("menu").j4 }}</span>
			</template>
		</div>
		<div class="item" @click="$toPage('/information/wallet')">
			<span class="item-box" v-if="current == 4"><img src="../../assets/skin/menu/5-on.png?1" /></span>
			<template v-else>
				<img class="item-img" src="../../assets/skin/menu/5.png?1" />
				<span class="item-txt">{{ $t("menu").j5 }}</span>
			</template>
		</div>
	</div>
</template>

<script>
	export default {
		name: "tab-bar",
		props: {
			current: {
				type: Number,
				default: "",
			},
		},
		data() {
			return {};
		},
		components: {},
		methods: {},
		created() {},
		computed: {},
	};
</script>

<style scoped lang="less">
	.tabss {
		width: 100%;
		height: 0.75rem;
		background: rgba(255, 255, 255, 1);
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 999;
		display: flex;
		align-items: center;

		.item {
			width: 20%;
			height: 0.75rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			line-height: 0.14rem;

			.item-img {
				width: 0.2rem;
				height: 0.2rem;
				margin-bottom: .03rem;
			}

			.item-txt {
				font-weight: 400;
				font-size: 0.11rem;
				color: #ACACAB;
			}

			.item-box {
				width: 0.39rem;
				height: 0.39rem;
				background: #015AA4;
				border-radius: 0.12rem;
				display: flex;
				align-items: center;
				justify-content: center;

				img {
					//width: 0.2rem;
					height: 0.2rem;
				}
			}
		}
	}
</style>