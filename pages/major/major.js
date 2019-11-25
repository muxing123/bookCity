// pages/major/major.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0,
    start: 0,
    type: "hot",
    minor: "",
    miNum: 10,
    major: "",
    gender: "",
    minsList: [],
    books: [],
    typeList: [{
        id: 'hot',
        name: '热门'
      },
      {
        id: 'new',
        name: '新书'
      },
      {
        id: 'reputation',
        name: '好评'
      },
      {
        id: 'over',
        name: '完结'
      },
      {
        id: 'monthly',
        name: 'VIP'
      }
    ]
  },
  // 去详情页面
  goTo(e) {
    let id = e.currentTarget.dataset.id
    let title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: `/pages/details/details?id=${id}&title=${title}`,
    })
  },
  // 控制排行类型选择
  setNum(e) {
    this.setData({
      num: e.currentTarget.dataset.index,
      type: e.currentTarget.dataset.id,
      start: 0
    })
    this.getCatsBooks()
  },
  // 控制小类选择
  setmiNum(e) {
    this.setData({
      miNum: e.currentTarget.dataset.index,
      minor: e.currentTarget.dataset.item,
      start: 0
    })
    this.getCatsBooks()
  },
  // 获取小类
  getData() {
    app.globalData.fly.get('/cats/lv2').then(res => {
      for (let i in res.data) {
        if (i === this.data.gender) {
          res.data[i].map(item => {
            if (item.major === this.data.major) {
              this.setData({
                minsList: item.mins
              })
            }
          })
        }
      }
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  // 获取分类书籍
  getCatsBooks() {
    wx.showLoading({
      title: '加载中',
    })
    if (this.data.minor) {
      app.globalData.fly.get(`/book/by-categories?gender=${this.data.gender}&type=${this.data.type}&major=${this.data.major}&minor=${this.data.minor}&start=${this.data.start}&limit=20`).then(res => {
        if (res.data) {
          wx.hideLoading()
          if(this.data.start > 0) {
            let arr = this.data.books.concat(res.data.books)
            this.setData({
              books: arr
            })
          }else {
            this.setData({
              books: res.data.books
            })
          }
        }
        console.log(res)
      }).catch(err => {
        wx.hideLoading()
        console.log(err)
      })
    } else {
      app.globalData.fly.get(`/book/by-categories?gender=${this.data.gender}&type=${this.data.type}&major=${this.data.major}&start=${this.data.start}&limit=20`).then(res => {
        if (res.data) {
          wx.hideLoading()
          if (this.data.start > 0) {
            let arr = this.data.books.concat(res.data.books)
            this.setData({
              books: arr
            })
          } else {
            this.setData({
              books: res.data.books
            })
          }
        }
        console.log(res)
      }).catch(err => {
        wx.hideLoading()
        console.log(err)
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.name,
    })
    this.setData({
      major: options.name,
      gender: options.gender
    })
    this.getData()
    this.getCatsBooks()
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
    let num = this.data.start + 1
    this.setData({
      start: num
    })
    this.getCatsBooks()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})