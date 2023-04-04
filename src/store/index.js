import vuex from "vuex"
import vue from 'vue'
import home from './home'
import search from './search'
import detail from './detail'
import shopCart from "./shopCart/index"
import user from "./user"
import trade from "./trade"
vue.use(vuex)
export default new vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopCart,
        user,
        trade
    }
})