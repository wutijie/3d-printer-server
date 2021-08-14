'use strict'

// JSON格式化中间件，格式化请求内容，并log到bash中
module.exports = () => {
  return async (ctx, next) => {
    try {
      ctx.logger.info(ctx.req.msg)
      ctx.req.message = JSON.parse(ctx.req.msg)
    } catch (err) {
      ctx.logger.error(err)
    }
    await next()
    ctx.logger.info(`Response_Time: ${ctx.starttime ? Date.now() - ctx.starttime : 0}ms Topic：${ctx.req.topic} Msg: ${ctx.req.msg}`)
  }
}

// module.exports = () => {
//   return async (ctx, next) => {
//     try {
//       ctx.req.message = JSON.parse(ctx.req.msg)
//     } catch (err) {
//       ctx.logger.error(err)
//     }
//     await next()
//     ctx.logger.info(
//       `Response_Time: ${
//         ctx.starttime ? Date.now() - ctx.starttime : 0
//       }ms Topic：${ctx.req.topic} Msg: ${ctx.req.msg}`
//     )
//   }
// }
