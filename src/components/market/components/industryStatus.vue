<template>
  <div class="wbg">
    <div class="top">
      <div class="t">{{ $t('newt').t70 }}</div>
    </div>

    <div class="nums">
      <div class="item flex flex-b" v-for="(item, i) in list" :key="i">
        <div class="flex-1">
          <div class="t1">{{ $t('newt').t71 }}</div>
          <div class="flex">
            <div class="t2">{{ item.name }}</div>
          </div>
        </div>
        <div class="per">
          <!-- <u-circle-progress
            border-width="16"
            width="160"
            :percent="showPercent(item.avg_returns)"
            inactive-color="#F4F5F7"
            :active-color="item.avg_returns < 0 ? '#30E0A1' : '#E73E59'"
            bg-color="transparent"
          >
            <div class="u-progress-info">{{ item.avg_returns < 0 ? '' : '+' }}{{ item.avg_returns }}%</div>
          </u-circle-progress> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'industryStatus',
  components: {},
  data() {
    return {
      list: []
    };
  },
  created() {},
  mounted() {
    this.getInfo();
  },
  computed: {
    showPercent() {
      return str => {
        if (!str || str === null || str == undefined) return 0;
        str = str.toString();
        let isNum = str.indexOf('-');
        if (isNum > -1) {
          let num1 = Number(str.replace('-', ''));
          num1 = num1 > 100 ? 100 : num1;
          return num1;
        } else {
          let num2 = Number(str);
          num2 = num2 > 100 ? 100 : num2;
          return num2;
        }
      };
    }
  },
  onLoad() {},
  methods: {
    getInfo() {
      this.$api.request('/parameter', '/hyxz', {}).then(res => {
        if (res.status == 1) {
          res.data.data.forEach(item => {
            if (item.avg_returns < 0) {
              item.per = (((-1 * item.avg_returns) / 5) * 100).toFixed(2) + '%';
            } else {
              item.per = (((1 * item.avg_returns) / 5) * 100).toFixed(2) + '%';
            }
          });

          this.list = res.data.data;
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.wbg {
  background-color: #fff;
  padding: 30px 20px;
}
.top {
  padding: 0 20px;
  margin-bottom: 30px;
  .t {
    font-size: 32px;
    font-weight: bold;
  }
  .t1 {
    margin-top: 30px;
    div {
      color: #91a2b1;
    }
  }
}

.nums {
  background: #f4f5f7;
  border-radius: 20px;
  padding: 30px 20px 10px;
  .t {
    padding: 20px 0;
  }
  .u-progress-info {
    font-size: 24px;
    color: #252525;
    text-align: center;
    font-weight: bold;
  }

  .item {
    background: #ffffff;
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 20px;
    .per {
      // width: 128px;
      // height: 128px;
    }
    &.center {
      margin: 20px 0;
    }
    .t1 {
      font-size: 24px;
      color: #5d6588;
    }
    .t2 {
      font-size: 24px;
      font-weight: bold;
      color: #212121;
      margin: 30px 0 0;
      &.die {
        // color: #014b8d;
      }
    }
    .t3 {
      font-size: 28px;
      font-weight: bold;
      color: #e73e59;
      margin: 30px 0 0 20px;
      &.die {
        color: #3aab59;
      }
    }
  }
}
</style>
