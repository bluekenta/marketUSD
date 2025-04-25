<template>
  <div class="none">
    <img src="../../assets/skin/all/none.png" />{{ $t("all").j1 }}
  </div>
</template>

<script>
	export default {
		name: "noData",
		props: {},
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
	.none {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: .6rem 0;
    font-weight: 500;
    font-size: 0.14rem;
    color: #111111;
    line-height: 0.19rem;
    img{
      width: 2rem;
      height: 2rem;
      margin-bottom: .1rem;
    }
	}
</style>