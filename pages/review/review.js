Page({
  data: {
    array: ['★', '★★', '★★★', '★★★★', '★★★★★'],
    rating: 3
  },

  bindReviewChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      rating: e.detail.value
    })
  },

  userInput: function (e) {
    const app = getApp();
    const page = this;
    console.log(app.globalData.userId);
    let review = e.detail.value;
    review["user_id"] = app.globalData.userId;
    review["restaurant_id"] = this.data.restaurantId;
    review["rating"] = this.data.rating;
    let post_id = 1
    let restaurant_id = 1
    console.log(review);
    // // Get api data
    wx.request({
      url: app.globalData.serverUrl+`api/v1/posts/${post_id}/restaurants/${restaurant_id}/reviews`,
      method: 'POST',
      data: review,
      success() {
        // set data on index page and show
        // wx.switchTab({
        //   url: `/users/show/show`
        // });
        wx.navigateBack({})
      }
    });
    wx.navigateBack({})
  },
  bindPickerChange: function (e) {
    this.setData({
      rating: Number.parseInt(e.detail.value) + 1
    });
  },

  /**
   * Page initial data
   */

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log(options);
    wx.getStorageSync('currentUserInfo')
    console.log(wx.getStorageSync('currentUserInfo'))
    const app = getApp();
    this.setData({
      restaurantId: options.restaurant_id
      // restaurant: app.globalData.pupForReview
    });
  },

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

  // }
})