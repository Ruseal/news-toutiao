import axios from 'axios'
import store from '@/store/'
import JSONbig from 'json-bigint'

export function request(config) {
  const instence = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/',
    timeout: 5000,
    transformResponse: [function (data) {
      try {
        return JSONbig.parse(data)
      } catch (error) {
        console.log("转换失败");
        return data
      }
    }]
  })
  instence.interceptors.request.use(config => {
    const { user } = store.state
    if(user){
      config.headers.Authorization = `Bearer ${user.token}`
    }
    console.log('请求发送服务器成功');
    return config
  }, err => {})
  instence.interceptors.response.use(res => {
    console.log('服务器响应成功')
    return res
  },err => console.log('服务器响应失败'))
  return instence(config)
}