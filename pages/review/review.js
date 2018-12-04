const app = getApp()
const AV = require('../../utils/av-weapp-min.js');
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
    // console.log(app.globalData.userId);
    let post_id = page.data.postId;
    let restaurant_id = page.data.restaurantId;

    let reviewData = {
      user_id: page.data.userId,
      // rating: e.detail.value.rating,
      rating: page.data.rating,
      restaurant_id: page.data.restaurantId,
      content: e.detail.value.content,
      // user_avatarurl: page.data.currentUserInfo.avatarUrl,
      // user_nickname: page.data.currentUserInfo.nickName
    }
    wx.setStorageSync('reviewData', reviewData)

    // console.log(`reviewData: ${reviewData}`)

    // let review = e.detail.value;
    // review["user_id"] = app.globalData.userId;
    // review["restaurant_id"] = this.data.restaurantId;
    // review["rating"] = this.data.rating;
    // let post_id = 1
    // let restaurant_id = 1
    // console.log(review);
    // // Get api data
    wx.request({
      url: app.globalData.serverUrl+`api/v1/posts/${post_id}/restaurants/${restaurant_id}/reviews`,
      method: 'POST',
      data: reviewData,
      success(res) {
        console.log(res.data)
        // set data on index page and show
        // wx.switchTab({
        //   url: `/users/show/show`
        // });
        wx.navigateTo({
          url: `../restaurant/restaurant?post_id=${post_id}`
        })
      }
    });
    // wx.navigateBack({})
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
    // wx.getStorageSync('currentUserInfo')
    // console.log(wx.getStorageSync('currentUserInfo'))
    const app = getApp();
    this.setData({
      restaurantId: options.restaurant_id,
      postId: options.post_id,
      userId: options.userId,
      currentUserInfo: options.currentUserInfo
      // restaurant: app.globalData.pupForReview
    });
  },

  takePhoto: function () {
    var page = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        let tempFilePath = res.tempFilePaths[0];
        page.setData({
          filePath: tempFilePath
        });
        new AV.File('file-name', {
          blob: {
            uri: tempFilePath,
          },
        }).save().then(function (file) {
          console.log(file.url())
          page.setData({
            remoteUrl: file.url()
          })
        }).catch("error is " + console.error);
      }
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