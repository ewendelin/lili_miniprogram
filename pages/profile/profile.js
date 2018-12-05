// pages/profile/profile.js
let app = getApp();

Page({

  deleteItem: function (e) {
    const data = e.currentTarget.dataset;
    console.log(`data: ${data}`)
    const claimid = data.claimid;
    const page = this;
    const postid = data.postid;

    wx.showModal({
      title: 'CANCEL',
      content: 'Are you sure?',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: `${app.globalData.serverUrl}api/v1/posts/${postid}/claims/${claimid}`, //仅为示例，并非真实的接口地址,
            method: 'DELETE',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              console.log(res.data)
              
              wx.reLaunch({
                url: 'profile',
              })
            }
          })
        } else if (res.cancel) {
          console.log('User clicks cancel')
        }
      }
    })
  },

  jumpToRestaurant(e) {
    let page = this;
    const data = e.currentTarget.dataset;
    let postid = data.postid;
    let restaurantid = data.restaurantid;
    wx.navigateTo({
      url: `../restaurant/restaurant?post_id=${postid}&restaurant_id=${restaurantid}`
    });
  },
  /**
   * Page initial data
   */
  data: {
    claims: {}
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let user_id = wx.getStorageSync('userId');
    wx.request({
      url: `${app.globalData.serverUrl}api/v1/my_claims?user_id=${user_id}`,
      success: (res) => {
        const data = res.data;
        const my_claims = data.my_claims;
        this.setData({
          claims: my_claims
        })
      }
    });
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

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