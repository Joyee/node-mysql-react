const Koa = require('koa')
const cors = require('koa-cors')
const router = require('./routers/index')

const app = new Koa()

app.use(cors()) // 解决跨域

// 对于任何请求，app将调用该异步函数处理请求
app.use(async (ctx, next) => {
  console.log(ctx.request.path + ':' + ctx.request.method)
  await next()
})

app.use(router.routes())
app.listen(3033)
console.log('app started at port 3033...')
