// pages/writeSummary/writeSummary.js
var mycloud = require("../../utils/cloud")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    projectId:'',
    content:'',
    imgList: [],//图片列表
    userInfo:null
  },

  //周结内容改变
  textareaInput(res){
    // console.log(res)
    this.setData({content:res.detail.value})
  },

  //清空周结内容
  Clear(){
    wx.showModal({
      title:'提示',
      content:'是否清空',
      success:res=>{
        if(res.confirm)
          this.setData({content:''})
      }
    })
  },

  //提交周结
  Submit(){
    if(this.data.content=='')
    wx.showToast({
      title: '内容不能为空',
    })
    else{
      wx.showLoading({
        title: '提交中',
        mask:true
      })
      console.log('submit')
      mycloud.pushSummary(this.data.projectId,this.data.openid,this.data.content,this.data.userInfo,this.data.imgList,res=>{
        console.log(res)
        wx.hideLoading()
        wx.showToast({
          title: '提交成功',
        })
        setTimeout(wx.navigateBack,1000)
      })
    }
  },

  //选择图片
  ChooseImage() {
    wx.chooseImage({
      count: 3, //最多3张图
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },

  //预览图片
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },

  //删除图片
  DelImg(e) {
    wx.showModal({
      content: '确定删除？',
      cancelText: '再看看',
      confirmText: '确定删除',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'userInfo',
      success:res=>{
        console.log(res)
        this.setData({userInfo:res.data,projectId:options.id})
      }
    })
    wx.getStorage({
      key: 'openid',
      success:res=>{
        console.log(res)
        this.setData({openid:res.data,imgList:[],content:''})
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