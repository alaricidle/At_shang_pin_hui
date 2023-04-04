//对所有API进行统一管理
import requests from "./request";
import mockAxios from './MockAxios'
//轮播图的获取
export const reqBanner = () => {
        return mockAxios({
            url: '/banner',
            method: "get"
        })
    }
    //三级联动
export const reqCategoryList = () => {
        return requests({
            url: '/product/getBaseCategoryList',
            method: 'get',
        })
    }
    //floor的获取
export const reqFloor = () => {
    return mockAxios({
        url: '/floor',
        method: 'get'
    })

}

export const reqSearch = (params) => {
        return requests({
            method: "post",
            url: "/list",
            data: params

        })
    }
    // 详情页接口 /api/item/{ skuId }   get
export const reqDetail = (skuid) => {

        return requests({
            method: "get",
            url: `/item/${skuid}`,
        })
    }
    //添加购物车接口  /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdata = (skuid, skuNum) => {
        return requests({
            method: "post",
            url: `/cart/addToCart/${skuid}/${skuNum}`
        })
    }
    //   api/cart/cartList
export const reqShopCart = () => {
        return requests({
            method: "get",
            url: "/cart/cartList"
        })
    }
    //  /api/cart/deleteCart/{skuId}           删除购物车接口
export const deleteCart = (skuId) => {
        return requests({
            method: "DELETE",
            url: `/cart/deleteCart/${skuId}`

        })
    }
    //                  /api/cart/checkCart/{skuID}/{isChecked}    修改商品选中信息
export const checkCart = (skuId, isChecked) => {

        return requests({
            method: "get",
            url: `/cart/checkCart/${skuId}/${isChecked}`

        })
    }
    //    /api/user/passport/sendCode/{phone} 获取验证吗
export const reGetCode = (phoneNum) => {

        return requests({
            method: "get",
            url: `/user/passport/sendCode/${phoneNum}`

        })
    }
    // 用户注册 
export const userRegister = (params) => {
        return requests({
            method: "post",
            url: "user/passport/register",
            data: params
        })
    }
    // 用户登录 /api/user/passport/login
export const userLogin = (params) => {
        return requests({
            method: "post",
            url: "/user/passport/login",
            data: params
        })
    }
    // 用户数据登录获取   /user/passport/auth/getUserInfo
export const userGetData = () => {
        return requests({
            method: "get",
            url: "/user/passport/auth/getUserInfo"
        })
    }
    // /api/user/passport/logout 退出登录
export const logout = () => {
        return requests({
            method: "get",
            url: "/user/passport/logout"
        })
    }
    //   /api/user/userAddress/auth/findUserAddressList   //获取用户地址
export const findUserAddressList = () => {
        return requests({
            method: "get",
            url: "/user/userAddress/auth/findUserAddressList"
        })
    }
    // /api/order/auth/trade
export const tradeList = () => {
        return requests({
            method: "get",
            url: "/order/auth/trade"
        })
    }
    // /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo, data) => {
    return requests({
        method: "post",
        url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
        data: data
    })
}

// /api/payment/weixin/createNative/{orderId}
export const payment = (orderId) => {
        return requests({
            method: "get",
            url: `/payment/weixin/createNative/${orderId}`,
        })
    }
    //查询支付状态
    // /api/payment/weixin/queryPayStatus/{orderId}
export const queryPayStatus = (orderId) => {
        return requests({
            method: "get",
            url: `/payment/weixin/queryPayStatus/${orderId}`,

        })
    }
    // /api/order/auth/{page}/{limit} get
export const reqMyOrderList = (page, limit) => {
    return requests({
        url: `/order/auth/${page}/${limit}`,
        method: "get"
    })
}