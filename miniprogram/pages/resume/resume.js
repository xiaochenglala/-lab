// pages/resume/resume.js
var mycloud = require("../../utils/cloud")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formId:'',
    stu_id:'',
    index:-1,
    is_agree:0,
    teacher:null,
    type: 0,
    resume:null
  },

  getForm(){
    mycloud.getForm(this.data.formId,res=>{
      console.log(res)
      this.setData({resume:res.data.resume})
    })
  },

  //通过
  Submit(){
    var page = getCurrentPages()
    var beforePage = page[page.length-2]
    var beforeFormList = "formList["+this.data.index+'].is_agree'
    mycloud.agreeMember(this.data.formId,()=>{
      beforePage.setData({[beforeFormList]:1})
      mycloud.createMessage(this.data.teacher.name,this.data.stu_id,0,()=>{
        wx.showToast({
          title: '已通过',
          mask:true
        })
      })
      setTimeout(()=>{wx.navigateBack()},1500)
    })
  },

  //退回
  Clear(){
    var page = getCurrentPages()
    var beforePage = page[page.length-2]
    var newFormList = beforePage.data.formList
    mycloud.deleteMember(this.data.formId,()=>{
      newFormList.splice(this.data.index,1)
      beforePage.setData({formList:newFormList})
      mycloud.createMessage(this.data.teacher.name,this.data.stu_id,1,()=>{
        wx.showToast({
          title: '已退回',
          mask:true
        })
      })
      setTimeout(()=>{wx.navigateBack()},1500)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({title:'加载中',mask:true})
    wx.getStorage({
      key:"openid",
      success: res =>{
        // console.log(res)
        mycloud.getTeacher(res.data,(res1)=>{
          // console.log(res1.data[0])
          this.setData({teacher:res1.data[0],
                        formId:options.formId,
                        stu_id:options.stu_id,
                        index:options.index,
                        is_agree:options.is_agree,
                        type:options.type
          },this.getForm)
        })
        wx.hideLoading()
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})