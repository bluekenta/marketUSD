<template>
  <div class="">
    <div class="list">
      <div class="tt">
        <div class="flex flex-b titles">
          <div class="flex-1">{{ $t("newt").t57 }}</div>
          <div class="flex-1 t-r">{{ $t("newt").t58 }}</div>
          <div class="flex-1 t-r">{{ $t("newt").t59 }}</div>
        </div>
        <div class=" cot">
          <div class="flex flex-b tab">
              <div
                class="tab-item"
                :class="{ active: type == item.type }"
                v-for="(item, i) in typeList"
                :key="i"
                @click="changeType(item.type)"
              >
                {{ $t(item.name) }}
              </div>

              <!-- 二级切换 -->
              <div
                class="tab-item"
                :class="{ active: current == 0 }"
                @click="onChange(0)"
              >
                {{ $t("newt").t66 }}
              </div>
              <div
                class="tab-item"
                :class="{ active: current == 1 }"
                @click="onChange(1)"
              >
                {{ $t("newt").t67 }}
              </div>



            </div>

    
        </div>
      </div>

      <div class="lists">
        <div
          class="list-item flex flex-b"
          v-for="(item, idx) in list"
          :key="idx"
          @click="$toDetail(`/market/stockDetail?symbol=${item.code}`, item)"
        >
          <div class="flex flex-1">
            <div class="icon wsc"></div>
            <div>
              <div class="name">
                {{ item.ko_name }}
              </div>
              <div class="code">
                {{ item.code }}
              </div>
            </div>
          </div>
          <div class="price flex flex-e flex-1">
            {{ $formatMoney(item.close) }}
            <div
              class="icon down animate__animated animate__fadeIn"
              :class="{
                up: item.returns >= 0,
              }"
            ></div>
          </div>
          <div
            class="flex flex-1 flex-e per red"
            :class="{
              green: item.returns < 0,
            }"
          >
            {{ item.returns > 0 ? "+" : "" }}{{ item.returns.toFixed(2) }}%
          </div>
        </div>
      </div>
    </div>
    <loading ref="loading" />
  </div>
</template>

<script>
export default {
  name: "clearDeal",
  components: {},
  data() {
    return {
      current: 0,
      type: "foreigner_volume_valued_net_buy_top",
      temtype: "",
      typeList: [
        {
          name: this.$t("newt").t52,
          type: "foreigner_volume_valued_net_buy_top",
          arr: [
            {
              name: this.$t("newt").t68,
              type: "foreigner_volume_valued_net_buy_top",
            },
            {
              name: this.$t("newt").t69,
              type: "foreigner_volume_valued_net_buy_bottom",
            },
          ],
        },

        {
          name: this.$t("newt").t51,
          type: "institutional_volume_valued_net_buy_top",
          arr: [
            {
              name: this.$t("newt").t68,
              type: "institutional_volume_valued_net_buy_top",
            },
            {
              name: this.$t("newt").t69,
              type: "institutional_volume_valued_net_buy_bottom",
            },
          ],
        },
        {
          name: this.$t("newt").t49,
          type: "individual_volume_valued_net_buy_top",
          arr: [
            {
              name: this.$t("newt").t68,
              type: "individual_volume_valued_net_buy_top",
            },
            {
              name: this.$t("newt").t69,
              type: "individual_volume_valued_net_buy_bottom",
            },
          ],
        },
      ],
      list: [],
    };
  },
  created() {},
  mounted() {
    this.getInfo(1);
  },
  onLoad() {},
  methods: {
    onChange(index) {
      this.current = index;
      let arr = this.typeList.filter((item) => {
        if (item.type == this.type) return item;
      });
      // console.log('arr', arr);
      this.temtype = arr[0].arr[index].type;
      this.getInfo(2); //右侧单独切换 top/bottom
    },
    changeType(type) {
      this.type = type;
      this.$refs.loading.open(); //开启加载
      this.getInfo(1);
    },
    getInfo(index) {
      this.$server
        .post("/parameter/tsxm", { type: index == 1 ? this.type : this.temtype })
        .then((res) => {
          this.$refs.loading.close(); //开启加载
          if (res.status == 1) {
            let arr = [];
            res.data.data.forEach((item, i) => {
              if (item.returns) {
                item.returns = item.returns;
              }
              if (item.week_returns) {
                item.returns = item.week_returns;
              }
              if (item.month_returns) {
                item.returns = item.month_returns;
              }
              if (item.three_month_returns) {
                item.returns = item.three_month_returns;
              }
              if (item.six_month_returns) {
                item.returns = item.six_month_returns;
              }

              //只展示前面5个
              // if (i <= 4) {
              //   arr.push(item);
              // }
              arr.push(item);
            });

            this.list = arr;
          }
        });
    },
  },
};
</script>

<style scoped lang="less">
.titles {
  padding: 0.1rem;
  border-bottom: 0.01rem solid #f5f5f5;
  div {
    font-size: 0.12rem;
    color: #757575;
  }
}
.tb {
  background: #f1f2f4;
  border-radius: 4px;
  margin-left: 20px;
  border-radius: 12px;
  .it {
    flex: 1;
    text-align: center;
    border-radius: 4px;
    padding: 20px 0;
    color: #979ca2;
    font-size: 24px;
    &.active {
      color: #2f66cd;
      background: #dde4f6;
      border-radius: 16px;
    }
  }
}

.lists {
  .list-item {
    padding: 0.1rem;
    // border-bottom: 0.02rem solid #ececec;
    border-bottom: 0.01rem solid #f5f5f5;
    .name {
      font-weight: bold;
      margin-left: 0.05rem;
    }
    .code {
      font-weight: 500;
      font-size: 0.12rem;
      color: #464646;
      margin-left: 0.05rem;
    }
    .price {
      font-weight: bold;
      // font-size: 0.18rem;
      .icon {
        margin-left: 0.05rem;
      }
    }
    .per {
      font-weight: bold;
      // font-size: 0.12rem;
    }
  }
}

.red {
  color: #c04649;
}
.green {
  color: #4f8672;
}

.list {
  .tt {
    .cot {
      padding: 0.1rem;
      .ml10 {
        margin-left: 0.1rem;
      }
      .tab {
        .tab-item {
          width:18%;
          background: #ededed;
          border-radius: 0.04rem;
          font-size: 0.12rem;
          color: #3b3b3b;
          padding: 0.05rem 0.1rem;
          text-align: center;

          &.active {
            background: #6970af;
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>
