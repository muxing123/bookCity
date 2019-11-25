// pages/search/search.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: "",
    hotWords: [],
    randomColorArr: [],
    colorArr: ["#EE2C2C", "#ff7070", "#EEC900", "#4876FF", "#ff6100",
      "#7DC67D", "#E17572", "#7898AA", "#C35CFF", "#33BCBA", "#C28F5C",
      "#FF8533", "#6E6E6E", "#428BCA", "#5cb85c", "#FF674F", "#E9967A",
      "#66CDAA", "#00CED1", "#9F79EE", "#CD3333", "#FFC125", "#32CD32",
      "#00BFFF", "#68A2D5", "#FF69B4", "#DB7093", "#CD3278", "#607B8B"
    ],
    books: [],
    open: true,
    historyList: []
  },
  // 实时获取输入值
  bindKeyInput(e) {
    this.setData({
      inputValue: e.detail.value,
    })
    if (this.data.inputValue === '') {
      this.setData({
        open: true
      })
    }
  },
  // 设置搜索词
  setValue(e) {
    this.setData({
      inputValue: e.currentTarget.dataset.value,
    })
  },
  // 确认搜索
  bindKeyConfirm() {
    if (this.data.inputValue) {
      wx.showLoading({
        title: '加载中',
      })
      app.globalData.fly.get(`/book/fuzzy-search?start=0&limit=50&v=1&query=${this.data.inputValue}`).then(res => {
        if (res.data) {
          wx.hideLoading()
          this.setData({
            books: res.data.books,
            open: false
          })
        }
        console.log(res)
      }).catch(err => {
        wx.hideLoading()
        console.log(err)
      })
    }
  },
  // 去详情 
  goTo(e) {
    let id = e.currentTarget.dataset.id
    let title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: `/pages/details/details?id=${id}&title=${title}`,
    })
    let history = wx.getStorageSync('history')
    if (history.indexOf(this.data.inputValue) === -1) {
      history.unshift(this.data.inputValue)
    }
    this.setData({
      historyList: history
    })
    wx.setStorageSync('history', history)
  },
  // 获取搜索热词
  gethotWord() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/book/hot-word`).then(res => {
      if (res.data) {
        wx.hideLoading()
        let arr = res.data.hotWords
        let arrNew = []
        let times = Math.ceil(Math.random() * 5)
        for (let i = 0; i < times; i++) {
          let num = Math.floor(Math.random() * arr.length)
          let mm = arr[num]
          arr.splice(num, 1)
          arrNew.push(mm)
        }
        this.setData({
          hotWords: arrNew
        })
        this.randomColor()
      }
      console.log(res)
      console.log(this.data.hotWords, 1)
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  // 随机背景颜色
  randomColor() {
    let that = this,
      labLen = that.data.hotWords.length,
      colorArr = that.data.colorArr,
      colorLen = colorArr.length,
      randomColorArr = [];
    //判断执行
    do {
      let random = colorArr[Math.floor(Math.random() * colorLen)];
      randomColorArr.push(random);
      labLen--;
    } while (labLen > 0)

    that.setData({
      randomColorArr: randomColorArr
    });
  },
  // 删除搜索历史
  del() {
    let that = this
    wx.showModal({
      content: '是否清空搜索历史',
      success(res) {
        if (res.confirm) {
          // wx.removeStorageSync('history')
          let history = []
          wx.setStorageSync('history', history)
          that.setData({
            historyList: history
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.gethotWord()
    let history = wx.getStorageSync('history')
    if (!history) {
      let history = []
      wx.setStorageSync('history', history)
    } else {
      this.setData({
        historyList: history
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