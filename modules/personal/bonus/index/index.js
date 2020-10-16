
// +----------------------------------------------------------------------
// | 功能描述: 我的钱包
// +----------------------------------------------------------------------
// | 时　　间: 2020/06/10 11:24
// +----------------------------------------------------------------------
// | 代码创建: 廖惠琼 <861902371@qq.com>
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
    // 时间弹窗
    timeShow: false,
    // 获取到的时间戳
    current: new Date().getTime(),
    // 选中后的时间
    currentDate: '',
    minDate: new Date(2019, 12, 1).getTime(),
    maxDate: new Date().getTime(),
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
  // 时间
  onInput(event) {
    this.setData({
      current: event.detail
    });

  },

  showPopup() {
    this.setData({
      timeShow: true,
    })
  },
  // 选择时间
  definelBind() {

    let timeStamp = this.data.current;
    timeStamp = Number(timeStamp);
    let year = new Date(timeStamp).getFullYear();
    let month = new Date(timeStamp).getMonth() + 1 < 10 ? "0" + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1;
    let date = new Date(timeStamp).getDate() < 10 ? "0" + new Date(timeStamp).getDate() : new Date(timeStamp).getDate();
    let hh = new Date(timeStamp).getHours() < 10 ? "0" + new Date(timeStamp).getHours() : new Date(timeStamp).getHours();
    let mm = new Date(timeStamp).getMinutes() < 10 ? "0" + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes();
    let ss = new Date(timeStamp).getSeconds() < 10 ? "0" + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds();
    let nowTime = year + "-" + month;
    this.setData({
      currentDate: nowTime,
      timeShow: false
    })
  },
  // 选择中日期关闭弹窗
  cancelBind() {
    this.setData({
      timeShow: false
    })
  },

})
