<template>
  <!-- 自选 -->
  <div class="">
    <div class="title flex flex-b">
      <div>{{ $t("new").a1 }}</div>

      <template v-if="chooseList.length">
        <div
          class="icon bjbtn animate__animated animate__fadeIn"
          v-if="!show"
          @click="changeList"
        ></div>
        <div v-if="show" @click="cancle">{{ $t("new").a2 }}</div>
      </template>
    </div>

    <div class="cot">
      <div class="list">
        <no-data v-if="isShow"></no-data>

        <div class="flex flex-b titles" v-if="chooseList.length">
          <div class="flex-2">{{ $t("newt").t57 }}</div>
          <div class="flex-1 t-r">{{ $t("newt").t58 }}</div>
          <div class="flex-1 t-r flex flex-e" @click="changeListup">
            {{ $t("newt").t59 }}
            <div class="icon animate__animated animate__fadeIn" :class="isUp ? 'zf' : 'df'"></div>
          </div>
        </div>

        <div
          class="list-item flex flex-b"
          v-for="(item, index) in chooseList"
          :key="index"
          @click="$toDetail(`/market/stockDetail?symbol=${item.symbol}`, item)"
        >
          <div class="flex-2 flex">
            <div
              v-if="item.showIcon"
              class="icon nocheck animate__animated animate__fadeIn"
              :class="{ checked: item.choose }"
              @click.stop="changeItem(index)"
            ></div>
            <div class="flex-1">
              <div class="name">{{ item.name || "-" }}</div>
              <div class="code">{{ item.symbol || "-" }}</div>
            </div>
          </div>

          <div class="flex-1 t-r">
            <div
              class="price red"
              :class="{
                green: Number(item.gain) < 0,
              }"
            >
              {{ $formatMoney(item.price) || 0 }}
            </div>

            <div
              class="t red"
              :class="{
                green: Number(item.gain) < 0,
              }"
            >
              {{ item.gainValue > 0 ? "+" : ""
              }}{{ $formatMoney(item.gainValue) || 0 }}
            </div>
          </div>

          <div class="flex-1 flex flex-e">
            <div
              class="per red-bg"
              :class="{
                'green-bg': Number(item.gain) < 0,
              }"
            >
              {{ item.gain > 0 ? "+" : "" }}{{ item.gain.toFixed(2) }}%
            </div>
          </div>
        </div>
        <div
          class="btn-box flex flex-c"
          v-if="!show"
          @click="$toPage('/favorite/search')"
        >
          <div class="icon addj animate__animated animate__fadeIn"></div>
          {{ $t("new").t36 }}
        </div>
      </div>
    </div>

    <div class="btns flex flex-b" v-if="show">
      <div class="t flex" @click="chooseAll">
        <div class="icon animate__animated animate__fadeIn" :class="checkAll ? 'checked' : 'nocheck'"></div>
        {{ $t("new").a3 }} ({{ chooseLength }})
      </div>
      <div class="t1" @click="delItem">
        {{ $t("new").a4 }}
      </div>
    </div>

    <loading ref="loading" />
  </div>
</template>

<script>
export default {
  name: "optionList",
  props: {},
  data() {
    return {
      chooseLength: 0,
      checkAll: false,
      isUp: false, //默认涨幅在前
      list: [],
      loading: true,
      loading1: true,
      isShow: false,
      isLoading: false,
      show: false,
      chooseList: [],
      lastSymbol: "",
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.getMine();
  },
  methods: {
    changeList() {
      if (!this.chooseList.length) return;
      this.chooseList.forEach((item) => {
        item.showIcon = true;
      });
      this.show = true;
    },
    cancle() {
      this.chooseList.forEach((item) => {
        item.showIcon = false;
      });
      this.show = false;
    },
    changeItem(index) {
      this.chooseList.forEach((item, i) => {
        if (index == i) {
          item.choose = !item.choose;
        }
      });

      this.checkAll = this.chooseList.every((item) => item.choose); //列表里面切换，改变全选按钮的状态

      // 显示已选中数量
      let arr = this.chooseList.filter((item) => item.choose);
      this.chooseLength = arr.length;
    },
    chooseAll() {
      this.checkAll = !this.checkAll;
      this.chooseList.forEach((item) => {
        item.choose = this.checkAll;
      });

      // 显示选中数量
      if (this.checkAll) {
        this.chooseLength = this.chooseList.length;
      } else {
        this.chooseLength = 0;
      }
    },
    delItem() {
      let arr = this.chooseList.filter((item) => item.choose);
      if (arr.length) {
        this.lastSymbol = arr[arr.length - 1].symbol; //记录已选中最后一项的值
        // console.log("lastSymbol", this.lastSymbol);
        this.$refs.loading.open(); //开启加载
        arr.forEach((item) => {
          this.removeOptional(item);
        });
      }
    },
    changeListup() {
      this.isUp = !this.isUp;
      let arr = [];
      let arr1 = [];
      this.chooseList.forEach((item) => {
        if (item.gain > 0) {
          arr.push(item);
        } else {
          arr1.push(item);
        }
      });

      if (this.isUp) {
        arr.sort((a, b) => b.gain - a.gain);
        arr1.sort((a, b) => b.gain - a.gain);
        this.chooseList = [...arr, ...arr1]; //涨在前、高在前
      } else {
        arr.sort((a, b) => a.gain - b.gain);
        arr1.sort((a, b) => a.gain - b.gain);
        this.chooseList = [...arr1, ...arr]; //跌在前、低在前
      }
    },
    getMine() {
      this.$server.post("/user/Optionallist", { type: "krw" }).then((res) => {
        this.$emit("upData");

        this.loading = false;

        if (res.status == 1) {
          if (this.show) {
            // 如果是已经选择删除，但是列表还有数据
            res.data.forEach((item) => {
              item.showIcon = true;
              item.choose = false;
            });
          } else {
            res.data.forEach((item) => {
              item.showIcon = false;
              item.choose = false;
            });
          }

          this.chooseList = res.data;
          this.changeListup(); //重新加载排序，涨在前

          if (!res.data.length) {
            this.show = false;
            this.isShow = true;
          }
          // console.log("this.chooseList ", this.chooseList);

          // 显示已选中数量
          let arr = this.chooseList.filter((item) => item.choose);
          this.chooseLength = arr.length;
        }
      });
    },
    removeOptional(item) {
      this.$server
        .post("/user/removeOptional", { symbol: item.symbol, type: "krw" })
        .then((res) => {
          if (res.status == 1) {
            if (this.lastSymbol == item.symbol) {
              this.$refs.loading.close(); //删除最后一项成功，结束加载中
              this.getMine();
            }
          }
        });
    },
  },
};
</script>

<style scoped lang="less">
.btn-box {
  padding: 0.2rem 0.1rem;
  font-family: PingFang TC, PingFang TC;
  font-weight: 400;
  font-size: 0.12rem;
  color: #111111;
  text-align: center;
  margin: 0.2rem 0;
  .icon {
    margin-right: 0.05rem;
  }
}

.index {
  .t {
    font-weight: 500;
    color: #1e1e1e;
    padding: 0 0.1rem 0.1rem;
  }
}

.nums {
  text-align: center;
  padding: 0.1rem 0;
  // border-top: 0.01rem solid #f5f5f5;
  border-bottom: 0.01rem solid #f5f5f5;

  .nums-item {
    width: 32%;
    &.center {
      border-left: 0.02rem solid #bbc5c1;
      border-right: 0.02rem solid #bbc5c1;
    }
    .name {
      font-weight: 600;
      font-size: 0.12rem;
      margin-bottom: 0.05rem;
    }
    .icon {
      margin-left: 0.05rem;
    }
    .t {
      font-weight: 500;
      font-size: 0.16rem;
      color: #c5585e;
      margin: 0.1rem 0;
      &.die {
        color: #4f8672;
      }
    }

    .t1 {
      font-size: 0.12rem;
      color: #c5585e;
      &.die {
        color: #4f8672;
      }
    }
  }
}

.red {
  color: #df4645;
}
.green {
  color: #3561e5;
}

.red-bg {
  background-color: #df4645;
}
.green-bg {
  background-color: #3561e5;
}

.header {
  width: 100vw;
  height: 0.5rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background: #fff;
  padding: 0 0.1rem;
  .t {
    font-weight: 500;
    font-size: 0.18rem;
    color: #000000;
    text-align: center;
    line-height: 0.5rem;
  }
  .sou2 {
    margin-right: 0.1rem;
  }
}

.title {
  padding: 0.1rem 0.15rem;
  div {
    font-family: PingFang TC, PingFang TC;
    font-weight: 500;
    font-size: 0.14rem;
    color: #000000;
  }
}

.cot {
  .list {
    background: #ffffff;
    border-radius: 0.24rem;
    margin-top: 0.1rem;
    min-height: 100vh;
    padding: 0 0.15rem;
    .titles {
      padding: 0.15rem 0 0;
      div {
        font-size: 0.12rem;
        color: #666666;
      }
      .icon {
        margin-left: 0.05rem;
      }
    }
    .list-item {
      padding: 0.15rem 0;
      border-bottom: 0.01rem solid #ebebeb;
      .icon {
        margin-right: 0.1rem;
      }
      .name {
        font-weight: 600;
        font-size: 0.16rem;
        color: #000000;
      }
      .code {
        font-size: 0.12rem;
        color: #989898;
        margin-top: 0.05rem;
      }
      .t {
        font-size: 0.12rem;
        margin-top: 0.05rem;
      }

      .price {
        font-weight: 600;
        font-size: 0.16rem;
      }
      .per {
        border-radius: 0.3rem;
        padding: 0.05rem 0.1rem;
        font-size: 0.12rem;
        color: #fff;
        width: 80%;
        text-align: center;
      }
    }
  }
}
.btns {
  width: 100%;
  position: fixed;
  bottom: 0.5rem;
  left: 0;
  z-index: 999;
  background-color: #fff;
  padding: 0.15rem;

  .t {
    font-family: PingFang TC, PingFang TC;
    font-weight: 500;
    font-size: 0.14rem;
    color: #1c1c1c;
    .icon {
      margin-right: 0.1rem;
    }
  }
  .t1 {
    font-family: PingFang TC, PingFang TC;
    font-weight: 500;
    font-size: 0.14rem;
    color: #c62827;
  }
}
</style>
