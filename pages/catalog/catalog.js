// pages/catalog/catalog.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    title: "",
    chapters: []
  },
  // 获取书籍章节
  getbookChaptersBookId() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/mix-atoc/${this.data.id}?view=chapters`).then(res => {
      if (res.data) {
        wx.hideLoading()
        this.setData({
          chapters: res.data.mixToc.chapters,
        })
      }
      console.log(res)
      console.log(this.data.chapters, 1)
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  // 去书籍内容页面
  goContent(e) {
    let id = e.currentTarget.dataset.id
    let title = e.currentTarget.dataset.title
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: `/pages/bookcontent/bookcontent?id=${id}&title=${title}&index=${index}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title,
    })
    this.setData({
      id: options.id,
      title: options.title
    })
    this.getbookChaptersBookId()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})