// pages/memberManage/memberManage.js
var mycloud = require("../../utils/cloud")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectId:'',
    formList:[],
    start:0
  },

  getFormList(){
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    mycloud.getFormList(this.data.projectId,this.data.start,10,res=>{
      console.log(res)
      this.setData({formList:this.data.formList.concat(res.data)})
      wx.hideLoading()
    })
  },

  //前往简历页面
  gotoResume:function(e){
    // console.log(e)
    var formId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../resume/resume?formId=${formId}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({projectId:options.id,start:0},this.getFormList)
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
    this.setData({start:this.data.formList.length},this.getFormList)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})