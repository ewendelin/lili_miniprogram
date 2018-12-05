// pages/claim/claim.js
let app = getApp();

Page({

  deleteItem: function (e) {
    const page = this;
    const data = e.currentTarget.dataset;
    const claimid = data.claimid;
    const postid = page.data.post.id;
    
    console.log(data);

    wx.showModal({
      title: 'CANCEL',
      content: 'Are you sure?',
      success: function (res) {
        if (res.confirm) {
          // var page = 
          wx.request({
            url: `${app.globalData.serverUrl}api/v1/posts/${postid}/claims/${claimid}`, //仅为示例，并非真实的接口地址,
            method: 'DELETE',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              console.log(res.data)
              // page.getData()
              // page.setData({
              //   items: res.data.items
              // })
              wx.navigateBack({
                
              })      
            }
          })
        } else if (res.cancel) {
          console.log('User clicks cancel')
        }
      }
    })
  },

  goLanding: function(e) {
    wx.reLaunch({
      url: '../landing/landing',
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    latitude: "",
    longitude: "",
    markers: [],
    claim: {},
    post: {},
    restaurant: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let page = this;
    console.log(options.post_id)
    console.log(options.id)
    let post_id = options.post_id;
    let id = options.id;
    
    wx.request({
      url: app.globalData.serverUrl + `api/v1/posts/${post_id}/claims/${id}`,
    
    method: 'GET',
    success(res){
      const data = res.data;
      console.log(data)
      let claim = data.claim;
      let post = data.post;
      let restaurant = data.restaurant;
      let latitude = data.restaurant.latitude;
      let longitude = data.restaurant.longitude;
      console.log(latitude)
      console.log(longitude)
      page.setData({
        claim: claim,
        post: post, 
        restaurant: restaurant,
        'mop.latitude': latitude,
        'mop.longitude': longitude,
        'mop.markers': [{
          latitude: latitude,
          longitude: longitude,
          iconPath: "/images/placeholder.svg",
          name: "",
          desc: ""
        }],
        'map.hasMarkers': true,
      });
    }});
    
    
    // // Get api data
    // wx.request({
    //   url: `${app.globalData.serverUrl}/api/v1/posts/${post_id}/claims/${claim_id}`,
    //   method: 'GET',
    //   success(res) {
    //     const data = res.data;
    //     console.log(data);
    //     // let post = data.post
    //     // post.new_price = post.original_price * post.discount.toFixed(1)
    //     // // Update local data
    //     // page.setData({
    //     //   post: post,
    //     //   restaurant: data.restaurant
    //     // });
    //   }
    // });
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