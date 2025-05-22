<template>
	<div class="page">
		<top-back :title="$t('mine').j13"></top-back>
		<div class="list">
			<div class="item" @click="change(item.key)" v-for="(item, i) in langList" :key="i">
        <div class="item-left"><img :src="item.img" />{{item.name}}</div>
				<div class="item-check" v-if="lang == item.key"></div>
			</div>
		</div>
		<loading ref="loading" />
	</div>
</template>

<script>
	export default {
		name: "",
		props: {},
		data() {
			return {
				lang: "",
				langList: [
          { name: this.$t('lang').j9, key: 'spa', img: require('../../assets/skin/lang/9.png') },
          { name: this.$t('lang').j7, key: 'en', img: require('../../assets/skin/lang/7.png') },
          { name: this.$t('lang').j5, key: 'de', img: require('../../assets/skin/lang/5.png') },
          { name: this.$t('lang').j3, key: 'kor', img: require('../../assets/skin/lang/3.png') },
          { name: this.$t('lang').j6, key: 'cn', img: require('../../assets/skin/lang/6.png') },
          { name: this.$t('lang').j1, key: "yn", img: require('../../assets/skin/lang/1.png') },
					{ name: this.$t('lang').j2, key: "thai", img: require('../../assets/skin/lang/2.png') },
          { name: this.$t('lang').j4, key: 'yd', img: require('../../assets/skin/lang/4.png') },
          { name: this.$t('lang').j8, key: 'tr', img: require('../../assets/skin/lang/8.png') },
          { name: this.$t('lang').j10, key: 'fr', img: require('../../assets/skin/lang/10.png') },
          { name: this.$t('lang').j11, key: 'it', img: require('../../assets/skin/lang/11.png') },
				],
			};
		},
		created() {
			this.lang = localStorage.getItem("language") || "spa";
		},
		methods: {
			change(type) {
				localStorage.setItem("language", type);
				this.$refs.loading.open(); //开启加载
				setTimeout(() => {
					this.$refs.loading.close();
          this.$router.go(-1);
				}, 1500);
			},
		},
	};

</script>

<style scoped lang="less">
	.page {
		padding: 0 0.15rem;
	}
  .item {
    height: .61rem;
    border-bottom: 0.01rem solid rgba(247, 247, 247, 1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .item-left{
      height: .61rem;
      display: flex;
      align-items: center;
      font-weight: 400;
      font-size: 0.14rem;
      color: #111111;
      img{
        width: 0.23rem;
        height: .14rem;
        margin-right: .15rem;
      }
    }
    .item-check{
      width: 0.18rem;
      height: 0.17rem;
      background: url("../../assets/skin/mine/lang-true.png");
      background-size: 100% 100%;
    }
  }
</style>