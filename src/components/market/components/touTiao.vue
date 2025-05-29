<template>
  <div>
    <div class="list">
      <div class="flex flex-b" @click="$toPage('/pages/home/news', 0)">
        <div class="tt">{{ $t('newt').t53 }}</div>
        <div class="flex more">
          {{ $t('newt').t54 }}
          <div class="icon jt"></div>
        </div>
      </div>

      <div class="list1">
        <div class="item flex flex-b" v-for="(item, i) in list" v-show="i < 10" :key="i" @click="openUrl(item.link)">
          <div class="flex-2">
            <div class="t el">{{ item.title }}</div>
            <div class="t1">{{ item.dt }}</div>
          </div>
          <div class="img" v-if="item.image">
            <!-- <image :src="item.image" mode="aspectFill"></image> -->
            <lazy-load class="lazy-img" :image="item.image" imgMode="widthFix" borderRadius="12"></lazy-load>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'touTiao',
  components: {},
  data() {
    return {
      list: [],
      twoItems: []
    };
  },
  created() {},
  mounted() {
    this.getList();
  },
  onLoad() {},
  methods: {
    showMore() {
      this.$emit('showMore', 1);
    },
    getList(code) {
      this.$api.request('/parameter', '/toutiao', {}).then(res => {
        if (res.status == 1) {
          // 只展示前面10条
          let arr = [];
          let arr1 = [];
          res.data.data.forEach((item, i) => {
            // item.dt = this.$formatDate('YYYY.MM.DD hh:mm:ss', new Date(item.dt).getTime());
            item.dt = this.$getTimeData(item.dt);
            // if (i <= 1) {
            //   arr.push(item);
            // }
            // if (1 < i && i <= 4) {
            //   arr1.push(item);
            // }
            arr1.push(item);
          });
          // this.twoItems = arr;
          this.list = arr1;
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.more {
  color: #94989b;
  padding: 0 20px;
  font-size: 24px;
  .icon {
    margin-left: 10px;
  }
}

.list1 {
  // padding: 20px;
  padding: 0 20px 10px;
  background-color: #fff;
  .item {
    padding: 20px 0;
    border-bottom: 2px solid #f4f4f4;
    .img {
      .lazy-img {
        width: 176px;
        height: 108px;
      }
    }

    .t {
      font-weight: bold;
    }
    .t1 {
      font-size: 24px;
      color: #9ea3ae;
      margin-top: 10px;
    }
  }
}

.show {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 显示2行文本 */
}

.list {
  background: #fff;
  margin: 30px 0;
  .tt {
    font-size: 32px;
    font-weight: bold;
    padding: 30px 20px;
  }
  .pdd {
    padding: 0 20px 30px;
    border-bottom: 2px solid #cccccc;
    .item {
      width: 49%;
      image {
        width: 100%;
        height: 220px;
        border-radius: 10px;
        margin-bottom: 20px;
      }
    }
  }

  .t {
    color: #333333;
    margin-bottom: 20px;
  }
  .t1 {
    color: #999999;
  }

  .items {
    padding: 30px 20px;
    border-bottom: 2px solid #cccccc;
  }
}
</style>
