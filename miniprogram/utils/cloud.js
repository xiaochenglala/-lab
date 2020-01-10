const db = wx.cloud.database()
const projectList = db.collection('projectList')
const form = db.collection('form')
const teacher = db.collection('teacher')
const summary = db.collection('summary')
module.exports = {
  getProjectList: getProjectList, //获取项目列表
  getprojectDetail: getprojectDetail, //获取项目详情
  submitResume: submitResume, //报名简历提交
  getTeacher: getTeacher, //获取老师信息
  addProject: addProject, //创建项目
  pushSummary: pushSummary, //提交周结
  getSummary: getSummary,    //获取周结列表
  getSummaryDetail: getSummaryDetail,   //获取周结详情
  addScan:addScan,   //浏览人数加一
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

// projectId为项目对应_id,resume为简历
function submitResume(projectId, resume, handle) {
  form.add({
    data: {
      resume: resume,
      projectId: projectId
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
      initTime:initTime
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
    promiseArr.push(new Promise((resolve,reject)=>{
      var suffix = /\.\w+$/.exec(tempImgList[i])[0] // 正则表达式，返回文件扩展名
      wx.cloud.uploadFile({
        cloudPath: 'summaryImg/'+projectId + '-' + openid + '-' + i + '-' + new Date().getTime() + suffix, // 上传至云端的路径
        filePath: tempImgList[i], // 小程序临时文件路径
        success: res => {
          cloudImgList.push(res.fileID)
          resolve()
        }
      })
    })
    )
  }
  Promise.all(promiseArr).then(res=>{
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
        initTime:initTime
      },
      success: res => {
        handle(res)
      }
    })
  })

}

// projectId为项目Id，start为开始处，limit为每次请求数目
function getSummary(projectId,start,limit,handle){
  summary.where({
    projectId:projectId
  }).orderBy('initTime','desc').skip(start).limit(limit).get({
    success:res=>{handle(res)}
  })
}

// summaryId为周结对应Id
function getSummaryDetail(summaryId,handle){
  summary.doc(summaryId).get({
    success:res=>{handle(res)}
  })
}

// id为projectId或者SummaryId,collectionName为集合表名称,scan为当前浏览人数
function addScan(id,collectionName,scan,handle){
  db.collection(collectionName).doc(id).update({
    data:{
      scan:scan+1
    },
    success:res=>{
      handle(res)
    }
  })
}