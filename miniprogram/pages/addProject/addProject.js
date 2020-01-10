// pages/addProject/addProject.js
var mycloud = require("../../utils/cloud")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacher:null,
    date:'2021-01-01',
    project:null
  },

  //项目表单提交
  formSubmit:function (e) {
    console.log(e)
    if(e.detail.value.name=='' || e.detail.value.content=='')
      wx.showToast({
        title: '请完善项目信息',
      })
    else{
      wx.showModal({
        title:'提示',
        content:'是否创建项目',
        success:res=>{
          if(res.confirm){
            this.setData({project:e.detail.value},()=>{
              mycloud.addProject(this.data.project,this.data.teacher,()=>{
                console.log('addProject-----success')
                wx.showToast({
                  title: '创建成功'
                })
                setTimeout(wx.navigateBack,1000)
              })
            })
          }
        }
      })

    }
  },

  //项目期限改变
  DateChange(e) {
    this.setData({
      date: e.detail.value
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
          this.setData({teacher:res1.data[0]})
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