<template>
  <div class="recommend">
    <div class="recommend_item" v-for="(item, index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt />
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.recommend {
  display: flex;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 20px;
  border-bottom:8px solid #eee ;
}
.recommend_item{
    flex: 1;
}
.recommend_item img{
    width: 65px;
    height: 65px;
    margin-bottom: 5px;
}
</style>