<template>
	<div>
		<div class="header flex flex-b">
			<div class="icon my animate__animated animate__fadeIn" @click="flagUserPop=true"></div>
			
			<div class="search flex flex-1" @click="$toPage('/favorite/search')">
				<div class="icon sou animate__animated animate__fadeIn"></div>
				{{$t('search').title}}
			</div>
			
			<div class="icon msg animate__animated animate__fadeIn" @click="$toPage('/information/userInfo')"></div>
		</div>
		
		<van-popup v-model="flagUserPop" position="left" :style="{ width: '100%' }">
			<div class="userInfo">
				<div class="close" @click="flagUserPop=false">
					<img src="../../assets/home/close2.png" />
				</div>
				<userCenter></userCenter>
			</div>
		</van-popup>
	</div>
</template>

<script>
	import userCenter from '../information/index.vue'
	export default {
		name: "topIndex",
		props: {
			isLogin: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {
				flagUserPop:false,
			};
		},
		components: {
			userCenter
		},
		created() {},
		computed: {},
		methods: {
			
		},
	};
</script>

<style lang="less">
	.header {
		width: 100vw;height:.5rem;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		background-color: #fff;
		padding: 0 0.15rem;
	

		.search{
			height: .34rem;
			background: #F6F6F6;
			border-radius:.06rem;
			margin:0 .16rem;padding:0 .14rem;
			font-weight: 400;
			font-size: .11rem;
			color: #8F8F8F;
			.icon{
				margin-right:.07rem;
				width:.16rem;height:.16rem;
			}
		}
	}
	
	::v-deep .van-popup--left{
		width:100%;
	}
	
</style>