<template>
  <!-- 热门股票前三显示 -->
  <div class="list flex flex-c">
    <div
      class="item"
      :class="{ center: i == 1 }"
      v-for="(item, i) in hotList"
      :key="i"
      @click="$toDetail(`/market/stockDetail?symbol=${item.code}`, item)"
    >
      <div class="pad">
        <div class="name ellipsis">{{ item.ko_name }}</div>
        <div class="code">{{ item.code }}</div>
      </div>

      <div class="t-c">
        <div class="t" :class="item.returns > 0 ? 'red' : 'green'">
          {{ $formatMoney(item.close) }}
        </div>
        <div class="t1" :class="item.returns > 0 ? 'red' : 'green'">
          {{ item.returns > 0 ? "+" : "" }}{{ item.returns.toFixed(2) }}%
        </div>
      </div>

      <div class="line" :id="`kline${i}`"></div>
    </div>
    <loading ref="loading" />
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "stock-line",
  props: {
    hotList: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      redBg: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#CD585F", // 渐变红色的起始颜色，这里设置为红色，透明度为0.7
          },
          {
            offset: 1,
            color: "#F3CFD2", // 渐变红色的结束颜色，这里设置为红色，透明度为0.1
          },
        ]),
      },
      greenBg: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#4F8672", // 渐变红色的起始颜色，这里设置为红色，透明度为0.7
          },
          {
            offset: 1,
            color: "#E2F4EE", // 渐变红色的结束颜色，这里设置为红色，透明度为0.1
          },
        ]),
      },
    };
  },
  components: {},
  created() {},
  computed: {},
  mounted() {
    this.getKline();
  },
  methods: {
    getKline() {
      this.hotList.forEach((item, i) => {
        this.getChartsData(item.code, `kline${i}`, item);
      });
    },

    // 获取k线数据
    getChartsData(code, id, detail) {
      //获取日期
      function timestampToDate(timestamp) {
        // 将10位时间戳转换为毫秒时间戳
        const milliseconds = timestamp * 1000;

        // 创建Date对象并传入毫秒时间戳
        const date = new Date(milliseconds);

        // 获取年份、月份和日期
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);

        // 拼接日期字符串，格式为：DD-MM-YYYY
        const formattedDate = `${year}-${month}-${day}`;

        return formattedDate;
      }
      //获取时间
      function getTimeFromTimestamp(timestamp) {
        const date = new Date(timestamp * 1000 - 1 * 60 * 60 * 1000); // 将时间戳转换为毫秒

        // 创建一个日期格式化对象，指定韩国时区
        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Seoul", // 韩国时区
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: false,
        });

        // 格式化日期
        const formattedDate = formatter.format(date);
        return formattedDate.slice(
          formattedDate.length - 8,
          formattedDate.length - 3
        );
      }
      this.$refs.loading.open(); //开启加载

      this.$server
        .post("/parameter/kline", {
          symbol: code,
          type: 1,
        })
        .then((res) => {
          if (res.length > 0) {
            let data = res;
            // 获取当前时间的最新一天日期
            let currentDate = new Date(timestampToDate(data[0].time));
            let currentYear = currentDate.getFullYear();
            let currentMonth = currentDate.getMonth();
            let currentDay = currentDate.getDate();

            // 按照时间戳的顺序对数组进行排序
            let sortedData = data.sort((a, b) => a.time - b.time);

            // 筛选出日期等于最新一天的时间戳对象
            let latestData = sortedData.filter((obj) => {
              let date = new Date(obj.time * 1000); // 将时间戳转换为毫秒
              let year = date.getFullYear();
              let month = date.getMonth();
              let day = date.getDate();

              return (
                year === currentYear &&
                month === currentMonth &&
                day === currentDay
              );
            });

            // 显示顶部右侧小的k线图
            let latestTimestamps = latestData.map((obj) =>
              getTimeFromTimestamp(obj.time)
            );
            let latestOpenValues1 = latestData.map((obj) => obj.open);
            setTimeout(() => {
              this.setFs(latestTimestamps, latestOpenValues1, id, detail);
            }, 200);
          }
        });
    },

    setFs(time, chartNum, id, detail) {
      this.$refs.loading.close(); //关闭加载
      let sltDom = document.getElementById(id);
      let sltDomChart = echarts.init(sltDom);
      // 缩略图模拟数据
      let option = {
        xAxis: {
          type: "category",
          data: time,
          show: false,
        },
        grid: [
          {
            //蜡烛图的位置
            left: "0%",
            right: "0%",
            top: "0%",
            bottom: "0%",
            height: "100%",
            x: "0",
            y: "0",
          },
        ],
        yAxis: {
          type: "value",
          scale: true, //自适应显示
          show: false,
        },
        series: [
          {
            data: chartNum,
            type: "line",
            // 设置渐变红色的填充和线条颜色
            areaStyle: detail.returns > 0 ? this.redBg : this.greenBg,
            lineStyle: {
              color: detail.returns > 0 ? "#CD585F" : "#4F8672",
            },
            showSymbol: false, // 取消线上标记点
          },
        ],
      };

      // 渲染图表
      sltDomChart.setOption(option);

      // 监听数据加载完成事件
      //  sltDomChart.on('finished', function () {
      //      // 检查是否有数据
      //      if (sltDomChart.getOption().series[0].data.length === 0) {
      //          // 如果没有数据，显示空提示
      //          sltDomChart.setOption({
      //              series: [{
      //                  // 使用 noDataLoadingOption 来自定义加载时的提示
      //                  loadingOption: {
      //                      text: '加载中',
      //                      effect: 'whirling'
      //                  },
      //                  // 使用 noDataText 来自定义无数据时的提示
      //                  noDataLoadingOption: {
      //                      text: '暂无数据',
      //                      effect: 'default',
      //                      effectOption: {
      //                          effect: {
      //                              period: 8,
      //                              trail: 0.3,
      //                              color: '#ff33ff',
      //                              symbol: 'circle'
      //                          }
      //                      }
      //                  }
      //              }]
      //          });
      //      }
      //  });
    },
  },
};
</script>

<style scoped lang="less">
.list {
  padding: 0.1rem;
  .item {
    width: 31.5%;
    background: #ffffff;
    box-shadow: 0rem 0.02rem 0.04rem 0rem rgba(0, 0, 0, 0.15),
      0rem -0.01rem 0.01rem 0rem rgba(0, 0, 0, 0.1);
    border-radius: 0.02rem;
    &.center {
      margin: 0 0.1rem;
    }
    .pad {
      padding: 0.05rem 0.1rem 0.1rem;
    }

    .name {
      font-weight: 600;
      font-size: 0.12rem;
    }
    .code {
      font-weight: 500;
      font-size: 0.1rem;
      color: #797979;
    }
    .t {
      font-weight: 600;
      font-size: 0.16rem;
    }
    .t1 {
      font-weight: 600;
      font-size: 0.12rem;
    }
    .line {
      margin-top: 0.1rem;
      width: 100%;
      height: 0.3rem;
    }

    .red {
      color: #bb1a23;
    }
    .green {
      color: #4f8672;
    }
  }
}
</style>
