import axios from 'axios'

export default (url, method = 'GET', param = {}) => {

  // axios.interceptors.response.use(function (response) {
  //   // 对响应数据做点什么
  //   console.log('interceptors')
  //   if (response.status === 200 && response.statusText === 'OK') {
  //     return response.data
  //   }
  //   return Promise.reject("status Error")
  // }, function (error) {
  //   // 对响应错误做点什么
  //   return Promise.reject(error)
  // })

  return axios({
    method: method,
    url: `/${url}?t=${new Date().getTime()}`,
    params: { },
    data: param
    
  })
}


