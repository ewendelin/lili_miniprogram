// pages/claim/claim.js
let app = getApp();

Page({

  deleteItem: function (e) {
    const data = e.currentTarget.dataset;
    const itemid = data.itemid;
    const page = this
    console.log(data);

    wx.showModal({
      title: 'CANCEL',
      content: 'Are you sure?',
      success: function (res) {
        if (res.confirm) {
          // var page = 
          wx.request({
            url: `${app.globalData.serverUrl}/api/v1/items/${itemid}?access_token=${app.globalData.access_token}`, //仅为示例，并非真实的接口地址,
            method: 'DELETE',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              console.log(res.data)
              page.getData()
              // page.setData({
              //   items: res.data.items
              // })

            }
          })
        } else if (res.cancel) {
          console.log('User clicks cancel')
        }
      }
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 23.099994,
    longitude: 113.324520,
    claim: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let page = this;
    console.log(options.post_id);
    

    // let post_id = 
    // page.getData(page, post_id);

    // // Save reference to page
    // console.log(options);
    // let page = this;
    // let post_id = options.post_id;
    // let claim_id = options.id;

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

  },

  getData: function (page) {
    // let post_id = ;
    // let claim_id = ;

    // wx.request({
    //   url: `${app.globalData.serverUrl}/api/v1/posts/${post_id}/claims/${claim_id}`,
    //   method: 'GET',
    //   success(res) {
    //     const data = res.data;
    //     // Update local data
    //     page.setData({
          
    //     });
    //   }
    // });
  }

})