import { reGetCode, userRegister, userLogin, userGetData, logout } from '@/api/index'
const state = {
    code: "",
    password: "",
    password1: "",
    agree: "",
    token: localStorage.getItem("TOKEN"),
    userData: {}

};
const mutations = {
    GETCODE(state, data) {
        state.code = data
    },

    USERGETDATA(state, data) {
        state.userData = data
    },
    LOGOUT(state) {
        state.token = "",
            state.userData = {}
    }

};
const actions = {
    async getCode({ commit }, phoneNum) {
        let res = await reGetCode(phoneNum)

        if (res.code == 200) {
            commit("GETCODE", res.data)

        }
    },
    async userRegisters({ commit }, params) {

        let res = await userRegister(params)
        if (res.code == 200) {
            return "ok"
        } else {
            return Promise.reject("error")
        }
    },
    async userLogins({ commit }, params) {

        let res = await userLogin(params)
        if (res.code == 200) {
            commit("USERLOGINS", res.data)
            localStorage.setItem("TOKEN", res.data.token)
            return "ok"
        } else {
            return Promise.reject("error")
        }
    },
    async userGetData({ commit }) {
        let res = await userGetData()
        console.log(res.code)
        if (res.code == 200) {
            commit("USERGETDATA", res.data)

            return res.data
        } else {
            return Promise.reject("error")
        }
    },
    async logout({ commit }) {

        let res = await logout()
        if (res.code == 200) {
            commit("LOGOUT")
            localStorage.removeItem("TOKEN")
            return "ok"
        } else {
            return Promise.reject("error")
        }
    },
};
const getters = {};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}