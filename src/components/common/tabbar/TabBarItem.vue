<template>
  <div class="itemtabbar" @click="itmeClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div class="item-text" :style="itemStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // isActive: true,
    };
  },
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "palevioletred",
    },
  },
  methods: {
    itmeClick() {
      this.$router.replace(this.path);
    },
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    itemStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
};
</script>
<style scoped>
.itemtabbar {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
 
}
.itemtabbar img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  margin-bottom: 2px;
  vertical-align: middle;
}
/* .active {
  color: palevioletred;
} */
</style>