const db = wx.cloud.database()
const projectList = db.collection('projectList')
const form = db.collection('form')
const teacher = db.collection('teacher')
const summary = db.collection('summary')
const reply = db.collection('reply')
const message = db.collection('message')
module.exports = {
  getProjectList: getProjectList, //获取项目列表
  getprojectDetail: getprojectDetail, //获取项目详情
  submitResume: submitResume, //报名简历提交
  getTeacher: getTeacher, //获取老师信息
  addProject: addProject, //创建项目
  pushSummary: pushSummary, //提交周结
  getSummary: getSummary, //获取周结列表
  getSummaryDetail: getSummaryDetail, //获取周结详情
  pushReply: pushReply, //提交回复
  getReply: getReply, //获取回复
  addScan: addScan, //浏览人数加一
  addReply: addReply, //回复人数加一
  getTeacherProjectList: getTeacherProjectList, //获取老师参与的项目列表
  getStudentProjectList: getStudentProjectList, //获取学生参与的项目列表
  getFormList: getFormList, //获取简历列表
  getForm: getForm, //获取简历表单
  setProjectType: setProjectType, //设置项目状态
  getMySummary: getMySummary, //获取个人周结列表
  createMessage:createMessage,  //生成消息
  hasNewMessage: hasNewMessage,  //确认是否有新消息
  getMessage: getMessage,  //获取消息
  deleteMember: deleteMember,   //删除成员
  agreeMember:agreeMember,  //同意成员加入项目
}

// start为起始位置，limit为获取项目数，type为项目类型(0招收中,1进行中,2已完成)
function getProjectList(start, limit, type, handle) {
  projectList.where({
    type: type
  }).orderBy('initTime', 'desc').skip(start).limit(limit).get({
    success: res => {
      handle(res)
    }
  })
}

// projectId为项目对应_id
function getprojectDetail(projectId, handle) {
  projectList.doc(projectId).get({
    success: res => {
      handle(res)
    }
  })
}

// projectId为项目对应_id,resume为简历,is_agree为是否同意,0为不同意，1为同意
function submitResume(projectId, resume, handle) {
  var initTime = new Date().getTime()
  form.add({
    data: {
      resume: resume,
      projectId: projectId,
      initTime: initTime,
      is_agree:0
    },
    success: res => {
      handle(res)
    }
  })
}

//获取老师信息
function getTeacher(openid, handle) {
  teacher.where({
    _openid: openid
  }).get({
    success: res => {
      handle(res)
    }
  })
}

// project为项目信息，teacher为项目发布老师信息
function addProject(project, teacher, handle) {
  var initTime = new Date().getTime()
  projectList.add({
    data: {
      name: project.name,
      people_num: project.people_num,
      lab: project.lab,
      profession: project.profession,
      deadline: project.deadline,
      content: project.content,
      teacher: teacher.name,
      phone: teacher.phone,
      scan: 0,
      type: 0,
      initTime: initTime
    },
    success: res => {
      handle(res)
    }
  })
}

// projectId为项目Id，openid为个人标识，content为周结内容，userInfo为用户信息，imgList为图片列表
function pushSummary(projectId, openid, content, userInfo, tempImgList, handle) {
  var date = new Date()
  var now = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
  console.log(now)
  var cloudImgList = []
  var promiseArr = []
  for (var i = 0; i < tempImgList.length; i++) {
    promiseArr.push(new Promise((resolve, reject) => {
      var suffix = /\.\w+$/.exec(tempImgList[i])[0] // 正则表达式，返回文件扩展名
      wx.cloud.uploadFile({
        cloudPath: 'summaryImg/' + projectId + '-' + openid + '-' + i + '-' + new Date().getTime() + suffix, // 上传至云端的路径
        filePath: tempImgList[i], // 小程序临时文件路径
        success: res => {
          cloudImgList.push(res.fileID)
          resolve()
        }
      })
    }))
  }
  Promise.all(promiseArr).then(res => {
    console.log(cloudImgList)
    var initTime = new Date().getTime()
    summary.add({
      data: {
        projectId: projectId,
        content: content,
        name: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl,
        imgList: cloudImgList,
        scan: 0,
        answer: 0,
        createTime: now,
        initTime: initTime,
      },
      success: res => {
        handle(res)
      }
    })
  })

}

// projectId为项目Id，start为开始处，limit为每次请求数目
function getSummary(projectId, start, limit, handle) {
  summary.where({
    projectId: projectId
  }).orderBy('initTime', 'desc').skip(start).limit(limit).get({
    success: res => {
      handle(res)
    }
  })
}

// summaryId为周结对应Id
function getSummaryDetail(summaryId, handle) {
  summary.doc(summaryId).get({
    success: res => {
      handle(res)
    }
  })
}

//summaryId是评论所属周结，content是内容，userInfo是用户信息
function pushReply(summaryId,content,userInfo,handle){
  var initTime = new Date().getTime()
  var date = new Date()
  var now = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
  reply.add({
    data: {
      content: content,
      name: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl,
      createTime: now,
      initTime: initTime,
      answer_id: 0, //回复谁的评论,评论表为默认为0
      parent_id: summaryId, //评论所属哪个周结id下面，评论默认为0
      answer_name: '',//回复评论人昵称，默认为''即没回复
    },
    success: res=>{handle(res)}
  })
}

//获取回复
function getReply(summaryId,start, limit, handle){
  reply.where({
    parent_id: summaryId
  }).skip(start).limit(limit).get({
    success: res => {
      handle(res)
    }
  })
}

// id为projectId或者SummaryId,collectionName为集合表名称,scan为当前浏览人数
function addScan(id, collectionName, scan, handle) {
  // db.collection(collectionName).doc(id).update({
  //   data: {
  //     scan: scan + 1
  //   },
  //   success: res => {
  //     handle(res)
  //   }
  // })
  wx.cloud.callFunction({
    name:'addNum',
    data:{
      collection:collectionName,
      id:id,
      scan:scan+1,
      answer:-1
    }
  }).then(res=>{handle(res)})
}

function addReply(summaryId,answer,handle){
  // summary.doc(summaryId).update({
  //   data: {
  //     answer: answer + 1
  //   },
  //   success: res => {
  //     handle(res)
  //   }
  // })
  wx.cloud.callFunction({
    name:'addNum',
    data:{
      collection:'summary',
      id:summaryId,
      scan:-1,
      answer:answer+1
    }
  }).then(res=>{handle(res)})
}

// openid为老师的id，start为起始位置，limit为获取项目数，type为项目类型(0招收中,1进行中,2已完成)
function getTeacherProjectList(openid, start, limit, type, handle) {
  projectList.where({
    _openid: openid,
    type: type
  }).orderBy('initTime', 'desc').skip(start).limit(limit).get({
    success: res => {
      handle(res)
    }
  })
}

// openid为学生的id，start为起始位置，limit为获取项目数，type为项目类型(0招收中,1进行中,2已完成)
function getStudentProjectList(openid, start, limit, type, handle) {
  form.where({
      _openid: openid
    }).orderBy('initTime', 'desc').skip(start).limit(limit).get()
    .then(res => {
      var promiseArr = []
      var data = []
      for (let i = 0; i < res.data.length; i++) {
        promiseArr.push(new Promise((resolve, reject) => {
          projectList.where({
            _id: res.data[i].projectId,
            type: type
          }).get().then(res1 => {
            // console.log(res1)
            if (res1.data.length == 1)
              data.push(res1.data[0])
            resolve()
          })
        }))
      }
      Promise.all(promiseArr).then(() => {
        // console.log(data)
        handle({
          data
        })
      })
    })
}

// projectId为项目id
function getFormList(projectId, start, limit, handle) {
  form.where({
      projectId: projectId
    }).orderBy('initTime', 'desc').skip(start).limit(limit).get()
    .then(res => {
      handle(res)
    })
}

// id为form表单记录的id
function getForm(id, handle) {
  form.doc(id).get()
    .then(res => {
      handle(res)
    })
}

// projectId为项目的id,setType为要置的状态  //0为报名中，1为进行中，2为完成
function setProjectType(projectId, setType, handle) {
  projectList.doc(projectId).update({
      data: {
        type: setType
      }
    })
    .then(res => {
      handle(res)
    })
}

//openid为个人id,start为开始位置，limit为限制条数
function getMySummary(openid,start,limit,handle) {
  summary.where({
    _openid: openid
  }).orderBy('initTime', 'desc').skip(start).limit(limit).get({
    success: function (res) {
      handle(res)
    }
  })
}


// send_name->发送人名字
// recv_id->接收人的openid
// type->消息的类型，0为同意项目申请，1为退回项目申请，2为评论
// is_read->是否已读，0未读,1已读
function createMessage(send_name,recv_id,type,handle){
  var initTime = new Date().getTime()
  message.add({
    data:{
      send_name:send_name,
      recv_id:recv_id,
      type:type,
      is_read:0,
      initTime:initTime
    },
    success:res=>{handle(res)}
  })
} 

//  recv_id为接收人id
function hasNewMessage(recv_id,handle){
  message.where({
    recv_id:recv_id,
    is_read:0,
  }).get()
  // .then(res=>{
  //   message.where({is_read:0}).update({
  //     data:{
  //       is_read:1
  //     }
  //   })
  // })
}

//recv_id为接收id，start为开始处,limit为限制条数
function getMessage(recv_id,start, limit,handle){
  message.where({recv_id:recv_id}).orderBy('initTime', 'desc').skip(start).limit(limit).get()
  .then(res=>{handle(res)})
}

//id为form表单的id
function deleteMember(id,handle){
  wx.cloud.callFunction({
    name:'operateMember',
    data:{
      id:id,
      operate:'deleteMember'
    },
    success:res=>{handle(res)}
  })
}

//id为form表单的id
function agreeMember(id,handle){
  wx.cloud.callFunction({
    name:'operateMember',
    data:{
      id:id,
      operate:'agreeMember'
    },
    success:res=>{handle(res)}
  })
}


