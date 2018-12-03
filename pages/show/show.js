// pages/show/show.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post: {},
    restaurant: {}
  },

  jumpToRestaurant(e) {
    let page = this;
    wx.navigateTo({
      url: `../restaurant/restaurant?post_id=${page.data.post.id}&restaurant_id=${page.data.restaurant.id}`
      
    });
  },
  jumpToClaim(e) {
    console.log(e.detail.userInfo)
    let page = this;
    wx.setStorageSync('currentUserInfo', e.detail.userInfo)
    console.log(`page: ${page}`);
    let post_id = page.data.post.id;
    // wx.setStorageSync('post_id', post_id);
    console.log(`post id : ${post_id}`);
    let post = page.data.post.name;
    console.log(`post: ${post}`);
    let restaurant = page.data.restaurant;
    // wx.setStorageSync('restaurant_id', restaurant.id);
    console.log(`restaurant: ${restaurant}`);
    let claimData = {
      claim: {
        dish: page.data.post.name,
        restaurant: page.data.restaurant.name
      }
    };

    console.log(`claimdata: ${claimData.claim.dish}`);

    let userId = app.globalData.userId;
    console.log(`click btn: ${userId}`);

    wx.request({
      url: `${app.globalData.serverUrl}/api/v1/posts/${post_id}/claims?user_id=${userId}`, //仅为示例，并非真实的接口地址,
      method: 'POST',
      data: claimData,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(`res: ${res.data}`)
        wx.setStorageSync('res', res);
        // wx.navigateBack({
        // })

        wx.navigateTo({
          url: `../claim/claim?id=${res.data.claim.id}&post_id=${res.data.claim.post_id}`
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */

  

  onLoad: function (options) {
    // Save reference to page
    let page = this;
    let post_id = options.id;

    console.log(`global data on show: ${app.globalData.userId}`);

    // Get api data
    page.getData(page, post_id);
    
  },

  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  getData: function (page, post_id) {
    wx.request({
      url: `${app.globalData.serverUrl}/api/v1/posts/${post_id}`,
      method: 'GET',
      success(res) {
        const data = res.data;
        let post = data.post
        console.log(data)
        post.start_time
        post.new_price = (post.original_price * post.discount).toFixed(0)
        // Update local data
        page.setData({
          post: post,
          restaurant: data.restaurant
        });
      }
    });
  },

  onLoad: function (options) {
    let page = this;
    let post_id = options.id;
    page.getData(page, post_id);
  },
})