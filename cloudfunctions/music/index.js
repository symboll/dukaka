// 云函数入口文件
const cloud = require('wx-server-sdk')

const TcbRouter = require('tcb-router')
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

  return app.serve()

}