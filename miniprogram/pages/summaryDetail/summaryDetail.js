// pages/summaryDeatil/summaryDetail.js
var mycloud = require("../../utils/cloud")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    index:-1,
    start:0,
    userInfo:null,
    summary:null,
    replyList:[],
    myReply:'',
  },

  //获取周结详情
  getSummaryDetail(){
    mycloud.getSummaryDetail(this.data.id,res=>{
      console.log(res)
      this.setData({summary:res.data})
    })
    this.getReply()
  },

  //获取回复
  getReply(){
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    mycloud.getReply(this.data.id,this.data.start,10,res=>{
      if(res.data.length!=0)
      {
        this.setData({
          replyList: this.data.replyList.concat(res.data)
        })
        wx.hideLoading()
      }
      else{
        wx.hideLoading()
        wx.showToast({title:'已经到底了'})
      }

    })
  },
  
  //写回复
  writeReply(e){
    // console.log(e)
    this.setData({myReply:e.detail.value})
  },

  //发送回复
  pushReply(){
    wx.showLoading({
      title: '提交中',
      mask:true
    })
    var reply={"name":this.data.userInfo.nickName,"avatarUrl":this.data.userInfo.avatarUrl,content:this.data.myReply}
    //更改云端回复
    mycloud.pushReply(this.data.id,reply.content,this.data.userInfo,res=>{
      //回复数加一
      mycloud.addReply(this.data.id,this.data.summary.answer,()=>{
        var answer = "summary.answer"
        this.setData({[answer]:this.data.summary.answer+1})
        var page = getCurrentPages()
        var beforePage = page[page.length-2]
        var answerNum = 'summaryList['+this.data.index+'].answer'
        beforePage.setData({[answerNum]:this.data.summary.answer})
      })
      //更改页面回复
      var newList = this.data.replyList
      newList.push(reply)
      this.setData({replyList:newList,myReply:''})
      //发消息到云端
      if(this.data.summary._openid!=app.globalData.openid)
        mycloud.createMessage(this.data.userInfo.nickName,this.data.summary._openid,2,()=>{
          wx.hideLoading()
          wx.showToast({
            title: '评论成功',
            mask:true
          })
        })
      else{
        wx.hideLoading()
        wx.showToast({
          title: '评论成功',
          mask:true
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(666)
    wx.getStorage({
      key: 'userInfo',
      success:res=>{
        console.log(res)
        this.setData({userInfo:res.data,id:options.summaryId,index:options.index,start:0},this.getSummaryDetail)
        },
      fail: ()=>{
        wx.showToast({
          icon:'none',
          title: '请先登录',
          mask:true
        })
        setTimeout(()=>{
          wx.switchTab({
            url: '../profile/profile',
          })
        },1200)
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
    this.setData({start:this.data.replyList.length},this.getReply)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})