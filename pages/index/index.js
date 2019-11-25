const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList: [],
    block: false
  },
  // 编辑书架
  play() {
    this.setData({
      block: !this.data.block
    })
  },
  // 删除 
  del(e) {
    let index = e.currentTarget.dataset.index
    this.data.bookList.splice(index,1)
    this.setData({
      bookList: this.data.bookList
    })
    wx.setStorageSync('bookList', this.data.bookList)
  },
  // 去帮助页面
  goTo() {
    wx.navigateTo({
      url: '/pages/help/help',
    })
  },
  // 刷新页面
  refresh() {
    this.onLoad()
  },
  // 去阅读页面
  goRead(e) {
    let id = e.currentTarget.dataset.id
    let title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: `/pages/bookcontent/bookcontent?id=${id}&title=${title}`,
    })
  },
  // 获取书架
  getShelf() {
    wx.showLoading({
      title: '加载中',
    })
    let book = wx.getStorageSync('bookList')
    if (book) {
      wx.hideLoading()
      this.setData({
        bookList: book
      })
    } else {
      wx.hideLoading()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '追书神器',
    })
    this.getShelf()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.setNavigationBarTitle({
      title: '追书神器',
    })
    this.getShelf()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})