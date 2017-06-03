Page({
  data: {
    modalHidden: true,
    toastHidden:true,
    toastText: "",
    // url: "https://avatars0.githubusercontent.com/u/16985427?v=3&s=40",
    url: "",
    who: "1024"
  },
  onLoad: function (cb) {
    console.log("onLoad image")

    this.setData({
      url: cb.url,
      who: cb.who,
    })
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
      path: '/pages/image/image',

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
    })
     console.log(res.tempFilePath)
 
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
