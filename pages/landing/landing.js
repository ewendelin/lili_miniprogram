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
// var sliderWidth = 96;
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    showMap: true,
    showMapBtn: "Hide Map",
    items: [],
    serverUrl: app.globalData.serverUrl.substr(0, app.globalData.serverUrl.length - 1),
    showPanel:false,
    markers: [{
      iconPath: "/images/placeholder.svg",
      id: 0,
      latitude: 31.233333,
      longitude: 121.466666,
      width: 30,
      height: 30,
    }],
    post: {},
    // tabs: ["选项一", "选项二", "选项三"],
    // activeIndex: 1,
    // sliderOffset: 1,
    // sliderLeft: -1
  },
  
  // onLoad: function (options) {
  //   items: []
  // },
  // navbar
  onLoad: function(options) {
    // var that = this;
    // wx.getSystemInfo({
    //   success: function (res) {
    //     that.setData({
    //       sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
    //       sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
    //     });
    //   }
    // });
    let page = this
    wx.request({
      url: `${app.globalData.serverUrl}api/v1/posts`,
      success: (res) => {
        const data = res.data;
        let posts = data.posts
        posts = posts.map((post) => {
          post.new_price = (post.original_price * post.discount).toFixed(0);
          return post
        });
        let markers = posts.map((post) => {
          return {
            iconPath: "/images/placeholder.svg",
            id: post.id,
            width: 30,
            height: 30,
            longitude: post.longitude,
            latitude: post.latitude
          }
        })
        console.log(posts)
        page.setData({
          items: posts,
          markers: markers
        })
      }
    })

  },

  //    * Page event handler function--Called when user drop down
  //    */
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading();
    this.onLoad();
    wx.hideNavigationBarLoading();
    console.log('refresh');
    wx.stopPullDownRefresh();
  },

  markertap: function(e){
    console.log(e.markerId)
    let id = e.markerId
    console.log("id",id)
    let rest = this.data.items.filter(function(item) {
      return item.id == id
    })
    console.log(rest)
    this.setData({
      showPanel: true,
      rest: rest[0]
    });
  },

  closePanel: function() {
    this.setData ({
      showPanel: false
    });
  },

  jumpToShow: function(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../show/show?id=${id}`
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

  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
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
// navbar 
  // tabClick: function (e) {
  //   this.setData({
  //     sliderOffset: e.currentTarget.offsetLeft,
  //     activeIndex: e.currentTarget.id
  //   });
  // },

  onReady: function(e) {
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