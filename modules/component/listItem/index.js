//index.js
//获取应用实例
Component({
  /**
   * 组件的属性列表
   */
  // properties: {
  //   // name: {
  //   //   type: String,
  //   //   value: '',
  //   // },
  //   // thumb: {
  //   //   type: String,
  //   //   value: '',
  //   // },
  //   // price: {
  //   //   type: String,
  //   //   value: '',
  //   // },
  //   // distance: {
  //   //   type: String,
  //   //   value: '',
  //   // },
  //   // level: {
  //   //   type: String,
  //   //   value: '',
  //   // },


  // },
  data: {
    imgUrls: [
      '../../assets/banner_01.jpg',
      '../../assets/banner_02.jpg',
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
  onLoad: function (options) {
    this.selectComponent('#layout').finish();
  },

  detailClick(e) {
    console.log(e.currentTarget.dataset.index)

  }

})
