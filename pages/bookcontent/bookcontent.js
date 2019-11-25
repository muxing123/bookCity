// pages/bookcontent/bookcontent.js
const app = getApp()
const WxParse = require('../../lib/wxParse/wxParse.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    chapters: {},
    body: "",
    num: 0,
    length: 0
  },
  // 上一章
  redNum() {
    let number = this.data.num
    number -= 1
    if (number < 0) {
      this.setData({
        num: 0
      })
      console.log(11111)
      wx.showToast({
        title: '没有上一章了',
        icon: 'none',
        duration: 2000
      })
    }else {
      this.setData({
        num: number
      })
    }
    this.getbookChaptersBookId()
  },
  // 下一章
  addNum() {
    let number = this.data.num
    number += 1
    if (number >= this.data.length) {
      number = this.data.length - 1
      this.setData({
        num: number
      })
      wx.showToast({
        title: '没有下一章了',
        icon: 'none',
        duration: 2000
      })
    } else {
      this.setData({
        num: number
      })
    }
    this.getbookChaptersBookId()
  },
  // 获取书籍章节
  getbookChaptersBookId() {
    // wx.showLoading({
    //   title: '加载中',
    // })
    app.globalData.fly.get(`/mix-atoc/${this.data.id}?view=chapters`).then(res => {
      if (res.data) {
        wx.hideLoading()
        this.setData({
          chapters: res.data.mixToc.chapters[this.data.num],
          length: res.data.mixToc.chapters.length
        })
      }
      this.getchapterContent()
      console.log(res)
      console.log(this.data.chapters, 1)
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  // 获取章节内容
  getchapterContent() {
    // wx.showLoading({
    //   title: '加载中',
    // })
    let link = this.data.chapters.link
    app.globalData.fly.get(`https://chapter2.zhuishushenqi.com/chapter/${encodeURIComponent(link)}`).then(res => {
      if (res.data) {
        wx.hideLoading()
        this.setData({
          body: res.data.chapter.body
        })
        let that = this;
        WxParse.wxParse('courseDetail', 'md', this.data.body, that, 5)
      }
      console.log(res)
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options,1111111)
    wx.setNavigationBarTitle({
      title: options.title,
    })
    this.setData({
      id: options.id
    })
    if (options.index) {
      this.setData({
        num: options.index*1
      })
    }
    this.getbookChaptersBookId()
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