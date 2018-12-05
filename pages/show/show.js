// pages/show/show.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post: {},
    restaurant: {},
    serverUrl: app.globalData.serverUrl.substr(0, app.globalData.serverUrl.length - 1)
  },

  jumpToRestaurant(e) {
    let page = this;
    wx.navigateTo({
      url: `../restaurant/restaurant?post_id=${page.data.post.id}&restaurant_id=${page.data.restaurant.id}`
    });
  },
  jumpToClaim(e) {
    console.log(e.detail.userInfo)
    let page = this;
    wx.setStorageSync('currentUserInfo', e.detail.userInfo)
    console.log(`page: ${page}`);
    let post_id = page.data.post.id;
    // wx.setStorageSync('post_id', post_id);
    console.log(`post id : ${post_id}`);
    let post = page.data.post.name;
    console.log(`post: ${post}`);
    let restaurant = page.data.restaurant;
    // wx.setStorageSync('restaurant_id', restaurant.id);
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
    if (e.detail.userInfo != undefined) {
      wx.request({
        url: `${app.globalData.serverUrl}api/v1/posts/${post_id}/claims?user_id=${userId}`, //仅为示例，并非真实的接口地址,
        method: 'POST',
        data: claimData,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(`res: ${res.data}`)
          wx.setStorageSync('res', res);
          // wx.navigateBack({
          // })

          wx.navigateTo({
            url: `../claim/claim?id=${res.data.claim.id}&post_id=${res.data.claim.post_id}`
          });
        }
      })
    }
  },
  onLoad: function (options) {
    // Save reference to page
    let page = this;
    let post_id = options.id;
    let user = wx.getStorageSync('currentUserInfo')
    let userInfo;
    if (Object.keys(user).includes('avatar_url')) {
      userInfo = true;
      console.log(true)
    } else {
      userInfo = false
      console.log(false)
    }
    page.setData({
      userInfo: userInfo,
      currentTime: page.currentTime(),
      countDown: false
    })
    console.log(`global data on show: ${app.globalData.userId}`);

    // Get api data
    page.getData(page, post_id);
  },
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
  currentTime: function () {
    var now = new Date();
    return `${this.fillZero(now.getHours())}:${this.fillZero(now.getMinutes())}`
  },
  date_format: function (micro_second) {
    let second = Math.floor(micro_second / 1000);
    let hr = Math.floor(second / 3600);
    let min = this.fillZero(Math.floor((second - hr * 3600) / 60));
    let sec = this.fillZero((second - hr * 3600 - min * 60));
    let micro_sec = this.fillZero(Math.floor((micro_second % 1000) / 10));
    return min + ":" + sec
  },
  fillZero: function (num) {
    return num < 10 ? "0" + num : num
  },
  timeMs: function (time) {
    var timeParts = time.split(":");
    var result =  (+timeParts[0] * (60000 * 60)) + (+timeParts[1] * 60000);
    return result
  },
  timeDif: function (time1, time2){
    return (time2 - time1);
  },
  countDown: function (ms) {
    if (ms > 0) {
      this.setData({
        clock: this.date_format(ms),
      });

      ms = ms - 500
      if (this.data.stop_clock) {
        // STUFF WHEN COUNTDOWN STOPS

        this.setData({
          clock: "",
        });
      } else {
        // COUNTDOWN & REPEAT. DON'T TOUCH.
        setTimeout(() => {
          this.countDown(ms);
        }, 500);
      }
    } else if (ms == 0) {
      this.setData({
        clock: "",
        stop_clock: true
      });
    }
  },
  startCountDown: function (start_time, end_time) {
   
    let start_total = this.timeMs(start_time);
    let end_total = this.timeMs(end_time);
    let current_total = this.timeMs(this.currentTime());
    

    console.log(current_total, start_total, end_total);

    if (current_total < start_total) {
      console.log('or maybe...')
      var time = this.timeDif(current_total, start_total);
      this.countDown(time);
    } else if (current_total < end_total) {
      console.log("am i here?!")
      var time = this.timeDif(current_total, end_total);
      this.countDown(time);
    } else {
      console.log('mwahahahahaha');
      
    }


    let microseconds = this.data.currentTime
    this.setData({
      stop_clock: false
    });
    this.countDown(microseconds);
  },
  getData: function (page, post_id) {
    wx.request({
      url: `${app.globalData.serverUrl}api/v1/posts/${post_id}`,
      method: 'GET',
      success(res) {
        const data = res.data;
        let post = data.post       
        post.new_price = (post.original_price * post.discount).toFixed(0)
        post.image_url = page.data.serverUrl+post.image.url
        // Update local data
        page.setData({
          post: post,
          restaurant: data.restaurant
        });
        page.startCount();
        console.log(data.restaurant)
      }
    });
  },

  startCount: function () {
    let page = this;
    var data = page.data;
    let start_time = page.data.post.start_time;
    let end_time = page.data.post.end_time;
    page.startCountDown(start_time, end_time);
  },
})