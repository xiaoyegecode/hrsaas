import axios from 'axios'
import { Message } from 'element-ui'
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
request.interceptors.response.use(response => {
  // 1、考虑把那些数据跑出去
  // 2、接口成功并且业务成功
  // 3、没有成功 Promise.reject 跑出错误
  const { message, data, success } = response.data
  if (success) { // 业务逻辑成功
    return data
  }
  // 业务逻辑没有成功
  Message.error(message)
  return Promise.reject(new Error(message))
}, error => {
  Message.error(error.message)
  return Promise.reject(error)
})
export default request
