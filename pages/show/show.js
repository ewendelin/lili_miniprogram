// pages/show/show.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    description: "The basis of Dutch apple pie is a crust on the bottom and around the edges.",
    productname: "Apple pie",
    discount:"$40",
    oldprice:"$30",
    latitude: 23.099994,
    longitude: 113.324520,
    starttime:"22.00",
    endtime:"23:00",
    everyday:"everyday",
    restaurantname:"Grandpa's memory",
    restaurantcuisine:"Dessert, Bakery & Pastries",
    restaurantaddress:"Nanjing Xi Lu",
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
    wx.navigateTo({
      url: `../claim/claim`
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})