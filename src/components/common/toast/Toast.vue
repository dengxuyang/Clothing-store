<template>
  <div class="toast" v-show="isShow">
    <div class="toast_message">{{ message }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      message: "",
    };
  },
  methods: {
    showToast(message = "默认文字", time = 2000) {
      this.isShow = true;
      this.message = message;
      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, time);
    },
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  background-color: rgb(0, 0, 0, 0.7);
  padding: 5px 10px;
  transform: translate(-50%,-50%);
  top: 50%;
  left: 50%;
  z-index: 999;
  border-radius: 5px;
}
.toast_message {
  color: #fff;
}
</style>