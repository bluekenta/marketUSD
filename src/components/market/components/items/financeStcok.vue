<template>
  <div>
    <div class="list">
      <div class="flex flex-b titles">
        <div class="flex-1">{{ $t("newt").t57 }}</div>
        <div class="flex-1 t-r">{{ $t("newt").t58 }}</div>
        <div class="flex-1 t-r">{{ $t("newt").t59 }}</div>
      </div>
      <!-- 二级切换 -->
      <!--      <div class="nav-box" v-if="currentType == 'returns_top' || currentType == 'returns_bottom'">
        <div class="nav-item" v-for="(item, index) in arr" :key="index" :class="{ active: type === item.type }" @click="changeNav(item.type)">
          {{ $t(item.name) }}
          <span></span>
        </div>
      </div> -->

      <template v-if="list.length">
        <div
          class="list-item flex flex-b"
          v-for="(item, i) in list"
          :key="i"
          @click="$toDetail(`/market/stockDetail?symbol=${item.code}`, item)"
        >
          <div class="flex flex-1">
            <div class="icon wsc"></div>

            <div>
              <div class="name">{{ item.ko_name }}</div>
              <div class="code">{{ item.code }}</div>
            </div>
          </div>
          <div class="flex-1 flex flex-e price t-r">
            {{ $formatMoney(item.close) }}
            <div
              class="icon down animate__animated animate__fadeIn"
              :class="{
                up: item.returns >= 0,
              }"
            ></div>
          </div>
          <div
            class="flex-1 per t-r"
            :class="item.returns >= 0 ? 'red' : 'green'"
          >
            {{ item.returns < 0 ? "" : "+" }}{{ item.returns.toFixed(2) }}%
          </div>
        </div>
      </template>

      <no-data v-else></no-data>
    </div>
  </div>
</template>

<script>
export default {
  name: "financeStcok",
  props: {
    currentType: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      page: 0,
      arr: [],
      type: "marketcap",
      typeList: [
        {
          name: "市值",
          type: "marketcap",
        },
        {
          name: "负债率",
          type: "debt_ratio_y",
        },
        {
          name: "PER",
          type: "per_ttm",
        },
        {
          name: "PBR",
          type: "pbr",
        },
        {
          name: "PSR",
          type: "psr_ttm",
        },
        {
          name: "PCR",
          type: "pcr_ttm",
        },
        {
          name: "ROE",
          type: "roe_ttm",
        },
        {
          name: "ROA",
          type: "roa_ttm",
        },
        {
          name: "GP/A",
          type: "gpa_ttm",
        },
      ],
      list: [],
    };
  },
  created() {
    this.updateInfo();
  },
  watch: {
    currentType: {
      handler(newValue, oldValue) {
        if (newValue && newValue !== oldValue) {
          if (newValue == "returns_top") {
            this.arr = this.typeList[0].arr;
            this.type = "returns_top";
          }
          if (newValue == "returns_bottom") {
            this.arr = this.typeList[1].arr;
            this.type = "returns_bottom";
          }

          this.getInfo();
        }
      },
      // deep: true  // 深度监听
      immediate: true, // 第一次改变就执行
    },
  },
  methods: {
    updateInfo() {
      this.$emit("updateInfo", this.typeList);
    },
    // 二级切换和上面分类切换分开
    changeNav(type) {
      this.type = type;
      this.list = [];
      this.getInfo(0);
    },
    getInfo(id = 1) {
      this.$parent.open();
      this.$server
        .post("/parameter/tsxm", { type: id ? this.currentType : this.type })
        .then((res) => {
          this.$parent.close();
          if (res.status == 1) {
            res.data.data.forEach((item) => {
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
            });

            this.list = res.data.data;
          }
        });
    },
  },
};
</script>

<style scoped lang="less">
.list {
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

.titles {
  padding: 0 0.1rem 0.1rem;
  border-bottom: 0.01rem solid #f5f5f5;
  div {
    font-size: 0.12rem;
    color: #757575;
  }
}

.nav-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.1rem;
  .nav-item {
    width: 18%;
    background: #ededed;
    border-radius: 0.04rem;
    color: #a0a0a0;
    text-align: center;
    font-size: 0.12rem;
    padding: 0.05rem 0.1rem;

    &.active {
      background: #6970af;
      color: #ffffff;
    }
  }
}
</style>
