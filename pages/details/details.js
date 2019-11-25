// pages/details/details.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    add: false,
    data: {},
    num: 0,
    starList: [],
    books: [],
    docs: [],
    star: [
      { sel: false,
        starPath: "../../images/star.png",
        starSel: "../../images/star-sel.png"
      },
      {
        sel: false,
        starPath: "../../images/star.png",
        starSel: "../../images/star-sel.png"
      },
      {
        sel: false,
        starPath: "../../images/star.png",
        starSel: "../../images/star-sel.png"
      },
      {
        sel: false,
        starPath: "../../images/star.png",
        starSel: "../../images/star-sel.png"
      },
      {
        sel: false,
        starPath: "../../images/star.png",
        starSel: "../../images/star-sel.png"
      }
    ]
  },
  // 点击预览
  preview() {
    let url = 'https://statics.zhuishushenqi.com' + this.data.data.cover
    wx.previewImage({
      urls: [url]
    })
  },
  // 去书籍目录页面
  goCatalog(e) {
    let id = e.currentTarget.dataset.id
    let title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: `/pages/catalog/catalog?id=${id}&title=${title}`,
    })
  },
  // 去书籍内容页面
  goTo(e) {
    let id = e.currentTarget.dataset.id
    let title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: `/pages/bookcontent/bookcontent?id=${id}&title=${title}`,
    })
  },
  // 加入书架
  addBook() {
    if(!this.data.add){
      this.setData({
        add: true
      })
      let book = wx.getStorageSync('bookList')
      let obj = {
        book: this.data.data,
        add: this.data.add
      }
      book.unshift(obj)
      wx.setStorageSync('bookList', book)
      wx.switchTab({
        url: '/pages/index/index',
      })
      wx.showToast({
        title: '加入成功',
        icon: 'success',
        duration: 2000
      })
    }else {
      wx.showToast({
        title: '已加入书架!',
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 获取书籍详情
  getbookInfo() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/book/${this.data.id}`).then(res => {
      if (res.data) {
        // 显示评分
        let score = Math.floor(res.data.rating.score / 2)
        let arr = this.data.star
        arr.map((item, index) => {
          if (index < score) {
            item.sel = true
          }
        })
        wx.hideLoading()
        this.setData({
          data: res.data,
          starList: arr
        })
      }
      console.log(res)
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  // 获取推荐
  getrelatedRecommendedBooks() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/book/${this.data.id}/recommend`).then(res => {
      if (res.data) {
        wx.hideLoading()
        let arr = res.data.books
        let arrNew = []
        for (let i = 0; i < 3; i++) {
          let num = Math.floor(Math.random() * arr.length)
          let mm = arr[num]
          arr.splice(num, 1)
          arrNew.push(mm)
        }
        this.setData({
          books: arrNew
        })
      }
      console.log(res)
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  // 获取评论(短评)
  getshortReviews() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/post/short-review?book=${this.data.id}&total=true&sortType=newest`).then(res => {
      if (res.data) {
        wx.hideLoading()
        this.setData({
          docs: res.data.docs
        })
      }
      console.log(res)
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  // 控制选择
  setNum(e) {
    this.setData({
      num: e.currentTarget.dataset.num
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.title,
    })
    this.setData({
      id: options.id
    })
    this.getbookInfo()
    this.getrelatedRecommendedBooks()
    this.getshortReviews()
    let book = wx.getStorageSync('bookList')
    if(!book) {
      let book = []
      wx.setStorageSync('bookList', book)
    }else {
      book.map(item => {
        if(item.book._id === this.data.id) {
          this.setData({
            add: item.add
          })
        }
      })
    }
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