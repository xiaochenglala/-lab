// pages/signUp/signUp.js
var mycloud = require('../../utils/cloud')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resume:null,
    projectId:''
  },

  // 报名表单提交
  formSubmit:function(e){
    console.log(e)
    wx.showLoading({title:'提交中'})
    this.setData({resume:e.detail.value})
    mycloud.submitResume(this.data.projectId,this.data.resume,res=>{
      console.log(res)
      wx.hideLoading()
      wx.showToast({title:'提交成功'})
      setTimeout(wx.navigateBack,1000)
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({projectId:options.id})
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