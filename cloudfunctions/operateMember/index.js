// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  if(event.operate == 'deleteMember')
    return db.collection('form').doc(event.id).remove()
  else if(event.operate == 'agreeMember')
    return db.collection('form').doc(event.id).update({
      data:{
        is_agree:1
      }
    })
}