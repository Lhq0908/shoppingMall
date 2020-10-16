Component({
  options: {
    styleIsolation: 'shared',
    multipleSlots: true
  },
  properties: {
    // 模式 default custom
    model: {
      type: String,
      value: 'default'
    },
    customBack: {
      type: Boolean,
      value: false
    },
    // 标题
    title: {
      type: String,
      value: ''
    },
    // 状态栏颜色模式  light  black
    type: {
      type: String,
      value: 'black'
    },
    // 浮动
    fixed: {
      type: Boolean,
      value: false,
    },
    // 背景色
    background: {
      type: String,
      value: '#ffffff'
    },
    // 隐藏返回
    showBack: {
      type: Boolean,
      value: true
    },
    // 隐藏首页
    showHome: {
      type: Boolean,
      value: false
    },
    // 开启下拉
    pull: {
      type: Boolean,
      value: false
    },
    // 开启加载
    more: {
      type: Boolean,
      value: false
    }
  },
  data: {
    _showLogin_: false,
    status: 'loading',
    cap: null,
    capbg: false,
    color: '#ffffff',
    // 动画实例
    changeColor: null,
    // 是否滚动
    isScroll: false
  },
  attached() {
    // 模式为自定义头部
    this.view();
  },
  methods: {
    view() {
      let statusColor = '#ffffff';
      if (this.data.fixed) {
        this.change2color(0, 0);
      } else if (this.data.type == 'black') {
        let ct = '#000000';
        statusColor = ct;
        this.setData({
          color: ct,
          capbg: false
        })
      }
      // 设置状态栏颜色
      wx.setNavigationBarColor({
        frontColor: statusColor,
        backgroundColor: 'transparent'
      })

      // 左侧自定义胶囊长宽
      let c = wx.getMenuButtonBoundingClientRect();

      let lcapTop = c.top - wx.getSystemInfoSync().statusBarHeight;

      this.setData({
        cap: c,
        lcapTop
      })
      let _this = this;
      // 获取系统各种栏高度并设置界面高度
      wx.getSystemInfo({
        success(res) {
          let isIos = res.system.indexOf('iOS') > -1;
          _this.setData({
            // 设置状态栏高度
            statusBarHeight: res.statusBarHeight,
            // 设置导航栏高度
            navigationBarHeight: isIos ? 44 : 48
          })
        }
      })
      // 返回导航栏信息
      this.createSelectorQuery().select('.d1-header').boundingClientRect(res => {
        this.triggerEvent('rect', res);
      }).exec();
    },
    home() {
      const { appLaunchInfo } = __wxConfig;
      const { path = {} } = appLaunchInfo;
      wx.reLaunch({
        url: '/' + path
      })
    },
    back() {
      if (this.data.customBack) {
        this.triggerEvent('back', {}, {})
      } else {
        wx.navigateBack();
      }
    },
    // 重试
    retry() {
      this.triggerEvent('retry', {}, {})
    },
    // 完成
    finish() {
      this.setData({
        status: 'finish'
      })
    },
    // 加载中
    loading() {
      this.setData({
        status: 'loading'
      })
    },
    // 失败
    fail() {
      this.setData({
        status: 'fail'
      })
    },
    scroll(event) {
      let { detail } = event;
      this.triggerEvent('scroll', detail);
      if (this.data.fixed) {
        const { detail } = event;
        let speed = 400;
        if (detail.scrollTop > 10) {
          this.setData({
            isScroll: true,
            color: '#000000',
            capbg: true
          })
          wx.setNavigationBarColor({
            frontColor: '#000000',
            backgroundColor: 'transparent'
          })
          this.change2color(1, speed);
        } else {
          this.setData({
            isScroll: false,
            color: '#ffffff',
            capbg: false
          })
          wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: 'transparent'
          })
          this.change2color(0, speed);
        }
      }
    },
    change2color(opacity, speed) {
      const animation = wx.createAnimation({
        duration: speed,
        timingFunction: 'linear'
      });
      animation.opacity(opacity).step()
      this.setData({
        changeColor: animation.export()
      })
    },
    // 显示登录框
    showLogin() {
      this.setData({
        _showLogin_: true
      })
    },
    // 隐藏登录框
    hideLogin() {
      this.setData({
        _showLogin_: false
      })
    },
    // 下拉刷新
    refresh() {
      this.triggerEvent('refresh');
    },
    // 刷新完成
    pullDone() {
      if (this.data.status == 'finish') {
        this.selectComponent('#refresh').pullDone();
      }
    },
    // 加载更多
    load() {
      if (this.data.status == 'finish') {
        this.triggerEvent('load');
      }
    },
    // 加载最后
    finally() {
      if (this.data.status == 'finish') {
        this.selectComponent('#refresh').loadFinally();
      }
    },
    // 加载完成
    loadDone() {
      if (this.data.status == 'finish') {
        this.selectComponent('#refresh').loadDone();
      }
    }
  }
})