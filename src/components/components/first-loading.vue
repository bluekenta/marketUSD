<template>
  <div>
    <div class="pop-loading flex flex-c" v-if="show">
      <van-loading size="14px">{{ $t("new").a }}</van-loading>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      show: false,
    };
  },
  components: {},
  methods: {
    open() {
      this.show = true;
    },
    close() {
      this.show = false;
    },
  },
  created() {},
  computed: {},
};
</script>

<style scoped lang="less">
.pop-loading {
  // width: 1.2rem;
  // height: 1.2rem;
  // border-radius: 0.1rem;
  // background-color: rgba(0, 0, 0, 0.5);
  // position: fixed;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  // z-index: 9999;

  padding: 0.5rem 0;
}
</style>
