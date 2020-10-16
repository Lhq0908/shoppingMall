
// +----------------------------------------------------------------------
// | 功能描述: 分类
// +----------------------------------------------------------------------
// | 时　　间: 2020/10/08 10:50
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
    classifyItems: [{
      id: 1,
      name: '热销商品',
      shopClassifyDtoList: [{
        oid: '001',
        imgUrl: '../../assets/banner_01.jpg',
        name: '恐龙餐盒'
      }]
    }, {
      id: 2,
      name: '恐龙餐盒',
      shopClassifyDtoList: [{
        oid: '001',
        imgUrl: '../../assets/kv-1.jpg',
        name: '恐龙餐盒'
      }, {
        oid: '002',
        imgUrl: '../../assets/banner_01.jpg',
        name: '恐龙餐盒'
      }, {
        oid: '002',
        imgUrl: '../../assets/kv-1.jpg',
        name: '恐龙餐盒'
      },
      {
        oid: '002',
        imgUrl: '../../assets/banner_01.jpg',
        name: '恐龙餐盒'
      },]

    }],
    curNav: 1,
    curIndex: 0
  },

  onLoad: function (options) {
    this.selectComponent('#layout').finish();
  },
  // 点击切换
  switchRightTab(e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },

})
