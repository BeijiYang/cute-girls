Page({
  data: {
    btnText: "翻牌子",
    items: [],
    currentPage: 9,
    modalHidden: true,
    toastHidden:true,
    loadinghidden:false,
    toastText: "",
    // url: "https://avatars0.githubusercontent.com/u/16985427?v=3&s=40",
    url: "",
    who: "1024"
  },
  onLoad: function (cb) {
    console.log("onLoad image")
    var that = this;
     randomNumber(that)
     requestData(that)

    this.setData({
      url: cb.url,
      who: cb.who,
    })
  },

   requestGirl: function() {
       var that = this;
       randomNumber(that)
       requestData(that)
    },

  onlongtap: function() {
    this.setData({
      modalHidden: false
    })
  },

  save: function() {
   var that = this;
   downloadImage(that);
   this.setData({
      modalHidden: true
    })
  },

  cancel: function() {
    this.setData({
      modalHidden: true
    })
  },
  toastChange: function() {
    this.setData({
      toastHidden: true
    })
  },
  onShareAppMessage: function () {
    var that = this
    return {
      title: '粉嫩妹子图',
      path: '/pages/random/random',

      success: function (res) {
        that.setData({
          toastHidden: false,
          toastText: "分享成功"
        })
        console.log("分享成功");
      },
      fail: function (res) {
        that.setData({
          toastHidden: false,
          toastText: "分享失败"
        })
        console.log("分享失败");
      }
    }
  }
})

function downloadImage(that) {
   wx.downloadFile({
   url: that.data.url,
   type: 'image',
   success: function(res) {
     console.log("download success")
     that.setData({
      toastHidden: false,
      toastText: "已带走"
    });
    let filePath = res.tempFilePath
    wx.saveImageToPhotosAlbum({
       filePath: filePath,
       success(res) {
         console.log("保存到本地路径: " + filePath)
       }
     })
    },
    fail: function() {
      that.setData({
        toastHidden: false,
        toastText: "带走失败"
      })
    }
  })
} 

var Url = require("../../utils/url.js");

function requestData (that) {
  wx.request({
  // url: 'http://gank.io/api/data/福利/1/2',
  url: Url.randomGirlUrl+that.data.currentPage,

  header: {
      'Content-Type': 'application/json'
  },
  success: function(res) {
    console.log(res.data)
    console.log(that.data.currentPage)
    bindData (res.data) //向items空数组里装填获取的数据对象
    that.setData({url: items[(items.length-1)].url}) //将装填好的的items数组 传给页面初始数据data

    that.setData({
      loadinghidden: true
    })
  }
})
}

function randomNumber(that) {
  var currentPage = Math.round(Math.random()*(356-0)+0) //经测试，目前最多356张图
  console.log(currentPage)
  that.setData({
    currentPage: currentPage
  })
}

var items = [];

function bindData (cb) {
console.log(cb)
items.push({url: cb.results[0].url.replace( "//ww", "//ws" )}) //装填

console.log(items[0].url)
}
