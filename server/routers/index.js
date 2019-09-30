const koaBody = require('koa-body')
const Router = require('koa-router')
const router = new Router()
const User = require('../model/user')
const Sequelize = require('sequelize')

router.get('/users', async (ctx, next) => {
  const user = await User.findAll({ // 从数据库查询多个元素
    where: {
      is_delete: 0
    }
  })
  ctx.body = user
})
// 获取所有用户
router.post('/user', koaBody(), async (ctx) => {
  const user = await User.build(ctx.request.body).save()
  ctx.body = user
})
// 查询
router.post('/user-search', koaBody(), async (ctx) => {
  const body = ctx.request.body
  const user = await User.findAndCountAll({
    where: {
      is_delete: 0,
      username: {[Sequelize.Op.like]: `%${body.search}%`}
    },
    limit: body.limit,
    offset: body.offset
  })
  ctx.body = user
})
// 编辑用户
router.put('/user/:id', koaBody(), async (ctx) => {
  const body = ctx.request.body
  const user = await User.findByPk(ctx.params.id)
  await user.update({...body})
  ctx.body = user
})
// 删除用户
router.delete('/user/:id', koaBody(), async (ctx) => {
  const user = await User.findByPk(ctx.params.id)
  user.is_delete = 1
  await user.save()
  ctx.body = {
    Code: 0
  }
})
module.exports = router
