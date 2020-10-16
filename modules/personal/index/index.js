// pages/personal/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.selectComponent('#layout').finish();
  },

  walletClick() {
    wx.navigateTo({
      url: '/modules/personal/bonus/index/index',
    })
  },
  telClick() {
    wx.makePhoneCall({
      // phoneNumber  是不能改的
      phoneNumber: '13557216482'
    })
  },

})
