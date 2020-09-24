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
  mounted() {
    this.bscroll = new Bscroll(this.$refs.wrapper, {
      observeDOM: true,
    });
  },
};
</script>

<style scoped>
</style>