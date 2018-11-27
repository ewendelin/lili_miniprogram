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
        image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3dd64dce95fceedb193ec7bcf0adbb8b&auto=format&fit=crop&w=668&q=80"
      },
      {
        name: "Apple Pie",
        distance: "80m",
        price: "25 RMB",
        image: "https://images.unsplash.com/photo-1535920527002-b35e96722eb9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2b6973ac85e7b417b5717c6fe25d0157&auto=format&fit=crop&w=668&q=80"
      },
      {
        name: "Mango Pie",
        distance: "120m",
        price: "30 RMB",
        image: "https://images.unsplash.com/photo-1460380410874-537ecece3984?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=40d22a3043b3670ecfe6a1362b891877&auto=format&fit=crop&w=694&q=80"
      },
      {
        name: "Banana Pie",
        distance: "140m",
        price: "35 RMB",
        image: "https://images.unsplash.com/photo-1538883855924-aa6be412f336?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=00caa7b6a0fa8dd362bd2e4d1a1d4b7d&auto=format&fit=crop&w=1500&q=80"
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