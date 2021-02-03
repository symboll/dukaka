// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const TcbRouter = require('tcb-router')

const db = cloud.database()

const blogCollection = db.collection('blog')

// 云函数入口函数
exports.main = async (event, context) => {

  const app = new TcbRouter({
    event
  })

  app.router('list', async (ctx, next) => {
    let w = {}
    const keyword = event.keyword.trim()
    if(keyword !== '') {
      w = {
        context: db.RegExp({
          regexp: keyword,
          options: 'i'
        })
      }
    }

    const res = await blogCollection.where(w).skip(event.start).limit(event.count)
      .orderBy('createTime', 'desc').get()

    ctx.body = res
  })

  return app.serve()
}