import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import typeNav from "@/components/typeNav"
import pagination from "@/pagination"
import "@/mock/mockServe"
import "swiper/css/swiper.css"
import { MessageBox, Button } from 'element-ui'
import loadimage from "../public/images/1.jpg"
Vue.config.productionTip = false
    //注册为全局组件
Vue.component(typeNav.name, typeNav)
Vue.component(pagination.name, pagination)
Vue.use(Button);
import * as api from "@/api/index"
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)
Vue.use(VueLazyload, {

    loading: loadimage,


})
import '@/plugins/validate'
new Vue({
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this
        Vue.prototype.$api = api
        Vue.prototype.$msgbox = MessageBox;
        Vue.prototype.$alert = MessageBox.alert;
    },
    router,
    store
}).$mount('#app')