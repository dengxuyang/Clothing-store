import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store'
import Toast from 'components/common/toast';
Vue.config.productionTip = false
//事件总线
Vue.prototype.$bus = new Vue()
//安装toast插件
Vue.use(Toast)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
