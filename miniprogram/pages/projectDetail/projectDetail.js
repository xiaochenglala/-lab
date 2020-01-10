// pages/projectDetail/projectDetail.js
var mycloud = require('../../utils/cloud.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectId:'',
    type:-1,
    Detail:null
  },

  // 跳转到报名页
  gotoSignUp: function(){
    wx.navigateTo({
      url: `../signUp/signUp?id=${this.data.projectId}`,
    })
  },

  gotoSummary: function () {
    wx.navigateTo({
      url: `../summary/summary?id=${this.data.projectId}`,
    })
  },

  getProjectDetail: function(){
    wx.showLoading(
      {title:'加载中'}
    )
    var flag = setTimeout(()=>{
      wx.hideLoading()
      wx.showToast({title:'请重试'})
      setTimeout(wx.navigateBack,1000)
    },3000)
    if(this.data.projectId != '')
      mycloud.getprojectDetail(this.data.projectId,res =>{
        console.log(res)
        this.setData({Detail:res.data})
        wx.hideLoading()
        clearTimeout(flag)
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({projectId:options.id,type:options.type},() => {this.getProjectDetail()})
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