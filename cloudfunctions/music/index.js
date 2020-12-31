// 云函数入口文件
const cloud = require('wx-server-sdk')

const TcbRouter = require('tcb-router')

const rp = require('request-promise')

const BASE_URL = 'http://47.115.57.59:3000'

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

  const app = new TcbRouter({ event })

  app.router('playlist', async (ctx, next) => {

    const { start, count } = event
    const { data } = await cloud.database().collection('playlist')
      .skip(start)
      .limit(count)
      .orderBy('createTime', 'desc')
      .get()
  
    const { total } = await cloud.database().collection('playlist').count()

    ctx.body = { data, total }
  })

  app.router('musiclist', async (ctx, next) => {
    
    const res = await rp(`${BASE_URL}/playlist/detail?id=${parseInt(event.playlistId)}`).then(res => JSON.parse(res))
    
    ctx.body = res
  
  })

  return app.serve()

}