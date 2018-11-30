// pages/show/show.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post: {},
    restaurant: {}
    // description: "The basis of Dutch apple pie is a crust on the bottom and around the edges.",
    // productname: "Apple pie",
    // discount:"$40",
    // oldprice:"$30",
    // latitude: 23.099994,
    // longitude: 113.324520,
    // starttime:"22.00",
    // endtime:"23:00",
    // everyday:"everyday",
    // restaurantname:"Grandpa's memory",
    // restaurantcuisine:"Dessert, Bakery & Pastries",
    // restaurantaddress:"Nanjing Xi Lu",
    //    items: [
    //   {
    //     content: "aaa",
    //     image: "/images/avata-dog.png"
    //   },
    //   {
    //     content: "aaa",
    //     image: "/images/avata-dog.png"
    //   }
    // ]
  },

  jumpToRestaurant(e) {
    wx.navigateTo({
      url: `../restaurant/restaurant`
    });
  },
  jumpToClaim(e) {
    let page = this;
    console.log(`page: ${page}`);
    let post_id = page.data.post.id;
    console.log(`post id : ${post_id}`);
    let post = page.data.post.name;
    console.log(`post: ${post}`);
    let restaurant = page.data.restaurant;
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
        // wx.setStorageSync('res', res)
        // wx.navigateBack({
        // })
        wx.navigateTo({
          url: `../claim/claim?id=${res.data}`
        });
      }
    })

    wx.navigateTo({
      url: `../claim/claim`
    });
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
        post.new_price = post.original_price * post.discount.toFixed(1)
        // Update local data
        page.setData({
          post: post,
          restaurant: data.restaurant
        });
      }
    });
  }
})