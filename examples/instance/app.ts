import axios from '../../src/index'

axios.request({
  method: 'post',
  url: '/instance/post',
  data: {
    foo: 'f',
    bar: 'b'
  }
})
axios.post(
  '/instance/post',
  {
    foo: 'foo',
    bar: 'bar'
  }
)

axios.get('/instance/get?foo=bar&bar=baz')

