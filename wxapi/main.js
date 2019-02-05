// 小程序开发api接口工具包，https://github.com/gooking/wxapi
const CONFIG = require('config.js')
const API_BASE_URL = 'https://www.apiopen.top'

const request = (url, needSubDomain, method, data) => {
  let _url = API_BASE_URL + (needSubDomain ? '/' + CONFIG.subDomain : '') + url
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: method,
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(request) {
        resolve(request.data)
      },
      fail(error) {
        reject(error.data)
      },
      complete(aaa) {
        // 加载完成
      }
    })
  })
}

module.exports = {
  request,
  getWeatherApi: (city) => {
    return request('/weatherApi', false, 'get', {city})
  },
  getImgApi:(data) =>{
    return request('/satinApi', false, 'get', data)
  },
  newsApi:() =>{
    return request('/journalismApi', false, 'get')
  }
}