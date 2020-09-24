<template>
  <div class="tab_control">
    <div
      v-for="(item, index) in titles"
      :key="index"
      class="tab_control_item"
      @click="itemClick(index)"
    >
      <span :class="{tab_span:index===active}">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      active: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.active = index;
      this.$emit('tabClick',index)
    },
  },
};
</script>

<style scoped>
.tab_control {
  display: flex;
  text-align: center;
  background-color: #fff;
}
.tab_control_item {
  flex: 1;
  height: 40px;
  line-height: 40px;
}
.tab_span {
  border-bottom: 2px solid var(--color-high-text);
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
  color: var(--color-high-text);
  padding: 5px;
}
</style>