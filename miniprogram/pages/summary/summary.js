// pages/summary/summary.js
var mycloud = require("../../utils/cloud")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectId:'',
    start:0,
    summaryList:[]
  },

  //获取周结列表
  getSummaryList(){
    wx.showLoading({
      title: '加载中',
      mask: 'true'
    })
    mycloud.getSummary(this.data.projectId,this.data.start,10,res=>{
      console.log(res)
      this.setData({summaryList:this.data.summaryList.concat(res.data)})
      wx.hideLoading()
    })
  },

  //跳转到周结内容回复页面
  gotoResponse:function(e){
    var index = e.currentTarget.dataset.index
    var scan = "summaryList["+index+"].scan"
    mycloud.addScan(e.currentTarget.dataset.id,'summary',e.currentTarget.dataset.scan,res=>{
      console.log(res)
      this.setData({[scan]:e.currentTarget.dataset.scan+1})
    })
    wx.navigateTo({
      url: `../summaryDetail/summaryDetail?summaryId=${e.currentTarget.dataset.id}`,
    })
  },

  //跳转到写周结页面
  gotoWrite: function(){
    wx.navigateTo({
      url: `../writeSummary/writeSummary?id=${this.data.projectId}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.setData({projectId:options.id,start:0,summaryList:[]},this.getSummaryList)
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
    this.setData({start:this.data.summaryList.length})
    this.getSummaryList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})