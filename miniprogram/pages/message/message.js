// pages/message/message.js
var mycloud = require('../../utils/cloud.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgList:[],
    openid:'',
    start:0,
    type:['通过了你的申请','退回了你的申报','评论了你']
  },

  getMessage(){
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    mycloud.getMessage(this.data.openid,this.data.start,10,res=>{
      // console.log(res)
      if(res.data.length!=0){
        this.setData({msgList:this.data.msgList.concat(res.data)})
        wx.hideLoading()
      }
      else{
        wx.hideLoading()
        wx.showToast({
          title: '已经到底了',
          mask:true
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'openid',
      success:res=>{
        // console.log(res)
        this.setData({start:0,openid:res.data},this.getMessage)
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
    this.setData({start:this.data.msgList.length},this.getMessage)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})