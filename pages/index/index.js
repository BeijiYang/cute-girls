//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    btnText: "还要 还要",
    hidden: false,
    items: []
  },
  //事件处理函数

 nextPage :function () {

  currentPage++

  this.setData({
    hidden: false
  })

  var that = this //通过回调传递this环境

  requestData(that) //通过api请求妹子数据
},

lower: function() {
    console.log("lowerlowerlowerlowerlowerlowerlower")
    // currentPage++

  // var that = this //通过回调传递this环境

  // requestData(that) //通过api请求妹子数据
  },

  lookAtHer: function (event) {
    console.log("spank her")
    
    // var herUrl = event.currentTarget.dataset.src

    var imageUrl = "/pages/image/image"

    var herUrl = imageUrl+"?url="+event.currentTarget.dataset.url+"&who="+event.currentTarget.dataset.who; 
    //  var herUrl = imageUrl+"?url="+event.currentTarget.dataset.url

    console.log(herUrl)
    // console.log(event.currentTarget.dataset.createdAt) //wxml中data－set不能有大写
    wx.navigateTo( {
      url: herUrl
    });
  },



  onLoad: function () {
    console.log('onLoad')
    
    var that = this //通过回调传递this环境

    requestData(that) //通过api请求妹子数据

  },


  onPullDownRefresh: function() {
    console.log(' onPullDownRefresh')

    var that = this //通过回调传递this环境

    requestData(that) //通过api请求妹子数据
      wx.stopPullDownRefresh()
    }

})

var Url = require("../../utils/url.js");

function requestData (that) {
  wx.request({
  // url: 'http://gank.io/api/data/福利/10/1',
  url: Url.cuteGirlsUrl+currentPage,

  header: {
      'Content-Type': 'application/json'
  },
  success: function(res) {
    console.log(res.data)
    bindData (res.data) //向items空数组里装填获取的数据对象
    that.setData({items: items}) //将装填好的的items数组 传给页面初始数据data

    that.setData({
      hidden: true
    })
  }
})
}

var items = [];
var i = 0;
var currentPage = 1;

function bindData (cb) {
console.log(cb)
// items.push({url: cb.results[0].url.replace( "//ww", "//ws" )}) //装填

for(i =0; i < 10; i++){
  items.push({url: cb.results[i].url.replace( "//ww", "//ws" ), who: cb.results[i].who, createdAt: cb.results[i].createdAt.slice(0,10)}) 
  console.log(items[i].url)
  console.log(items[i])
}

console.log(items)
}

