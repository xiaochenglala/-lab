# 信工-lab
深圳大学电子与信息工程学院N106实验室报名助手
小程序UI基于colorUI组件库开发
所有云端操作放在了utils/cloud.js

创建了6个集合（6张表）
form集合
{
  "_id" //主键,String
  "_openid" //该记录创建者,String
  "initTime"  //创建初始时间,Number
  "is_agree"  //是否通过,待审核为0，通过为1，不通过这个记录会删除,Number
  "projectId" //projectList里面对应项目记录的_id
  "resume":{    //个人简历，object
    "class" //班级,String
    "introduction"  //自我介绍,String
    "name"  //姓名,String
    "number"  //学号，String
    "wechat"  //微信号
  }
}

message集合
{
  "_id" //主键,String
  "_openid" //该记录创建者,String
  "initTime"  //创建初始时间,Number
  "is_read" //该消息是否已读0为未读,1为已读,Number
  "recv_id" //消息接收者的_openid,String
  "send_name" //消息发送者的名字
  "type"  //消息类型,0为通过申请，1为退回申请，2为评论
}

projectList集合
{
  "_id" //主键,String
  "_openid" //该记录创建者,String
  "content" //项目内容详情,String
  "deadline"  //项目完成期限,String
  "initTime"  //创建初始时间,Number
  "lab" //项目所在实验室,String
  "name"  //项目名称,String
  "people_num"  //项目需求人数,String
  "phone" //老师电话,String
  "profession"  //所需专业,String
  "scan"  //浏览人数,Number
  "teacher" //老师姓名，String
  "type"  //项目所处状态,0为招收中,1为进行中,2为已完成，Number
}

reply集合
{
  "_id" //主键,String
  "_openid" //该记录创建者,String
  "answer_id" //回复目标的记录id ,String 这个小程序里面暂未使用
  "answer_name" //回复目标的姓名,String,这个小程序里面暂未使用
  "avatarUrl" //回复者的头像URL,String
  "content" //回复内容
  "createTime"  //回复时间,String
  "initTime"  //创建初始时间,Number
  "name"  //回复人的名字
  "parent_id" //回复所属的周结Id，在哪一个summary下面,即summary集合里面的_id，String
}

summary集合
{
  "_id" //主键,String
  "_openid" //该记录创建者,String
  "answer"  //回复记录的条数,Number
  "avatarUrl" //周结人的头像URL,String
  "content" //回复周结内容,String
  "createTime"  //周结发布时间,String
  "imgList" // 发布图片URL列表，Array
  "initTime"  //创建初始时间,Number
  "name"  //发布人名字,String
  "projectId" //周结所属项目的Id,String
  "scan"  //浏览人数,Number
}

teacher集合
{
  "_id" //主键,String
  "_openid" //老师的_openid,String
  "name"  //老师姓名,String
  "phone" //老师的电话
}
