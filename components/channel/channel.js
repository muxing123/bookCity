// components/channel/channel.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    obj: {
      type: Object,
      default: () => {}
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
    goTo(e) {
      let name = e.currentTarget.dataset.name
      let gender = e.currentTarget.dataset.gender
      wx.navigateTo({
        url: `/pages/major/major?name=${name}&gender=${gender}`,
      })
    }
  }
})