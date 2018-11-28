// pages/claim/claim.js
Page({

  deleteItem: function (e) {
    const data = e.currentTarget.dataset;
    const itemid = data.itemid;
    const page = this
    console.log(data)

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
    longitude: 113.324520
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