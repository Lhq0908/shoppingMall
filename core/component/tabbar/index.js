Component({
  options: {
    styleIsolation: 'apply-shared',
    multipleSlots: true
  },
  properties: {
    // 选中
    active: {
      type: Number,
      value: 0
    }
  },
  data: {

  },
  attached() {
    
  },
  methods: {
    change(data) {
      const { detail = 0 } = data;
      this.triggerEvent('change', detail);
    }
  }
})
