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
    wx.navigateTo({
      url: `../restaurant/restaurant`
    });
  },
  jumpToClaim(e) {
    let page = this;
    let post_id = page.data.post.id;
    let post = page.data.post;
    let restaurant = page.data.restaurant;
    let claimData = {
      claim: {
        dish: post.name,
        restaurant: restaurant.name
      }
    };
    // let userId = wx.getStorageSync('userId');
    let userId = app.globalData.userId;
    console.log(userId);

    wx.request({
      url: `${app.globalData.serverUrl}/api/v1/posts/${post_id}/claims?user_id=${userId}`, //仅为示例，并非真实的接口地址,
      method: 'POST',
      data: claimData,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        wx.navigateTo({
          url: `../claim/claim?id=${res.data}`
        });
      }
    })

    wx.navigateTo({
      url: `../claim/claim`
    });
  },

  getData: function (page, post_id) {
    wx.request({
      url: `${app.globalData.serverUrl}/api/v1/posts/${post_id}`,
      method: 'GET',
      success(res) {
        const data = res.data;
        let post = data.post
        console.log(post)
        post.start_time
        post.new_price = post.original_price * post.discount.toFixed(1)
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