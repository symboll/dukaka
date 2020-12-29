// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const rp = require('request-promise')

const db = cloud.database()

const URL = 'http://47.115.57.59:3000/personalized'
// 云函数入口函数
exports.main = async (event, context) => {

  let playlist = await rp(URL).then(res => JSON.parse(res).result)

  for(let i = 0; i< playlist.length; i++) {
    await db.collection('playlist').add({
      data: {
        ...playlist[i],
        createTime: db.serverDate()
      }
    })
    .then(res => console.log('插入成功'))
    .catch(err => console.log('插入失败') )
  }
}