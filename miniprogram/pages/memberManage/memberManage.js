// pages/memberManage/memberManage.js
var mycloud = require("../../utils/cloud")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectId:'',
    type:-1,
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
    var index = e.currentTarget.dataset.index
    var is_agree = e.currentTarget.dataset.is_agree
    var stu_id = e.currentTarget.dataset.stu_id
    wx.navigateTo({
      url: `../resume/resume?formId=${formId}&type=${this.data.type}&index=${index}&is_agree=${is_agree}&stu_id=${stu_id}`,
    })
  },

  setType(e){
    console.log(e.currentTarget.dataset.type)
    mycloud.setProjectType(this.data.projectId,e.currentTarget.dataset.type,res=>{
      // console.log(res)
      wx.showToast({
        title: '操作成功',
      })
      setTimeout(()=>{wx.navigateBack({
        delta: 3,
      })},1000)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({projectId:options.id,type:options.type,start:0},this.getFormList)
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