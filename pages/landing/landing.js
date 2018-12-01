// // pages/landing/landing.js
// Page({
  

//   /**
//    * Page initial data
//    */
//   data: {

//   },

//   /**
//    * Lifecycle function--Called when page load
//    */

//   /**
//    * Lifecycle function--Called when page is initially rendered
//    */
//   onReady: function () {

//   },

//   /**
//    * Lifecycle function--Called when page show
//    */
//   onShow: function () {

//   },

//   /**
//    * Lifecycle function--Called when page hide
//    */
//   onHide: function () {

//   },

//   /**
//    * Lifecycle function--Called when page unload
//    */
//   onUnload: function () {

//   },

//   /**
//    * Page event handler function--Called when user drop down
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * Called when page reach bottom
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * Called when user click on the top right corner to share
//    */
//   onShareAppMessage: function () {

//   }
// })
let app = getApp();
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    showMap: true,
    showMapBtn: "Hide Map",
    items: [],
    showPanel:false,
    markers: [{
      iconPath: "/images/placeholder.png",
      id: 0,
      latitude: 31.233333,
      longitude: 121.466666,
      width: 30,
      height: 30,
    }],
    post: {}
  },
  
  onLoad: function (options) {
    let page = this
    wx.request({
      url: `${app.globalData.serverUrl}api/v1/posts`,
      success: (res) => {
        const data = res.data;
        let posts = data.posts
        posts = posts.map((post) => {
          post.new_price = (post.original_price * post.discount.toFixed(1)).toFixed(0)
          return post
        });
        page.setData({
          items: posts
        })
      }
    })
  },
  markertap: function(){
    this.setData({
      showPanel: true
    });
  },

  closePanel: function() {
    this.setData ({
      showPanel: false
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
        post.new_price = post.original_price * post.discount.toFixed(0)
        // Update local data
        page.setData({
          post: post,
          restaurant: data.restaurant
        });
      }
    });
  },

  toggleMap: function() {
    console.log('Toggle Map A Go')
    if (this.data.showMap) {
      this.setData({
        showMap: false,
        showMapBtn: "Show Map"
      });
    } else {
      this.setData({
        showMap: true,
        showMapBtn: "Hide Map"
      })
    }
  },

  showItem(e) {
    const data = e.currentTarget.dataset;
    const item = data.item;

    wx.navigateTo({
      url: `../show/show?id=${item.id}`
    });
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    let page = this;
    wx.request({
      url: `${app.globalData.serverUrl}/api/v1/posts?keyword=${e.detail.value}`,
      success: (res) => {
        page.setData({
          items: res.data.posts
        })
      }
    })
  },

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

});