import Axios from 'axios'
const baseURL="http://127.0.0.1:8081"
import {getSessionStore} from "@/lib/util.js"
import { Message } from 'iview'
class httpRequest {
  constructor () {
    this.options = {
      method: '',
      url: ''
    }
    // 存储请求队列
    this.queue = {}
  }
  // 销毁请求实例
  destroy (url) {
    delete this.queue[url]
    const queue = Object.keys(this.queue)
    return queue.length
  }
  // 请求拦截
  interceptors (instance, url) {
    // 添加请求拦截器
    // instance.interceptors.request.use(config => {
    //   if (!config.url.includes('/users')) {
    //     config.headers['x-auth-token'] = getSessionStore("token")
    //   }
    //   // Spin.show()
    //   // 在发送请求之前做些什么
    //   return config
    // }, error => {
    //   // 对请求错误做些什么
    //   return Promise.reject(error)
    // })

  }
  // 创建实例
  create () {
    let conf = {
      baseURL: baseURL,
      timeout: 120000,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        //'X-URL-PATH': location.pathname
       // 'x-auth-token':getSessionStore("token")
      }
    }
    return Axios.create(conf)
  }
  // 合并请求实例
  mergeReqest (instances = []) {
    //
  }
  // 请求实例
  request (options) {
    let instance = this.create()
    this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    this.queue[options.url] = instance
    return instance(options)
  }
}
export default httpRequest
