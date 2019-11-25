// pages/rank/rank.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0,
    rank_id: "",
    id: "",
    month: "",
    total: "",
    idList: []
  },
  // 控制选择
  setNum(e) {
    this.setData({
      num: e.currentTarget.dataset.num,
      rank_id: e.currentTarget.dataset.id
    })
    this.getrankInfo()
  },
  // 获取排名详情
  getrankInfo(){
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/ranking/${this.data.rank_id}`).then(res => {
      if(res.data.ranking.books) {
        wx.hideLoading()
        this.setData({
          idList: res.data.ranking.books
        })
      }
      console.log(res)
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  // 去详情页
  goTo(e) {
    let id = e.currentTarget.dataset.id
    let title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: `/pages/details/details?id=${id}&title=${title}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 控制顶部导航名称变换
    wx.setNavigationBarTitle({
      title: options.title,
    })
    this.setData({
      rank_id: options.id,
      id: options.id,
      month: options.month,
      total: options.total
    })
    this.getrankInfo()
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