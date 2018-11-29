// pages/restaurant/restaurant.js
var app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    postRating: 3,
    showRatingModal: false,
    rating: [],
  },

  getData: function(post_id) {

  },

  userRating: function () {
    if (this.data.showRatingModal) {
      this.setData({
        showRatingModal: false
      })
    } else {
      this.setData({
        showRatingModal: true
      })
    }
    
  },
    // wx.showModal ({
    //   title: 'Rate',
    //   content: 'This is a modal!',
    //   success: function (res) {
    //     if (res.confirm) {
    //       console.log('confirm')
    //     } else if (res.cancel) {
    //       console.log('cancel')
    //     }
    //   }
    // })
  // },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
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

  createReview: function () {
    wx.navigateTo({
      url: '../review/review',
    })
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    // load reviews
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})