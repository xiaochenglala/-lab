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
        link: 'projectList'
      },
      {
        title: '学习空间',
        name: 'study',
        color: 'purple',
        icon: 'home',
        link: ''
      },
      {
        title: '视频展示 ',
        name: 'video',
        color: 'mauve',
        icon: 'video',
        link: ''
      },
      {
        title: '交流社区',
        name: 'community',
        color: 'pink',
        icon: 'comment',
        link: ''
      },
    ],
  },
  methods:{
    //跳转到卡片上面对应页面
    goto: function(e){
      console.log(e.currentTarget.dataset.link)
      var link = e.currentTarget.dataset.link
      if(link == '')
        wx.showToast({
          title: '暂未开放',
          icon: 'none',
          mask: true
        })
      else
        wx.navigateTo({
          url: `../${link}/${link}`,
        })
    }
  }
})