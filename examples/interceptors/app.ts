import axios from '../../src/index'

axios.interceptors.request.use(config => {
  console.log(config, 'interceptor-req11')
  return config
})

axios.interceptors.request.use(config => {
  console.log(config, 'interceptor-req22')
  return config
})

axios.interceptors.response.use(res => {
  console.log(res, 'interceptor-res11')
  return res
}, error => {
  console.log(error, 'interceptor-res11-error!!')
  return Promise.reject(error)
})

axios.interceptors.response.use(res => {
  console.log(res, 'interceptor-res22')
  return res
})

const interceptor = axios.interceptors.response.use(res => {
  console.log(res, 'interceptor-res33')
  return res
})

axios.interceptors.response.eject(interceptor)

axios.get('/inter/get?foo=bar')
  .then(res => {
    console.log(res, 'res')
  })

axios.get('/interceptors/get?foo=bar')
  .then(res => {
    console.log(res, 'res')
  })
