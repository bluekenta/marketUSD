<template>
	<div class="page ">
		<div class="header">
			{{$t('news').j1}}
		</div>
    <div class="stockTab">
      <div class="item" :class="stockType==item.type?'sel':''" v-for="(item, idx) in stockTypeList" :key="idx" @click="stockType=item.type,clickStockTab(item.type)">{{item.name}}<span></span></div>
    </div>
		<no-data v-if="!articleList.length"></no-data>
		<div class="news-banner" v-if="articleList.length">
			<van-swipe class="my-swipe" :autoplay="3000" :show-indicators="false">
				<van-swipe-item v-for="(item, index) in articleList" :key="index" v-if="item.img && index<10">
					<div class="news-banner-box">
						<img :src="item.img" />
						<div class="title">{{ item.title }}</div>
					</div>
				</van-swipe-item>
			</van-swipe>
		</div>
		<div class="news-list" v-if="articleList.length>2">
			<div class="news-item" v-for="(item, index) in articleList" v-if="index>2" :key="index"
				@click="clickNewsDetail(item)">
				<div class="news-left" :style="!item.img?'width:100%':''">
					<div class="news-title">{{ item.title }}</div>
					<div class="news-date">{{ $formatDate("DD-MM-YYYY hh:mm", item.created*1000) }}</div>
				</div>
				<img :src="item.img" v-if="item.img" />
			</div>
		</div>
		<tab-bar :current="3"></tab-bar>
	</div>
</template>

<script>
	export default {
		name: "newsList",
		props: {},
		data() {
			return {
				isLoading: false,
				loading: false,
				finished: false,
				articleList: [],
        stockTypeList:[
          {
            name: this.$t('stockTab').j1,//西班牙
            type: 'Spain'
          },
          {
            name: this.$t('stockTab').j2,//美国
            type: 'usd'
          },
        ],
        stockType: 'usd'
			};
		},
		components: {},
		created() {
			this.getNews();
		},
		computed: {},
		methods: {
      clickStockTab(type){
        window.localStorage.setItem('stockType',type);
        this.getNews();
      },
			getNews() {
				let per = {}
        if(this.stockType == 'usd'){
          per = {
            exchange: "us",
            lang: "en"
          }
        }else{
          per = {
            exchange: "es",
            lang: "es"
          }
        }
				this.$server.post("/common/newss", per).then((res) => {
					this.isLoading = false; //下拉刷新状态
					this.loading = false;
					if (res && res.data.result) {
						this.articleList = res.data.result;
						this.finished = true;
					}
				});
			},
			clickNewsDetail(item) {
				window.localStorage.setItem('newsDetail', JSON.stringify(item));
				this.$toPage('/home/newsDetail');
			}
		},
	};
</script>

<style scoped lang="less">
	.page {
		padding: 0.58rem 0.15rem .85rem 0.15rem;

		.header {
			width: 100vw;
			height: .58rem;
			background: #015AA4;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 999;
			padding: 0 0.2rem;
			font-weight: 500;
			font-size: 0.13rem;
			color: #fff;
			display: flex;
			align-items: center;
		}
	}

  .stockTab {
    height: .4rem;margin: 0 .14rem;
    border-bottom: .01rem solid #F7F7F7;
    display: flex;
    align-items: flex-end;

    .item {
      margin-right: .28rem;
      height: .47rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      font-weight: 500;
      font-size: 0.13rem;
      color: rgba(152, 152, 152, 1);
      line-height: 0.19rem;

      span {
        width: 0.27rem;
        height: 0.04rem;
        background: transparent;
        border-radius: 0.02rem;
        display: block;
        margin-top: .1rem;
      }
      &.sel {
        color: #015AA4;

        span {
          background: #015AA4;
        }
      }
    }
  }

	.news-banner {
		height: 1.31rem;
		border-radius: 0.05rem;
		margin-top: .13rem;
		overflow: hidden;

		.news-banner-box {
			width: 100%;
			height: 1.31rem;
			position: relative;

			img {
				width: 100%;
				height: 1.31rem;
				object-fit: cover;
			}

			.title {
				font-weight: 500;
				font-size: 0.14rem;
				color: #FFFFFF;
				line-height: 0.19rem;
				padding: 0 .14rem;
				overflow: hidden;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				text-overflow: ellipsis;
				white-space: normal;
				position: absolute;
				left: 0;
				bottom: .07rem;
			}
		}
	}

	.news-list {
		.news-item {
			display: flex;
			align-items: center;
			margin-top: .18rem;

			.news-left {
				width: calc(100% - .87rem);
				height: 0.77rem;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}

			.news-title {
				font-weight: 500;
				font-size: 0.14rem;
				color: #111111;
				line-height: 0.19rem;
				overflow: hidden;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				text-overflow: ellipsis;
				white-space: normal;
			}

			.news-date {
				font-weight: 400;
				font-size: 0.12rem;
				color: #C3C3C3;
				line-height: 0.19rem;
			}

			img {
				width: 0.77rem;
				height: 0.77rem;
				object-fit: cover;
				border-radius: 0.05rem;
				margin-left: .1rem;
			}
		}
	}
</style>