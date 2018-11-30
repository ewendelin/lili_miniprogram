// pages/restaurant/restaurant.js
let app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    postRating: 3,
    showRatingModal: false,
    rating: [],

    restaurant: {},
    posts: {}
  },

  userRating: function () {
    if (this.data.showRatingModal) {
      this.setData({
        showRatingModal: false
      })
    } else {
      this.setData({
        showRatingModal: true
      })
    }
    
  },
    // wx.showModal ({
    //   title: 'Rate',
    //   content: 'This is a modal!',
    //   success: function (res) {
    //     if (res.confirm) {
    //       console.log('confirm')
    //     } else if (res.cancel) {
    //       console.log('cancel')
    //     }
    //   }
    // })
  // },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let page = this;
    

    // page.getData(page, post_id);
    // console.log(page);
    let post_id = options.post_id;
    // let restaurant = options.restaurant;
    console.log(post_id)


    wx.request({
      url: `${app.globalData.serverUrl}/api/v1/posts/${post_id}/restaurants`,
      method: 'GET',
      success(res) {
        const data = res.data;
        console.log(data)
        let restaurant = data.restaurant;
        console.log(restaurant)
        let posts = data.restaurant.posts;

        page.setData({
          restaurant: restaurant,
          posts: posts
        });

      }
    });




        // const data = res.data;
        // let post = data.post
        // post.new_price = post.original_price * post.discount.toFixed(1)
        // // Update local data
        // page.setData({
        //   post: post,
        //   restaurant: data.restaurant
        // });
      // }})
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function (e) {
      let page = this
      wx.getLocation({
        type: 'gcj02',
        success(res) {
          const latitude = res.latitude
          const longitude = res.longitude
          const speed = res.speed
          const accuracy = res.accuracy
          console.log(latitude, longitude, speed, accuracy)
          page.setData({
            latitude: latitude,
            longitude: longitude
          })
        }
      })
      this.mapCtx = wx.createMapContext('myMap')

  },

  createReview: function () {
    wx.navigateTo({
      url: '../review/review',
    })
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    // load reviews
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

  },

  getData: function (page, post_id) {
    wx.request({
      url: `${app.globalData.serverUrl}/api/v1/posts/${post_id}/restaurants`,
      method: 'GET',
      success(res) {
        const data = res.data;
        let restaurant = data.restaurant
        
        // Update local data
        page.setData({
          
          restaurant: data.restaurant
        });
      }
    });
  }
})