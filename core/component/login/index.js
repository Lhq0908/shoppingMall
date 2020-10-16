Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    }
  },
  data: {

  },
  methods: {
    _d1_userLogin(event) {
      // 未授权登录 注入登录框
      let pages = getCurrentPages();
      let currentPage = pages[pages.length - 1];
      currentPage._d1_userLogin(event)
    }
  }
})
