//index.js
const WXAPI = require('../../wxapi/main')
const CONFIG = require('../../config.js')
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    activeCategoryId: 0,
    curPage: 1,
    categories:[
      { id: 0, name:"全部"  },
      { id: 1, name: "唐诗" },
      { id: 2, name: "宋词" },
      { id: 3, name: "元曲" }
      ],
    verse:"",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
      {url:'./../../images/shi.jpeg'},
      {url: './../../images/he.jpg' },
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function () {
    var that = this
    WXAPI.recommendPoetryApi().then(function (res) {
      console.log(res)
    })
  },
  tabClick:function(e){
    this.setData({
      activeCategoryId: e.currentTarget.id,
      curPage: 1
    });
    switch (e.currentTarget.id){
      case "1":
        WXAPI.getTangPoetryApi({"page":1,"count":20}).then(function(res){
          console.log(res)
        })
      break;
      case "2":
      break;
      case "0":
        WXAPI.recommendPoetryApi().then(function(res){
        console.log(res)
       })
      break;
    }
    
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  changeIndicatorDots(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  }
})
