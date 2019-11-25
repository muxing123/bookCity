// pages/bookcity/bookcity.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0,
    male: {},
    maleList: [],
    female: {},
    femaleList: [],
    press: {}
  },
  // 控制选择
  setNum(e) {
    // console.log(e)
    this.setData({
      num: e.currentTarget.dataset.num
    })
  },
  // 获取大分类
  getData() {
    app.globalData.fly.get('/cats/lv2/statistics').then(res => {
      let maleArr = res.data.male
      let femaleArr = res.data.female
      let pressArr = res.data.press
      this.setData({
        male:{
          gender:"male",
          arr: maleArr
        },
        female: {
          gender: "female",
          arr: femaleArr
        },
        press: {
          gender: "press",
          arr: pressArr
        }
      })
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  // 获取排名
  getRank() {
    app.globalData.fly.get('/ranking/gender').then(res => {
      let maleList = res.data.male
      let femaleList = res.data.female
      this.setData({
        maleList,
        femaleList
      })
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
    this.getRank()
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