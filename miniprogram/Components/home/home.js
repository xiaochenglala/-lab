Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    elements: [
      {
        title: '项目报名',
        name: 'project',
        color: 'blue',
        icon: 'list',
        link: 'projectList',
        param: '?flag=0' //游客权限
      },
      {
        title: '学习空间',
        name: 'study',
        color: 'purple',
        icon: 'home',
        link: '',
        param:''
      },
      {
        title: '视频展示 ',
        name: 'video',
        color: 'mauve',
        icon: 'video',
        link: '',
        param:''
      },
      {
        title: '交流社区',
        name: 'community',
        color: 'pink',
        icon: 'comment',
        link: '',
        param:''
      },
    ],
  },
  methods:{
    //跳转到卡片上面对应页面
    goto: function(e){
      console.log(e.currentTarget.dataset.link)
      var link = e.currentTarget.dataset.link
      var param = e.currentTarget.dataset.param
      if(link == '')
        wx.showToast({
          title: '暂未开放',
          icon: 'none',
          mask: true
        })
      else
        wx.navigateTo({
          url: `../${link}/${link}${param}`,
        })
    }
  }
})