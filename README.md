# 信工-lab
深圳大学电子与信息工程学院N106实验室报名助手
小程序UI基于colorUI组件库开发 <br/>
所有云端操作放在了utils/cloud.js <br/>
<br/>
创建了6个集合（6张表）<br/>
form集合 <br/>
{ <br/>
  "_id" //主键,String <br/>
  "_openid" //该记录创建者,String <br/>
  "initTime"  //创建初始时间,Number <br/>
  "is_agree"  //是否通过,待审核为0，通过为1，不通过这个记录会删除,Number <br/>
  "projectId" //projectList里面对应项目记录的_id <br/>
  "resume":{    //个人简历，object <br/>
    "class" //班级,String <br/>
    "introduction"  //自我介绍,String <br/>
    "name"  //姓名,String <br/>
    "number"  //学号，String <br/>
    "wechat"  //微信号 <br/>
  } <br/>
} <br/>
<br/>
message集合 <br/>
{ <br/>
  "_id" //主键,String <br/>
  "_openid" //该记录创建者,String <br/>
  "initTime"  //创建初始时间,Number <br/>
  "is_read" //该消息是否已读0为未读,1为已读,Number <br/>
  "recv_id" //消息接收者的_openid,String <br/>
  "send_name" //消息发送者的名字 <br/>
  "type"  //消息类型,0为通过申请，1为退回申请，2为评论 <br/>
} <br/>
 <br/>
projectList集合<br/>
{ <br/>
  "_id" //主键,String <br/>
  "_openid" //该记录创建者,String <br/>
  "content" //项目内容详情,String <br/>
  "deadline"  //项目完成期限,String <br/>
  "initTime"  //创建初始时间,Number <br/>
  "lab" //项目所在实验室,String <br/>
  "name"  //项目名称,String <br/>
  "people_num"  //项目需求人数,String <br/>
  "phone" //老师电话,String <br/>
  "profession"  //所需专业,String <br/>
  "scan"  //浏览人数,Number <br/>
  "teacher" //老师姓名，String <br/>
  "type"  //项目所处状态,0为招收中,1为进行中,2为已完成，Number <br/>
} <br/>
 <br/>
reply集合 <br/>
{ <br/>
  "_id" //主键,String <br/>
  "_openid" //该记录创建者,String <br/> 
  "answer_id" //回复目标的记录id ,String 这个小程序里面暂未使用 <br/>
  "answer_name" //回复目标的姓名,String,这个小程序里面暂未使用 <br/>
  "avatarUrl" //回复者的头像URL,String <br/>
  "content" //回复内容 <br/>
  "createTime"  //回复时间,String <br/>
  "initTime"  //创建初始时间,Number <br/>
  "name"  //回复人的名字 <br/>
  "parent_id" //回复所属的周结Id，在哪一个summary下面,即summary集合里面的_id，String <br/>
} <br/>
<br/>
summary集合 <br/>
{ <br/>
  "_id" //主键,String <br/>
  "_openid" //该记录创建者,String <br/>
  "answer"  //回复记录的条数,Number <br/>
  "avatarUrl" //周结人的头像URL,String <br/>
  "content" //回复周结内容,String <br/>
  "createTime"  //周结发布时间,String <br/>
  "imgList" // 发布图片URL列表，Array <br/>
  "initTime"  //创建初始时间,Number <br/>
  "name"  //发布人名字,String <br/>
  "projectId" //周结所属项目的Id,String <br/>
  "scan"  //浏览人数,Number <br/>
} <br/>
 <br/>
teacher集合 <br/>
{ <br/>
  "_id" //主键,String <br/>
  "_openid" //老师的_openid,String <br/>
  "name"  //老师姓名,String <br/>
  "phone" //老师的电话 <br/>
}<br/>
