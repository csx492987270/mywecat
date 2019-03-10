// 小程序开发api接口工具包，https://github.com/gooking/wxapi
const CONFIG = require('config.js')
const API_BASE_URL = 'https://api.apiopen.top'

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
  //诗词
  recommendPoetryApi:() => {
    return request('/recommendPoetry', true, 'get')
  },
  //唐诗
  getTangPoetryApi:(data) => {
    return request("/getTangPoetry",false,'get')
  },
  //宋词
  getSongPoetryApi: (data) => {
    return request("/getSongPoetry", false, 'get')
  },
  //搜索诗词
  searchPoetryApi:(name) => {
    return request("/searchPoetry", false,'get',{name})
  },
  //搜索音乐接口
  searchMusicApi: (name) => {
    return request("/searchMusic", false, 'get', { name })
  },
  //音乐电台接口：
  musicBroadcastingApi: () => {
    return request("/musicBroadcasting", false, 'get')
  },
  //音乐电台详情接口
  musicBroadcastingDetailsApi: (channelname) => {
    return request("/musicBroadcastingDetails", false, 'get', {channelname})
  },
  //音乐排行榜
  musicRankingsApi: () => {
    return request("/musicRankings", false, 'get')
  },
  //音乐排行榜详情接口：
  musicRankingsDetailsApi: (type) => {
    return request("/musicRankingsDetails", false, 'get',{type})
  },

}