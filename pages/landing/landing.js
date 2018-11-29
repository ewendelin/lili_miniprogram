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
const app = getApp()

Page({
  data: {
    inputShowed: false,
    inputVal: "",
    showMap: true,
    showMapBtn: "Hide Map",
    // items: [
    //   {
    //     name: "Apple Pie",
    //     distance: "100m",
    //     price: "$ 40",
    //     image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3dd64dce95fceedb193ec7bcf0adbb8b&auto=format&fit=crop&w=668&q=80"
    //   }
    // ]
  },

  getData() {
    let page = this;
    wx.request({
      url: `${app.globalData.serverUrl}/api/v1/posts?access_token=${app.globalData.access_token}`,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        page.setData({
          posts: res.data.posts
        })
      }
    })
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

  showItem(e) {
    const data = e.currentTarget.dataset;
    const item = data.item;

    wx.navigateTo({
      url: `../show/show?id=${item.id}`
    });
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

  onShow: function() {
    this.getData();
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