App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })

      //获取系统信息
      wx.getSystemInfo({
        success: e => {
          this.globalData.StatusBar = e.statusBarHeight;
          let custom = wx.getMenuButtonBoundingClientRect();
          this.globalData.Custom = custom;
          this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
        }
      })

      //获取用户登录信息
      wx.cloud.callFunction({
        // 云函数名称
        name: 'login'
      })
        .then(res => {
          console.log("----------------app.js-获取用户登录信息-------------")
          console.log(res.result)
          this.globalData.openid = res.result.openid
          //在本地存储存储用户openid
          wx.setStorage({
            key: "openid",
            data: res.result.openid,
            fail:()=>{wx.showToast({
              title: '系统错误',
            })
            this.onLaunch()}
          })
          //判断是不是teacher
          var mycloud = require("./utils/cloud")
          mycloud.getTeacher(res.result.openid,(res)=>{
            if(res.data[0])
            {
              this.globalData.isTeacher=true
              console.log('-----teacher---------')
            }
          })
        })
        .catch(console.error)
    }
  },

  globalData:{

  },
  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    var mycloud = require("./utils/cloud")
    this.globalData.timer = setInterval(()=>{
      console.log('正在查询是否有新消息')
      mycloud.hasNewMessage(this.globalData.openid)
    },10000)
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    console.log('进入后台')
    clearInterval(this.globalData.timer)
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
