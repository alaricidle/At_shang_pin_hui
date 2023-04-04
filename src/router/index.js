import vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import detail from "@/pages/Detail"
import Search from '@/pages/Search'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from "@/pages/ShopCart"
import store from "@/store/index"
import Trade from "@/pages/Trade"
import Paysuccess from "@/pages/PaySuccess"
import Pay from "@/pages/Pay"
import Center from "@/pages/Center"
import myOrder from "@/pages/Center/myOrder"
import groupOrder from '@/pages/Center/groupOrder/groupOrder'
vue.use(VueRouter)
    //对push进行重写 解决push报错问题

let originPush = VueRouter.prototype.push
VueRouter.prototype.push = function(loacation, reslove, reject) {
    if (reslove && reject) {
        originPush.call(this, loacation, reslove, reject)
    } else {
        originPush.call(this, loacation, (value) => { console.log(value) },
            (err) => { console.log(err) })
    }

}

const router = new VueRouter({
    // mode: 'history',
    routes: [{
            path: '/home',
            component: Home,
            meta: {
                show: true
            }
        },
        {
            path: '/login',
            component: Login,
            meta: {
                show: false
            }
        },
        {
            path: '/register',
            component: Register,
            meta: {
                show: false
            }
        },
        {
            name: 'search',
            path: '/search',
            component: Search,
            meta: {
                show: false
            }
        },
        {
            name: 'detail',
            path: "/detail/:skuid?",
            component: detail,
            meta: {
                show: false
            }

        },
        {
            name: "AddCartSuccess",
            path: "/addcartsuccess",
            component: AddCartSuccess,
            meta: {
                show: true
            }
        },
        {
            name: "ShopCart",
            path: "/shopcart",
            component: ShopCart,
            meta: {
                show: true
            }

        },
        {
            path: '*',
            redirect: '/home'
        },
        {
            name: "trade",
            path: "/trade",
            component: Trade,
            meta: {
                show: true
            },
            beforeEnter: (to, from, next) => {
                if (from.path == "/shopcart") {
                    next()
                } else {
                    next(false)
                }
            }

        },
        {
            name: "pay",
            path: "/pay",
            component: Pay,
            meta: {
                show: true
            },
            beforeEnter: (to, from, next) => {
                if (from.path == "/trade") {
                    next();
                } else {
                    next(false)
                }
            }

        },
        {
            name: "center",
            path: "/center",
            component: Center,
            meta: {
                show: true
            },
            children: [{
                    name: 'myOrder',
                    path: '/center/myOrder',
                    component: myOrder
                },
                {
                    name: 'groupOrder',
                    path: '/center/groupOrder',
                    component: groupOrder
                },
                {
                    path: '/center',
                    redirect: '/center/myOrder'
                }
            ]

        },
        {
            name: "paysuccess",
            path: "/paysuccess",
            component: Paysuccess,
            meta: {
                show: true
            }

        },


    ],

    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    }
})
router.beforeEach(async(to, from, next) => {
    //to:去的那个路由的信息
    //from:从那个路由而来的信息
    //next:放行函数!!!!!! 
    //第一种：next(),放行函数，放行到它想去的路由！！！
    //第二种:next(path),守卫指定放行到那个路由去?

    //用户是否登录:取决于仓库里面是否有token！！！
    //每一次路由跳转之前需要用有用户信息在跳转,没有发请求获取用户信息在跳转！！！！
    //token
    let hasToken = localStorage.getItem('TOKEN');
    //用户信息
    let hasNickName = store.state.user.nickName;

    //用户登录
    if (hasToken) {
        //用户登录了,不能去login
        if (to.path == "/login") {
            next('/home');
        } else {
            //用户登陆了,而且还有用户信息【去的并非是login】
            if (hasNickName) {

                next();
            } else {
                //用户登陆了,但是没有用户信息 
                try {
                    //发请求获取用户信息以后在放行
                    await store.dispatch('user/userGetData');

                    next();
                } catch (error) {
                    //用户没有信息，还携带token发请求获取用户信息【失败】
                    //token【学生证失效了】
                    //token失效:本地清空数据、服务器的token通知服务器清除
                    await store.dispatch('user/logout');
                    //回到登录页，重新获取一个新的学生证
                    next('/login');
                }
            }
        }
    } else {
        // //用户未登录||目前的判断都是放行.将来这里会'回手掏'增加一些判断
        // //用户未登录:不能进入/trade、/pay、/paysuccess、/center、/center/myorder  /center/teamorder
        let toPath = to.path;
        if (toPath.indexOf('trade') != -1 || toPath.indexOf('pay') != -1 || toPath.indexOf('center') != -1) {
            next('/login?redirect=' + toPath);
        } else {
            next();
        }
    }
});
export default router