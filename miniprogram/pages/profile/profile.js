// pages/profile/profile.js
var app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin:false,
    isTeacher: false,
    //老师
    admin:[
      {
        title: '管理项目',
        icon: 'list',
        link: 'projectList',
        param: '?flag=1'  //老师权限
      },
      {
        title: '发布项目',
        icon: 'roundadd',
        link: 'addProject',
        param:''
      },
      {
        title: '关于信工lab',
        icon: 'question',
        link: '',
        param:''
      }
    ],
    //游客--学生
    visitor: [
      {
        title:'我的项目',
        icon: 'list',
        link: 'projectList',
        param: '?flag=2' //学生权限
      },
      {
        title: '我的小结',
        icon: 'text',
        link: 'summary',
        param:''
      },
      {
        title: '关于信工lab',
        icon: 'question',
        link: '',
        param:''
      }
    ],

  },
  
  //用户信息获取
  onGetUserInfo:function(e){
    if(e.detail.userInfo){
      wx.setStorage({
        key: "userInfo",
        data: e.detail.userInfo,
        success:()=>{this.setData({isLogin:true})},
        fail:()=>{wx.showToast({
          title: '授权失败',
        })}
      })
    }
    
  },

  //路由跳转
  goto: function (e) {
    console.log("---------profile.js---goto---------")
    console.log(e.currentTarget.dataset.link)
    console.log(e)
    var link = e.currentTarget.dataset.link
    var param = e.currentTarget.dataset.param
    if (link == '')
      wx.showToast({
        title: '暂未开放',
        icon: 'none',
        mask: true
      })
    else
      wx.navigateTo({
        url: `../${link}/${link}${param}`,
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData)
    this.setData({ isTeacher: app.globalData.isTeacher})
    wx.getStorage({
      key: 'userInfo',
      success:res =>{
        console.log(res)
        this.setData({
          isLogin:true
        })
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