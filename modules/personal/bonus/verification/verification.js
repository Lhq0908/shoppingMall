// +----------------------------------------------------------------------
// | 功能描述: 我的奖励金---身份验证
// +----------------------------------------------------------------------
// | 时　　间: 2020/06/11 10:24
// +----------------------------------------------------------------------
// | 代码创建: 廖惠琼 <861902371@qq.com>
// +----------------------------------------------------------------------
// | 版本信息: V1.0.0
// +----------------------------------------------------------------------
// | 代码修改:（修改人 - 时间）
// +----------------------------------------------------------------------
Page({

  // 页面的初始数据
  data: {
    phone: '',
    sms: '',
    // 获取验证码
    sendTime: '获取验证码',
    snsMsgWait: 60
  },

  // 生命周期函数--监听页面加载

  onLoad: function(options) {

  },

  // 生命周期函数--监听页面初次渲染完成

  onReady: function() {
    this.selectComponent('#layout').finish();
  },


  // 生命周期函数--监听页面显示

  onShow: function() {

  },
  // 获取验证码
  sendCode() {
    if (this.data.phone == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    if (!(/^1[34578]\d{9}$/.test(this.data.phone))) {
      wx.showToast({
        title: '手机号有误',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    // 60秒后重新获取验证码
    var inter = setInterval(function() {
      this.setData({
        smsFlag: true,
        sendColor: '#cccccc',
        sendTime: this.data.snsMsgWait + 's后重发',
        snsMsgWait: this.data.snsMsgWait - 1
      });
      if (this.data.snsMsgWait < 0) {
        clearInterval(inter)
        this.setData({
          sendColor: '#363636',
          sendTime: '获取验证码',
          snsMsgWait: 60,
          smsFlag: false
        });
      }
    }.bind(this), 1000);
  },
  onPhone(event) {
    console.log(event.detail.value,555);
    this.setData({
      phone: event.detail.value
    })
  },

})
