Page({
  data: {
    modalHidden: true,
    toastHidden:true,
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
  }
})

function downloadImage(that) {
   wx.downloadFile({
   url: that.data.url,
   type: 'image',
   success: function(res) {
     console.log("download success")
     that.setData({
      toastHidden: false
    })
    }
  })
} 

