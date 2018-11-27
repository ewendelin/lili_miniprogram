// // pages/landing/landing.js
// Page({
  

//   /**
//    * Page initial data
//    */
//   data: {

//   },

//   /**
//    * Lifecycle function--Called when page load
//    */
//   onLoad: function (options) {

//   },

//   /**
//    * Lifecycle function--Called when page is initially rendered
//    */
//   onReady: function () {

//   },

//   /**
//    * Lifecycle function--Called when page show
//    */
//   onShow: function () {

//   },

//   /**
//    * Lifecycle function--Called when page hide
//    */
//   onHide: function () {

//   },

//   /**
//    * Lifecycle function--Called when page unload
//    */
//   onUnload: function () {

//   },

//   /**
//    * Page event handler function--Called when user drop down
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * Called when page reach bottom
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * Called when user click on the top right corner to share
//    */
//   onShareAppMessage: function () {

//   }
// })

Page({
  data: {
    inputShowed: false,
    inputVal: "",
    showMap: true,
    showMapBtn: "Hide Map",
    items: [
      {
        name: "Pumpkin Pie",
        distance: "100m",
        price: "10 RMB",
        image: "/images/pie1.jpg"
      },
      {
        name: "Apple Pie",
        distance: "80m",
        price: "25 RMB",
        image: "/images/pie2.jpg"
      },
      {
        name: "Mango Pie",
        distance: "120m",
        price: "30 RMB",
        image: "/images/pie3.jpg"
      },
      {
        name: "Banana Pie",
        distance: "140m",
        price: "35 RMB",
        image: "/images/pie4.jpg"
      },
    ]
  },
  
  toggleMap: function() {
    console.log('Toggle Map A Go')
    if (this.data.showMap) {
      this.setData({
        showMap: false,
        showMapBtn: "Show Map"
      });
    } else {
      this.setData({
        showMap: true,
        showMapBtn: "Hide Map"
      })
    }
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  onReady: function (e) {
    let page = this
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        console.log(latitude, longitude, speed, accuracy)
        page.setData({
          latitude: latitude,
          longitude: longitude
        })
      }
    })
    this.mapCtx = wx.createMapContext('myMap')
  },

});