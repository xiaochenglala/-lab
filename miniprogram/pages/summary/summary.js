// pages/summary/summary.js
var mycloud = require("../../utils/cloud")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: 0,
    openid:'',
    projectId: '',
    start: 0,
    summaryList: []
  },

  //获取周结列表
  getSummaryList() {
    wx.showLoading({
      title: '加载中',
      mask: 'true'
    })
    mycloud.getSummary(this.data.projectId, this.data.start, 10, res => {
      console.log(res)
      this.setData({
        summaryList: this.data.summaryList.concat(res.data)
      })
      wx.hideLoading()
    })
  },

  //跳转到周结内容回复页面
  gotoResponse: function (e) {
    var index = e.currentTarget.dataset.index
    var scan = "summaryList[" + index + "].scan"
    mycloud.addScan(e.currentTarget.dataset.id, 'summary', e.currentTarget.dataset.scan, res => {
      // console.log(res)
      this.setData({
        [scan]: e.currentTarget.dataset.scan + 1
      })
    })
    wx.navigateTo({
      url: `../summaryDetail/summaryDetail?summaryId=${e.currentTarget.dataset.id}&index=${index}`,
    })
  },

  //跳转到写周结页面
  gotoWrite: function () {
    wx.navigateTo({
      url: `../writeSummary/writeSummary?id=${this.data.projectId}`,
    })
  },
  //获取个人周结列表
  getMySummaryList() {
    wx.showLoading({
      title: '加载中',
      mask: 'true'
    })
    mycloud.getMySummary(this.data.openid,this.data.start,10,res => {
      console.log(res)
      if (res.data.length != 0) {
        this.setData({
          summaryList: this.data.summaryList.concat(res.data)
        })
        wx.hideLoading()
      } else {
        wx.hideLoading()
        wx.showToast({
          title: '已经到底了'
        })
      }
    })
  },

  //判断进入哪个周结列表函数
  getWhichSummary() {
    if (this.data.flag != 4) {
      this.getSummaryList()
      console.log(666)
    } else {
      this.getMySummaryList()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.getStorage({
      key: 'openid',
      success:res =>{
        // console.log(res)
        this.setData({
          openid:res.data,
          projectId: options.id,
          start: 0,
          summaryList: [],
          flag: options.flag
        }, this.getWhichSummary)
      }
    })
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
    this.setData({
      start: this.data.summaryList.length
    })
    this.getWhichSummary()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})