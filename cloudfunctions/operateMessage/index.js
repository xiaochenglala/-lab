// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  if(event.operate == 'update')
    return db.collection('message').where({is_read:0}).update({
      data:{
        is_read:1
      }
    })
  else if(event.operate == 'delete')
    return db.collection('message').doc(event.id).remove()
}