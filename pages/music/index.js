// pages/music/index.js
const WXAPI = require('../../wxapi/main')
const CONFIG = require('../../config.js')
//获取应用实例
const app = getApp()

Page({
  data: {
    poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    name: '一生有你',
    show: true,
    author: '水木年华',
    src: '',
  },
  onReady(e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  onShow() {
    var that = this
    var val = "一生有你"
    var value = 'public_tuijian_spring'
    WXAPI.searchMusicApi(val).then(function (res) {
      that.setData({
        src: res.result[0].url
      });
    })
    
    WXAPI.musicRankingsApi().then(function (res) {  
    })
    WXAPI.musicRankingsDetailsApi(3).then(function (res) {  
    })
  },
  audioPlay() {
    this.audioCtx.play()
  },
  audioPause() {
    this.audioCtx.pause()
  },
  audio14() {
    this.audioCtx.seek(14)
  },
  audioStart() {
    this.audioCtx.seek(0)
  }
})