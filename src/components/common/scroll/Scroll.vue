<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
export default {
  data() {
    return {
      bscroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.bscroll = new Bscroll(this.$refs.wrapper, {
      observeDOM: true,
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });
    this.bscroll.on("scroll", (position) => {
      // console.log(position);
      this.$emit("hideBackTop", position);
    });
    this.bscroll.on("pullingUp", () => {
      this.$emit("pullingUp");
      this.bscroll.finishPullUp();
    });
  },
  methods: {
    scrollTo(x, y, time) {
      this.bscroll.scrollTo(x, y, time);
    },
    imgFinish() {
      this.bscroll && this.bscroll.refresh();
    },
    getScrollY(){
     return this.bscroll.y
    }
  },
};
</script>

<style scoped>
</style>