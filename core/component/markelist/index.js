
// +----------------------------------------------------------------------
// | 广西西途比网络科技有限公司 www.c2b666.com
// +----------------------------------------------------------------------
// | 功能描述: 超市列表组件
// +----------------------------------------------------------------------
// | 时　　间: 2020/05/05 14:30
// +----------------------------------------------------------------------
// | 代码创建: 廖惠琼 <861092371@qq.com>
// +----------------------------------------------------------------------
// | 版本信息: V1.0.0
// +----------------------------------------------------------------------
// | 代码修改:（修改人 - 修改时间）
// +----------------------------------------------------------------------
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mainImg: {
      type: String,
      value: '',
    },
    commodityName: {
      type: String,
      value: '',
    },
    saleNum: {
      type: String,
      value: '',
    },
    progress: {
      type: String,
      value: '',
    },
    quantity: {
      type: String,
      value: '',
    },
    bookingMemberPrice: {
      type: String,
      value: '',
    },
    bookingPrice: {
      type: String,
      value: '',
    },
    salePrice: {
      type: String,
      value: '',
    },
    endDate: {
      type: String,
      value: '',
    },
    arrivalDate: {
      type: String,
      value: '',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // phoneClick(event) {
    //   const dataset = event.target.dataset;
    //   this.triggerEvent('phoneClick', {
    //     phone: dataset.phone
    //   }, {})
    // }
  }
})
