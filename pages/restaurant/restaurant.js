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
    posts: {},
    reviews: [],
    latitude: "",
    longitude: "",
    markers: [],
    array: ['★', '★★', '★★★', '★★★★', '★★★★★'],
    serverUrl: app.globalData.serverUrl.substr(0, app.globalData.serverUrl.length - 1)
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
    let post_id = options.post_id;
    wx.setStorageSync('post_id', post_id)
    let user = wx.getStorageSync('currentUserInfo')
    let userInfo;
    if (Object.keys(user).includes('avatar_url')) {
      userInfo = true;
      console.log(true)
    } else {
      userInfo = false
      console.log(false)
    }
    wx.request({
      url: `${app.globalData.serverUrl}/api/v1/posts/${post_id}/restaurants`,
      method: 'GET',
      success(res) {
        const data = res.data;
        console.log(data)
        let restaurant = data.restaurant;
        restaurant.image_url = page.data.serverUrl + restaurant.image.url
        console.log(restaurant)
        let posts = data.restaurant.posts;
        let latitude = data.restaurant.latitude;
        let longitude = data.restaurant.longitude;

        page.setData({
          restaurant: restaurant,
          posts: posts,
          userInfo: userInfo,
          'map.latitude': latitude,
          'map.longitude': longitude,
          'map.markers': [{
            latitude: latitude,
            longitude: longitude,
            iconPath: "/images/placeholder.svg",
            name: "",
            desc: ""
          }],
          'map.hasMarkers': true,
        });

        // get reviews
        wx.request({
          url: `${app.globalData.serverUrl}/api/v1/posts/${post_id}/restaurants/${restaurant.id}/reviews`,
          method: 'GET',
          success(res){
            console.log(res);
            page.setData({
              reviews: res.data
            })
          }
        })

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
  // onReady: function (e) {
  //     let page = this
  //     wx.getLocation({
  //       type: 'gcj02',
  //       success(res) {
  //         const latitude = res.latitude
  //         const longitude = res.longitude
  //         const speed = res.speed
  //         const accuracy = res.accuracy
  //         console.log(latitude, longitude, speed, accuracy)
  //         page.setData({
  //           latitude: latitude,
  //           longitude: longitude
  //         })
  //       }
  //     })
  //     this.mapCtx = wx.createMapContext('myMap')

  // },

  createReview: function () {
    let restaurant_id = this.data.restaurant.id
    wx.navigateTo({
      url: `../review/review?restaurant_id=${restaurant_id}`,
    })
  },
  createUserReview: function (e) {
    let restaurant_id = this.data.restaurant.id
    wx.setStorageSync('currentUserInfo', e.detail.userInfo)
    // wx.setStorageSync('userId', app.globalData.userId)
    let userId = app.globalData.userId;
    wx.setStorageSync('userId', userId);
    let post_id = wx.getStorageSync('post_id')
    let currentUserInfo = wx.getStorageSync('currentUserInfo');
    if (e.detail.userInfo != undefined){
      wx.navigateTo({
        url: `../review/review?post_id=${post_id}&restaurant_id=${restaurant_id}&userId=${userId}&currentUserInfo=${currentUserInfo}`,
      })
    }
  },
  /**
   * Lifecycle function--Called when page show
   */
  onShow: function (e) {
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

  // getData: function (page, post_id) {
  //   wx.request({
  //     url: `${app.globalData.serverUrl}/api/v1/posts/${post_id}/restaurants`,
  //     method: 'GET',
  //     success(res) {
  //       const data = res.data;
  //       let restaurant = data.restaurant
        
  //       // Update local data
  //       page.setData({
          
  //         restaurant: data.restaurant
  //       });
  //     }
  //   });

  //   // get reviews

  // }
})