// components/list/list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      default: () => []
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
      let title = e.currentTarget.dataset.title
      let id = e.currentTarget.dataset.id
      let month = e.currentTarget.dataset.month
      let total = e.currentTarget.dataset.total
      wx.navigateTo({
        url: `/pages/rank/rank?title=${title}&id=${id}&month=${month}&total=${total}`,
      })
    }
  }
})
