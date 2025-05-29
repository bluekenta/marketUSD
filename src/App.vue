<template>
	<div id="app">
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive" />
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive" />
	</div>
</template>
<script>
	import "./assets/js/com";

	export default {
		data() {
			return {};
		},
		beforeCreate() {
			var _this = this;

			var first = null;

			document.addEventListener("plusready", function() {
				var webview = plus.webview.currentWebview();
				var ver = plus.runtime.version;
				// window.localStorage.setItem("pdver",ver)
				webview.setStyle({
					popGesture: "none"
				});
				plus.key.addEventListener("backbutton", function() {
					webview.canBack(function(e) {
						if (e.canBack) {
							webview.back();
						} else {
							if (!first) {
								first = new Date().getTime();
								setTimeout(function() {
									first = null;
								}, 1000);
							} else {
								if (new Date().getTime() - first < 1000) {
									plus.runtime.quit();
								}
							}
						}
					});
				});
				plus.navigator.setStatusBarBackground("#FFF");
				plus.navigator.setStatusBarStyle("dark");
			});
		},
		destroyed() {},
		methods: {},
	};
</script>
<style lang="less">
	@import "./assets/css/style.less";
	@import "./assets/css/animate.css";

	.userInfo {
		.close {
			position: fixed;
			top: .14rem;
			right: .16rem;
			z-index: 999;

			img {
				width: .16rem;
			}
		}
	}

	.big_btn {
		height: 0.43rem;
		background: #015AA4;
		border-radius: 0.05rem;
		font-weight: 500;
		font-size: 0.15rem;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>