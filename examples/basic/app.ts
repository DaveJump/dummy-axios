import axios from '../../src/index'

// axios({
//   method: 'get',
//   url: '/basic/get',
//   params: {
//     a: 1,
//     b: 2
//   }
// })

// axios({
//   method: 'get',
//   url: '/basic/get',
//   params: {
//     foo: ['bar', 'baz']
//   }
// })

// axios({
//   method: 'get',
//   url: '/basic/get',
//   params: {
//     foo: new Date()
//   }
// })

// axios({
//   method: 'get',
//   url: '/basic/get#',
//   params: {
//     foo: {
//       foo: 'bar'
//     }
//   }
// })

// axios({
//   method: 'get',
//   url: '/basic/get#link',
//   params: {
//     foo: '@bar:baz foo$',
//     baz: null,
//     bar: undefined
//   }
// })

axios({
  method: 'post',
  url: '/basic/post',
  data: {
    foo: 'foo',
    bar: 'bar'
  }
}).then(res => {
  console.log(res, 'response')
})

// axios({
//   method: 'post',
//   url: '/basic/post',
//   data: {
//     foo: 'foo',
//     bar: 'bar'
//   },
//   headers: {
//     'content-type': 'application/json',
//     'Accept': 'application/json, text/plain, */*'
//   },
//   responseType: 'json'
// }).then(res => {
//   console.log(res, 'response')
// })

const paramsString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramsString)
// const formData = new FormData()
// formData.append('topic', 'api')

axios({
  method: 'post',
  url: '/basic/post',
  data: searchParams
})
