<template>
  <div>
    <tab-bar>
      <tab-bar-item path="/home" activeColor="palevioletred">
        <img slot="item-icon" src="~assets/img/tabbar/home (1).svg" alt />
        <img slot="item-icon-active" src="~assets/img/tabbar/home.svg" alt />
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category" activeColor="palevioletred">
        <img slot="item-icon" src="~assets/img/tabbar/class (1).svg" alt />
        <img slot="item-icon-active" src="~assets/img/tabbar/class.svg" alt />
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart" activeColor="palevioletred">
        <img slot="item-icon" src="~assets/img/tabbar/icon_Shopping Cart (1).svg" alt />
        <img slot="item-icon-active" src="~assets/img/tabbar/icon_Shopping Cart.svg" alt />
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile" activeColor="palevioletred">
        <img slot="item-icon" src="~assets/img/tabbar/icon_user name (1).svg" alt />
        <img slot="item-icon-active" src="~assets/img/tabbar/icon_user name.svg" alt />
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";
export default {
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>

<style scoped>
</style>