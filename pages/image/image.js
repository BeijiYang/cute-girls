Page({
  data: {
    // url: "https://avatars0.githubusercontent.com/u/16985427?v=3&s=40",
    url: "",
    who: "1024"
  },
  onLoad: function (cb) {
    console.log("onLoad image")

    this.setData({
      url: cb.url,
      who: cb.who
    })

    
  }
})
