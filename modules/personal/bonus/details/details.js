// modules/user/bonus/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 屏幕高度
    scroll_height: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.scrollHeight()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.selectComponent('#layout').finish();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  scrollHeight() {
    // 获取页面高度，设置背景色，公用方法
    // 屏幕的高度
    let windowHeight = wx.getSystemInfoSync().windowHeight
    // 屏幕的宽度
    let windowWidth = wx.getSystemInfoSync().windowWidth
    this.setData({
      scroll_height: windowHeight * 750 / windowWidth
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
