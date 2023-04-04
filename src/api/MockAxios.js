import axios from 'axios'
import nProgress from 'nprogress';
//引进样式
import "nprogress/nprogress.css";
const requests = axios.create({

    baseURL: '/mock',
    timeout: 5000,
})
requests.interceptors.request.use((config) => {
    //请求之前
    //进度条开始
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