// Components/comment/comment.js
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    isCard:{
      type:Boolean,
      value:true
    },
    name:String,
    avatarUrl:String,
    createTime:String,
    content:String,
    imgList:Array,
    scan:Number,
    answer:Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //预览图片
    previewImage: function(e){
      console.log(e.currentTarget.dataset.src)
      wx.previewImage({
        current: e.currentTarget.dataset.src, // 当前显示图片的http链接
        urls: [e.currentTarget.dataset.src] // 需要预览的图片http链接列表
      })
    }
  }
})
