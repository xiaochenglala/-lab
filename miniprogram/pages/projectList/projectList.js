// pages/projectList/projectList.js
var mycloud = require('../../utils/cloud.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: ["招收中", "进行中", "已完成"],
    TabCur: 0,
    scrollLeft: 0,
    projectList: [],
    start: 0
  },

  // 项目类型选择
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
      start:0,
      projectList:[]
    },this.getProjectList)
  },

  // 项目列表获取
  getProjectList() {
    wx.showLoading({
      title: '加载中'
    })
    mycloud.getProjectList(this.data.start, 10, this.data.TabCur, res => {
      console.log(res.data)
      if(res.data.length!=0)
      {
        this.setData({
          projectList: this.data.projectList.concat(res.data)
        }, () => {
          wx.hideLoading()
        })
      }
      else{
        wx.hideLoading()
        wx.showToast({title:'已经到底了'})
      }
    })
  },

  //跳转到详情页
  gotoDetail: function (e) {
    console.log(e)
    wx.navigateTo({
      url: `../projectDetail/projectDetail?id=${e.currentTarget.dataset.id}&type=${this.data.TabCur}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({start:0})
    this.getProjectList()
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
    this.setData({start:this.data.projectList.length})
    this.getProjectList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})