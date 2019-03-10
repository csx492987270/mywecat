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
    tests:[],
    curPage: 1,
    inputData:"",
    texts:{},
    content:[],
    categories:[
      { id: 0, name: "推荐"  },
      { id: 1, name: "唐诗" },
      { id: 2, name: "宋词" },
      { id: 3, name: "诗词搜索" }
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
  bindViewTap () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad () {
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
  onShow() {
    var that = this
    WXAPI.recommendPoetryApi().then(function (res) {
      that.setData({
        texts:res.result,
        content: res.result.content.split("|")
      })
    })
  },
  tabClick(e){
    var that = this
    this.setData({
      activeCategoryId: e.currentTarget.id,
      curPage: 1
    });
    switch (e.currentTarget.id){
      case "1":
        WXAPI.getTangPoetryApi({"page":2,"count":20}).then(function(res){
          var arr = res.result;
          for (var i = 0; i < arr.length;i++){
              arr[i].content = arr[i].content.split("|");
          }
          that.setData({
            tests:arr
          });
        })
      break;
      case "2":
        WXAPI.getSongPoetryApi({ "page": 2, "count": 20 }).then(function (res) {
          var arr = res.result;
          for (var i = 0; i < arr.length; i++) {
            arr[i].content = arr[i].content.split("|");
          }
          that.setData({
            tests: arr
          });
        })
      break;
      case "3":
        that.setData({
          tests: []
        });
      break;
      case "0":
        WXAPI.recommendPoetryApi().then(function(res){
          that.setData({
            texts: res.result,
            content: res.result.content.split("|")
          })
       })
      break;
    }
    
  },
  search(){
    var val=this.data.inputData
    var that = this
    WXAPI.searchPoetryApi(val).then(function (res) {
      var arr = res.result;
      for (var i = 0; i < arr.length; i++) {
        arr[i].content = arr[i].content.split("|");
      }
      that.setData({
        tests: arr
      });
    })
  },
  bindinput(e){
    this.setData({
      inputData: e.detail.value
    })
  },
  getUserInfo(e) {
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
