import axios from '../../src/index'

const CancelToken = axios.CancelToken

const source = CancelToken.source()

axios.get('/cancel/get', {
  cancelToken: source.token
})
  // .catch(e => {
  //   if (axios.isCancel(e)) {
  //     console.log(e.message)
  //   }
  // })

setTimeout(() => {
  source.cancel('canceled!!')
}, 1000)

setTimeout(() => {
  // throw if cancel token have been used, and the request will not be sent
  axios.get('/cancel/get', {
    cancelToken: source.token
  })
}, 2000)
