import store from "@/store/index"
import axios from 'axios'
import nProgress from 'nprogress';
//引进样式
import "nprogress/nprogress.css";
const requests = axios.create({

    baseURL: '/api',
    timeout: 5000,
})
requests.interceptors.request.use((config) => {
    //请求之前
    //进度条开始
    if (store.state.detail.uuid_token) {
        config.headers.userTempId = store.state.detail.uuid_token //把游客Id添加进入请求头 这里的userTempId是和后端商量好的
    }
    console.log(localStorage.getItem("TOKEN"))
    if (localStorage.getItem("TOKEN")) {
        config.headers.token = localStorage.getItem("TOKEN")
    }
    nProgress.start()
    return config
})
requests.interceptors.response.use((res) => {
    //成功的回调函数
    nProgress.done()

    return res.data;

}, (err) => {
    //失败的回调函数
    nProgress.done()
    return Promise.reject(new Error('faile'));
})
export default requests