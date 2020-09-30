import axios from 'axios'
export function request(config) {
    const instance = axios.create({
        baseURL: '略略略',
        timeout: 5000
    })
    //请求拦截
    instance.interceptors.request.use(config => {
        return config
    }, error => {
    })
    //响应拦截
    instance.interceptors.response.use(res => {
        // console.log(res);
        return res.data
    }, err => {
        // console.log(err);
    })
    return instance(config)

    // .then(res => {
    //     resolve(res)
    // }).catch(err => {
    //     reject(err)
    // })
}