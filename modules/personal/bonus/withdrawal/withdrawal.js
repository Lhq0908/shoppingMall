// +----------------------------------------------------------------------
// | 功能描述: 我的奖励金---提现
// +----------------------------------------------------------------------
// | 时　　间: 2020/06/10 13:24
// +----------------------------------------------------------------------
// | 代码创建: （廖惠琼 <861902371@qq.com>
// +----------------------------------------------------------------------
// | 版本信息: V1.0.0
// +----------------------------------------------------------------------
// | 代码修改:（修改人 - 时间）
// +----------------------------------------------------------------------
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 提示弹窗
    popupShow: false,
    total: 999
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
    this.selectComponent('#layout').finish();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  // 全部提现
  totalClick(e) {
    this.setData({
      balance: e.currentTarget.dataset.total
    })
  },
  // 输入金额
  onBalance(e) {
    console.log(e);
    this.setData({
      balance: e.detail.value
    })
  },
  // 未绑定微信弹窗
  dialogClick() {
    // this.setData({
    //   popupShow: true
    // })
    if (this.data.total == 0) {
      wx.showToast({
        title: '余额不足',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    if (this.data.balance > this.data.total) {
      wx.showToast({
        title: '输入金额超过余额',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
  },
})
