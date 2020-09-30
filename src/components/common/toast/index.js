import Toast from './Toast';
const obj = {

}
obj.install = (Vue) => {
    console.log("obj.install");
    //创建组件构造器
    const toastContrustor = Vue.extend(Toast);
    //用new 的方式 创建一个组件对象
    let toast = new toastContrustor();
    // document.appendChild(toast.$el)
    // 将组件对象手动挂载到元素上
    toast.$mount(document.createElement('div'))
    //将插件挂到body上‘
    document.body.appendChild(toast.$el)
    //注册全局函数
    Vue.prototype.$Toast = toast
}

export default obj