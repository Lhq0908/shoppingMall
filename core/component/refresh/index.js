// +---------------------------------------------------------------------- 
// | 广西西途比网络科技有限公司 www.c2b666.com 
// +---------------------------------------------------------------------- 
// | 功能描述: 下拉刷新和触底加载组件 
// +---------------------------------------------------------------------- 
// | 时　　间: 2019-11-23 01:18:07  
// +---------------------------------------------------------------------- 
// | 代码创建: 朱荻 <292018748@qq.com> 
// +---------------------------------------------------------------------- 
// | 版本信息: V1.0.0 
// +---------------------------------------------------------------------- 
// | 代码修改:（修改人 - 修改时间） 
// +----------------------------------------------------------------------

Component({
  properties: {
    more: {
      type: Boolean,
      value: false
    },
    pull: {
      type: Boolean,
      value: false
    }
  },
  data: {
    headHeight: 0,
    y: -1000,
    offset: 0,
    scrollTop: 0,
    scrollHeight: 0,
    query: null,
    // 0:下拉刷新 1:释放刷新 2:刷新中 3:刷新完成
    status: 0,
    pass: false,
    loadStatus: 0,
    loadLock: false
  },
  attached() {

  },
  ready() {
    this.data.query = this.createSelectorQuery();
    setTimeout(() => {
      this.initView();
    }, 50)
  },
  methods: {
    initView() {
      this.data.query.select('#movable-area').boundingClientRect(res => {
        this.setData({
          scrollHeight: res.height
        })
      });
      this.data.query.select('#refresh').boundingClientRect(res => {
        if (this.data.pull) {
          this.data.headHeight = res.height;
          this.setData({
            y: -res.height,
            offset: -res.height
          })
        } else {
          this.setData({
            y: 0,
            offset: 0
          })
        }
      });
      this.data.query.exec();
    },
    touchstart(event) {
      this.data.pass = true;
    },
    change(event) {
      this.data.offset = event.detail.y
      if (event.detail.y >= -10 && this.data.pass) {
        this.setData({
          status: 1
        })
      }
      this.setData({
        sss: event.detail.y,
        ddd: this.data.headHeight
      })
      if (event.detail.y <= -(this.data.headHeight - 10)) {
        this.setData({
          status: 0
        })
      }
    },
    touchend(event) {
      if (this.data.pull) {

        this.data.pass = false;
        if (this.data.status >= 2) return;
        // 判断手势释放状态
        if (this.data.offset >= -10) {
          this.setData({
            status: 1,
            y: 0
          })
        } else {
          this.setData({
            status: 0,
            y: -this.data.headHeight
          })
        }
        if (this.data.status == 1) {
          this.data.status = 2;
          this.setData({
            status: 2
          })
          this.triggerEvent('refresh');
        }

      }
    },
    pullDone() {
      if (this.data.status == 2) {
        this.setData({
          status: 3,
          y: -this.data.headHeight,
          loadStatus: 0
        })
      }
    },
    // 滚动事件
    scroll(event) {
      let { detail } = event;
      this.triggerEvent('scroll', detail);
    },
    // 触底
    lower() {
      if (this.data.more && !this.data.loadLock && this.data.loadStatus == 0) {
        this.data.loadLock = true;
        this.setData({
          showMore: true
        })
        this.triggerEvent('load');
      }
    },
    loadFinally() {
      this.data.loadLock = false;
      this.setData({
        loadStatus: 1
      })
    },
    loadDone() {
      this.data.loadLock = false;
    }
  }
})