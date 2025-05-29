<template>
	<div class="page stock">
		<top-back :title="$t('market').fast1"></top-back>
		<van-skeleton title :row="20" :loading="loading">
      <div class="nav-box flex">
        <div class="nav-item" v-for="(item, index) in navList" :key="index"
             :class="{ active: stockType == item.type }" @click="changeStock(item.type)">
          {{ item.name }}<span></span>
        </div>
      </div>
			<div class="list">
				<div class="flex flex-b titles">
					<div class="flex-1">{{ $t("newt").t57 }}</div>
					<div class="flex-1 t-r">{{ $t("newt").t58 }}</div>
					<div class="flex-1 t-r">{{ $t("newt").t59 }}</div>
				</div>
			
				<div class="lists">
					<div class="list-item flex flex-b" v-for="(item, idx) in list" :key="idx"
						@click="$toDetail(`/market/stockDetail?symbol=${item.symbol}&stockType=${stockType}`, item)">
						<div class="flex col">
							<div class="img">
								<img :src="item.logo" />
							</div>
							<div>
								<div class="name"> {{ item.name }} </div>
								<div class="code"> {{ item.symbol }} </div>
							</div>
						</div>
						<div class="t-r col">
							<div class="price red" :class="{ green: Number(item.gainValue) < 0, }">
								{{ $formatMoney(item.price,2) || 0 }}
							</div>
			
							<!-- <div class="t red" :class="{ green: Number(item.gainValue) < 0, }" >
							  {{ item.gainValue > 0 ? "+" : "" }}{{ item.gainValue || 0 }}
							</div> -->
						</div>
			
						<div class="t-r col">
							<div class="per red" :class="{ 'green': Number(item.gainValue) < 0, }">
								{{ item.gainValue > 0 ? "+" : "" }}{{ item.gain.toFixed(2) }}%
							</div>
						</div>
					</div>
				</div>
			</div>
		</van-skeleton>
		<loading ref="loading" />
	</div>
</template>

<script>
	export default {
		name: "teShe",
		components: {},
		data() {
			return {
				loading: true,
				list: [],
        navList: [
          {
            name: this.$t("j1"),
            type: 'try',
          },
          {
            name: this.$t("j2"),
            type: 'usd',
          },
        ],
        stockType: 'try',
			};
		},
		created() {},
		mounted() {
			this.getInfo();
		},
		onLoad() {},
		methods: {
      changeStock(type){
        this.stockType = type
        this.getInfo();
      },
			getInfo() {
				this.$refs.loading.open(); //开启加载
				this.$server.post("/parameter/top", {
					type: this.stockType
				}).then((res) => {
					this.$emit("upData");
	
					this.$refs.loading && this.$refs.loading.close();
					this.loading = false;
					if (res&&res.data) {
						this.list = res.data;
					}
				});
			},
		},
	};
</script>

<style lang="less">
	.page{
		min-height: 100vh;
		padding-top:.5rem;
	}

  .nav-box {
    width: 100%;
    height: .4rem;
    top: .5rem;
    padding: 0.15rem;
    .nav-item {
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 0.14rem;
      color: #111111;
      text-align: center;
      margin-right: 0.3rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span{
        width: .5rem;
        height: .03rem;
        background: transparent;
        margin-top: .05rem;
        display: block;
      }
      &.active {
        font-weight: 600;
        font-size: 0.14rem;
        color: #E10414;
        position: relative;
        span{
          background: #E10414;
        }
      }
    }
  }
	.stock{
		.list {
			background: #fff;
			margin-top:.08rem;
			border-radius: .1rem .1rem 0 0;
			.titles {
				padding: 0 .2rem;
				border-bottom: 0.01rem solid #f5f5f5;
				font-size: .12rem;
				color: #8B8D91;
				height:.41rem;
			}
			
			.lists {
				height:calc(100vh - 1.01rem);
				overflow: scroll;
				.list-item {
					padding: .2rem .17rem;
					border-bottom: 0.01rem solid #ebebeb;
					font-size: 0.12rem;
					
					&:last-child {
						border-bottom: 0;
					}
					
					.col{
						width:33%;
					}
			
					.img {
						margin-right: .12rem;
						width: .28rem;
						height: .28rem;
						img{
							width: .28rem;
							height: .28rem;
							border-radius: .02rem;
						}
					}
			
					.name {
						font-weight: 600;
						font-size: 0.14rem;
					}
			
					.code {
						font-size: 0.12rem;
						color: #989898;
						margin-top: 0.02rem;
					}
			
					.price {
						font-weight: 600;
						font-size: 0.16rem;
					}
			
				}
			}
			
		}
	}
	
	
	
</style>