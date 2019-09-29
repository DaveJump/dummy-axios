import axios from "../../src";

// const instance = axios.create({
//   csrfCookieName: 'TOKEN',
//   csrfHeaderName: 'TOKEN-HEADER'
// })

// instance.get('/csrf/get').then(res => { console.log(res) })

function getA () {
  return axios.get('/more/getA')
}

function getB () {
  return axios.get('/more/getB')
}

axios.all([getA(), getB()])
  .then(axios.spread(function (resA, resB) {
    console.log(resA)
    console.log(resB)
  }))
axios.all([getA(), getB()])
  .then(([resA, resB]) => {
    console.log(resA)
    console.log(resB)
  })
